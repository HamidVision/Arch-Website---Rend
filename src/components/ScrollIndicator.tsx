'use client';

import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  direction?: 'down' | 'right' | 'left';
  label?: string;
  className?: string;
  color?: 'light' | 'dark';
}

/**
 * Animated scroll indicator for project pages and overlays
 * Supports vertical and horizontal directions
 */
export default function ScrollIndicator({ 
  direction = 'down', 
  label,
  className = '',
  color = 'light'
}: ScrollIndicatorProps) {
  const isHorizontal = direction === 'right' || direction === 'left';
  const textColor = color === 'light' ? 'text-white/50' : 'text-black/50';
  
  // Position classes based on direction
  const positionClasses = {
    down: 'bottom-8 left-1/2 -translate-x-1/2',
    right: 'right-8 top-1/2 -translate-y-1/2',
    left: 'left-8 top-1/2 -translate-y-1/2'
  };
  
  // Animation direction
  const animationProps = {
    down: { y: [0, 8, 0] },
    right: { x: [0, 8, 0] },
    left: { x: [0, -8, 0] }
  };
  
  // Arrow paths
  const arrowPaths = {
    down: 'M19 14l-7 7m0 0l-7-7m7 7V3',
    right: 'M9 5l7 7-7 7',
    left: 'M15 19l-7-7 7-7'
  };
  
  const defaultLabels = {
    down: 'SCROLL',
    right: 'SCROLL',
    left: 'SCROLL'
  };

  return (
    <motion.div 
      className={`fixed ${positionClasses[direction]} z-50 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1, 
        ...animationProps[direction]
      }}
      transition={{ 
        opacity: { delay: 2, duration: 0.5 },
        [isHorizontal ? 'x' : 'y']: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
      }}
    >
      <div className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} items-center gap-2 ${textColor} text-xs tracking-wider`}>
        <span>{label || defaultLabels[direction]}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={arrowPaths[direction]} />
        </svg>
      </div>
    </motion.div>
  );
}
