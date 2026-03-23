"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatedSVG } from "@/app/components/AnimatedSVG"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react"

const SLIDES = [
  "/images/education/hero-education.svg",
  "/images/education/agenda-education.svg",
  "/images/education/teaching-education.svg",
]

function SVGCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Track which slide has snapped into view via native scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth)
      setActiveIndex(Math.min(index, SLIDES.length - 1))
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" })
  }

  return (
    <div className="relative select-none">
      {/* Slides — native scroll with CSS snap */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory md:h-[85vh]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {SLIDES.map((src, i) => (
          <div key={src} className="svg-carousel-slide snap-start w-full shrink-0 md:flex md:items-center md:justify-center md:h-full">
            <AnimatedSVG
              src={src}
              className="w-full block md:h-full"
              colorWaveDelayMs={400}
              staggerMs={120}
              isActive={activeIndex === i}
            />
          </div>
        ))}
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
        aria-label="Previous"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 shadow hover:bg-white dark:hover:bg-black transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => scrollTo(Math.min(SLIDES.length - 1, activeIndex + 1))}
        aria-label="Next"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 shadow hover:bg-white dark:hover:bg-black transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 bg-black dark:bg-white"
                : "w-2 bg-gray-300 dark:bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <style>{`
        /* On desktop, make inline SVGs scale to fit the 85vh container */
        @media (min-width: 768px) {
          .svg-carousel-slide > div,
          .svg-carousel-slide > div > div {
            height: 100%;
          }
          .svg-carousel-slide svg {
            height: 100%;
            width: auto;
            display: block;
            margin: 0 auto;
          }
        }
      `}</style>

      <section className="pt-12 pb-16">
        <div className="max-w-4xl mx-auto">
          <SVGCarousel />
        </div>

        {/* Event info */}
        <div className="max-w-2xl mx-auto px-6 mt-16">
          <div className="space-y-10">

            {/* When & Where */}
            <div className="space-y-3">
              <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light">
                WHEN &amp; WHERE
              </p>
              <p className="text-5xl font-extralight text-black dark:text-white mb-8">
                UR Studio - May 4th
              </p>
              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=UR+Studio+Look+%26+Learn+Seminar&dates=20260504T093000/20260504T163000&location=61A+Peel+Street+West+Melbourne+VIC+3003"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-light tracking-wide text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <Calendar className="h-4 w-4 shrink-0" />
                Monday, May 4, 2026 · 9:30 am – 4:30 pm
              </a>
              <a
                href="https://maps.google.com/?q=61A+Peel+Street+West+Melbourne+VIC+3003"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-light tracking-wide text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <MapPin className="h-4 w-4 shrink-0" />
                61A Peel Street, West Melbourne VIC 3003
              </a>
            </div>

            {/* Seminar description */}
            <div className="space-y-6">
              <p
                className="text-base font-extralight leading-7 text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Throughout this seminar, we'll demonstrate our processes live. Rather than focusing only on techniques, this seminar explores the reasoning and philosophy that guide every haircut, from cutting to styling.
              </p>
              <p
                className="text-base font-extralight leading-7 text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Designed for barbers looking to refine their vision and approach to hair, this intimate session allows for open discussion, questions, and deeper insight into our workflow.
              </p>
              <p
                className="text-base font-extralight leading-7 text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "var(--font-body)" }}
              >
                With limited seats available, the environment is kept small to encourage learning, interaction, and a closer look at the details that matter.
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-4 text-sm tracking-wide font-light group"
              onClick={() =>
                window.open(
                  "https://www.eventbrite.com/e/ur-studio-look-learn-seminar-tickets-1984750286535?aff=oddtdtcreator&utm_source=ig&utm_medium=social&utm_content=link_in_bio",
                  "_blank"
                )
              }
            >
              REGISTER ON EVENTBRITE
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
