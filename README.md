<<<<<<< HEAD
# makeover
=======
# SLV Events — Party Decoration Website

Built with Next.js 14 · Deployed on Vercel · Emails via Resend

---

## 🚀 Deploy in 15 minutes (step by step)

### Step 1 — Set up locally

```bash
# 1. Install Node.js if you don't have it: https://nodejs.org
# 2. Open terminal in this folder and run:
npm install
```

### Step 2 — Get your free Resend API key

1. Go to https://resend.com and sign up (free)
2. Go to **API Keys** → click **Create API Key**
3. Copy the key (starts with `re_`)

### Step 3 — Create your environment file

```bash
# Copy the example file
cp .env.local.example .env.local
```

Now open `.env.local` and replace:
- `re_XXXXXXXXXXXXXXXXXXXXXXXX` → your actual Resend API key
- `hello@slvevents.in` → the client's actual email address

### Step 4 — Customise client details

Search for `XXXXXXXXXXX` in the codebase and replace with the client's actual WhatsApp number (with country code, no +):
- `components/WhatsAppButton.js`
- `app/services/[slug]/page.js`
- `app/booking/page.js`
- `app/contact/page.js`

Also update the phone number in:
- `app/layout.js` (schema markup)
- `components/Navbar.js`
- `components/Footer.js`

### Step 5 — Test locally

```bash
npm run dev
# Open http://localhost:3000
```

### Step 6 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — SLV Events website"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/slv-events.git
git push -u origin main
```

### Step 7 — Deploy to Vercel (free)

1. Go to https://vercel.com and sign in with GitHub
2. Click **New Project** → select your `slv-events` repo
3. Under **Environment Variables**, add:
   - `RESEND_API_KEY` = your Resend API key
   - `OWNER_EMAIL` = client's email
4. Click **Deploy** — done! 🎉

### Step 8 — Add custom domain (optional)

1. In Vercel project → **Settings** → **Domains**
2. Add `slvevents.in` (or whatever domain the client has)
3. Update DNS records as shown by Vercel

---

## 📁 Project structure

```
slv-events/
├── app/
│   ├── page.js              ← Home page
│   ├── layout.js            ← SEO metadata + schema
│   ├── sitemap.js           ← Auto sitemap for Google
│   ├── robots.js            ← robots.txt
│   ├── globals.css          ← Global styles
│   ├── services/
│   │   ├── page.js          ← All services listing
│   │   └── [slug]/page.js   ← Individual service detail
│   ├── booking/page.js      ← Booking enquiry form
│   ├── about/page.js        ← About us
│   ├── contact/page.js      ← Contact page
│   └── api/booking/route.js ← Email API (Resend)
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── ServiceCard.js
│   └── WhatsAppButton.js
└── data/
    └── services.js          ← All services data (edit here!)
```

---

## ✏️ How to add/edit services

Open `data/services.js` and add a new object following the same pattern. The service will automatically appear on the listing page, get its own detail page, and be added to the sitemap.

## 📧 How Resend email works

When a user submits the booking form → `app/api/booking/route.js` fires → sends a formatted email to the client's inbox via Resend's free tier (3,000 emails/month).

**Important**: In Resend dashboard, you must verify your sending domain (`slvevents.in`) or use `onboarding@resend.dev` as the from address during testing.

---

## 🔍 SEO checklist before launch

- [ ] Add Google Search Console verification code in `app/layout.js`
- [ ] Replace all `XXXXXXXXXXX` with real phone numbers
- [ ] Update `slvevents.in` to actual domain throughout
- [ ] Add real photos (replace Unsplash URLs with actual service photos)
- [ ] Submit sitemap in Google Search Console: `https://slvevents.in/sitemap.xml`
- [ ] Add Google Analytics (optional, free)

---

Built for SLV Events, Bangalore · 2025
>>>>>>> 31ea4e3 (Initial commit)
