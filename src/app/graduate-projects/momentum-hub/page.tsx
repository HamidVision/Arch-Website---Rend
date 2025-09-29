'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Import GSAP with proper client-side handling
import { gsap } from 'gsap';

export default function MomentumHubPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentBox1Ref = useRef<HTMLDivElement>(null);
  const contentBox2Ref = useRef<HTMLDivElement>(null);
  const contentBox3Ref = useRef<HTMLDivElement>(null);
  const contentBox4Ref = useRef<HTMLDivElement>(null);
  const contentBox5Ref = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add CSS keyframes for pulse animation and mosaic reveal
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-glow {
        0% {
          box-shadow: 0 0 0 2px #ee7d30, 0 0 20px rgba(238, 125, 48, 0.8);
        }
        50% {
          box-shadow: 0 0 0 2px #ff9a56, 0 0 30px rgba(255, 154, 86, 0.9);
        }
        100% {
          box-shadow: 0 0 0 2px #ee7d30, 0 0 20px rgba(238, 125, 48, 0.8);
        }
      }
      
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [showContentBox5, setShowContentBox5] = useState(false);
  
  // Typewriter animation states for text boxes
  const [typewriterStates, setTypewriterStates] = useState({
    water: { isTyping: false, currentText: '', fullText: '' },
    economy: { isTyping: false, currentText: '', fullText: '' },
    ecology: { isTyping: false, currentText: '', fullText: '' },
    resources: { isTyping: false, currentText: '', fullText: '' }
  });

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


  // Scroll-triggered animation for content box images with automatic glow hints
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const contentBoxes = [
      { ref: contentBox1Ref, triggerPoint: 0.2 },
      { ref: contentBox2Ref, triggerPoint: 0.4 },
      { ref: contentBox3Ref, triggerPoint: 0.6 },
      { ref: contentBox4Ref, triggerPoint: 0.8 }
    ];

    // Set initial state for all images using CSS
    contentBoxes.forEach(({ ref }) => {
      if (ref.current) {
        const img = ref.current.querySelector('img');
        if (img) {
          img.style.opacity = '0';
          img.style.transform = 'scale(0.8)';
          img.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        }
      }
    });

    // Set initial state for content box 5 (invisible until button activation)
    if (contentBox5Ref.current) {
      const box5 = contentBox5Ref.current;
      const img5 = box5.querySelector('img');
      
      box5.style.opacity = '0';
      box5.style.transform = 'scale(0.8) translateX(20px)';
      box5.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
      
      if (img5) {
        img5.style.opacity = '0';
        img5.style.transform = 'scale(0.8)';
        img5.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      }
    }

    // Track which images have been animated and their glow timers
    const animatedImages = new Set();
    const glowTimers = new Map();

    // Custom scroll handler for horizontal scrolling
    const handleScroll = () => {
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const scrollProgress = maxScroll > 0 ? scrollLeft / maxScroll : 0;

      contentBoxes.forEach(({ ref, triggerPoint }) => {
        if (ref.current && !animatedImages.has(ref.current)) {
          const img = ref.current.querySelector('img');
          if (img && scrollProgress >= triggerPoint) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
            animatedImages.add(ref.current);
            
            // Start glow animation after fade+scale completes (2.5 seconds delay)
            const timer = setTimeout(() => {
              if (ref.current) {
                ref.current.style.animation = 'pulse-glow 1.5s ease-in-out infinite';
              }
            }, 2500);
            
            glowTimers.set(ref.current, timer);
          }
        }
      });
    };

    // Add scroll listener
    container.addEventListener('scroll', handleScroll);

    // Check initial state
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      // Clear all glow timers on cleanup
      glowTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Typewriter animation function
  const startTypewriter = (boxType: keyof typeof typewriterStates, fullText: string) => {
    setTypewriterStates(prev => ({
      ...prev,
      [boxType]: {
        isTyping: true,
        currentText: '',
        fullText: fullText
      }
    }));

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypewriterStates(prev => ({
          ...prev,
          [boxType]: {
            ...prev[boxType],
            currentText: fullText.substring(0, currentIndex + 1)
          }
        }));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTypewriterStates(prev => ({
          ...prev,
          [boxType]: {
            ...prev[boxType],
            isTyping: false
          }
        }));
      }
    }, 30); // Adjust speed as needed
  };

  // Scroll-triggered typewriter animations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.scrollWidth - container.clientWidth;
      const scrollProgress = scrollLeft / containerWidth;

      // Define trigger points for each text box (adjust as needed)
      const triggerPoints = {
        water: 0.15,    // Start typing when 15% scrolled
        economy: 0.25,  // Start typing when 25% scrolled
        ecology: 0.35,  // Start typing when 35% scrolled
        resources: 0.45 // Start typing when 45% scrolled
      };

      // Check each text box
      Object.entries(triggerPoints).forEach(([boxType, triggerPoint]) => {
        const state = typewriterStates[boxType as keyof typeof typewriterStates];
        
        if (scrollProgress >= triggerPoint && !state.isTyping && state.currentText === '') {
          // Define the full text for each box
          const texts = {
            water: "The existing drainage and wastewater collection is a blend of combined, separate, and non-sewered systems. Heavy rainfall can strain these systems, causing the volume of wastewater and sewage to exceed capacity and resulting in untreated waste entering the water system. Currently, there is no water reuse or rainwater harvesting.This building is designed to retain rainwater from its rooftop, and hardscaped surfaces will direct water to storage tanks for retention and filtration. All wastewater will be treated on-site before being released into the waterways, where it will be further filtered to drinking water quality.",
            economy: "Unemployment and the lack of a stable income can negatively impact people's sense of stability. This design aims to enhance job security within the community. The building itself will be constructed by community members who will also design, build, and maintain all of its systems.",
            ecology: "This project provides guidelines for a sustainable society, ensuring the conservation of natural quality, particularly for the soil. Different types of waste will be treated before entering the groundwater. Pollution will be reduced at its source through the promotion of clean transport, clean industry, and clean agriculture, which will result in savings on health expenditures.",
            resources: "The model features a cross-laminated timber (CLT) system, a carbon-storing structure made from wood, which is a local resource in Washington State. Using CLT can increase the size of the built area by 10%. This process also allows for a structure to be built on a particular piece of land and then, after deconstruction, the land can be reused."
          };
          
          startTypewriter(boxType as keyof typeof typewriterStates, texts[boxType as keyof typeof texts]);
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [typewriterStates]);

  // Simple fade in/out for content box 5 (Phase 1)
  useEffect(() => {
    if (showContentBox5 && contentBox5Ref.current) {
      const box5 = contentBox5Ref.current;
      const img5 = box5.querySelector('img');
      
      // Simple fade in
      box5.style.opacity = '1';
      box5.style.transform = 'scale(1)';
      
      if (img5) {
        img5.style.opacity = '1';
      }
      
      // Start glow animation after a short delay
      setTimeout(() => {
        box5.style.animation = 'pulse-glow 1.5s ease-in-out infinite';
      }, 500);
      
    } else if (!showContentBox5 && contentBox5Ref.current) {
      // Simple fade out
      const box5 = contentBox5Ref.current;
      const img5 = box5.querySelector('img');
      
      // Stop glow animation
      box5.style.animation = 'none';
      
      // Quick fade out
      box5.style.opacity = '0';
      
      if (img5) {
        img5.style.opacity = '0';
      }
    }
  }, [showContentBox5]);

  // Enhanced box hover handlers - zoom on hover, restart glow on leave
  const handleBoxMouseEnter = (boxRef: React.RefObject<HTMLDivElement>) => {
    if (boxRef.current) {
      const img = boxRef.current.querySelector('img');
      const box = boxRef.current;
      
      // Stop glow animation and activate zoom
      box.style.animation = 'none';
      
      if (img) {
        img.style.transition = 'transform 0.3s ease-out';
        img.style.transform = 'scale(1.25)';
      }
    }
  };

  const handleBoxMouseLeave = (boxRef: React.RefObject<HTMLDivElement>) => {
    if (boxRef.current) {
      const img = boxRef.current.querySelector('img');
      const box = boxRef.current;
      
      // Reset zoom
      if (img) {
        img.style.transform = 'scale(1)';
      }
      
      // Restart glow animation after zoom resets
      setTimeout(() => {
        box.style.animation = 'pulse-glow 1.5s ease-in-out infinite';
      }, 300);
    }
  };

  const handleButtonClick = (buttonNumber: number) => {
    // Toggle content box 5
    setShowContentBox5(!showContentBox5);
  };


  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <main className="relative h-screen overflow-hidden bg-black">
        {/* Custom Header matching undergrad-projects page */}
        <button
          onClick={() => window.history.back()}
          className="fixed top-8 left-8 hover:opacity-75 transition-opacity z-[100] bg-transparent border-none outline-none cursor-pointer"
          aria-label="Go to homepage"
        >
          <div className="relative h-6 w-6 overflow-visible flex items-center justify-center">
            <Image
              src="/icons/ui/logo-header.svg"
              alt="Architecture Portfolio Logo"
              fill
              className="object-contain pointer-events-none transform-gpu origin-center scale-[3] will-change-transform"
              priority
            />
          </div>
        </button>
        
        {/* Portfolio and Menu Buttons */}
        <div className="fixed top-6 right-6 z-[100]">
          <div className="flex items-center space-x-6">
            {/* Portfolio Button */}
            <button
              onClick={() => window.location.href = '/graduate-projects'}
              className="focus:outline-none"
              aria-label="Go to graduate projects"
              title="Go to graduate projects"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="6" height="6" rx="1" stroke="black" strokeWidth="1.5"/>
                <rect x="14" y="4" width="6" height="6" rx="1" stroke="black" strokeWidth="1.5"/>
                <rect x="14" y="14" width="6" height="6" rx="1" stroke="black" strokeWidth="1.5"/>
                <rect x="4" y="14" width="6" height="6" rx="1" stroke="black" strokeWidth="1.5"/>
              </svg>
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative h-6 w-8 focus:outline-none"
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
                <span className="absolute block h-0.5 w-6 transform bg-black transition duration-300 ease-in-out -translate-y-1"></span>
                <span className="absolute block h-0.5 w-6 transform bg-black transition duration-300 ease-in-out translate-y-1"></span>
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
                 src="/graduate-projects/momentum-hub/momentum-hero.jpg"
                 alt="Momentum Hub - Main View"
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
                   top: '27%',
                   left: '19.5%',
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
                   MOMENTUM HUB
                 </h1>
                 <p style={{
                   color: '#374151',
                   lineHeight: '1.7',
                   fontSize: '1.2rem',
                   margin: '0',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '1px 1px 2px rgba(255, 255, 255, 0.8)'
                 }}>
                   With rising living standards, daily calorie intake has surged from 2,880 in 1961 to 3,682 in 2013, and is projected to reach 3,950 by 2030 (FAOSTAT). The recommended daily intake is 2,000 calories for women and 2,500 for men. Despite the abundance of gyms, the fast pace of urban life and work pressures leave little time for exercise, causing excess calories to go unburned. This contributes to weight gain and higher healthcare costs related to obesity. This proposal aims to design an environment that seamlessly integrates physical activity into daily routines, such as working and shopping, to help people burn more calories and address excessive calorie intake.
                 </p>
               </div>

               {/* Content Box 5 Activation Button */}
               <button
                 onClick={() => handleButtonClick(5)}
                 className={`absolute w-7 h-7 rounded-full transition-all duration-300 z-40 button-area-cursor ${
                   !showContentBox5 ? 'animate-pulse' : ''
                 }`}
                 style={{
                   top: '40.7%',
                   left: '82.82%',
                   backgroundColor: 'transparent',
                   border: '2px solid #ea580c',
                   opacity: '1'
                 }}
                 aria-label="Toggle content box 5"
               >
               </button>



               {/* Content Box 1 - Always Visible */}
               <div
                 ref={contentBox1Ref}
                 className="absolute z-50 cursor-pointer"
                 style={{
                   top: '5%',
                   left: '43.5%',
                   width: '7.5%',
                   height: '35%',
                   backgroundColor: 'transparent',
                   borderRadius: '8px',
                   backdropFilter: 'blur(2px)',
                   boxShadow: '0 0 0 2px #ee7d30'
                 }}
                 onMouseEnter={() => handleBoxMouseEnter(contentBox1Ref)}
                 onMouseLeave={() => handleBoxMouseLeave(contentBox1Ref)}
               >
                 <div className="w-full h-full flex items-center justify-center p-1">
                   <Image
                     src="/graduate-projects/momentum-hub/Momentum-1.png"
                     alt="Momentum Hub Content 1"
                     width={0}
                     height={0}
                     sizes="100%"
                     className="w-full h-full object-contain"
                     style={{
                       width: 'auto',
                       height: 'auto',
                       maxWidth: '100%',
                       maxHeight: '100%'
                     }}
                   />
                 </div>
               </div>

               {/* Content Box 2 - Always Visible */}
               <div
                 ref={contentBox2Ref}
                 className="absolute z-50 cursor-pointer"
                 style={{
                   top: '5%',
                   left: '51.03%',
                   width: '7.5%',
                   height: '35%',
                   backgroundColor: 'transparent',
                   borderRadius: '8px',
                   backdropFilter: 'blur(2px)',
                   boxShadow: '0 0 0 2px #ee7d30'
                 }}
                 onMouseEnter={() => handleBoxMouseEnter(contentBox2Ref)}
                 onMouseLeave={() => handleBoxMouseLeave(contentBox2Ref)}
               >
                 <div className="w-full h-full flex items-center justify-center p-1">
                   <Image
                     src="/graduate-projects/momentum-hub/momentum-2.png"
                     alt="Momentum Hub Content 2"
                     width={0}
                     height={0}
                     sizes="100%"
                     className="w-full h-full object-contain"
                     style={{
                       width: 'auto',
                       height: 'auto',
                       maxWidth: '100%',
                       maxHeight: '100%'
                     }}
                   />
                 </div>
               </div>

               {/* Content Box 3 - Always Visible */}
               <div
                 ref={contentBox3Ref}
                 className="absolute z-50 cursor-pointer"
                 style={{
                   top: '5%',
                   left: '67.5%',
                   width: '6%',
                   height: '27%',
                   backgroundColor: 'transparent',
                   borderRadius: '8px',
                   backdropFilter: 'blur(2px)',
                   boxShadow: '0 0 0 2px #ee7d30'
                 }}
                 onMouseEnter={() => handleBoxMouseEnter(contentBox3Ref)}
                 onMouseLeave={() => handleBoxMouseLeave(contentBox3Ref)}
               >
                 <div className="w-full h-full flex items-center justify-center p-1">
                   <Image
                     src="/graduate-projects/momentum-hub/momentum-3.png"
                     alt="Momentum Hub Content 3"
                     width={0}
                     height={0}
                     sizes="100%"
                     className="w-full h-full object-contain"
                     style={{
                       width: 'auto',
                       height: 'auto',
                       maxWidth: '100%',
                       maxHeight: '100%'
                     }}
                   />
                 </div>
               </div>

               {/* Content Box 4 - Always Visible */}
               <div
                 ref={contentBox4Ref}
                 className="absolute z-50 cursor-pointer"
                 style={{
                   top: '5%',
                   left: '89%',
                   width: '6%',
                   height: '27%',
                   backgroundColor: 'transparent',
                   borderRadius: '8px',
                   backdropFilter: 'blur(2px)',
                   boxShadow: '0 0 0 2px #ee7d30'
                 }}
                 onMouseEnter={() => handleBoxMouseEnter(contentBox4Ref)}
                 onMouseLeave={() => handleBoxMouseLeave(contentBox4Ref)}
               >
                 <div className="w-full h-full flex items-center justify-center p-1">
                   <Image
                     src="/graduate-projects/momentum-hub/Momentum-4.png"
                     alt="Momentum Hub Content 4"
                     width={0}
                     height={0}
                     sizes="100%"
                     className="w-full h-full object-contain"
                     style={{
                       width: 'auto',
                       height: 'auto',
                       maxWidth: '100%',
                       maxHeight: '100%'
                     }}
                   />
                 </div>
               </div>

               {/* Text Box 1 */}
               <div
                 className="absolute z-40"
                 style={{
                   top: '40.3%',
                   left: '47%',
                   width: '14.5%',
                   height: '20%',
                   backgroundColor: 'transparent',
                   borderRadius: '12px',
                   padding: '1.5rem',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-start'
                 }}
               >
                 <h3 style={{
                   fontSize: '2rem',
                   fontWeight: '700',
                   color: '#374151',
                   marginBottom: '1rem',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                 }}>
                   Design for Water
                 </h3>
                 <p style={{
                   color: '#374151',
                   lineHeight: '1.6',
                   fontSize: '1.1rem',
                   margin: '0',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
                 }}>
                   {typewriterStates.water.currentText}
                   {typewriterStates.water.isTyping && <span style={{ opacity: 0.7 }}>|</span>}
                 </p>
               </div>

               {/* Text Box 2 */}
               <div
                 className="absolute z-40"
                 style={{
                   top: '54%',
                   left: '47%',
                   width: '4%',
                   height: '40%',
                   backgroundColor: 'transparent',
                   borderRadius: '12px',
                   padding: '1.5rem',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-start'
                 }}
               >
                 <h3 style={{
                   fontSize: '2rem',
                   fontWeight: '700',
                   color: '#374151',
                   marginBottom: '1rem',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                 }}>
                   Design for Economy
                 </h3>
                 <p style={{
                   color: '#374151',
                   lineHeight: '1.6',
                   fontSize: '1.1rem',
                   margin: '0',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
                 }}>
                   {typewriterStates.economy.currentText}
                   {typewriterStates.economy.isTyping && <span style={{ opacity: 0.7 }}>|</span>}
                 </p>
               </div>

               {/* Text Box 3 */}
               <div
                 className="absolute z-40"
                 style={{
                   top: '41%',
                   left: '70.5%',
                   width: '3.7%',
                   height: '40%',
                   backgroundColor: 'transparent',
                   borderRadius: '12px',
                   padding: '1.5rem',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-start'
                 }}
               >
                 <h3 style={{
                   fontSize: '2rem',
                   fontWeight: '700',
                   color: '#374151',
                   marginBottom: '1rem',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                 }}>
                   Design for Ecology
                 </h3>
                 <p style={{
                   color: '#374151',
                   lineHeight: '1.6',
                   fontSize: '1.1rem',
                   margin: '0',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
                 }}>
                   {typewriterStates.ecology.currentText}
                   {typewriterStates.ecology.isTyping && <span style={{ opacity: 0.7 }}>|</span>}
                 </p>
               </div>

               {/* Text Box 4 */}
               <div
                 className="absolute z-40"
                 style={{
                   top: '3.5%',
                   left: '85%',
                   width: '4%',
                   height: '50%',
                   backgroundColor: 'transparent',
                   borderRadius: '12px',
                   padding: '1.5rem',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-start'
                 }}
               >
                 <h3 style={{
                   fontSize: '2rem',
                   fontWeight: '700',
                   color: '#374151',
                   marginBottom: '1rem',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                 }}>
                   Design for Resources
                 </h3>
                 <p style={{
                   color: '#374151',
                   lineHeight: '1.6',
                   fontSize: '1.1rem',
                   margin: '0',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
                 }}>
                   {typewriterStates.resources.currentText}
                   {typewriterStates.resources.isTyping && <span style={{ opacity: 0.7 }}>|</span>}
                 </p>
               </div>

               {/* Text Box 5 - Title Only */}
               <div
                 className="absolute z-40"
                 style={{
                   top: '7.8%',
                   left: '63%',
                   width: '15%',
                   height: '10%',
                   backgroundColor: 'transparent',
                   borderRadius: '12px',
                   padding: '1.5rem',
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'flex-start'
                 }}
               >
                 <h3 style={{
                   fontSize: '2rem',
                   fontWeight: '700',
                   color: '#374151',
                   marginBottom: '0',
                   fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                   textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                 }}>
                   Design for Integration
                 </h3>
               </div>

               {/* SVG Animation Line */}
               <svg className="absolute z-[60]" style={{ top: '0', left: '0', width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1000 1000" preserveAspectRatio="none">
                 {/* Elegant curved line between points */}
                 <path
                   id="curvedPath"
                   d="M 178 187 C 190 220, 200 280, 195 350 C 190 420, 180 500, 170 580 C 160 650, 150 720, 187 778"
                   stroke="#ee7d30"
                   strokeWidth="0.3"
                   strokeLinecap="round"
                   fill="none"
                 />
                 
                 {/* Moving arrow animation */}
                 <polygon points="0,-3 6,0 0,3 -1,0" fill="#ee7d30" stroke="#ee7d30" strokeWidth="0.2">
                   <animateMotion
                     dur="3s"
                     repeatCount="indefinite"
                     rotate="auto"
                   >
                     <mpath href="#curvedPath" />
                   </animateMotion>
                 </polygon>
               </svg>

               {/* Content Box 5 - Button Activated */}
               {showContentBox5 && (
                 <div
                   ref={contentBox5Ref}
                   className="absolute z-50 cursor-pointer"
                   style={{
                     top: '5%',
                     left: '74%',
                     width: '8.49%',
                     height: '49%',
                     backgroundColor: 'transparent',
                     borderRadius: '8px',
                     backdropFilter: 'blur(2px)',
                     boxShadow: '0 0 0 2px #ee7d30'
                   }}
                 >
                   <div className="w-full h-full flex items-center justify-center p-1">
                     <Image
                       src="/graduate-projects/momentum-hub/Momentum-5.png"
                       alt="Momentum Hub Content 5"
                       width={0}
                       height={0}
                       sizes="100%"
                       className="w-full h-full object-contain"
                       style={{
                         width: 'auto',
                         height: 'auto',
                         maxWidth: '100%',
                         maxHeight: '100%'
                       }}
                     />
                   </div>
                 </div>
               )}

            </div>
          </div>
        </div>
      </main>
      
      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/75 z-[65] flex items-center justify-center">
          <nav className="text-center">
            <ul className="space-y-8 text-white">
              <li><a href="/" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a></li>
              <li><a href="/undergrad-projects" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Undergrad Projects</a></li>
              <li><a href="/graduate-projects" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Graduate Projects</a></li>
              <li><a href="/about" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a></li>
              <li><a href="/contact" className="text-2xl font-light tracking-widest uppercase hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>
        </div>
      )}
      </div>
  );
}
