# Design Decisions

## Version v0.3.1 (Current)
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
