'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLogoNavigation } from '@/hooks/useLogoNavigation';
import NavigationMenu from '@/components/NavigationMenu';
import Header from '@/components/Header';
import HorizontalScrollIndicator from '@/components/HorizontalScrollIndicator';

const HELoadingComponent = dynamic(() => import('@/components/HE_Loading_Component'), { ssr: false });

// Custom typewriter component for architectural presentations
function ArchitecturalTypewriter({ text, isTyping, speed = 25 }: { text: string; isTyping: boolean; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset when text changes or typing state changes
  useEffect(() => {
    if (!isTyping) {
      setDisplayedText('');
      setCurrentIndex(0);
      return;
    }
  }, [text, isTyping]);

  // Typing animation
  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [isTyping, currentIndex, text, speed]);

  return <span>{displayedText}</span>;
}

export default function CongregationCenterPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showInitialHint, setShowInitialHint] = useState(true);
  const [firstInteraction, setFirstInteraction] = useState(true);
  const [showButton1Glow, setShowButton1Glow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const hasScrolledRef = useRef(false);
  
  // Use standardized logo navigation hook
  const { showLoading, handleLogoClick } = useLogoNavigation();

  // Set mounted state after hydration to prevent flash
  useEffect(() => {
    // Small delay to ensure everything is ready
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse wheel scrolling for horizontal movement
  useEffect(() => {
    if (!isMounted) return; // Wait for mount

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (containerRef.current) {
        // Convert vertical scroll to horizontal scroll
        containerRef.current.scrollLeft += e.deltaY;

        // Hide indicator on first scroll
        if (!hasScrolledRef.current) {
          hasScrolledRef.current = true;
          setShowScrollIndicator(false);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [isMounted]);

  // Show indicator after initial animation
  const onAnimationComplete = () => {
    if (!hasScrolledRef.current) {
      setTimeout(() => setShowScrollIndicator(true), 500);
    }
  };

  // Progressive disclosure effect: Show Button 1 glow after 3-4 seconds
  useEffect(() => {
    if (showInitialHint && firstInteraction) {
      const timer = setTimeout(() => {
        setShowButton1Glow(true);
      }, 3500); // 3.5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [showInitialHint, firstInteraction]);

  useEffect(() => {
    if (activeButton) {
      // Cleanup previous typing state immediately
      setIsTyping(false);
      // Delay typing to match the animation sequence
      const timer = setTimeout(() => setIsTyping(true), 400);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [activeButton]);

  const handleButtonClick = (buttonNumber: number) => {
    // Hide hints on first interaction
    if (firstInteraction) {
      setShowInitialHint(false);
      setFirstInteraction(false);
      setShowButton1Glow(false);
    }

    if (activeButton === buttonNumber) {
      setActiveButton(null);
    } else {
      setActiveButton(buttonNumber);
    }
  };

  // Content data for each button
  const contentData = {
    1: { title: "Event Center", description: "Blurring the line between interior and exterior living, this terrace exemplifies the project's commitment to high-quality amenity spaces. As part of the double-height event floor, this 'garden in the sky' offers a natural retreat with stunning city views. The warm wood decking and comfortable lounge seating provide an ideal setting for relaxation or social functions, seamlessly extending the adjacent glass-enclosed common area into the open air and creating a perfect backdrop for memorable occasions." },
    2: { title: "Office Level", description: "Demonstrating a core benefit of the tower's staggered design, this rendering shows an office-level terrace providing a vital connection to the outdoors. This private balcony extends the workspace, offering employees a place for fresh air, informal meetings, or a momentary escape with panoramic city views. This feature underscores a modern approach to workplace design, prioritizing employee well-being by integrating nature and open space directly into the corporate environment." },
    3: { title: "Shopping Center", description: "The first two floors of the Congregation Center are envisioned as a vibrant commercial hub, as depicted in this interior view. High ceilings and extensive glazing create a bright and airy atmosphere for shops and restaurants. A central water feature with koi fish serves as a serene and beautiful focal point, enhancing the shopping experience and guiding circulation. This space is designed to be more than a mall; it's a lively and engaging indoor streetscape that draws the public in." },
    4: { title: "Public Plaza: Public Realm", description: "This view highlights the thoughtful integration of sensory elements within the public realm. A central water fountain acts as a captivating focal point, offering the soothing sounds of moving water and creating a tranquil micro environment within the bustling city. The composition showcases a rich interplay of textures smooth water, paved stone, and lush greenery crafting an elegant and serene entryway that invites pause and reflection before one enters the building or ascends to the plaza." },
    5: { title: "Urban Integration", description: "Highlighting the project's commitment to sustainability and urban integration, this rendering focuses on the ground-level connection to public transportation. The seamless access to a light rail or tram stop, combined with dedicated and sheltered bicycle parking, promotes eco-friendly commuting options for residents and workers. The well-lit, pedestrian-friendly design ensures a safe and pleasant experience, reinforcing the tower's role as a well-connected and accessible community anchor." },
    6: { title: "Public Plaza: Skywalk View", description: "The expansive public plaza serves as the communal heart of the project. This rendering illustrates a vibrant, open space designed for flexibility and social interaction, from casual gatherings to organized community events. Lush planters and integrated seating create a welcoming atmosphere, softening the urban environment and encouraging people to linger. The direct connection to the building's main levels and the elevated walkway ensures constant energy and flow, establishing the plaza as a true destination for residents, workers, and the wider public alike." }
  };

  // Mobile content media paths for Ken Burns animation
  const mobileContentMedia: { [key: number]: { type: 'video' | 'image'; src: string; alt: string } } = {
    1: { type: 'video', src: '/undergrad-projects/congregation-center/congregation-event-center.mp4', alt: 'Event Center Video' },
    2: { type: 'image', src: '/undergrad-projects/congregation-center/c2.jpg', alt: 'Office Level' },
    3: { type: 'image', src: '/undergrad-projects/congregation-center/c3.jpg', alt: 'Shopping Center' },
    4: { type: 'image', src: '/undergrad-projects/congregation-center/c4.jpg', alt: 'Public Plaza: Public Realm' },
    5: { type: 'image', src: '/undergrad-projects/congregation-center/c5.jpg', alt: 'Urban Integration' },
    6: { type: 'image', src: '/undergrad-projects/congregation-center/c6.jpg', alt: 'Public Plaza: Skywalk View' }
  };

  // Ken Burns animation for mobile content
  const mobileKenBurnsVariants = {
    animate: {
      x: ['-20%', '0%', '-20%'],
      scale: [1.1, 1.15, 1.1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-white">
      <AnimatePresence>
        {isMounted ? (
            <motion.main 
              className="relative h-screen overflow-hidden bg-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={onAnimationComplete}
            >
        {/* Header with dark icons for light background */}
        <Header textColorClass="text-black" logoVariant="dark" />
        
        {/* Scroll Indicator */}
        <HorizontalScrollIndicator show={showScrollIndicator} />
        
        {/* Main Content Container with horizontal scrolling */}

        <div 
          ref={containerRef}
          className="h-screen w-full overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="h-full w-max flex">
            {/* Background Image Section with Text Overlay */}
            <div className="h-screen flex-shrink-0 relative bg-white" style={{ width: 'max-content', minWidth: '100vw' }}>
               <img
                 src={isMobile 
                   ? '/undergrad-projects/congregation-center/congregation-hero-mobile.jpg'
                   : '/undergrad-projects/congregation-center/congregation-hero.jpg'}
                 alt="Congregation Center - Main View"
                 className="h-screen w-auto object-contain"
                 loading="eager"
                 fetchPriority="high"
                 style={{
                   width: 'auto',
                   height: '100vh',
                   minWidth: '100vw'
                 }}
               />
               


               {/* Interactive Buttons - Updated positions */}
               {/* Button 1 */}
               <button
                 onClick={() => handleButtonClick(1)}
                 className={`absolute w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 1 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 } ${
                   firstInteraction && !activeButton ? 'gentle-pulse' : ''
                 } ${
                   showButton1Glow && !activeButton ? 'button-glow border border-orange-500' : ''
                 }`}
                 style={{
                   top: isMobile ? '19%' : '19.25%',
                   left: isMobile ? '45.40%' : '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: showButton1Glow && !activeButton ? '1px solid rgba(249, 115, 22, 0.5)' : 'none'
                 }}
                 aria-label="View content 1"
               >
                 <span className="hover-scale-number" style={{ position: 'relative', top: '-1px', left: '-0.5px' }}>1</span>
               </button>

               {/* Button 2 */}
               <button
                 onClick={() => handleButtonClick(2)}
                 className={`absolute w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 2 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: isMobile ? '22.9%' : '22.9%',
                   left: isMobile ? '45.40%' : '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 2"
               >
                 <span className="hover-scale-number" style={{ position: 'relative', top: '-1px', left: '-0.5px' }}>2</span>
               </button>

               {/* Button 3 */}
               <button
                 onClick={() => handleButtonClick(3)}
                 className={`absolute w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 3 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: isMobile ? '26.6%' : '26.6%',
                   left: isMobile ? '45.40%' : '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 3"
               >
                 <span className="hover-scale-number" style={{ position: 'relative', top: '-1px', left: '-0.5px' }}>3</span>
               </button>

               {/* Button 4 */}
               <button
                 onClick={() => handleButtonClick(4)}
                 className={`absolute w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 4 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: isMobile ? '30.33%' : '30.33%',
                   left: isMobile ? '45.40%' : '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 4"
               >
                 <span className="hover-scale-number" style={{ position: 'relative', top: '-1px', left: '-0.5px' }}>4</span>
               </button>

               {/* Button 5 */}
               <button
                 onClick={() => handleButtonClick(5)}
                 className={`absolute w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 5 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: isMobile ? '34%' : '34%',
                   left: isMobile ? '45.40%' : '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 5"
               >
                 <span className="hover-scale-number" style={{ position: 'relative', top: '-1px', left: '-0.5px' }}>5</span>
               </button>

               {/* Button 6 */}
               <button
                 onClick={() => handleButtonClick(6)}
                 className={`absolute w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 6 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: isMobile ? '37.7%' : '37.7%',
                   left: isMobile ? '45.40%' : '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 6"
               >
                 <span className="hover-scale-number" style={{ position: 'relative', top: '-1px', left: '-0.5px' }}>6</span>
               </button>

               {/* Content Display System */}
               <AnimatePresence>
                 {/* Intro Text Overlay - Fades out when a button is clicked */}
                 {!activeButton && (
                  <motion.div 
                    key="intro-text"
                    className="absolute z-50 pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      top: '48%',
                      left: '21%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'transparent',
                      backdropFilter: 'none',
                      WebkitBackdropFilter: 'none',
                      border: 'none',
                      padding: 'clamp(1rem, 3vw, 2.5rem)',
                      borderRadius: '0px',
                      boxShadow: 'none',
                      maxWidth: 'min(90vw, 28rem)',
                      width: 'auto',
                      maxHeight: '70vh',
                      overflow: 'hidden'
                    }}>
                    <h1 className="pointer-events-auto" style={{
                      fontSize: 'clamp(1.25rem, 2vw, 2rem)',
                      fontWeight: '700',
                      marginBottom: 'clamp(0.75rem, 2vw, 1.5rem)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                      color: '#111827',
                      lineHeight: '1.2',
                      margin: '0 0 clamp(0.75rem, 2vw, 1.5rem) 0',
                      textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      THE CONGREGATION CENTER
                    </h1>
                    <p className="pointer-events-auto" style={{
                      color: '#374151',
                      lineHeight: '1.5',
                      fontSize: 'clamp(0.85rem, 1vw, 1rem)',
                      margin: '0',
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                      textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                    }}>
                      The Congregation Center is a visionary multipurpose tower conceived at the intersection of modern design, community engagement, and urban sustainability. Functioning as a vibrant vertical neighborhood, the project seamlessly integrates commercial, residential, office, and event spaces into a single, cohesive structure. Its most defining architectural feature is the dynamic, staggered form, an intentional design choice that generates a series of green terraces and gardens on various levels, weaving nature into the building's fabric. At its base, an inviting open plaza connects directly to the urban landscape, creating a welcoming hub for public life and activity. The Congregation Center is designed not just as a building, but as a living ecosystem that fosters connection, promotes a sustainable lifestyle, and enhances the surrounding community.
                    </p>
                  </motion.div>
                 )}

                 {showInitialHint && (
                   <motion.div
                     key="initial-hint"
                     className="absolute z-30 flex items-center justify-center"
                     style={{
                       top: isMobile ? '18%' : '18%',
                       left: isMobile ? '47.15%' : '38.15%',
                       width: isMobile ? '5%' : '23%',
                       height: isMobile ? '60%' : '60%'
                     }}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                   >
                     <p 
                       className="text-center text-gray-800 font-bold px-4"
                       style={{
                         fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                         fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                         lineHeight: '1.4',
                         margin: '0',
                         letterSpacing: '0.08em',
                         textShadow: '0 1px 3px rgba(0,0,0,0.3)'
                       }}
                     >
                       CLICK NUMBERED BUTTONS TO EXPLORE THE PROJECT
                     </p>
                   </motion.div>
                 )}

                 {activeButton && (
                   <>
                     {/* Title Text Box */}
                     <motion.div
                       key={'title-' + activeButton}
                       className="absolute bg-transparent backdrop-blur-none rounded-lg z-35 flex items-center justify-start"
                       style={{
                         top: '8%',
                         left: '38.15%',
                         width: 'min(55vw, 23%)',
                         height: '8%'
                       }}
                       initial={{ opacity: 0, x: -30 }}
                       animate={{ opacity: 1, x: 0 }}
                       exit={{ opacity: 0, x: -30 }}
                       transition={{ 
                         duration: 0.6, 
                         ease: [0.25, 0.1, 0.25, 1],
                         delay: 0.2
                       }}
                     >
                       <h3 
                         className="text-left text-gray-800"
                         style={{
                           fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                           fontWeight: 'bold',
                           fontSize: 'clamp(1rem, 2vw, 1.9rem)',
                           margin: '0'
                         }}
                       >
                         {contentData[activeButton as keyof typeof contentData].title}
                       </h3>
                     </motion.div>
 
                     {/* Content Display Box */}
                     <motion.div
                       key={'content-' + activeButton}
                       className="absolute bg-transparent border-transparent backdrop-blur-none rounded-lg z-30 flex items-center justify-center"
                       style={{
                         top: '18%',
                         left: '38.15%',
                         width: 'min(55vw, 23%)',
                         height: '60%'
                       }}
                       initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                       animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                       exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                       transition={{ 
                         duration: 0.5, 
                         ease: [0.25, 0.1, 0.25, 1],
                         delay: 0.05
                       }}
                     >
                       {activeButton === 1 ? (
                         /* Content for Button 1 - Display video */
                         <div className="w-full h-full flex items-center justify-center p-2 relative">
                           <video
                             src="/undergrad-projects/congregation-center/congregation-event-center.mp4"
                             autoPlay
                             loop
                             muted
                             playsInline
                             className="w-full h-full object-contain rounded-md"
                             style={{
                               width: 'auto',
                               height: 'auto',
                               maxWidth: '100%',
                               maxHeight: '100%'
                             }}
                           />

                         </div>
                       ) : activeButton === 2 ? (
                         /* Content for Button 2 - Display c2.jpg image */
                         <div className="w-full h-full flex items-center justify-center p-2">
                           <Image
                             src="/undergrad-projects/congregation-center/c2.jpg"
                             alt="Office Level - Level 2 Content"
                             width={0}
                             height={0}
                             sizes="100%"
                             className="w-full h-full object-contain rounded-md"
                             style={{
                               width: 'auto',
                               height: 'auto',
                               maxWidth: '100%',
                               maxHeight: '100%'
                             }}
                           />
                         </div>
                       ) : activeButton === 3 ? (
                         /* Content for Button 3 - Display c3.jpg image */
                         <div className="w-full h-full flex items-center justify-center p-2">
                           <Image
                             src="/undergrad-projects/congregation-center/c3.jpg"
                             alt="Shopping Center - Level 3 Content"
                             width={0}
                             height={0}
                             sizes="100%"
                             className="w-full h-full object-contain rounded-md"
                             style={{
                               width: 'auto',
                               height: 'auto',
                               maxWidth: '100%',
                               maxHeight: '100%'
                             }}
                           />
                         </div>
                       ) : activeButton === 4 ? (
                         /* Content for Button 4 - Display c4.jpg image */
                         <div className="w-full h-full flex items-center justify-center p-2">
                           <Image
                             src="/undergrad-projects/congregation-center/c4.jpg"
                             alt="Public Plaza: Public Realm - Level 4 Content"
                             width={0}
                             height={0}
                             sizes="100%"
                             className="w-full h-full object-contain rounded-md"
                             style={{
                               width: 'auto',
                               height: 'auto',
                               maxWidth: '100%',
                               maxHeight: '100%'
                             }}
                           />
                         </div>
                       ) : activeButton === 5 ? (
                         /* Content for Button 5 - Display c5.jpg image */
                         <div className="w-full h-full flex items-center justify-center p-2">
                           <Image
                             src="/undergrad-projects/congregation-center/c5.jpg"
                             alt="Urban Integration - Level 5 Content"
                             width={0}
                             height={0}
                             sizes="100%"
                             className="w-full h-full object-contain rounded-md"
                             style={{
                               width: 'auto',
                               height: 'auto',
                               maxWidth: '100%',
                               maxHeight: '100%'
                             }}
                           />
                         </div>
                       ) : activeButton === 6 ? (
                         /* Content for Button 6 - Display c6.jpg image */
                         <div className="w-full h-full flex items-center justify-center p-2">
                           <Image
                             src="/undergrad-projects/congregation-center/c6.jpg"
                             alt="Public Plaza: Skywalk View - Level 6 Content"
                             width={0}
                             height={0}
                             sizes="100%"
                             className="w-full h-full object-contain rounded-md"
                             style={{
                               width: 'auto',
                               height: 'auto',
                               maxWidth: '100%',
                               maxHeight: '100%'
                             }}
                           />
                         </div>
                       ) : null}
                     </motion.div>
 
                     {/* Description Text Box */}
                     <motion.div
                       key={activeButton ? "desc-" + activeButton : "desc"}
                       className="absolute bg-transparent backdrop-blur-none rounded-lg z-35 flex items-start justify-start transition-all duration-300"
                       style={{
                         top: '80%',
                         left: '49.65%',
                         width: 'min(55vw, 23%)',
                         height: '18%',
                         transform: 'translateX(-50%)',
                         overflow: 'hidden'
                       }}
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 0.5, delay: 0.3 }}
                     >
                       <div 
                         className="text-left text-gray-700 px-3 py-2 w-full h-full"
                         style={{
                           fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                           fontSize: 'clamp(0.75rem, 1vw, 1rem)',
                           lineHeight: '1.35',
                           margin: '0',
                           display: 'flex',
                           alignItems: 'flex-start',
                           justifyContent: 'flex-start',
                           overflow: 'hidden'
                         }}
                       >
                         <ArchitecturalTypewriter
                           text={contentData[activeButton as keyof typeof contentData].description}
                           speed={25}
                           isTyping={isTyping}
                         />
                       </div>
                     </motion.div>
                   </>
                 )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.main>
        ) : null}
      </AnimatePresence>
      
      {/* Mobile Full-Screen Content Overlay with Ken Burns Animation */}
      <AnimatePresence>
        {isMobile && activeButton && (
          <motion.div
            key="mobile-content-overlay"
            className="fixed inset-0 z-50 bg-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Ken Burns Animated Content Container */}
            <motion.div
              className="absolute inset-0 w-[200%] h-full"
              variants={mobileKenBurnsVariants}
              animate="animate"
            >
              {mobileContentMedia[activeButton].type === 'video' ? (
                <video
                  src={mobileContentMedia[activeButton].src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={mobileContentMedia[activeButton].src}
                  alt={mobileContentMedia[activeButton].alt}
                  fill
                  className="object-cover"
                  sizes="200vw"
                  priority
                />
              )}
            </motion.div>

            {/* Header - stays visible on top */}
            <div className="absolute top-0 left-0 right-0 z-60">
              <Header textColorClass="text-white" logoVariant="light" />
            </div>

            {/* Buttons on left side */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-60">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => handleButtonClick(num)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    activeButton === num 
                      ? 'bg-orange-500 text-white border-2 border-white' 
                      : 'bg-white/20 text-white border border-white/50 backdrop-blur-sm'
                  }`}
                  style={{
                    fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                  }}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Typewriter Text at Bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-60 bg-black/70 backdrop-blur-sm px-4 py-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 
                className="text-white text-lg font-bold mb-2"
                style={{
                  fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif"
                }}
              >
                {contentData[activeButton as keyof typeof contentData].title}
              </h3>
              <div 
                className="text-white/90 text-sm leading-relaxed"
                style={{
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  maxHeight: '25vh',
                  overflow: 'auto'
                }}
              >
                <ArchitecturalTypewriter
                  text={contentData[activeButton as keyof typeof contentData].description}
                  speed={20}
                  isTyping={isTyping}
                />
              </div>
            </motion.div>

            {/* Close/Back hint */}
            <div className="absolute top-20 right-4 z-60">
              <button
                onClick={() => setActiveButton(null)}
                className="text-white/70 text-xs bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full"
              >
                ← Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global Loading Overlay */}
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