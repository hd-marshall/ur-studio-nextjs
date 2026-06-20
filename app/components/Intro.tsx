"use client"

import { useEffect, useRef, useState } from "react"

const BOOKING_URL =
  "https://www.fresha.com/a/ur-studio-melbourne-61a-peel-street-lmpkp2dv/booking?menu=true&multi=true&pId=1401362&cartId=a3f18a4e-a008-4a7e-995c-bd998ed45476"

const SHOWCASE_IMAGES = [
  "/images/gallery/gallery-1.webp",
  "/images/gallery/gallery-2.webp",
  "/images/gallery/gallery-3.webp",
  "/images/gallery/gallery-4.webp",
  "/images/gallery/gallery-5.webp",
  "/images/gallery/gallery-6.webp",
]

export default function Intro() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Track mobile carousel scroll position for the dot indicator
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) return
      setActiveIndex(Math.round((scrollLeft / maxScroll) * (SHOWCASE_IMAGES.length - 1)))
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="bg-grey py-8 lg:py-10">

      {/* Desktop: full row, evenly spaced with gaps */}
      <div className="hidden lg:grid lg:grid-cols-6 lg:gap-2 lg:px-2">
        {SHOWCASE_IMAGES.map((src, i) => (
          <div key={i} className="aspect-[4/5] overflow-hidden">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      {/* Mobile: horizontal scroll-snap carousel */}
      <div className="lg:hidden">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto snap-x snap-mandatory px-4"
          style={{ scrollbarWidth: "none" } as React.CSSProperties}
        >
          {SHOWCASE_IMAGES.map((src, i) => (
            <div key={i} className="w-32 flex-shrink-0 snap-start overflow-hidden aspect-[4/5]">
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* Dot progress indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {SHOWCASE_IMAGES.map((_, i) => (
            <div
              key={i}
              className="h-0.5 w-5 rounded-full transition-colors duration-300"
              style={{ backgroundColor: i === activeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)" }}
            />
          ))}
        </div>
      </div>

      {/* Book Now */}
      <div className="mt-8 flex justify-center lg:mt-10">
        <button
          className="bg-white text-black px-10 py-4 text-sm font-oswald font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors duration-200"
          onClick={() => window.open(BOOKING_URL, "_blank")}
        >
          Book Now
        </button>
      </div>

    </section>
  )
}
