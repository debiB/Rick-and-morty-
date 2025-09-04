'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image 
            src="/globe.svg" 
            alt="Rick and Morty Explorer Logo" 
            width={32} 
            height={32} 
          />
          <h1 className="text-xl font-bold">Rick and Morty Explorer</h1>
        </div>
        <div className="md:flex items-center gap-8 hidden mr-8">
          <Link href="/" className="text-sm hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="https://rickandmortyapi.com/" target="_blank" className="text-sm hover:text-primary transition-colors">
            API
          </Link>
        </div>
      </div>
    </nav>
  );
}