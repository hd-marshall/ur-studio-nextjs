"use client"

import { useEffect, useRef, useState } from "react"

const BOOKING_URL =
  "https://www.fresha.com/a/ur-studio-melbourne-61a-peel-street-lmpkp2dv/booking?menu=true&multi=true&pId=1401362&cartId=a3f18a4e-a008-4a7e-995c-bd998ed45476"

const REVIEWS = [
  {
    name: "Simon W.",
    text: "Best barber shop in Melbourne. End of.",
    rating: 5,
  },
  {
    name: "Verified Client",
    text: "Ben is that guy! Best haircuts I've ever gotten. I drive 40 minutes from the south east just for his cuts.",
    rating: 5,
  },
  {
    name: "Shalitha K.",
    text: "Milo is very talented and pays great attention to detail. The best haircut I've had in Melbourne.",
    rating: 5,
  },
  {
    name: "Lisa B.",
    text: "Incredibly skilled and always gives a brilliant haircut. Best barber in Melbourne.",
    rating: 5,
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ count, className = "w-3.5 h-3.5" }: { count: number; className?: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className={`${className} text-white`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

interface ReviewCardProps {
  review: typeof REVIEWS[0]
  animationIndex: number
  inView: boolean
}

function ReviewCard({ review, animationIndex, inView }: ReviewCardProps) {
  // Spring easing overshoots slightly for the "bump into position" feel
  const transition = `
    transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${animationIndex * 110}ms,
    opacity   0.45s ease                                ${animationIndex * 110}ms
  `

  return (
    <div
      className="flex-shrink-0 w-72 snap-start lg:w-auto"
      style={{
        transform: inView ? "translateX(0)" : "translateX(140px)",
        opacity: inView ? 1 : 0,
        transition,
      }}
    >
      <div className="flex h-full flex-col bg-black/40 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-black/60 font-oswald text-[11px] font-bold text-white">
            G
          </div>
          <StarRating count={review.rating} />
        </div>
        <p className="flex-1 text-sm leading-relaxed text-white/90">
          {review.text}
        </p>
        <p className="mt-4 font-oswald text-xs uppercase tracking-[0.2em] text-white/55">
          {review.name}
        </p>
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function Reviews() {
  const [inView, setInView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Trigger the cards' spring slide-in once the section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Track mobile carousel scroll position for the dot indicator
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) return
      setActiveIndex(Math.round((scrollLeft / maxScroll) * (REVIEWS.length - 1)))
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="reviews" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#0C0C0C]">

      <img
        src="/images/reviews/reviews-mobile.png"
        alt="UR Studio clients"
        className="absolute inset-0 h-full w-full object-cover object-center lg:hidden"
      />
      <img
        src="/images/reviews/reviews.JPG"
        alt="UR Studio clients"
        className="absolute inset-0 hidden h-full w-full object-cover object-center lg:block"
      />
      <div className="absolute inset-0 z-[5] bg-black/35" />

      {/* Heading block — pt clears the fixed header (60px mobile / 74px desktop) with a small gap */}
      <div className="relative z-10 px-6 pt-20 text-center lg:pt-24">
        <h2
          className="font-oswald font-bold uppercase leading-none text-white [text-shadow:0_2px_10px_rgb(var(--grey)/0.85)]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
        >
          What Our Clients Say
        </h2>
        {/* Stacked main text → stars → text on mobile, back to one row on desktop */}
        <div className="mt-3 flex flex-col items-center gap-2 lg:flex-row lg:justify-center lg:gap-3">
          <StarRating count={5} className="w-4 h-4" />
          <p className="font-oswald text-xs uppercase tracking-[0.25em] text-white/90 lg:text-sm">
            5 Stars &middot; 600+ Reviews Across All Platforms
          </p>
        </div>
      </div>

      {/* Bottom block: review cards + Book Now */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-12 lg:pb-16">

        {/* Desktop grid */}
        <div className="mx-auto hidden max-w-6xl grid-cols-4 items-stretch gap-4 px-6 lg:grid">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} animationIndex={i} inView={inView} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-6 px-6 pb-2"
            style={{ scrollbarWidth: "none" } as React.CSSProperties}
          >
            {REVIEWS.map((review, i) => (
              <ReviewCard key={i} review={review} animationIndex={i} inView={inView} />
            ))}
          </div>

          {/* Dot progress indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {REVIEWS.map((_, i) => (
              <div
                key={i}
                className="h-0.5 w-5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: i === activeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)" }}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="bg-white px-10 py-4 font-oswald text-sm font-bold uppercase tracking-[0.2em] text-black transition-colors duration-200 hover:bg-gray-100"
            onClick={() => window.open(BOOKING_URL, "_blank")}
          >
            Book Now
          </button>
        </div>

      </div>

    </section>
  )
}
