"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const scrollToBooking = () => {
    const element = document.querySelector("#booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-950"
    >
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                  MELBOURNE'S FINEST
                </p>
                <h1 className="text-6xl lg:text-7xl font-extralight leading-none tracking-tight">
                  CRAFT
                  <br />
                  <span className="font-light">& PRECISION</span>
                </h1>
              </div>
              <p className="font-body text-xl text-zinc-800 dark:text-gray-400 leading-relaxed font-light max-w-lg" style={{ fontFamily: 'var(--font-body)' }}>
                Where traditional barbering meets contemporary sophistication. Experience the art of precision cutting
                in Melbourne's most refined setting.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-4 text-sm tracking-wide font-light group"
                onClick={scrollToBooking}
              >
                BOOK APPOINTMENT
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black dark:border-white text-black dark:text-white px-8 py-4 text-sm tracking-wide font-light"
              >
                VIEW SERVICES
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
