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
      
      // Calculate scale factor to fit screen height (Standard fit)
      // Since images are now significantly wider (12000px/11000px), 
      // they will naturally cover the screen width without needing "cover" logic.
      const scale = screenHeight / ORIGINAL_H;
      
      // Calculate Scaled Reference Dimensions
      const scaledRefImg1W = REF_IMG1_W * scale;
      const scaledRefImg2W = REF_IMG2_W * scale;
      const scaledRefComboW = REF_COMBO_W * scale;
      
      // Calculate Scaled New Dimensions
      const scaledImgAW = NEW_IMG_A_W * scale;
      const scaledImgBW = NEW_IMG_B_W * scale;

      // Calculate Overlap (based on reference to maintain visual center blend)
      // overlap = (W1 + W2) - ComboW
      const overlap = (scaledRefImg1W + scaledRefImg2W) - scaledRefComboW;
      
      // Calculate Center Position (based on reference Combo)
      const comboLeft = (screenWidth - scaledRefComboW) / 2;
      
      // === LAYOUT LOGIC ===
      
      // Image A (Left Side):
      // Anchored to the "Right" side of the reference Image 1 block.
      // This ensures the "split" point remains exactly in the center design spot.
      const anchorRightX = comboLeft + scaledRefImg1W;
      const imageALeft = anchorRightX - scaledImgAW;

      // Image B (Right Side):
      // Anchored to the "Left" side of the reference Image 2 block.
      const imageBLeft = comboLeft + scaledRefImg1W - overlap;

      // Animation Offsets
      const slideOffsetLeft = -comboLeft;
      const refImage2RightEdge = imageBLeft + scaledRefImg2W;
      const slideOffsetRight = screenWidth - refImage2RightEdge;

      setLayout({
        imageAW: scaledImgAW,
        imageALeft: imageALeft,
        imageBW: scaledImgBW,
        imageBLeft: imageBLeft,
        slideOffsetLeft: slideOffsetLeft,
        slideOffsetRight: slideOffsetRight,
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

  return (
    <div className="h-screen bg-white text-black overflow-hidden relative">
      <Header forceSolid={true} backgroundClass="bg-white/0" textColorClass="text-white" logoVariant="light" />
      
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
          className="absolute origin-right" // Scale from the split-point
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
          className="absolute origin-left" // Scale from the split-point
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

        {/* Content Area */}
        {showContent && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            
            {/* Portrait Image */}
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

            {/* Text Box 1 */}
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

            {/* Text Box 2 */}
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
