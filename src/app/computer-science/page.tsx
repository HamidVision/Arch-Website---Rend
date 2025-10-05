'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

export default function ComputerSciencePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="relative flex items-center justify-center min-h-screen px-4">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20" />
        
        {/* Main content */}
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Icon */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" 
                />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Computer Science Projects
          </motion.h1>

          {/* Coming Soon message */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              I&apos;m currently developing a comprehensive showcase of my computer science projects, 
              including software development, algorithms, and technical implementations. 
              This section will feature interactive demos, code repositories, and detailed 
              documentation of my programming journey.
            </p>
          </motion.div>

          {/* Animated dots */}
          <motion.div 
            className="flex justify-center space-x-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Back to portfolio button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          >
            <Link 
              href="/"
              className="inline-flex items-center px-8 py-4 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all duration-300 group"
            >
              <span className="mr-2">←</span>
              Back to Portfolio
              <motion.span 
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating code elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-purple-400/10 font-mono text-sm"
              initial={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                opacity: 0 
              }}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0, 0.3, 0] 
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {['<div>', '{ }', 'const', 'function', 'return', 'import'][i]}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
