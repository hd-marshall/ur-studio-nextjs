export default function About() {
  const barbers = [
    {
      name: "Milo Le",
      title: "Founder & Master Barber",
      experience: "4 years",
      specialty: "Precision cuts & traditional techniques",
      image: "/images/about/milo-headshot.JPG",
      story: "",
    },
    {
      name: "Xian Ri",
      title: "Senior Barber",
      experience: "3 years",
      specialty: "Modern fades & beard sculpting",
      image: "/images/about/xian-headshot.png",
      story: "",
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
            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed font-light" style={{ fontFamily: 'var(--font-body)' }}>
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

        {/* Team */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light mb-4">MEET THE TEAM</p>
          <h2 className="text-5xl font-extralight text-black dark:text-white mb-6">MASTER CRAFTSMEN</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Our skilled professionals bring passion, precision, and years of dedicated training to every service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-20 max-w-5xl mx-auto">
          {barbers.map((barber, index) => (
            <div
              key={index}
              className="text-center hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg overflow-hidden"
            >
              <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                <img
                  src={barber.image || "/placeholder.svg"}
                  alt={barber.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-light tracking-wide text-foreground mb-2">{barber.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 font-light text-lg mb-6">
                  {barber.title}
                </p>
                <div className="space-y-3">
                  <p className="text-gray-700 dark:text-gray-300 font-light">
                    <span className="text-black dark:text-white">Experience:</span> {barber.experience}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-light">
                    <span className="text-black dark:text-white">Specialty:</span> {barber.specialty}
                  </p>
                </div>
                {barber.story && (
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed italic mt-6">{barber.story}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}