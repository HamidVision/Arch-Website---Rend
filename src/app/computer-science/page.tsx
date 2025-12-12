'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { MatrixOverlay } from '@/components/animations/MatrixOverlay';

export default function ComputerSciencePage() {
  const [showMatrix, setShowMatrix] = useState(false);

  // Trigger Matrix animation after initial page animations (approx 2s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMatrix(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Header />
      
      <main className="relative flex items-center justify-center min-h-screen px-4 z-10">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20" />
        
        {/* Matrix Overlay - Triggered after animations, z-0 to sit behind content */}
        <MatrixOverlay running={showMatrix} side="center" />
        
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
            {/* Coming Soon Header */}
            <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8">
              Coming Soon
            </h2>

            {/* Project Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 text-left">
              {/* Tile 1: Archi Pal */}
              <motion.div 
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-indigo-300 transition-all">
                  Archi Pal
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  An expert-level AI research companion for Architecture, built on a curated database of history, theory, and style. It utilizes reliability-aware retrieval to offer semantic, scholarly insights, prioritizing verified academic discourse over general web content for students and professionals.
                </p>
              </motion.div>

              {/* Tile 2: Urban Dynamics Analysis */}
              <motion.div 
                className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-indigo-300 transition-all">
                  Urban Dynamics Analysis
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  Bridging design intent and public usage through advanced computer vision. Using YOLO architecture, this project quantifies human behavior and movement patterns in shared spaces, providing data-driven insights to help architects create environments truly responsive to community needs.
                </p>
              </motion.div>
            </div>

            {/* Description Box */}
            <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 mx-auto max-w-4xl">
              <p className="text-lg text-gray-400 leading-relaxed">
                I&apos;m currently developing a comprehensive showcase of my computer science projects, 
                including software development, algorithms, and technical implementations. 
                This section will feature interactive demos, code repositories, and detailed 
                documentation of my programming journey.
              </p>
            </div>
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
