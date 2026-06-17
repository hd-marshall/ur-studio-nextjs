# UR Studio — CLAUDE.md

## Project overview
Next.js 15 barbershop website for UR Studio (Melbourne). Client: Milo Le. Design direction is cinematic, minimal, dark — Oswald font throughout, B&W photography, awards-forward.

## Tech stack
- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v3 + shadcn/ui components
- **Fonts**: Oswald (Google, `--font-oswald`, `font-oswald` Tailwind class) — primary brand font. Inter — body fallback.
- **Booking**: Fresha link (hardcoded in Hero.tsx and Header.tsx as `BOOKING_URL`)
- **Analytics**: @vercel/analytics, @vercel/speed-insights

## Critical npm rule
**Never run `npm audit fix` or `npm audit fix --force`.** The package.json previously had a stale `"next": "^9.3.3"` spec. Running audit fix will downgrade Next.js to 9.3.3 and break everything. Vulnerabilities are handled via the `"overrides"` field in package.json. Use `npm install --legacy-peer-deps` for any installs.

## Key files
- `app/page.tsx` — homepage component order: Hero → Gallery → Stats → Reviews → About → Contact
- `app/components/Hero.tsx` — full-screen hero with WinsBar animation. Sub-components: `WinItem`, `WinsBar`, `HeroContent`
- `app/components/Header.tsx` — transparent nav, Oswald text logo, 5 links, outline BOOK button
- `app/components/Stats.tsx` — awards section with scroll-triggered slide-in animation
- `app/components/Reviews.tsx` — placeholder review cards (client to supply real reviews)
- `app/layout.tsx` — loads Oswald (`--font-oswald`) and Inter fonts

## Design conventions
- **Hero image**: `/public/images/hero/hero.jpg` — B&W portrait, `object-cover`
- **Hero text sizes** (clamp-based, scalable): headings `clamp(2.1rem, 4.8vw, 4.5rem)`, subtitle `clamp(0.98rem, 2.25vw, 1.6rem)`
- **Wins bar**: items animate in from `translateX(100vw)` on mount (350ms delay, 120ms stagger), easing `cubic-bezier(0.22, 1, 0.36, 1)`. "The Wins" label is always static.
- **Awards animation**: `IntersectionObserver` triggers `translateX(140px) → 0` with spring easing when section scrolls into view
- **Nav**: fully transparent, hover underline via `after:` pseudo-element, Oswald uppercase
- **Section background colours**: hero `#9e9d9b`, awards `#F5F5F5`, reviews `#0C0C0C`

## Current branch
Working branch: `test`. Main branch: `main`.
