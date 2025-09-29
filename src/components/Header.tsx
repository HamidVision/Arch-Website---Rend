'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useLogoNavigation } from '@/hooks/useLogoNavigation';

const ProjectsOverlay = dynamic(() => import('./ProjectsOverlay'), { ssr: false });
const HELoadingComponent = dynamic(() => import('./HE_Loading_Component'), { ssr: false });

interface HeaderProps {
  forceSolid?: boolean;
  backgroundClass?: string;
  textColorClass?: string; // NEW - for text/icon colors
  logoVariant?: 'light' | 'dark'; // NEW - for logo color variant
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
    router.push('/projects/momentum-hub'); // closest/first project for now
  };

  // Handle overlay state based on navigation
  useEffect(() => {
    if (pathname === '/' && shouldOpenOverlay) {
      // Open overlay when returning to home from a subpage
      setIsProjectsOpen(true);
      setShouldOpenOverlay(false);
    } else if (pathname !== '/' && isProjectsOpen) {
      // Close overlay when navigating away from home
      setIsProjectsOpen(false);
      setIsZoomed(false);
    }
  }, [pathname, shouldOpenOverlay]); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePortfolioToggle = () => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const pathDepth = pathSegments.length;

    if (pathname === '/') {
      // On home page: toggle overlay
      if (isProjectsOpen && !isZoomed) {
        // When overlay is open but not zoomed, zoom into middle tile
        setIsZoomed(true);
      } else if (isProjectsOpen && isZoomed) {
        // When zoomed, zoom out to normal view
        setIsZoomed(false);
      } else {
        // First click - open projects overlay
        setIsProjectsOpen(true);
        setIsZoomed(false);
      }
    } else if (pathDepth === 1) {
      // One level deep (e.g., /design-philosophy): go to home with overlay
      setShouldOpenOverlay(true);
      router.push('/');
    } else if (pathDepth >= 2) {
      // Two or more levels deep: go back one level
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
        className={`relative z-[70] h-6 w-8 focus:outline-none ${buttonColor}`}
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
      if (isProjectsOpen) {
        return isZoomed ? 'Zoom out' : 'Zoom in';
      }
      return 'View Portfolio';
    } else if (pathDepth === 1) {
      return 'Back to Portfolio';
    } else {
      return 'Go Back';
    }
  };

  const PortfolioToggleIcon: React.FC = () => {
    const strokeColor = textColorClass?.includes('black') ? 'black' : 'white';
    const buttonLabel = getPortfolioButtonLabel();
    
    return (
      <div className="relative group">
        <button 
          onClick={handlePortfolioToggle} 
          className="focus:outline-none" 
          aria-label={buttonLabel}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="6" height="6" rx="1" stroke={strokeColor} strokeWidth="1.5"/>
            <rect x="14" y="4" width="6" height="6" rx="1" stroke={strokeColor} strokeWidth="1.5"/>
            <rect x="4" y="14" width="6" height="6" rx="1" stroke={strokeColor} strokeWidth="1.5"/>
            <rect x="14" y="14" width="6" height="6" rx="1" stroke={strokeColor} strokeWidth="1.5"/>
          </svg>
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
  const transparentBg = 'bg-black/30';

  const klass = forceSolid ? `${base} ${solidBg}` : `${base} ${transparentBg}`;

  return (
    <>
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
            <HamburgerIcon onClick={() => setIsMenuOpen(!isMenuOpen)} isOpen={isMenuOpen} />
          </div>
        </nav>
      </header>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/75 z-[65] flex items-center justify-center">
          <nav className="text-center">
            <ul className="space-y-8 text-white">
              <li><Link href="/" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li><Link href="/projects" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</Link></li>
              <li><Link href="/about" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link></li>
              <li><Link href="/contact" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            </ul>
          </nav>
        </div>
      )}
      {isProjectsOpen && <ProjectsOverlay isZoomed={isZoomed} onClose={handleCloseProjects} />}
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
