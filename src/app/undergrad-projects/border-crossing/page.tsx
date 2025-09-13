'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function BorderCrossingPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse wheel scrolling for horizontal movement
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (containerRef.current) {
        // Convert vertical scroll to horizontal scroll
        containerRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <main className="relative h-screen overflow-hidden bg-black">
        {/* Custom Header matching undergrad-projects page */}
        <button
          onClick={() => window.history.back()}
          className="fixed top-8 left-8 text-2xl font-semibold tracking-wide text-white hover:text-gray-300 transition-colors z-[100] bg-transparent border-none outline-none cursor-pointer"
          aria-label="Go to homepage"
        >
          HE
        </button>
        
        {/* Portfolio and Menu Buttons */}
        <div className="fixed top-6 right-6 z-[100]">
          <div className="flex items-center space-x-6">
            {/* Portfolio Button */}
            <button
              onClick={() => window.location.href = '/'}
              className="focus:outline-none"
              aria-label="Go to portfolio"
              title="Go to portfolio"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
                <rect x="14" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
                <rect x="14" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
                <rect x="4" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              </svg>
            </button>

            {/* Menu Button */}
            <button
              className="relative h-6 w-8 focus:outline-none"
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
                <span className="absolute block h-0.5 w-6 transform bg-white transition duration-300 ease-in-out -translate-y-1"></span>
                <span className="absolute block h-0.5 w-6 transform bg-white transition duration-300 ease-in-out translate-y-1"></span>
              </div>
            </button>
          </div>
        </div>
        
      {/* Main Content Container with horizontal scrolling */}
      <div 
        ref={containerRef}
        className="h-screen w-full overflow-x-auto overflow-y-hidden"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="h-full w-max flex">
          {/* Hero Image Section */}
          <div className="h-screen flex-shrink-0 relative" style={{ width: 'max-content' }}>
             <Image
               src="/undergrad-projects/border-crossing/border-crossing-hero.jpg"
               alt="Border Crossing - Translucent Border Crossing"
               width={0}
               height={0}
               sizes="100vw"
               className="h-screen w-auto object-contain"
               style={{
                 width: 'auto',
                 height: '100vh'
               }}
               priority
               unoptimized={true}
               quality={100}
             />
             
             {/* Text Box Overlay - positioned in middle for dev modification */}
             <div 
               className="absolute z-50"
               style={{
                 top: '20%',
                 left: '62%',
                 transform: 'translate(-50%, -50%)',
                 backgroundColor: 'transparent',
                 backdropFilter: 'none',
                 WebkitBackdropFilter: 'none',
                 border: 'none',
                 padding: '2rem',
                 borderRadius: '0px',
                 boxShadow: 'none',
                 maxWidth: '600px',
                 width: '90vw'
               }}>
               <h1 style={{
                 fontSize: '2.0rem',
                 fontWeight: '700',
                 marginBottom: '1rem',
                 letterSpacing: '0.05em',
                 color: '#1f2937',
                 fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
               }}>
                 The Journey
               </h1>
               <p style={{
                 fontSize: '1.2rem',
                 lineHeight: '1.6',
                 color: '#374151',
                 fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                 fontWeight: '300',
                 margin: '0'
               }}>
                 Based on the provided architectural drawings, the project titled "TRANSLUCENT BORDERCROSSING" is a proposal for a new border crossing facility located in Sydney, Canada. The project's main objective is to reconceptualize the international border experience by making it feel more transparent and pleasant. To achieve this, the design proposes the creation of four border crossing stations that are integrated into a ferry route connecting the United States and Canada, shifting the point of entry from a land-based checkpoint to a more integrated, experiential journey.
               </p>
             </div>
             
             {/* Second Text Box Overlay - positioned for dev modification */}
             <div 
               className="absolute z-50"
               style={{
                 top: '11%',
                 left: '10%',
                 transform: 'translate(-50%, -50%)',
                 backgroundColor: 'transparent',
                 backdropFilter: 'none',
                 WebkitBackdropFilter: 'none',
                 border: 'none',
                 padding: '2rem',
                 borderRadius: '0px',
                 boxShadow: 'none',
                 maxWidth: '600px',
                 width: '90vw'
               }}>
               <h1 style={{
                 fontSize: '2.5rem',
                 fontWeight: '700',
                 marginBottom: '1rem',
                 letterSpacing: '0.05em',
                 color: '#1f2937',
                 fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
               }}>
                 TRANSLUCENT BORDERCROSSING
               </h1>
               <p style={{
                 fontSize: '2.1rem',
                 lineHeight: '1.6',
                 color: '#374151',
                 fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                 fontWeight: '300',
                 margin: '0'
               }}>
                 
               </p>
             </div>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}