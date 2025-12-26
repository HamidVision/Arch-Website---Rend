'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLogoNavigation } from '@/hooks/useLogoNavigation';
import NavigationMenu from '@/components/NavigationMenu';
import Header from '@/components/Header';
import HorizontalScrollIndicator from '@/components/HorizontalScrollIndicator';

const HELoadingComponent = dynamic(() => import('@/components/HE_Loading_Component'), { ssr: false });

export default function BorderCrossingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { showLoading, handleLogoClick } = useLogoNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const hasScrolledRef = useRef(false);
  const router = useRouter();

  // Set mounted state after hydration to prevent flash
  useEffect(() => {
    // Small delay to ensure everything is ready
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Handle mouse wheel scrolling for horizontal movement
  useEffect(() => {
    if (!isMounted) return; // Wait for mount

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (containerRef.current) {
        // Convert vertical scroll to horizontal scroll
        containerRef.current.scrollLeft += e.deltaY;

        // Hide indicator on first scroll
        if (!hasScrolledRef.current) {
          hasScrolledRef.current = true;
          setShowScrollIndicator(false);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [isMounted]);

  // Show indicator after initial animation
  const onAnimationComplete = () => {
    if (!hasScrolledRef.current) {
      setTimeout(() => setShowScrollIndicator(true), 500);
    }
  };



  return (
    <div className="relative h-screen overflow-hidden bg-white">
      <AnimatePresence>
        {isMounted ? (
          <motion.main 
            className="relative h-screen overflow-hidden bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={onAnimationComplete}
          >
            {/* Header with dark icons for light background */}
            <Header textColorClass="text-black" logoVariant="dark" />
            
            {/* Scroll Indicator */}
            <HorizontalScrollIndicator show={showScrollIndicator} />
            
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
                  
                  {/* Text Box Overlay - The Journey section */}
                  <div 
                    className="absolute z-50"
                    style={{
                      top: '22%',
                      left: '62%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'transparent',
                      backdropFilter: 'none',
                      WebkitBackdropFilter: 'none',
                      border: 'none',
                      padding: 'clamp(1rem, 2vw, 1.5rem)',
                      borderRadius: '0px',
                      boxShadow: 'none',
                      maxWidth: 'min(90vw, 420px)',
                      width: 'auto',
                      maxHeight: '35vh',
                      overflow: 'hidden'
                    }}>
                    <h1 style={{
                      fontSize: 'clamp(1.25rem, 2vw, 2rem)',
                      fontWeight: '700',
                      marginBottom: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                      letterSpacing: '0.05em',
                      color: '#1f2937',
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                    }}>
                      The Journey
                    </h1>
                    <p style={{
                      fontSize: 'clamp(0.75rem, 0.9vw, 1.1rem)',
                      lineHeight: '1.5',
                      color: '#374151',
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontWeight: '300',
                      margin: '0'
                    }}>
                      Based on the provided architectural drawings, the project titled "TRANSLUCENT BORDERCROSSING" is a proposal for a new border crossing facility located in Sydney, Canada. The project's main objective is to reconceptualize the international border experience by making it feel more transparent and pleasant. To achieve this, the design proposes the creation of four border crossing stations that are integrated into a ferry route connecting the United States and Canada, shifting the point of entry from a land-based checkpoint to a more integrated, experiential journey.
                    </p>
                  </div>
                  
                  {/* Main Title - TRANSLUCENT BORDERCROSSING - positioned to avoid header */}
                  <div 
                    className="absolute z-50"
                    style={{
                      top: '15%',
                      left: '10%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'transparent',
                      backdropFilter: 'none',
                      WebkitBackdropFilter: 'none',
                      border: 'none',
                      padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                      borderRadius: '0px',
                      boxShadow: 'none',
                      maxWidth: 'min(85vw, 400px)',
                      width: 'auto'
                    }}>
                    <h1 style={{
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      fontWeight: '700',
                      marginBottom: '0',
                      letterSpacing: '0.05em',
                      color: '#1f2937',
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
                    }}>
                      TRANSLUCENT BORDERCROSSING
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </motion.main>
        ) : null}
      </AnimatePresence>
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