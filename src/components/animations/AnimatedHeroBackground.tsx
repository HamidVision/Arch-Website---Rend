'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AnimatedHeroBackgroundProps {
  dayImage?: string;
  nightImage?: string;
  cycleDuration?: number; // Total cycle duration in seconds (day → night → day)
  kenBurnsDuration?: number; // Duration for one Ken Burns pan/zoom cycle
}

/**
 * Animated Hero Background with Ken Burns Effect and Day/Night Cycle
 * 
 * Features:
 * - Smooth crossfade transition between day and night images
 * - Ken Burns effect (slow pan + zoom)
 * - Mobile-optimized: uses wider container for horizontal panning to show towers
 * - Seamless infinite loop
 */
const AnimatedHeroBackground: React.FC<AnimatedHeroBackgroundProps> = ({
  dayImage = '/images/hero.jpg',
  nightImage = '/images/hero_night.jpg',
  cycleDuration = 20, // 20 seconds per half-cycle (day or night)
  kenBurnsDuration = 30 // 30 seconds for Ken Burns animation
}) => {
  const [isNight, setIsNight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle between day and night
  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight(prev => !prev);
    }, cycleDuration * 1000);

    return () => clearInterval(interval);
  }, [cycleDuration]);

  // Ken Burns animation variants
  // Mobile: pan from right (showing towers) to left (bridge) and back, with subtle zoom
  // Desktop: subtle zoom and pan
  const kenBurnsVariants = isMobile ? {
    animate: {
      x: ['-50%', '-25%', '-50%'], // Start showing right side (towers), pan left to bridge
      scale: [1.1, 1.15, 1.1], // Always scale >= 1 to fill height
      transition: {
        duration: kenBurnsDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    }
  } : {
    animate: {
      scale: [1, 1.15, 1],
      x: ['0%', '-3%', '0%'],
      transition: {
        duration: kenBurnsDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    }
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Day Image Layer */}
      <motion.div
        className={`absolute inset-0 h-full ${isMobile ? 'w-[200%]' : 'w-full'}`}
        variants={kenBurnsVariants}
        animate="animate"
        key={`day-container-${isMobile}`}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ opacity: isNight ? 0 : 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        >
          <Image 
            src={dayImage}
            alt="Architectural Hero Background - Day"
            fill
            className="object-cover"
            priority
            sizes={isMobile ? '200vw' : '100vw'}
            style={{
              objectPosition: isMobile ? 'left center' : 'center center'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Night Image Layer */}
      <motion.div
        className={`absolute inset-0 h-full ${isMobile ? 'w-[200%]' : 'w-full'}`}
        variants={kenBurnsVariants}
        animate="animate"
        key={`night-container-${isMobile}`}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ opacity: isNight ? 1 : 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
        >
          <Image 
            src={nightImage}
            alt="Architectural Hero Background - Night"
            fill
            className="object-cover"
            sizes={isMobile ? '200vw' : '100vw'}
            style={{
              objectPosition: isMobile ? 'left center' : 'center center'
            }}
          />
        </motion.div>
      </motion.div>

      {/* Subtle overlay for text readability */}
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          backgroundColor: isNight ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.25)'
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default AnimatedHeroBackground;
