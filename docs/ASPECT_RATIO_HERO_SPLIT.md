# Aspect Ratio Hero Split Component

## Overview

The `AspectRatioHeroSplit` component provides a dynamic, aspect-ratio-aware hero split functionality that allows users to toggle between a full hero view and a split view showing both hero and analysis content within the same horizontal scroll panel.

## Features

- **Aspect Ratio Awareness**: Automatically calculates optimal heights based on viewport dimensions
- **Smooth Animations**: Uses Framer Motion for fluid transitions
- **Horizontal Scrolling**: Mouse wheel support for horizontal navigation
- **Responsive Design**: Adapts to different screen sizes
- **No Cropping**: Images scale proportionally using `object-fit: contain`
- **Reversible Toggle**: Can switch between full hero and split view

## Component Structure

```tsx
<AspectRatioHeroSplit
  heroSrc="/projects/hero.jpg"
  heroAlt="Project Hero"
  secondSrc="/projects/analysis.jpg"
  secondAlt="Project Analysis"
  triggerText="Show Analysis"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heroSrc` | `string` | - | Source path for the hero image |
| `heroAlt` | `string` | - | Alt text for the hero image |
| `secondSrc` | `string` | - | Source path for the second image |
| `secondAlt` | `string` | - | Alt text for the second image |
| `triggerText` | `string` | `"Show Analysis"` | Text for the toggle button |
| `className` | `string` | `""` | Additional CSS classes |

## CSS Architecture

### Key Classes

- `.horizontal-section`: Main container with horizontal scrolling
- `.panel`: Content panel with dynamic width
- `.hero`: Hero section with variable height
- `.second-render`: Analysis section, initially hidden
- `.initial`: Initial state (hero full height)
- `.activated`: Activated state (hero and analysis split)

### CSS Variables

- `--hero-height`: Controls the height of the hero section
- Dynamic calculation based on viewport and aspect ratio

## Implementation Details

### Width Management

- **Panel Width**: Uses `width: max-content` to match image content
- **Image Scaling**: `height: 100%`, `width: auto` for proportional scaling
- **No Side Gaps**: Images anchor to left edge with `object-position: left center`

### Animation System

- **Framer Motion**: Provides smooth height and opacity transitions
- **Duration**: 0.5s with `easeInOut` timing
- **Properties**: Height, opacity, and position changes

### Mouse Wheel Support

- **Horizontal Scroll**: Converts vertical wheel events to horizontal scroll
- **Event Handling**: Prevents default vertical scrolling
- **Smooth Navigation**: Maintains scroll momentum

## Usage Examples

### Basic Usage

```tsx
import AspectRatioHeroSplit from '@/components/AspectRatioHeroSplit';

export default function ProjectPage() {
  return (
    <AspectRatioHeroSplit
      heroSrc="/projects/hero.jpg"
      heroAlt="Project Hero"
      secondSrc="/projects/analysis.jpg"
      secondAlt="Project Analysis"
    />
  );
}
```

### With Custom Trigger Text

```tsx
<AspectRatioHeroSplit
  heroSrc="/projects/hero.jpg"
  heroAlt="Project Hero"
  secondSrc="/projects/analysis.jpg"
  secondAlt="Project Analysis"
  triggerText="View Details"
/>
```

## File Structure

```
src/
├── components/
│   └── AspectRatioHeroSplit.tsx
├── app/
│   ├── site-analysis-enhanced/
│   │   └── page.tsx
│   └── aspect-ratio-demo/
│       └── page.tsx
└── app/
    └── globals.css (contains component styles)
```

## Testing

### Demo Page

Visit `/aspect-ratio-demo` to test the component functionality:

- Toggle between full hero and split view
- Test mouse wheel horizontal scrolling
- Verify responsive behavior
- Check animation smoothness

### Enhanced Site Analysis

Visit `/site-analysis-enhanced` to see the component in action with real project data:

- Hero: `site-analysis.jpg`
- Analysis: `site-analysis-l1.jpg`
- Full project context and styling

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **CSS Features**: CSS Grid, Flexbox, CSS Variables
- **JavaScript**: ES6+ features, React 18+

## Performance Considerations

- **Image Optimization**: Uses Next.js Image component for optimization
- **Animation Performance**: Hardware-accelerated transforms
- **Memory Management**: Proper event listener cleanup
- **Responsive Images**: Automatic sizing and format selection

## Troubleshooting

### Common Issues

1. **Images Not Scaling Properly**
   - Ensure `object-fit: contain` is applied
   - Check image aspect ratios
   - Verify CSS variables are set correctly

2. **Animation Not Smooth**
   - Check Framer Motion installation
   - Verify CSS transitions are not conflicting
   - Ensure proper height calculations

3. **Horizontal Scroll Not Working**
   - Check mouse wheel event listeners
   - Verify container has `overflow-x: auto`
   - Ensure panel width is greater than viewport

### Debug Mode

Enable debug logging by adding `console.log` statements in the component:

```tsx
console.log('Panel width:', panelRef.current?.offsetWidth);
console.log('Is activated:', isActivated);
```

## Future Enhancements

- **Touch Support**: Swipe gestures for mobile devices
- **Keyboard Navigation**: Arrow key support
- **Accessibility**: ARIA labels and screen reader support
- **Custom Animations**: Configurable transition timing
- **Multiple Panels**: Support for more than two sections

## Version History

- **v0.2.0**: Initial implementation with aspect ratio awareness
- **v0.1.5**: Previous version with basic horizontal scrolling

## Related Components

- `HorizontalProjectLayoutEnhanced`: Enhanced layout component
- `ResponsiveBackgroundImage`: Image handling utilities
- `GridOverlay`: Development grid system

## Contributing

When modifying this component:

1. Test on multiple screen sizes
2. Verify animation performance
3. Check accessibility compliance
4. Update documentation
5. Add appropriate tests

## Button Styling

The toggle button features a professional, non-intrusive design:

### CSS Properties
```css
.activation-trigger {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 50;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  width: auto;
  height: auto;
  display: inline-block;
  transition: all 0.3s ease;
}

.activation-trigger:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-2px);
}
```

### Features
- **Fixed Positioning**: Stays in place during horizontal scrolling
- **High Contrast**: Semi-transparent black background ensures visibility
- **Smooth Animations**: Hover effects with subtle lift animation
- **Professional Appearance**: Clean, modern styling
- **Responsive**: Maintains position across all screen sizes

---

*Last updated: January 2025*
*Component version: 0.2.1*