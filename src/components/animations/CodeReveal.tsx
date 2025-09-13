'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CodeRevealProps {
  lines: string[];
  isRevealing: boolean;
  staggerDelay?: number; // milliseconds between lines
  onComplete?: () => void;
  className?: string;
}

const CodeReveal: React.FC<CodeRevealProps> = ({
  lines,
  isRevealing,
  staggerDelay = 50,
  onComplete,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay / 1000,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      filter: 'blur(2px)'
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className={`font-mono text-sm ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isRevealing ? "visible" : "hidden"}
      onAnimationComplete={onComplete}
    >
      {lines.map((line, index) => (
        <motion.div
          key={index}
          className="mb-1 text-gray-300"
          variants={lineVariants}
        >
          <span className="text-gray-500 mr-2">{index + 1}</span>
          <span className="text-green-400">$</span>
          <span className="text-blue-400"> </span>
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CodeReveal;
