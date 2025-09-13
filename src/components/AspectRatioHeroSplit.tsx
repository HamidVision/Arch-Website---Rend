'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AspectRatioHeroSplitProps {
  heroSrc: string;
  heroAlt: string;
  secondSrc: string;
  secondAlt: string;
  thirdSrc: string;          // NEW: for site-analysis-l2.jpg
  thirdAlt: string;          // NEW
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
  thirdSrc,
  thirdAlt,
  overlaySrc,
  overlayPositionInitial,
  overlayPositionActivated,
  className = ''
}: AspectRatioHeroSplitProps) {
  const [toggleState, setToggleState] = useState(0); // 0: initial, 1: second image, 2: third image
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Dynamic header height calculation
  const getHeaderHeight = (): number => {
    const header = document.querySelector('header');
    if (header) {
      const computedStyle = getComputedStyle(header);
      return header.offsetHeight; // Use actual rendered height
    }
    return 80; // Fallback to default if header not found
  };

  const setAspectSplit = (state: number) => {
    const heroImg = panelRef.current?.querySelector<HTMLImageElement>('.hero img');
    const secondImg = panelRef.current?.querySelector<HTMLImageElement>('.second-render img');
    const thirdImg = panelRef.current?.querySelector<HTMLImageElement>('.third-render img');
    if (!heroImg || !secondImg || !thirdImg) return;

    // Get dynamic header height
    const headerHeight = getHeaderHeight();
    
    // Available visual height under the header
    const availableHeight = window.innerHeight - headerHeight;

    // Compute aspect ratios for all images
    const heroAspect = heroImg.naturalHeight / heroImg.naturalWidth;
    const secondAspect = secondImg.naturalHeight / secondImg.naturalWidth;
    const thirdAspect = thirdImg.naturalHeight / thirdImg.naturalWidth;

    let heroHeightPx: number;
    let secondHeightPx: number;
    let thirdHeightPx: number;

    if (state === 0) {
      // State 0: Only hero image visible (full height)
      heroHeightPx = availableHeight;
      secondHeightPx = 0;
      thirdHeightPx = 0;
    } else if (state === 1) {
      // State 1: Hero + Second image visible
      const k = availableHeight / (heroAspect + secondAspect);
      heroHeightPx = k * heroAspect;
      secondHeightPx = k * secondAspect;
      thirdHeightPx = 0;
    } else if (state === 2) {
      // State 2: Hero + Third image visible
      const k = availableHeight / (heroAspect + thirdAspect);
      heroHeightPx = k * heroAspect;
      secondHeightPx = 0;
      thirdHeightPx = k * thirdAspect;
    } else {
      // Fallback
      heroHeightPx = availableHeight;
      secondHeightPx = 0;
      thirdHeightPx = 0;
    }

    // Store as px, not percentages — eliminates rounding gaps and is unambiguous
    document.documentElement.style.setProperty('--available-height', `${availableHeight}px`);
    document.documentElement.style.setProperty('--hero-height-px', `${heroHeightPx}px`);
    document.documentElement.style.setProperty('--second-height-px', `${secondHeightPx}px`);
    document.documentElement.style.setProperty('--third-height-px', `${thirdHeightPx}px`);

    // Keep the container full viewport height to avoid bottom gap
    if (containerRef.current) {
      containerRef.current.style.height = `${window.innerHeight}px`;
    }

    // Push content below the header using padding on the panel (not margins on sections)
    if (panelRef.current) {
      panelRef.current.style.paddingTop = `${headerHeight}px`;
      panelRef.current.style.boxSizing = 'border-box';
    }
  };

  // Run aspect split when activated and on resize
  useEffect(() => {
    setAspectSplit(0); // run once on mount to handle initial layout
    window.addEventListener('resize', () => setAspectSplit(toggleState));
    return () => window.removeEventListener('resize', () => setAspectSplit(toggleState));
  }, []);

  useEffect(() => {
    setAspectSplit(toggleState);
  }, [toggleState]);

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

  const overlayPos = toggleState === 0 ? overlayPositionInitial : overlayPositionActivated;

  // Toggle handler for cycling through states
  const handleToggle = () => {
    setToggleState(prev => (prev + 1) % 3); // Cycles: 0→1→2→0
  };

  return (
    <div ref={containerRef} className={`horizontal-section ${className}`}>
      <div ref={panelRef} className={`panel ${toggleState === 0 ? 'initial' : 'activated'}`}>
        {/* Hero section: initial occupies full available height; activated uses computed px */}
        <motion.section
          className="hero"
          animate={{ height: toggleState === 0 ? 'var(--available-height)' : 'var(--hero-height-px)' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ position: 'relative' }}
        >
          <img src={heroSrc} alt={heroAlt} draggable={false} />

          {/* Clickable overlay with ping ring (invisible PNG until hover) */}
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
            onClick={handleToggle}
            role="button"
            aria-label="Toggle analysis"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleToggle();
            }}
          >
            <span className="absolute inset-0 rounded-full bg-white opacity-50 animate-ping"></span>

            <motion.img
              src={overlaySrc}
              alt=""
              aria-hidden="true"
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
            height: toggleState === 1 ? 'var(--second-height-px)' : 0,
            opacity: toggleState === 1 ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <img src={secondSrc} alt={secondAlt} draggable={false} />
        </motion.section>

        <motion.section
          className="third-render"
          animate={{
            height: toggleState === 2 ? 'var(--third-height-px)' : 0,
            opacity: toggleState === 2 ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <img src={thirdSrc} alt={thirdAlt} draggable={false} />
        </motion.section>
      </div>
    </div>
  );
}
