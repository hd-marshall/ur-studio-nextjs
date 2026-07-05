import About from "../components/About"

export const metadata = {
  title: "About - UR Studio",
  description:
    "Meet the team behind UR Studio award-winning Melbourne barbers Milo Le, Xian-Ri Woo and Brendon Heung.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-grey">
      <About />
    </main>
  )
}
