'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogoNavigation } from '@/hooks/useLogoNavigation';
import NavigationMenu from '@/components/NavigationMenu';
import Header from '@/components/Header';

const HELoadingComponent = dynamic(() => import('@/components/HE_Loading_Component'), { ssr: false });

const NookPage: React.FC = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentBox2Ref = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  
  const [isRenderImage, setIsRenderImage] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mobile detection and overlay state
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);
  const [activeImage, setActiveImage] = useState(1);
  
  // Image bounds for JavaScript-calculated positioning (desktop)
  const [imageBounds, setImageBounds] = useState({ left: 0, top: 0, width: 0, height: 0 });
  
  // Use standardized logo navigation hook
  const { showLoading, handleLogoClick } = useLogoNavigation();

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate image bounds for positioned overlays (desktop only)
  useEffect(() => {
    if (isMobile) return;
    
    const updateImageBounds = () => {
      if (heroImageRef.current) {
        const rect = heroImageRef.current.getBoundingClientRect();
        setImageBounds({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
      }
    };
    
    updateImageBounds();
    window.addEventListener('resize', updateImageBounds);
    window.addEventListener('scroll', updateImageBounds);
    return () => {
      window.removeEventListener('resize', updateImageBounds);
      window.removeEventListener('scroll', updateImageBounds);
    };
  }, [isMobile]);

  const handlePortfolioClick = () => {
    router.push('/graduate-projects');
  };

  const handleImageClick = () => {
    setIsRenderImage(!isRenderImage);
  };

  // Ken Burns animation variants for mobile - wider panning to show more of image
  const mobileKenBurnsVariants = {
    animate: {
      x: ['-35%', '0%', '-35%'],
      scale: [1.15, 1.2, 1.15],
      transition: {
        x: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 25, repeat: Infinity, ease: 'easeInOut' }
      }
    }
  };

  // Typewriter animation for Content Box 1
  useEffect(() => {
    const fullText = `"The Nook" is a Detached Accessory Dwelling Unit (DADU) designed with a profound social mission: to provide transitional housing for individuals experiencing homelessness and reintegrating into society. Situated in the backyard of a residential property, the project's design is deeply respectful of its natural context. As shown in the site plans and sections, the structure is thoughtfully embedded into the existing sloped terrain, a strategy that minimizes land disturbance and preserves the surrounding landscape. The dwelling combines a modern aesthetic, characterized by clean lines and an expansive glass facade for natural light, with a strong commitment to sustainability. By integrating passive design strategies like natural ventilation and solar shading, the project aims to achieve net-zero energy performance, ultimately creating a home that is not only environmentally responsible but also provides a dignified, stable, and restorative space for its residents.`;
    
    let currentIndex = 0;
    const typeSpeed = 30; // milliseconds per character
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, typeSpeed);

    return () => clearInterval(typeInterval);
  }, []);

  // Add CSS keyframes for pulse animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-glow {
        0% {
          box-shadow: 0 0 15px rgba(238, 125, 48, 0.6);
        }
        25% {
          box-shadow: 0 0 25px rgba(255, 154, 86, 0.8);
        }
        50% {
          box-shadow: 0 0 35px rgba(255, 154, 86, 1);
        }
        75% {
          box-shadow: 0 0 25px rgba(255, 154, 86, 0.8);
        }
        100% {
          box-shadow: 0 0 15px rgba(238, 125, 48, 0.6);
        }
      }
      
      .image-transition {
        transition: opacity 0.5s ease-in-out;
      }
      
      .clickable-image {
        cursor: pointer;
      }
      
      .typewriter-cursor::after {
        content: '|';
        animation: blink 1s infinite;
        color: #ee7d30;
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Scroll-triggered animation for content box images with automatic glow hints
  useEffect(() => {
    if (!containerRef.current) return;

    // Track which images have been animated and their glow timers
    const animatedImages = new Set();
    const glowTimers = new Map();

    // Custom scroll handler for horizontal scrolling
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const maxScroll = container.scrollWidth - containerWidth;
      
      // Avoid division by zero
      const scrollProgress = maxScroll > 0 ? scrollLeft / maxScroll : 0;

      // Content Box 2 glow animation
      if (contentBox2Ref.current && scrollProgress >= 0.1) {
        const ref = contentBox2Ref.current;
        
        if (!animatedImages.has(ref)) {
          animatedImages.add(ref);
          
          // Start glow animation immediately
          if (ref) {
            ref.style.animation = 'pulse-glow 2s ease-in-out infinite';
          }
        }
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      // Clear all glow timers on cleanup
      glowTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Handle horizontal scrolling with mouse wheel
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
        {/* Header with dark icons for light background */}
        <Header textColorClass="text-black" logoVariant="dark" />
        
        {/* Main Content Container with horizontal scrolling */}
        <div 
          ref={containerRef}
          className="h-screen w-full overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="h-full w-max flex">
            {/* Background Image Section */}
            <div className="h-screen flex-shrink-0 relative" style={{ width: 'max-content' }}>
               {/* Hero Image - conditional mobile/desktop */}
               <Image
                 ref={heroImageRef as React.RefObject<HTMLImageElement>}
                 src={isMobile ? "/graduate-projects/nook/nook-hero-mobile.jpg" : "/graduate-projects/nook/nook-hero.jpg"}
                 alt="The Nook - Main View"
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
                 onLoad={() => {
                   // Trigger bounds recalculation after image loads
                   if (heroImageRef.current && !isMobile) {
                     const rect = heroImageRef.current.getBoundingClientRect();
                     setImageBounds({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
                   }
                 }}
               />

               {/* Desktop Content - Only show when not mobile AND image bounds are calculated */}
               {!isMobile && imageBounds.width > 0 && (
                 <>
                   {/* Content Box 1 - Text Overlay */}
                   <div 
                     className="absolute z-40 bg-white/0 p-4 md:p-6 rounded-lg" 
                     style={{
                       top: `${imageBounds.height * 0.08}px`,
                       left: `${imageBounds.width * 0.49}px`,
                       width: `${imageBounds.width * 0.19}px`,
                       maxHeight: `${imageBounds.height * 0.22}px`,
                       overflow: 'hidden'
                     }}
                   >
                     <h2 style={{ 
                       fontSize: `${Math.max(12, imageBounds.width * 0.007)}px`,
                       fontWeight: '700',
                       color: '#1f2937',
                       marginBottom: '0.2rem',
                       lineHeight: '1.2'
                     }}>Background</h2>
                     <p style={{
                       fontSize: `${Math.max(6, imageBounds.width * 0.0033)}px`,
                       color: '#4b5563',
                       lineHeight: '1.35'
                     }} className="typewriter-cursor">
                       {typewriterText}
                     </p>
                   </div>

                   {/* Content Box 2 - Image Overlay */}
                   <div 
                     ref={contentBox2Ref}
                     className="absolute z-40" 
                     style={{
                       top: `${imageBounds.height * 0.350}px`,
                       left: `${imageBounds.width * 0.491}px`,
                       width: `${imageBounds.width * 0.1875}px`,
                       height: 'auto',
                       maxHeight: `${imageBounds.height * 0.58}px`,
                       backgroundColor: 'transparent',
                       background: 'none',
                       border: 'none',
                       outline: 'none'
                     }}
                   >
                     {/* Drawing Image */}
                     <Image
                       src="/graduate-projects/the-nook/nook-drawing.jpg"
                       alt="The Nook Drawing"
                       width={870}
                       height={555}
                       className={`w-full h-full object-cover clickable-image image-transition ${isRenderImage ? 'opacity-0' : 'opacity-100'}`}
                       onClick={handleImageClick}
                       unoptimized={true}
                       quality={100}
                     />
                     
                     {/* Render Image */}
                     <Image
                       src="/graduate-projects/the-nook/nook-render.jpg"
                       alt="The Nook Render"
                       width={870}
                       height={555}
                       className={`w-full h-full object-cover clickable-image image-transition absolute top-0 left-0 ${isRenderImage ? 'opacity-100' : 'opacity-0'}`}
                       onClick={handleImageClick}
                       unoptimized={true}
                       quality={100}
                     />
                   </div>

                   {/* Content Box 3 - Design Strategies */}
                   <div 
                     className="absolute z-40 bg-white/0 p-4 rounded-lg" 
                     style={{
                       top: `${imageBounds.height * 0.27}px`,
                       left: `${imageBounds.width * 0.735}px`,
                       width: `${imageBounds.width * 0.10}px`,
                       height: 'auto'
                     }}
                   >
                     <h2 style={{ 
                       fontSize: `${Math.max(12, imageBounds.width * 0.01)}px`,
                       fontWeight: '700',
                       color: '#1f2937',
                       marginBottom: '0.5rem'
                     }}>Design Strategies</h2>
                     <p style={{
                       fontSize: `${Math.max(9, imageBounds.width * 0.006)}px`,
                       color: '#4b5563',
                       lineHeight: '1.4'
                     }}>
                       Facilitating cross ventilation by placing openings on opposite sides of the building with large openings facing up wind.
                     </p>
                   </div>

                   {/* Content Box 4 - Additional Text */}
                   <div 
                     className="absolute z-40 bg-white/0 p-4 rounded-lg" 
                     style={{
                       top: `${imageBounds.height * 0.305}px`,
                       left: `${imageBounds.width * 0.81}px`,
                       width: `${imageBounds.width * 0.10}px`,
                       height: 'auto'
                     }}
                   >
                     <p style={{
                       fontSize: `${Math.max(9, imageBounds.width * 0.006)}px`,
                       color: '#4b5563',
                       lineHeight: '1.4'
                     }}>
                       Strategically placing glazing, optimizing heat gain, and inviting adequate sun light.
                     </p>
                   </div>
                 </>
               )}

               {/* Mobile "Click to Explore" Button */}
               {isMobile && (
                 <button
                   onClick={() => setShowMobileOverlay(true)}
                   className="absolute z-40 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-lg"
                   style={{
                     top: '18.5%',
                     left: '59.3%',
                     transform: 'translate(-50%, -50%)',
                     fontSize: '1rem'
                   }}
                 >
                   Click to Explore
                 </button>
               )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Ken Burns Full-Screen Overlay */}
      <AnimatePresence>
        {isMobile && showMobileOverlay && (
          <motion.div
            key="mobile-ken-burns-overlay"
            className="fixed inset-0 z-50 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Ken Burns Animated Image */}
            <motion.div
              className="absolute inset-0 w-[200%] h-full overflow-hidden"
              variants={mobileKenBurnsVariants}
              animate="animate"
            >
              <Image
                src={activeImage === 1 ? "/graduate-projects/the-nook/nook-drawing.jpg" : "/graduate-projects/the-nook/nook-render.jpg"}
                alt={activeImage === 1 ? "The Nook Drawing" : "The Nook Render"}
                fill
                className="object-cover"
                priority
                unoptimized={true}
                quality={100}
              />
            </motion.div>

            {/* Header - stays visible on top */}
            <div className="absolute top-0 left-0 right-0 z-60">
              <Header textColorClass="text-white" logoVariant="light" />
            </div>

            {/* Two Buttons on Left Side */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-60">
              {[1, 2].map((num) => (
                <button
                  key={num}
                  onClick={() => setActiveImage(num)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    activeImage === num 
                      ? 'bg-orange-500 text-white border-2 border-white' 
                      : 'bg-white/20 text-white border border-white/50 backdrop-blur-sm'
                  }`}
                  style={{
                    fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                  }}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Typewriter Text at Bottom - Same for both images */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-60 bg-black/70 backdrop-blur-sm px-4 py-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ maxHeight: '30vh', overflow: 'auto' }}
            >
              <p style={{
                fontSize: '0.85rem',
                color: 'white',
                lineHeight: '1.6',
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
              }}>
                "The Nook" is a Detached Accessory Dwelling Unit (DADU) designed with a profound social mission: to provide transitional housing for individuals experiencing homelessness and reintegrating into society. The dwelling combines a modern aesthetic with a strong commitment to sustainability.
              </p>
            </motion.div>

            {/* Back Button */}
            <button
              onClick={() => setShowMobileOverlay(false)}
              className="absolute top-20 right-4 z-60 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg border border-white/30"
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: '0.9rem'
              }}
            >
              ← Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Loading Overlay */}
      {showLoading && (
        <div className="fixed inset-0 z-[9999]">
          <HELoadingComponent
            variant="splash"
            timeoutMs={2000}
            logoUrl="/brand/logo-loading.png"
            subtitle="Architecture & Design Studio"
            tagline="Creating spaces that inspire"
          />
        </div>
      )}
    </div>
  );
};

export default NookPage;
