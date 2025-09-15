'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

const WellnessBazaarPage: React.FC = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [showInitialHint, setShowInitialHint] = useState(true);
  const [firstInteraction, setFirstInteraction] = useState(true);
  const [showButton1Glow, setShowButton1Glow] = useState(false);

  const handleBackClick = () => {
    router.push('/graduate-projects');
  };

  const handlePortfolioClick = () => {
    router.push('/');
  };

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

  // Content data for each button - Wellness Bazaar specific content
  const contentData = {
    1: { title: "Wellness Center - Raw Section Cut", description: "The heart of the Wellness Bazaar features a comprehensive wellness center that integrates traditional and modern healing practices. This space includes meditation rooms, yoga studios, and therapy spaces designed with biophilic principles. Natural light floods through strategically placed skylights, while living walls and water features create a serene environment that promotes mental and physical wellbeing. The center serves as a sanctuary for community members seeking holistic health solutions and personal growth." },
    2: { title: "Health Clinic - Day Time Section Cut", description: "A modern healthcare facility that combines conventional medicine with alternative therapies under one roof. The clinic features flexible consultation rooms, a pharmacy, and specialized treatment areas for acupuncture, massage therapy, and nutritional counseling. The design emphasizes patient comfort and privacy while maintaining efficiency for healthcare providers. Natural materials and calming color palettes create a healing environment that reduces patient anxiety and promotes recovery.." },
    3: { title: "Fitness Hub - Night Time Section Cut", description: "A state-of-the-art fitness facility that caters to all fitness levels and preferences. The hub includes cardio equipment, weight training areas, group exercise studios, and an indoor swimming pool. The space is designed with natural ventilation and abundant daylight, creating an energizing yet comfortable environment. Flexible partition systems allow the space to adapt to different activities, from high-intensity workouts to gentle rehabilitation exercises." },
    4: { title: "Retail Marketplace", description: "A curated marketplace featuring local artisans, wellness products, and organic foods. The retail space showcases sustainable and ethically sourced goods, supporting local businesses while promoting conscious consumption. The marketplace includes a café serving healthy, locally-sourced meals and beverages. The design creates a welcoming shopping experience with natural materials and open layouts that encourage exploration and discovery of new wellness products and services." },
    5: { title: "Community Garden", description: "An innovative rooftop garden that transforms urban agriculture into a therapeutic experience. This vertical farming system not only provides fresh, organic produce for the community but also serves as an educational space for sustainable living practices. The garden features raised beds, composting stations, and rainwater collection systems, demonstrating environmental stewardship while offering residents hands-on learning opportunities about nutrition and ecological responsibility." },
    6: { title: "Educational Center", description: "A learning hub dedicated to wellness education and skill development. The center offers workshops on nutrition, stress management, mindfulness, and sustainable living practices. Interactive displays and demonstration kitchens provide hands-on learning experiences. The space is designed to foster community connections through shared learning, with flexible seating arrangements that encourage collaboration and knowledge exchange among participants." }
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
                src="/graduate-projects/wellness-bazaar/wellness-hero.jpg"
                alt="Wellness Bazaar - Main View"
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
                  top: '17.5%',
                  left: '1%',
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
                  fontSize: '2.5rem',
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
                  THE WELLNESS BAZAAR
                </h1>
                <p style={{
                  color: '#374151',
                  lineHeight: '1.7',
                  fontSize: '1.1rem',
                  margin: '0',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                }}>
                  The Wellness Bazaar represents a comprehensive approach to community health and wellbeing, integrating healthcare services, wellness programs, and sustainable design principles. This innovative complex serves as a hub for holistic health practices, bringing together traditional and modern approaches to wellness in a thoughtfully designed environment. The project features specialized spaces for fitness, education, healthcare, and community engagement, all unified under a single architectural vision that prioritizes human wellbeing and environmental sustainability.
                </p>
              </div>

              {/* Interactive Buttons */}
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
                  top: '20%',
                  left: '75.5%',
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
                  top: '24%',
                  left: '75.5%',
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
                  top: '28%',
                  left: '75.5%',
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
                  top: '32%',
                  left: '75.5%',
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
                  top: '36%',
                  left: '75.5%',
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
                  top: '40%',
                  left: '75.5%',
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
                  {/* Title Text Box */}
                  <motion.div
                    className="absolute bg-transparent backdrop-blur-none rounded-lg z-35 flex items-center justify-start"
                    style={{
                      top: '8%',
                      left: '63.3%',
                      width: '12%',
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
                      ease: [0.25, 0.1, 0.25, 1]
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
                    className="absolute bg-transparent backdrop-blur-none rounded-lg z-30 flex items-center justify-center"
                    style={{
                      top: '18%',
                      left: '63%',
                      width: '12%',
                      height: '58%',
                      border: '2px solid #ee7d2f'
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
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    {activeButton === 1 ? (
                      /* Content for Button 1 - Display wellness-1.jpg */
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <Image
                          src="/graduate-projects/wellness-bazaar/wellness-1.jpg"
                          alt="Wellness Center - Level 1 Content"
                          width={0}
                          height={0}
                          sizes="100%"
                          className="w-full h-full object-contain rounded-md"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    ) : activeButton === 2 ? (
                      /* Content for Button 2 - Display wellness-2.jpg */
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <Image
                          src="/graduate-projects/wellness-bazaar/wellness-2.jpg"
                          alt="Health Clinic - Day Time Section Cut"
                          width={0}
                          height={0}
                          sizes="100%"
                          className="w-full h-full object-contain rounded-md"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    ) : activeButton === 3 ? (
                      /* Content for Button 3 - Display wellness-3.png */
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <Image
                          src="/graduate-projects/wellness-bazaar/wellness-3.png"
                          alt="Fitness Hub - Night Time Section Cut"
                          width={0}
                          height={0}
                          sizes="100%"
                          className="w-full h-full object-contain rounded-md"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    ) : activeButton === 4 ? (
                      /* Content for Button 4 - Display wellness-4.jpg */
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <Image
                          src="/graduate-projects/wellness-bazaar/wellness-4.jpg"
                          alt="Retail Marketplace"
                          width={0}
                          height={0}
                          sizes="100%"
                          className="w-full h-full object-contain rounded-md"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    ) : activeButton === 5 ? (
                      /* Content for Button 5 - Display wellness-5.jpg */
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <Image
                          src="/graduate-projects/wellness-bazaar/wellness-5.jpg"
                          alt="Community Garden"
                          width={0}
                          height={0}
                          sizes="100%"
                          className="w-full h-full object-contain rounded-md"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    ) : activeButton === 6 ? (
                      /* Content for Button 6 - Empty content box since image appears as overlay */
                      <div className="w-full h-full flex items-center justify-center p-2 bg-transparent rounded-md">
                        <span className="text-transparent text-sm">Button 6 Content</span>
                      </div>
                    ) : null}
                  </motion.div>

                  {/* Description Text Box */}
                  <div
                    className="absolute bg-transparent backdrop-blur-none rounded-lg z-35 flex items-start justify-start transition-all duration-300"
                    style={{
                      top: '80%',
                      left: '69.2%',
                      width: '12%',
                      height: '25%',
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

              {/* Overlay Image - Changes based on active button */}
              <div className="absolute z-30" style={{
                top: '0',
                right: '0',
                height: '100vh',
                width: 'auto'
              }}>
                <Image
                  src={activeButton === 6 ? "/graduate-projects/wellness-bazaar/wellness-h1.jpg" : "/graduate-projects/wellness-bazaar/wellness-h2.jpg"}
                  alt={activeButton === 6 ? "Educational Center Overlay" : "Wellness Bazaar Overlay"}
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="h-screen w-auto object-contain"
                  style={{
                    width: 'auto',
                    height: '100vh'
                  }}
                  unoptimized={true}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WellnessBazaarPage;
