"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

const BOOKING_URL = "https://www.fresha.com/a/ur-studio-melbourne-61a-peel-street-lmpkp2dv/booking?menu=true&multi=true&pId=1401362&cartId=a3f18a4e-a008-4a7e-995c-bd998ed45476"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Gallery", href: "#gallery" },
  { name: "Awards", href: "#awards" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="w-full px-6 lg:px-12 py-4 lg:py-5">

        {/* Mobile */}
        <div className="flex lg:hidden items-center justify-between">
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
              BOOK
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm tracking-widest text-white/70 hover:text-white transition-colors font-oswald uppercase"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => { window.open(BOOKING_URL, "_blank"); setIsMenuOpen(false) }}
              className="border border-white text-white px-8 py-2 text-xs font-oswald font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-200"
            >
              BOOK
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
