'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AspectRatioHeroSplit from '@/components/AspectRatioHeroSplit';

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
  useAspectRatioSplit?: boolean;
  aspectRatio?: string;
}

export default function HorizontalProjectLayout({ 
  panels, 
  backLink = '/undergrad-projects',
  backLinkText = 'Back to Projects',
  useAspectRatioSplit = false,
  aspectRatio = "16/9"
}: HorizontalProjectLayoutProps) {
  const [showGrid, setShowGrid] = useState(false);
  const [isSitePlanHovered, setIsSitePlanHovered] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [mainImageWidth, setMainImageWidth] = useState<number>(0);
  const analysisRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLImageElement>(null);

  const heroPanel = panels.find(p => p.type === 'hero');
  const contentPanel = panels.find(p => p.type === 'content');
  
  // Set initial view mode based on available panels
  const [viewMode, setViewMode] = useState<'hero' | 'analysis'>(
    panels.find(p => p.type === 'hero') ? 'hero' : 'analysis'
  );

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
      // Grid toggle (works in both modes)
      if (e.key.toLowerCase() === 'g') {
        e.preventDefault();
        setShowGrid(prev => !prev);
        return;
      }

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
        setMainImageWidth(width);
      }
    };

    updateImageWidth();
    window.addEventListener('resize', updateImageWidth);
    return () => window.removeEventListener('resize', updateImageWidth);
  }, [showDetailedView]);

  const handleSitePlanClick = () => {
    if (mainImageRef.current) {
      const currentWidth = mainImageRef.current.offsetWidth;
      setMainImageWidth(currentWidth);
    }
    setShowDetailedView(true);
  };

  const handleBackClick = () => {
    if (showDetailedView) {
      setShowDetailedView(false);
    } else {
      setViewMode('hero');
    }
  };

  // Grid overlay component
  const GridOverlay = () => {
    if (!showGrid) return null;

    const gridLines = [];
    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // Vertical grid lines
    for (let i = 0; i <= 26; i++) {
      const left = (i / 26) * 100;
      gridLines.push(
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-red-500/30 z-40"
          style={{ left: `${left}%` }}
        />
      );
      
      // Add labels
      if (i < labels.length) {
        gridLines.push(
          <div
            key={`label-${i}`}
            className="absolute top-2 text-red-500 text-xs font-mono z-40"
            style={{ left: `${left}%`, transform: 'translateX(-50%)' }}
          >
            {labels[i]}
          </div>
        );
      }
    }

    // Horizontal grid lines
    for (let i = 0; i <= 20; i++) {
      const top = (i / 20) * 100;
      gridLines.push(
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-red-500/30 z-40"
          style={{ top: `${top}%` }}
        />
      );
    }

    return <div className="absolute inset-0 pointer-events-none">{gridLines}</div>;
  };

  // Hero content for aspect ratio split
  const heroContent = heroPanel ? (
    <div className="relative h-full w-full bg-black">
      <Image
        src={heroPanel.image}
        alt={heroPanel.alt || heroPanel.title}
        fill
        className="object-contain"
        priority
        quality={100}
        unoptimized={true}
      />
      <div className="absolute inset-0 flex flex-col justify-end items-start text-white z-10 p-8">
        <motion.div className="text-left max-w-2xl">
          <h1 className="text-6xl font-bold mb-4 tracking-wide">{heroPanel.title}</h1>
          {heroPanel.subtitle && (
            <h2 className="text-2xl mb-8 font-light">{heroPanel.subtitle}</h2>
          )}
          <p className="text-lg leading-relaxed opacity-90">{heroPanel.description}</p>
        </motion.div>
      </div>
    </div>
  ) : (
    // Fallback when no hero panel - show analysis content in hero section
    <div className="relative h-full w-full bg-white">
      {contentPanel && (
        <div className="h-full flex items-center justify-center">
          <Image
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
              height: '100vh',
              width: 'auto'
            }}
          />
        </div>
      )}
    </div>
  );

  // Analysis content for aspect ratio split
  const analysisContent = contentPanel ? (
    <div className="relative h-full w-full bg-white">
      <div className="h-full flex flex-col items-center justify-center" style={{ width: 'max-content' }}>
        {/* Main Analysis Image */}
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
          />
          
          {/* Interactive Site Plan Overlay */}
          <div
            className="absolute inset-0 cursor-pointer z-20"
            style={{
              left: '60%',
              top: '20%',
              width: '25%',
              height: '40%',
              border: isSitePlanHovered ? '2px solid #3b82f6' : '2px solid transparent',
              borderRadius: '8px',
              backgroundColor: isSitePlanHovered ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              transition: 'all 0.3s ease',
              transform: isSitePlanHovered ? 'scale(1.02)' : 'scale(1)'
            }}
            onMouseEnter={() => setIsSitePlanHovered(true)}
            onMouseLeave={() => setIsSitePlanHovered(false)}
            onClick={handleSitePlanClick}
          >
            {isSitePlanHovered && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                Click to view details
              </div>
            )}
          </div>
        </div>

        {/* Detailed View Image */}
        {showDetailedView && (
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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

      {/* Navigation */}
      <button
        onClick={handleBackClick}
        className="absolute top-8 left-24 text-gray-800/70 hover:text-gray-800 transition-colors z-10"
      >
        ← {showDetailedView ? 'Back to Analysis' : 'Back to Hero'}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 bg-gray-800/30 text-white px-3 py-2 rounded backdrop-blur-sm text-sm z-10">
        Scroll horizontally to explore →
      </div>
    </div>
  ) : null;

  // If using aspect ratio split, render with the new component
  if (useAspectRatioSplit && heroContent && analysisContent) {
    return (
      <>
        <AspectRatioHeroSplit
          aspectRatio={aspectRatio}
          heroContent={heroContent}
          secondContent={analysisContent}
          triggerText="View Analysis"
          className="relative"
        />
        <GridOverlay />
      </>
    );
  }

  // Original implementation for backward compatibility
  return (
    <>
      <div className="relative h-screen overflow-hidden bg-white">
        {/* Grid Overlay */}
        <GridOverlay />

        {/* Hero View */}
        {viewMode === 'hero' && heroPanel && (
          <div className="relative h-full w-full">
            <Image
              src={heroPanel.image}
              alt={heroPanel.alt || heroPanel.title}
              fill
              className="object-cover"
              priority
              quality={100}
              unoptimized={true}
            />
            <div className="absolute inset-0 flex flex-col justify-end items-start text-white z-10 p-8">
              <motion.div className="text-left max-w-2xl">
                <h1 className="text-6xl font-bold mb-4 tracking-wide">{heroPanel.title}</h1>
                {heroPanel.subtitle && (
                  <h2 className="text-2xl mb-8 font-light">{heroPanel.subtitle}</h2>
                )}
                <p className="text-lg leading-relaxed opacity-90">{heroPanel.description}</p>
              </motion.div>
            </div>

            {/* Navigation */}
            <Link
              href={backLink}
              className="absolute top-8 left-8 text-white/70 hover:text-white transition-colors z-10"
            >
              ← {backLinkText}
            </Link>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-8 bg-gray-800/30 text-white px-3 py-2 rounded backdrop-blur-sm text-sm z-10">
              Scroll horizontally to explore →
            </div>
          </div>
        )}

        {/* Analysis View */}
        {viewMode === 'analysis' && contentPanel && (
          <div 
            ref={analysisRef}
            className="relative h-full w-full bg-white overflow-x-auto scrollbar-hide"
          >
            <div className="h-full flex flex-col items-center justify-center" style={{ width: 'max-content' }}>
              {/* Main Analysis Image */}
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
                />
                
                {/* Interactive Site Plan Overlay */}
                <div
                  className="absolute inset-0 cursor-pointer z-20"
                  style={{
                    left: '60%',
                    top: '20%',
                    width: '25%',
                    height: '40%',
                    border: isSitePlanHovered ? '2px solid #3b82f6' : '2px solid transparent',
                    borderRadius: '8px',
                    backgroundColor: isSitePlanHovered ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    transition: 'all 0.3s ease',
                    transform: isSitePlanHovered ? 'scale(1.02)' : 'scale(1)'
                  }}
                  onMouseEnter={() => setIsSitePlanHovered(true)}
                  onMouseLeave={() => setIsSitePlanHovered(false)}
                  onClick={handleSitePlanClick}
                >
                  {isSitePlanHovered && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                      Click to view details
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed View Image */}
              {showDetailedView && (
                <motion.div 
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
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

            {/* Navigation */}
            <button
              onClick={handleBackClick}
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
