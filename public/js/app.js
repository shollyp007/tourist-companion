// Global State
let userData = {
    name: '',
    citizenship: '',
    gender: '',
    race: '',
    religion: '',
    destination: ''
};

let emergencyData = null;
let bookingConfig = null;

// DOM Elements
const onboardingScreen = document.getElementById('onboardingScreen');
const searchScreen = document.getElementById('searchScreen');
const userNameInput = document.getElementById('userName');
const citizenshipInput = document.getElementById('citizenship');
const genderSelect = document.getElementById('gender');
const raceSelect = document.getElementById('race');
const religionSelect = document.getElementById('religion');
const getStartedBtn = document.getElementById('getStartedBtn');
const userNameDisplay = document.getElementById('userNameDisplay');
const destinationInput = document.getElementById('destination');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');
const emergencyBtn = document.getElementById('emergencyBtn');
const emergencyModal = document.getElementById('emergencyModal');
const closeModal = document.querySelector('.close');

// Load Booking.com affiliate configuration on page load
async function loadBookingConfig() {
    try {
        const response = await fetch('/api/booking-config');
        bookingConfig = await response.json();
    } catch (error) {
        console.error('Error loading booking config:', error);
        bookingConfig = { affiliateId: null, hasAffiliateId: false };
    }
}

// Event Listeners
loadBookingConfig(); // Load affiliate config when page loads
getStartedBtn.addEventListener('click', handleGetStarted);
searchBtn.addEventListener('click', handleSearch);
emergencyBtn.addEventListener('click', showEmergencyModal);
closeModal.addEventListener('click', () => {
    emergencyModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === emergencyModal) {
        emergencyModal.style.display = 'none';
    }
});

// Handle onboarding completion
function handleGetStarted() {
    const name = userNameInput.value.trim();
    const citizenship = citizenshipInput.value.trim();
    const gender = genderSelect.value;
    const race = raceSelect.value;
    const religion = religionSelect.value; // Optional

    if (!name || !citizenship || !gender || !race) {
        alert('Please fill in all required fields (Religion is optional)');
        return;
    }

    userData.name = name;
    userData.citizenship = citizenship;
    userData.gender = gender;
    userData.race = race;
    userData.religion = religion;
    userNameDisplay.textContent = name;

    // Switch screens
    onboardingScreen.classList.remove('active');
    searchScreen.classList.add('active');
}

// Handle destination search
async function handleSearch() {
    const destination = destinationInput.value.trim();

    if (!destination) {
        alert('Please enter a destination country');
        return;
    }

    userData.destination = destination;

    // Show loading state
    const btnText = searchBtn.querySelector('.btn-text');
    const btnLoader = searchBtn.querySelector('.btn-loader');
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';
    searchBtn.disabled = true;

    try {
        // Set beautiful destination background
        await setDestinationBackground(destination);

        // Fetch all data in parallel
        const [destinations, safety, costs, emergency] = await Promise.all([
            fetch(`/api/search-destinations?country=${encodeURIComponent(destination)}&citizenship=${encodeURIComponent(userData.citizenship)}`).then(r => r.json()),
            fetch(`/api/safety-assessment?country=${encodeURIComponent(destination)}&citizenship=${encodeURIComponent(userData.citizenship)}&gender=${encodeURIComponent(userData.gender)}&race=${encodeURIComponent(userData.race)}&religion=${encodeURIComponent(userData.religion)}`).then(r => r.json()),
            fetch(`/api/cost-estimates?country=${encodeURIComponent(destination)}`).then(r => r.json()),
            fetch(`/api/emergency-info?country=${encodeURIComponent(destination)}&citizenship=${encodeURIComponent(userData.citizenship)}`).then(r => r.json())
        ]);

        emergencyData = emergency;

        // Display results
        displaySafetyAssessment(safety);
        displayAttractions(destinations.results, destinations.dataSource, destinations.totalResults);
        displayCosts(costs);
        displayHotels(costs.hotels);

        // Show results
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch travel information. Please try again.');
    } finally {
        // Reset button state
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        searchBtn.disabled = false;
    }
}

