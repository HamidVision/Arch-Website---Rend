'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import NavigationMenu from '@/components/NavigationMenu';
import PortfolioIconAnimated from '@/components/animations/PortfolioIconAnimated';
import { useLogoNavigation } from '@/hooks/useLogoNavigation';

const ProjectsOverlay = dynamic(() => import('@/components/ProjectsOverlay'), { ssr: false });
const HELoadingComponent = dynamic(() => import('@/components/HE_Loading_Component'), { ssr: false });

// Portfolio tile images to preload for instant overlay display
const portfolioImages = [
  '/design-philosophy/design-philosophy-tile.jpg',
  '/undergrad-projects/main-tile.jpg',
  '/graduate-projects/grad-hero.jpg',
  '/computer-science/computer-science-tile.webp',
  '/research-papers/research-tile.jpg',
  '/about/about-me-tile.png',
  '/contact/contact-tile.png',
];

export default function HomeContent() {
  const [phase, setPhase] = useState<'intro' | 'slid'>('intro');
  const [showCenterIcon, setShowCenterIcon] = useState(true);
  const [isIconHovered, setIsIconHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const { showLoading, handleLogoClick } = useLogoNavigation();

  // Preload portfolio images on mount
  useEffect(() => {
    const preloadImages = async () => {
      await Promise.all(
        portfolioImages.map(url => {
          return new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = url;
          });
        })
      );
    };
    preloadImages();
  }, []);

  // Check if user has clicked center icon before
  useEffect(() => {
    const hasClickedBefore = sessionStorage.getItem('hasClickedCenterPortfolio');
    if (hasClickedBefore) {
      setShowCenterIcon(false);
      setPhase('slid');
    }
  }, []);

  // Auto-slide titles after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('slid');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCenterIconClick = () => {
    sessionStorage.setItem('hasClickedCenterPortfolio', 'true');
    setShowCenterIcon(false);
    setIsProjectsOpen(true);
  };

  const handlePortfolioToggle = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Background Image with Auto-Scroll on Mobile */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 w-[200%] sm:w-full h-full animate-hero-pan sm:animate-none">
          <Image 
            src="/images/hero.jpg" 
            alt="Architectural Hero Background"
            fill
            className="object-cover"
            priority
            sizes="200vw"
            style={{
              objectPosition: 'left center'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Transparent Header */}
      <header className="fixed top-0 left-0 w-full z-[70]">
        <nav className="w-full px-6 py-5 flex justify-between items-center">
          <button onClick={handleLogoClick} className="focus:outline-none" aria-label="Go to homepage">
            <div className="relative h-6 w-6 overflow-visible flex items-center justify-center">
              <Image
                src="/icons/ui/logo-header-white.png"
                alt="Architecture Portfolio Logo"
                fill
                className="object-contain pointer-events-none transform-gpu origin-center scale-[3] will-change-transform"
                priority
              />
            </div>
          </button>
          <div className="flex items-center space-x-6">
            {/* Portfolio Toggle */}
            <div className="relative group">
              <button 
                onClick={handlePortfolioToggle}
                className="focus:outline-none"
                aria-label="View Portfolio"
              >
                <PortfolioIconAnimated
                  isHovered={false}
                  isActive={isProjectsOpen}
                  strokeColor="white"
                  size={24}
                />
              </button>
              <div className="absolute top-full mt-2 right-0 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                View Portfolio
              </div>
            </div>
            {/* Hamburger Menu */}
            <button
              className="relative z-[201] h-6 w-8 focus:outline-none text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
                <span
                  className={`absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
                    isMenuOpen ? 'rotate-45' : '-translate-y-1'
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
                    isMenuOpen ? '-rotate-45' : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>
      
      {/* Navigation Menu */}
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* Main Content Area */}
      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Title Section - Animated position */}
        <motion.div 
          className="px-6 pt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: phase === 'slid' ? 0 : 100,
          }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="text-center">
            {/* Main Title - responsive sizing, smaller on laptops to avoid overlay conflict */}
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light tracking-[0.1em] sm:tracking-[0.15em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              Architecture, Design & AI
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl tracking-wider mt-2 sm:mt-3 text-white/70 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
            >
              by Hamid
            </motion.p>
          </div>
        </motion.div>

        {/* Center Portfolio Icon - Only shown until first click */}
        <AnimatePresence>
          {showCenterIcon && phase === 'slid' && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={handleCenterIconClick}
                onMouseEnter={() => setIsIconHovered(true)}
                onMouseLeave={() => setIsIconHovered(false)}
                className="flex flex-col items-center gap-4 group focus:outline-none"
              >
                {/* View Portfolio Text */}
                <motion.span 
                  className="text-sm tracking-widest uppercase text-white/70 group-hover:text-white transition-colors"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  View Portfolio
                </motion.span>
                
                {/* Large Animated Icon */}
                <motion.div
                  className="p-4 rounded-full border border-white/30 group-hover:border-white/60 group-hover:bg-white/5 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PortfolioIconAnimated
                    isHovered={isIconHovered}
                    isActive={false}
                    strokeColor="white"
                    size={48}
                  />
                </motion.div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator (shown after center icon is dismissed) */}
        {phase === 'slid' && !showCenterIcon && (
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="w-6 h-10 border border-white/30 rounded-full flex justify-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div 
                className="w-1 h-2 bg-white/50 rounded-full mt-2"
                animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* Projects Overlay */}
      <AnimatePresence>
        {isProjectsOpen && (
          <motion.div
            key="projects-overlay-wrapper"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60]"
          >
            <ProjectsOverlay isZoomed={false} onClose={() => setIsProjectsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading overlay for navigation */}
      {showLoading && (
        <div className="fixed inset-0 z-[9999]">
          <HELoadingComponent
            variant="splash"
            timeoutMs={2000}
            logoUrl="/brand/logo-loading.png"
            subtitle="Architecture & Design Studio"
            tagline="Creating spaces that inspire"
          />
        </div>
      )}
    </div>
  );
}
