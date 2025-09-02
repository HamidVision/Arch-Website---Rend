'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ProjectsOverlay = dynamic(() => import('./ProjectsOverlay'), { ssr: false });

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const router = useRouter();

  const navigateToFirstProject = () => {
    router.push('/projects/momentum-hub'); // closest/first project for now
  };

  const handlePortfolioToggle = () => {
    if (isProjectsOpen) {
      // When overlay already open, go to first project (acts like clicking a project)
      navigateToFirstProject();
    } else {
      setIsProjectsOpen(true);
    }
  };

  const HamburgerIcon: React.FC<{ onClick: () => void; isOpen: boolean }> = ({ onClick, isOpen }) => (
    <button
      className="relative z-[70] h-6 w-8 focus:outline-none"
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
  
  const PortfolioToggleIcon: React.FC = () => (
    <button onClick={handlePortfolioToggle} className="focus:outline-none" aria-label="Toggle projects overlay or open project">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
        <rect x="14" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
        <rect x="4" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
        <rect x="14" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
      </svg>
    </button>
  );

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[70] transition-colors duration-300 bg-black/30">
        <nav className="w-full px-6 py-5 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="focus:outline-none" aria-label="Go to homepage">
            <div className="relative h-8 w-8 overflow-visible flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Architecture Portfolio Logo"
                fill
                className="object-contain pointer-events-none transform-gpu origin-center scale-[1.5] will-change-transform"
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
      {isProjectsOpen && <ProjectsOverlay />}
    </>
  );
};

export default Header;
