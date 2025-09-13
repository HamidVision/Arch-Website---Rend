'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
  const [showTitle, setShowTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [showInitialHint, setShowInitialHint] = useState(true);
  const [firstInteraction, setFirstInteraction] = useState(true);
  const [showButton1Glow, setShowButton1Glow] = useState(false);

  // Handle mouse wheel scrolling for horizontal movement
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (containerRef.current) {
        // Convert vertical scroll to horizontal scroll
        containerRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  // Progressive disclosure effect: Show Button 1 glow after 3-4 seconds
  useEffect(() => {
    if (showInitialHint && firstInteraction) {
      const timer = setTimeout(() => {
        setShowButton1Glow(true);
      }, 3500); // 3.5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [showInitialHint, firstInteraction]);

  const handleButtonClick = (buttonNumber: number) => {
    // Hide hints on first interaction
    if (firstInteraction) {
      setShowInitialHint(false);
      setFirstInteraction(false);
      setShowButton1Glow(false);
    }

    if (activeButton === buttonNumber) {
      // Deactivate with smooth exit animation sequence
      setIsDeactivating(true);
      
      // Reverse sequence: stop typing → hide title → hide content → clear button
      // 1. Stop typing immediately
      setIsTyping(false);
      
      // 2. Hide title after 100ms
      setTimeout(() => {
        setShowTitle(false);
      }, 100);
      
      // 3. Hide content after 250ms
      setTimeout(() => {
        setShowContent(false);
      }, 250);
      
      // 4. Clear active button and reset deactivating flag after 600ms (after all animations complete)
      setTimeout(() => {
        setActiveButton(null);
        setIsDeactivating(false);
      }, 600);
      
    } else {
      // Reset states for new activation
      setIsTyping(false);
      setShowTitle(false);
      setShowContent(false);
      setIsDeactivating(false);
      
      // Activate new button
      setActiveButton(buttonNumber);
      
      // Coordinated animation sequence:
      // 1. Content appears first (render/video)
      setTimeout(() => {
        setShowContent(true);
      }, 50);
      
      // 2. Title slides in
      setTimeout(() => {
        setShowTitle(true);
      }, 200);
      
      // 3. Description starts typing
      setTimeout(() => {
        setIsTyping(true);
      }, 400);
    }
  };

  // Content data for each button
  const contentData = {
    1: { title: "Event Center", description: "Blurring the line between interior and exterior living, this terrace exemplifies the project's commitment to high-quality amenity spaces. As part of the double-height event floor, this 'garden in the sky' offers a natural retreat with stunning city views. The warm wood decking and comfortable lounge seating provide an ideal setting for relaxation or social functions, seamlessly extending the adjacent glass-enclosed common area into the open air and creating a perfect backdrop for memorable occasions." },
    2: { title: "Office Level", description: "Demonstrating a core benefit of the tower's staggered design, this rendering shows an office-level terrace providing a vital connection to the outdoors. This private balcony extends the workspace, offering employees a place for fresh air, informal meetings, or a momentary escape with panoramic city views. This feature underscores a modern approach to workplace design, prioritizing employee well-being by integrating nature and open space directly into the corporate environment." },
    3: { title: "Shopping Center", description: "The first two floors of the Congregation Center are envisioned as a vibrant commercial hub, as depicted in this interior view. High ceilings and extensive glazing create a bright and airy atmosphere for shops and restaurants. A central water feature with koi fish serves as a serene and beautiful focal point, enhancing the shopping experience and guiding circulation. This space is designed to be more than a mall; it's a lively and engaging indoor streetscape that draws the public in." },
    4: { title: "Public Plaza: Public Realm", description: "This view highlights the thoughtful integration of sensory elements within the public realm. A central water fountain acts as a captivating focal point, offering the soothing sounds of moving water and creating a tranquil micro-environment within the bustling city. The composition showcases a rich interplay of textures—smooth water, paved stone, and lush greenery—crafting an elegant and serene entryway that invites pause and reflection before one enters the building or ascends to the plaza." },
    5: { title: "Urban Integration", description: "Highlighting the project's commitment to sustainability and urban integration, this rendering focuses on the ground-level connection to public transportation. The seamless access to a light rail or tram stop, combined with dedicated and sheltered bicycle parking, promotes eco-friendly commuting options for residents and workers. The well-lit, pedestrian-friendly design ensures a safe and pleasant experience, reinforcing the tower's role as a well-connected and accessible community anchor." },
    6: { title: "Public Plaza: Skywalk View", description: "The expansive public plaza serves as the communal heart of the project. This rendering illustrates a vibrant, open space designed for flexibility and social interaction, from casual gatherings to organized community events. Lush planters and integrated seating create a welcoming atmosphere, softening the urban environment and encouraging people to linger. The direct connection to the building's main levels and the elevated walkway ensures constant energy and flow, establishing the plaza as a true destination for residents, workers, and the wider public alike." }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <main className="relative h-screen overflow-hidden bg-black">
        {/* Custom Header matching undergrad-projects page */}
        <button
          onClick={() => window.history.back()}
          className="fixed top-8 left-8 text-2xl font-semibold tracking-wide text-white hover:text-gray-300 transition-colors z-[100] bg-transparent border-none outline-none cursor-pointer"
          aria-label="Go to homepage"
        >
          HE
        </button>
        
        {/* Portfolio and Menu Buttons */}
        <div className="fixed top-6 right-6 z-[100]">
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
                <rect x="14" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
                <rect x="4" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
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
        
        {/* Main Content Container with horizontal scrolling */}
        <div 
          ref={containerRef}
          className="h-screen w-full overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="h-full w-max flex">
            {/* Background Image Section with Text Overlay */}
            <div className="h-screen flex-shrink-0 relative" style={{ width: 'max-content' }}>
               <Image
                 src="/undergrad-projects/congregation-center/congregation-hero.jpg"
                 alt="Congregation Center - Main View"
                 width={0}
                 height={0}
                 sizes="100vw"
                 className="h-screen w-auto object-contain"
                 style={{
                   width: 'auto',
                   height: '100vh'
                 }}
                 priority
                 unoptimized={true}
                 quality={100}
               />
               
               {/* Text Box Overlay */}
               <div 
                 className="absolute z-50"
                 style={{
                   top: '48%',
                   left: '21%',
                   transform: 'translateY(-50%)',
                   backgroundColor: 'transparent',
                   backdropFilter: 'none',
                   WebkitBackdropFilter: 'none',
                   border: 'none',
                   padding: '2.5rem',
                   borderRadius: '0px',
                   boxShadow: 'none',
                   maxWidth: '34rem',
                   width: '90vw',
                   maxHeight: '80vh'
                 }}>
                 <h1 style={{
                   fontSize: '2rem',
                   fontWeight: '700',
                   marginBottom: '1.5rem',
                   letterSpacing: '0.05em',
                   textTransform: 'uppercase',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   color: '#111827',
                   lineHeight: '1.2',
                   margin: '0 0 1.5rem 0',
                   textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                 }}>
                   THE CONGREGATION CENTER
                 </h1>
                 <p style={{
                   color: '#374151',
                   lineHeight: '1.7',
                   fontSize: '1rem',
                   margin: '0',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                 }}>
                   The Congregation Center is a visionary multipurpose tower conceived at the intersection of modern design, community engagement, and urban sustainability. Functioning as a vibrant vertical neighborhood, the project seamlessly integrates commercial, residential, office, and event spaces into a single, cohesive structure. Its most defining architectural feature is the dynamic, staggered form, an intentional design choice that generates a series of green terraces and gardens on various levels, weaving nature into the building's fabric. At its base, an inviting open plaza connects directly to the urban landscape, creating a welcoming hub for public life and activity. The Congregation Center is designed not just as a building, but as a living ecosystem that fosters connection, promotes a sustainable lifestyle, and enhances the surrounding community.
                 </p>
               </div>

               {/* Interactive Buttons - Updated positions */}
               {/* Button 1 */}
               <button
                 onClick={() => handleButtonClick(1)}
                 className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 1 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 } ${
                   firstInteraction && !activeButton ? 'gentle-pulse' : ''
                 } ${
                   showButton1Glow && !activeButton ? 'button-glow border border-orange-500' : ''
                 }`}
                 style={{
                   top: '19.25%',
                   left: '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: showButton1Glow && !activeButton ? '1px solid rgba(249, 115, 22, 0.5)' : 'none'
                 }}
                 aria-label="View content 1"
               >
                 <span className="hover-scale-number">1</span>
               </button>

               {/* Button 2 */}
               <button
                 onClick={() => handleButtonClick(2)}
                 className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 2 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: '22.9%',
                   left: '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 2"
               >
                 <span className="hover-scale-number">2</span>
               </button>

               {/* Button 3 */}
               <button
                 onClick={() => handleButtonClick(3)}
                 className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 3 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: '26.6%',
                   left: '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 3"
               >
                 <span className="hover-scale-number">3</span>
               </button>

               {/* Button 4 */}
               <button
                 onClick={() => handleButtonClick(4)}
                 className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 4 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: '30.33%',
                   left: '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 4"
               >
                 <span className="hover-scale-number">4</span>
               </button>

               {/* Button 5 */}
               <button
                 onClick={() => handleButtonClick(5)}
                 className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 5 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: '34%',
                   left: '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 5"
               >
                 <span className="hover-scale-number">5</span>
               </button>

               {/* Button 6 */}
               <button
                 onClick={() => handleButtonClick(6)}
                 className={`absolute w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 z-40 bg-transparent text-orange-500 button-area-cursor ${
                   activeButton === 6 
                     ? 'animate-ping-slow border border-orange-500' 
                     : ''
                 }`}
                 style={{
                   top: '37.7%',
                   left: '36.53%',
                   fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                   border: 'none'
                 }}
                 aria-label="View content 6"
               >
                 <span className="hover-scale-number">6</span>
               </button>

               {/* Initial Hint Text */}
               {showInitialHint && (
                 <motion.div
                   className="absolute z-30 flex items-center justify-center"
                   style={{
                     top: '18%',
                     left: '38.15%',
                     width: '23%',
                     height: '60%'
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
                       fontSize: '1.5rem',
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

               {/* Content Display System */}
               {(activeButton || isDeactivating) && (
                 <>
                   {/* Title Text Box - Moved higher to avoid being behind render box */}
                   <motion.div
                     className="absolute bg-transparent backdrop-blur-none rounded-lg z-35 flex items-center justify-start"
                     style={{
                       top: '8%',
                       left: '38.15%',
                       width: '23%',
                       height: '8%'
                     }}
                     initial={{ opacity: 0, x: -30 }}
                     animate={showTitle ? { 
                       opacity: 1, 
                       x: 0 
                     } : { 
                       opacity: 0, 
                       x: -30 
                     }}
                     transition={{ 
                       duration: 0.6, 
                       ease: [0.25, 0.1, 0.25, 1] // Gentle architectural easing
                     }}
                   >
                     <h3 
                       className="text-left text-gray-800"
                       style={{
                         fontFamily: "'Helvetica Neue Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                         fontWeight: 'bold',
                         fontSize: '1.9rem',
                         margin: '0'
                       }}
                     >
                       {contentData[activeButton as keyof typeof contentData].title}
                     </h3>
                   </motion.div>

                   {/* Content Display Box */}
                   <motion.div
                     className="absolute bg-transparent border-transparent backdrop-blur-none rounded-lg z-30 flex items-center justify-center"
                     style={{
                       top: '18%',
                       left: '38.15%',
                       width: '23%',
                       height: '60%'
                     }}
                     initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                     animate={showContent ? { 
                       opacity: 1, 
                       scale: 1, 
                       filter: 'blur(0px)' 
                     } : { 
                       opacity: 0, 
                       scale: 0.95, 
                       filter: 'blur(4px)' 
                     }}
                     transition={{ 
                       duration: 0.5, 
                       ease: [0.25, 0.1, 0.25, 1] // Architectural easing
                     }}
                   >
                     {activeButton === 1 ? (
                       /* Content for Button 1 - Display video */
                       <div className="w-full h-full flex items-center justify-center p-2">
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
                       /* Content for Button 2 - Display c2.png image */
                       <div className="w-full h-full flex items-center justify-center p-2">
                         <Image
                           src="/undergrad-projects/congregation-center/c2.png"
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
                       /* Content for Button 3 - Display c3.png image */
                       <div className="w-full h-full flex items-center justify-center p-2">
                         <Image
                           src="/undergrad-projects/congregation-center/c3.png"
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
                       /* Content for Button 4 - Display c4.png image */
                       <div className="w-full h-full flex items-center justify-center p-2">
                         <Image
                           src="/undergrad-projects/congregation-center/c4.png"
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
                       /* Content for Button 5 - Display c5.png image */
                       <div className="w-full h-full flex items-center justify-center p-2">
                         <Image
                           src="/undergrad-projects/congregation-center/c5.png"
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
                       /* Content for Button 6 - Display c6.png image */
                       <div className="w-full h-full flex items-center justify-center p-2">
                         <Image
                           src="/undergrad-projects/congregation-center/c6.png"
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

                   {/* Description Text Box - Moved lower to avoid being behind render box */}
                   <div
                     className="absolute bg-transparent backdrop-blur-none rounded-lg z-35 flex items-start justify-start transition-all duration-300"
                     style={{
                       top: '80%',
                       left: '49.65%',
                       width: '23%',
                       height: '18%',
                       transform: 'translateX(-50%)'
                     }}
                   >
                     <div 
                       className="text-left text-gray-700 px-3 py-2 w-full h-full"
                       style={{
                         fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                         fontSize: '1.275rem',
                         lineHeight: '1.4',
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
                   </div>
                 </>
               )}
            </div>
          </div>
        </div>
      </main>
      </div>
  );
}