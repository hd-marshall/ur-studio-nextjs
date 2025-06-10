import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Pricing from "./components/Pricing"
import Gallery from "./components/Gallery"
import About from "./components/About"
import Booking from "./components/Booking"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <Gallery />
      <About />
      <Booking />
      <Contact />
      <Footer />
    </main>
  )
}
