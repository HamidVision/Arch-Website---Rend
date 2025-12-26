'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HorizontalScrollIndicatorProps {
  /**
   * Whether the indicator should be visible
   */
  show?: boolean;
  /**
   * Callback when user scrolls (to hide the indicator)
   */
  onScroll?: () => void;
  /**
   * Color scheme: 'light' for dark backgrounds, 'dark' for light backgrounds
   */
  colorScheme?: 'light' | 'dark';
  /**
   * Distance from bottom in pixels
   */
  bottomOffset?: number;
}

/**
 * Horizontal scroll indicator with animated line, oval, and pulsing gradient glow.
 * Shows users they can scroll horizontally using mouse wheel.
 */
export default function HorizontalScrollIndicator({
  show = true,
  colorScheme = 'dark',
  bottomOffset = 100
}: HorizontalScrollIndicatorProps) {
  if (!show) return null;

  return (
    <motion.div 
      style={{ 
        position: 'fixed',
        bottom: `${bottomOffset}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        zIndex: 50
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Pulsing gradient glow background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-25px',
          borderRadius: '40px',
          background: 'radial-gradient(ellipse, rgba(238, 125, 48, 0.4) 0%, rgba(255, 154, 86, 0.2) 50%, transparent 70%)',
          filter: 'blur(12px)',
          zIndex: -1
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* SCROLL text */}
      <motion.span 
        style={{ 
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: '#ee7d30',
          fontWeight: 500,
          textShadow: '0 0 10px rgba(238, 125, 48, 0.5)'
        }}
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        SCROLL
      </motion.span>
      
      {/* Animated elements row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Animated horizontal line that draws and erases */}
        <svg width="50" height="2" style={{ overflow: 'visible' }}>
          <motion.line
            x1="0"
            y1="1"
            x2="50"
            y2="1"
            stroke="#ee7d30"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              times: [0, 0.4, 0.6, 1],
              ease: "easeInOut"
            }}
            style={{
              filter: 'drop-shadow(0 0 2px rgba(238, 125, 48, 0.4))'
            }}
          />
        </svg>
        
        {/* Horizontal oval with animated dot */}
        <motion.div
          style={{
            width: '36px',
            height: '22px',
            border: '2px solid #ee7d30',
            borderRadius: '11px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(4px)'
          }}
          animate={{
            boxShadow: [
              '0 0 10px rgba(238, 125, 48, 0.5), 0 0 20px rgba(238, 125, 48, 0.3)',
              '0 0 20px rgba(238, 125, 48, 0.8), 0 0 40px rgba(238, 125, 48, 0.4)',
              '0 0 10px rgba(238, 125, 48, 0.5), 0 0 20px rgba(238, 125, 48, 0.3)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#ee7d30',
              borderRadius: '50%',
              boxShadow: '0 0 6px rgba(238, 125, 48, 0.8)'
            }}
            animate={{ x: [-9, 9, -9] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Second animated line (mirror) */}
        <svg width="50" height="2" style={{ overflow: 'visible' }}>
          <motion.line
            x1="0"
            y1="1"
            x2="50"
            y2="1"
            stroke="#ee7d30"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              times: [0, 0.4, 0.6, 1],
              ease: "easeInOut",
              delay: 0.3
            }}
            style={{
              filter: 'drop-shadow(0 0 2px rgba(238, 125, 48, 0.4))'
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
