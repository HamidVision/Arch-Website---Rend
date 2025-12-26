'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HELoadingComponentProps {
  variant?: 'splash' | 'minimal';
  timeoutMs?: number;
  logoUrl?: string;
  subtitle?: string;
  tagline?: string;
  theme?: 'light' | 'dark';
}

import { useLoading } from '@/context/LoadingContext';

// ... (interface)

const HELoadingComponent: React.FC<HELoadingComponentProps> = ({
  variant = 'splash',
  timeoutMs = 2000,
  logoUrl = '/brand/logo.svg',
  subtitle = 'Architecture & Design Studio',
  tagline = 'Creating spaces that inspire',
  theme = 'light'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isLoading } = useLoading(); // Get global loading state

  // Handle global loading state changes
  useEffect(() => {
    if (isLoading) {
      setIsVisible(true);
      setIsAnimating(false);
    } else if (!isLoading && isVisible) {
       // When loading stops, fade out
       setIsAnimating(true);
       setTimeout(() => {
         setIsVisible(false);
       }, 500);
    }
  }, [isLoading]);

  // Handle initial load logic
  useEffect(() => {
    // Check if this is a fresh page load (not just a route change)
    const hasLoadedBefore = sessionStorage.getItem('hasLoadedBefore');
    const shouldShow = !hasLoadedBefore || !document.referrer;
    
    if (shouldShow && !isLoading) { // Only run if not already triggered by context
      setIsVisible(true);
      
      // Set the session flag
      sessionStorage.setItem('hasLoadedBefore', 'true');
      
      const timer = setTimeout(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 500); // Fade out duration
      }, timeoutMs);

      return () => clearTimeout(timer);
    } else if (!shouldShow && !isLoading) {
      // Hide immediately if not showing and not loading
      setIsVisible(false);
    }
  }, [timeoutMs]); // Removed isLoading dependency to avoid conflict with above effect? Actually, splitting logic is better.

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed inset-0 z-[100] flex items-center justify-center ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
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
                className={`text-base sm:text-lg font-light tracking-wider uppercase ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              >
                {subtitle}
              </motion.h2>

              {/* Tagline */}
              <motion.p
                className={`text-xs sm:text-sm italic mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
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