"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Work" },
    { id: "cuts", name: "Signature Cuts" },
    { id: "shaves", name: "Traditional Shaves" },
    { id: "beards", name: "Beard Sculpting" },
  ]

  const galleryItems = [
    {
      id: 1,
      category: "cuts",
      image: "/placeholder.svg?height=500&width=400",
      title: "Classic Pompadour",
      description: "Timeless elegance",
    },
    {
      id: 2,
      category: "cuts",
      image: "/placeholder.svg?height=500&width=400",
      title: "Modern Fade",
      description: "Contemporary precision",
    },
    {
      id: 3,
      category: "beards",
      image: "/placeholder.svg?height=500&width=400",
      title: "Full Beard Sculpt",
      description: "Masterful shaping",
    },
    {
      id: 4,
      category: "cuts",
      image: "/placeholder.svg?height=500&width=400",
      title: "Textured Crop",
      description: "Modern sophistication",
    },
    {
      id: 5,
      category: "shaves",
      image: "/placeholder.svg?height=500&width=400",
      title: "Traditional Shave",
      description: "Classic technique",
    },
    {
      id: 6,
      category: "beards",
      image: "/placeholder.svg?height=500&width=400",
      title: "Beard Trim",
      description: "Refined grooming",
    },
    {
      id: 7,
      category: "cuts",
      image: "/placeholder.svg?height=500&width=400",
      title: "Executive Cut",
      description: "Professional polish",
    },
    {
      id: 8,
      category: "shaves",
      image: "/placeholder.svg?height=500&width=400",
      title: "Hot Towel Service",
      description: "Luxurious experience",
    },
  ]

  const filteredItems =
    activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <section id="gallery" className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] text-gray-600 dark:text-gray-400 font-light mb-4">PORTFOLIO</p>
          <h2 className="text-5xl font-extralight text-black dark:text-white mb-6">CRAFTSMANSHIP</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Each piece represents our commitment to excellence and attention to detail in every service we provide.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-3 text-sm tracking-wide font-light ${
                activeCategory === category.id
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              }`}
            >
              {category.name.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
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
                  <p className="text-sm text-gray-300 font-light">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
