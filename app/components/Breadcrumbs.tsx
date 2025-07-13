'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Don't create breadcrumbs on homepage
  if (pathname === '/') {
    return null;
  }

  // Create breadcrumb segments from the URL
  const segments = pathname.split('/').filter(Boolean);

  // Map clean names for paths based on your barbering website structure
  const pathNames: Record<string, string> = {
    'services': 'Services',
    'booking': 'Book Appointment',
    'about': 'About Us',
    'contact': 'Contact Us',
    'booking-policy': 'Booking Policy',
    'privacy-policy': 'Privacy Policy',
    'cookie-policy': 'Cookie Policy',
    'gallery': 'Gallery',
    'reviews': 'Reviews',
    'team': 'Our Team',
    'location': 'Location',
    'prices': 'Pricing'
  };

  return (
    <nav
      aria-label="Breadcrumbs"
      className="py-4 px-4 bg-gray-50 border-b border-gray-200"
    >
      <ol className="flex items-center space-x-2 text-sm text-gray-600 max-w-6xl mx-auto">
        <li>
          <Link 
            href="/" 
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>
        {segments.map((segment, index) => {
          // Build path up to current segment
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          const displayName = pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={href} className="flex items-center">
              {isLast ? (
                <span className="text-gray-900 font-medium">{displayName}</span>
              ) : (
                <>
                  <Link 
                    href={href}
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    {displayName}
                  </Link>
                  <span className="mx-2 text-gray-400">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;