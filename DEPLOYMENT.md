# Deployment Guide for Tourist Companion

This guide will help you deploy the Tourist Companion app to the internet so you can apply for the Booking.com affiliate program and start earning commissions.

## Prerequisites

Before deploying, make sure you have:
- A GitHub account (free)
- Your API keys ready (Google Search, News API, Unsplash - optional)
- About 10-15 minutes

## Deployment Options

We recommend these platforms for their free tiers and ease of use:

1. **Vercel** - Easiest, automatic deployments, great for beginners
2. **Render** - Simple setup, generous free tier
3. **Railway** - Developer-friendly, modern interface

All three options are **100% free** to get started!

---

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the fastest way to get your app online.

### Steps:

1. **Push your code to GitHub**
   ```bash
   cd /Users/olusolaadeaga/training/tourist-companion
   git init
   git add .
   git commit -m "Initial commit - Tourist Companion app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/tourist-companion.git
   git push -u origin main
   ```

2. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub

3. **Import your project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select your `tourist-companion` repository
   - Click "Import"

4. **Configure environment variables**
   - In the "Configure Project" screen, expand "Environment Variables"
   - Add each of these variables:
     ```
     GOOGLE_API_KEY=your_actual_key_here
     GOOGLE_SEARCH_ENGINE_ID=your_actual_id_here
     NEWS_API_KEY=your_actual_key_here
     UNSPLASH_ACCESS_KEY=your_actual_key_here (optional)
     PORT=3001
     ```
   - Leave BOOKING_AFFILIATE_ID blank for now (you'll add it later)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - You'll get a URL like: `https://tourist-companion-abc123.vercel.app`

6. **Test your deployment**
   - Click the URL to open your app
   - Test all features to make sure everything works

**Auto-deployments**: Every time you push to GitHub, Vercel automatically redeploys!

---

## Option 2: Deploy to Render

Render offers a simple free tier perfect for Node.js apps.

### Steps:

1. **Push your code to GitHub** (same as Vercel step 1)

2. **Sign up for Render**
   - Go to [render.com](https://render.com)
   - Click "Get Started"
   - Sign up with GitHub

3. **Create a new Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account if prompted
   - Select your `tourist-companion` repository
   - Click "Connect"

4. **Configure the service**
   - Name: `tourist-companion`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: `Free`

5. **Add environment variables**
   - Scroll down to "Environment Variables"
   - Click "Add Environment Variable" for each:
     ```
     GOOGLE_API_KEY=your_actual_key_here
     GOOGLE_SEARCH_ENGINE_ID=your_actual_id_here
     NEWS_API_KEY=your_actual_key_here
     UNSPLASH_ACCESS_KEY=your_actual_key_here (optional)
     PORT=3001
     ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - You'll get a URL like: `https://tourist-companion.onrender.com`

**Note**: Free tier apps may sleep after 15 minutes of inactivity. First request might be slow.

---

## Option 3: Deploy to Railway

Railway offers a modern deployment platform with a generous free tier.

### Steps:

1. **Push your code to GitHub** (same as Vercel step 1)

2. **Sign up for Railway**
   - Go to [railway.app](https://railway.app)
   - Click "Login" → "Login with GitHub"
   - Authorize Railway

3. **Create a new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `tourist-companion` repository

4. **Add environment variables**
   - Click on your service
   - Go to "Variables" tab
   - Click "New Variable" and add:
     ```
     GOOGLE_API_KEY=your_actual_key_here
     GOOGLE_SEARCH_ENGINE_ID=your_actual_id_here
     NEWS_API_KEY=your_actual_key_here
     UNSPLASH_ACCESS_KEY=your_actual_key_here (optional)
     PORT=3001
     ```

5. **Generate a domain**
   - Go to "Settings" tab
   - Scroll to "Domains"
   - Click "Generate Domain"
   - You'll get a URL like: `https://tourist-companion-production.up.railway.app`

6. **Deploy**
   - Railway automatically deploys your app
   - Wait 2-3 minutes
   - Click the URL to test

---

## After Deployment

### 1. Test Your Live App

Visit your deployed URL and test:
- ✅ Search for a destination
- ✅ View safety assessment
- ✅ Check cost estimates
- ✅ Browse hotel recommendations
- ✅ Click emergency button
- ✅ Try clicking on a hotel card

### 2. Apply for Booking.com Affiliate Program

Now that your app is live:

1. **Go to Booking.com Affiliate Program**
   - Visit: [https://www.booking.com/affiliate-program/v2/index.html](https://www.booking.com/affiliate-program/v2/index.html)
   - Click "Join Now"

2. **Fill in application**
   - Website URL: Your deployed app URL (e.g., `https://tourist-companion.vercel.app`)
   - Website Description: "Travel companion app providing tourists with destination information, safety assessments, cost estimates, and hotel recommendations"
   - Traffic Source: "Organic/Direct"
   - Monthly Visitors: "0-1000" (you're just starting)

3. **Wait for approval**
   - Usually takes 1-3 business days
   - You'll receive an email with your decision

4. **Get your Affiliate ID**
   - Once approved, log into your Booking.com partner dashboard
   - Find your Affiliate ID (also called "aid")
   - It's usually a numeric value like `123456`

### 3. Add Your Affiliate ID

Once you have your affiliate ID:

**For Vercel:**
1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add: `BOOKING_AFFILIATE_ID` = `your_affiliate_id_here`
4. Click "Save"
5. Go to "Deployments" and redeploy

**For Render:**
1. Go to your service dashboard
2. Click "Environment"
3. Add: `BOOKING_AFFILIATE_ID` = `your_affiliate_id_here`
4. Click "Save Changes"
5. Service will automatically redeploy

**For Railway:**
1. Go to your service
2. Click "Variables" tab
3. Add: `BOOKING_AFFILIATE_ID` = `your_affiliate_id_here`
4. Service will automatically redeploy

### 4. Verify Affiliate Links Work

1. Visit your deployed app
2. Search for a destination
3. Click on a hotel card
4. Click "OK" to search on Booking.com
5. Check the URL - it should contain `&aid=YOUR_AFFILIATE_ID`

Example:
```
https://www.booking.com/searchresults.html?ss=Hotel+Name+Paris&aid=123456
```

---

## Troubleshooting

### App not loading
- Check that all environment variables are set correctly
- Verify your API keys are valid
- Check deployment logs for errors

### Hotels not showing
- Make sure `GOOGLE_API_KEY` and `GOOGLE_SEARCH_ENGINE_ID` are set
- The app works without API keys but shows generic hotels

### Affiliate links not working
- Verify `BOOKING_AFFILIATE_ID` is set in environment variables
- Make sure you redeployed after adding the affiliate ID
- Check the console for any JavaScript errors

### Port issues
- Make sure `PORT` is set to `3001` in environment variables
- Some platforms ignore PORT and use their own

---

## Custom Domain (Optional)

Want a custom domain like `touristcompanion.com`?

**With Vercel:**
1. Buy a domain from Namecheap, GoDaddy, or Google Domains
2. In Vercel dashboard, go to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

**With Render:**
1. Buy a domain
2. In Render dashboard, go to "Custom Domains"
3. Add your domain and configure DNS records

**With Railway:**
1. Buy a domain
2. In Railway, go to Settings → Domains
3. Add custom domain and set up DNS

---

## Cost Breakdown

| Platform | Free Tier | Paid Plans Start At |
|----------|-----------|-------------------|
| Vercel | Unlimited hobby projects | $20/month (Pro) |
| Render | 750 hours/month | $7/month |
| Railway | $5 credit/month | Pay as you go |

**Recommendation**: Start with the free tier on any platform. All three are free enough for a project like this!

---

## Next Steps

1. ✅ Deploy your app using one of the methods above
2. ✅ Test your live app thoroughly
3. ✅ Apply for Booking.com affiliate program with your live URL
4. ✅ Wait for approval (1-3 days)
5. ✅ Add affiliate ID to environment variables
6. ✅ Start earning commissions on hotel bookings!

---

## Need Help?

- **Vercel Issues**: [Vercel Discord](https://vercel.com/discord)
- **Render Issues**: [Render Community](https://community.render.com/)
- **Railway Issues**: [Railway Discord](https://discord.gg/railway)
- **Booking.com Affiliate**: [Partner Support](https://partner.booking.com/en-gb/help)

Good luck with your deployment and affiliate application!
