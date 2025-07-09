"use client"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950"
    >
      <div className="container mx-auto px-6 pb-20 pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light text-center lg:text-left" style={{ fontFamily: 'var(--font-body)' }}>
                  MELBOURNE'S FINEST
                </p>
                <div className="w-48 lg:w-64 h-auto pt-8 pb-4 mx-auto lg:mx-0">
                  <img 
                    src="/logo/logo-svg.svg" 
                    alt="UR Studio Logo"
                    className="w-full h-auto"
                    style={{ 
                      filter: 'brightness(0)',
                      colorScheme: 'dark'
                    }}
                  />
                </div>
              </div>
              <p className="font-body leading-6 text-md text-gray-600 dark:text-gray-400 font-extralight max-w-lg text-center lg:text-left mx-auto lg:mx-0" style={{ fontFamily: 'var(--font-body)' }}>
                UR Studio: Born from passion, fuelled by youth we - bring flare, edge, and a new wave of barber culture to the city of Melbourne. Every service is a tailored experience built around you, truly making it 'yours'.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-4 text-sm tracking-wide font-light group"
                onClick={() => window.open('https://www.fresha.com/a/milo-le-hair-melbourne-377-little-bourke-street-rtna1lwa/booking', '_blank')}
              >
                BOOK APPOINTMENT
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black dark:border-white text-black dark:text-white hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-200 dark:hover:text-black px-8 py-4 text-sm tracking-wide font-light group transition-all duration-300"
                onClick={() => {
                  const teamSection: HTMLElement | null = document.getElementById('team-members');
                  if (teamSection) {
                    const targetPosition: number = teamSection.getBoundingClientRect().top + window.pageYOffset - 75;
                    
                    const startPosition: number = window.pageYOffset;
                    const distance: number = targetPosition - startPosition;
                    const duration: number = 1000; // 1 second
                    let startTime: number | null = null;
                    
                    // Ease-in-out cubic function for slow-to-fast-to-slow animation
                    const easeInOutCubic = (t: number): number => {
                      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    };
                    
                    const animateScroll = (currentTime: number): void => {
                      if (startTime === null) startTime = currentTime;
                      const timeElapsed: number = currentTime - startTime;
                      const progress: number = Math.min(timeElapsed / duration, 1);
                      const ease: number = easeInOutCubic(progress);
                      
                      window.scrollTo(0, startPosition + (distance * ease));
                      
                      if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                      }
                    };
                    
                    requestAnimationFrame(animateScroll);
                  }
                }}
              >
                VIEW OUR TEAM
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
              <img
                src="/images/hero/hero.png"
                alt="Master barber at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-zinc-800 p-8 shadow-2xl">
              <div className="text-4xl font-extralight text-black dark:text-white">EST.</div>
              <div className="text-4xl font-extralight text-black dark:text-white">2025</div>
              <div className="text-xs tracking-[0.2em] text-gray-600 dark:text-gray-400 mt-2">MELBOURNE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}