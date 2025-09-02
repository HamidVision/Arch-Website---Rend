'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 500); // Fade out duration
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [timeoutMs]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: isAnimating ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="text-center">
            {/* Logo */}
                         <motion.div
               className="relative mb-0"
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.8, ease: 'easeOut' }}
             >
              <div className="relative w-96 h-96 mx-auto">
                <Image
                  src={logoUrl}
                  alt="Studio Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

                         {/* Subtitle */}
             <motion.h2
               className="text-lg font-light text-gray-600 mb-0 tracking-wider uppercase"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
             >
              {subtitle}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              className="text-sm text-gray-500 italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            >
              {tagline}
            </motion.p>

            {/* Loading indicator */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto"></div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HELoadingComponent;
