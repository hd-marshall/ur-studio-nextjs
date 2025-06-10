import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scissors, Sparkles, Crown, Zap } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Scissors className="h-8 w-8" />,
      title: "Signature Cut",
      description: "Precision cutting tailored to your individual style and facial structure.",
      features: ["Consultation & Analysis", "Precision Cutting", "Styling & Finish", "Maintenance Advice"],
      duration: "45 min",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Traditional Shave",
      description: "Classic hot towel shave using traditional techniques and premium products.",
      features: ["Hot Towel Preparation", "Traditional Razor Shave", "Moisturizing Treatment", "Aftercare"],
      duration: "30 min",
    },
    {
      icon: <Crown className="h-8 w-8" />,
      title: "Beard Sculpting",
      description: "Expert beard trimming and shaping to complement your facial features.",
      features: ["Beard Analysis", "Precision Trimming", "Shape Definition", "Conditioning Treatment"],
      duration: "25 min",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "The Complete",
      description: "Our signature full-service experience combining all our premium services.",
      features: ["Signature Cut", "Traditional Shave", "Beard Sculpting", "Scalp Treatment"],
      duration: "90 min",
    },
  ]

  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light mb-4">OUR SERVICES</p>
          <h2 className="text-5xl font-extralight text-black dark:text-white mb-6">CRAFTED EXPERIENCES</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Each service is meticulously designed to deliver an unparalleled grooming experience that exceeds
            expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
            >
              <CardHeader className="text-center pb-6">
                <div className="mx-auto mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-full w-fit group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-light tracking-wide">{service.title}</CardTitle>
                <div className="text-sm text-gray-500 dark:text-gray-400 tracking-wide">{service.duration}</div>
                <CardDescription className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-gray-300 font-light">
                      <div className="w-1 h-1 bg-black dark:bg-white rounded-full mr-4"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
