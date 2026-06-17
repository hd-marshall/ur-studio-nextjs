"use client"

import React, { useState, useEffect, useRef } from "react"

const BOOKING_URL =
  "https://www.fresha.com/a/ur-studio-melbourne-61a-peel-street-lmpkp2dv/booking?menu=true&multi=true&pId=1401362&cartId=a3f18a4e-a008-4a7e-995c-bd998ed45476"

const WINS = [
  { event: "Hair Festival",   achievement: "Ultimate Look", placement: "1ST",     year: "2025" },
  { event: "Expo 4 Barbers",  achievement: "Champion",      placement: "1ST",     year: "2024" },
  { event: "Hair Festival",   achievement: "Champion",      placement: "2ND",     year: "2023" },
  { event: "One Shot Awards", achievement: "Fade",          placement: "Top 100", year: "2025" },
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
      className="flex-shrink-0"
      style={{
        transform: animated ? "translateX(0)" : "translateX(100vw)",
        opacity: animated ? 1 : 0,
        transition: `transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 0.3s ease ${delay}ms`,
      }}
    >
      <p className="text-white text-sm font-semibold font-oswald tracking-wide whitespace-nowrap">{event}</p>
      <p className="text-white/50 text-xs tracking-widest uppercase font-light whitespace-nowrap">
        {achievement} &middot; {placement} &middot; {year}
      </p>
    </div>
  )
}

function WinsBar() {
  const [animated, setAnimated] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Fire the slide-in animation shortly after mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 50)
    return () => clearTimeout(timer)
  }, [])

  // Track scroll position for mobile indicator
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) return
      setActiveIndex(Math.round((scrollLeft / maxScroll) * (WINS.length - 1)))
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/45 backdrop-blur-sm z-20">

      {/* ── Desktop: THE WINS fixed left, items spread across remaining space ── */}
      <div className="hidden lg:flex items-center px-12 py-4 gap-6">
        <span className="text-white text-xs tracking-[0.3em] font-semibold font-oswald uppercase whitespace-nowrap flex-shrink-0">
          The Wins
        </span>
        <div className="w-px h-8 bg-white/20 flex-shrink-0" />
        <div className="flex flex-1 items-center">
          {WINS.map((win, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="w-px h-8 bg-white/20 flex-shrink-0" />}
              <div className="flex-1 flex items-center justify-center">
                <WinItem {...win} index={i} animated={animated} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Mobile: THE WINS fixed left, items scroll horizontally ── */}
      <div className="lg:hidden">
        <div className="flex items-center px-6 py-4 gap-4">
          {/* Static label */}
          <span className="text-white text-xs tracking-[0.3em] font-semibold font-oswald uppercase whitespace-nowrap flex-shrink-0">
            The Wins
          </span>
          <div className="w-px h-8 bg-white/20 flex-shrink-0" />
          {/* Scrollable items */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" } as React.CSSProperties}
          >
            {WINS.map((win, i) => (
              <div key={i} className="snap-center flex-shrink-0">
                <WinItem {...win} index={i} animated={animated} />
              </div>
            ))}
          </div>
        </div>

        {/* Grey dot progress indicator */}
        <div className="flex justify-center gap-2 pb-2">
          {WINS.map((_, i) => (
            <div
              key={i}
              className="h-0.5 w-5 rounded-full transition-colors duration-300"
              style={{ backgroundColor: i === activeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

function HeroContent() {
  return (
    <div className="relative z-10 w-full px-6 lg:px-12 pb-32 pt-8 flex items-center min-h-screen">
      <div className="max-w-xl">

        {/* Text is 35% smaller than the original sizes */}
        <h1
          className="font-oswald font-bold text-white uppercase leading-none"
          style={{ fontSize: "clamp(2.8rem, 6.3vw, 6rem)" }}
        >
          3 Awards.
        </h1>

        <h1
          className="font-oswald font-bold text-white uppercase leading-none"
          style={{ fontSize: "clamp(2.8rem, 6.3vw, 6rem)" }}
        >
          3 Years.
        </h1>

        <p
          className="font-oswald font-normal text-white uppercase mt-4 leading-tight"
          style={{ fontSize: "clamp(1.3rem, 3vw, 2.1rem)" }}
        >
          Australia&apos;s Biggest<br />Barbering Competitions.
        </p>

        <button
          className="mt-8 bg-white text-black px-10 py-4 text-sm font-oswald font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors duration-200"
          onClick={() => window.open(BOOKING_URL, "_blank")}
        >
          Book Now
        </button>

      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-[#9e9d9b] overflow-hidden">

      <img
        src="/images/hero/hero.jpg"
        alt="Award-winning barbershop"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Dark-left gradient overlay, fades to transparent at ~38% from left */}
      <div
        className="absolute inset-0 z-[5]"
        style={{ background: "linear-gradient(to right, rgba(55,55,55,0.80) 0%, rgba(55,55,55,0.50) 18%, rgba(55,55,55,0.0) 35%)" }}
      />

      <HeroContent />

      <WinsBar />

    </section>
  )
}
