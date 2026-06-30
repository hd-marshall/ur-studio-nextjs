import GalleryShowcase from "../components/GalleryShowcase"

export const metadata = {
  title: "Gallery - UR Studio",
  description:
    "A gallery of award-winning cuts, fades and styles from the barbers at UR Studio, Melbourne.",
}

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-grey">
      <GalleryShowcase />
    </main>
  )
}
