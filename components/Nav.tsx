'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavItem {
  label: string
  href: string
  isActive?: boolean
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', isActive: true },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Awards', href: '/awards'},
  { label: 'Contact', href: '/contact' },
]

import NavLogo from '@/public/images/logos/logo.svg'

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <style jsx global>{`
        .glitch {
          font-size: 10rem;
          text-transform: uppercase;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
            -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
            0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
        }

        .glitch-nav-hover:hover {
          position: relative;
          left: -2px;
          text-shadow: 0.02em 0 0 rgba(255, 0, 0, 0.75),
            -0.01em -0.02em 0 rgba(0, 255, 0, 0.75),
            0.01em 0.02em 0 rgba(0, 0, 255, 0.75);
          transition: all 0.2s ease;
        }

        .glitch-nav-active {
          position: relative;
          left: -2px;
          text-shadow: 0.02em 0 0 rgba(255, 0, 0, 0.75),
            -0.01em -0.02em 0 rgba(0, 255, 0, 0.75),
            0.01em 0.02em 0 rgba(0, 0, 255, 0.75);
        }
      `}</style>
      
      <nav className="bg-gray-50 fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src={NavLogo}
              alt="Milo Le Hair"
              width={64}
              height={64}
              className="h-16 w-auto"
            />
          </Link>

          {/* Right side buttons */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* Book Appointment Button - Steel Blue Silver - Hidden on mobile */}
            <button
              type="button"
              className="hidden md:block text-white bg-gradient-to-r from-slate-400 to-slate-600 hover:from-slate-500 hover:to-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center shadow-md hover:shadow-lg transition-all duration-200 glitch-nav-hover uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-bebas-neue)' }}
            >
              Book an Appointment
            </button>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 group overflow-hidden"
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5 relative z-10"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </button>
          </div>

          {/* Navigation Menu */}
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMobileMenuOpen ? 'block' : 'hidden'
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-50">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`relative block py-2 px-3 rounded-sm md:p-0 transition-colors duration-200 group overflow-hidden ${
                      item.isActive 
                        ? 'text-white bg-slate-600 md:bg-transparent md:text-slate-600 font-semibold glitch-nav-active'
                        : 'text-black hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-600 glitch-nav-hover'
                    }`}
                    aria-current={item.isActive ? 'page' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on link click
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-slate-600 transition-all duration-300 ${
                      item.isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </Link>
                </li>
              ))}
              
              {/* Mobile Book Appointment Button - Only visible on mobile */}
              <li className="md:hidden mt-4 px-3">
                <button
                  type="button"
                  className="w-full text-white bg-gradient-to-r from-slate-400 to-slate-600 hover:from-slate-500 hover:to-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-3 text-center shadow-md hover:shadow-lg transition-all duration-200 glitch-nav-hover"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}