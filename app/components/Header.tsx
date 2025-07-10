"use client"

import { useState } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

const logoImagePath = "/logo/logo-svg.svg"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const navItems = [
    { name: "Home", href: "/"},
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Awards", href: "#awards"},
    { name: "Contact", href: "#contact" },
    { name: "Policy", href: "/booking-policy"}
  ]

  const scrollToSection = (href: string) => {
    // Close mobile menu first
    setIsMenuOpen(false)
    
    // Handle different types of links
    if (href === "/") {
      // Home link - navigate to home page
      router.push("/")
      return
    }
    
    if (href.startsWith("#")) {
      // Hash link - check if element exists on current page
      const element = document.querySelector(href) as HTMLElement
      if (element) {
        // Element found - smooth scroll to it with offset
        const elementPosition = element.offsetTop
        const offsetPosition = elementPosition - 70 // 50px padding from top
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      } else {
        // Element not found - navigate to home page with hash
        router.push(`/${href}`)
      }
    } else {
      // Regular page link
      router.push(href)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBookingClick = () => {
    window.open('https://www.fresha.com/a/ur-studio-melbourne-61a-peel-street-lmpkp2dv/all-offer?venue=true', '_blank')
    setIsMenuOpen(false) // Close mobile menu after clicking
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-full backdrop-blur-sm border-b border-gray-800 z-50 transition-colors duration-300" style={{ backgroundColor: '#383E3E' }}>
      <div className="w-full px-2 sm:px-4 py-3 sm:py-4 lg:py-5">
        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between w-full">
          {/* Mobile Logo */}
          <button onClick={scrollToTop} className="flex items-center hover:opacity-80 transition-opacity shrink-0">
            <div className="flex items-center justify-center rounded-full w-14 h-14 p-1" style={{ backgroundColor: '#383E3E' }}>
              <Image
                src={logoImagePath}
                alt="UR Studio Logo"
                width={56}
                height={56}
                className="w-12 h-12 object-contain filter invert"
              />
            </div>
          </button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-gray-900 text-white p-1 w-8 h-8"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 
              <X className="h-4 w-4 text-white" /> : 
              <Menu className="h-4 w-4 text-white" />
            }
          </Button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:items-center lg:gap-4 w-full">
          {/* Desktop Logo */}
          <div className="justify-self-start">
            <button onClick={scrollToTop} className="flex items-center hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center rounded-full w-16 h-16 p-2" style={{ backgroundColor: '#383E3E' }}>
                <Image
                  src={logoImagePath}
                  alt="UR Studio Logo"
                  width={64}
                  height={64}
                  className="w-12 h-12 object-contain filter invert"
                />
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center justify-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="
                  relative text-xs xl:text-sm tracking-wide transition-colors duration-300 font-light pb-1 whitespace-nowrap
                  text-gray-300 hover:text-white
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white 
                  after:transition-all after:duration-300 after:ease-in-out
                  after:w-0 hover:after:w-full
                "
              >
                {item.name.toUpperCase()}
              </button>
            ))}
          </nav>

          {/* Desktop Book Button */}
          <div className="justify-self-end">
            <Button
              size="sm"
              className="bg-white text-black hover:bg-gray-200 px-2 xl:px-4 py-1 xl:py-2 text-xs xl:text-sm tracking-wide font-light group whitespace-nowrap"
              onClick={handleBookingClick}
            >
              <span className="hidden xl:inline">BOOK APPOINTMENT</span>
              <span className="xl:hidden">BOOK</span>
              <ArrowRight className="ml-1 xl:ml-2 h-3 w-3 xl:h-4 xl:w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-3 pb-3 border-t border-gray-800">
            <div className="flex flex-col items-center space-y-6 pt-3 w-full">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-center text-sm tracking-wide transition-colors duration-300 font-light text-gray-300 hover:text-white"
                >
                  {item.name.toUpperCase()}
                </button>
              ))}
              
              {/* Mobile Book Button */}
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-200 px-3 py-2 text-sm tracking-wide font-light group mt-4 w-[55%] justify-center"
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