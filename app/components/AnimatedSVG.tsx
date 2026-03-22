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
}

const ORANGE_RGB = "rgb(239, 80, 35)" // #ef5023

/**
 * Fetches an SVG from `src`, injects it inline, then animates its text/word
 * elements in two colour waves:
 *
 *   Wave 1 — all <text> elements, sorted largest font-size first (orange text)
 *   Wave 2 — <g> direct children of #words that aren't text (black content)
 *
 * To add extra colour waves in the future: assign different fill colours in
 * the SVG — the component groups by computed fill and staggers each group.
 *
 * FIX for broken placement: each animatable element is wrapped in a fresh <g>
 * at runtime so we apply translateY to the wrapper, leaving the inner element's
 * own SVG transform="translate(…)" attribute completely untouched.
 */
export function AnimatedSVG({
  src,
  className,
  colorWaveDelayMs = 350,
  staggerMs = 130,
}: AnimatedSVGProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svgContent, setSvgContent] = useState("")

  // Fetch SVG once
  useEffect(() => {
    let cancelled = false
    fetch(src)
      .then((r) => r.text())
      .then((text) => { if (!cancelled) setSvgContent(text) })
    return () => { cancelled = true }
  }, [src])

  // Wire animations after SVG is in the DOM
  useEffect(() => {
    const container = containerRef.current
    if (!svgContent || !container) return

    // ── Collect elements to animate ──────────────────────────────────────────

    // Wave 1: every <text> in the SVG (these carry the orange Impact/serif text)
    // Sorted largest font-size first so the hero title always leads.
    const textElements = Array.from(
      container.querySelectorAll<SVGTextElement>("text")
    ).sort((a, b) => {
      const sizeA = parseFloat(window.getComputedStyle(a).fontSize) || 0
      const sizeB = parseFloat(window.getComputedStyle(b).fontSize) || 0
      return sizeB - sizeA // descending — largest first
    })

    // Wave 2: direct <g> children of #words that are NOT text containers.
    // These hold the black agenda/teaching/graphic content as embedded images.
    const wordsGroup = container.querySelector<SVGGElement>("#words")
    const blackGroups = wordsGroup
      ? Array.from(wordsGroup.querySelectorAll<SVGGElement>(":scope > g"))
      : []

    const allTargets: SVGElement[] = [...textElements, ...blackGroups]
    if (allTargets.length === 0) return

    // ── Wrap each target in a <g> so translateY doesn't clobber the element's
    //    own SVG transform attribute ──────────────────────────────────────────
    const wrappers: SVGGElement[] = allTargets.map((el) => {
      const wrapper = document.createElementNS("http://www.w3.org/2000/svg", "g")
      el.parentNode!.insertBefore(wrapper, el)
      wrapper.appendChild(el)
      return wrapper
    })

    // ── Assign delays ─────────────────────────────────────────────────────────
    // Wave 1 (texts): stagger by staggerMs each
    // Wave 2 (groups): starts after wave 1 finishes + colorWaveDelayMs gap
    const delays = new Map<SVGGElement, number>()

    let t = 0
    textElements.forEach((_, i) => {
      delays.set(wrappers[i], t)
      t += staggerMs
    })

    if (blackGroups.length > 0) {
      // add the inter-wave gap (minus one stagger already added above)
      t += colorWaveDelayMs - staggerMs
      blackGroups.forEach((_, i) => {
        delays.set(wrappers[textElements.length + i], t)
        t += staggerMs
      })
    }

    // ── Initially hide all wrappers ───────────────────────────────────────────
    wrappers.forEach((w, i) => {
      const isText = allTargets[i].tagName.toLowerCase() === "text"
      w.style.opacity = "0"
      w.style.transform = isText ? "translateY(20px)" : "translateY(0)"
      w.style.transition = "none"
    })

    // ── Trigger via scroll + getBoundingClientRect ────────────────────────────
    // IntersectionObserver threshold on SVG <g> elements is unreliable on
    // mobile — the element's bounding rect can be zero-sized before layout
    // completes, firing the observer immediately on mount.
    //
    // Instead we listen to scroll and fire when wrappers[0] (the largest text)
    // has its top edge at or above 78% of the viewport height. This means the
    // text has scrolled well into view before the animation starts — no more
    // text appearing before you've scrolled to the poster.
    const triggerEl = wrappers[0] ?? container
    let triggered = false

    const animate = () => {
      triggered = true
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
      window.removeEventListener("scroll", onScroll)
    }

    const onScroll = () => {
      if (triggered) return
      const rect = triggerEl.getBoundingClientRect()
      // Skip if element has no dimensions yet (SVG not laid out)
      if (rect.width === 0 && rect.height === 0) return
      // Fire when the text element's top is within 78% of the viewport height
      if (rect.top < window.innerHeight * 0.78) animate()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    // Check immediately in case the element is already in the viewport on load
    requestAnimationFrame(onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [svgContent, colorWaveDelayMs, staggerMs])

  return (
    <div ref={containerRef} className={className} style={svgContent ? undefined : { aspectRatio: "4/5" }}>
      {svgContent && <div dangerouslySetInnerHTML={{ __html: svgContent }} />}
    </div>
  )
}
