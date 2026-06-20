"use client"

import { useState, useEffect, useRef } from "react"

const BOOKING_URL =
  "https://www.fresha.com/a/ur-studio-melbourne-61a-peel-street-lmpkp2dv/booking?menu=true&multi=true&pId=1401362&cartId=a3f18a4e-a008-4a7e-995c-bd998ed45476"

const WINS = [
  { event: "Hair Festival",   achievement: "Ultimate Look",  placement: "1ST",     year: "2025" },
  { event: "Expo 4 Barbers",  achievement: "Champion",       placement: "1ST",     year: "2024" },
  { event: "Hair Festival",   achievement: "Barber Street",  placement: "1ST",     year: "2023" },
  { event: "One Shot Awards", achievement: "Men's Cut",      placement: "Top 100", year: "2025" },
  { event: "One Shot Awards", achievement: "Fade",           placement: "Top 100", year: "2024" },
  { event: "Hair Festival",   achievement: "Barber Street",  placement: "2ND",     year: "2025" },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

interface WinItemProps {
  event: string
  achievement: string
  placement: string
  year: string
  index: number
  animated: boolean
}

function WinItem({ event, achievement, placement, year, index, animated }: WinItemProps) {
  // Items fly in from fully off-screen right, staggered, with spring bump on landing
  const delay = index * 80
  return (
    <div
      className="flex flex-shrink-0 items-center gap-6"
      style={{
        transform: animated ? "translateX(0)" : "translateX(100vw)",
        opacity: animated ? 1 : 0,
        transition: `transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 0.3s ease ${delay}ms`,
      }}
    >
      {/* Fixed min-width keeps each award the same "4 across" size regardless of text length */}
      <div className="min-w-[200px]">
        <p className="text-white text-sm font-semibold font-oswald tracking-wide whitespace-nowrap">{event}</p>
        <p className="text-white/50 text-xs tracking-widest uppercase font-light whitespace-nowrap">
          {achievement} &middot; {placement} &middot; {year}
        </p>
      </div>
      {/* Same divider bar as the "The Wins" label separator, for visual consistency */}
      <div className="w-px h-8 flex-shrink-0 bg-white/20" />
    </div>
  )
}

function WinsBar() {
  const [animated, setAnimated] = useState(false)
  const [marqueeStarted, setMarqueeStarted] = useState(false)

  useEffect(() => {
    // Fire the slide-in animation shortly after mount
    const introTimer = setTimeout(() => setAnimated(true), 50)
    // Once every item has finished its staggered slide-in, hand off to a
    // continuously looping marquee so all the wins keep cycling through —
    // same on desktop and mobile, no separate layouts needed. No extra pause
    // here: the marquee starts the instant the last item lands.
    const introDuration = 50 + (WINS.length - 1) * 80 + 650
    const marqueeTimer = setTimeout(() => setMarqueeStarted(true), introDuration)
    return () => {
      clearTimeout(introTimer)
      clearTimeout(marqueeTimer)
    }
  }, [])

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden bg-black/45 backdrop-blur-sm">
      <div className="flex items-center py-4">

        {/* Static label, never scrolls */}
        <div className="flex flex-shrink-0 items-center gap-6 pl-6 lg:pl-12">
          <span className="text-white text-xs tracking-[0.3em] font-semibold font-oswald uppercase whitespace-nowrap">
            The Wins
          </span>
          <div className="w-px h-8 bg-white/20" />
        </div>

        {/* Awards track — slides in once, then loops continuously */}
        <div className="flex-1 overflow-hidden">
          <div
            className={`flex w-max items-center gap-6 ${marqueeStarted ? "animate-marquee" : ""}`}
            style={{ willChange: "transform" }}
          >
            {[...WINS, ...WINS].map((win, i) => (
              <WinItem key={i} {...win} index={i % WINS.length} animated={animated} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-screen w-full flex-col px-6 pb-32 pt-8 lg:justify-center lg:px-12">

      {/* Takes up all the space above the button, centering the text within it
          (i.e. lower than the very top, roughly mid-screen) instead of pinning
          it to the top. On desktop this collapses back so text + button pack
          together as one centered group, same as before. */}
      <div className="flex flex-1 items-center lg:flex-none">
        <div className="max-w-xl">

          {/* Bigger floor on mobile (clamp's min) with a hard shadow for legibility over the photo; both fall away on desktop */}
          <h1
            className="font-oswald font-bold text-white uppercase leading-none [text-shadow:0_2px_10px_rgb(var(--grey)/0.85)]"
            style={{ fontSize: "clamp(3.6rem, 6.3vw, 6rem)" }}
          >
            3 Awards.
          </h1>

          <h1
            className="font-oswald font-bold text-white uppercase leading-none [text-shadow:0_2px_10px_rgb(var(--grey)/0.85)]"
            style={{ fontSize: "clamp(3.6rem, 6.3vw, 6rem)" }}
          >
            3 Years.
          </h1>

          <p
            className="font-oswald font-normal text-white uppercase mt-4 leading-tight"
            style={{ fontSize: "clamp(1.3rem, 3vw, 2.1rem)" }}
          >
            Australia&apos;s Biggest<br />Barbering Competitions.
          </p>

        </div>
      </div>

      <button
        className="mt-8 self-center bg-white text-black px-10 py-4 text-sm font-oswald font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors duration-200 lg:self-start"
        onClick={() => window.open(BOOKING_URL, "_blank")}
      >
        Book Now
      </button>

    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

const PARALLAX_BUFFER = 160 // px of vertical drift room on the background image

export default function Hero() {
  // `position: sticky` doesn't engage here because html/body/main all set
  // overflow-x-hidden (to stop horizontal scroll elsewhere), which breaks sticky's
  // containing-block resolution in every browser. So instead of pinning, the image
  // sits in a wrapper taller than the section and drifts via `translateY` at a
  // fraction of scroll speed (classic parallax) — mutated directly on the ref
  // rather than through state so it doesn't re-render on every scroll tick.
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      const image = imageRef.current
      if (!section || !image) return
      const progress = Math.min(Math.max(-section.getBoundingClientRect().top / window.innerHeight, 0), 1)
      image.style.transform = `translateY(${progress * PARALLAX_BUFFER - PARALLAX_BUFFER / 2}px)`
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <section id="home" ref={sectionRef} className="relative h-screen overflow-hidden bg-grey">

      <div
        ref={imageRef}
        className="absolute left-0 w-full"
        style={{ top: -PARALLAX_BUFFER / 2, height: `calc(100% + ${PARALLAX_BUFFER}px)` }}
      >
        <img
          src="/images/hero/hero.jpg"
          alt="Award-winning barbershop"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "42% center" }}
        />
        {/* Dark-left gradient overlay, fades to transparent at ~38% from left */}
        <div
          className="absolute inset-0 z-[5]"
          style={{ background: "linear-gradient(to right, rgb(var(--grey) / 0.80) 0%, rgb(var(--grey) / 0.50) 18%, rgb(var(--grey) / 0) 35%)" }}
        />
      </div>

      <HeroContent />

      <WinsBar />

    </section>
  )
}
