"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Pricing() {
  const pricingTiers = [
    {
      name: "Essential",
      price: "$65",
      description: "Perfect for the modern professional",
      features: ["Signature Cut", "Wash & Style", "Styling Consultation", "Maintenance Guide"],
      popular: false,
    },
    {
      name: "Premium",
      price: "$95",
      description: "Our most sought-after experience",
      features: [
        "Signature Cut",
        "Traditional Shave",
        "Beard Sculpting",
        "Hot Towel Treatment",
        "Premium Products",
        "Styling Consultation",
      ],
      popular: true,
    },
    {
      name: "The Complete",
      price: "$140",
      description: "The ultimate grooming experience",
      features: [
        "All Premium Services",
        "Scalp Treatment",
        "Eyebrow Grooming",
        "Nose Hair Trimming",
        "Aftercare Package",
        "Complimentary Beverage",
        "Priority Booking",
      ],
      popular: false,
    },
  ]

  const scrollToBooking = () => {
    const element = document.querySelector("#booking")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light mb-4">INVESTMENT</p>
          <h2 className="text-5xl font-extralight text-black dark:text-white mb-6">TRANSPARENT PRICING</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Premium services with transparent pricing. Every experience includes our signature attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div key={index} className="relative">
              {/* Gradient background for premium tier */}
              {tier.popular && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-gray-100 dark:via-white dark:to-gray-200 rounded-lg blur-xl opacity-20 scale-110 animate-pulse"></div>
              )}

              <Card
                className={`relative hover:shadow-2xl transition-all duration-500 border-gray-200 dark:border-gray-800 bg-white dark:bg-black ${
                  tier.popular ? "scale-105 border-black dark:border-white shadow-2xl" : ""
                }`}
              >
                {tier.popular && (
                  <>
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 text-xs tracking-[0.2em] font-light">
                        MOST POPULAR
                      </span>
                    </div>
                    {/* Additional glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/5 dark:from-white/5 dark:to-white/5 rounded-lg pointer-events-none"></div>
                  </>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-light tracking-wide">{tier.name}</CardTitle>
                  <div className="mt-6">
                    <span className="text-5xl font-extralight text-black dark:text-white">{tier.price}</span>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400 mt-4 font-light">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  <ul className="space-y-4">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-4 w-4 text-black dark:text-white mr-4 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-4 text-sm tracking-wide font-light ${
                      tier.popular
                        ? "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                        : "bg-gray-100 dark:bg-gray-900 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    }`}
                    onClick={scrollToBooking}
                  >
                    BOOK {tier.name.toUpperCase()}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
