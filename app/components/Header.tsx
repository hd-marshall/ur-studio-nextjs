"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const logoImagePath = "/logo/logo-svg.svg"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

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

  const handleBookingClick = () => {
    window.open('https://www.fresha.com/a/milo-le-hair-melbourne-377-little-bourke-street-rtna1lwa/booking', '_blank')
    setIsMenuOpen(false) // Close mobile menu after clicking
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-screen bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50 transition-colors duration-300 overflow-hidden">
      <div className="w-full px-3 py-3 lg:px-4 lg:py-4">
        <div className="flex items-center justify-between w-full">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <button onClick={scrollToTop} className="flex items-center hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center bg-black rounded-full w-10 h-10 lg:w-16 lg:h-16 p-1 lg:p-2">
                <Image
                  src={logoImagePath}
                  alt="UR Studio Logo"
                  width={80}
                  height={80}
                  className="w-8 h-8 lg:w-12 lg:h-12 object-contain filter invert"
                />
              </div>
            </button>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-4 xl:space-x-6 absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`
                  relative text-sm tracking-wide transition-colors duration-300 font-light pb-1 whitespace-nowrap
                  text-gray-300 hover:text-white
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white 
                  after:transition-all after:duration-300 after:ease-in-out
                  ${activeSection === item.href 
                    ? 'after:w-full text-white' 
                    : 'after:w-0 hover:after:w-full'
                  }
                `}
              >
                {item.name.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Right: Book Button (Desktop) + Mobile Menu Button */}
          <div className="flex items-center space-x-1 lg:space-x-2 shrink-0">
            {/* Book Appointment Button - Desktop Only */}
            <Button
              size="sm"
              className="hidden lg:flex bg-white text-black hover:bg-gray-200 px-2 xl:px-4 py-2 xl:py-3 text-xs xl:text-sm tracking-wide font-light group whitespace-nowrap"
              onClick={handleBookingClick}
            >
              <span className="hidden xl:inline">BOOK APPOINTMENT</span>
              <span className="xl:hidden text-xs">BOOK</span>
              <ArrowRight className="ml-1 xl:ml-2 h-3 w-3 xl:h-4 xl:w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Mobile Menu Button - Always White */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-gray-900 text-white p-2 w-10 h-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <X className="h-5 w-5 text-white" /> : 
                <Menu className="h-5 w-5 text-white" />
              }
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4 w-full">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    text-left text-sm tracking-wide transition-colors duration-300 font-light w-full px-2
                    ${activeSection === item.href 
                      ? 'text-white font-medium' 
                      : 'text-gray-300 hover:text-white'
                    }
                  `}
                >
                  {item.name.toUpperCase()}
                </button>
              ))}
              
              {/* Book Appointment Button - Mobile Only */}
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-200 px-4 py-3 text-sm tracking-wide font-light group mt-2 w-full justify-center"
                onClick={handleBookingClick}
              >
                BOOK APPOINTMENT
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}