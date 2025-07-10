"use client"

import { Award, Trophy, Medal, Star, Crown, Users, Clock } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface AwardType {
  icon: React.ReactNode
  title: string
  achievement: string
  year: string
  rank: string
  color: string
}

export default function Awards() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft
        const cardWidth = 320 + 16 // card width + gap
        const newSlide = Math.round(scrollLeft / cardWidth)
        setCurrentSlide(newSlide)
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const firstPlaceAwards = [
    { 
      icon: <Crown className="h-6 w-6" />, 
      title: "Hair Festival 2025", 
      achievement: "Ultimate Look",
      year: "2025",
      rank: "1st",
      color: "#FFD700" // Gold
    },
    { 
      icon: <Trophy className="h-6 w-6" />, 
      title: "Expo 4 Barbers", 
      achievement: "Champion",
      year: "2024",
      rank: "1st",
      color: "#FFD700" // Gold
    },
    { 
      icon: <Award className="h-6 w-6" />, 
      title: "Hair Festival", 
      achievement: "Champion",
      year: "2023",
      rank: "1st",
      color: "#FFD700" // Gold
    }
  ]

  const otherAwards = [
    { 
      icon: <Medal className="h-6 w-6" />, 
      title: "Hair Festival 2025", 
      achievement: "Barber Street",
      year: "2025",
      rank: "2nd",
      color: "#C0C0C0" // Silver
    },
    { 
      icon: <Star className="h-6 w-6" />, 
      title: "One Shot Awards", 
      achievement: "Fade - Top 100",
      year: "2025",
      rank: "Top 100",
      color: "#E5E4E2" // Platinum
    }
  ]

  const allAwards = [...firstPlaceAwards, ...otherAwards]  

  const stats = [
    { icon: <Award className="h-8 w-8" />, value: "8", label: "Years Experience" },
    { icon: <Users className="h-8 w-8" />, value: "200+", label: "5 Star Satisfied Clients" },
    { icon: <Clock className="h-8 w-8" />, value: "24/7", label: "Online Booking" },
    { icon: <Star className="h-8 w-8" />, value: "5.0", label: "Average Rating" },
  ]

  const AwardCard = ({ award }: { award: AwardType }) => (
    <div className="relative flex-shrink-0 w-80 lg:w-auto snap-start pt-4">
      {/* Card */}
      <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100 h-full">
        
        {/* Rank Badge */}
        <div 
          className="absolute -top-1 -right-1 w-12 h-12 rounded-full flex items-center justify-center text-white font-light text-xs shadow-lg z-10"
          style={{ backgroundColor: award.color }}
        >
          {award.rank}
        </div>

        {/* Icon */}
        <div className="inline-flex items-center justify-center p-3 rounded-full mb-4 text-white" style={{ backgroundColor: '#383E3E' }}>
          {award.icon}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-light text-[#2C2C2C]">
            {award.title}
          </h3>
          <p className="text-[#666666] font-light text-sm">
            {award.achievement}
          </p>
          <div className="pt-3 border-t border-gray-100">
            <span className="text-xs text-[#999999] font-light">
              {award.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section 
      id="awards"
      className="py-16" style={{ backgroundColor: '#F5F5F5' }}
    >
      <div className="container mx-auto px-6">
        
        {/* Awards Title */}
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] font-light mb-4" style={{ color: '#565656', fontFamily: 'var(--font-body)' }}>AWARDS AND REVIEWS</p>
          <h2 className="text-5xl font-extralight mb-6" style={{ color: '#0C0C0C' }}>MULTI AWARD WINNING</h2>
          <p className="text-lg max-w-2xl mx-auto font-extralight leading-6 text-gray-600" style={{ fontFamily: 'var(--font-body)' }}>
            Recognised excellence in barbering craftsmanship with multiple industry awards and outstanding client satisfaction.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="mb-16">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* First Place Awards - 3 in a row */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {firstPlaceAwards.map((award, index) => (
                <AwardCard key={`first-${index}`} award={award} />
              ))}
            </div>
            
            {/* Other Awards - Centered between columns */}
            <div className="grid grid-cols-6 gap-6">
              <div className="col-start-2 col-span-2">
                <AwardCard award={otherAwards[0]} />
              </div>
              <div className="col-start-4 col-span-2">
                <AwardCard award={otherAwards[1]} />
              </div>
            </div>
          </div>
          
          {/* Mobile Layout - All awards in one scrollable row */}
          <div className="lg:hidden">
            <div 
              ref={scrollRef}
              className="overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              <div className="flex space-x-4 w-max px-4">
                {allAwards.map((award, index) => (
                  <AwardCard key={`mobile-${index}`} award={award} />
                ))}
              </div>
            </div>
            
            {/* Mobile Card Indicator Overlay */}
            <div className="flex justify-center mt-8">
              <div className="bg-black/80 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="flex items-center space-x-2">
                  {allAwards.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                  <span className="text-white text-sm ml-3 font-light">
                    {currentSlide + 1} / {allAwards.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="mx-auto p-4 rounded-full w-fit transition-colors duration-300 text-white" style={{ backgroundColor: '#383E3E' }}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-extralight text-[#2C2C2C] mb-2 mt-4">
                  {stat.value}
                </div>
                <div className="text-sm tracking-wide text-[#666666] font-light">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}