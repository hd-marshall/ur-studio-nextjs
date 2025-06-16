import { Award, Users, Clock, Star } from "lucide-react"

export default function Stats() {
  const stats = [
    { icon: <Award className="h-8 w-8" />, value: "8", label: "Years Experience" },
    { icon: <Users className="h-8 w-8" />, value: "200+", label: "5 Star Satisfied Clients" },
    { icon: <Clock className="h-8 w-8" />, value: "24/7", label: "Online Booking" },
    { icon: <Star className="h-8 w-8" />, value: "5.0", label: "Average Rating" },
  ]

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="mx-auto p-4 bg-[#9C9C9C] rounded-full w-fit transition-colors duration-300 text-white">
                {stat.icon}
              </div>
              <div className="text-4xl font-extralight text-[#2C2C2C] mb-2">{stat.value}</div>
              <div className="text-sm tracking-wide text-[#666666] font-light" style={{ fontFamily: 'var(--font-body)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}