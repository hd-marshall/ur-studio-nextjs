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
      "I'm Milo Le, co-founder of UR Studio. I'm a multiple award-winning barber, and a passionate creative at heart.",
      "My journey began in the world of visual art, I graduated with a major in Graphic Design but I chose to follow a different path: barbering. For me, cutting hair became a way to combine precision, visual balance and personal expression in a more human, hands-on way.",
      "I've been cutting hair for over six years now, and what I truly love is the process of transformation. I specialise in choosing the right haircut for the right face—bringing out the best silhouette, structure, and overall feel for each individual. Every cut I create is driven by purpose, tailored to suit both personality and features.",
      "Barbering, to me, is more than just style. It's storytelling. It's identity. And it's a space where art meets connection.",
    ],
  },
  {
    name: "Xian-Ri Woo",
    eyebrow: "Who Am I",
    image: "/images/about/xian-headshot.webp",
    alt: "Xian-Ri Woo",
    paragraphs: [
      "I'm Xian-Ri, co-founder of UR Studio. I've practised many art forms throughout my life-creating feels natural to me; it is an outlet for self-expression.",
      "I graduated with a degree in economics, but my passion for creation steered me in a different direction.",
      "I strongly believe it's important to be an individual before any occupation. You define what you do through your character and personality, not the other way around. Barbering is one of the ways I bring that philosophy to life. As an individual, I strive for balance, and that mindset is deeply reflected in my work.",
      "Through this balance and creative expression, I aim to give my clients haircuts that truly align with their identity—so they can express themselves in their most personal way.",
    ],
  },
  {
    name: "Bendon Heung",
    eyebrow: "My Story",
    image: "/images/about/bradon-headshot.jpeg",
    alt: "Bendon (Ben) Heung",
    paragraphs: [
      "I'm Bendon (Ben) Heung, member of UR Studio. Born and raised in Melbourne, I'm inspired by the city and the creatives around me, dedicating myself to helping pioneer individuality.",
      "In 2022, I fell in love with the seamless blend of creativity and craftsmanship within barbering, pursuing it with passion and quickly finding it second nature.",
      "Within today's society, self-expression and identity can often feel confined by certain expectations. As a UR barber, I aim to create a safe space where individuals can freely express themselves and feel comfortable in my chair. Every cut is approached with intent and purpose, tailoring each haircut to reflect a person's unique identity.",
      "I dedicate myself to continuously refining the art and craft of barbering, not only to celebrate individuality, but to grow alongside every person I inspire.",
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
