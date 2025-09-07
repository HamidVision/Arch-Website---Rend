'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const UndergradProjectsPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [isWidescreen, setIsWidescreen] = useState(false);
  const [isHorizontalScrollMode, setIsHorizontalScrollMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showGrid, setShowGrid] = useState(false); // Grid starts hidden

  const projects = [
    {
      id: 'site-analysis',
      title: 'Site Analysis',
      subtitle: 'Understanding Context & Place',
      description: 'Comprehensive analysis of site conditions, environmental factors, and contextual relationships that inform architectural decisions.',
      color: 'from-emerald-600 to-teal-600',
      image: '/undergrad-projects/site-analysis/site-tile.jpg',
      detailImage: '/undergrad-projects/site-analysis/site-analysis.jpg'
    },
    {
      id: 'border-crossing',
      title: 'Border Crossing',
      subtitle: 'Thresholds & Transitions',
      description: 'Exploration of architectural thresholds, spatial transitions, and the design of boundary conditions that define and connect spaces.',
      color: 'from-blue-600 to-indigo-600',
      image: '/undergrad-projects/border-crossing/border-tile.jpg'
    },
    {
      id: 'congregation-center',
      title: 'Congregation Center',
      subtitle: 'Community & Gathering',
      description: 'Design for communal spaces that foster connection, facilitate gatherings, and create meaningful social interactions.',
      color: 'from-purple-600 to-pink-600',
      image: '/undergrad-projects/congregation-center/congregation-tile.jpg'
    }
  ];

  // Check if we're in horizontal scroll mode based on URL
  useEffect(() => {
    const projectId = pathname.split('/').pop();
    if (projectId && projectId !== 'undergrad-projects') {
      setIsHorizontalScrollMode(true);
      // Find the project index
      const projectIndex = projects.findIndex(p => p.id === projectId);
      if (projectIndex !== -1) {
        setCurrentProject(projectIndex);
      }
    } else {
      setIsHorizontalScrollMode(false);
    }
  }, [pathname]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isWide = aspectRatio > 1.5; // Only use split-screen for truly widescreen ratios (16:9+)
      // console.log(`Aspect ratio: ${aspectRatio.toFixed(2)}, isWidescreen: ${isWide}, width: ${window.innerWidth}, height: ${window.innerHeight}`);
      setIsWidescreen(isWide);
    };
    
    checkMobile();
    checkAspectRatio();
    window.addEventListener('resize', () => {
      checkMobile();
      checkAspectRatio();
    });
    
    // Track scroll position to update current project
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const projectIndex = Math.floor(scrollPosition / windowHeight);
      setCurrentProject(Math.max(0, Math.min(projectIndex, projects.length)));
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', () => {
        checkMobile();
        checkAspectRatio();
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [projects.length]);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/undergrad-projects/${projectId}`);
  };

  // Handle horizontal scroll navigation
  const handleHorizontalScroll = (direction: 'left' | 'right') => {
    if (isScrolling || !isHorizontalScrollMode) return;
    
    setIsScrolling(true);
    
    if (direction === 'left') {
      setCurrentImageIndex(prev => prev === 0 ? 0 : prev - 1);
    } else {
      setCurrentImageIndex(prev => prev + 1);
    }
    
    setTimeout(() => setIsScrolling(false), 300);
  };

  // Handle keyboard navigation for horizontal scroll and grid toggle
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log('Key pressed:', e.key); // Debug log
      
      // Grid toggle (works in both modes)
      if (e.key.toLowerCase() === 'g') {
        e.preventDefault();
        console.log('Toggling grid'); // Debug log
        setShowGrid(prev => {
          console.log('Grid toggle from', prev, 'to', !prev);
          return !prev;
        });
        return;
      }
      
      if (!isHorizontalScrollMode) return;
      
      if (e.key === 'ArrowLeft') handleHorizontalScroll('left');
      if (e.key === 'ArrowRight') handleHorizontalScroll('right');
      if (e.key === 'Escape') router.push('/undergrad-projects');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isHorizontalScrollMode, router]); // Removed showGrid from dependencies

  return (
    <div className={`min-h-screen relative overflow-hidden ${isHorizontalScrollMode ? 'bg-white' : 'bg-black'}`}>
      {/* Architectural Grid System - Only show when showGrid is true */}
      {showGrid && (
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 9999 }}
        >
          {/* Vertical Grid Lines with Numbers */}
          {Array.from({ length: 25 }, (_, i) => (
            <div key={`v-${i}`}>
              <div
                className="absolute top-0 bottom-0 border-l border-red-500/30"
                style={{
                  left: `${(i * 4)}%`,
                  width: '1px'
                }}
              />
              {/* Vertical Line Numbers */}
              <div
                className="absolute top-1 text-red-500 text-xs font-mono bg-white/80 px-1 rounded"
                style={{
                  left: `${(i * 4)}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {i + 1}
              </div>
            </div>
          ))}
          
          {/* Horizontal Grid Lines with Letters */}
          {Array.from({ length: 19 }, (_, i) => (
            <div key={`h-${i}`}>
              <div
                className="absolute left-0 right-0 border-t border-red-500/30"
                style={{
                  top: `${(i * 5.55)}%`,
                  height: '1px'
                }}
              />
              {/* Horizontal Line Letters */}
              <div
                className="absolute left-1 text-red-500 text-xs font-mono bg-white/80 px-1 rounded"
                style={{
                  top: `${(i * 5.55)}%`,
                  transform: 'translateY(-50%)'
                }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            </div>
          ))}
          
          {/* Center Cross Lines */}
          <div className="absolute top-0 bottom-0 left-1/2 border-l border-red-500/50 w-px" />
          <div className="absolute left-0 right-0 top-1/2 border-t border-red-500/50 h-px" />
          
          {/* Grid Info */}
          <div 
            className="absolute top-2 left-2 text-red-500 text-xs font-mono bg-white/90 px-2 py-1 rounded border border-red-500/50"
            style={{ zIndex: 10000 }}
          >
            GRID: ON (Press G to toggle) | Format: Letter-Number (e.g., C-7)
          </div>
        </div>
      )}

      {/* Navigation - Always visible */}
      <button
        onClick={handleBackClick}
        className={`fixed top-8 left-8 text-2xl font-semibold tracking-wide transition-colors z-[100] bg-transparent border-none outline-none cursor-pointer ${isHorizontalScrollMode ? 'text-gray-800 hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
        aria-label="Go to homepage"
        style={{ zIndex: 100 }}
      >
        HE
      </button>

      {/* Grid Toggle Button - Temporary for testing */}
      <button
        onClick={() => {
          console.log('Button clicked, current showGrid:', showGrid);
          setShowGrid(!showGrid);
          console.log('Button clicked, new showGrid:', !showGrid);
        }}
        className="fixed top-8 right-8 bg-red-500 text-white px-3 py-1 text-xs rounded z-[100]"
        style={{ zIndex: 100 }}
      >
        Grid: {showGrid ? 'ON' : 'OFF'}
      </button>

      {/* Portfolio and Menu Buttons - Always visible */}
      <div className="fixed top-0 right-0 z-[100] p-6" style={{ zIndex: 100 }}>
        <div className="flex items-center space-x-6">
          {/* Portfolio Button */}
          <motion.button
            onClick={() => router.push('/')}
            className="focus:outline-none relative z-[100]"
            aria-label="Go to portfolio"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ zIndex: 100 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="6" height="6" rx="1" stroke={isHorizontalScrollMode ? "rgb(31, 41, 55)" : "white"} strokeWidth="1.5"/>
              <rect x="14" y="4" width="6" height="6" rx="1" stroke={isHorizontalScrollMode ? "rgb(31, 41, 55)" : "white"} strokeWidth="1.5"/>
              <rect x="4" y="14" width="6" height="6" rx="1" stroke={isHorizontalScrollMode ? "rgb(31, 41, 55)" : "white"} strokeWidth="1.5"/>
              <rect x="14" y="14" width="6" height="6" rx="1" stroke={isHorizontalScrollMode ? "rgb(31, 41, 55)" : "white"} strokeWidth="1.5"/>
            </svg>
          </motion.button>

          {/* Menu Button */}
          <motion.button
            className={`relative z-[100] h-6 w-8 focus:outline-none ${isHorizontalScrollMode ? 'text-gray-800' : 'text-white'}`}
            aria-label="Toggle menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ zIndex: 100 }}
          >
            <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
              <span aria-hidden="true" className="absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out -translate-y-1"></span>
              <span aria-hidden="true" className="absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out translate-y-1"></span>
            </div>
          </motion.button>
        </div>
      </div>


      {/* Main Content - Show horizontal scroll if in horizontal scroll mode */}
      {isHorizontalScrollMode ? (
        <div className="h-screen bg-white relative overflow-hidden" style={{ zIndex: 1 }}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200"></div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => handleHorizontalScroll('left')}
            disabled={isScrolling || currentImageIndex === 0}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/20 hover:bg-gray-800/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 disabled:opacity-50"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => handleHorizontalScroll('right')}
            disabled={isScrolling}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800/20 hover:bg-gray-800/30 backdrop-blur-sm rounded-full p-4 transition-all duration-300 disabled:opacity-50"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container - Positioned so bottom sits on M grid line (66.6%) */}
          <div className="h-full flex items-end justify-center px-20" style={{ paddingBottom: '33.4%' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="max-w-full max-h-full"
              >
                <div className="relative">
                  <Image
                    src={projects[currentProject].detailImage || projects[currentProject].image}
                    alt={projects[currentProject].title}
                    width={2000}
                    height={1200}
                    className="w-auto h-screen object-contain"
                    priority
                  />
                  
                  {/* Image Caption */}
                  <div className="absolute bottom-4 left-4 bg-gray-800/70 text-white px-4 py-2 rounded backdrop-blur-sm">
                    <p className="text-sm">{projects[currentProject].title} - Detail View</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>


          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button
              onClick={() => setCurrentImageIndex(0)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImageIndex === 0 
                  ? 'bg-gray-800' 
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label="Go to first image"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-8 right-8 text-gray-600 text-sm">
            {currentImageIndex + 1} / 1
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.push('/undergrad-projects')}
            className="absolute top-8 left-8 text-gray-800 text-2xl font-semibold tracking-wide hover:text-gray-600 transition-colors z-[70] bg-transparent border-none outline-none cursor-pointer"
            aria-label="Back to projects"
          >
            ← Back to Projects
          </button>
        </div>
      ) : (
        <motion.div
          className={`relative h-screen w-full ${isWidescreen ? 'flex' : 'overflow-hidden'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Side - White Background with Text (only on widescreen) */}
          {isWidescreen && (
            <div className="w-2/5 bg-white flex flex-col justify-end p-8 md:p-12 pb-32">
              <motion.div
                className="max-w-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-7xl font-title text-gray-800 mb-6 tracking-wider uppercase">
                  Undergrad Projects
                </h1>
                <p className="text-xl md:text-2xl font-body text-gray-600 max-w-2xl leading-relaxed">
                  Early architectural explorations and foundational design projects from undergraduate studies.
                </p>
              </motion.div>
            </div>
          )}

          {/* Right Side - Background Image */}
          <div className={`${isWidescreen ? 'w-3/5' : 'w-full'} relative overflow-hidden bg-gray-200 h-screen`}>
            <img
              src="/undergrad-projects/main-tile.jpg"
              alt="Undergraduate Projects"
              className="w-full h-screen object-cover object-bottom"
              onError={(e) => {/* Image load error */}}
              onLoad={() => {/* Image loaded successfully */}}
            />
            {!isWidescreen && <div className="absolute inset-0 bg-black/40" />}
          </div>

          {/* Overlay Content (only on 4:3/square) */}
          {!isWidescreen && (
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 pb-32">
              <motion.div
                className="max-w-4xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-5xl md:text-7xl font-title text-white mb-6 tracking-wider uppercase">
                  Undergrad Projects
                </h1>
                <p className="text-xl md:text-2xl font-body text-white/90 max-w-2xl leading-relaxed">
                  Early architectural explorations and foundational design projects from undergraduate studies.
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {/* Individual Project Tiles - Only show when not in horizontal scroll mode */}
      {!isHorizontalScrollMode && projects.map((project, index) => (
        <motion.div
          key={project.id}
          className={`relative h-screen w-full ${isWidescreen ? 'flex' : 'overflow-hidden'} cursor-pointer group`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 + (index * 0.2) }}
          onClick={() => handleProjectClick(project.id)}
        >
          {/* Left Side - White Background with Text (only on widescreen) */}
          {isWidescreen && (
            <div className="w-2/5 bg-white flex flex-col justify-end p-8 md:p-12 pb-32">
              <motion.div
                className="max-w-md mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + (index * 0.2) }}
              >
                <h2 className="text-4xl md:text-6xl font-title text-gray-800 mb-4 tracking-wider uppercase">
                  {project.title}
                </h2>
                <h3 className="text-xl md:text-2xl font-subtitle text-gray-600 mb-6 tracking-wide">
                  {project.subtitle}
                </h3>
                <p className="text-lg md:text-xl font-body text-gray-500 max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* READ MORE Button */}
              <div
                className="absolute bottom-8 right-8 cursor-pointer group/button"
                style={{
                  backgroundColor: isWidescreen ? '#1f2937' : 'rgba(0, 0, 0, 0.8)',
                  borderColor: isWidescreen ? '#4b5563' : 'rgba(255, 255, 255, 1)',
                  color: isWidescreen ? '#ffffff' : '#ffffff',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  padding: '12px 24px',
                  borderRadius: '0px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  zIndex: '10',
                  position: 'absolute',
                  bottom: '32px',
                  right: '32px',
                  overflow: 'hidden'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClick(project.id);
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white origin-left z-0"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Text with CSS transition */}
                <span className="relative z-10 transition-colors duration-300 group-hover/button:text-black">
                  READ MORE
                </span>
              </div>
            </div>
          )}

          {/* Right Side - Background Image */}
          <div className={`${isWidescreen ? 'w-3/5' : 'w-full'} relative overflow-hidden bg-gray-200 h-screen`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-screen object-cover object-bottom group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {/* Image load error */}}
              onLoad={() => {/* Image loaded successfully */}}
            />
            {!isWidescreen && <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />}
          </div>

          {/* Overlay Content (only on 4:3/square) */}
          {!isWidescreen && (
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 pb-32">
              <motion.div
                className="max-w-4xl mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + (index * 0.2) }}
              >
                <h2 className="text-4xl md:text-6xl font-title text-white mb-4 tracking-wider uppercase">
                  {project.title}
                </h2>
                <h3 className="text-xl md:text-2xl font-subtitle text-white/90 mb-6 tracking-wide">
                  {project.subtitle}
                </h3>
                <p className="text-lg md:text-xl font-body text-white/80 max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </motion.div>

              {/* READ MORE Button */}
              <div
                className="absolute bottom-8 right-8 cursor-pointer group/button"
                style={{
                  backgroundColor: isWidescreen ? '#1f2937' : 'rgba(0, 0, 0, 0.8)',
                  borderColor: isWidescreen ? '#4b5563' : 'rgba(255, 255, 255, 1)',
                  color: isWidescreen ? '#ffffff' : '#ffffff',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  padding: '12px 24px',
                  borderRadius: '0px',
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  zIndex: '10',
                  position: 'absolute',
                  bottom: '32px',
                  right: '32px',
                  overflow: 'hidden'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClick(project.id);
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white origin-left z-0"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                
                {/* Text with CSS transition */}
                <span className="relative z-10 transition-colors duration-300 group-hover/button:text-black">
                  READ MORE
                </span>
              </div>
            </div>
          )}
        </motion.div>
      ))}

      {/* Progress Indicator - Only show when not in horizontal scroll mode */}
      {!isHorizontalScrollMode && (
        <motion.div
          className={`fixed bottom-8 left-8 z-[60] ${isWidescreen ? 'text-gray-800' : 'text-white'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
        <div className="flex items-center space-x-4">
          <span className="text-sm font-subtitle tracking-wider uppercase">
            {currentProject === 0 ? 'Overview' : projects[currentProject - 1].title}
          </span>
          <div className="flex space-x-2">
            {Array.from({ length: projects.length + 1 }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentProject 
                    ? (isWidescreen ? 'bg-gray-800' : 'bg-white')
                    : (isWidescreen ? 'bg-gray-400' : 'bg-white/30')
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
      )}
    </div>
  );
};

export default UndergradProjectsPage;
