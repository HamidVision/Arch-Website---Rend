'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProjectsOverlayProps {
  isZoomed: boolean;
  onClose: () => void;
}

const ProjectsOverlay: React.FC<ProjectsOverlayProps> = ({ isZoomed, onClose }) => {
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
      color: 'from-blue-600 to-purple-600',
      image: '/design-philosophy/design-philosophy-tile.jpg'
    },
    {
      id: 'undergrad-projects',
      title: 'Undergrad Projects',
      subtitle: 'Academic foundation',
      description: 'Early architectural explorations and foundational design projects from undergraduate studies.',
      color: 'from-green-600 to-teal-600',
      image: '/undergrad-projects/main-tile.jpg',
      icons: [
        '/undergrad-projects/icons/site-analysis.png',
        '/undergrad-projects/icons/border-crossing.png',
        '/undergrad-projects/icons/congregation-center.png'
      ]
    },
    {
      id: 'graduate-projects',
      title: 'Graduate Projects',
      subtitle: 'Advanced research',
      description: 'Sophisticated design solutions and research-driven projects from graduate studies.',
      color: 'from-orange-600 to-red-600',
      image: '/graduate-projects/grad-hero.png',
      icons: [
        '/graduate-projects/icons/momentum-hub.png',
        '/graduate-projects/icons/nook.png',
        '/graduate-projects/icons/wellness-bazaar.png'
      ]
    },
    {
      id: 'computer-science',
      title: 'Computer Science Projects',
      subtitle: 'Digital innovation',
      description: 'Technology-driven projects bridging architecture and computational design.',
      color: 'from-purple-600 to-indigo-600',
      image: null
    },
    {
      id: 'research-papers',
      title: 'Research Papers & Publications',
      subtitle: 'Academic contributions',
      description: 'Published research and theoretical contributions to architectural discourse.',
      color: 'from-indigo-600 to-blue-600',
      image: null
    },
    {
      id: 'about',
      title: 'About Me',
      subtitle: 'Personal journey',
      description: 'Background, experience, and the story behind the work.',
      color: 'from-teal-600 to-green-600',
      image: null
    },
    {
      id: 'contact',
      title: 'Contact',
      subtitle: 'Get in touch',
      description: 'Let\'s discuss your project and explore collaboration opportunities.',
      color: 'from-red-600 to-orange-600',
      image: null
    }
  ];

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    const container = scrollContainerRef.current;
    
    if (container) {
      // Reduce scroll sensitivity for smoother transitions
      const scrollSensitivity = 0.5; // Reduce from 1.0 to 0.5
      const scrollAmount = delta * scrollSensitivity;
      
      // Use smooth scrolling instead of instant jumps
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleTileClick = (tileId: string) => {
    // Start the fade out animation
    setIsVisible(false);
    // Navigate immediately to reduce flicker
    router.push(`/${tileId}`);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Call onClose immediately to prevent animation delays
    onClose();
  };

  // Scroll to current tile when zoomed
  useEffect(() => {
    if (isZoomed) {
      scrollToTile(currentIndex);
    }
  }, [isZoomed, currentIndex]);

  const scrollToTile = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const tileWidth = 864; // 48rem (768px) + 96px gap
      container.scrollTo({
        left: index * tileWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  // Add scroll event listener for more accurate position tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      let scrollTimeout: NodeJS.Timeout;
      
      const handleScroll = () => {
        // Debounce scroll events for smoother performance
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const scrollPosition = container.scrollLeft;
          const tileWidth = 864; // 48rem (768px) + 96px gap
          
          // Calculate the raw index directly from scroll position
          const rawIndex = scrollPosition / tileWidth;
          
          // Use Math.round for more accurate snapping
          const newIndex = Math.round(rawIndex);
          
          // Clamp to valid range
          const clampedIndex = Math.max(0, Math.min(newIndex, tiles.length - 1));
          
          setCurrentIndex(clampedIndex);
        }, 50); // 50ms debounce
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        container.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, [tiles.length]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={`fixed inset-0 bg-white/70 z-[60] flex flex-col ${isZoomed ? 'items-center justify-center' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* Horizontal Scrolling Container */}
          <div className={`${isZoomed ? 'w-full h-full flex items-center justify-center' : 'flex-1 overflow-hidden flex items-center'}`}>
            <div
              ref={scrollContainerRef}
              className={`${isZoomed ? 'w-screen h-screen' : 'flex gap-12 px-8 h-full overflow-x-auto scrollbar-hide items-center'}`}
              onWheel={isZoomed ? undefined : handleWheel}
              style={isZoomed ? {} : { 
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth'
              }}
            >
              {!isZoomed && (
                <>
                  {/* Add left padding to center first tile */}
                  <div className="flex-shrink-0 w-[calc(50vw-24rem)]"></div>
                </>
              )}
              
              {isZoomed ? (
                 // Show only the current tile when zoomed
                 <div className="w-full h-full relative">
                   {/* Project Icons Floating Above Tile */}
                   {tiles[currentIndex].icons && (
                     <div className="absolute -top-24 left-8 flex justify-center space-x-4 z-10">
                       {tiles[currentIndex].icons.map((icon, iconIndex) => (
                         <div
                           key={iconIndex}
                           className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-lg"
                         >
                           <img
                             src={icon}
                             alt={`Project ${iconIndex + 1}`}
                             className="w-12 h-12 object-contain"
                           />
                         </div>
                       ))}
                     </div>
                   )}
                   
                   <motion.div
                     key={tiles[currentIndex].id}
                     className="w-full h-full cursor-pointer group"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     transition={{ duration: 0.5 }}
                     onClick={() => handleTileClick(tiles[currentIndex].id)}
                   >
                     <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${tiles[currentIndex].color} group-hover:scale-105 transition-transform duration-300`}>
                       {/* Background image or gradient */}
                       {tiles[currentIndex].image ? (
                         <img
                           src={tiles[currentIndex].image}
                           alt={tiles[currentIndex].title}
                           className="w-full h-full object-cover"
                         />
                       ) : null}
                       {/* Gradient overlay */}
                       <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-colors duration-300" />
                     </div>
                     
                     {/* Title and subtitle below tile */}
                     <div className="mt-6 text-black text-center">
                       <h3 className="text-4xl font-light mb-4 tracking-wider uppercase">
                         {tiles[currentIndex].title}
                       </h3>
                       <p className="text-lg text-gray-600">
                         {tiles[currentIndex].subtitle}
                       </p>
                     </div>
                   </motion.div>
                 </div>
              ) : (
                // Show all tiles when not zoomed
                tiles.map((tile, index) => (
                  <div key={tile.id} className="flex-shrink-0 w-[48rem] h-[36rem] relative">
                    {/* Project Icons Floating Above Tile */}
                    {tile.icons && (
                      <div className="absolute -top-20 left-8 flex justify-center space-x-3 z-10">
                        {tile.icons.map((icon, iconIndex) => (
                          <div
                            key={iconIndex}
                            className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg"
                          >
                            <img
                              src={icon}
                              alt={`Project ${iconIndex + 1}`}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <motion.div
                      className="w-full h-full cursor-pointer group"
                      style={{ scrollSnapAlign: 'center' }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => handleTileClick(tile.id)}
                    >
                      <div className={`relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br ${tile.color} group-hover:scale-105 transition-transform duration-300`}>
                        {/* Background image or gradient */}
                        {tile.image ? (
                          <img
                            src={tile.image}
                            alt={tile.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : null}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-colors duration-300" />
                        
                        {/* Arrow indicator */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Title and subtitle below tile */}
                      <div className="mt-4 text-black">
                        <h3 className="text-2xl font-light mb-2 tracking-wider uppercase">
                          {tile.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {tile.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))
              )}
              
              {!isZoomed && (
                <>
                  {/* Add right padding to center last tile */}
                  <div className="flex-shrink-0 w-[calc(50vw-24rem)]"></div>
                </>
              )}
            </div>
          </div>

          {/* Progress Bar - Only show when not zoomed */}
          {!isZoomed && (
            <div className="px-8 pb-8">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-black text-sm tracking-wider uppercase">
                    {tiles[currentIndex].title}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {currentIndex + 1} / {tiles.length}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-300 h-px relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-black"
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
                        index === currentIndex ? 'bg-black' : 'bg-gray-400 hover:bg-gray-600'
                      }`}
                      aria-label={`Go to ${tiles[index].title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectsOverlay;