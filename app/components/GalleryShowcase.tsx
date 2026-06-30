"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const BOOKING_URL =
  "https://www.fresha.com/a/ur-studio-melbourne-61a-peel-street-lmpkp2dv/booking?menu=true&multi=true&pId=1401362&cartId=a3f18a4e-a008-4a7e-995c-bd998ed45476"

// Dedicated hero backdrop — kept out of the grid so it isn't shown twice.
const HERO_IMAGE = "/images/gallery/gallery-1.webp"

// Every piece of work shown in the grid (excludes the hero image).
const GALLERY_IMAGES = [
  "/images/gallery/gallery-2.webp",
  "/images/gallery/gallery-3.webp",
  "/images/gallery/gallery-4.webp",
  "/images/gallery/gallery-5.webp",
  "/images/gallery/gallery-6.webp",
  "/images/gallery/gallery-10.webp",
  "/images/gallery/gallery-11.webp",
  "/images/gallery/gallery-13.webp",
  "/images/gallery/gallery-14.webp",
  "/images/gallery/gallery-15.webp",
  "/images/gallery/gallery-16.webp",
  "/images/gallery/gallery-17.webp",
]

// ─── Grid tile ───────────────────────────────────────────────────────────────

interface TileProps {
  src: string
  index: number
  onOpen: (index: number) => void
}

function GalleryTile({ src, index, onOpen }: TileProps) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  // Same scroll-triggered spring reveal as HomeGallery, per tile so it fires as
  // each row scrolls into view rather than all at once.
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
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <button
      ref={ref}
      onClick={() => onOpen(index)}
      aria-label="Enlarge image"
      className="group relative aspect-[4/5] overflow-hidden focus:outline-none"
      style={{
        transform: inView ? "translateY(0)" : "translateY(40px)",
        opacity: inView ? 1 : 0,
        transition: "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.45s ease",
      }}
    >
      <img
        src={src}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {/* Subtle darken on hover to signal interactivity */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
    </button>
  )
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

// Foreground image — keyed by index so it remounts and re-runs its
// scale-and-fade entrance every time the visitor navigates to a new image.
function LightboxImage({ src }: { src: string }) {
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <img
      src={src}
      alt=""
      onClick={(e) => e.stopPropagation()}
      className="relative z-10 max-h-[85vh] max-w-[92vw] rounded-sm object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "scale(1)" : "scale(0.92)",
        filter: shown ? "blur(0px)" : "blur(8px)",
        transition: "opacity 0.4s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease",
      }}
    />
  )
}

function Lightbox({ index, onClose, onPrev, onNext }: LightboxProps) {
  const [mounted, setMounted] = useState(false)

  // Lock body scroll and wire up keyboard controls while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
      cancelAnimationFrame(raf)
    }
  }, [onClose, onPrev, onNext])

  const src = GALLERY_IMAGES[index]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      onClick={onClose}
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.35s ease" }}
    >
      {/* Ambient backdrop — the same image, blown up and blurred behind, for an
          immersive cinematic frame instead of a flat black box */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl transition-[background] duration-500"
      />
      <div className="absolute inset-0 bg-black/80" />

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-md transition-colors hover:bg-white/20 lg:right-6 lg:top-6"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
        className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 lg:left-8"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      {/* Image — keyed remount re-runs the entrance animation on navigate */}
      <LightboxImage key={index} src={src} />

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
        className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/90 backdrop-blur-md transition-all hover:bg-white/20 active:scale-95 lg:right-8"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Counter */}
      <p className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/40 px-4 py-1.5 font-oswald text-xs uppercase tracking-[0.3em] text-white/80 backdrop-blur-md">
        {index + 1} / {GALLERY_IMAGES.length}
      </p>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function GalleryShowcase() {
  const [selected, setSelected] = useState<number | null>(null)
  const [showFab, setShowFab] = useState(false)

  // Reveal a floating Book Now after scrolling past the hero, but hide it again
  // once the footer scrolls into view so it doesn't overlap/obstruct the footer.
  useEffect(() => {
    const onScroll = () => {
      const scrolledPastHero = window.scrollY > 120
      const footer = document.querySelector("footer")
      const footerInView = footer ? footer.getBoundingClientRect().top < window.innerHeight : false
      setShowFab(scrolledPastHero && !footerInView)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const open = useCallback((index: number) => setSelected(index), [])
  const close = useCallback(() => setSelected(null), [])
  const prev = useCallback(
    () => setSelected((i) => (i === null ? i : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)),
    []
  )
  const next = useCallback(
    () => setSelected((i) => (i === null ? i : (i + 1) % GALLERY_IMAGES.length)),
    []
  )

  // Keep the button in its bottom-centre spot whenever an image is open, even if
  // the scroll-based reveal hadn't triggered yet.
  const fabVisible = showFab || selected !== null

  return (
    <>
      {/* ── Half-height hero ───────────────────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden bg-grey">
        <img
          src={HERO_IMAGE}
          alt="UR Studio work"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        {/* Darken for text legibility, heavier at the bottom */}
        <div
          className="absolute inset-0 z-[5]"
          style={{ background: "linear-gradient(to bottom, rgb(var(--grey) / 0.55) 0%, rgb(var(--grey) / 0.25) 45%, rgb(var(--grey) / 0.75) 100%)" }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-oswald text-xs tracking-[0.35em] text-white/70 uppercase mb-4">
            Our Work
          </p>
          <h1
            className="font-oswald font-bold uppercase leading-none text-white [text-shadow:0_2px_12px_rgb(var(--grey)/0.85)]"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            The Gallery
          </h1>
        </div>
      </section>

      {/* ── Image grid ─────────────────────────────────────────────────── */}
      <section className="bg-grey px-2 py-12 lg:px-4 lg:py-20">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {GALLERY_IMAGES.map((src, i) => (
            <GalleryTile key={src} src={src} index={i} onOpen={open} />
          ))}
        </div>
      </section>

      {selected !== null && (
        <Lightbox index={selected} onClose={close} onPrev={prev} onNext={next} />
      )}

      {/* Floating Book Now — fades in after scrolling past the hero, and stays in
          the same bottom-centre spot above the lightbox while an image is open */}
      <button
        onClick={() => window.open(BOOKING_URL, "_blank")}
        className="fixed bottom-16 left-1/2 z-[110] -translate-x-1/2 bg-white px-12 py-5 font-oswald text-base font-bold uppercase tracking-[0.2em] text-black shadow-xl transition-all duration-300 hover:bg-gray-100"
        style={{
          opacity: fabVisible ? 1 : 0,
          transform: `translateX(-50%) translateY(${fabVisible ? "0" : "20px"})`,
          pointerEvents: fabVisible ? "auto" : "none",
        }}
      >
        Book Now
      </button>
    </>
  )
}
