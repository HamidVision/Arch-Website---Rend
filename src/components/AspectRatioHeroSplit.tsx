'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AspectRatioHeroSplitProps {
  heroSrc: string;
  heroAlt: string;
  secondSrc: string;
  secondAlt: string;
  overlaySrc: string;
  overlayPositionInitial: { top: string; left: string; width: string; height?: string };
  overlayPositionActivated: { top: string; left: string; width: string; height?: string };
  className?: string;
}

export default function AspectRatioHeroSplit({
  heroSrc,
  heroAlt,
  secondSrc,
  secondAlt,
  overlaySrc,
  overlayPositionInitial,
  overlayPositionActivated,
  className = ''
}: AspectRatioHeroSplitProps) {
  const [isActivated, setIsActivated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  const overlayPos = isActivated ? overlayPositionActivated : overlayPositionInitial;

  return (
    <div ref={containerRef} className={`horizontal-section ${className}`}>
      <div ref={panelRef} className={`panel ${isActivated ? 'activated' : 'initial'}`}>
        <motion.section
          className="hero"
          animate={{ height: isActivated ? 'var(--hero-height)' : '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'relative' }}
        >
          <img src={heroSrc} alt={heroAlt} draggable={false} />

          {/* Overlay clickable area with ping effect */}
          <motion.div
            style={{
              position: 'absolute',
              top: overlayPos.top,
              left: overlayPos.left,
              width: overlayPos.width,
              height: overlayPos.height || 'auto',
              cursor: 'pointer'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsActivated(prev => !prev)}
          >
            {/* Ping ring */}
            <span className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping"></span>

            {/* Overlay image is invisible until hover */}
            <motion.img
              src={overlaySrc}
              alt="Toggle Analysis"
              className="relative z-10 siteplan-toggle"
              style={{ width: '100%', height: 'auto', opacity: 0 }}
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
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
    </div>
  );
}
