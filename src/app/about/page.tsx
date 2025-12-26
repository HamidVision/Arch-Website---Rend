'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/Header';

const AboutPage: React.FC = () => {
  const [layout, setLayout] = useState({
    imageAW: 0,
    imageALeft: 0,
    imageBW: 0,
    imageBLeft: 0,
    slideOffsetLeft: 0,
    slideOffsetRight: 0,
    screenWidth: 0,
    screenHeight: 0,
    isReady: false
  });

  const [isSliding, setIsSliding] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const calculateLayout = () => {
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      
      // Original Design Reference Dimensions (to maintain exact positioning)
      const REF_IMG1_W = 4107;
      const REF_IMG2_W = 2025;
      const REF_COMBO_W = 4417; // Target total combo width with overlap
      const ORIGINAL_H = 6520;

      // New Merged Image Dimensions (Updated based on user extension)
      const NEW_IMG_A_W = 12000; 
      const NEW_IMG_B_W = 11000; 
      
      // Calculate scale factor to fit screen height
      const scale = screenHeight / ORIGINAL_H;
      
      // Calculate Scaled Reference Dimensions
      const scaledRefImg1W = REF_IMG1_W * scale;
      const scaledRefImg2W = REF_IMG2_W * scale;
      const scaledRefComboW = REF_COMBO_W * scale;
      
      // Calculate Scaled New Dimensions
      const scaledImgAW = NEW_IMG_A_W * scale;
      const scaledImgBW = NEW_IMG_B_W * scale;

      // Calculate Overlap (based on reference to maintain visual center blend)
      const overlap = (scaledRefImg1W + scaledRefImg2W) - scaledRefComboW;
      
      // Calculate Center Position (based on reference Combo)
      const comboLeft = (screenWidth - scaledRefComboW) / 2;
      
      // === LAYOUT LOGIC ===
      
      // Image A (Left Side):
      const anchorRightX = comboLeft + scaledRefImg1W;
      const imageALeft = anchorRightX - scaledImgAW;

      // Image B (Right Side):
      const imageBLeft = comboLeft + scaledRefImg1W - overlap;

      // Animation Offsets - Mobile needs extra offset to fully exit screen
      const isMobileView = screenWidth < 640;
      
      // For mobile: slide images completely off screen
      // For larger screens: use calculated offsets
      let slideOffsetLeft = -comboLeft;
      let slideOffsetRight = screenWidth - (imageBLeft + scaledRefImg2W);
      
      if (isMobileView) {
        // On mobile, ensure images slide fully off screen
        // Image A needs to slide left until its right edge is off screen
        slideOffsetLeft = -(imageALeft + scaledImgAW + 50); // Extra 50px buffer
        // Image B needs to slide right until its left edge is off screen  
        slideOffsetRight = screenWidth - imageBLeft + 50; // Extra 50px buffer
      }

      setLayout({
        imageAW: scaledImgAW,
        imageALeft: imageALeft,
        imageBW: scaledImgBW,
        imageBLeft: imageBLeft,
        slideOffsetLeft: slideOffsetLeft,
        slideOffsetRight: slideOffsetRight,
        screenWidth: screenWidth,
        screenHeight: screenHeight,
        isReady: true
      });
    };

    calculateLayout();
    window.addEventListener('resize', calculateLayout);
    return () => window.removeEventListener('resize', calculateLayout);
  }, []);

  // Animation Sequence
  useEffect(() => {
    if (!layout.isReady) return;

    const timer = setTimeout(() => {
        setIsSliding(true);
        
        // Show content after sliding animation completes
        const contentTimer = setTimeout(() => {
          setShowContent(true);
        }, 2000); // 2s match transition duration
        
        return () => clearTimeout(contentTimer);
    }, 3000); // Start animation after 3 seconds

    return () => clearTimeout(timer);
  }, [layout.isReady]);

  if (!layout.isReady) return <div className="h-screen bg-white" />;

  // Determine responsive breakpoints
  const isMobile = layout.screenWidth < 640;
  const isTablet = layout.screenWidth >= 640 && layout.screenWidth < 1024;
  const isLaptop = layout.screenWidth >= 1024 && layout.screenWidth < 1440;
  const isFullHD = layout.screenWidth >= 1440 && layout.screenWidth < 2200;
  const isUltrawide = layout.screenWidth >= 2200; // True ultrawide monitors

  // Responsive sizing calculations
  const getPortraitSize = () => {
    if (isMobile) return { width: 100, height: 125 };
    if (isTablet) return { width: 130, height: 160 };
    if (isLaptop) return { width: 160, height: 200 };
    if (isFullHD) return { width: 180, height: 225 };
    return { width: 200, height: 250 }; // Ultrawide
  };

  const getTextBoxWidth = () => {
    if (isMobile) return '90vw';
    if (isTablet) return '75vw';
    if (isLaptop) return '45vw';
    if (isFullHD) return '40vw';
    return '550px'; // Ultrawide
  };

  const getTextBoxMaxWidth = () => {
    if (isMobile) return '360px';
    if (isTablet) return '500px';
    if (isLaptop) return '520px';
    if (isFullHD) return '540px';
    return '550px';
  };

  const portraitSize = getPortraitSize();

  return (
    <div className="h-screen bg-white text-black overflow-hidden relative">
      {/* Header - Changes to dark on mobile after slide animation */}
      <Header 
        forceSolid={true} 
        backgroundClass="bg-white/0" 
        textColorClass={isMobile && isSliding ? 'text-black' : 'text-white'} 
        logoVariant={isMobile && isSliding ? 'dark' : 'light'} 
      />
      
      <main className="relative h-full w-full">
        
        {/* Image A - Left Group (Slides Left) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isSliding ? layout.slideOffsetLeft : 0
          }}
          transition={{ 
            duration: 1.2, 
            ease: 'easeOut',
            x: { duration: 2, ease: 'easeInOut' } 
          }}
          className="absolute origin-right"
          style={{
            top: 0,
            left: layout.imageALeft,
            width: layout.imageAW,
            height: '100%',
            zIndex: 10
          }}
        >
          <Image 
            src="/about/about-me-A.webp"
            alt="About Me Left"
            width={12000}
            height={6520}
            className="w-full h-full object-contain"
            priority
          />
        </motion.div>

        {/* Image B - Right Group (Slides Right) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isSliding ? layout.slideOffsetRight : 0
          }}
          transition={{ 
            duration: 1.2, 
            delay: 0.1, 
            ease: 'easeOut',
            x: { duration: 2, ease: 'easeInOut' }
          }}
          className="absolute origin-left"
          style={{
            top: 0,
            left: layout.imageBLeft,
            width: layout.imageBW,
            height: '100%',
            zIndex: 20
          }}
        >
          <Image 
            src="/about/about-me-B.webp"
            alt="About Me Right"
            width={11000}
            height={6520}
            className="w-full h-full object-contain"
            priority
          />
        </motion.div>

        {/* Content Area - Responsive Layout */}
        {showContent && (
          <div className={`absolute inset-0 z-30 ${isMobile || isTablet ? 'overflow-y-auto' : 'overflow-hidden'}`}>
            
            {/* Scrollable Content Container for Mobile/Tablet */}
            <div className={`
              ${isMobile || isTablet 
                ? 'flex flex-col items-center px-4 py-20 gap-4 min-h-full' 
                : 'relative h-full w-full'
              }
            `}>
              
              {/* Portrait Image - Positioned to LEFT of text box 1 for non-mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className={isMobile || isTablet ? 'flex-shrink-0' : 'absolute'}
                style={isMobile || isTablet ? {} : {
                  top: '8%',
                  // Position to the left of the text box
                  right: isUltrawide 
                    ? `calc(18% + 550px + 20px)` // ultrawide: text box right + width + gap
                    : isFullHD
                      ? `calc(15% + 40vw + 15px)` // Full HD: text box right + width + gap
                      : isLaptop 
                        ? `calc(15% + 45vw + 15px)` // laptop: text box right + width + gap
                        : `calc(20% + 45vw + 10px)`, // HD: text box right + width + gap
                  zIndex: 35
                }}
              >
                <div 
                  className="relative rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    width: portraitSize.width,
                    height: portraitSize.height
                  }}
                >
                  <Image 
                    src="/about/portrait.jpg"
                    alt="Portrait"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Text Box 1 - With proper overflow containment */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
                className={`
                  bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-200 overflow-hidden
                  ${isMobile ? 'p-4' : 'p-5'}
                  ${isMobile || isTablet ? 'w-full' : 'absolute'}
                `}
                style={isMobile || isTablet ? {
                  maxWidth: getTextBoxMaxWidth()
                } : {
                  // Align with portrait top (8%) for all screens
                  top: '8%',
                  // Move text boxes more to the left (further from right edge)
                  right: isUltrawide ? '18%' : isFullHD ? '15%' : isLaptop ? '15%' : '20%',
                  width: getTextBoxWidth(),
                  maxWidth: getTextBoxMaxWidth(),
                  height: isUltrawide ? 'auto' : isLaptop ? '38vh' : '40vh',
                  maxHeight: isUltrawide ? '33vh' : '40vh',
                  zIndex: 34
                }}
              >
                <h2 className={`font-bold text-gray-800 mb-2 ${isMobile ? 'text-base' : isTablet ? 'text-lg' : isLaptop ? 'text-lg' : 'text-xl'}`}>
                  Crafting Intelligent Environments
                </h2>
                <div 
                  className={`text-gray-700 leading-relaxed space-y-2 overflow-y-auto ${isMobile ? 'text-[11px]' : isTablet ? 'text-xs' : 'text-xs'}`}
                  style={!isMobile && !isTablet ? { 
                    maxHeight: isUltrawide ? '25vh' : isLaptop ? 'calc(38vh - 60px)' : 'calc(40vh - 60px)',
                    paddingRight: '8px'
                  } : {}}
                >
                  <p>
                  Welcome. I am driven by the profound intersection of the built environment and the transformative power of advanced technology. My journey in architecture began with a deep appreciation for form, function, and human experience. This foundation was significantly expanded through my doctoral research, where I explored how cutting-edge computational methods can unveil the intricate dynamics of urban life.
                  </p>
                  <p>
                  At the University of Florida, my Ph.D. thesis, &quot;Pedestrian Behavior Analysis in Shared Open Spaces Implementing YOLOv8,&quot; delved into pioneering techniques for understanding human movement and interaction within designed spaces. This work, along with subsequent publications, laid the groundwork for my expertise in machine learning algorithms and computer vision, specifically applied to architectural contexts. It&apos;s here that the two pillars of my professional identity truly converged: the rigorous discipline of architectural practice with the innovative frontiers of artificial intelligence.
                  </p>
                  <p>
                  My commitment lies in leveraging these advanced analytical tools not merely for observation, but to inform and enrich the architectural design process itself. By translating complex data into actionable insights, I aim to create spaces that are not only aesthetically compelling but also intuitively responsive, highly efficient, and profoundly human-centric.
                  </p>
                </div>
              </motion.div>

              {/* Text Box 2 - With proper overflow containment */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
                className={`
                  bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-200 overflow-hidden
                  ${isMobile ? 'p-4' : 'p-5'}
                  ${isMobile || isTablet ? 'w-full' : 'absolute'}
                `}
                style={isMobile || isTablet ? {
                  maxWidth: getTextBoxMaxWidth()
                } : {
                  // Move up to match aligned text box 1, with gap below box 1
                  top: isUltrawide ? '48%' : isFullHD ? '52%' : isLaptop ? '50%' : '50%',
                  // Move text boxes more to the left (further from right edge)
                  right: isUltrawide ? '18%' : isFullHD ? '15%' : isLaptop ? '15%' : '20%',
                  width: getTextBoxWidth(),
                  maxWidth: getTextBoxMaxWidth(),
                  height: isUltrawide ? 'auto' : isLaptop ? '38vh' : '40vh',
                  maxHeight: isUltrawide ? '30vh' : '40vh',
                  zIndex: 34
                }}
              >
                <h2 className={`font-bold text-gray-800 mb-2 ${isMobile ? 'text-base' : isTablet ? 'text-lg' : isLaptop ? 'text-lg' : 'text-xl'}`}>
                  Bridging Design and Data for the Future of Architecture
                </h2>
                <div 
                  className={`text-gray-700 leading-relaxed space-y-2 overflow-y-auto ${isMobile ? 'text-[11px]' : isTablet ? 'text-xs' : 'text-xs'}`}
                  style={!isMobile && !isTablet ? { 
                    maxHeight: isUltrawide ? '22vh' : isLaptop ? 'calc(38vh - 60px)' : 'calc(40vh - 60px)',
                    paddingRight: '8px'
                  } : {}}
                >
                  <p>
                  My professional life has been a continuous exploration of how to bridge the gap between abstract computational models and the tangible realities of architectural design. While my research focused on developing sophisticated computer vision models like YOLOv8 to analyze pedestrian behavior, this wasn&apos;t a departure from architecture, but rather an evolution of my approach to it. I see these algorithms as powerful new lenses through which we can understand and optimize the spaces we inhabit.
                  </p>
                  <p>
                  My ambition is to redefine architectural practice by integrating intelligent systems that can predict, adapt, and learn from human interaction. This enables the creation of truly smart buildings and urban environments spaces that are not just aesthetically pleasing but are also optimized for human flow, comfort, and sustainability. I invite you to explore my work and discover how this synergistic approach can bring a new dimension of intelligence and innovation to your projects.
                  </p>
                </div>
              </motion.div>

              {/* Bottom padding for mobile scrolling */}
              {(isMobile || isTablet) && <div className="h-8 flex-shrink-0" />}
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default AboutPage;
