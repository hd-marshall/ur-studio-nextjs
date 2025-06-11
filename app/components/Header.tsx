"use client"

import { useState, useEffect } from "react"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Image from "next/image"

const logoImagePath = "/logo/logo-svg.svg"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["services", "gallery", "about", "contact"]
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(`#${sections[i]}`)
          break
        }
      }

      // If at top of page, clear active section
      if (window.scrollY < 100) {
        setActiveSection("")
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={scrollToTop} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center dark:bg-black rounded-full w-16 h-16 p-2">
              <Image
                src={logoImagePath}
                alt="UR Studio Logo"
                width={120}
                height={120}
                className="w-20 h-20 object-contain filter dark:invert"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`
                  relative text-sm tracking-wide transition-colors duration-300 font-light pb-1
                  text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black dark:after:bg-white 
                  after:transition-all after:duration-300 after:ease-in-out
                  ${activeSection === item.href 
                    ? 'after:w-full text-black dark:text-white' 
                    : 'after:w-0 hover:after:w-full'
                  }
                `}
              >
                {item.name.toUpperCase()}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-6 pb-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-6 pt-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    text-left text-sm tracking-wide transition-colors duration-300 font-light
                    ${activeSection === item.href 
                      ? 'text-black dark:text-white font-medium' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white'
                    }
                  `}
                >
                  {item.name.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}