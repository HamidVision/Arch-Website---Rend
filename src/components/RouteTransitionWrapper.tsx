'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useLayoutEffect } from 'react';

// Use usage-safe layout effect to avoid SSR warnings
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function RouteTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Dynamically adjust body background based on project section
  // Default is BLACK (defined in globals.css). We only explicitly set WHITE for undergrad.
  useIsomorphicLayoutEffect(() => {
    if (pathname?.startsWith('/undergrad-projects') || pathname?.startsWith('/graduate-projects')) {
      document.body.style.backgroundColor = '#ffffff';
    } else {
      // For Home or other pages, enforce Black
      document.body.style.backgroundColor = '#000000';
    }
  }, [pathname]);
  
  // Skip animation wrapper for pages with custom horizontal scroll to prevent stacking context issues
  if (pathname === '/undergrad-projects/congregation-center' || pathname === '/graduate-projects/wellness-bazaar') {
    return <>{children}</>;
  }
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.2, 
          ease: 'easeInOut'
        }}
        // Add transform safeguards
        style={{ 
          willChange: 'auto' 
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
