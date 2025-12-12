'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

export default function ResearchPapersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="relative flex items-center justify-center min-h-screen px-4">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-blue-900/20" />
        
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
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Research Papers & Publications
          </motion.h1>

          {/* Research Paper Tiles */}
          <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto mb-12 text-left">
            {/* Paper 1 */}
            <motion.div 
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-blue-300 transition-all">
                AI Design Approach for Urban Plaza: Human Behavior-Based Algorithm
              </h3>
              <p className="text-sm text-gray-400 font-mono">
                ASCE Computing in Civil Engineering 2021, 1327-1334
              </p>
            </motion.div>

            {/* Paper 2 */}
            <motion.div 
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-blue-300 transition-all">
                Advancing Pedestrian Behavior Analysis in Urban Spaces Using YOLOv10, LSTM Networks, and DeepSORT Tracking
              </h3>
              <p className="text-sm text-gray-400 font-mono">
                Under Review
              </p>
            </motion.div>

            {/* Paper 3 */}
            <motion.div 
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-blue-300 transition-all">
                Spatial Usage Patterns and Environmental Influences in Urban Open Spaces
              </h3>
              <p className="text-sm text-gray-400 font-mono">
                Under Review
              </p>
            </motion.div>
          </div>

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
              I&apos;m currently compiling my academic research and publications, including 
              architectural studies, design methodology papers, and interdisciplinary research. 
              This section will feature downloadable papers, research summaries, and insights 
              from my academic and professional investigations.
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
                className="w-2 h-2 bg-indigo-400 rounded-full"
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

        {/* Floating research elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-indigo-400/10 font-serif text-sm"
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
              {['Abstract', 'Methodology', 'Results', 'Discussion', 'Conclusion', 'References'][i]}
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
