'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';

const DesignPhilosophyPage: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showText, setShowText] = useState(true);
  const [showTextBackground, setShowTextBackground] = useState(true);
  const [showPageBackground, setShowPageBackground] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            className="fixed inset-0 z-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {isMobile ? (
              // Mobile: Image height = screen height, width auto (proportional)
              // Animate horizontally to show full image
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/design-philosophy/design-philosophy-phone.jpg"
                  alt="Design Philosophy Page Background"
                  className="h-full w-auto max-w-none animate-design-pan-img"
                  style={{ 
                    height: '100%',
                    width: 'auto',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
              </div>
            ) : (
              // Desktop: Static full-screen cover
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/design-philosophy/design-philosophy-21.9.jpg"
                  alt="Design Philosophy Page Background"
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with white icons for dark background */}
      <Header />

      {/* Text Content - Animated */}
      <AnimatePresence>
        {showText && (
          <motion.div 
            className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-24 pb-12 md:justify-center md:pt-0 md:pb-0 px-4 md:px-8"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-4xl mx-auto text-center">
                              <motion.h1
                 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-title text-white mb-6 md:mb-8 tracking-wider uppercase"
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
               >
                 Design Philosophy
               </motion.h1>
              
                              <motion.div
                 className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-body"
                 initial={{ opacity: 0, y: 50 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
               >
                <p className="mb-4 md:mb-6">
                  At the intersection of creativity and functionality, our design philosophy 
                  embraces the fundamental principles that shape exceptional architectural experiences.
                </p>
                
                <p className="mb-4 md:mb-6">
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
                className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                 <div className="text-center">
                   <h3 className="text-xl md:text-2xl font-subtitle text-white mb-3 md:mb-4 tracking-wider uppercase">
                     Context
                   </h3>
                   <p className="text-white/80 text-xs md:text-sm leading-relaxed font-body">
                     Understanding the unique environmental, cultural, and social context 
                     that shapes each project's identity and purpose.
                   </p>
                 </div>
                 
                 <div className="text-center">
                   <h3 className="text-xl md:text-2xl font-subtitle text-white mb-3 md:mb-4 tracking-wider uppercase">
                     Innovation
                   </h3>
                   <p className="text-white/80 text-xs md:text-sm leading-relaxed font-body">
                     Pushing boundaries through creative problem-solving and embracing 
                     new technologies and methodologies in architectural design.
                   </p>
                 </div>
                 
                 <div className="text-center">
                   <h3 className="text-xl md:text-2xl font-subtitle text-white mb-3 md:mb-4 tracking-wider uppercase">
                     Sustainability
                   </h3>
                   <p className="text-white/80 text-xs md:text-sm leading-relaxed font-body">
                     Creating environmentally responsible designs that minimize impact 
                     while maximizing functionality and aesthetic appeal.
                   </p>
                 </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
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

export default DesignPhilosophyPage;