// Set beautiful destination background image
async function setDestinationBackground(country) {
    try {
        // Fetch a beautiful landscape image of the destination
        const imageUrl = `https://source.unsplash.com/1920x1080/?${encodeURIComponent(country)},landscape,travel,landmark`;

        // Preload the image before setting it
        const img = new Image();
        img.src = imageUrl;

        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        // Set the background image with a smooth transition
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.classList.add('has-destination-bg');

        console.log(`✓ Background set for ${country}`);
    } catch (error) {
        console.log('Could not load destination background, using default gradient');
        // Keep default gradient if image fails to load
    }
}

// Display Safety Assessment
function displaySafetyAssessment(data) {
    const container = document.getElementById('safetyContent');

    const badgeClass = data.level === 'safe' ? 'safe' : 'caution';
    const badgeText = data.level === 'safe' ? '✓ Safe to Visit' : '⚠ Exercise Caution';

    container.innerHTML = `
        <div class="safety-badge ${badgeClass}">
            ${badgeText}
        </div>
        <div class="safety-score">${data.score}/100</div>
        <p class="safety-summary">${data.summary}</p>

        <h4 style="margin-bottom: 15px; color: var(--text-dark);">Important Considerations:</h4>
        <ul class="considerations-list">
            ${data.considerations.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h4 style="margin-bottom: 15px; color: var(--text-dark);">Recent Travel Updates:</h4>
        ${data.recentNews.map(news => `
            <div class="news-item" style="cursor: pointer; transition: all 0.3s ease;"
                 onmouseover="this.style.transform='translateX(5px)'; this.style.backgroundColor='#e9ecef';"
                 onmouseout="this.style.transform='translateX(0)'; this.style.backgroundColor='#f8f9fa';"
                 onclick="${news.url ? `window.open('${news.url}', '_blank')` : `alert('Full article not available')`}">
                <h4>${news.headline}</h4>
                <div class="news-meta">${news.source} • ${news.date}</div>
                ${news.url ? '<div style="color: #667eea; font-size: 0.85rem; margin-top: 5px;">Click to read full article →</div>' : ''}
            </div>
        `).join('')}
    `;
}

// Display Attractions
function displayAttractions(attractions, dataSource = 'Unknown', totalResults = 0) {
    const container = document.getElementById('attractionsContent');

    if (!attractions || attractions.length === 0) {
        container.innerHTML = '<p class="info-text">No attractions found. Please try another search.</p>';
        return;
    }

    // Add data source badge at the top
    const dataSourceBadge = dataSource === 'Google Search API'
        ? '<div style="background: linear-gradient(135deg, #00b894 0%, #00cec9 100%); color: white; padding: 8px 16px; border-radius: 20px; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 20px; font-size: 0.9rem; font-weight: 600;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>Live Data from Google (' + attractions.length + ' results)</div>'
        : '<div style="background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%); color: white; padding: 8px 16px; border-radius: 20px; display: inline-flex; align-items: center; gap: 8px; margin-bottom: 20px; font-size: 0.9rem; font-weight: 600;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>Simulated Data (Add API keys for real-time data)</div>';

    const attractionsHTML = attractions.map((attraction, index) => {
        const categoryBadge = attraction.category
            ? `<span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; display: inline-block; margin-bottom: 8px;">${attraction.category}</span>`
            : '';

        return `
        <div class="attraction-card" onclick="openAttractionDetails(${index})">
            <img src="${attraction.imageUrl}" alt="${attraction.name}" class="attraction-image"
                 onerror="this.src='https://via.placeholder.com/800x600/667eea/ffffff?text=${encodeURIComponent(attraction.name)}'"
                 loading="lazy">
            <div class="attraction-content">
                ${categoryBadge}
                <h4>${attraction.name}</h4>
                <p>${attraction.description}</p>
                <div class="rating">
                    <span>⭐</span>
                    <span>${attraction.rating}/5.0</span>
                </div>
            </div>
        </div>
    `;
    }).join('');

    // The container already has the grid class, so we just add content directly
    container.innerHTML = dataSourceBadge + attractionsHTML;

    // Store attractions data for click handler
    window.currentAttractions = attractions;
}

// Open attraction details
function openAttractionDetails(index) {
    const attraction = window.currentAttractions[index];

    if (attraction.link) {
        window.open(attraction.link, '_blank');
    } else {
        // Show modal with details
        alert(`${attraction.name}\n\n${attraction.description}\n\nRating: ${attraction.rating}/5.0\n\nSearch online for "${attraction.name}" to learn more!`);

        // Open Google search
        const searchQuery = encodeURIComponent(attraction.name);
        window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank');
    }
}

