"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Play } from "lucide-react"
import type { GalleryPost } from "@/lib/instagram"

const INSTAGRAM_URL = "https://www.instagram.com/urstudio.au?igsh=MXBoanY0Y2FjamJzbA=="
const INSTAGRAM_HANDLE = "@urstudio.au"

// ─── Gallery image ──────────────────────────────────────────────────────────

interface GalleryImageProps {
  post: GalleryPost
  animationIndex: number
  inView: boolean
  /** When true, this tile's video plays; otherwise it holds on the still. */
  play: boolean
  /** Loop the video (mobile in-focus / single desktop video) instead of advancing. */
  loop: boolean
  /** Fired when a non-looping video finishes (drives the desktop sequence). */
  onEnded?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

function GalleryImage({ post, animationIndex, inView, play, loop, onEnded, onMouseEnter, onMouseLeave }: GalleryImageProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Same scroll-linked spring easing as the Awards reveal, staggered per image
  const transition = `
    transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${animationIndex * 90}ms,
    opacity   0.45s ease                                ${animationIndex * 90}ms
  `

  // Drive playback from the `play` prop; the still image is always the fallback.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (play) {
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0
    }
  }, [play])

  const media = (
    <>
      <img src={post.src} alt={post.alt} className="absolute inset-0 h-full w-full object-cover" />

      {post.isVideo && post.videoUrl && (
        <video
          ref={videoRef}
          src={post.videoUrl}
          poster={post.src}
          muted
          loop={loop}
          playsInline
          preload="none"
          onEnded={onEnded}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${play ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Reel badge — hidden while the reel is playing */}
      {post.isVideo && (
        <div
          className={`pointer-events-none absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 backdrop-blur-sm transition-opacity duration-300 ${play ? "opacity-0" : "opacity-100"}`}
        >
          <Play className="h-3 w-3 fill-white text-white" />
          <span className="text-[10px] font-oswald font-medium uppercase tracking-wider text-white">Reel</span>
        </div>
      )}
    </>
  )

  return (
    <div
      className="group relative aspect-[4/5] w-[75vw] flex-shrink-0 snap-start overflow-hidden lg:w-auto lg:flex-shrink"
      style={{
        transform: inView ? "translateY(0)" : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transition,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {post.permalink ? (
        <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="block h-full w-full">
          {media}
        </a>
      ) : (
        media
      )}
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function HomeGalleryClient({ posts }: { posts: GalleryPost[] }) {
  const [inView, setInView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0) // mobile carousel focus (dots + playback)
  const [isDesktop, setIsDesktop] = useState(false)
  const [desktopSeq, setDesktopSeq] = useState(-1) // desktop: index of the video the sequence is on
  const [hoverIndex, setHoverIndex] = useState<number | null>(null) // desktop: hovered tile overrides the sequence
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Indices of the playable video posts, left → right
  const videoIndices = useMemo(
    () => posts.reduce<number[]>((acc, p, i) => (p.isVideo && p.videoUrl ? [...acc, i] : acc), []),
    [posts]
  )

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

  // Track mobile carousel scroll position — drives both the dots and which tile plays
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

  // Detect desktop vs mobile so we can pick the playback model
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // Desktop: start the sequence at the far-left video
  useEffect(() => {
    if (isDesktop && desktopSeq === -1 && videoIndices.length > 0) {
      setDesktopSeq(videoIndices[0])
    }
  }, [isDesktop, desktopSeq, videoIndices])

  // Desktop: when one reel finishes, advance to the next (cycling back to the first)
  const advanceDesktop = (fromIndex: number) => {
    if (videoIndices.length <= 1) return
    const pos = videoIndices.indexOf(fromIndex)
    setDesktopSeq(videoIndices[(pos + 1) % videoIndices.length])
  }

  const singleVideo = videoIndices.length <= 1

  // Hovering a reel on desktop takes precedence over the auto-sequence.
  const hoveringVideo = hoverIndex !== null && Boolean(posts[hoverIndex]?.isVideo)
  const effectiveDesktopIndex = hoveringVideo ? (hoverIndex as number) : desktopSeq

  const desktopPlay = (i: number) => Boolean(isDesktop && posts[i].isVideo && i === effectiveDesktopIndex)
  const mobilePlay = (i: number) => Boolean(!isDesktop && posts[i].isVideo && i === activeIndex)
  // The hovered reel loops (keeps playing while hovered); the sequence advances on end.
  const desktopLoop = (i: number) => singleVideo || (hoveringVideo && i === hoverIndex)

  return (
    <section id="gallery" ref={sectionRef} className="bg-grey pt-6 pb-8 lg:pt-12 lg:pb-12">
      <div className="container mx-auto px-6">

        {/* Instagram header — identical styling/spacing to the Contact heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 [text-shadow:0_2px_10px_rgb(var(--grey)/0.85)]">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block uppercase transition-colors duration-200 hover:text-white/85"
            >
              {INSTAGRAM_HANDLE}
            </a>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-6">
            Follow along the journey for the people, the stories and the experience.
          </p>
        </div>

        {/* Desktop row — breaks out ~10% wider than the container, centered on the viewport */}
        <div className="hidden lg:grid lg:grid-cols-6 lg:gap-4 lg:relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[94vw] lg:max-w-[1600px]">
          {posts.map((post, i) => (
            <GalleryImage
              key={post.permalink ?? post.src}
              post={post}
              animationIndex={i}
              inView={inView}
              play={desktopPlay(i)}
              loop={desktopLoop(i)}
              onEnded={() => advanceDesktop(i)}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex((prev) => (prev === i ? null : prev))}
            />
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
              <GalleryImage
                key={post.permalink ?? post.src}
                post={post}
                animationIndex={i}
                inView={inView}
                play={mobilePlay(i)}
                loop={true}
              />
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
