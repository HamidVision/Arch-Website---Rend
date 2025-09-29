'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HELoadingComponentProps {
  variant?: 'splash' | 'minimal';
  timeoutMs?: number;
  logoUrl?: string;
  subtitle?: string;
  tagline?: string;
}

const HELoadingComponent: React.FC<HELoadingComponentProps> = ({
  variant = 'splash',
  timeoutMs = 2000,
  logoUrl = '/brand/logo.svg',
  subtitle = 'Architecture & Design Studio',
  tagline = 'Creating spaces that inspire'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Development mode override - always show loading in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Check if this is a fresh page load (not just a route change)
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    const shouldShow = isDevelopment || !hasLoadedBefore || !document.referrer;
    
    if (shouldShow) {
      setIsVisible(true);
      
      // Only set the session flag in production
      if (!isDevelopment) {
        sessionStorage.setItem('hasLoadedBefore', 'true');
      }
      
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 500); // Fade out duration
      }, timeoutMs);

      return () => clearTimeout(timer);
    } else {
      // Hide immediately if not showing
      setIsVisible(false);
    }
  }, [timeoutMs]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isAnimating ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Main container - vertically centered */}
          <div className="flex flex-col items-center justify-center">
            {/* Logo */}
            <motion.img
              src={logoUrl}
              alt="Studio Logo"
              className="block mb-8"  // 32px gap
              style={{
                width: 'auto',
                height: 'clamp(120px, 25vh, 250px)',
                maxWidth: '70vw'
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />

            {/* Text container */}
            <div className="text-center">
              {/* Subtitle */}
              <motion.h2
                className="text-base sm:text-lg font-light text-gray-600 tracking-wider uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              >
                {subtitle}
              </motion.h2>

              {/* Tagline */}
              <motion.p
                className="text-xs sm:text-sm text-gray-500 italic mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              >
                {tagline}
              </motion.p>
            </div>

            {/* Loading indicator - positioned below everything */}
            <motion.div
              className="absolute bottom-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HELoadingComponent;