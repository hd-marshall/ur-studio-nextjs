"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedSVGProps {
  src: string
  className?: string
  /**
   * Gap between the last orange text element and the first black element, in ms.
   * Default: 350ms
   */
  colorWaveDelayMs?: number
  /**
   * Stagger between elements within the same wave, in ms.
   * Default: 130ms
   */
  staggerMs?: number
  /**
   * When provided, switches from scroll-triggered to carousel mode.
   * The animation fires (and re-fires) whenever this flips to true.
   */
  isActive?: boolean
}

/**
 * Fetches an SVG from `src`, injects it inline, then animates its text/word
 * elements in two colour waves:
 *
 *   Wave 1 — all <text> elements, sorted largest font-size first (orange text)
 *   Wave 2 — <g> direct children of #words that aren't text (black content)
 *
 * Supports two trigger modes:
 *   - Scroll mode (default): fires when the element scrolls into view
 *   - Carousel mode (isActive prop): fires whenever isActive flips to true
 */
export function AnimatedSVG({
  src,
  className,
  colorWaveDelayMs = 350,
  staggerMs = 130,
  isActive,
}: AnimatedSVGProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState("")

  // Stores the ready-to-call animate function once wrappers are set up.
  // Both the setup effect and the isActive effect call this.
  const animateRef = useRef<(() => void) | null>(null)

  // Fetch SVG once
  useEffect(() => {
    let cancelled = false
    fetch(src)
      .then((r) => r.text())
      .then((text) => { if (!cancelled) setSvgContent(text) })
    return () => { cancelled = true }
  }, [src])

  // Set up wrappers + delays after SVG lands in the DOM.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const container = containerRef.current
    if (!svgContent || !container) return

    // ── Collect elements to animate ──────────────────────────────────────────

    const textElements = Array.from(
      container.querySelectorAll<SVGTextElement>("text")
    ).sort((a, b) => {
      const sizeA = parseFloat(window.getComputedStyle(a).fontSize) || 0
      const sizeB = parseFloat(window.getComputedStyle(b).fontSize) || 0
      return sizeB - sizeA
    })

    const wordsGroup = container.querySelector<SVGGElement>("#words")
    const blackGroups = wordsGroup
      ? Array.from(wordsGroup.querySelectorAll<SVGGElement>(":scope > g"))
      : []

    const allTargets: SVGElement[] = [...textElements, ...blackGroups]
    if (allTargets.length === 0) return

    // ── Wrap each target so translateY doesn't clobber its own SVG transform ─
    const wrappers: SVGGElement[] = allTargets.map((el) => {
      const wrapper = document.createElementNS("http://www.w3.org/2000/svg", "g")
      el.parentNode!.insertBefore(wrapper, el)
      wrapper.appendChild(el)
      return wrapper
    })

    // ── Assign staggered delays ───────────────────────────────────────────────
    const delays = new Map<SVGGElement, number>()
    let t = 0
    textElements.forEach((_, i) => {
      delays.set(wrappers[i], t)
      t += staggerMs
    })
    if (blackGroups.length > 0) {
      t += colorWaveDelayMs - staggerMs
      blackGroups.forEach((_, i) => {
        delays.set(wrappers[textElements.length + i], t)
        t += staggerMs
      })
    }

    const hide = () => {
      wrappers.forEach((w, i) => {
        const isText = allTargets[i].tagName.toLowerCase() === "text"
        w.style.transition = "none"
        w.style.opacity = "0"
        w.style.transform = isText ? "translateY(20px)" : "translateY(0)"
      })
    }

    // ── Store the animate fn in a ref so both effects can call it ─────────────
    animateRef.current = () => {
      hide()
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          wrappers.forEach((w, i) => {
            const isText = allTargets[i].tagName.toLowerCase() === "text"
            const delay = delays.get(w) ?? 0
            w.style.transition = isText
              ? `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`
              : `opacity 0.65s ease-out ${delay}ms`
            w.style.opacity = "1"
            w.style.transform = "translateY(0)"
          })
        })
      })
    }

    // ── Initially hide ────────────────────────────────────────────────────────
    hide()

    // ── Carousel mode: if active right now, animate immediately ───────────────
    if (isActive !== undefined) {
      if (isActive) animateRef.current()
      return
    }

    // ── Scroll mode ───────────────────────────────────────────────────────────
    const triggerEl = wrappers[0] ?? container
    let triggered = false

    const onScroll = () => {
      if (triggered) return
      const rect = triggerEl.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) return
      if (rect.top < window.innerHeight * 0.78) {
        triggered = true
        animateRef.current?.()
        window.removeEventListener("scroll", onScroll)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    requestAnimationFrame(onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [svgContent, colorWaveDelayMs, staggerMs])

  // ── Carousel mode: re-trigger whenever isActive flips to true ────────────
  useEffect(() => {
    if (isActive === undefined || !isActive) return
    // If animateRef is already populated (SVG loaded), fire immediately.
    // If SVG hasn't loaded yet, the setup effect above will fire it on load.
    animateRef.current?.()
  }, [isActive])

  return (
    <div ref={containerRef} className={className} style={svgContent ? undefined : { aspectRatio: "4/5" }}>
      {svgContent && <div dangerouslySetInnerHTML={{ __html: svgContent }} />}
    </div>
  )
}
