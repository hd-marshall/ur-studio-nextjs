import Hero from "./components/Hero"
import HomeGallery from "./components/HomeGallery"
import Reviews from "./components/Reviews"
import Contact from "./components/Contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Hero />
      <HomeGallery />
      <Reviews />
      <Contact />
    </main>
  )
}
