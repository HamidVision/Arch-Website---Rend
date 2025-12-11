'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function RouteTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
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
