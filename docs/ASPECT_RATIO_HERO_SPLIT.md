# Aspect Ratio Hero Split - v0.1.5

## Overview

This document describes the new dynamic, aspect-ratio-aware hero split functionality integrated into the architectural portfolio website. This feature provides a sophisticated way to display content that automatically adjusts based on screen aspect ratios while maintaining optimal visual proportions.

## Components Created

### 1. AspectRatioHeroSplit Component
**File:** `src/components/AspectRatioHeroSplit.tsx`

A reusable React component that implements the aspect-ratio-aware hero split functionality.

**Features:**
- Dynamic height calculation based on viewport width and specified aspect ratio
- Smooth transitions between states using Framer Motion
- Responsive behavior across different screen sizes
- Customizable aspect ratios (16/9, 4/3, 21/9, etc.)
- Automatic window resize handling

**Props:**
```typescript
interface AspectRatioHeroSplitProps {
  aspectRatio?: string; // e.g., "16/9", "4/3", "21/9"
  heroContent: React.ReactNode;
  secondContent: React.ReactNode;
  triggerText?: string;
  className?: string;
}
```

### 2. Enhanced HorizontalProjectLayout
**File:** `src/components/projects/HorizontalProjectLayoutEnhanced.tsx`

An enhanced version of the existing HorizontalProjectLayout that integrates the aspect-ratio-aware functionality while maintaining backward compatibility.

**New Features:**
- Optional aspect ratio split mode (`useAspectRatioSplit` prop)
- Configurable aspect ratio (`aspectRatio` prop)
- Maintains all existing functionality (grid overlay, interactive site plan, etc.)
- Seamless integration with existing project data structure

## CSS Integration

### Global Styles
**File:** `src/app/globals.css`

Added comprehensive CSS for the aspect-ratio-aware functionality:

- `.horizontal-section` - Main container with flex layout
- `.vertical-stack` - Vertical stacking container with transitions
- `.hero` and `.second-render` - Content sections with smooth transitions
- `.activation-trigger` - Styled toggle button with hover effects
- Responsive breakpoints for tablet and mobile adjustments

### Key CSS Features:
- CSS custom properties for dynamic height control
- Smooth transitions (0.5s ease)
- Responsive adjustments for different screen sizes
- Mobile-optimized button positioning and sizing

## Demo Pages

### 1. Basic Demo
**URL:** `/aspect-ratio-demo`

A simple demonstration of the aspect-ratio-aware functionality with placeholder content.

**Features:**
- Blue-to-purple gradient hero section
- Green-to-teal gradient second section
- Interactive toggle button
- Responsive behavior testing

### 2. Enhanced Project Demo
**URL:** `/site-analysis-enhanced`

A practical implementation using real project data from the site-analysis project.

**Features:**
- Real project images and content
- Integrated with existing project structure
- Maintains all interactive features (site plan hover, detailed view)
- Grid overlay support (G key toggle)

## Technical Implementation

### Aspect Ratio Calculation
```javascript
const setAspectSplit = () => {
  const aspect = aspectRatio.split('/');
  const ratio = parseFloat(aspect[1]) / parseFloat(aspect[0]); // height/width
  
  const viewportWidth = window.innerWidth;
  const idealHeroHeight = viewportWidth * ratio;
  
  // Clamp hero height so it never exceeds viewport height
  const maxHeroHeight = window.innerHeight * 0.7;
  const calculatedHeroHeight = Math.min(idealHeroHeight, maxHeroHeight);
  const calculatedSecondHeight = window.innerHeight - calculatedHeroHeight;
  
  setHeroHeight(`${calculatedHeroHeight}px`);
  setSecondHeight(`${calculatedSecondHeight}px`);
};
```

### Responsive Behavior
- **Desktop (>1024px):** Full aspect ratio calculation
- **Tablet (≤1024px):** Slight adjustment (+5% hero, -5% second)
- **Mobile (≤600px):** Fixed 50/50 split for optimal usability

### State Management
- `isActivated`: Controls the split state
- `heroHeight`/`secondHeight`: Dynamic height values
- Automatic recalculation on window resize when activated

## Usage Examples

### Basic Usage
```tsx
<AspectRatioHeroSplit
  aspectRatio="16/9"
  heroContent={<div>Hero Content</div>}
  secondContent={<div>Second Content</div>}
  triggerText="Toggle Split"
/>
```

### Enhanced Project Layout
```tsx
<HorizontalProjectLayoutEnhanced
  panels={projectPanels}
  useAspectRatioSplit={true}
  aspectRatio="16/9"
  backLink="/projects"
  backLinkText="Back to Projects"
/>
```

## Benefits

1. **Aspect Ratio Awareness**: Content automatically adjusts to maintain optimal proportions
2. **Responsive Design**: Seamless experience across all device sizes
3. **Smooth Animations**: Professional transitions using Framer Motion
4. **Backward Compatibility**: Existing layouts continue to work unchanged
5. **Flexible Integration**: Easy to add to any project or page
6. **Performance Optimized**: Efficient calculations and minimal re-renders

## Testing Results

✅ **Desktop (1200x800)**: Perfect aspect ratio calculation and smooth transitions
✅ **Tablet (600x800)**: Proper responsive adjustments and mobile-optimized button
✅ **Toggle Functionality**: Seamless switching between states
✅ **Window Resize**: Automatic recalculation when activated
✅ **Integration**: Works perfectly with existing project data and features

## Future Enhancements

- Multiple aspect ratio presets
- Custom transition timing options
- Keyboard shortcuts for activation
- Accessibility improvements (ARIA labels, focus management)
- Animation customization options

## Files Modified/Created

### New Files:
- `src/components/AspectRatioHeroSplit.tsx`
- `src/components/projects/HorizontalProjectLayoutEnhanced.tsx`
- `src/app/aspect-ratio-demo/page.tsx`
- `src/app/site-analysis-enhanced/page.tsx`

### Modified Files:
- `src/app/globals.css` - Added aspect ratio styles
- `package.json` - Updated to v0.1.5

## Integration Notes

The aspect-ratio-aware functionality is designed to be:
- **Non-breaking**: Existing code continues to work
- **Optional**: Can be enabled per project/page as needed
- **Configurable**: Aspect ratios and behavior can be customized
- **Extensible**: Easy to add new features and customizations

This implementation provides a solid foundation for creating visually stunning, aspect-ratio-aware layouts that enhance the user experience across all devices.
