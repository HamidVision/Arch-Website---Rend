'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface VerticalScrollIndicatorProps {
  /**
   * Whether the indicator should be visible
   */
  show?: boolean;
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
 * Vertical scroll indicator with animated line, oval, and pulsing gradient glow.
 * Shows users they can scroll down using mouse wheel.
 */
export default function VerticalScrollIndicator({
  show = true,
  colorScheme = 'light',
  bottomOffset = 60
}: VerticalScrollIndicatorProps) {
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
        gap: '10px',
        zIndex: 50
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Pulsing gradient glow background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: '30px',
          background: 'radial-gradient(circle, rgba(238, 125, 48, 0.4) 0%, rgba(255, 154, 86, 0.2) 50%, transparent 70%)',
          filter: 'blur(10px)',
          zIndex: -1
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Vertical oval with animated dot */}
      <motion.div
        style={{
          width: '22px',
          height: '38px',
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
          animate={{ y: [-9, 9, -9] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Animated vertical line that draws and erases */}
      <svg width="4" height="35" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="scrollGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ee7d30" />
            <stop offset="100%" stopColor="#ff9a56" />
          </linearGradient>
        </defs>
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2="35"
          stroke="url(#scrollGradientV)"
          strokeWidth="2.5"
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
            filter: 'drop-shadow(0 0 4px rgba(238, 125, 48, 0.6))'
          }}
        />
      </svg>
    </motion.div>
  );
}
