'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PortfolioIntroAnimationProps {
  onComplete?: () => void;
  enabled?: boolean;
}

const projectThumbnails = [
  { id: 'undergrad', src: '/undergrad-projects/main-tile.jpg', alt: 'Undergraduate Projects' },
  { id: 'graduate', src: '/graduate-projects/grad-hero.jpg', alt: 'Graduate Projects' },
  { id: 'cs', src: '/computer-science/computer-science-tile.webp', alt: 'Computer Science' },
  { id: 'research', src: '/research-papers/research-tile.jpg', alt: 'Research Papers' },
];

/**
 * Portfolio Intro Animation
 * 
 * Displays a 2x2 grid of project thumbnails that shrinks and moves
 * to the portfolio button position in the header, then disappears.
 * 
 * This animation plays once on first visit (controlled by sessionStorage).
 */
const PortfolioIntroAnimation: React.FC<PortfolioIntroAnimationProps> = ({ 
  onComplete,
  enabled = true 
}) => {
  const [phase, setPhase] = useState<'loading' | 'visible' | 'shrinking' | 'complete'>('loading');
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Check if animation should play (first visit only)
  useEffect(() => {
    if (!enabled) {
      setPhase('complete');
      return;
    }

    const hasSeenIntro = sessionStorage.getItem('hasSeenPortfolioIntro');
    if (hasSeenIntro) {
      setPhase('complete');
      onComplete?.();
    }
  }, [enabled, onComplete]);

  // Handle image load tracking
  const handleImageLoad = useCallback(() => {
    setImagesLoaded(prev => {
      const newCount = prev + 1;
      if (newCount >= projectThumbnails.length && phase === 'loading') {
        setPhase('visible');
      }
      return newCount;
    });
  }, [phase]);

  // Animation timeline
  useEffect(() => {
    if (phase === 'visible') {
      // Show grid for 2 seconds, then start shrinking
      const shrinkTimer = setTimeout(() => setPhase('shrinking'), 2000);
      return () => clearTimeout(shrinkTimer);
    }
    
    if (phase === 'shrinking') {
      // Complete after shrink animation (1.5s)
      const completeTimer = setTimeout(() => {
        setPhase('complete');
        sessionStorage.setItem('hasSeenPortfolioIntro', 'true');
        onComplete?.();
      }, 1500);
      return () => clearTimeout(completeTimer);
    }
  }, [phase, onComplete]);

  // Don't render if complete
  if (phase === 'complete') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: phase === 'shrinking' ? 0 : 1,
          scale: phase === 'shrinking' ? 0.03 : 1,
          x: phase === 'shrinking' ? 'calc(50vw - 70px)' : 0,
          y: phase === 'shrinking' ? 'calc(-50vh + 35px)' : 0,
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: phase === 'shrinking' ? 1.5 : 0.5, 
          ease: [0.4, 0, 0.2, 1] 
        }}
      >
        {/* Grid Container */}
        <motion.div 
          className="grid grid-cols-2 gap-3 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {projectThumbnails.map((project, i) => (
            <motion.div
              key={project.id}
              className="relative rounded-lg overflow-hidden bg-gray-800"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover"
                onLoad={handleImageLoad}
                sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading indicator (shown while images load) */}
        {phase === 'loading' && (
          <motion.div 
            className="absolute bottom-20"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioIntroAnimation;
