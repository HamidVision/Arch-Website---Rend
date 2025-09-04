'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const DesignPhilosophyPage: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={isMobile ? '/design-philosophy/design-philosophy-phone.jpg' : '/design-philosophy/design-philosophy-21.9.jpg'}
          alt="Design Philosophy Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Navigation */}
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

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
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
      </div>
    </div>
  );
};

export default DesignPhilosophyPage;
