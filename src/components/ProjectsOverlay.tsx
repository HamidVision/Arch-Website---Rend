'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ProjectsOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const tiles = [
    {
      id: 'design-philosophy',
      title: 'Design Philosophy',
      subtitle: 'Core principles and approach',
      description: 'Exploring the fundamental principles that guide our design thinking and creative process.',
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 'undergrad-projects',
      title: 'Undergrad Projects',
      subtitle: 'Academic foundation',
      description: 'Early architectural explorations and foundational design projects from undergraduate studies.',
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'graduate-projects',
      title: 'Graduate Projects',
      subtitle: 'Advanced research',
      description: 'Sophisticated design solutions and research-driven projects from graduate studies.',
      color: 'from-orange-600 to-red-600'
    },
    {
      id: 'computer-science',
      title: 'Computer Science Projects',
      subtitle: 'Digital innovation',
      description: 'Technology-driven projects bridging architecture and computational design.',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'research-papers',
      title: 'Research Papers & Publications',
      subtitle: 'Academic contributions',
      description: 'Published research and theoretical contributions to architectural discourse.',
      color: 'from-indigo-600 to-blue-600'
    },
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'Personal journey',
      description: 'Background, experience, and the story behind the work.',
      color: 'from-teal-600 to-green-600'
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: 'Get in touch',
      description: 'Let\'s discuss your project and explore collaboration opportunities.',
      color: 'from-red-600 to-orange-600'
    }
  ];

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    const container = scrollContainerRef.current;
    
    if (container) {
      const scrollAmount = delta > 0 ? 400 : -400; // Scroll by 400px
      container.scrollLeft += scrollAmount;
      
      // Update current index based on scroll position
      const scrollPosition = container.scrollLeft;
      const tileWidth = container.scrollWidth / tiles.length;
      const newIndex = Math.round(scrollPosition / tileWidth);
      setCurrentIndex(Math.max(0, Math.min(newIndex, tiles.length - 1)));
    }
  };

  const handleTileClick = (tileId: string) => {
    setIsVisible(false);
    setTimeout(() => {
      router.push(`/${tileId}`);
    }, 300);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const scrollToTile = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const tileWidth = container.scrollWidth / tiles.length;
      container.scrollTo({
        left: index * tileWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/95 z-[60] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-8 right-8 text-white text-2xl hover:text-gray-300 transition-colors z-10"
            aria-label="Close projects overlay"
          >
            ×
          </button>

          {/* Header */}
          <motion.div
            className="text-center pt-20 pb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-light text-white mb-4 tracking-wider uppercase">
              Portfolio
            </h2>
            <p className="text-gray-400 text-lg">
              Explore my work across different disciplines
            </p>
          </motion.div>

          {/* Horizontal Scrolling Container */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-8 px-8 h-full overflow-x-auto scrollbar-hide"
              onWheel={handleWheel}
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {tiles.map((tile, index) => (
                <motion.div
                  key={tile.id}
                  className="flex-shrink-0 w-80 h-96 cursor-pointer group"
                  style={{ scrollSnapAlign: 'start' }}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleTileClick(tile.id)}
                >
                  <div className={`relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br ${tile.color} group-hover:scale-105 transition-transform duration-300`}>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                      <div className="mb-4">
                        <h3 className="text-2xl font-light mb-2 tracking-wider uppercase">
                          {tile.title}
                        </h3>
                        <p className="text-sm text-gray-200 mb-4">
                          {tile.subtitle}
                        </p>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {tile.description}
                        </p>
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-8 pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white text-sm tracking-wider uppercase">
                  {tiles[currentIndex].title}
                </span>
                <span className="text-gray-400 text-sm">
                  {currentIndex + 1} / {tiles.length}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-800 h-px relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-white"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentIndex + 1) / tiles.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {tiles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToTile(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentIndex ? 'bg-white' : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to ${tiles[index].title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectsOverlay;
