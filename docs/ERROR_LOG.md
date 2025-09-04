# Error Log

## Version v0.1.1 (Current)
**Date**: December 2024
**Status**: No active errors

---

## Version v0.1 (Completed)
**Date**: December 2024
**Status**: ✅ All errors resolved

### Final Issues Resolved
- ✅ **HE Logo Visual Glitch**: Fixed morphing and duplication issues
  - **Solution**: Improved z-index (z-[70]), better font styling, explicit button properties
  - **Files**: `src/components/ProjectsOverlay.tsx`
  - **Date**: December 2024

- ✅ **Scroll Progress Bar Alignment**: Fixed "one step behind" issue
  - **Solution**: Added +0.5 offset to rawIndex calculation for proper centering
  - **Files**: `src/components/ProjectsOverlay.tsx`
  - **Date**: December 2024

- ✅ **Scroll Boundary Issues**: Fixed jumping at first/last tiles
  - **Solution**: Removed problematic offset and used Math.round with clamping
  - **Files**: `src/components/ProjectsOverlay.tsx`
  - **Date**: December 2024

- ✅ **Zoom Functionality**: Fixed zoom targeting wrong tile
  - **Solution**: Removed hardcoded middleTileIndex, use currentIndex
  - **Files**: `src/components/ProjectsOverlay.tsx`
  - **Date**: December 2024

- ✅ **Portfolio Button Behavior**: Fixed zoom-out closing overlay
  - **Solution**: Modified handlePortfolioToggle to only change zoom state
  - **Files**: `src/components/Header.tsx`
  - **Date**: December 2024

### Previous Issues (v0.1)
- ✅ **JSX Syntax Error**: Fixed malformed JSX structure in ProjectsOverlay
  - **Solution**: Rewrote entire return statement with proper JSX syntax
  - **Files**: `src/components/ProjectsOverlay.tsx`
  - **Date**: December 2024

- ✅ **Missing Zoom Animation**: Added proper zoom-out animation
  - **Solution**: Added exit animation with scale and opacity
  - **Files**: `src/components/ProjectsOverlay.tsx`
  - **Date**: December 2024

- ✅ **Fullscreen Zoom**: Fixed zoom not being truly fullscreen
  - **Solution**: Changed container to w-screen h-screen when zoomed
  - **Files**: `src/components/ProjectsOverlay.tsx`
  - **Date**: December 2024

- ✅ **Close Button Visibility**: Fixed X icon showing when zoomed
  - **Solution**: Added conditional rendering for close button
  - **Files**: `src/components/ProjectsOverlay.tsx`
  - **Date**: December 2024

---

## Version v0.0.1 (Initial Setup)
**Date**: December 2024
**Status**: ✅ All errors resolved

### Initial Setup Issues
- ✅ **Missing Preflight Script**: Created scripts/preflight.js
  - **Solution**: Added ES module preflight check script
  - **Files**: `scripts/preflight.js`
  - **Date**: December 2024

- ✅ **Missing Loading Component**: Created HE_Loading_Component.tsx
  - **Solution**: Implemented loading screen with logo and text
  - **Files**: `src/components/HE_Loading_Component.tsx`
  - **Date**: December 2024

- ✅ **Missing ProjectsOverlay Component**: Created ProjectsOverlay.tsx
  - **Solution**: Implemented basic projects modal
  - **Files**: `src/components/ProjectsOverlay.tsx`
  - **Date**: December 2024

- ✅ **Deprecated appDir Warning**: Removed experimental config
  - **Solution**: Removed experimental: { appDir: true } from next.config.js
  - **Files**: `next.config.js`
  - **Date**: December 2024

- ✅ **Git Merge Conflict**: Resolved LICENSE file conflict
  - **Solution**: Used git pull with --allow-unrelated-histories
  - **Files**: `LICENSE`
  - **Date**: December 2024

- ✅ **Preflight Asset Check**: Updated to check correct logo file
  - **Solution**: Changed check from logo.svg to logo-loading.svg
  - **Files**: `scripts/preflight.js`
  - **Date**: December 2024
