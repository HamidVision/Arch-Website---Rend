'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const DesignPhilosophyPage: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showText, setShowText] = useState(true);
  const [showTextBackground, setShowTextBackground] = useState(true);
  const [showPageBackground, setShowPageBackground] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Text animation timing
    const textTimer = setTimeout(() => {
      setShowText(false);
      setShowTextBackground(false);
      // Show page background after text fades out
      setTimeout(() => {
        setShowPageBackground(true);
      }, 1000); // 1 second delay after text fades
    }, 9000); // 9 seconds total
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(textTimer);
    };
  }, []);

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Text Background - Shows during text animation */}
      <AnimatePresence>
        {showTextBackground && (
          <motion.div 
            className="fixed inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={isMobile ? '/design-philosophy/design-philosophy-phone.jpg' : '/design-philosophy/design-philosophy-21.9-bg.jpg'}
              alt="Design Philosophy Text Background"
              fill
              className="object-cover bg-image-21-9"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Background - Shows after text animation */}
      <AnimatePresence>
        {showPageBackground && (
          <motion.div 
            className="fixed inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Image
              src={isMobile ? '/design-philosophy/design-philosophy-phone.jpg' : '/design-philosophy/design-philosophy-21.9.jpg'}
              alt="Design Philosophy Page Background"
              fill
              className="object-cover bg-image-21-9"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation - Always visible */}
      <motion.button
        onClick={handleBackClick}
        className="fixed top-8 left-8 text-white text-2xl font-semibold tracking-wide hover:text-gray-300 transition-colors z-[70] bg-transparent border-none outline-none cursor-pointer"
        aria-label="Go to homepage"
        style={{ fontFamily: 'inherit', textRendering: 'optimizeLegibility' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        HE
      </motion.button>

      {/* Portfolio and Menu Buttons - Always visible */}
      <div className="fixed top-0 right-0 z-[70] p-6">
        <div className="flex items-center space-x-6">
          {/* Portfolio Button */}
          <motion.button
            onClick={() => router.push('/')}
            className="focus:outline-none"
            aria-label="Go to portfolio"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              <rect x="14" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              <rect x="4" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              <rect x="14" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
            </svg>
          </motion.button>
          
          {/* Menu Button */}
          <motion.button
            className="relative z-[70] h-6 w-8 focus:outline-none"
            aria-label="Toggle menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
              <span aria-hidden="true" className="absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out -translate-y-1"></span>
              <span aria-hidden="true" className="absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out translate-y-1"></span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Text Content - Animated */}
      <AnimatePresence>
        {showText && (
          <motion.div 
            className="relative z-10 min-h-screen flex items-center justify-center px-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-6xl md:text-8xl font-light text-white mb-8 tracking-wider uppercase"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Design Philosophy
              </motion.h1>
              
              <motion.div
                className="text-white/90 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="mb-6">
                  At the intersection of creativity and functionality, our design philosophy 
                  embraces the fundamental principles that shape exceptional architectural experiences.
                </p>
                
                <p className="mb-6">
                  We believe in creating spaces that not only serve their intended purpose 
                  but also inspire, connect, and elevate the human experience through thoughtful 
                  design, sustainable practices, and innovative solutions.
                </p>
                
                <p>
                  Every project begins with a deep understanding of context, culture, and 
                  human needs, leading to designs that are both timeless and forward-thinking.
                </p>
              </motion.div>

              {/* Key Principles */}
              <motion.div
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-center">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">
                    Context
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Understanding the unique environmental, cultural, and social context 
                    that shapes each project's identity and purpose.
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">
                    Innovation
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Pushing boundaries through creative problem-solving and embracing 
                    new technologies and methodologies in architectural design.
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wider uppercase">
                    Sustainability
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Creating environmentally responsible designs that minimize impact 
                    while maximizing functionality and aesthetic appeal.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesignPhilosophyPage;
