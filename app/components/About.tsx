"use client"

import { useEffect, useRef, useState } from "react"

const BOOKING_URL =
  "https://www.fresha.com/a/ur-studio-melbourne-61a-peel-street-lmpkp2dv/booking?menu=true&multi=true&pId=1401362&cartId=a3f18a4e-a008-4a7e-995c-bd998ed45476"

interface Barber {
  name: string
  eyebrow: string
  image: string
  alt: string
  paragraphs: string[]
}

const BARBERS: Barber[] = [
  {
    name: "Milo Le",
    eyebrow: "My Story",
    image: "/images/about/milo-compeition.webp",
    alt: "Milo Le — Nationals competition",
    paragraphs: [
      "I'm Milo Le, co-founder of UR Studio and a multiple award-winning barber.",
      "I came up through visual art — a Graphic Design grad — but barbering became my craft: same precision and balance, just more human. Six years in, I love the transformation. I specialise in matching the right cut to the right face, tailored to your features and personality.",
      "For me, barbering is where art meets connection.",
    ],
  },
  {
    name: "Xian-Ri Woo",
    eyebrow: "Who Am I",
    image: "/images/about/xian-headshot.webp",
    alt: "Xian-Ri Woo",
    paragraphs: [
      "I'm Xian-Ri, co-founder of UR Studio. I've practised many art forms throughout my life — creating feels natural to me, an outlet for self-expression.",
      "I graduated in economics, but my passion for creating steered me elsewhere. I believe you're an individual before any occupation — your character defines what you do, not the other way around.",
      "I strive for balance, and it shows in my work. My aim is to give you a cut that truly aligns with who you are.",
    ],
  },
  {
    name: "Bendon Heung",
    eyebrow: "My Story",
    image: "/images/about/bendon-headshot.jpeg",
    alt: "Brendon (Ben) Heung",
    paragraphs: [
      "I'm Bendon (Ben) Heung, member of UR Studio. Born and raised in Melbourne, I'm inspired by the city and the creatives around me.",
      "In 2022 I fell for the blend of creativity and craftsmanship in barbering, and it quickly became second nature. As a UR barber, I aim to create a space where you can freely express yourself and feel comfortable in my chair.",
      "Every cut is approached with intent — tailored to reflect your identity.",
    ],
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

interface BarberStoryProps {
  barber: Barber
  /** When true the image sits on the right (desktop), text on the left. */
  reversed: boolean
}

function BarberStory({ barber, reversed }: BarberStoryProps) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Same scroll-triggered reveal pattern as Stats/HomeGallery/Reviews
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Spring easing overshoots slightly for the "settle into position" feel
  const spring = "cubic-bezier(0.34, 1.56, 0.64, 1)"
  const imageStyle = {
    transform: inView ? "translateX(0)" : `translateX(${reversed ? "" : "-"}60px)`,
    opacity: inView ? 1 : 0,
    transition: `transform 0.7s ${spring}, opacity 0.5s ease`,
  }
  const textStyle = {
    transform: inView ? "translateY(0)" : "translateY(40px)",
    opacity: inView ? 1 : 0,
    transition: `transform 0.7s ${spring} 120ms, opacity 0.5s ease 120ms`,
  }

  const heading = (
    <div>
      <p className="font-oswald text-xs tracking-[0.35em] text-white/50 uppercase mb-4">
        {barber.eyebrow}
      </p>
      <h2 className="font-oswald font-bold uppercase leading-none text-white" style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}>
        {barber.name}
      </h2>
    </div>
  )

  const image = (
    <div className="relative aspect-[4/5] overflow-hidden" style={imageStyle}>
      <img src={barber.image} alt={barber.alt} className="h-full w-full object-cover" />
    </div>
  )

  const body = (
    <div className="space-y-5 text-base leading-7 text-white/70 font-light" style={textStyle}>
      {barber.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <div className="pt-3 flex justify-center lg:justify-start">
        <button
          className="bg-white text-black px-10 py-4 text-sm font-oswald font-bold tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors duration-200"
          onClick={() => window.open(BOOKING_URL, "_blank")}
        >
          Book Now
        </button>
      </div>
    </div>
  )

  return (
    <div ref={ref}>
      {/* Mobile — name, image, text stacked */}
      <div className="lg:hidden space-y-8">
        <div className="text-center" style={textStyle}>{heading}</div>
        {image}
        {body}
      </div>

      {/* Desktop — alternating side-by-side */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        {reversed ? (
          <>
            <div className="space-y-8">{heading}{body}</div>
            {image}
          </>
        ) : (
          <>
            {image}
            <div className="space-y-8">{heading}{body}</div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function About() {
  return (
    <section id="about" className="bg-grey pt-28 pb-0 lg:pt-32">

      {/* Section heading — pt above clears the fixed header with a comfortable gap */}
      <div className="container mx-auto px-6 mb-16 lg:mb-24 text-center">
        <p className="font-oswald text-xs tracking-[0.35em] text-white/50 uppercase mb-4">
          Meet the Team
        </p>
        <h1 className="font-oswald font-bold uppercase leading-none text-white" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
          Learn more about Us
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-base leading-7 text-white/70 font-light">
          Our skilled professionals bring passion, precision, and years of dedicated training to every service.
        </p>
      </div>

      <div className="container mx-auto px-6 space-y-20 lg:space-y-28">
        {BARBERS.map((barber, i) => (
          <BarberStory key={barber.name} barber={barber} reversed={i % 2 === 1} />
        ))}
      </div>

    </section>
  )
}
