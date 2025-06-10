import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      details: ["123 Collins Street", "Melbourne CBD", "Victoria 3000"],
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Contact",
      details: ["(03) 9123 4567", "Available 9 AM - 7 PM"],
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["hello@precisionbarber.com.au", "Response within 2 hours"],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      details: ["Monday - Friday: 9:00 AM - 7:00 PM", "Saturday: 8:00 AM - 6:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
    },
  ]

  return (
    <section id="contact" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light mb-4">VISIT US</p>
          <h2 className="text-5xl font-extralight text-black dark:text-white mb-6">MELBOURNE CBD</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Located in the heart of Melbourne's business district, easily accessible by public transport and with
            convenient parking nearby.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-500 border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-full">{info.icon}</div>
                      <CardTitle className="text-lg font-light tracking-wide">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-light">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <Card className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="text-black dark:text-white font-light tracking-wide">Walk-ins Welcome</CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300 font-light">
                  While appointments are highly recommended for guaranteed service, we welcome walk-in clients subject
                  to availability.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Map and Directions */}
          <div className="space-y-8">
            <Card className="overflow-hidden border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-light tracking-wide">
                  <MapPin className="h-5 w-5" />
                  Find Us
                </CardTitle>
                <CardDescription className="font-light">
                  Conveniently located in Melbourne's CBD with excellent transport links.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093747!2d144.9537353153167!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1635749234567!5m2!1sen!2sau"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            {/* Transport Information */}
            <Card className="border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
              <CardHeader>
                <CardTitle className="font-light tracking-wide">Getting Here</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-black dark:bg-white rounded-full mt-2"></div>
                  <div>
                    <p className="font-light text-black dark:text-white mb-1">Public Transport</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-light">
                      Flinders Street Station (5 min walk) • Collins Street Tram Stop (1 min walk)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-black dark:bg-white rounded-full mt-2"></div>
                  <div>
                    <p className="font-light text-black dark:text-white mb-1">Parking</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-light">
                      Wilson Parking (2 blocks) • Street parking available • Valet service on request
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
