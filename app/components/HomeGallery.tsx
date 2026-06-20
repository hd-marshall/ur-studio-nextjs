"use client"

import { useState, useRef, useEffect } from "react"

const GALLERY_IMAGES = [
  "/images/gallery/gallery-5.webp",
  "/images/gallery/gallery-2.webp",
  "/images/gallery/gallery-4.webp",
  "/images/gallery/gallery-3.webp",
  "/images/gallery/gallery-1.webp",
  "/images/gallery/gallery-6.webp",
]

// ─── Gallery image ──────────────────────────────────────────────────────────

interface GalleryImageProps {
  src: string
  animationIndex: number
  inView: boolean
}

function GalleryImage({ src, animationIndex, inView }: GalleryImageProps) {
  // Same scroll-linked spring easing as the Awards reveal, staggered per image
  const transition = `
    transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${animationIndex * 90}ms,
    opacity   0.45s ease                                ${animationIndex * 90}ms
  `

  return (
    <div
      className="relative aspect-[4/5] w-[75vw] flex-shrink-0 snap-start overflow-hidden lg:w-auto lg:flex-shrink"
      style={{
        transform: inView ? "translateY(0)" : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transition,
      }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function HomeGallery() {
  const [inView, setInView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Trigger the reveal once when the section scrolls into view, same pattern as Stats.tsx
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
      setActiveIndex(Math.round((scrollLeft / maxScroll) * (GALLERY_IMAGES.length - 1)))
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="bg-grey py-12 lg:py-24">
      <div className="container mx-auto px-6">

        {/* Desktop row */}
        <div className="hidden lg:grid lg:grid-cols-6 lg:gap-4">
          {GALLERY_IMAGES.map((src, i) => (
            <GalleryImage key={src} src={src} animationIndex={i} inView={inView} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {GALLERY_IMAGES.map((src, i) => (
              <GalleryImage key={src} src={src} animationIndex={i} inView={inView} />
            ))}
          </div>

          {/* Dot progress indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {GALLERY_IMAGES.map((_, i) => (
              <div
                key={i}
                className="h-0.5 w-5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: i === activeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)" }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
