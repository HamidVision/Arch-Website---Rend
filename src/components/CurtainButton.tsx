'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CurtainButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  label?: string;
  className?: string;
  isWidescreen?: boolean;
  variant?: 'default' | 'inverse';
  isLoading?: boolean;
  loadingProgress?: number; // 0-100
}

const CurtainButton: React.FC<CurtainButtonProps> = ({ 
  onClick, 
  label = 'READ MORE', 
  className = '',
  isWidescreen = false,
  variant = 'default',
  isLoading = false,
  loadingProgress
}) => {
  const isInverse = variant === 'inverse';

  // Determine display text
  const displayText = isLoading 
    ? (loadingProgress !== undefined ? `LOADING ${loadingProgress}%` : 'LOADING...')
    : label;

  return (
    <motion.button
      onClick={isLoading ? undefined : onClick}
      // Disable click during loading
      disabled={isLoading}
      className={`group/btn relative overflow-hidden px-8 py-3 border outline-none focus:outline-none bg-transparent transition-colors duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] ${
        isInverse ? 'border-black text-black hover:text-white' : 'border-white text-white hover:text-black'
      } ${isLoading ? 'cursor-wait' : ''} ${className}`}
      style={{
        borderRadius: '0px',
      }}
      // Pulsing border animation when loading
      animate={isLoading ? {
        borderColor: isInverse 
          ? ['rgba(0,0,0,0.5)', 'rgba(238,125,48,1)', 'rgba(0,0,0,0.5)']
          : ['rgba(255,255,255,0.5)', 'rgba(238,125,48,1)', 'rgba(255,255,255,0.5)']
      } : {}}
      transition={isLoading ? {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      } : {}}
    >
      {/* The 'Curtain' - hidden during loading */}
      {!isLoading && (
        <div 
          className={`absolute inset-0 w-full h-full transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform ${
            isInverse ? 'bg-black' : 'bg-white'
          }`}
          style={{
            top: 0,
            left: 0
          }}
        />
      )}

      {/* Text */}
      <span className={`relative z-10 text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-500 ${
        isLoading
          ? 'text-[#ee7d30]' // Orange text when loading
          : isInverse 
            ? 'text-black group-hover/btn:text-white' 
            : 'text-white group-hover/btn:text-black'
      }`}>
        {displayText}
      </span>
    </motion.button>
  );
};

export default CurtainButton;

