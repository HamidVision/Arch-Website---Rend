# Design Decisions

## Version v0.4.2 (Current)
**Date**: January 2025
**Status**: ✅ All decisions implemented

### Border Crossing Page Architecture Decisions

#### **Header Consistency Strategy**
- **Decision**: Exact same header system across all project pages (HE button, portfolio grid, menu hamburger)
- **Rationale**: Creates unified navigation experience and professional consistency
- **Implementation**: Black background with white icons, identical positioning and styling
- **Result**: Seamless user experience across different project presentations

#### **Horizontal Scroll System**
- **Decision**: Convert mouse wheel vertical movement to horizontal scroll for architectural drawings
- **Rationale**: Allows natural navigation through wide architectural plans while maintaining viewport
- **Implementation**: `containerRef.current.scrollLeft += e.deltaY` with prevented default behavior
- **Result**: Intuitive navigation through horizontal architectural content

#### **Text Overlay Framework**
- **Decision**: Transparent text overlays without background interference
- **Rationale**: Preserves architectural drawing visibility while providing essential project information
- **Implementation**: `backgroundColor: 'transparent'`, `backdropFilter: 'none'`, no borders or shadows
- **Result**: Clean text presentation that complements rather than obscures architectural content

#### **Typography Consistency**
- **Decision**: Helvetica Neue font system matching Congregation Center standards
- **Rationale**: Maintains professional architectural presentation quality across all project pages
- **Implementation**: `fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"` with consistent sizing
- **Result**: Unified typographic voice across entire portfolio

#### **Responsive Positioning System**
- **Decision**: Percentage-based positioning for text overlays (`top: '20%'`, `left: '62%'`)
- **Rationale**: Ensures proper scaling across all screen sizes and aspect ratios
- **Implementation**: `transform: 'translate(-50%, -50%)'` for precise centering
- **Result**: Consistent text placement regardless of viewport size

---

## Version v0.4.1 (Completed)
**Date**: January 2025
**Status**: ✅ All decisions implemented

### UX Enhancement System Decisions

#### **Progressive Disclosure Architecture**
- **Decision**: Three-phase hint system (text → glow → interaction cleanup)
- **Rationale**: Gentle guidance without overwhelming new users while maintaining clean experience for returning visitors
- **Implementation**: Timed state management with 3.5-second progression
- **Result**: Improved discoverability without compromising professional presentation

#### **Hint Text Positioning Strategy**
- **Decision**: Position hint text at exact location of future content (render/video area)
- **Rationale**: Creates spatial connection between instruction and resulting action
- **Implementation**: Same coordinates as content display box (top: '18%', left: '38.15%')
- **Result**: Intuitive flow from instruction to content visualization

#### **Animation Subtlety Principle**
- **Decision**: Gentle pulse without visible borders, subtle glow effects
- **Rationale**: Architectural presentations require sophisticated, non-distracting animations
- **Implementation**: 3-second gentle pulse with `border: none !important`, 2-second glow cycle
- **Result**: Professional guidance that enhances rather than disrupts the design

#### **Smart Cleanup Philosophy**
- **Decision**: All hints disappear permanently after any first interaction
- **Rationale**: Experienced users should have clean, uncluttered interface
- **Implementation**: `firstInteraction` state tracking with comprehensive cleanup
- **Result**: One-time guidance system that doesn't interfere with repeated use

#### **Standard Cursor Approach**
- **Decision**: Use browser's standard pointer cursor instead of custom icons
- **Rationale**: Custom cursors often look unprofessional or unclear, standard pointer is universally recognized
- **Implementation**: `cursor: pointer` for all interactive button areas
- **Result**: Clear, familiar interaction indicators

---

## Version v0.4.0 (Completed)
**Date**: January 2025
**Status**: ✅ All decisions implemented

### Interactive Content System Decisions

#### **Button-Based Navigation Architecture**
- **Decision**: Six circular numbered buttons positioned over architectural drawing
- **Rationale**: Provides intuitive, spatial navigation that directly corresponds to building levels
- **Implementation**: Absolute positioning with percentage-based coordinates for responsive design
- **Result**: Interactive system that maintains visual connection to architectural content

#### **Toggle Interaction Pattern**
- **Decision**: Click button to show content, click again to hide (toggle functionality)
- **Rationale**: Reduces visual clutter and allows users to focus on architecture when desired
- **Implementation**: Single state variable with `activeButton === buttonNumber ? null : buttonNumber` logic
- **Result**: Clean, predictable interaction that keeps interface uncluttered

