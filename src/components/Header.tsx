'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useLogoNavigation } from '@/hooks/useLogoNavigation';
import NavigationMenu from './NavigationMenu';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioIconAnimated from './animations/PortfolioIconAnimated';

const ProjectsOverlay = dynamic(() => import('./ProjectsOverlay'), { ssr: false });
const HELoadingComponent = dynamic(() => import('./HE_Loading_Component'), { ssr: false });

// Inner component to handle search params with Suspense
const SearchParamsHandler = ({ onOpenProjects }: { onOpenProjects: () => void }) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if URL has ?openProjects=true
    const hasUrlParam = searchParams?.get('openProjects') === 'true';

    if (hasUrlParam) {
      onOpenProjects();
      // Clean up URL without refresh
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [searchParams, onOpenProjects]);

  return null;
};

interface HeaderProps {
  forceSolid?: boolean;
  backgroundClass?: string;
  textColorClass?: string;
  logoVariant?: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ forceSolid = false, backgroundClass, textColorClass, logoVariant = 'light' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [shouldOpenOverlay, setShouldOpenOverlay] = useState(false);
  const { showLoading, handleLogoClick } = useLogoNavigation();
  const router = useRouter();
  const pathname = usePathname();

  const navigateToFirstProject = () => {
    router.push('/projects/momentum-hub');
  };

  // Handle overlay state based on navigation
  useEffect(() => {
    if (pathname === '/' && shouldOpenOverlay) {
      setIsProjectsOpen(true);
      setShouldOpenOverlay(false);
    } else if (pathname !== '/' && isProjectsOpen) {
      setIsProjectsOpen(false);
      setIsZoomed(false);
    }
  }, [pathname, shouldOpenOverlay]);

  const handlePortfolioToggle = () => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const pathDepth = pathSegments.length;

    if (pathname === '/') {
      // Toggle overlay on Home
      if (isProjectsOpen) {
        setIsProjectsOpen(false);
        setIsZoomed(false);
      } else {
        setIsProjectsOpen(true);
        setIsZoomed(false);
      }
    } else if (pathDepth === 1) {
      // Category Page -> Home (Depth 1)
      router.push('/?openProjects=true');
    } else if (pathDepth >= 2) {
      // Project Page -> Category Page (Depth > 1)
      const parentPath = '/' + pathSegments.slice(0, -1).join('/');
      router.push(parentPath);
    }
  };

  const handleCloseProjects = () => {
    setIsProjectsOpen(false);
    setIsZoomed(false);
  };


  const HamburgerIcon: React.FC<{ onClick: () => void; isOpen: boolean }> = ({ onClick, isOpen }) => {
    const buttonColor = textColorClass || 'text-white';
    return (
      <button
        className={`relative z-[201] h-6 w-8 focus:outline-none ${buttonColor}`} // High z-index to stay above menu
        onClick={onClick}
        aria-label="Toggle menu"
      >
        <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className={`absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
              isOpen ? 'rotate-45' : '-translate-y-1'
            }`}
          ></span>
          <span
            aria-hidden="true"
            className={`absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
              isOpen ? '-rotate-45' : 'translate-y-1'
            }`}
          ></span>
        </div>
      </button>
    );
  };
  
  const getPortfolioButtonLabel = () => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const pathDepth = pathSegments.length;

    if (pathname === '/') {
      return isProjectsOpen ? 'Close Portfolio' : 'View Portfolio';
    } else if (pathDepth === 1) {
      return 'Back to Portfolio';
    } else {
      return 'Back to Projects';
    }
  };

  const PortfolioToggleIcon: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const strokeColor = textColorClass?.includes('black') ? 'black' : 'white';
    const buttonLabel = getPortfolioButtonLabel();
    
    return (
      <div className="relative group">
        <button 
          onClick={handlePortfolioToggle} 
          className="focus:outline-none" 
          aria-label={buttonLabel}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <PortfolioIconAnimated
            isHovered={isHovered}
            isActive={isProjectsOpen}
            strokeColor={strokeColor}
            size={24}
          />
        </button>
        {/* Tooltip */}
        <div className="absolute top-full mt-2 right-0 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          {buttonLabel}
        </div>
      </div>
    );
  };

  const base = 'fixed top-0 left-0 w-full z-[70] transition-colors duration-300';
  const solidBg = backgroundClass || 'bg-black/60 backdrop-blur-sm';
  const transparentBg = 'bg-transparent'; // Fully transparent like home page

  const klass = forceSolid ? `${base} ${solidBg}` : `${base} ${transparentBg}`;

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler onOpenProjects={() => setIsProjectsOpen(true)} />
      </Suspense>

      <header className={klass}>
        <nav className="w-full px-6 py-5 flex justify-between items-center">
          <button onClick={handleLogoClick} className="focus:outline-none" aria-label="Go to homepage">
            <div className="relative h-6 w-6 overflow-visible flex items-center justify-center">
              <Image
                src={logoVariant === 'dark' ? "/icons/ui/logo-header.svg" : "/icons/ui/logo-header-white.png"}
                alt="Architecture Portfolio Logo"
                fill
                className="object-contain pointer-events-none transform-gpu origin-center scale-[3] will-change-transform"
                priority
              />
            </div>
          </button>
          <div className="flex items-center space-x-6">
            <PortfolioToggleIcon />
            {/* Pass isOpen to hamburger to handle animation */}
            <HamburgerIcon onClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />
          </div>
        </nav>
      </header>
      
      {/* Replaced hardcoded menu with shared NavigationMenu */}
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <AnimatePresence>
        {isProjectsOpen && (
          <motion.div
            key="projects-overlay-wrapper"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60]"
          >
            <ProjectsOverlay isZoomed={isZoomed} onClose={handleCloseProjects} />
          </motion.div>
        )}
      </AnimatePresence>
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
    </>
  );
};

export default Header;
