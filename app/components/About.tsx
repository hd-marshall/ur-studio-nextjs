export default function About() {
  const barbers = [
    {
      name: "Milo Le",
      title: "Senior Barber",
      experience: "4 years",
      specialty: "Precision cuts & traditional techniques",
      image: "/images/about/milo-headshot.webp",
      story: "",
    },
    {
      name: "Xian-Ri",
      title: "Senior Barber",
      experience: "3 years",
      specialty: "Modern fades & beard sculpting",
      image: "/images/about/xian-headshot.webp",
      story: "",
    },
  ]

  return (
    <section id="about" className="pb-12 pt-24 bg-white dark:bg-black">

      {/* Team */}
      <div className="text-center mb-16 max-w-[90%] mx-auto" id="team-members" >
        <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light mb-4">MEET THE TEAM</p>
        <h2 className="text-5xl font-extralight text-black dark:text-white mb-6">MASTER CRAFTSMEN</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-6" style={{ fontFamily: 'var(--font-body)' }}>
          Our skilled professionals bring passion, precision, and years of dedicated training to every service.
        </p>
      </div>

      <div className="container mx-auto px-6">
        {/* Milo's Story - Text Left, Image Right on Desktop */}
        <div className="mb-24">
          {/* Mobile Layout - Block Stack */}
          <div className="lg:hidden space-y-8">
            {/* Mobile: Name First */}
            <div className="text-center">
              <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-600 font-light mb-4">MY STORY</p>
              <h2 className="text-5xl font-extralight text-black dark:text-white mb-8">
                MILO LE
              </h2>
            </div>
            
            {/* Mobile: Picture Second */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
                <img
                  src="/images/about/milo-compeition.webp"
                  alt="Milo Nationals Comp"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Mobile: Text Third */}
            <div className="text-md space-y-6 text-gray-700 dark:text-gray-600 leading-6 font-extralight" style={{ fontFamily: 'var(--font-body)' }}>
              <p className="text-md">
                I'm Milo Le, co-founder of Ur Studio. I'm a multiple award-winning barber, and a passionate creative at heart.
              </p>
              <p>
                My journey began in the world of visual art, I graduated with a major in Graphic Design but I chose to follow a different path: barbering. For me, cutting hair became a way to combine precision, visual balance and personal expression in a more human, hands-on way.
              </p>
              <p>
                I've been cutting hair for over six years now, and what I truly love is the process of transformation. I specialise in choosing the right haircut for the right face—bringing out the best silhouette, structure, and overall feel for each individual. Every cut I create is driven by purpose, tailored to suit both personality and features.
              </p>
              <p>
                Barbering, to me, is more than just style. It's storytelling. It's identity. And it's a space where art meets connection.
              </p>
            </div>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-600 font-light mb-4">MY STORY</p>
                <h2 className="text-5xl font-extralight text-black dark:text-white mb-8">
                  MILO LE
                </h2>
              </div>
              <div className="text-md space-y-6 text-gray-700 dark:text-gray-600 leading-6 font-extralight" style={{ fontFamily: 'var(--font-body)' }}>
                <p className="text-md">
                  I'm Milo Le, co-founder of Ur Studio. I'm a multiple award-winning barber, and a passionate creative at heart.
                </p>
                <p>
                  My journey began in the world of visual art, I graduated with a major in Graphic Design but I chose to follow a different path: barbering. For me, cutting hair became a way to combine precision, visual balance and personal expression in a more human, hands-on way.
                </p>
                <p>
                  I've been cutting hair for over six years now, and what I truly love is the process of transformation. I specialise in choosing the right haircut for the right face—bringing out the best silhouette, structure, and overall feel for each individual. Every cut I create is driven by purpose, tailored to suit both personality and features.
                </p>
                <p>
                  Barbering, to me, is more than just style. It's storytelling. It's identity. And it's a space where art meets connection.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
                <img
                  src="/images/about/milo-compeition.webp"
                  alt="Milo Nationals Comp"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Xian-Ri's Story - Image Left, Text Right on Desktop */}
        <div className="mb-24">
          {/* Mobile Layout - Block Stack */}
          <div className="lg:hidden space-y-8">
            {/* Mobile: Name First */}
            <div className="text-center">
              <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-600 font-light mb-4">WHO AM I</p>
              <h2 className="text-5xl font-extralight text-black dark:text-white mb-8">
                XIAN-RI WOO
              </h2>
            </div>
            
            {/* Mobile: Picture Second */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
                <img
                  src="/images/about/xian-headshot.webp"
                  alt="Xian-Ri About Me"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Mobile: Text Third */}
            <div className="text-md space-y-6 text-gray-700 dark:text-gray-600 leading-6 font-extralight" style={{ fontFamily: 'var(--font-body)' }}>
              <p className="text-md">
                I'm Xian-Ri, co-founder of UR Studio. I've practised many art forms throughout my life-creating feels natural to me; it is an outlet for self-expression.
              </p>
              <p>
                I graduated with a degree in economics, but my passion for creation steered me in a different direction.
              </p>
              <p>
                I strongly believe it's important to be an individual before any occupation. You define what you do through your character and personality, not the other way around. Barbering is one of the ways I bring that philosophy to life. As an individual, I strive for balance, and that mindset is deeply reflected in my work.
              </p>
              <p>
                Through this balance and creative expression, I aim to give my clients haircuts that truly align with their identity—so they can express themselves in their most personal way.
              </p>
            </div>
          </div>

          {/* Desktop Layout - Side by Side (Reversed) */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
            {/* Picture First (Left Side) */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
                <img
                  src="/images/about/xian-headshot.webp"
                  alt="Xian-Ri About Me"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Text Second (Right Side) */}
            <div className="space-y-8">
              <div>
                <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-600 font-light mb-4">WHO AM I</p>
                <h2 className="text-5xl font-extralight text-black dark:text-white mb-8">
                  XIAN-RI WOO
                </h2>
              </div>
              <div className="text-md space-y-6 text-gray-700 dark:text-gray-600 leading-6 font-extralight" style={{ fontFamily: 'var(--font-body)' }}>
                <p className="text-md">
                  I'm Xian-Ri, co-founder of UR Studio. I've practised many art forms throughout my life-creating feels natural to me; it is an outlet for self-expression.
                </p>
                <p>
                  I graduated with a degree in economics, but my passion for creation steered me in a different direction.
                </p>
                <p>
                  I strongly believe it's important to be an individual before any occupation. You define what you do through your character and personality, not the other way around. Barbering is one of the ways I bring that philosophy to life. As an individual, I strive for balance, and that mindset is deeply reflected in my work.
                </p>
                <p>
                  Through this balance and creative expression, I aim to give my clients haircuts that truly align with their identity—so they can express themselves in their most personal way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}