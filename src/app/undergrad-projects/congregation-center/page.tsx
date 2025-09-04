'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const CongregationCenterPage: React.FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/undergrad-projects');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Navigation */}
      <motion.button
        onClick={handleBackClick}
        className="fixed top-8 left-8 text-white text-2xl font-semibold tracking-wide hover:text-gray-300 transition-colors z-[70] bg-transparent border-none outline-none cursor-pointer"
        aria-label="Go back to undergrad projects"
        style={{ fontFamily: 'inherit', textRendering: 'optimizeLegibility' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        HE
      </motion.button>

      {/* Portfolio and Menu Buttons */}
      <div className="fixed top-0 right-0 z-[70] p-6">
        <div className="flex items-center space-x-6">
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

      {/* Content */}
      <div className="min-h-screen flex items-center justify-center px-8">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-title mb-8 tracking-wider uppercase">
            Congregation Center
          </h1>
          <p className="text-xl md:text-2xl font-body text-white/70 max-w-2xl mx-auto">
            Community & Gathering
          </p>
          <p className="text-lg font-body text-white/50 mt-8 max-w-3xl mx-auto">
            This project explores design for communal spaces that foster connection, 
            facilitate gatherings, and create meaningful social interactions.
          </p>
          <p className="text-sm font-body text-white/30 mt-12">
            Content coming soon...
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CongregationCenterPage;
