import Hero from "./components/Hero"
import Services from "./components/Services"
import Gallery from "./components/Gallery"
import Stats from "./components/Stats"
import About from "./components/About"
import Contact from "./components/Contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Hero />
      <Services />
      <Gallery />
      {/* <Stats /> */}
      <About />
      <Contact />
    </main>
  )
}
