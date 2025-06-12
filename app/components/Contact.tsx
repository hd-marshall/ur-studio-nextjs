import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      details: ["61 Peels Street", "Melbourne CBD", "Victoria 3000"],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Contact",
      details: ["PLACEHOLDER No.", "Available 9 AM - 7 PM"],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@urstudio.com", "Response within 6 hours"],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      details: ["Monday - Friday: 9:00 AM - 7:00 PM", "Saturday: 8:00 AM - 6:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
    },
  ]

  return (
    <section id="contact" className="pt-8 pb-8 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-[#666666] font-light mb-4">VISIT US</p>
          <h2 className="text-5xl font-extralight text-white mb-6">WEST MELBOURNE</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-6" style={{ fontFamily: 'var(--font-body)' }}>
            Located in the heart of Melbourne's business district, easily accessible by public transport and with
            convenient parking nearby.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="flex-1 hover:shadow-xl transition-all duration-500 bg-white border-[#E0E0E0] rounded-2xl shadow-md"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#9C9C9C] rounded-full text-white">{info.icon}</div>
                  <CardTitle className="text-lg font-normal tracking-wide text-[#2C2C2C]">{info.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-[#666666] text-sm leading-relaxed font-light">
                    {detail}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Width Map */}
      <div className="w-full">
        <div className="aspect-video relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6304.564503352529!2d144.9554753!3d-37.80685729999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d369ef553b3%3A0x51a8579c86424f88!2s61%20Peel%20St%2C%20West%20Melbourne%20VIC%203003!5e0!3m2!1sen!2sau!4v1749701834657!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>
    </section>
  )
}