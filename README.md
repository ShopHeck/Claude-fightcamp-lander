# Fight Camp — Launch Landing Page

Marketing site for the Fight Camp Training App.

> Train. Track. Win. — the all-in-one fight camp app for boxing, MMA, Muay Thai, and combat sports.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS 3** with custom Fight Camp design tokens
- **Framer Motion** for scroll reveals + parallax
- **Supabase** Postgres for the waitlist (optional — falls back to console logging if env vars unset)
- **Resend** for transactional welcome emails (optional)
- **lucide-react** for icons

## Local dev

```bash
npm install
cp .env.example .env.local   # then fill in real values, or leave blank for log-only mode
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.tsx              # fonts, metadata, OG
  page.tsx                # composes all sections
  globals.css             # Tailwind + design tokens
  api/waitlist/           # POST — validates, inserts, sends welcome email
  api/recent-signups/     # GET — feeds the live "just joined" ticker
components/
  Nav.tsx, Footer.tsx
  sections/               # one component per landing section
  mockups/                # CSS recreations of in-app screens
  ui/                     # PhoneFrame, WatchFrame, EmberField, ReadinessRing, etc.
lib/
  supabaseServer.ts       # server-only Supabase admin client
  resend.ts               # Resend client + email template
  campMath.ts             # pure functions for the Build-Your-Camp calculator
  useTimer.ts             # round-timer state machine
  bell.ts                 # Web Audio bell synthesis
supabase/
  migrations/0001_init.sql # waitlist table + recent_signups view
public/
  favicon.svg
```

## Database setup (Supabase)

1. Create a free project at https://supabase.com.
2. SQL editor → paste `supabase/migrations/0001_init.sql` → run.
3. Project Settings → API → copy the `URL`, `anon` key, and `service_role` key into `.env.local` and into Vercel project settings (both Production and Preview).
4. Optional: SQL editor → `select * from waitlist` to inspect signups. Use Supabase Auth + dashboard later if you want a UI.

Schema highlights:

- `public.waitlist` — every signup with email + structured camp data (discipline, weight class, fight date, current/target weight) plus UTM + IP geo.
- `public.recent_signups` view — city-only, no PII, anon-readable, used by the live ticker.
- Row Level Security is enabled and **no anon policies are added**, so anonymous clients can never read or write the table directly. Every write goes through the server with the service-role key.

## Email setup (Resend)

1. Create a Resend account → verify your sending domain → set up the DKIM/SPF/Return-Path DNS records in Cloudflare (or your registrar).
2. Generate an API key → put it in `.env.local` and Vercel.
3. Set `RESEND_FROM_EMAIL` to something like `Fight Camp <hello@yourdomain.com>`.

Templates live in `lib/resend.ts` (`welcomeEmailHtml`). The launch broadcast can reuse the same dark+orange shell.

## Domain recommendations

Order of preference (verify availability at your registrar):

1. **fightcampapp.com** — clearest "the app" framing
2. **getfightcamp.com** — common SaaS pattern
3. **trainfightcamp.com** — verbs first
4. **myfightcamp.com** — personal/ownership angle
5. **fightcamp.io** — tech-sounding alternative

Register via Cloudflare Registrar (at-cost, free privacy). Point nameservers at Cloudflare, then add the domain in Vercel → automatic SSL.

## Launch sequence

**Day 0 — Infra wire-up**
- Register domain + point to Cloudflare.
- Create Supabase project + run migration.
- Create Resend account + verify domain DNS.
- Add all env vars to Vercel (Production + Preview).
- Merge PR → Vercel deploys → custom domain live.

**Week 1 — Soft launch**
- Share with 10–20 fighter friends + coaches for feedback.
- Add Plausible or Vercel Analytics.
- Optional: drop in Cloudflare Turnstile if spam appears.

**Week 1–3 — Outreach**
- Reddit posts in `r/amateur_boxing`, `r/MMA`, `r/muaythai`, `r/bjj`.
- 15-second screen recordings of the live timer + calculator for IG/TikTok.
- 50 personalized DMs to amateur boxing / MMA coaches.
- Printable QR-code one-pagers at local gyms.

**Week 3–6 — Content moat**
- Blog posts targeting `fight camp app`, `round timer boxing app`, `weight cut calculator`.
- Each post deep-links to a relevant section anchor (e.g. `/#timer`, `/#calculator`).

**Week N — App launch**
- Segment waitlist by discipline in Supabase.
- Send Resend broadcast in waves of 500 every 30 min with personalized TestFlight / App Store links.

## Customizing

- **Brand colors**: `tailwind.config.ts` — `brand.orange`, `bg.base`, etc.
- **Hero copy**: `components/sections/Hero.tsx`
- **Phone mockups**: `components/mockups/*.tsx`
- **Email templates**: `lib/resend.ts`
- **Calculator math**: `lib/campMath.ts`
- **Testimonial videos**: `components/sections/Testimonials.tsx` — placeholder cards now, swap in real `<video>` clips before public launch.
