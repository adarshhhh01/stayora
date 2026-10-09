# Stayora — Hotel Booking Enquiry Website

A responsive single-page hotel website built with **React + Vite + Tailwind CSS + GSAP ScrollTrigger**.

## Features

- Premium responsive hotel landing page
- Animated hero, section reveals, room cards and navigation
- Room categories with detail modal and prefilled enquiry
- Booking enquiry form with date, guest, room and contact fields
- Client-side validation and review summary
- WhatsApp handoff with a prefilled enquiry message
- Configurable hotel profile and room data
- Reduced-motion support and accessible labels
- Production build configuration for Vercel / Netlify

## Run locally

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Customize for a real hotel

Edit `src/data.js`:
- hotel name, tagline and contact information
- WhatsApp number
- address and map link
- room names, descriptions, amenities and indicative prices
- experiences and reviews

Set a real WhatsApp number in `.env` (copy `.env.example` to `.env`):

```env
VITE_HOTEL_WHATSAPP=919876543210
```

Use international format with country code and digits only, without `+`, spaces or dashes. Restart the dev server after changing environment variables.

The fallback WhatsApp number in `src/data.js` is a placeholder. Replace it before sharing the site with a hotel or customer.

## Important booking behaviour

This is a **booking enquiry** template, not a live reservation engine. It does not check room inventory, collect payments, or confirm bookings. Submitting the form opens WhatsApp with the enquiry summary so the hotel can check availability and confirm manually.

For production use, connect a backend endpoint to store enquiries, send notifications, prevent duplicate submissions, and issue enquiry reference numbers. Do not place private API keys in frontend code.

## Deployment

### Vercel
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add `VITE_HOTEL_WHATSAPP` under Project Settings → Environment Variables.

### Netlify
Build command: `npm run build`; publish directory: `dist`.

## Notes

- Hotel imagery currently uses remote Unsplash image URLs, so an internet connection is needed for those images.
- Sample reviews and prices are demo content. Replace them with verified hotel information before publishing.
