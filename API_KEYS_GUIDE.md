# API Keys Setup Guide for Tourist Companion

This guide will help you get all the necessary API keys to enable live data in the Tourist Companion app.

## 1. Google Custom Search API

The Google Custom Search API allows you to search the web and get real tourist attraction information.

### Steps to Get Google API Key:

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click "Select a project" → "New Project"
   - Enter project name: "Tourist Companion"
   - Click "Create"

2. **Enable Custom Search API**
   - In the Google Cloud Console, go to "APIs & Services" → "Library"
   - Search for "Custom Search API"
   - Click on it and press "Enable"

3. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key
   - (Optional) Click "Restrict Key" to add security restrictions

4. **Create Custom Search Engine**
   - Go to [Programmable Search Engine](https://programmablesearchengine.google.com/controlpanel/create)
   - Enter a name: "Tourist Sites Search"
   - In "Sites to search": Select "Search the entire web"
   - Click "Create"
   - Copy your "Search engine ID"

5. **Add to .env File**
   ```env
   GOOGLE_API_KEY=your_api_key_here
   GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here
   ```

**Cost:** Free tier includes 100 queries per day. [Pricing Details](https://developers.google.com/custom-search/v1/overview)

---

## 2. Unsplash API

The Unsplash API provides high-quality, free images for destinations, hotels, and attractions.

### Steps to Get Unsplash Access Key:

1. **Create Unsplash Account**
   - Go to [Unsplash Developers](https://unsplash.com/developers)
   - Click "Register as a Developer"
   - Sign up or log in

2. **Create New Application**
   - Go to [Your Applications](https://unsplash.com/oauth/applications)
   - Click "New Application"
   - Accept the terms and guidelines
   - Fill in application details:
     - Application name: "Tourist Companion"
     - Description: "Travel guide app for tourists"

3. **Get Access Key**
   - After creating the app, scroll down to "Keys"
   - Copy the "Access Key"

4. **Add to .env File**
   ```env
   UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

**Cost:** Free tier includes 50 requests per hour. [Rate Limits](https://unsplash.com/documentation#rate-limiting)

---

## 3. News API

The News API provides real-time news articles for safety assessments and travel updates.

### Steps to Get News API Key:

1. **Create News API Account**
   - Go to [NewsAPI.org](https://newsapi.org/)
   - Click "Get API Key"
   - Fill in the registration form:
     - First Name
     - Email
     - Password

2. **Verify Email**
   - Check your email for verification link
   - Click the link to verify

3. **Get API Key**
   - After verification, you'll be redirected to your dashboard
   - Copy your API key from the dashboard

4. **Add to .env File**
   ```env
   NEWS_API_KEY=your_api_key_here
   ```

**Cost:** Free tier includes 100 requests per day. Developer plan is $449/month for production. [Pricing](https://newsapi.org/pricing)

---

## 4. Booking.com Affiliate Program (Optional)

The Booking.com Affiliate Program allows you to earn commission when users book hotels through your links.

### Steps to Get Booking.com Affiliate ID:

1. **Join Booking.com Partner Program**
   - Go to [Booking.com Affiliate Program](https://www.booking.com/affiliate-program/v2/index.html)
   - Click "Join Now" or "Sign Up"
   - Fill in your details and website information

2. **Get Your Affiliate ID**
   - After approval, log in to your partner dashboard
   - Navigate to "Links & Banners" or "Tools"
   - Find your Affiliate ID (also called "aid" parameter)
   - It's usually a numeric value like "123456"

3. **Add to .env File**
   ```env
   BOOKING_AFFILIATE_ID=your_affiliate_id_here
   ```

**Cost:** Free to join. You earn commission on bookings made through your links.

---

## 5. Complete .env File Example

After getting all your API keys, your `.env` file should look like this:

```env
# Google Custom Search API
GOOGLE_API_KEY=AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_SEARCH_ENGINE_ID=a1b2c3d4e5f6g7h8i

# Unsplash API
UNSPLASH_ACCESS_KEY=abcdefghijklmnopqrstuvwxyz123456789

# News API
NEWS_API_KEY=1234567890abcdef1234567890abcdef

# Booking.com Affiliate ID (Optional)
BOOKING_AFFILIATE_ID=123456

# Server Configuration
PORT=3001
```

---

## Testing Your API Configuration

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Check the console output:**
   ```
   API Status:
   - Google Search: ✓ Configured
   - Unsplash: ✓ Configured
   - News API: ✓ Configured
   ```

3. **Test in the app:**
   - Open http://localhost:3001
   - Enter your information
   - Search for a destination (e.g., "France", "Japan", "Thailand")
   - Verify that real data is being fetched

---

## Troubleshooting

### Google Search API Issues
- **Error: "API key not valid"**
  - Make sure the Custom Search API is enabled in your Google Cloud project
  - Check if your API key has any restrictions that might block requests

- **Error: "Invalid cx parameter"**
  - Verify your Search Engine ID is correct
  - Make sure your Programmable Search Engine is set to search the entire web

### Unsplash API Issues
- **Error: "401 Unauthorized"**
  - Check that your Access Key is correct
  - Verify your application is in "Demo" or "Production" mode

- **Rate limit exceeded:**
  - Free tier: 50 requests/hour
  - Wait an hour or upgrade your plan

### News API Issues
- **Error: "apiKeyInvalid"**
  - Verify your API key is correct
  - Check if you've exceeded the free tier limit (100 requests/day)

- **Error: "rateLimited"**
  - You've exceeded your daily quota
  - Upgrade to a paid plan or wait 24 hours

---

## Alternative: Using Without API Keys

The app works perfectly fine without API keys! It will:
- Use simulated but realistic data for destinations
- Use Unsplash's free source service for images (no API key needed)
- Provide generic but helpful safety information
- Show estimated costs based on country databases

The experience is still great for testing and demonstration purposes.

---

## API Limits Summary

| API | Free Tier Limit | Reset Period | Notes |
|-----|----------------|--------------|-------|
| Google Custom Search | 100 queries | Per day | - |
| Unsplash | 50 requests | Per hour | - |
| News API | 100 requests | Per day | - |
| Booking.com Affiliate | Unlimited | - | Optional, earns commission |

**Tip:** For production use, consider upgrading to paid plans for higher limits and better reliability.

---

## Security Best Practices

1. **Never commit .env file to version control**
   - Add `.env` to your `.gitignore` file

2. **Restrict API keys**
   - Use Google Cloud Console to restrict API keys to specific IPs or domains
   - Enable only necessary APIs

3. **Rotate keys regularly**
   - Change API keys every few months
   - Immediately rotate if keys are exposed

4. **Monitor usage**
   - Check API dashboards regularly
   - Set up alerts for unusual activity

---

## Need Help?

- Google Custom Search API: [Documentation](https://developers.google.com/custom-search/v1/introduction)
- Unsplash API: [Documentation](https://unsplash.com/documentation)
- News API: [Documentation](https://newsapi.org/docs)

For app-specific issues, check the server logs or console output for detailed error messages.
