# Design Decisions

## Version v0.1.1 (Current)
**Date**: December 2024
**Status**: Planning Phase

### Upcoming Decisions
- Individual page routing strategy for each tile
- Content management system approach
- Performance optimization techniques
- Mobile responsiveness improvements

---

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