// Display Cost Estimates
function displayCosts(data) {
    const container = document.getElementById('costContent');

    container.innerHTML = `
        <div class="cost-grid">
            <div class="cost-card">
                <h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                    Accommodation
                </h4>
                <div class="cost-item">
                    <span class="cost-label">Budget</span>
                    <span class="cost-value">${data.accommodation.budget}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Mid-Range</span>
                    <span class="cost-value">${data.accommodation.midRange}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Luxury</span>
                    <span class="cost-value">${data.accommodation.luxury}</span>
                </div>
            </div>

            <div class="cost-card">
                <h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
                        <path d="M12 18V6"></path>
                    </svg>
                    Food & Dining
                </h4>
                <div class="cost-item">
                    <span class="cost-label">Budget</span>
                    <span class="cost-value">${data.food.budget}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Mid-Range</span>
                    <span class="cost-value">${data.food.midRange}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Fine Dining</span>
                    <span class="cost-value">${data.food.fine}</span>
                </div>
            </div>

            <div class="cost-card">
                <h4>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    Transportation
                </h4>
                <div class="cost-item">
                    <span class="cost-label">Public Transport</span>
                    <span class="cost-value">${data.transportation.publicTransport}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Taxi/Rideshare</span>
                    <span class="cost-value">${data.transportation.taxi}</span>
                </div>
                <div class="cost-item">
                    <span class="cost-label">Car Rental</span>
                    <span class="cost-value">${data.transportation.carRental}</span>
                </div>
            </div>
        </div>

        <div class="daily-budget">
            <h4>Estimated Daily Budget (${data.currency})</h4>
            <div class="budget-options">
                <div class="budget-option">
                    <div class="label">Backpacker</div>
                    <div class="amount">${data.dailyBudget.backpacker}</div>
                </div>
                <div class="budget-option">
                    <div class="label">Comfortable</div>
                    <div class="amount">${data.dailyBudget.comfortable}</div>
                </div>
                <div class="budget-option">
                    <div class="label">Luxury</div>
                    <div class="amount">${data.dailyBudget.luxury}</div>
                </div>
            </div>
        </div>
    `;
}

// Display Hotels
function displayHotels(hotels) {
    const container = document.getElementById('hotelsContent');

    container.innerHTML = hotels.map((hotel, index) => {
        const typeBadge = hotel.type
            ? `<span style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; display: inline-block; margin-bottom: 8px;">${hotel.type}</span>`
            : '';

        return `
        <div class="hotel-card" onclick="openHotelBooking(${index})">
            <img src="${hotel.imageUrl}" alt="${hotel.name}" class="hotel-image"
                 onerror="this.src='https://via.placeholder.com/400x300/4facfe/ffffff?text=${encodeURIComponent(hotel.name)}'"
                 loading="lazy">
            <div class="hotel-content">
                ${typeBadge}
                <h4>${hotel.name}</h4>
                <div class="hotel-price">${hotel.price}/night</div>
                <div class="rating">
                    <span>⭐</span>
                    <span>${hotel.rating}/5.0</span>
                </div>
            </div>
        </div>
    `;
    }).join('');

    // Store hotels data for click handler
    window.currentHotels = hotels;
}

// Open hotel booking
function openHotelBooking(index) {
    const hotel = window.currentHotels[index];
    const country = userData.destination;

    // Create search query for hotel booking sites
    const hotelSearchQuery = encodeURIComponent(`${hotel.name} ${country}`);

    // Build Booking.com URL with affiliate ID if available
    let bookingUrl = `https://www.booking.com/searchresults.html?ss=${hotelSearchQuery}`;

    if (bookingConfig && bookingConfig.hasAffiliateId) {
        bookingUrl += `&aid=${bookingConfig.affiliateId}`;
    }

    // Show options
    const choice = confirm(
        `${hotel.name}\n\nPrice: ${hotel.price}/night\nRating: ${hotel.rating}/5.0\n\n` +
        `Click OK to search for this hotel on Booking.com\n` +
        `Click Cancel to search on Google`
    );

    if (choice) {
        // Open Booking.com search with affiliate link
        window.open(bookingUrl, '_blank');
    } else {
        // Open Google search
        window.open(`https://www.google.com/search?q=${hotelSearchQuery}+hotel+booking`, '_blank');
    }
}

