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
    <section id="services" className="py-24" style={{ backgroundColor: '#EFEFEF' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] font-light mb-4" style={{ color: '#565656' }}>OUR SERVICES</p>
          <h2 className="text-5xl font-extralight mb-6" style={{ color: '#0C0C0C' }}>CRAFTED EXPERIENCES</h2>
          <p className="text-xl max-w-2xl mx-auto font-light leading-relaxed" style={{ color: '#565656' }}>
            Each service is meticulously designed to deliver an unparalleled grooming experience that exceeds
            expectations.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  )
}