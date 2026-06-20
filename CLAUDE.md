# UR Studio — CLAUDE.md

## Project overview
Next.js 15 barbershop website for UR Studio (Melbourne). Client: Milo Le. Design direction is cinematic, minimal, dark — Oswald font throughout, B&W photography, awards-forward.

## Tech stack
- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS v3 + shadcn/ui components
- **Fonts**: Oswald (Google, `--font-oswald`, `font-oswald` Tailwind class) — sitewide default, applied directly on `<body>` in `app/layout.tsx`. Inter has been removed; don't reintroduce it.
- **Booking**: Fresha link (hardcoded in Hero.tsx and Header.tsx as `BOOKING_URL`)
- **Analytics**: @vercel/analytics, @vercel/speed-insights

## Critical npm rule
**Never run `npm audit fix` or `npm audit fix --force`.** The package.json previously had a stale `"next": "^9.3.3"` spec. Running audit fix will downgrade Next.js to 9.3.3 and break everything. Vulnerabilities are handled via the `"overrides"` field in package.json. Use `npm install --legacy-peer-deps` for any installs.

## Key files
- `app/page.tsx` — homepage component order: Hero → HomeGallery → Intro → Reviews → Contact (Services, Stats/Awards, and About are currently commented out in the JSX, not deleted)
- `app/components/Hero.tsx` — full-viewport hero with a scroll-linked parallax drift on the background image. Sub-components: `WinItem`, `WinsBar`, `HeroContent`
- `app/components/Header.tsx` — transparent nav that fades continuously into the unified grey over the first 100px of scroll, Oswald text logo, 5 links, outline BOOK button
- `app/components/HomeGallery.tsx` — homepage gallery section (id `gallery`), images fade/slide in on scroll via `IntersectionObserver`, no category filter or per-image text
- `app/components/Intro.tsx` — short bridging statement section between HomeGallery and Reviews
- `app/components/Stats.tsx` — awards section (exports `Awards`) with scroll-triggered slide-in animation
- `app/components/Reviews.tsx` — full-bleed cinematic reviews section with real client quotes, cards animate in on scroll
- `app/layout.tsx` — loads Oswald (`--font-oswald`) and applies it directly on `<body>`; also where `Header`/`Footer` are rendered (not per-page)

## Design conventions
- **Hero image**: `/public/images/hero/hero.jpg` — B&W portrait, `object-cover`
- **Hero text sizes** (clamp-based, scalable): headings `clamp(2.8rem, 6.3vw, 6rem)`, subtitle `clamp(1.3rem, 3vw, 2.1rem)`
- **Hero scroll effect**: `position: sticky` does not work in this app — `html`/`body`/`main` all set `overflow-x-hidden`, which breaks sticky's containing-block resolution in every browser. Hero instead uses a true parallax: the image sits in a wrapper taller than the section (`PARALLAX_BUFFER`, currently 160px) and its `translateY` is mutated directly on a ref each scroll tick, drifting at a fraction of scroll speed. Don't reach for `position: sticky` on this page without checking that overflow chain first.
- **Wins bar**: items animate in from `translateX(100vw)` on mount (350ms delay, 120ms stagger), easing `cubic-bezier(0.22, 1, 0.36, 1)`. "The Wins" label is always static.
- **Awards animation**: `IntersectionObserver` triggers `translateX(140px) → 0` with spring easing when section scrolls into view. `HomeGallery` reuses the same spring easing for its `translateY(40px) → 0` image reveal.
- **Nav**: transparent at top, background opacity fades continuously over the first 100px of scroll (`scrollProgress` state, inline `style` using `rgb(var(--grey) / progress)`) rather than snapping at a threshold, hover underline via `after:` pseudo-element, Oswald uppercase
- **Unified grey**: every grey background/accent across the site (Header scroll state, Contact, Footer, Gallery, Awards, Services, Intro) uses the Hero's `#9e9d9b` — don't reintroduce other greys (`#383E3E`, `#F5F5F5`, `#9C9C9C`, `#EFEFEF`, `#A3A3A3` are all retired). Reviews keeps its own near-black `#0C0C0C` (treated as black, not grey).

## Current branch
Working branch: `test`. Main branch: `main`.