// Show Emergency Modal
function showEmergencyModal() {
    if (!emergencyData) {
        document.getElementById('emergencyContent').innerHTML = `
            <p class="info-text">Search for a destination first to see emergency contacts and safety information.</p>
        `;
    } else {
        displayEmergencyInfo(emergencyData);
    }

    emergencyModal.style.display = 'block';
}

// Display Emergency Information
function displayEmergencyInfo(data) {
    const container = document.getElementById('emergencyContent');

    const emergencyNumbers = data.emergencyNumbers;
    const hasNote = emergencyNumbers.note;

    container.innerHTML = `
        <div class="emergency-section">
            <h3>🚨 Emergency Numbers in ${data.country}</h3>
            <div class="emergency-grid">
                <div class="emergency-card" style="cursor: pointer;" onclick="callEmergency('${emergencyNumbers.police}', 'Police')"
                     title="Click to call or copy number">
                    <h4>👮 Police</h4>
                    <div class="number">${emergencyNumbers.police}</div>
                    <div style="font-size: 0.8rem; margin-top: 8px; opacity: 0.9;">Click to call/copy</div>
                </div>
                <div class="emergency-card" style="cursor: pointer;" onclick="callEmergency('${emergencyNumbers.ambulance}', 'Ambulance')"
                     title="Click to call or copy number">
                    <h4>🚑 Ambulance</h4>
                    <div class="number">${emergencyNumbers.ambulance}</div>
                    <div style="font-size: 0.8rem; margin-top: 8px; opacity: 0.9;">Click to call/copy</div>
                </div>
                <div class="emergency-card" style="cursor: pointer;" onclick="callEmergency('${emergencyNumbers.fire}', 'Fire Department')"
                     title="Click to call or copy number">
                    <h4>🚒 Fire Department</h4>
                    <div class="number">${emergencyNumbers.fire}</div>
                    <div style="font-size: 0.8rem; margin-top: 8px; opacity: 0.9;">Click to call/copy</div>
                </div>
            </div>
            ${hasNote ? `<p style="text-align: center; color: var(--text-light); margin-top: 15px;">${emergencyNumbers.note}</p>` : ''}
        </div>

        <div class="emergency-section">
            <h3>🏛 Embassy Information</h3>
            <div class="guide-card">
                <p>${data.embassy}</p>
            </div>
        </div>

        <div class="emergency-section">
            <h3>📋 Emergency Situation Guides</h3>
            <div class="guide-card">
                <h4>Medical Emergency</h4>
                <p>${data.guides.medical}</p>
            </div>
            <div class="guide-card">
                <h4>Theft or Robbery</h4>
                <p>${data.guides.theft}</p>
            </div>
            <div class="guide-card">
                <h4>Lost Passport</h4>
                <p>${data.guides.lost_passport}</p>
            </div>
            <div class="guide-card">
                <h4>Natural Disaster</h4>
                <p>${data.guides.natural_disaster}</p>
            </div>
            <div class="guide-card">
                <h4>Civil Unrest</h4>
                <p>${data.guides.civil_unrest}</p>
            </div>
        </div>

        <div class="emergency-section">
            <h3>💡 Safety Tips</h3>
            <ul class="tips-list">
                ${data.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Call Emergency Number
function callEmergency(number, service) {
    // Try to copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(number).then(() => {
            alert(`${service} Number: ${number}\n\nNumber copied to clipboard!`);
        }).catch(() => {
            alert(`${service} Number: ${number}\n\nCould not copy to clipboard. Please note the number.`);
        });
    } else {
        alert(`${service} Number: ${number}\n\nPlease save this number!`);
    }

    // Try to initiate call (works on mobile)
    if (confirm(`Would you like to call ${service} at ${number}?`)) {
        window.location.href = `tel:${number}`;
    }
}

// Allow Enter key to submit forms
userNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') citizenshipInput.focus();
});

citizenshipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') genderSelect.focus();
});

// No keypress needed for select elements, but we can trigger submit on last field blur
religionSelect.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleGetStarted();
});

destinationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
