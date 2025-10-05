'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import GridOverlay from '@/components/GridOverlay';
import Image from 'next/image';

export default function HomeContent() {
  const [showGrid, setShowGrid] = useState(false);
  
  // Get search params for grid overlay (development tool)
  const searchParams = useSearchParams();
  const gridParam = searchParams.get('grid');

  // Initialize grid state from URL parameter
  useEffect(() => {
    if (gridParam === '1') {
      setShowGrid(true);
    }
  }, [gridParam]);

  // Keyboard toggle for grid overlay (development tool)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'g' || event.key === 'G') {
        setShowGrid(!showGrid);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showGrid]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Development Grid Overlay */}
      {showGrid && <GridOverlay />}
      
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero.jpg" 
          alt="Architectural Hero Background"
          fill
          className="object-cover object-left"
          priority
          sizes="100vw"
          style={{
            objectPosition: 'left center'
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Header Navigation */}
      <Header />
      
      {/* Main Content Area */}
      <main className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            {/* Hero content can be added here if needed */}
            {/* For now, the visual impact comes from the background image and navigation */}
          </div>
        </section>
      </main>
    </div>
  );
}
