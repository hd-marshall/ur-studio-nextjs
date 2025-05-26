// imports.
import React from 'react';
import type { Metadata } from "next";
import Script from 'next/script';

// fonts.
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

// components.
// import Breadcrumbs from '@/components/seo/Breadcrumbs';
// import Footer from '@/components/shared/Footer';

const bebasNeue = Bebas_Neue({
  weight: '400', // Bebas Neue only comes in one weight (which is very bold)
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  // set base url.
  metadataBase: new URL('https://www.milolehair.com'),
  // company name | company services slogan (max 10 words).
  title: '',
  // company description (min. 2 sentences).
  description: '',
  icons: {
    icon: [
      // different sizes for browser tab icons. ???
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },

  manifest: '/site.webmanifest',
  // link display code.
  openGraph: {
    // company name | company services slogan (max 10 words).
    title: '',
    // company description (min. 2 sentences).
    description: '',
    // base url.
    url: '',
    // company name.
    siteName: '',
    // list of image display opens on links
    images: [
      {
        // image location.
        url: '',
        // image display width.
        width: 1200,
        // image display height.
        height: 600,
      }
    ],
    locale: 'en_AU',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <head>
        {/* google tag manager - head (script) */}

        {/* google search site map */}

        {/* google search console rich text */}
      </head>

      <body>
        {/* google tag manager - body (script) */}

        {/* vercel speed statistics */}

        {/* traffic speed statistics */}

        {/* <Breadcrumbs /> */}

        {children}

        {/* <Footer /> */}

      </body>

    </html>
  );
}
