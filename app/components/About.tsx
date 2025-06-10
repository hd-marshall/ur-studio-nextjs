import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Users, Clock, Star } from "lucide-react"

export default function About() {
  const stats = [
    { icon: <Award className="h-8 w-8" />, value: "4", label: "Years Crafting" },
    { icon: <Users className="h-8 w-8" />, value: "2000+", label: "Satisfied Clients" },
    { icon: <Clock className="h-8 w-8" />, value: "24/7", label: "Online Booking" },
    { icon: <Star className="h-8 w-8" />, value: "5.0", label: "Average Rating" },
  ]

  const barbers = [
    {
      name: "Milo Le",
      title: "Founder & Master Barber",
      experience: "4 years",
      specialty: "Precision cuts & traditional techniques",
      image: "/images/about/milo-headshot.JPG",
      story:
        "Started his journey at 20, Milo trained under master barbers in London before bringing his refined techniques to Melbourne.",
    },
    {
      name: "Xian Ri",
      title: "Senior Barber",
      experience: "3 years",
      specialty: "Modern fades & beard sculpting",
      image: "/images/about/xian-headshot.png",
      story: "A perfectionist by nature, Xian combines contemporary techniques with classic barbering principles.",
    },
  ]

  return (
    <section id="about" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        {/* About Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <div>
              <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light mb-4">OUR STORY</p>
              <h2 className="text-5xl font-extralight text-black dark:text-white mb-8">
                YOUNG VISION,
                <br />
                TIMELESS CRAFT
              </h2>
            </div>
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed font-light">
              <p>
                Founded in 2020 by Alexander Chen at just 19 years old, Precision Barber Studio began as a vision to
                bridge the gap between traditional barbering excellence and contemporary sophistication.
              </p>
              <p>
                Despite our young foundation, we've built our reputation on unwavering commitment to craftsmanship,
                precision, and the belief that every client deserves an exceptional experience that reflects their
                individual style and personality.
              </p>
              <p>
                Located in the heart of Melbourne, we've created a sanctuary where traditional techniques meet modern
                innovation, delivering results that exceed expectations and build lasting confidence.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
              <img
                src="/images/about/milo-compeition.jpg"
                alt="Milo Nationals Comp"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="mx-auto mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-full w-fit group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl font-extralight text-black dark:text-white mb-2">{stat.value}</div>
              <div className="text-sm tracking-wide text-gray-600 dark:text-gray-400 font-light">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light mb-4">MEET THE TEAM</p>
          <h3 className="text-4xl font-extralight text-black dark:text-white mb-6">MASTER CRAFTSMEN</h3>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Our skilled professionals bring passion, precision, and years of dedicated training to every service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {barbers.map((barber, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-2xl transition-all duration-500 border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
            >
              <CardHeader className="pb-8">
                <div className="mx-auto mb-8">
                  <div className="w-48 h-48 mx-auto overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                    <img
                      src={barber.image || "/placeholder.svg"}
                      alt={barber.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <CardTitle className="text-2xl font-light tracking-wide">{barber.name}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 font-light text-lg">
                  {barber.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300 font-light">
                    <span className="text-black dark:text-white">Experience:</span> {barber.experience}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-light">
                    <span className="text-black dark:text-white">Specialty:</span> {barber.specialty}
                  </p>
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed italic">{barber.story}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
