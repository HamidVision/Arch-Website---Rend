'use client';

import { motion } from 'framer-motion';

interface PageLoaderProps {
  progress?: number;
  message?: string;
  variant?: 'spinner' | 'progress' | 'minimal';
}

/**
 * Full-screen page loader component with optional progress indicator
 * Use with useImagePreloader hook for content-heavy pages
 */
export default function PageLoader({ 
  progress, 
  message = 'Loading...', 
  variant = 'progress' 
}: PageLoaderProps) {
  return (
    <motion.div 
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Spinner */}
      {variant !== 'minimal' && (
        <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      )}
      
      {/* Progress bar */}
      {variant === 'progress' && progress !== undefined && (
        <div className="mt-6 w-48">
          <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-2 text-center text-white/40 text-xs">{progress}%</p>
        </div>
      )}
      
      {/* Message */}
      {variant !== 'minimal' && (
        <p className="mt-4 text-white/50 text-sm tracking-wider">{message}</p>
      )}
      
      {/* Minimal variant - just a subtle pulse */}
      {variant === 'minimal' && (
        <motion.div 
          className="w-2 h-2 bg-white/50 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
