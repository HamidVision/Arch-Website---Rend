'use client';

import { gsap } from 'gsap';
import { TL } from '@/lib/gsap/labels';

// Types for refs and controllers
export interface HomeRefs {
  heroRef: React.RefObject<HTMLElement>;
  sitePlanOriginRef: React.RefObject<HTMLElement>;
  planBoxRef: React.RefObject<HTMLElement>;
  agentRef: React.RefObject<HTMLElement>;
  promptRef: React.RefObject<HTMLElement>;
  scriptRef: React.RefObject<HTMLElement>;
  codeRef: React.RefObject<HTMLElement>;
  matrixRegionRef: React.RefObject<HTMLElement>;
  videoRef: React.RefObject<HTMLElement>;
}

export interface Controllers {
  dockController: {
    startDock(): void;
  };
  typingController: {
    start(): void;
    stop(): void;
  };
  codeController: {
    start(): void;
    stop(): void;
  };
  sequenceController: {
    updateSequence(updates: any): void;
  };
}

export interface HomeTimelineConfig {
  refs: HomeRefs;
  controllers: Controllers;
}

/**
 * Builds the homepage GSAP master timeline
 * Single source of truth for all timing and animations
 */
export const buildHomeTimeline = (
  config: HomeTimelineConfig,
  onComplete?: () => void
): gsap.core.Timeline => {
  const { refs, controllers } = config;
  
  let tl!: gsap.core.Timeline;
  
  gsap.context(() => {
    tl = gsap.timeline({
      paused: true,
      onComplete,
      onUpdate: () => {
        if (process.env.NODE_ENV !== 'production') {
          // Lightweight dev trace
          // console.log('Timeline:', Math.round(tl.progress()*100), '% -', tl.currentLabel() || '—');
        }
      }
    });

    // --- REQUIRED TIMELINE LABELS (matching page.tsx expectations) ---
    tl.addLabel(TL.heroStart, 0);
    tl.addLabel('heroFadeEnd', 3);           // Hero stays for 3 seconds
    tl.addLabel(TL.planAppear, 3.5);         // Site plan appears 0.5s after hero fades
    tl.addLabel(TL.planBoxAppear, 4.5);      // Plan box appears 1s after site plan
    tl.addLabel(TL.dock, 5.5);               // Dock animation starts 1s after plan box
    tl.addLabel(TL.agent, 7);                // Agent box appears
    tl.addLabel(TL.prompt, 8);               // Prompt box appears
    tl.addLabel('typing', 8.5);              // Typing starts
    tl.addLabel(TL.script, 12);              // Script box appears
    tl.addLabel(TL.code, 19);                // Code box appears
    tl.addLabel(TL.matrixOn, 23);            // Matrix turns on
    tl.addLabel('matrixOff', 26);            // Matrix turns off
    tl.addLabel(TL.videoStart, 27);          // Video starts
    tl.addLabel('boxesFade', 30);            // Boxes start fading
    tl.addLabel('videoFade', 32);            // Video fades

    // --- HERO SEQUENCE ---
    if (refs.heroRef.current) {
      // Start typing animation
      tl.call(controllers.typingController.start, [], TL.heroStart);
      
      // Hero text stays visible for 3 seconds, then fades out
      tl.fromTo(refs.heroRef.current, 
        { opacity: 1, scale: 1 },
        { opacity: 1, scale: 1, duration: 3 },
        TL.heroStart
      )
      .call(controllers.typingController.stop, [], 'heroFadeEnd')
      .call(() => controllers.sequenceController.updateSequence({ showText: false }), [], 'heroFadeEnd')
      .to(refs.heroRef.current, 
        { opacity: 0, duration: 0.5, ease: 'power2.inOut' },
        'heroFadeEnd'
      )
      .set(refs.heroRef.current, { display: 'none' }, 'heroFadeEnd+=0.5');
    }

    // --- SITE PLAN SEQUENCE ---
    tl.call(() => controllers.sequenceController.updateSequence({ showPlanOrigin: true }), [], TL.planAppear);
    
    if (refs.sitePlanOriginRef.current) {
      tl.fromTo(refs.sitePlanOriginRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
        TL.planAppear
      );
    }

    tl.call(() => controllers.sequenceController.updateSequence({ showPlanBox: true }), [], TL.planBoxAppear);
    
    if (refs.planBoxRef.current) {
      tl.fromTo(refs.planBoxRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        TL.planBoxAppear
      )
      .call(controllers.dockController.startDock, [], TL.dock);
    }

    // --- BOX SEQUENCE ---
    if (refs.agentRef.current) {
      tl.fromTo(refs.agentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        TL.agent
      )
      .to(refs.agentRef.current,
        { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' },
        TL.agent + '+=1.0'
      );
    }

    if (refs.promptRef.current) {
      tl.fromTo(refs.promptRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        TL.prompt
      )
      .call(controllers.typingController.start, [], 'typing')
      .call(controllers.typingController.stop, [], 'typing+=2.5')
      .to(refs.promptRef.current,
        { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' },
        'typing+=2.5'
      );
    }

    if (refs.scriptRef.current) {
      tl.fromTo(refs.scriptRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        TL.script
      )
      .to(refs.scriptRef.current,
        { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' },
        TL.script + '+=6.5'
      );
    }

    if (refs.codeRef.current) {
      tl.fromTo(refs.codeRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        TL.code
      )
      .call(controllers.codeController.start, [], TL.code)
      .call(controllers.codeController.stop, [], TL.code + '+=3.0');
    }

    // --- MATRIX SEQUENCE ---
    if (refs.matrixRegionRef.current) {
      tl.fromTo(refs.matrixRegionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
        TL.matrixOn
      )
      .to(refs.matrixRegionRef.current,
        { opacity: 0, duration: 0.3, ease: 'power2.in' },
        'matrixOff'
      );
    }

    // --- VIDEO SEQUENCE ---
    if (refs.videoRef.current) {
      tl.fromTo(refs.videoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        TL.videoStart
      );
    }

    // --- GLOBAL FADES ---
    const boxRefs = [
      refs.agentRef.current,
      refs.promptRef.current,
      refs.scriptRef.current,
      refs.codeRef.current,
      refs.planBoxRef.current
    ].filter(Boolean);

    if (boxRefs.length > 0) {
      tl.to(boxRefs,
        { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in', stagger: 0.1 },
        'boxesFade'
      );
    }

    if (refs.videoRef.current) {
      tl.to(refs.videoRef.current,
        { opacity: 0, duration: 0.6, ease: 'power2.in' },
        'videoFade'
      );
    }

    // Add dev controls
    if (process.env.NODE_ENV === 'development') {
      addDevControls(tl);
    }

  }); // Close gsap.context callback
  
  return tl;
};

/**
 * Adds development controls to the timeline
 * Only active in development mode
 */
const addDevControls = (tl: gsap.core.Timeline): void => {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case ' ':
        e.preventDefault();
        if (tl.isActive()) {
          tl.pause();
        } else {
          tl.resume();
        }
        break;
      
      case 'ArrowLeft':
        e.preventDefault();
        tl.seek(tl.time() - 0.5);
        break;
      
      case 'ArrowRight':
        e.preventDefault();
        tl.seek(tl.time() + 0.5);
        break;
      
      case '1':
        tl.timeScale(0.5);
        break;
      
      case '2':
        tl.timeScale(1.0);
        break;
      
      case '3':
        tl.timeScale(1.5);
        break;
      
      case '4':
        tl.timeScale(2.0);
        break;
      
      case '5':
        tl.timeScale(3.0);
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  const cleanup = () => {
    window.removeEventListener('keydown', handleKeyDown);
  };

  (tl as gsap.core.Timeline & { _devCleanup?: () => void })._devCleanup = cleanup;
};

/**
 * Cleans up the timeline and removes dev controls
 */
export const cleanupTimeline = (tl: gsap.core.Timeline & { _devCleanup?: () => void }): void => {
  if (tl._devCleanup) {
    tl._devCleanup();
  }
  tl.kill();
};