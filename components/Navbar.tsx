'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-primary/20 shadow-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 portal-glow rounded-full overflow-hidden">
            <Image 
              src="/globe.svg" 
              alt="Rick and Morty Explorer Logo" 
              width={40} 
              height={40}
              className="p-1 bg-primary/10 rounded-full"
            />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Rick and Morty Explorer
          </h1>
        </div>
        <div className="md:flex items-center gap-6 hidden mr-4">
          <Link 
            href="/" 
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-primary/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </Link>
          <Link 
            href="https://rickandmortyapi.com/" 
            target="_blank" 
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-primary/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            API
          </Link>
        </div>
      </div>
    </nav>
  );
}