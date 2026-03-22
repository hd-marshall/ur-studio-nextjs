"use client"

import { useEffect, useRef } from "react"
import { AnimatedSVG } from "@/app/components/AnimatedSVG"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Calendar } from "lucide-react"

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible")
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function EducationPage() {
  const eventRef = useScrollReveal()

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <section className="pt-12 pb-16">
        {/* SVGs stack with zero gap — full bleed on mobile, contained on md+ */}
        <div className="max-w-4xl mx-auto">
          <AnimatedSVG
            src="/images/education/hero-education.svg"
            className="w-full block"
            colorWaveDelayMs={400}
            staggerMs={120}
          />
          <AnimatedSVG
            src="/images/education/agenda-education.svg"
            className="w-full block"
            colorWaveDelayMs={400}
            staggerMs={120}
          />
          <AnimatedSVG
            src="/images/education/teaching-education.svg"
            className="w-full block"
            colorWaveDelayMs={400}
            staggerMs={120}
          />
        </div>

        {/* Event info */}
        <div className="max-w-2xl mx-auto px-6 mt-16">
          <div ref={eventRef} className="reveal space-y-10">

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
