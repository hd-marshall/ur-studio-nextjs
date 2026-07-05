"use client"

import { useState, useRef, useEffect } from "react"
import type { GalleryPost } from "@/lib/instagram"

const INSTAGRAM_URL = "https://www.instagram.com/urstudio.au?igsh=MXBoanY0Y2FjamJzbA=="

// ─── Gallery image ──────────────────────────────────────────────────────────

interface GalleryImageProps {
  post: GalleryPost
  animationIndex: number
  inView: boolean
}

function GalleryImage({ post, animationIndex, inView }: GalleryImageProps) {
  // Same scroll-linked spring easing as the Awards reveal, staggered per image
  const transition = `
    transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${animationIndex * 90}ms,
    opacity   0.45s ease                                ${animationIndex * 90}ms
  `

  const image = <img src={post.src} alt={post.alt} className="w-full h-full object-cover" />

  return (
    <div
      className="relative aspect-[4/5] w-[75vw] flex-shrink-0 snap-start overflow-hidden lg:w-auto lg:flex-shrink"
      style={{
        transform: inView ? "translateY(0)" : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transition,
      }}
    >
      {post.permalink ? (
        <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function HomeGalleryClient({ posts }: { posts: GalleryPost[] }) {
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
      setActiveIndex(Math.round((scrollLeft / maxScroll) * (posts.length - 1)))
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [posts.length])

  return (
    <section id="gallery" ref={sectionRef} className="bg-grey pt-12 pb-8 lg:pt-24 lg:pb-12">
      <div className="container mx-auto px-6">

        {/* Desktop row */}
        <div className="hidden lg:grid lg:grid-cols-6 lg:gap-4">
          {posts.map((post, i) => (
            <GalleryImage key={post.permalink ?? post.src} post={post} animationIndex={i} inView={inView} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {posts.map((post, i) => (
              <GalleryImage key={post.permalink ?? post.src} post={post} animationIndex={i} inView={inView} />
            ))}
          </div>

          {/* Dot progress indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {posts.map((_, i) => (
              <div
                key={i}
                className="h-0.5 w-5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: i === activeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)" }}
              />
            ))}
          </div>
        </div>

        {/* Visit our Instagram */}
        <div className="mt-10 flex justify-center lg:mt-14">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-10 py-4 text-sm font-oswald font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors duration-200"
          >
            Visit our Instagram
          </a>
        </div>

      </div>
    </section>
  )
}
