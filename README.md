# Fight Camp — Launch Landing Page

Marketing site for the Fight Camp Training App.

> Train. Track. Win. — the all-in-one fight camp app for boxing, MMA, Muay Thai, and combat sports.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS 3** with custom Fight Camp design tokens
- **Framer Motion** for scroll reveals and parallax
- **lucide-react** for icons

## Local dev

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.tsx          # fonts, metadata, OG
  page.tsx            # composes all sections
  globals.css         # Tailwind + design tokens
  api/waitlist/       # POST stub for email signups
components/
  Nav.tsx, Footer.tsx
  sections/           # one component per landing section
  mockups/            # CSS recreations of in-app screens
  ui/                 # PhoneFrame, WatchFrame, WaitlistForm, Reveal, etc.
public/
  favicon.svg
```

## Customizing

- **Brand colors**: `tailwind.config.ts` — `brand.orange`, `bg.base`, etc.
- **Hero copy**: `components/sections/Hero.tsx`
- **Phone mockups**: `components/mockups/*.tsx`
- **Waitlist provider**: `app/api/waitlist/route.ts` currently logs only — wire to Resend/ConvertKit/Mailchimp when ready.
- **Testimonials**: `components/sections/Testimonials.tsx` (placeholder copy, marked TODO).
