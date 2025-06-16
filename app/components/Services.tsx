"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Sparkles, Crown, Zap } from "lucide-react"

export default function Services() {
  const [currentCard, setCurrentCard] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Scissors Cut",
      description: "Precision cutting tailored to your individual style and facial structure.",
      features: ["Consultation & Analysis", "Precision Cutting", "Styling & Finish", "Maintenance Advice"],
      duration: "40 min",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Complete Haircut",
      description: "Classic hot towel shave using traditional techniques and premium products.",
      features: ["Hot Towel Preparation", "Traditional Razor Shave", "Moisturizing Treatment", "Aftercare"],
      duration: "45 min",
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: "Hot Towel Shave",
      description: "Expert beard trimming and shaping to complement your facial features.",
      features: ["Beard Analysis", "Precision Trimming", "Shape Definition", "Conditioning Treatment"],
      duration: "30 min",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Haircut and Beard Trim",
      description: "Our signature full-service experience combining all our premium services.",
      features: ["Signature Cut", "Traditional Shave", "Beard Sculpting", "Scalp Treatment"],
      duration: "75 min",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const cardWidth = container.children[0]?.clientWidth || 0
        const scrollLeft = container.scrollLeft
        const currentIndex = Math.round(scrollLeft / (cardWidth + 32)) // 32px is the gap
        setCurrentCard(Math.min(currentIndex, services.length - 1))
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [services.length])

  return (
    <section id="services" className="pt-24 pb-12 lg:pb-24 relative" style={{ backgroundColor: '#EFEFEF' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] font-light mb-4" style={{ color: '#565656', fontFamily: 'var(--font-body)' }}>OUR SERVICES</p>
          <h2 className="text-5xl font-extralight mb-6" style={{ color: '#0C0C0C' }}>CRAFTED EXPERIENCES</h2>
          <p className="text-lg max-w-2xl mx-auto font-extralight leading-6 text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
          Each service is meticulously designed to deliver an unparalleled grooming experience that exceeds
          expectations.
          </p>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden lg:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500"
              style={{ 
                backgroundColor: '#EFEFEF',
                borderColor: '#A3A3A3'
              }}
            >
              <CardHeader className="text-center pb-6">
                <div 
                  className="mx-auto mb-6 p-4 rounded-full w-fit transition-colors duration-300"
                  style={{ 
                    backgroundColor: '#A3A3A3',
                    color: '#0C0C0C'
                  }}
                >
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-light tracking-wide" style={{ color: '#0C0C0C' }}>
                  {service.title}
                </CardTitle>
                <div className="text-sm tracking-wide" style={{ color: '#565656' }}>
                  {service.duration}
                </div>
                <CardDescription className="font-light leading-relaxed" style={{ color: '#565656' }}>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm font-light" style={{ color: '#0C0C0C' }}>
                      <div 
                        className="w-1 h-1 rounded-full mr-4"
                        style={{ backgroundColor: '#0C0C0C' }}
                      ></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Horizontal Scroll */}
        <div 
          ref={scrollContainerRef}
          className="lg:hidden flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 min-w-[280px] snap-center"
              style={{ 
                backgroundColor: '#EFEFEF',
                borderColor: '#A3A3A3'
              }}
            >
              <CardHeader className="text-center pb-6">
                <div 
                  className="mx-auto mb-6 p-4 rounded-full w-fit transition-colors duration-300"
                  style={{ 
                    backgroundColor: '#A3A3A3',
                    color: '#0C0C0C'
                  }}
                >
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-light tracking-wide" style={{ color: '#0C0C0C' }}>
                  {service.title}
                </CardTitle>
                <div className="text-sm tracking-wide" style={{ color: '#565656' }}>
                  {service.duration}
                </div>
                <CardDescription className="font-light leading-relaxed" style={{ color: '#565656' }}>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm font-light" style={{ color: '#0C0C0C' }}>
                      <div 
                        className="w-1 h-1 rounded-full mr-4"
                        style={{ backgroundColor: '#0C0C0C' }}
                      ></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mobile Card Indicator Overlay */}
      <div className="lg:hidden flex justify-center mt-8">
        <div className="bg-black/80 backdrop-blur-sm rounded-full px-4 py-2">
          <div className="flex items-center space-x-2">
            {services.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentCard ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
            <span className="text-white text-sm ml-3 font-light">
              {currentCard + 1} / {services.length}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}