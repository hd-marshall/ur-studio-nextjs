"use client"

import { Award, Trophy, Medal, Star, Crown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

// ─── Data ─────────────────────────────────────────────────────────────────────

const FIRST_PLACE_AWARDS = [
  {
    icon: <Crown className="h-6 w-6" />,
    title: "Hair Festival 2025",
    achievement: "Ultimate Look",
    year: "2025",
    rank: "1st",
    color: "#FFD700",
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Expo 4 Barbers",
    achievement: "Champion",
    year: "2024",
    rank: "1st",
    color: "#FFD700",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Hair Festival",
    achievement: "Champion",
    year: "2023",
    rank: "1st",
    color: "#FFD700",
  },
]

const OTHER_AWARDS = [
  {
    icon: <Medal className="h-6 w-6" />,
    title: "Hair Festival 2025",
    achievement: "Barber Street",
    year: "2025",
    rank: "2nd",
    color: "#C0C0C0",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "One Shot Awards",
    achievement: "Fade - Top 100",
    year: "2025",
    rank: "Top 100",
    color: "#E5E4E2",
  },
]

const ALL_AWARDS = [...FIRST_PLACE_AWARDS, ...OTHER_AWARDS]

// ─── Award card ───────────────────────────────────────────────────────────────

interface AwardCardProps {
  award: typeof ALL_AWARDS[0]
  animationIndex: number
  inView: boolean
}

function AwardCard({ award, animationIndex, inView }: AwardCardProps) {
  // Spring easing overshoots slightly for the "bump into position" feel
  const transition = `
    transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${animationIndex * 110}ms,
    opacity   0.45s ease                                ${animationIndex * 110}ms
  `

  return (
    <div
      className="relative flex-shrink-0 w-80 lg:w-auto snap-start pt-4"
      style={{
        transform: inView ? "translateX(0)" : "translateX(140px)",
        opacity: inView ? 1 : 0,
        transition,
      }}
    >
      <div className="bg-white rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full">

        {/* Rank badge */}
        <div
          className="absolute -top-1 -right-1 w-12 h-12 rounded-full flex items-center justify-center text-white font-light text-xs shadow-lg z-10"
          style={{ backgroundColor: award.color }}
        >
          {award.rank}
        </div>

        {/* Icon */}
        <div className="inline-flex items-center justify-center p-3 rounded-full mb-5 bg-grey text-white">
          {award.icon}
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-light text-[#2C2C2C]">{award.title}</h3>
          <p className="text-[#666666] font-light text-sm">{award.achievement}</p>
          <div className="pt-4 border-t border-gray-100">
            <span className="text-xs text-[#999999] font-light">{award.year}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Awards() {
  const [inView, setInView] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Trigger animation once when the section scrolls into view
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

  // Track mobile carousel scroll position
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const newSlide = Math.round(el.scrollLeft / (320 + 16))
      setCurrentSlide(newSlide)
    }
    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="awards"
      ref={sectionRef}
      className="bg-grey py-24 lg:py-32"
    >
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-24">
          <p className="text-sm tracking-[0.3em] font-light mb-4 text-white/60">
            AWARDS AND REVIEWS
          </p>
          <h2 className="text-5xl font-extralight mb-6 text-white [text-shadow:0_2px_10px_rgb(var(--grey)/0.85)]">
            MULTI AWARD WINNING
          </h2>
          <p className="text-lg max-w-2xl mx-auto font-extralight leading-7 text-white/60">
            Recognised excellence in barbering craftsmanship with multiple industry awards and outstanding client satisfaction.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:block mb-20">
          <div className="grid grid-cols-3 gap-8 mb-10">
            {FIRST_PLACE_AWARDS.map((award, i) => (
              <AwardCard key={`first-${i}`} award={award} animationIndex={i} inView={inView} />
            ))}
          </div>

          <div className="grid grid-cols-6 gap-8">
            <div className="col-start-2 col-span-2">
              <AwardCard award={OTHER_AWARDS[0]} animationIndex={3} inView={inView} />
            </div>
            <div className="col-start-4 col-span-2">
              <AwardCard award={OTHER_AWARDS[1]} animationIndex={4} inView={inView} />
            </div>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            <div className="flex space-x-4 w-max px-4">
              {ALL_AWARDS.map((award, i) => (
                <AwardCard key={`mobile-${i}`} award={award} animationIndex={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Slide indicator */}
          <div className="flex justify-center mt-8">
            <div className="bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
              {ALL_AWARDS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
              <span className="text-white text-sm ml-3 font-light">
                {currentSlide + 1} / {ALL_AWARDS.length}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
