'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import AspectRatioHeroSplit from '@/components/AspectRatioHeroSplit';

export default function SiteAnalysisPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      <AnimatePresence>
        {isMounted && (
          <motion.main 
            className="relative h-screen bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Header textColorClass="text-black" logoVariant="dark" />
            <AspectRatioHeroSplit
              heroSrc="/undergrad-projects/site-analysis/site-analysis.jpg"
              heroAlt="SOS Children's Village — Site Context Board"
              secondSrc="/undergrad-projects/site-analysis/site-analysis-l1.jpg"
              secondAlt="SOS Children's Village — Detailed Site Analysis"
              thirdSrc="/undergrad-projects/site-analysis/site-analysis-l2.jpg"
              thirdAlt="SOS Children's Village — Additional Analysis Layer"
              overlaySrc="/icons/ui/siteplan-toggle.png"
              overlayPositionInitial={{
                top: '69%',   // adjust after hero is correct
                left: '0.5%',
                width: '11.4%'
              }}
              overlayPositionActivated={{
                top: '69%',
                left: '0.5%',
                width: '11.4%'
              }}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}