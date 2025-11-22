# Quick Deploy Guide - Tourist Companion

## Fastest Way to Deploy (5 minutes)

### Step 1: Prepare Your Code
```bash
cd /Users/olusolaadeaga/training/tourist-companion
./deploy-setup.sh
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Name: `tourist-companion`
3. Click "Create repository" (don't add README)

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/tourist-companion.git
git push -u origin main
```

### Step 4: Deploy to Vercel
1. Go to https://vercel.com/signup
2. Sign up with GitHub
3. Click "New Project"
4. Import `tourist-companion` repository
5. Add environment variables:
   ```
   GOOGLE_API_KEY=your_key_here
   GOOGLE_SEARCH_ENGINE_ID=your_id_here
   NEWS_API_KEY=your_key_here
   PORT=3001
   ```
6. Click "Deploy"
7. Wait 2 minutes
8. Get your URL: `https://tourist-companion-xxx.vercel.app`

### Step 5: Apply for Booking.com Affiliate
1. Go to https://www.booking.com/affiliate-program/v2/index.html
2. Click "Join Now"
3. Enter your Vercel URL as website
4. Wait 1-3 days for approval
5. Get your affiliate ID
6. Add to Vercel environment variables: `BOOKING_AFFILIATE_ID=123456`

## Done! 🎉

Your app is live and ready to earn commissions!

---

## Need More Details?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Alternative deployment platforms (Render, Railway)
- Troubleshooting tips
- Custom domain setup
- Detailed explanations
