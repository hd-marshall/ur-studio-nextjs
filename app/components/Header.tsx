"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

const BOOKING_URL = "https://www.fresha.com/a/ur-studio-melbourne-61a-peel-street-lmpkp2dv/booking?menu=true&multi=true&pId=1401362&cartId=a3f18a4e-a008-4a7e-995c-bd998ed45476"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  // { name: "Awards", href: "#awards" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const router = useRouter()
  const pathname = usePathname()

  // Pages with a full-bleed hero behind the nav start transparent and fade the
  // grey in on scroll (homepage, gallery); every other page keeps the grey solid
  // from the top so the nav stays legible without a hero behind it.
  const heroNavPages = ["/", "/gallery"]
  const solidNav = !heroNavPages.includes(pathname)
  const navProgress = solidNav ? 1 : scrollProgress

  useEffect(() => {
    // Fades in continuously over the first 100px of scroll instead of
    // snapping at a threshold, so the nav responds the instant scrolling starts.
    const handleScroll = () => setScrollProgress(Math.min(window.scrollY / 100, 1))
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Stays mounted through the close transition so it can slide back out (right
  // to left in, left to right out) instead of just vanishing instantly.
  useEffect(() => {
    if (isMenuOpen) {
      setShouldRenderMenu(true)
      const timer = setTimeout(() => setMenuVisible(true), 10)
      return () => clearTimeout(timer)
    }
    setMenuVisible(false)
    const timer = setTimeout(() => setShouldRenderMenu(false), 500)
    return () => clearTimeout(timer)
  }, [isMenuOpen])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    if (href === "/") {
      router.push("/")
      return
    }
    if (href.startsWith("#")) {
      const element = document.querySelector(href) as HTMLElement
      if (element) {
        window.scrollTo({ top: element.offsetTop - 70, behavior: "smooth" })
      } else {
        router.push(`/${href}`)
      }
    } else {
      router.push(href)
    }
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor: `rgb(var(--grey) / ${navProgress})` }}
    >
      <div className="w-full px-6 lg:px-12 py-4 lg:py-5">

        {/* Mobile */}
        <div className="relative z-50 flex lg:hidden items-center justify-between">
          <button
            onClick={() => scrollToSection("/")}
            className="font-oswald font-bold text-white text-lg tracking-[0.25em] hover:opacity-80 transition-opacity uppercase"
          >
            UR Studio
          </button>
          <button
            className="text-white hover:opacity-70 transition-opacity"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:items-center">
          <button
            onClick={() => scrollToSection("/")}
            className="font-oswald font-bold text-white text-xl tracking-[0.25em] hover:opacity-80 transition-opacity uppercase justify-self-start"
          >
            UR Studio
          </button>

          <nav className="flex items-center justify-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative pb-1 text-xs tracking-widest text-white/70 hover:text-white transition-colors duration-200 font-oswald uppercase after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="justify-self-end">
            <button
              onClick={() => window.open(BOOKING_URL, "_blank")}
              className="border border-white text-white px-6 py-2 text-xs font-oswald font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-200"
            >
              BOOK NOW
            </button>
          </div>
        </div>

        {/* Mobile menu — full-screen grey overlay, slides in right to left, out left to right */}
        {shouldRenderMenu && (
          <nav
            className="fixed inset-0 z-40 flex h-screen flex-col items-center bg-grey px-6 pb-16 pt-8 transition-transform duration-500 ease-out lg:hidden"
            style={{ transform: menuVisible ? "translateX(0)" : "translateX(100%)" }}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-2xl tracking-widest text-white/70 hover:text-white transition-colors font-oswald uppercase"
                >
                  {item.name}
                </button>
              ))}
            </div>
            {/* Lower, thumb-level placement; white like the Hero's Book Now */}
            <button
              onClick={() => { window.open(BOOKING_URL, "_blank"); setIsMenuOpen(false) }}
              className="bg-white text-black px-12 py-5 text-base font-oswald font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors duration-200"
            >
              Book Now
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
