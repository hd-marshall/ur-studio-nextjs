import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Precision Barber Studio - Premium Men's Grooming | Melbourne CBD",
  description:
    "Experience Melbourne's finest men's grooming at Precision Barber Studio. Premium haircuts, traditional shaves, and beard sculpting in the heart of Melbourne CBD. Book your appointment today.",
  keywords:
    "premium barber Melbourne, men's haircuts CBD, traditional shave Melbourne, beard grooming, luxury barbershop, Collins Street barber",
  openGraph: {
    title: "Precision Barber Studio - Premium Men's Grooming",
    description: "Where traditional craftsmanship meets contemporary sophistication in Melbourne CBD.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
