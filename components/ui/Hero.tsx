'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeroProps {
  imagePath: string;
  title: string;
  text: string;
}

export default function Hero({
  imagePath,
  title,
  text,
}: HeroProps) {
  return (
    <div className="relative h-screen">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src={imagePath}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="90vw"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl leading-tight drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl drop-shadow-md">
          {text}
        </p>
        <Link 
          href="#contact-form" 
          scroll={false} 
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById('contact-form');
            if (element) {
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - 100;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }}
        >
        </Link>
      </div>
    </div>
  );
}