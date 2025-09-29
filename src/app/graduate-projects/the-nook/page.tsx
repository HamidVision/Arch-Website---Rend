'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const NookPage: React.FC = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentBox2Ref = useRef<HTMLDivElement>(null);
  const [isRenderImage, setIsRenderImage] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBackClick = () => {
    router.push('/graduate-projects');
  };

  const handlePortfolioClick = () => {
    router.push('/graduate-projects');
  };

  const handleImageClick = () => {
    setIsRenderImage(!isRenderImage);
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
        {/* Custom Header matching momentum-hub page */}
        <button
          onClick={handleBackClick}
          className="fixed top-8 left-8 hover:opacity-75 transition-opacity z-[100] bg-transparent border-none outline-none cursor-pointer"
          aria-label="Go back to graduate projects"
        >
          <div className="relative h-6 w-6 overflow-visible flex items-center justify-center">
            <Image
              src="/icons/ui/logo-header.svg"
              alt="Architecture Portfolio Logo"
              fill
              className="object-contain pointer-events-none transform-gpu origin-center scale-[3] will-change-transform"
              priority
            />
          </div>
        </button>
        
        {/* Portfolio and Menu Buttons */}
        <div className="fixed top-6 right-6 z-[100]">
          <div className="flex items-center space-x-6">
            {/* Portfolio Button */}
            <button
              onClick={handlePortfolioClick}
              className="focus:outline-none"
              aria-label="Go to portfolio"
              title="Go to portfolio"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="6" height="6" rx="1" stroke="black" strokeWidth="1.5"/>
                <rect x="14" y="4" width="6" height="6" rx="1" stroke="black" strokeWidth="1.5"/>
                <rect x="14" y="14" width="6" height="6" rx="1" stroke="black" strokeWidth="1.5"/>
                <rect x="4" y="14" width="6" height="6" rx="1" stroke="black" strokeWidth="1.5"/>
              </svg>
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative h-6 w-8 focus:outline-none"
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
                <span className="absolute block h-0.5 w-6 transform bg-black transition duration-300 ease-in-out -translate-y-1"></span>
                <span className="absolute block h-0.5 w-6 transform bg-black transition duration-300 ease-in-out translate-y-1"></span>
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
            {/* Background Image Section */}
            <div className="h-screen flex-shrink-0 relative" style={{ width: 'max-content' }}>
               <Image
                 src="/graduate-projects/nook/nook-hero.jpg"
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
               />

               {/* Content Box 1 - Text Overlay */}
               <div className="absolute z-40 bg-white/0  p-6 rounded-lg" style={{
                 top: '8%',
                 left: '49%',
                 width: '850px',
                 height: '200px'
               }}>
                 <h2 className="text-2xl font-bold text-gray-800 mb-3">Background</h2>
                 <p className="text-sm text-gray-600 typewriter-cursor">
                 {typewriterText}
                 </p>
               </div>

               {/* Content Box 2 - Image Overlay */}
               <div 
                 ref={contentBox2Ref}
                 className="absolute z-40" 
                 style={{
                   top: '33.3%',
                   left: '49.1%',
                   width: '830px',
                   height: '525px',
                   backgroundColor: 'transparent',
                   background: 'none',
                   border: 'none',
                   outline: 'none'
                 }}
               >
                 {/* Drawing Image */}
                 <Image
                   src="/graduate-projects/the-nook/nook-drawing.png"
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
                   src="/graduate-projects/the-nook/nook-render.png"
                   alt="The Nook Render"
                   width={870}
                   height={555}
                   className={`w-full h-full object-cover clickable-image image-transition absolute top-0 left-0 ${isRenderImage ? 'opacity-100' : 'opacity-0'}`}
                   onClick={handleImageClick}
                   unoptimized={true}
                   quality={100}
                 />
               </div>

               {/* Content Box 3 - Text Overlay */}
               <div className="absolute z-40 bg-white/0  p-6 rounded-lg" style={{
                 top: '27%',
                 left: '73.5%',
                 width: '280px',
                 height: '160px'
               }}>
                 <h2 className="text-2xl font-bold text-gray-800 mb-3">Design Strategies</h2>
                 <p className="text-sm text-gray-600">
                 Facilitating cross ventilation by placing openings on opposite sides of the building with larg openings facing up wind.
                 </p>
               </div>

               {/* Content Box 4 - Text Overlay (No Title) */}
               <div className="absolute z-40 bg-white/0  p-6 rounded-lg" style={{
                 top: '30.5%',
                 left: '81%',
                 width: '300px',
                 height: '200px'
               }}>
                 <p className="text-sm text-gray-600">
                 Strategically placing glazing, optimizing heat gain, and inviting adequate sun light.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/75 z-[65] flex items-center justify-center">
          <nav className="text-center">
            <ul className="space-y-8 text-white">
              <li><a href="/" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="/undergrad-projects" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Undergrad Projects</a></li>
              <li><a href="/graduate-projects" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Graduate Projects</a></li>
              <li><a href="/about" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a></li>
              <li><a href="/contact" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NookPage;
