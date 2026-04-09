---
title: SEO Setup Guide for Party Hub
description: Complete guide to set up SEO for partyhubs.in
---

# SEO Setup Guide for Party Hub

This document contains all the steps you need to complete to get your website ranking #1 on Google for party decoration searches in Bangalore.

## ✅ Completed Tasks

- [x] robots.txt configured
- [x] sitemap.xml with all pages (categories, subcategories, designs)
- [x] Enhanced meta tags (title, description, keywords)
- [x] Open Graph tags for social sharing
- [x] Twitter Card meta tags
- [x] Structured Data (LocalBusiness, WebSite, WebPage, FAQPage)
- [x] FAQ schema for rich snippets
- [x] Geo tags for local SEO
- [x] Canonical URLs

## 📋 Tasks You Need to Complete

### 1. Google Search Console Verification (CRITICAL)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add property"
3. Enter your domain: `partyhubs.in`
4. Choose "Domain" type
5. Google will give you a verification code

**To add verification code:**

Open `app/layout.js` and replace `YOUR_GOOGLE_VERIFICATION_CODE` with your actual code:

```javascript
verification: {
  google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Replace this
},
```

Or create a file at `public/google123456789.html` with the content Google provides.

### 2. Create OG Image (IMPORTANT)

Your website needs an Open Graph image for social sharing. 

1. Go to [Canva](https://www.canva.com)
2. Create a design at **1200 x 630 pixels**
3. Include:
   - "Party Hub" branding
   - "Best Party Decorators in Bangalore"
   - Party emojis/decoration images
   - Your logo
4. Download as JPG
5. Save as `public/og-image.jpg`

I've created a preview at `public/og-image-guide.html` - open it in your browser to see the design template.

### 3. Submit Sitemap to Google

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Go to **Sitemaps**
4. Enter: `sitemap.xml`
5. Click Submit

### 4. Google Business Profile (CRITICAL for Local SEO)

1. Go to [Google Business Profile](https://business.google.com)
2. Click "Manage Now"
3. Search for "Party Hub"
4. Fill in all details:
   - Business name: **Party Hub**
   - Category: **Party Decorator**
   - Address: **Bangalore, Karnataka**
   - Phone: **+91-63668 83984**
   - Website: **https://partyhubs.in**
   - Hours: **9 AM - 9 PM daily**
5. Add photos of your work
6. Verify your business

### 5. Create Social Media Profiles

Create accounts on these platforms with your website link:

- [Instagram](https://instagram.com) - **https://www.instagram.com/slvevents**
- [Facebook](https://facebook.com) - **https://www.facebook.com/slvevents**
- [Google Business Profile](https://business.google.com)

Update the layout.js with your actual social handles when you create them.

### 6. Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Verify ownership
4. Submit sitemap

### 7. Yelp & Local Directories

Create listings on:
- [Yelp](https://yelp.com) - Business page
- [Justdial](https://justdial.com) - India local directory
- [ Sulekha](https://sulekha.com) - Indian local services
- [IndiaMART](https://indiamart.com) - B2B marketplace

## 🔑 Keywords to Target

### Primary Keywords (Include in page titles and descriptions)
- party decorators bangalore
- birthday decoration bangalore
- balloon decoration bangalore
- event decorators bangalore
- theme decoration bangalore
- anniversary decoration bangalore

### Secondary Keywords
- party decoration near me
- birthday party decoration
- kids birthday party bangalore
- balloon party decoration
- theme party setup
- corporate event decoration

### Long-tail Keywords
- birthday decoration for kids in bangalore
- cheap balloon decoration in bangalore
- best party decorators in bangalore
- anniversary celebration decoration bangalore
- baby shower decoration bangalore

## 📊 Rich Snippets You Can Get

By completing the setup, you can achieve these rich snippets:

1. **Local Business Rich Snippet**
   - Shows business rating, hours, location
   - Requires: Google Business Profile + Structured Data

2. **FAQ Rich Snippet**
   - Shows questions and answers in search
   - Requires: FAQ schema (already added)

3. **Image Rich Snippet**
   - Your images appear in Google Images
   - Requires: Alt text on all images (needs admin update)

4. **Breadcrumb Rich Snippet**
   - Shows category path in search
   - Requires: BreadcrumbList schema (partially added)

## 🚀 Speed Optimization

For better ranking, optimize images:

1. Use WebP format instead of PNG/JPG
2. Compress images (use TinyPNG or Squoosh)
3. Add lazy loading to images
4. Use next/image for automatic optimization

## 📈 Google Analytics Setup

1. Go to [Google Analytics](https://analytics.google.com)
2. Create account and property
3. Get your Measurement ID (starts with G-)
4. Add to environment variables:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📱 Mobile Optimization

Your website is already mobile-friendly (Next.js default). Verify at:
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## 🔍 Monthly SEO Tasks

1. Check Google Search Console for errors
2. Monitor search queries in Search Console
3. Add new designs/content regularly
4. Collect customer reviews on Google Business
5. Update structured data with new offerings
6. Check page speed with PageSpeed Insights
7. Monitor competitor rankings

## 📞 Need Help?

If you need assistance with any step, let me know!
