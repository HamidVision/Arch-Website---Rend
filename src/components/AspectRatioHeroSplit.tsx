'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AspectRatioHeroSplitProps {
  heroSrc: string;
  heroAlt: string;
  secondSrc: string;
  secondAlt: string;
  triggerText?: string;
  className?: string;
}

export default function AspectRatioHeroSplit({
  heroSrc,
  heroAlt,
  secondSrc,
  secondAlt,
  triggerText = 'Show Analysis',
  className = ''
}: AspectRatioHeroSplitProps) {
  const [isActivated, setIsActivated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Calculate proportional heights when toggled
  const setAspectSplit = () => {
    const heroImg = panelRef.current?.querySelector<HTMLImageElement>('.hero img');
    const secondImg = panelRef.current?.querySelector<HTMLImageElement>('.second-render img');

    if (!heroImg || !secondImg) return;

    const heroAspect = heroImg.naturalHeight / heroImg.naturalWidth;
    const secondAspect = secondImg.naturalHeight / secondImg.naturalWidth;

    const k = window.innerHeight / (heroAspect + secondAspect);
    const heroHeightPx = k * heroAspect;
    const secondHeightPx = k * secondAspect;

    const heroPercent = (heroHeightPx / window.innerHeight) * 100;
    const secondPercent = (secondHeightPx / window.innerHeight) * 100;

    document.documentElement.style.setProperty('--hero-height', `${heroPercent}%`);
    document.documentElement.style.setProperty('--second-height', `${secondPercent}%`);
  };

  useEffect(() => {
    if (isActivated) {
      setAspectSplit();
      window.addEventListener('resize', setAspectSplit);
      return () => window.removeEventListener('resize', setAspectSplit);
    }
  }, [isActivated]);

  // Horizontal scroll with mouse wheel
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
      <div ref={panelRef} className={`panel ${isActivated ? 'activated' : 'initial'}`}>
        <motion.section
          className="hero"
          animate={{ height: isActivated ? 'var(--hero-height)' : '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <img src={heroSrc} alt={heroAlt} draggable={false} />
        </motion.section>

        <motion.section
          className="second-render"
          animate={{
            height: isActivated ? 'var(--second-height)' : 0,
            opacity: isActivated ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <img src={secondSrc} alt={secondAlt} draggable={false} />
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
