'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import GridOverlay from '@/components/GridOverlay';
import Connector from '@/components/Connector';
import Typewriter from '@/components/Typewriter';
import CodeReveal from '@/components/CodeReveal';
import { boxPositions } from '@/config/positions';
import { buildHomeTimeline } from '@/lib/timeline/home/TimelineCoordinator';
import { gsap } from 'gsap';
import { MatrixOverlay } from '@/components/MatrixOverlay';

const Hero: React.FC = () => {
  // State variables for conditional rendering
  const [showText, setShowText] = useState(true);
  const [showPlanOrigin, setShowPlanOrigin] = useState(false);
  const [showPlanBox, setShowPlanBox] = useState(false);
  const [dockIntoBox, setDockIntoBox] = useState(false);
  const [showAgentBox, setShowAgentBox] = useState(false);
  const [showPromptBox, setShowPromptBox] = useState(false);
  const [showScriptBox, setShowScriptBox] = useState(false);
  const [showCodeBox, setShowCodeBox] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isRevealingCode, setIsRevealingCode] = useState(false);
  const [fadeOutAll, setFadeOutAll] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  // Hero stage ref for container-relative positioning
  const heroRef = useRef<HTMLDivElement>(null);
  
  // GSAP Timeline refs
  const heroTextRef = useRef<HTMLDivElement>(null);
  const sitePlanOriginRef = useRef<HTMLDivElement>(null);
  const planBoxRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const matrixRegionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  
  // GSAP Timeline instance
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  // polling handle lives in a ref so we can clear it from any nested scope
  const pollIdRef = useRef<number | null>(null);
  // Flag to prevent multiple timeline builds
  const timelineBuiltRef = useRef(false);
  
  // Get search params for grid overlay
  const searchParams = useSearchParams();
  const gridParam = searchParams.get('grid');

  // Initialize grid state from URL parameter
  useEffect(() => {
    if (gridParam === '1') {
      setShowGrid(true);
    }
  }, [gridParam]);

  // Keyboard toggle for grid overlay
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'g' || event.key === 'G') {
        setShowGrid(!showGrid);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showGrid]);

  // GSAP Timeline integration
  useLayoutEffect(() => {
    // Build as soon as the always-present ref exists.
    const allRefsAvailable = () => {
      const refs = [
        heroTextRef.current,
        sitePlanOriginRef.current,
        planBoxRef.current,
        agentRef.current,
        promptRef.current,
        scriptRef.current,
        codeRef.current,
        matrixRegionRef.current,
        videoRef.current,
      ];
      
      return refs.every(Boolean);
    };

    const buildTimelineWhenReady = () => {
      if (!allRefsAvailable()) return;
      if (timelineRef.current || timelineBuiltRef.current) return; // build-once guard

      console.log('🎬 Building GSAP timeline...');

      // ----- refs object (types optional) -----
      const homeRefs = {
        heroRef: heroTextRef,
        sitePlanOriginRef,
        planBoxRef,
        agentRef,
        promptRef,
        scriptRef,
        codeRef,
        matrixRegionRef,
        videoRef,
      };

      // Controllers
      const controllers = {
        dockController: {
          startDock: () => {
            setTimeout(() => setDockIntoBox(true), 150);
          },
        },
        typingController: {
          start: () => setIsTyping(true),
          stop: () => setIsTyping(false),
        },
        codeController: {
          start: () => setIsRevealingCode(true),
          stop: () => setIsRevealingCode(false),
        },
        sequenceController: {
          updateSequence: (updates: any) => {
            if (updates.showText !== undefined) setShowText(updates.showText);
            if (updates.showPlanOrigin !== undefined) setShowPlanOrigin(updates.showPlanOrigin);
            if (updates.showPlanBox !== undefined) setShowPlanBox(updates.showPlanBox);
            if (updates.showAgentBox !== undefined) setShowAgentBox(updates.showAgentBox);
            if (updates.showPromptBox !== undefined) setShowPromptBox(updates.showPromptBox);
            if (updates.showScriptBox !== undefined) setShowScriptBox(updates.showScriptBox);
            if (updates.showCodeBox !== undefined) setShowCodeBox(updates.showCodeBox);
            if (updates.showMatrix !== undefined) setShowMatrix(updates.showMatrix);
            if (updates.showVideo !== undefined) setShowVideo(updates.showVideo);
            if (updates.fadeOutAll !== undefined) setFadeOutAll(updates.fadeOutAll);
            if (updates.isTyping !== undefined) setIsTyping(updates.isTyping);
            if (updates.isRevealingCode !== undefined) setIsRevealingCode(updates.isRevealingCode);
          },
        },
      };

      try {
        // Build the timeline
        const timeline = buildHomeTimeline(homeRefs, controllers);
        timelineRef.current = timeline;
        timelineBuiltRef.current = true;
        
        console.log('✅ GSAP timeline built successfully');
        
        // Start the timeline to trigger animations
        timeline.play();
        console.log('🎬 Animation sequence started');
        
        // Make timeline available for debugging
        if (process.env.NODE_ENV === 'development') {
          (window as any).__HE_TIMELINE__ = timeline;
        }
        
      } catch (error) {
        console.error('❌ Error building GSAP timeline:', error);
        timelineBuiltRef.current = true; // Prevent infinite retries
      }
    };

    // Polling logic
    const pollForRefs = () => {
      if (allRefsAvailable()) {
        buildTimelineWhenReady();
        return;
      }

      pollIdRef.current = window.setTimeout(pollForRefs, 100);
    };

    pollForRefs();

    // Cleanup
    return () => {
      if (pollIdRef.current) {
        clearTimeout(pollIdRef.current);
        pollIdRef.current = null;
      }
      
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      
      timelineBuiltRef.current = false;
    };
  }, []); // Empty dependency array for single execution

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid Overlay */}
      {showGrid && <GridOverlay />}
      
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.jpg" 
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 flex items-center justify-center min-h-screen">
        {/* Hero Text - Removed for clean background */}

        {/* Site Plan Origin */}
        {showPlanOrigin && (
          <div ref={sitePlanOriginRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img 
              src="/images/projects/wellness/site-plan.svg" 
              alt="Site Plan Origin"
              className="w-32 h-32"
            />
          </div>
        )}

        {/* Plan Box */}
        {showPlanBox && (
          <div ref={planBoxRef} className="absolute top-1/4 left-1/4">
            <div className="bg-blue-500 p-4 rounded-lg">
              <h3>Site Plan</h3>
              <p>Architectural foundation</p>
            </div>
          </div>
        )}

        {/* Agent Box */}
        {showAgentBox && (
          <div ref={agentRef} className="absolute top-1/3 right-1/4">
            <div className="bg-green-500 p-4 rounded-lg">
              <h3>AI Agent</h3>
              <p>Intelligent assistance</p>
            </div>
          </div>
        )}

        {/* Prompt Box */}
        {showPromptBox && (
          <div ref={promptRef} className="absolute bottom-1/3 left-1/3">
            <div className="bg-yellow-500 p-4 rounded-lg">
              <h3>Prompt</h3>
              <p>Creative direction</p>
            </div>
          </div>
        )}

        {/* Script Box */}
        {showScriptBox && (
          <div ref={scriptRef} className="absolute bottom-1/4 right-1/3">
            <div className="bg-purple-500 p-4 rounded-lg">
              <h3>Script</h3>
              <p>Code generation</p>
            </div>
          </div>
        )}

        {/* Code Box */}
        {showCodeBox && (
          <div ref={codeRef} className="absolute bottom-1/4 left-1/4">
            <div className="bg-red-500 p-4 rounded-lg">
              <CodeReveal 
                code="console.log('Hello, World!');"
                isRevealing={isRevealingCode}
              />
            </div>
          </div>
        )}

        {/* Matrix Overlay */}
        {showMatrix && (
          <div ref={matrixRegionRef} className="absolute inset-0">
            <MatrixOverlay />
          </div>
        )}

        {/* Video */}
        {showVideo && (
          <div ref={videoRef} className="absolute inset-0">
            <video 
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        {/* Connectors */}
        <Connector 
          from={showPlanOrigin ? sitePlanOriginRef : null}
          to={showPlanBox ? planBoxRef : null}
          isActive={dockIntoBox}
        />
      </div>

      {/* Fade Out Overlay */}
      {fadeOutAll && (
        <div className="absolute inset-0 bg-black opacity-75 transition-opacity duration-1000" />
      )}
    </div>
  );
};

export default Hero;
