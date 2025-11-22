# Tourist Companion

A comprehensive travel guide application that provides tourists with real-time information about destinations, safety assessments, cost estimates, and emergency contacts.

## Features

- **Personalized Onboarding**: Collect user information to tailor recommendations
- **Live Destination Search**: Real-time tourist attractions and information
- **Safety Assessment**: Security analysis based on current news and citizenship
- **Cost Estimates**: Detailed breakdown of accommodation, food, and transportation costs
- **Hotel Recommendations**: Browse hotels with Booking.com affiliate integration
- **Emergency Contacts**: Local emergency numbers and embassy information for 50+ countries
- **Beautiful UI**: Modern gradient design with smooth animations

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Keys (Optional but Recommended)

The app works without API keys using fallback data, but for live data, you need to configure the following APIs:

#### Google Custom Search API (for destination search)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the "Custom Search API"
4. Create credentials (API Key)
5. Create a Custom Search Engine at [programmablesearchengine.google.com](https://programmablesearchengine.google.com/)
6. Get your Search Engine ID

#### Unsplash API (for high-quality images)
1. Go to [Unsplash Developers](https://unsplash.com/developers)
2. Create a developer account
3. Create a new application
4. Copy your Access Key

#### News API (for safety and travel news)
1. Go to [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Copy your API key

### 3. Add API Keys to .env File

Edit the `.env` file and replace the placeholder values:

```env
GOOGLE_API_KEY=your_actual_google_api_key
GOOGLE_SEARCH_ENGINE_ID=your_actual_search_engine_id
UNSPLASH_ACCESS_KEY=your_actual_unsplash_access_key
NEWS_API_KEY=your_actual_news_api_key
```

### 4. Start the Server

```bash
npm start
```

The application will be available at `http://localhost:3001`

## Deploy to Production

Want to publish your app online and apply for the Booking.com affiliate program?

See the **[DEPLOYMENT.md](./DEPLOYMENT.md)** guide for step-by-step instructions to deploy to:
- **Vercel** (Recommended - Easiest)
- **Render**
- **Railway**

All options are **100% free** to get started!

## API Integration Status

When you start the server, you'll see which APIs are configured:

```
API Status:
- Google Search: ✓ Configured  /  ✗ Not configured (using simulated data)
- Unsplash: ✓ Configured  /  ✗ Not configured (using Unsplash fallback)
- News API: ✓ Configured  /  ✗ Not configured (using simulated data)
```

## How It Works

### Without API Keys
- Uses simulated data for destinations and safety information
- Uses Unsplash's free image service (source.unsplash.com)
- Provides realistic estimates based on country pricing databases

### With API Keys
- Fetches real tourist attractions using Google Search
- Analyzes actual news articles for safety assessments
- Gets high-quality, unique images from Unsplash API
- Provides current travel updates and advisories

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **APIs**: Google Custom Search, Unsplash, News API
- **HTTP Client**: Axios

## Project Structure

```
tourist-companion/
├── server.js           # Express server with API integrations
├── .env               # API keys configuration
├── package.json       # Dependencies
├── public/
│   ├── index.html     # Main HTML file
│   ├── css/
│   │   └── style.css  # Styles with gradient design
│   └── js/
│       └── app.js     # Frontend logic
└── README.md          # This file
```

## Emergency Contacts Coverage

The app includes emergency contact numbers for 50+ countries including:
- United States, United Kingdom, Canada, Australia
- European countries (France, Germany, Spain, Italy, etc.)
- Asian countries (Japan, China, India, Thailand, etc.)
- African countries (Nigeria, Kenya, South Africa, etc.)
- Latin American countries (Brazil, Mexico, Argentina, etc.)
- Middle Eastern countries (UAE, Saudi Arabia, Israel, etc.)

## Privacy & Data Usage

This application:
- Does NOT store any personal information
- Does NOT track users
- Collects user name and citizenship only for session-based recommendations
- All data is processed in memory and not persisted

## License

ISC

## Support

For issues or questions, please check the API documentation for each service or review the server logs for detailed error messages.
