# Quick Start: Get Google Search API Working in 5 Minutes

This guide will help you quickly set up Google Custom Search API to get **real-time attraction data** in your Tourist Companion app.

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Google API Key (2 minutes)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a Project** (if you don't have one)
   - Click "Select a project" at the top
   - Click "New Project"
   - Name it: "Tourist Companion"
   - Click "Create"

3. **Enable Custom Search API**
   - In the search bar, type "Custom Search API"
   - Click on "Custom Search API"
   - Click the blue "ENABLE" button

4. **Create API Key**
   - Go to: https://console.cloud.google.com/apis/credentials
   - Click "CREATE CREDENTIALS" → "API key"
   - **Copy the API key** (looks like: `AIzaSyDXXXXXXXXXXXXXXXXX`)
   - (Optional) Click "RESTRICT KEY" for security

### Step 2: Create Custom Search Engine (2 minutes)

1. **Go to Programmable Search Engine**
   - Visit: https://programmablesearchengine.google.com/controlpanel/create
   - If not logged in, log in with same Google account

2. **Fill in the Form**
   - **Name your search engine**: "Tourist Attractions Search"
   - **What to search**: Select "Search the entire web"
   - Check the "I'm not a robot" box
   - Click "Create"

3. **Get Your Search Engine ID**
   - After creating, you'll see your Search Engine
   - Click on it to open settings
   - Copy the **"Search engine ID"** (looks like: `a1b2c3d4e5f6g7h8i`)

### Step 3: Add Keys to Your App (1 minute)

1. **Open the `.env` file** in the `tourist-companion` folder

2. **Replace the placeholder values:**
   ```env
   GOOGLE_API_KEY=AIzaSyDXXXXXXXXXXXXXXXXX    # Paste your API key here
   GOOGLE_SEARCH_ENGINE_ID=a1b2c3d4e5f6g7h8i  # Paste your Search Engine ID here
   ```

3. **Save the file**

4. **Restart the server:**
   - Stop the running server (Ctrl+C in terminal)
   - Start it again:
     ```bash
     npm start
     ```

### Step 4: Test It! ✨

1. Open http://localhost:3001
2. Enter your name and citizenship
3. Search for any country (e.g., "France", "Japan", "Egypt")
4. You should now see:
   - **"✓ Live Data from Google"** badge
   - **Real attraction names** from Google Search
   - **10+ attractions** across different categories
   - **Actual descriptions** from search results
   - **Category badges** (Top Attractions, Landmarks, etc.)

---

## 📊 What You Get with the API

### Without API (Simulated Data):
- ⚠️ "Simulated Data" badge
- 8 generic attraction categories
- Placeholder descriptions
- Random images from Unsplash

### With API (Real-Time Data):
- ✓ "Live Data from Google" badge
- 10+ real attractions from Google Search
- Actual attraction descriptions
- Images from Google Image Search + Unsplash
- Clickable links to learn more
- Real-time, up-to-date information

---

## 💰 Pricing (Don't Worry, It's Free!)

**Google Custom Search API - Free Tier:**
- **100 searches per day** - FREE
- Perfect for testing and personal use
- Resets every 24 hours

**What This Means:**
- You can search **100 countries per day** for free
- That's about **3-4 searches per hour** all day long
- More than enough for development and testing!

**Need More?**
- Paid plans start at $5 per 1,000 queries
- You only pay if you exceed 100 queries/day

---

## 🔍 How to Check if It's Working

### In Your Terminal:
When the server starts, you should see:
```
API Status:
- Google Search: ✓ Configured  ← This should show ✓
- Unsplash: ✗ Not configured (using Unsplash fallback)
- News API: ✗ Not configured (using simulated data)
```

### In the Console (while searching):
```
Fetching real-time attractions for France using Google Search API...
✓ Found 10 real attractions from Google Search
```

### In the Browser:
- Look for the **green "Live Data from Google"** badge
- Click on attractions - they should have real Google search links
- Category badges should show: Top Attractions, Landmarks, Cultural Sites, etc.

---

## 🐛 Troubleshooting

### "API key not valid"
- Make sure Custom Search API is enabled in Google Cloud Console
- Check that you copied the entire API key
- Remove any extra spaces in the .env file

### "Invalid cx parameter"
- Double-check your Search Engine ID
- Make sure you created a Programmable Search Engine
- Verify it's set to "Search the entire web"

### Still showing "Simulated Data"
- Restart the server after adding API keys
- Check the .env file - no quotes around the values
- Make sure the .env file is in the `tourist-companion` folder

### "Rate limit exceeded"
- You've used 100 searches today
- Wait 24 hours or upgrade to paid plan
- Check Google Cloud Console for usage stats

---

## 📝 Example .env File

```env
# Google Custom Search API (REQUIRED for real-time data)
GOOGLE_API_KEY=AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_SEARCH_ENGINE_ID=a1b2c3d4e5f6g7h8i

# Unsplash API (OPTIONAL - better images)
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here

# News API (OPTIONAL - real news)
NEWS_API_KEY=your_news_api_key_here

# Server Configuration
PORT=3001
```

---

## 🎯 Next Steps

### Want Even Better Images?
Follow `API_KEYS_GUIDE.md` to add **Unsplash API** for high-quality images

### Want Real News?
Follow `API_KEYS_GUIDE.md` to add **News API** for actual travel news

### Just Want to Test?
The app works great with just Google API! Unsplash and News API are optional bonuses.

---

## 🎉 You're Done!

Your Tourist Companion app is now fetching **real-time data from Google**!

Try searching for:
- **France** - See the Eiffel Tower, Louvre Museum, etc.
- **Japan** - See Mount Fuji, Tokyo Tower, etc.
- **Egypt** - See the Pyramids, Sphinx, etc.
- **Any country!** - Get real attractions from Google

**Enjoy your fully functional tourist guide app!** 🌍✈️
