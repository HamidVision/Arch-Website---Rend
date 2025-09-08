'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AspectRatioHeroSplitProps {
  heroContent: React.ReactNode;
  secondContent: React.ReactNode;
  triggerText?: string;
  className?: string;
}

export default function AspectRatioHeroSplit({
  heroContent,
  secondContent,
  triggerText = 'Show Analysis',
  className = ''
}: AspectRatioHeroSplitProps) {
  const [isActivated, setIsActivated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse wheel -> horizontal scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div ref={containerRef} className={`horizontal-section ${className}`}>
      <div className={`panel ${isActivated ? 'activated' : 'initial'}`}>
        <motion.section
          className="hero"
          initial={{ height: '100%' }}
          animate={{ height: isActivated ? '50%' : '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {heroContent}
        </motion.section>

        <motion.section
          className="second-render"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isActivated ? '50%' : 0, opacity: isActivated ? 1 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {secondContent}
        </motion.section>
      </div>

      <button
        className="activation-trigger"
        onClick={() => setIsActivated(prev => !prev)}
      >
        {isActivated ? 'Hide Analysis' : triggerText}
      </button>
    </div>
  );
}
