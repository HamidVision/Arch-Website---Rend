'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useLogoNavigation } from '@/hooks/useLogoNavigation';
import NavigationMenu from '@/components/NavigationMenu';
import Header from '@/components/Header';

const HELoadingComponent = dynamic(() => import('@/components/HE_Loading_Component'), { ssr: false });

export default function BorderCrossingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { showLoading, handleLogoClick } = useLogoNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add state
  const router = useRouter();

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
    <div className="relative h-screen overflow-hidden bg-white">
      <main className="relative h-screen overflow-hidden bg-white">
        {/* Header with dark icons for light background */}
        <Header textColorClass="text-black" logoVariant="dark" />
        
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
      {showLoading && (
        <div className="fixed inset-0 z-[9999]">
          <HELoadingComponent
            variant="splash"
            timeoutMs={2000}
            logoUrl="/brand/logo-loading.svg"
            subtitle="Architecture & Design Studio"
            tagline="Creating spaces that inspire"
          />
        </div>
      )}
    </div>
  );
}