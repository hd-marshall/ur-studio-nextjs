"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Work" },
    { id: "short", name: "Short Trim" },
    { id: "long", name: "Long Trim" },
    { id: "shaves", name: "Hair and Beard" },
  ]

  const galleryItems = [
    {
      id: 1,
      category: "long",
      image: "/images/gallery/gallery-1.JPG",
      title: "Mod Cut",
    },
    {
      id: 2,
      category: "short",
      image: "/images/gallery/gallery-2.PNG",
      title: "Pompadour Slick Back",
    },
    {
      id: 3,
      category: "short",
      image: "/images/gallery/gallery-3.JPEG",
      title: "Quiff Low Drop Fade",
    },
    {
      id: 4,
      category: "long",
      image: "/images/gallery/gallery-5.PNG",
      title: "Classic Brush Cut",
    },
    {
      id: 5,
      category: "shaves",
      image: "/images/gallery/gallery-6.JPG",
      title: "Texture Fringe Mid Skin Fade Beard Line Up",
    },
    {
      id: 6,
      category: "short",
      image: "/images/gallery/gallery-4.jpg",
      title: "Design Mod Cut",
    },
    {
      id: 7,
      category: "short",
      image: "/images/gallery/gallery-10.JPG",
      title: "Texture Crop Mullet Taper",
    },
    {
      id: 8,
      category: "long",
      image: "/images/gallery/gallery-11.JPG",
      title: "Modern Mullet",
    },
    // {
    //   id: 9,
    //   category: "short",
    //   image: "/images/gallery/gallery-14.PNG",
    //   title: "Burst Fade",
    // },
    // {
    //   id: 10,
    //   category: "short",
    //   image: "/images/gallery/gallery-15.PNG",
    //   title: "Mid Part",
    // },
    // {
    //   id: 11,
    //   category: "long",
    //   image: "/images/gallery/gallery-16.jpg",
    //   title: "Old Money",
    // },
    // {
    //   id: 12,
    //   category: "long",
    //   image: "/images/gallery/gallery-17.PNG",
    //   title: "Mod Cut",
    // },
  ]

  const filteredItems =
    activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <section id="gallery" className="py-24 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] text-gray-400 font-light mb-4">PORTFOLIO</p>
          <h2 className="text-5xl font-extralight text-white mb-6">SHOWCASE</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-extralight leading-6" style={{ fontFamily: 'var(--font-body)' }}>
          Each piece represents <br /> our commitment to excellence and attention to detail in every service we provide.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => {
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-7 py-2.5 md:px-8 md:py-3 text-sm tracking-wide font-light transition-all duration-300 border rounded-lg ${
                  isActive
                    ? "bg-white text-black border-white"
                    : "bg-black border-white text-white hover:bg-white hover:text-black"
                }`}
              >
                {category.name.toUpperCase()}
              </button>
            )
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-gray-800 bg-black"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-light text-lg tracking-wide mb-1">{item.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}