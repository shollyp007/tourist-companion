# Google AdSense Setup Guide for Tourist Companion

This guide will walk you through setting up Google AdSense to monetize your Tourist Companion application with advertisements.

## Table of Contents
1. [What is Google AdSense?](#what-is-google-adsense)
2. [Prerequisites](#prerequisites)
3. [Creating a Google AdSense Account](#creating-a-google-adsense-account)
4. [Getting Your AdSense Code](#getting-your-adsense-code)
5. [Integrating AdSense into Your App](#integrating-adsense-into-your-app)
6. [Testing Your Ads](#testing-your-ads)
7. [Troubleshooting](#troubleshooting)

---

## What is Google AdSense?

Google AdSense is a free advertising program that allows you to earn money by displaying targeted ads on your website or web application. Advertisers pay Google to display their ads, and you earn a portion of that revenue when users view or click on the ads.

### Benefits:
- **Free to use** - No cost to join
- **Easy to set up** - Simple integration process
- **Automatic ads** - Google automatically matches relevant ads to your content
- **Earn revenue** - Get paid for ad views and clicks

---

## Prerequisites

Before you can use Google AdSense, you need:

1. **A deployed website** - Your Tourist Companion app must be live on the internet (not localhost)
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
   - Recommended platforms: Vercel, Render, or Railway

2. **A Google Account** - You'll need a Gmail account

3. **Quality content** - Your site should have original, valuable content (your app already has this!)

4. **Age requirement** - You must be 18+ years old

---

## Creating a Google AdSense Account

### Step 1: Sign Up for AdSense

1. Go to [https://www.google.com/adsense](https://www.google.com/adsense)
2. Click **"Get Started"**
3. Sign in with your Google Account
4. Fill in the application form:
   - **Website URL**: Enter your deployed app's URL (e.g., `https://tourist-companion.vercel.app`)
   - **Email**: Your contact email
   - **Country**: Your country of residence

5. Accept the AdSense Terms and Conditions
6. Click **"Create Account"**

### Step 2: Connect Your Site to AdSense

After creating your account, Google will provide you with an AdSense code snippet to verify site ownership.

1. Copy the code provided by Google (it looks like this):
   ```html
   <script data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
   ```

2. This code has already been added to your `index.html` file, but you need to **replace the placeholder** with your actual code.

3. Submit your site for review in the AdSense dashboard

### Step 3: Wait for Approval

- Google will review your site (typically takes 1-3 days, but can take up to 2 weeks)
- You'll receive an email when your site is approved
- During this time, ads won't show on your site yet

---

## Getting Your AdSense Code

Once your site is approved:

### Step 1: Create an Ad Unit

1. Log in to your [AdSense Account](https://www.google.com/adsense)
2. Go to **Ads → By ad unit**
3. Click **"+ New ad unit"**
4. Choose **"Display ads"**
5. Name your ad unit (e.g., "Tourist Companion - Between Sections")
6. Configure the ad settings:
   - **Ad size**: Responsive (recommended) or Fixed size
   - **Ad type**: Text & display ads
7. Click **"Create"**

### Step 2: Get Your Ad Code

After creating the ad unit, Google will show you the ad code. It looks like this:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
<!-- Tourist Companion Ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="YYYYYYYYYY"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

**Important values to copy:**
- `ca-pub-XXXXXXXXXXXXXXXX` - Your Publisher ID (same for all ads)
- `YYYYYYYYYY` - Your Ad Slot ID (unique for each ad unit)

---

## Integrating AdSense into Your App

Your Tourist Companion app uses **environment variables** for AdSense configuration, making it super easy to set up!

### Step 1: Add Environment Variables

**For Local Development:**
1. Create a `.env` file in your project root (or copy `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your AdSense credentials:
   ```env
   ADSENSE_PUBLISHER_ID=ca-pub-1234567890123456
   ADSENSE_AD_SLOT_ID=9876543210
   ```

   Replace:
   - `ca-pub-1234567890123456` with your actual Publisher ID
   - `9876543210` with your actual Ad Slot ID

**For Production (Vercel/Render/Railway):**

**Vercel:**
1. Go to your project dashboard
2. Settings → Environment Variables
3. Add:
   - `ADSENSE_PUBLISHER_ID` = `ca-pub-1234567890123456`
   - `ADSENSE_AD_SLOT_ID` = `9876543210`

**Render:**
1. Go to your web service dashboard
2. Environment → Environment Variables
3. Add:
   - `ADSENSE_PUBLISHER_ID` = `ca-pub-1234567890123456`
   - `ADSENSE_AD_SLOT_ID` = `9876543210`

**Railway:**
1. Go to your project
2. Variables tab
3. Add:
   - `ADSENSE_PUBLISHER_ID` = `ca-pub-1234567890123456`
   - `ADSENSE_AD_SLOT_ID` = `9876543210`

### Step 2: That's It!

The app will automatically:
- ✅ Load your AdSense configuration
- ✅ Inject the AdSense script
- ✅ Display ads when results are shown
- ✅ Show a message in console if AdSense is not configured

**No need to edit HTML files!** Everything is handled dynamically.

---

## Testing Your Ads

### During the Review Period (Before Approval)

- Ads won't display yet - this is normal
- You'll see a blank space where the ad will appear
- Don't worry, this is expected behavior

### After Approval

1. Visit your deployed site
2. Navigate past the sign-in screen
3. Search for a destination
4. Scroll down - you should see an ad between "Top Attractions" and "Cost Estimates"

### Important Testing Notes

**DO NOT:**
- Click your own ads repeatedly
- Ask friends/family to click your ads
- Use automated tools to generate clicks
- Try to manipulate ad impressions

Google will detect this and may ban your account permanently!

**DO:**
- Test that ads are displaying correctly
- Check that they look good on mobile devices
- Verify ads are appropriate for your content

---

## Troubleshooting

### Ads Not Showing?

**Possible reasons:**

1. **Site not approved yet**
   - Check your AdSense email for approval status
   - Wait for Google's review to complete

2. **Wrong Publisher ID or Ad Slot ID**
   - Double-check you copied the IDs correctly
   - Make sure there are no extra spaces or characters

3. **Ad blockers**
   - Disable browser ad blockers to test
   - Note: Some users will have ad blockers, reducing your ad revenue

4. **Insufficient content**
   - Make sure users search for destinations so content appears
   - Ads only show in the results section, not on the initial sign-in page

5. **Need more time**
   - AdSense can take 24-48 hours to start serving ads after initial setup

### Blank Ad Space

If you see a gray placeholder box:
- This is the styled container waiting for Google to serve ads
- It means your integration is working correctly
- Ads will appear once Google approves your site and starts serving ads

### Low Ad Revenue

If approved but earning little:
- **More traffic = More revenue**: Focus on promoting your app
- **User engagement**: More engaged users = more ad views
- **Content quality**: Better content attracts higher-paying ads
- **Be patient**: Revenue typically grows over time

### Account Suspended

If your account is suspended:
- Review Google's email explaining why
- Common reasons: Invalid clicks, policy violations, low-quality content
- Follow AdSense policies strictly
- You can appeal suspensions through the AdSense dashboard

---

## Additional Tips

### Maximizing Ad Revenue

1. **Drive traffic** - Share your app on social media, travel forums, etc.
2. **Improve user engagement** - The longer users stay, the more ads they see
3. **Create quality content** - Better content attracts higher-paying advertisers
4. **Optimize placement** - The current placement between sections is optimal for visibility without being intrusive

### AdSense Policies

Make sure your app complies with AdSense policies:
- Original, valuable content (you have this!)
- Clear navigation (you have this!)
- User privacy respected (you have this!)
- No prohibited content (violence, adult content, etc.)
- No misleading information

Your Tourist Companion app already meets all these requirements!

---

## Getting Paid

Once you're approved and earning revenue:

1. **Payment threshold**: You must earn $100 before Google pays you
2. **Payment method**: Set up in AdSense → Payments
3. **Payment schedule**: Google pays monthly, around the 21st
4. **Tax information**: You'll need to provide tax info for payments

---

## Support

### Need Help?

- **AdSense Help Center**: [https://support.google.com/adsense](https://support.google.com/adsense)
- **AdSense Community**: [https://support.google.com/adsense/community](https://support.google.com/adsense/community)
- **Tourist Companion Issues**: Create an issue on GitHub

---

## Summary

Your Tourist Companion app is now ready for Google AdSense!

**Next steps:**
1. Deploy your app (see [DEPLOYMENT.md](./DEPLOYMENT.md))
2. Sign up for AdSense
3. Wait for approval
4. Replace the placeholder AdSense codes in `index.html`
5. Deploy the updated code
6. Start earning revenue!

**Ad Location:**
- The ad appears between "Top Attractions" and "Cost Estimates" sections
- This placement is optimal for visibility without disrupting user experience
- Ads only show after users sign in and search for a destination

Good luck with your Tourist Companion app!