#### **Three-Tier Content Display System**
- **Decision**: Separate boxes for title, main content, and description with distinct z-indexing
- **Rationale**: Creates clear information hierarchy while maintaining visual balance
- **Implementation**: Title (z-35), Main Content (z-30), Description (z-35) with strategic positioning
- **Result**: Organized content presentation that doesn't overwhelm the architectural image

#### **Orange Brand Color Integration**
- **Decision**: Use Orange-500 (#F97316) as primary interactive color for consistency
- **Rationale**: Maintains brand identity and provides high contrast for accessibility
- **Implementation**: Active button backgrounds, content box accents, and hover states
- **Result**: Cohesive visual language that reinforces brand while ensuring usability

#### **Performance-Optimized Rendering**
- **Decision**: Conditional rendering of content boxes only when button is active
- **Rationale**: Reduces DOM complexity and improves performance on lower-end devices
- **Implementation**: `{activeButton && (<> content boxes </>)}` conditional rendering
- **Result**: Efficient resource usage with smooth interactions

---

## Version v0.3.2 (Completed)
**Date**: December 2024
**Status**: ✅ All decisions implemented

### Fixed Text Box Positioning Decisions

#### **Direct DOM Manipulation Approach**
- **Decision**: Use `useEffect` with direct DOM manipulation instead of React Portal
- **Rationale**: React Portals still remain within React component tree and affected by parent stacking contexts
- **Implementation**: `document.createElement()` and `document.body.appendChild()` for complete isolation
- **Result**: Text box perfectly fixed relative to viewport, unaffected by scroll or parent containers

#### **Native Browser APIs Over Framework Solutions**
- **Decision**: Leverage native DOM APIs instead of React-specific positioning solutions
- **Rationale**: Framework abstractions can introduce unexpected side effects with CSS stacking contexts
- **Implementation**: Direct style manipulation using `Object.assign(element.style, {...})` 
- **Result**: Predictable, cross-browser compatible positioning behavior

#### **Maximum Z-Index Strategy**
- **Decision**: Use z-index of 99999 for critical UI elements that must stay on top
- **Rationale**: Ensures text box remains visible above all other content including overlays and transitions
- **Implementation**: `zIndex: '99999'` applied directly to element style
- **Result**: Text box consistently appears above all other page elements

#### **Component Lifecycle Management**
- **Decision**: Implement proper cleanup function to remove DOM elements on component unmount
- **Rationale**: Prevents memory leaks and DOM pollution when navigating between pages
- **Implementation**: `return () => { document.getElementById('id')?.remove(); }` in useEffect
- **Result**: Clean component lifecycle with no residual DOM elements

#### **Framer Motion Stacking Context Mitigation**
- **Decision**: Bypass `RouteTransitionWrapper` effects by rendering outside React tree
- **Rationale**: Framer Motion's `motion.div` creates new stacking context affecting fixed positioning
- **Implementation**: Direct DOM manipulation renders elements independent of motion wrapper
- **Result**: Fixed elements immune to animation framework side effects

---

## Version v0.3.1 (Completed)
**Date**: January 2025
**Status**: ✅ All decisions implemented

### Timeline Synchronization Fix Decisions

#### **Simplified Scroll Position Calculation**
- **Decision**: Remove incorrect `leftPadding` adjustment from scroll position calculations
- **Rationale**: The `leftPadding` calculation was causing timeline synchronization issues, especially in fullscreen mode
- **Implementation**: Direct mapping `rawIndex = scrollPosition / tileWidth` without offset adjustments
- **Result**: Timeline now works correctly across all screen sizes and aspect ratios

#### **Direct Position Mapping**
- **Decision**: Use direct scroll position to tile index mapping without complex adjustments
- **Rationale**: Scroll position should directly correspond to tile position for accurate timeline tracking
- **Implementation**: `const rawIndex = scrollPosition / tileWidth; const newIndex = Math.round(rawIndex);`
- **Result**: Eliminates "one step behind" timeline synchronization issues

#### **Consistent Behavior Across Screen Sizes**
- **Decision**: Ensure timeline synchronization works identically regardless of screen size
- **Rationale**: Users should have consistent experience whether in half-screen or fullscreen mode
- **Implementation**: Removed screen-width-dependent calculations that caused different behavior
- **Result**: Timeline dots always highlight the correct tile, regardless of viewport size

#### **Event Handler Optimization**
- **Decision**: Streamline scroll event handling for better performance
- **Rationale**: Simplified logic reduces computational overhead and improves responsiveness
- **Implementation**: Removed complex `leftPadding` calculations from both scroll handler and scrollToTile function
- **Result**: More efficient scroll tracking with accurate timeline synchronization

---

## Version v0.3.0 (Completed)

### Smooth Snap-Assist System Decisions

#### **Throttled Scroll Handler Approach**
- **Decision**: Replace IntersectionObserver with debounced scroll event handler
- **Rationale**: IntersectionObserver fires constantly during scroll, causing performance issues
- **Implementation**: 200ms delay after scroll stops before checking visibility ratios
- **Result**: Eliminates layout thrash and provides smooth, responsive performance

#### **Dual Animation Mode System**
- **Decision**: Support both native smooth and custom eased animations
- **Rationale**: Different use cases require different animation approaches
- **Implementation**: `useCustomEasing` boolean flag with `scrollIntoView` vs. `requestAnimationFrame`
- **Result**: Flexible system that can adapt to different performance and aesthetic requirements

#### **Custom Easing with easeOutCubic**
- **Decision**: Implement `easeOutCubic` curve for cinematic settle animations
- **Rationale**: Provides professional, polished feel that matches architectural design quality
- **Implementation**: `1 - Math.pow(1 - t, 3)` easing function with `requestAnimationFrame`
- **Result**: Smooth, natural animations that feel premium and intentional

#### **5% Tolerance Threshold**
- **Decision**: Only snap when tile is ≥95% visible (5% tolerance)
- **Rationale**: Prevents aggressive snapping when user is actively scrolling
- **Implementation**: `minVisibleRatio: 0.95` with precise visibility calculations
- **Result**: Natural interaction that only assists when user is almost at target position

#### **Proximity Snap Integration**
- **Decision**: Use `scroll-snap-type: y proximity` instead of `mandatory`
- **Rationale**: Gentler snapping that works harmoniously with custom animations
- **Implementation**: CSS `scroll-snap-type: y proximity` with `scroll-behavior: smooth`
- **Result**: Browser and JS animations work together without fighting

#### **Mobile-Optimized Heights**
- **Decision**: Use `100dvh` for mobile-safe viewport heights
- **Rationale**: Ensures proper behavior on mobile devices with dynamic viewports
- **Implementation**: CSS `height: 100vh; height: 100dvh;` fallback pattern
- **Result**: Consistent behavior across all device types and orientations

---

## Version v0.2.2 (Completed)
**Date**: January 2025
**Status**: ✅ All decisions implemented

### Interactive Overlay System Decisions

#### **Two-Way Toggle Functionality**
- **Decision**: Implement bidirectional toggle using `setIsActivated(prev => !prev)`
- **Rationale**: Users should be able to return to hero-only view after activating analysis mode
- **Implementation**: onClick handler toggles between true/false states seamlessly
- **Result**: Intuitive interaction that works in both directions without confusion

#### **Radar Ping Animation Design**
- **Decision**: Use Tailwind's `animate-ping` class for subtle attention-drawing effect
- **Rationale**: Provides visual cue for interactive area without overwhelming the design
- **Implementation**: `<span>` element with `animate-ping` positioned behind overlay image
- **Result**: Professional, subtle animation that guides user attention effectively

#### **Invisible-by-Default Overlay**
- **Decision**: Make PNG overlay completely transparent (opacity: 0) until hover
- **Rationale**: Maintains clean visual design while preserving functionality
- **Implementation**: Framer Motion `whileHover={{ opacity: 0.85 }}` for smooth fade-in
- **Result**: Clean interface that reveals interactive elements only when needed

#### **Framer Motion Animation Framework**
- **Decision**: Combine Framer Motion with Tailwind CSS Animate for optimal performance
- **Rationale**: Framer Motion excels at component-level animations, Tailwind provides utility classes
- **Implementation**: Motion components for entry/exit, hover states, and state transitions
- **Result**: Smooth, performant animations with professional polish

#### **Smart Position Management**
- **Decision**: Dynamic position calculation based on activation state
- **Rationale**: Overlay must be positioned correctly in both hero-only and split view modes
- **Implementation**: `overlayPos` variable switches between initial and activated coordinates
- **Result**: Seamless positioning that adapts to current view state

#### **Hover Feedback System**
- **Decision**: Implement scale and opacity changes on hover for clear interaction feedback
- **Rationale**: Users need immediate visual confirmation that an area is interactive
- **Implementation**: `whileHover={{ scale: 1.05 }}` combined with opacity fade-in
- **Result**: Clear, responsive feedback that enhances user experience

---

## Version v0.1.2 (Completed)

## Version v0.1.1 (Completed)
**Date**: December 2024
**Status**: ✅ All decisions implemented

### Architecture Decisions

#### **Enhanced Option 1 Vertical Layout**
- **Decision**: Implement sophisticated vertical scrolling interface for Undergrad Projects
- **Rationale**: Provides immersive, full-height project presentation with smooth navigation
- **Implementation**: Full-screen project cards with scroll snap and progress indicators
- **Result**: Professional, engaging user experience that maintains design consistency

#### **Scroll Snap Behavior**
- **Decision**: Use CSS scroll-snap-type: y mandatory for smooth vertical scrolling
- **Rationale**: Ensures projects snap to viewport center for optimal viewing
- **Implementation**: `.projects-container` with scroll-snap-type, `.project-card` with scroll-snap-align
- **Result**: Smooth, controlled scrolling with precise positioning

#### **Progress Indicator System**
- **Decision**: Real-time scroll position tracking with visual dots
- **Rationale**: Provides clear navigation context and current position awareness
- **Implementation**: useEffect with scroll event listener and state management
- **Result**: Intuitive navigation feedback without overwhelming the interface

#### **Navigation Consistency**
- **Decision**: Unified navigation pattern across all project pages
- **Rationale**: Maintains user orientation and provides consistent interaction patterns
- **Implementation**: HE logo (top-left) and Portfolio/Menu buttons (top-right) on all pages
- **Result**: Seamless navigation experience across the entire application

#### **Typography Hierarchy**
- **Decision**: Apply established font classes consistently across new pages
- **Rationale**: Maintains visual consistency and brand identity
- **Implementation**: font-title (700), font-subtitle (400), font-body (300) classes
- **Result**: Cohesive typography that reinforces design system

#### **Component Architecture**
- **Decision**: Reusable page structure for individual project pages
- **Rationale**: Reduces code duplication and ensures consistency
- **Implementation**: Template-based approach with consistent layout and navigation
- **Result**: Maintainable codebase with consistent user experience

---

## Version v0.1 (Completed)

## Version v0.1 (Completed)
**Date**: December 2024
**Status**: ✅ All decisions implemented

### Final Architecture Decisions

#### **Portfolio Overlay Design**
- **Decision**: Implement M+M-style horizontal scrolling interface
- **Rationale**: Professional, modern UX that matches target aesthetic
- **Implementation**: 7-tile horizontal layout with mouse wheel navigation
- **Result**: Smooth, intuitive navigation experience

#### **Two-Step Portfolio Button**
- **Decision**: Three-state button behavior (Open → Zoom → Zoom-out)
- **Rationale**: Provides progressive interaction without overwhelming users
- **Implementation**: State management in Header component
- **Result**: Intuitive zoom functionality tied to current scroll position

#### **Scroll Calculation System**
- **Decision**: Use offset-based calculation for accurate progress tracking
- **Rationale**: Ensures progress bar aligns with visually centered tiles
- **Implementation**: `rawIndex = (adjustedScrollPosition / tileWidth) + 0.5`
- **Result**: Accurate progress indication without "one step behind" issues

#### **Animation Framework**
- **Decision**: Framer Motion for overlay animations, GSAP for home page
- **Rationale**: Framer Motion excels at component-level animations, GSAP for complex timelines
- **Implementation**: Motion components with AnimatePresence
- **Result**: Smooth, performant animations across all interactions

#### **Z-index Architecture**
- **Decision**: Systematic z-index hierarchy (60-70 range for overlay elements)
- **Rationale**: Prevents visual conflicts and ensures proper layering
- **Implementation**: z-[60] for overlay, z-[70] for logo
- **Result**: Clean visual hierarchy without rendering artifacts

#### **Responsive Design Approach**
- **Decision**: Viewport-based calculations for dynamic centering
- **Rationale**: Ensures consistent experience across screen sizes
- **Implementation**: `w-[calc(50vw-24rem)]` for dynamic padding
- **Result**: Proper tile centering regardless of screen width

### Previous Decisions (v0.1)

#### **Technology Stack**
- **Decision**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Rationale**: Modern, performant stack with excellent developer experience
- **Result**: Fast development and optimal performance

#### **Component Architecture**
- **Decision**: Modular component structure with clear separation of concerns
- **Rationale**: Maintainable, scalable codebase
- **Result**: Easy to extend and modify

#### **Loading Experience**
- **Decision**: Custom loading component with brand logo
- **Rationale**: Professional first impression and brand consistency
- **Result**: Polished user experience from first interaction

#### **Image Optimization**
- **Decision**: Next.js Image component with optimized formats
- **Rationale**: Performance and SEO benefits
- **Result**: Fast loading times and good Core Web Vitals

---

## Version v0.0.1 (Initial Setup)
**Date**: December 2024
**Status**: ✅ All decisions implemented

### Foundation Decisions
- **Project Structure**: Next.js 14 with TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Animations**: Framer Motion for component animations, GSAP for complex sequences
- **Version Control**: Git with GitHub integration
- **Documentation**: Comprehensive docs folder with decision tracking
