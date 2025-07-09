"use client"

import { Instagram, Facebook, Twitter } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const logoImagePath = "/logo/logo-svg.svg"

export default function Footer() {
  const router = useRouter()

  const scrollToSection = (href: string) => {
    // Check if element exists on current page
    const element = document.querySelector(href) as HTMLElement
    if (element) {
      // Element found - smooth scroll with offset
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - 50 // 50px padding from top
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    } else {
      // Element not found - navigate to home page with hash
      router.push(`/${href}`)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBookingClick = () => {
    window.open('https://www.fresha.com/a/milo-le-hair-melbourne-377-little-bourke-street-rtna1lwa/booking', '_blank')
  }

  const handlePageNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6 flex flex-col items-center text-center md:items-start md:text-left">
            <button onClick={scrollToTop} className="flex items-center justify-center md:justify-start hover:opacity-80 transition-opacity">
              <Image
                src={logoImagePath}
                alt="UR Studio Logo"
                width={120}
                height={120}
                className="w-20 h-20 object-contain filter invert"
              />
            </button>
            <p className="text-gray-400 leading-relaxed font-light">
              Where traditional craftsmanship meets contemporary sophistication in the heart of Melbourne.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <button onClick={() => window.open('https://www.instagram.com/urstudio.au?igsh=MXBoanY0Y2FjamJzbA==', '_blank')}>
                <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </button>
              <button onClick={() => window.open('https://facebook.com/', '_blank')}>
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </button>
              <button onClick={() => window.open('https://twitter.com/', '_blank')}>
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">LINKS</h3>
            <ul className="space-y-3 text-gray-400 font-light">
              <li>
                <button 
                  onClick={() => scrollToSection('#services')}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#gallery')}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#about')}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">QUICK LINKS</h3>
            <ul className="space-y-3 text-gray-400 font-light">
              <li>
                <button 
                  onClick={handleBookingClick}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Book Appointment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageNavigation('/privacy-policy')}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageNavigation('/cookie-policy')}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageNavigation('/booking-policy')}
                  className="hover:text-white cursor-pointer transition-colors text-left"
                >
                  Booking Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-light tracking-wide mb-6">CONTACT</h3>
            <div className="space-y-3 text-gray-400 font-light">
              <button 
                onClick={() => window.open('https://maps.google.com/?q=61+Peels+Street+West+Melbourne+VIC+3003', '_blank')}
                className="hover:text-white cursor-pointer transition-colors text-left block"
              >
                <p>61A Peel Street</p>
                <p>West Melbourne, VIC 3003</p>
              </button>
              <a 
                href="tel:0447 607 947" 
                className="hover:text-white cursor-pointer transition-colors block"
              >
                0447 607 947
              </a>
              <a 
                href="mailto:urstudiomelb@gmail.com" 
                className="hover:text-white cursor-pointer transition-colors block"
              >
                urstudiomelb@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 font-light">
          <p>&copy; 2025 UR Studio. All rights reserved. | Crafted with precision in Melbourne.</p>
        </div>
      </div>
    </footer>
  )
}