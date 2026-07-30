"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Instagram, Mail, Clock } from "lucide-react"

const contactInfo = [
  {
    icon: <Instagram className="h-6 w-6" />,
    title: "Instagram",
    details: ["@urstudio.au", "See our latest work"],
    href: "https://www.instagram.com/urstudio.au?igsh=MXBoanY0Y2FjamJzbA==",
    clickable: true,
    external: true,
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Hours",
    details: ["Wednesday: 10:00 AM - 6:30 PM", "Thursday: 10:00 AM - 6:30 PM", "Friday: 10:00 AM - 6:30 PM", "Saturday: 10:30 AM - 5:30 PM", "Sunday: 10:30 AM - 5:30 PM"],
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Location",
    details: ["61A Peel Street", "Melbourne CBD", "Victoria 3003"],
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    details: ["team@urstudio.com.au", "Response within 6 hours"],
    href: "mailto:team@urstudio.com.au",
    clickable: true,
  },
]

// ─── Contact card ─────────────────────────────────────────────────────────────

interface ContactCardProps {
  info: typeof contactInfo[0]
  animationIndex: number
  inView: boolean
}

function ContactCard({ info, animationIndex, inView }: ContactCardProps) {
  // Same spring easing as the Awards/Reviews reveals, staggered per card
  const transition = `
    transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${animationIndex * 100}ms,
    opacity   0.45s ease                                ${animationIndex * 100}ms
  `

  const cardContent = (
    <div
      className="flex h-full flex-col border border-white/10 bg-black/40 p-4 backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-black/50"
      style={{
        transform: inView ? "translateY(0)" : "translateY(30px)",
        opacity: inView ? 1 : 0,
        transition,
      }}
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white">
          {info.icon}
        </div>
        <span className="text-lg font-normal tracking-wide text-white">{info.title}</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center space-y-1 text-center">
        {info.details.map((detail, idx) => (
          <p key={idx} className="text-sm leading-relaxed font-light text-white/70">
            {detail}
          </p>
        ))}
      </div>
    </div>
  )

  const wrapperClassName = "w-72 flex-shrink-0 snap-start lg:w-auto lg:flex-1 lg:flex-shrink"

  return info.clickable ? (
    <a
      href={info.href}
      {...(info.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${wrapperClassName} transition-opacity duration-300 hover:opacity-80`}
    >
      {cardContent}
    </a>
  ) : (
    <div className={wrapperClassName}>{cardContent}</div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function Contact() {
  const [inView, setInView] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Trigger the cards' spring slide-in once the section scrolls into view
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
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Track mobile carousel scroll position for the dot indicator
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el
      const maxScroll = scrollWidth - clientWidth
      if (maxScroll <= 0) return
      setActiveIndex(Math.round((scrollLeft / maxScroll) * (contactInfo.length - 1)))
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="bg-grey pt-10 pb-8">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-white mb-4 [text-shadow:0_2px_10px_rgb(var(--grey)/0.85)]">WEST MELBOURNE</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-6">
            Easily accessible in the heart of Melbourne's business district.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="mb-10">

          {/* Desktop row */}
          <div className="hidden items-stretch lg:flex lg:gap-3">
            {contactInfo.map((info, index) => (
              <ContactCard key={index} info={info} animationIndex={index} inView={inView} />
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="lg:hidden">
            <div
              ref={scrollRef}
              className="flex items-stretch gap-3 overflow-x-auto snap-x snap-mandatory scroll-px-6 pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
            >
              {contactInfo.map((info, index) => (
                <ContactCard key={index} info={info} animationIndex={index} inView={inView} />
              ))}
            </div>

            {/* Dot progress indicator */}
            <div className="mt-4 flex justify-center gap-2">
              {contactInfo.map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 w-5 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: i === activeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)" }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Full Width Map */}
      <div className="w-full">
        <div className="aspect-video relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6304.564503352529!2d144.9554753!3d-37.80685729999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d369ef553b3%3A0x51a8579c86424f88!2s61%20Peel%20St%2C%20West%20Melbourne%20VIC%203003!5e0!3m2!1sen!2sau!4v1749701834657!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
