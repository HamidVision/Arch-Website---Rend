# Changelog v0.2.3

**Release Date**: January 2025  
**Status**: 🚧 In Development

## 🎯 Major Milestone: Smooth Snap-Assist System

This version introduces a sophisticated snap-assist system for the undergrad projects page, providing buttery-smooth auto-centering of project tiles with cinematic easing animations.

## ✨ New Features

### Smooth Snap-Assist Hook
- **`useSnapAssistSmooth`**: New React hook with dual animation modes
- **Dual Mode Support**: Native smooth vs. custom eased animations
- **Configurable Options**: Flexible parameters for different use cases
- **Performance Optimized**: Eliminated IntersectionObserver overhead

### Cinematic Easing System
- **Custom Easing**: `easeOutCubic` curve for professional settle animations
- **RequestAnimationFrame**: Smooth 60fps animations
- **Configurable Duration**: Adjustable animation timing (default: 500ms)
- **Native Fallback**: `scrollIntoView` with `behavior: 'smooth'` option

### Smart Interaction Logic
- **Debounced Triggering**: 200ms delay after scroll stops
- **5% Tolerance System**: Only snaps when tile is ≥95% visible
- **Natural Interaction**: Prevents aggressive snapping during active scrolling
- **Proximity Integration**: Works seamlessly with CSS scroll-snap

## 🔧 Technical Improvements

### Performance Optimizations
- **Throttled Scroll Handler**: Efficient scroll event handling with passive listeners
- **Eliminated Layout Thrash**: No more constant IntersectionObserver firing
- **Smart Visibility Calculation**: Accurate visible height detection within container bounds
- **Optimized Event Handling**: Passive listeners for non-blocking performance

### CSS Enhancements
- **Proximity Snap**: `scroll-snap-type: y proximity` for gentler snapping
- **Native Smooth Scroll**: `scroll-behavior: smooth` for browser optimization
- **Mobile Optimization**: `100dvh` support for proper mobile viewport handling
- **Container Structure**: Proper `.projects-container` and `.project-card` classes

### Animation Framework
- **Custom Easing Function**: `1 - Math.pow(1 - t, 3)` easeOutCubic curve
- **Dual Animation Modes**: Native vs. custom animation selection
- **Smooth Transitions**: Professional-grade easing for cinematic feel
- **Accessibility Support**: Respects `prefers-reduced-motion` settings

## 📱 User Experience Improvements

### Smooth Scrolling
- **Buttery Smooth**: No lag or stuttering during snap-assist
- **Natural Feel**: Only assists when user pauses scrolling
- **Cinematic Quality**: Professional-grade easing animations
- **No Fighting**: Browser snap and JS animation work harmoniously

### Interaction Design
- **Intuitive Behavior**: Assists only when user is almost at target position
- **Responsive Feedback**: Immediate visual confirmation of snap-assist
- **Consistent Experience**: Works across all device types and orientations
- **Accessibility**: Proper support for reduced motion preferences

## 🗂️ Files Modified

### New Files
- `src/hooks/useSnapAssistSmooth.ts` - Main snap-assist hook implementation

### Modified Files
- `src/app/undergrad-projects/page.tsx` - Integrated snap-assist hook
- `src/app/globals.css` - Added snap-assist CSS classes
- `package.json` - Updated to version 0.2.3
- `docs/HISTORY.md` - Added v0.2.3 milestone documentation
- `docs/DECISIONS.md` - Added snap-assist design decisions

### Removed Files
- `src/hooks/useSnapAssist.ts` - Replaced with optimized version

## 🎮 Configuration Options

```tsx
useSnapAssistSmooth({
  containerSelector: '.projects-container',
  itemSelector: '.project-card',
  minVisibleRatio: 0.95,    // 5% tolerance
  delayMs: 2000,            // 2s pause before snapping
  align: 'start',           // or 'center'
  useCustomEasing: true,    // cinematic mode
  easingDuration: 600      // slower settle
});
```

## 🧪 Testing Checklist

- ✅ **Scroll and Pause**: Tile snaps into place after 2s pause when ≥95% visible
- ✅ **Continuous Scrolling**: No snap-assist triggers during active scrolling
- ✅ **Custom Easing**: Smooth cinematic settle animation with easeOutCubic
- ✅ **Native Mode**: `scrollIntoView` works with `behavior: 'smooth'`
- ✅ **Mobile Compatibility**: Proper behavior on iOS and Android devices
- ✅ **Reduced Motion**: Respects accessibility preferences
- ✅ **Performance**: No layout thrash or performance issues

## 🚀 Next Steps

This version establishes the foundation for smooth, professional-grade scroll interactions. Future versions may include:

- Additional easing curves and animation options
- Enhanced mobile gesture support
- Integration with other scroll-based components
- Performance monitoring and optimization

---

**Previous Version**: [v0.2.2](../CHANGELOG_v0.2.2.md) - Interactive Overlay System
