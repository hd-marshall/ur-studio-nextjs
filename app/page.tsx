import React from 'react';
import Image from "next/image";

// import components.
import Nav from '@/components/Nav';
import Hero from '@/components/ui/Hero';
// import Footer from '@components/Footer';

import HeroImage from '@/public/images/hero/hero.png';

// metadata for the page.
export const metadata = {
  // company name | company description (max 10 words).
  title: '',
  // company description (2 sentences).
  description: '',
  alternates: {
    // current web url.
    canonical: 'https://www..com/'
  }
};

export default function Home() {
  return (
    <>
    <Nav />
    <main>
      <Hero 
        imagePath={HeroImage.src}
        title="Excellence and Trendsetting Style"
        text=" Milo brings award-winning skill to every client. Explore his work and book an appointment."
      />
    </main>
    {/* <Footer /> */}
    </>
  );
}