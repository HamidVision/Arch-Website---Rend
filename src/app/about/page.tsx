'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/Header';

const AboutPage: React.FC = () => {
  const [imageDimensions, setImageDimensions] = useState({
    image1Width: 0,
    image2Width: 0,
    comboWidth: 0,
    comboLeft: 0,
    overlapAmount: 0,
    image3Width: 0,
    image3Left: 0,
    image4Width: 0,
    image4Left: 0
  });

  const [isSliding, setIsSliding] = useState(false);
  const [slideOffsetLeft, setSlideOffsetLeft] = useState(0);
  const [slideOffsetRight, setSlideOffsetRight] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const calculateDimensions = () => {
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      
      // Image dimensions in pixels
      const image1WidthPx = 4107;
      const image1HeightPx = 6520;
      const image2WidthPx = 2025;
      const image2HeightPx = 6520;
      const image3WidthPx = 8000; // about-me-3.png width (designed to be larger than screen)
      const image3HeightPx = 6520; // Same height as other images
      const image4WidthPx = 8000; // about-me-4.png width (designed to be larger than screen)
      const image4HeightPx = 6520; // Same height as other images
      const targetComboWidthPx = 4417; // Target total combo width with overlap
      
      // Calculate scale factor to fit screen height
      const scale = screenHeight / image1HeightPx; // Both images have same height
      
      // Calculate scaled widths
      const scaledImage1Width = image1WidthPx * scale;
      const scaledImage2Width = image2WidthPx * scale;
      const scaledImage3Width = image3WidthPx * scale;
      const scaledImage4Width = image4WidthPx * scale;
      const scaledTargetComboWidth = targetComboWidthPx * scale;
      
      // Calculate overlap amount
      const overlapAmount = (scaledImage1Width + scaledImage2Width) - scaledTargetComboWidth;
      
      // Calculate position to center the combo
      const comboLeft = (screenWidth - scaledTargetComboWidth) / 2;
      
      // Calculate Image 3 position (to the left of combo, right edge flush with Image 1's left edge)
      const image3Left = comboLeft - scaledImage3Width;
      
      // Calculate Image 3 width (crop if extends beyond left edge of screen)
      const maxImage3Width = Math.min(scaledImage3Width, comboLeft);
      const image3DisplayWidth = maxImage3Width;
      const image3AdjustedLeft = comboLeft - image3DisplayWidth;
      
      // Calculate Image 4 position (to the right of combo, left edge flush with Image 2's right edge)
      const image2RightEdge = comboLeft + scaledImage1Width - overlapAmount + scaledImage2Width;
      const image4Left = image2RightEdge;
      
      // Calculate Image 4 width (crop if extends beyond right edge of screen)
      const remainingScreenWidthRight = screenWidth - image4Left;
      const maxImage4Width = Math.min(scaledImage4Width, remainingScreenWidthRight);
      const image4DisplayWidth = maxImage4Width;
      
      setImageDimensions({
        image1Width: scaledImage1Width,
        image2Width: scaledImage2Width,
        comboWidth: scaledTargetComboWidth,
        comboLeft: comboLeft,
        overlapAmount: overlapAmount,
        image3Width: image3DisplayWidth,
        image3Left: image3AdjustedLeft,
        image4Width: image4DisplayWidth,
        image4Left: image4Left
      });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  // Animation effect - slide left and right after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (imageDimensions.comboLeft > 0) {
        setIsSliding(true);
        // Calculate how much to slide left to align with screen edge
        setSlideOffsetLeft(-imageDimensions.comboLeft);
        // Calculate how much to slide right to align with screen edge
        const image2RightEdge = imageDimensions.comboLeft + imageDimensions.image1Width - imageDimensions.overlapAmount + imageDimensions.image2Width;
        const slideDistanceRight = window.innerWidth - image2RightEdge;
        setSlideOffsetRight(slideDistanceRight);
        
        // Show content after sliding animation completes (3s delay + 2s animation = 5s total)
        const contentTimer = setTimeout(() => {
          setShowContent(true);
        }, 5000); // Show content after sliding finishes
        
        return () => clearTimeout(contentTimer);
      }
    }, 3000); // Start animation after 3 seconds

    return () => clearTimeout(timer);
  }, [imageDimensions.comboLeft, imageDimensions.image1Width, imageDimensions.overlapAmount, imageDimensions.image2Width]);
  return (
    <div className="h-screen bg-white text-black overflow-hidden">
      {/* Header */}
      <Header forceSolid={true} backgroundClass="bg-white/0" textColorClass="text-white" logoVariant="light" />
      
      {/* Main Content Container */}
      <main className="relative h-full pt-20">
        
        {/* First Overlay Image - about-me-1.png (Left side of combo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isSliding ? slideOffsetLeft : 0
          }}
          transition={{ 
            duration: 1.2, 
            ease: 'easeOut',
            x: { duration: 2, ease: 'easeInOut', delay: 3 }
          }}
          className="absolute z-10"
          style={{
            top: '0',
            left: `${imageDimensions.comboLeft}px`,
            height: '100%',
            width: `${imageDimensions.image1Width}px`
          }}
        >
          <Image 
            src="/about/about-me-1.png"
            alt="About Me Image 1"
            width={4107}
            height={6520}
            className="w-full h-full object-contain object-left"
            priority
          />
        </motion.div>

        {/* Second Overlay Image - about-me-2.png (Right side of combo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isSliding ? slideOffsetRight : 0
          }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3, 
            ease: 'easeOut',
            x: { duration: 2, ease: 'easeInOut', delay: 3 }
          }}
          className="absolute z-20"
          style={{
            top: '0',
            left: `${imageDimensions.comboLeft + imageDimensions.image1Width - imageDimensions.overlapAmount}px`,
            height: '100%',
            width: `${imageDimensions.image2Width}px`
          }}
        >
          <Image 
            src="/about/about-me-2.png"
            alt="About Me Image 2"
            width={2025}
            height={6520}
            className="w-full h-full object-contain object-right"
            priority
          />
        </motion.div>

        {/* Third Overlay Image - about-me-3.png (Flush with right side of Image 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isSliding ? slideOffsetLeft : 0
          }}
          transition={{ 
            duration: 1.2, 
            delay: 0.6, 
            ease: 'easeOut',
            x: { duration: 2, ease: 'easeInOut', delay: 3 }
          }}
          className="absolute z-15"
          style={{
            top: '0',
            left: `${imageDimensions.image3Left}px`,
            height: '100%',
            width: `${imageDimensions.image3Width}px`,
            overflow: 'hidden'
          }}
        >
          <Image 
            src="/about/about-me-3.png"
            alt="About Me Image 3"
            width={8000}
            height={6520}
            className="w-full h-full object-cover object-right"
            priority
          />
        </motion.div>

        {/* Fourth Overlay Image - about-me-4.png (Flush with left side of Image 2) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isSliding ? slideOffsetRight : 0
          }}
          transition={{ 
            duration: 1.2, 
            delay: 0.9, 
            ease: 'easeOut',
            x: { duration: 2, ease: 'easeInOut', delay: 3 }
          }}
          className="absolute z-5"
          style={{
            top: '0',
            left: `${imageDimensions.image4Left}px`,
            height: '100%',
            width: `${imageDimensions.image4Width}px`,
            overflow: 'hidden'
          }}
        >
          <Image 
            src="/about/about-me-4.png"
            alt="About Me Image 4"
            width={8000}
            height={6520}
            className="w-full h-full object-cover object-left"
            priority
          />
        </motion.div>

        {/* Content Area - Image and Text Boxes */}
        {showContent && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            
            {/* Portrait Image - Top */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="absolute"
              style={{
                top: '5%',
                left: '50%',
                transform: 'translate(-50%, -80%)',
                width: '200px',
                height: '250px',
                zIndex: 35
              }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
                <Image 
                  src="/about/portrait.jpg"
                  alt="Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Text Box 1 - Page 1 - Above Text Box 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
              className="absolute bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-2xl border border-gray-200"
              style={{
                top: '25%',
                left: '50%',
                transform: 'translate(-50%, -25%)',
                width: '550px',
                maxHeight: '33vh',
                zIndex: 34
              }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-3">Crafting Intelligent Environments</h2>
              <div className="text-gray-700 leading-relaxed space-y-2 text-xs overflow-y-auto">
                <p>
                Welcome. I am driven by the profound intersection of the built environment and the transformative power of advanced technology. My journey in architecture began with a deep appreciation for form, function, and human experience. This foundation was significantly expanded through my doctoral research, where I explored how cutting-edge computational methods can unveil the intricate dynamics of urban life.
                </p>
                <p>
                At the University of Florida, my Ph.D. thesis, "Pedestrian Behavior Analysis in Shared Open Spaces Implementing YOLOv8," delved into pioneering techniques for understanding human movement and interaction within designed spaces. This work, along with subsequent publications, laid the groundwork for my expertise in machine learning algorithms and computer vision, specifically applied to architectural contexts. It’s here that the two pillars of my professional identity truly converged: the rigorous discipline of architectural practice with the innovative frontiers of artificial intelligence.
                </p>
                <p>
                My commitment lies in leveraging these advanced analytical tools not merely for observation, but to inform and enrich the architectural design process itself. By translating complex data into actionable insights, I aim to create spaces that are not only aesthetically compelling but also intuitively responsive, highly efficient, and profoundly human-centric.
                </p>
              </div>
            </motion.div>

            {/* Text Box 2 - Page 2 - Below Text Box 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
              className="absolute bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-2xl border border-gray-200"
              style={{
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, 30%)',
                width: '550px',
                maxHeight: '30vh',
                zIndex: 34
              }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-3">Bridging Design and Data for the Future of Architecture</h2>
              <div className="text-gray-700 leading-relaxed space-y-2 text-xs overflow-y-auto">
                <p>
                My professional life has been a continuous exploration of how to bridge the gap between abstract computational models and the tangible realities of architectural design. While my research focused on developing sophisticated computer vision models like YOLOv8 to analyze pedestrian behavior, this wasn't a departure from architecture, but rather an evolution of my approach to it. I see these algorithms as powerful new lenses through which we can understand and optimize the spaces we inhabit.
                </p>
                <p>
                My ambition is to redefine architectural practice by integrating intelligent systems that can predict, adapt, and learn from human interaction. This enables the creation of truly smart buildings and urban environments—spaces that are not just aesthetically pleasing but are also optimized for human flow, comfort, and sustainability. I invite you to explore my work and discover how this synergistic approach can bring a new dimension of intelligence and innovation to your projects.
                </p>
              </div>
            </motion.div>

          </div>
        )}
      </main>
    </div>
  );
};

export default AboutPage;
