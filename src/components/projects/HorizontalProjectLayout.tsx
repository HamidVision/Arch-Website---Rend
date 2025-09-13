'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectPanel {
  id: string;
  type: 'hero' | 'content';
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  alt?: string;
}

interface HorizontalProjectLayoutProps {
  panels: ProjectPanel[];
  backLink?: string;
  backLinkText?: string;
}

export default function HorizontalProjectLayout({ 
  panels, 
  backLink = '/undergrad-projects',
  backLinkText = 'Back to Projects'
}: HorizontalProjectLayoutProps) {
  const [viewMode, setViewMode] = useState<'hero' | 'analysis'>('hero');
  const [isSitePlanHovered, setIsSitePlanHovered] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [mainImageWidth, setMainImageWidth] = useState<number>(0);
  const analysisRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);

  const heroPanel = panels.find(p => p.type === 'hero');
  const contentPanel = panels.find(p => p.type === 'content');

  // Handle wheel scroll to switch between hero and analysis
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (viewMode === 'hero') {
        const scrollAmount = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        if (scrollAmount > 0 && contentPanel) {
          e.preventDefault();
          setViewMode('analysis');
        }
      } else if (viewMode === 'analysis' && analysisRef.current) {
        e.preventDefault();
        const scrollAmount = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        const scrollSpeed = 2;
        
        if (analysisRef.current.scrollLeft <= 0 && scrollAmount < 0) {
          setViewMode('hero');
        } else {
          analysisRef.current.scrollLeft += scrollAmount * scrollSpeed;
        }
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, [viewMode, contentPanel]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {

      if (e.key === 'Escape' && viewMode === 'analysis') {
        setViewMode('hero');
      }
      if (e.key === 'ArrowRight' && viewMode === 'hero' && contentPanel) {
        setViewMode('analysis');
      }
      if (e.key === 'ArrowLeft' && viewMode === 'analysis') {
        setViewMode('hero');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [viewMode, contentPanel]);

  // Measure main image width when it loads or resizes
  useEffect(() => {
    const updateImageWidth = () => {
      if (mainImageRef.current) {
        const width = mainImageRef.current.offsetWidth;
        console.log('Main image width:', width);
        setMainImageWidth(width);
      }
    };

    // Update width when image loads
    if (mainImageRef.current) {
      updateImageWidth();
    }

    // Update width when window resizes
    window.addEventListener('resize', updateImageWidth);
    return () => window.removeEventListener('resize', updateImageWidth);
  }, [viewMode, showDetailedView]);

  // Handle site plan click with synchronous width measurement
  const handleSitePlanClick = () => {
    console.log('Site plan clicked!');
    
    // Synchronously measure the current width before showing detailed view
    if (mainImageRef.current) {
      const currentWidth = mainImageRef.current.offsetWidth;
      console.log('Current main image width:', currentWidth);
      setMainImageWidth(currentWidth);
    }
    
    // Now show the detailed view
    setShowDetailedView(true);
  };

  return (
    <>

      {/* Global Header Layer - Outside main container to avoid stacking context issues */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        {/* HE Logo */}
        <div className="absolute top-8 left-8 pointer-events-auto">
          <Link href={backLink} className="text-white text-2xl font-semibold tracking-wide hover:text-gray-300 transition-colors">
            HE
          </Link>
        </div>

        {/* Portfolio and Menu Buttons */}
        <div className="absolute top-6 right-6 pointer-events-auto">
          <div className="flex items-center space-x-6">
            {/* Portfolio Button */}
            <button
              onClick={() => window.location.href = '/'}
              className="focus:outline-none"
              aria-label="Go to portfolio"
              title="Go to portfolio"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
                <rect x="14" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
                <rect x="4" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
                <rect x="14" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              </svg>
            </button>

            {/* Menu Button */}
            <button
              className="relative h-6 w-8 focus:outline-none"
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
                <span className="absolute block h-0.5 w-6 transform bg-white transition duration-300 ease-in-out -translate-y-1"></span>
                <span className="absolute block h-0.5 w-6 transform bg-white transition duration-300 ease-in-out translate-y-1"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="flex space-x-3">
            <button
              onClick={() => setViewMode('hero')}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                viewMode === 'hero' 
                  ? 'bg-white shadow-lg' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
            {contentPanel && (
              <button
                onClick={() => setViewMode('analysis')}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  viewMode === 'analysis' 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            )}
          </div>
        </div>


        {/* View Counter */}
        <div className="absolute bottom-8 right-8 pointer-events-none">
          <div className="text-white/70 text-sm bg-black/30 px-3 py-2 rounded backdrop-blur-sm">
            {viewMode === 'hero' ? '1' : '2'} / 2
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="h-screen overflow-hidden bg-white relative">
        {/* Hero View */}
        {viewMode === 'hero' && heroPanel && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-screen relative overflow-hidden"
          >
            <Image
              src={heroPanel.image}
              alt={heroPanel.alt || heroPanel.title}
              fill
              className="object-cover"
              priority
            />
            
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="absolute inset-0 flex flex-col justify-end items-start text-white z-10 p-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-left max-w-2xl"
              >
                <h1 className="text-6xl font-bold mb-4 tracking-wide">
                  {heroPanel.title}
                </h1>
                {heroPanel.subtitle && (
                  <h2 className="text-2xl mb-8 font-light">
                    {heroPanel.subtitle}
                  </h2>
                )}
                <p className="text-lg leading-relaxed opacity-90">
                  {heroPanel.description}
                </p>
              </motion.div>
            </div>

            {contentPanel && (
              <div className="absolute bottom-8 right-8 flex items-center space-x-4 text-white/80 z-20">
                <span className="text-sm">Scroll to explore</span>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}

        {/* Analysis View - NO motion wrapper to avoid stacking context */}
        {viewMode === 'analysis' && contentPanel && (
          <div
            key="analysis"
            className="h-screen w-screen bg-white overflow-x-auto overflow-y-hidden relative opacity-100"
            ref={analysisRef}
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: '#4a5568 #2d3748'
            }}
          >
            <div className="h-full flex flex-col items-center justify-center" style={{ width: 'max-content' }}>
              {/* Main Analysis Image - Resized when detailed view is shown */}
              <div className="relative flex items-center justify-center">
                <Image
                  ref={mainImageRef}
                  src={contentPanel.image}
                  alt={contentPanel.alt || contentPanel.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="object-contain"
                  priority
                  quality={100}
                  unoptimized={true}
                  style={{
                    height: showDetailedView ? '50vh' : '100vh',
                    width: 'auto',
                    transition: 'height 0.5s ease-in-out'
                  }}
                  onLoad={() => {
                    // Update width after image loads
                    setTimeout(() => {
                      if (mainImageRef.current) {
                        const width = mainImageRef.current.offsetWidth;
                        console.log('Main image loaded, width:', width);
                        setMainImageWidth(width);
                      }
                    }, 100);
                  }}
                />
                
                {/* Interactive Site Plan Overlay */}
                <div 
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    bottom: '15%',
                    left: '8%',
                    width: '25%',
                    height: '35%',
                    zIndex: 20
                  }}
                  onMouseEnter={() => {
                    console.log('Mouse entered site plan area');
                    setIsSitePlanHovered(true);
                  }}
                  onMouseLeave={() => {
                    console.log('Mouse left site plan area');
                    setIsSitePlanHovered(false);
                  }}
                  onClick={handleSitePlanClick}
                >
                  {/* Hover Effect */}
                  <div 
                    className={`absolute inset-0 bg-blue-500/20 border-2 border-blue-500 rounded-lg transition-all duration-300 ${
                      isSitePlanHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                    }`}
                  />
                  
                  {/* Click Indicator */}
                  {isSitePlanHovered && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Click to view details
                    </div>
                  )}
                  
                  {/* Debug: Always visible click area for testing */}
                  <div className="absolute inset-0 border border-red-500 opacity-30 pointer-events-none" />
                </div>
              </div>
              
              {/* Detailed View Image - Appears below the hero image with matching width */}
              {showDetailedView && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src="/undergrad-projects/site-analysis/site-analysis-l1.jpg"
                    alt="Detailed Site Analysis"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain"
                    priority
                    quality={100}
                    unoptimized={true}
                    style={{
                      height: '50vh',
                      width: mainImageWidth > 0 ? `${mainImageWidth}px` : 'auto'
                    }}
                  />
                </motion.div>
              )}
            </div>

            {/* Back Button */}
            <button
              onClick={() => showDetailedView ? setShowDetailedView(false) : setViewMode('hero')}
              className="absolute top-8 left-24 text-gray-800/70 hover:text-gray-800 transition-colors z-10"
            >
              ← {showDetailedView ? 'Back to Analysis' : 'Back to Hero'}
            </button>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-8 bg-gray-800/30 text-white px-3 py-2 rounded backdrop-blur-sm text-sm z-10">
              Scroll horizontally to explore →
            </div>
          </div>
        )}
      </div>
    </>
  );
}