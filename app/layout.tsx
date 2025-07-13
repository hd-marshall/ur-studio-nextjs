import React from 'react';
import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import localFont from 'next/font/local'

import "./globals.css"
import { Providers } from "./providers"
import Header from "./components/Header"
import Footer from "./components/Footer"

import Breadcrumbs from './components/Breadcrumbs';

const customFont = localFont({
  src: '../public/fonts/Nitti-Normal.ttf',
  variable: '--font-body',
  display: 'swap',
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.urstudio.com.au'),
  title: "UR Studio - Men's Barber | West Melbourne",
  description: "Experience Melbourne's finest men's grooming at UR Studio. Premium haircuts, traditional shaves, and beard sculpting in the heart of West Melbourne. Book your appointment today.",
  keywords: "premium barber Melbourne, men's haircuts west melbourne, traditional shave Melbourne, beard grooming, luxury barbershop, UR Studio",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "UR Studio - Men's Barber | West Melbourne",
    description: "Experience Melbourne's finest men's grooming at UR Studio. Premium haircuts, traditional shaves, and beard sculpting in West Melbourne.",
    url: 'https://www.urstudio.com.au',
    siteName: 'UR Studio',
    images: [
      {
        url: 'https://www.urstudio.com.au/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'UR Studio - Premium Barbershop in West Melbourne'
      }
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "UR Studio - Men's Barber | West Melbourne",
    description: "Experience Melbourne's finest men's grooming at UR Studio.",
    images: ['https://www.urstudio.com.au/images/og-image.jpg'],
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth overflow-x-hidden ${customFont.variable}`} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="Q21_LKHWdRir-tJYF9VfjaEsSk3J-4ifw0t0MtMBXIg" />
        {/* Sitemap */}
        <link 
          rel="sitemap" 
          type="application/xml" 
          href="https://www.urstudio.com.au/sitemap.xml" 
        />
        
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HealthAndBeautyBusiness',
              'name': 'UR Studio',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': '61A Peel Street',
                'addressLocality': 'West Melbourne',
                'addressRegion': 'VIC',
                'postalCode': '3003',
                'addressCountry': 'AU'
              },
              'telephone': '0447607947',
              'email': 'urstudiomelb@gmail.com',
              'url': 'https://www.urstudio.com.au/',
              'image': [
                'https://www.urstudio.com.au/favicon-96x96.png',
                'https://www.urstudio.com.au/web-app-manifest-192x192.png',
                'https://www.urstudio.com.au/images/og-image.jpg'
              ],
              'logo': 'https://www.urstudio.com.au/favicon.svg',
              'priceRange': '$',
              'openingHoursSpecification': [
                {
                  '@type': 'OpeningHoursSpecification',
                  'dayOfWeek': ['Wednesday', 'Thursday', 'Friday'],
                  'opens': '10:00',
                  'closes': '18:30'
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  'dayOfWeek': ['Saturday', 'Sunday'],
                  'opens': '10:30',
                  'closes': '17:30'
                }
              ],
              'serviceType': ['Hair cutting', 'Beard trimming', 'Traditional shaving', 'Hair styling'],
              'aggregateRating': {
                '@type': 'AggregateRating',
                'ratingValue': '4.9',
                'reviewCount': '127'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden max-w-[100vw] w-full`}>

        <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden">
          <Header />
          
          <Breadcrumbs />
          
          <main className="w-full max-w-[100vw] overflow-x-hidden">
            <Providers>
              {children}
            </Providers>
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  )
}