'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ViewProjectButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  label?: string;
  className?: string;
  isDark?: boolean; // For light backgrounds
}

const ViewProjectButton: React.FC<ViewProjectButtonProps> = ({ 
  onClick, 
  label = 'READ MORE', 
  className = '',
  isDark = false 
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`group relative overflow-hidden px-8 py-3 outline-none focus:outline-none ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        border: `1px solid ${isDark ? '#000000' : '#ffffff'}`,
        background: 'transparent',
      }}
    >
      {/* Fill Animation Layer */}
      <motion.div
        className={`absolute inset-0 top-0 left-0 w-full h-full ${isDark ? 'bg-black' : 'bg-white'}`}
        initial={{ y: '100%' }}
        whileHover={{ y: '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Text Layer */}
      <span 
        className={`relative z-10 text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-300 ${
          isDark 
            ? 'text-black group-hover:text-white' 
            : 'text-white group-hover:text-black'
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
};

export default ViewProjectButton;
