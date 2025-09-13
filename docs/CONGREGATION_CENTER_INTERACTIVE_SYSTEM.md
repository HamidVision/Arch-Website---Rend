# Congregation Center Interactive System Documentation

## Overview

The Congregation Center page features a sophisticated interactive button system that allows users to explore different levels and functions of the architectural design. This document provides comprehensive technical documentation for the implementation.

## System Architecture

### Component Structure
```
CongregationCenterPage
├── Navigation Header
├── Horizontal Scroll Container
│   └── Image Container
│       ├── Hero Image
│       ├── Text Overlay
│       ├── Interactive Buttons (1-6)
│       └── Dynamic Content System
│           ├── Title Box
│           ├── Main Content Box
│           └── Description Box
```

### State Management
```typescript
const [activeButton, setActiveButton] = useState<number | null>(null);
```

## Interactive Button System

### Button Specifications

| Button | Position (Top, Left) | Content Focus | Z-Index |
|--------|---------------------|---------------|---------|
| 1      | 19.25%, 36.53%     | Ground Floor  | 40      |
| 2      | 22.9%, 36.53%      | Residential   | 40      |
| 3      | 26.6%, 36.53%      | Office Spaces | 40      |
| 4      | 30.33%, 36.53%     | Community Hub | 40      |
| 5      | 34%, 36.53%        | Event Venues  | 40      |
| 6      | 37.7%, 36.53%      | Rooftop Gardens | 40    |

### Button States

#### Inactive State
```css
background: transparent
color: #F97316 (orange-500)
border: none
transition: all 300ms
```

#### Active State
```css
background: #F97316 (orange-500)
color: white
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
```

#### Hover State
```css
background: #F97316 (orange-500)
color: white
transform: scale(1.05)
```

## Content Display System

### Layout Specifications

#### Title Box
- **Position**: 12% from top, 49.65% from left (centered)
- **Dimensions**: 23% width, 8% height
- **Z-Index**: 35
- **Background**: White with 95% opacity
- **Content**: Dynamic title based on active button

#### Main Content Box
- **Position**: 48% from top, 49.65% from left (centered)
- **Dimensions**: 23% width, 60% height
- **Z-Index**: 30
- **Background**: Orange-500 with 90% opacity
- **Content**: Placeholder for future renders/video content

#### Description Box
- **Position**: 84% from top, 49.65% from left (centered)
- **Dimensions**: 23% width, 12% height
- **Z-Index**: 35
- **Background**: White with 95% opacity
- **Content**: Dynamic description based on active button

### Content Data Structure

```typescript
const contentData = {
  1: { 
    title: "Ground Floor", 
    description: "Public plaza and commercial spaces with direct urban connection" 
  },
  2: { 
    title: "Residential Levels", 
    description: "Mixed-income housing units with private terraces and gardens" 
  },
  3: { 
    title: "Office Spaces", 
    description: "Flexible work environments integrated with green spaces" 
  },
  4: { 
    title: "Community Hub", 
    description: "Shared facilities including fitness, dining, and meeting areas" 
  },
  5: { 
    title: "Event Venues", 
    description: "Multi-purpose spaces for gatherings and cultural activities" 
  },
  6: { 
    title: "Rooftop Gardens", 
    description: "Urban agriculture and sustainable living demonstration areas" 
  }
};
```

## Technical Implementation

### Button Click Handler
```typescript
const handleButtonClick = (buttonNumber: number) => {
  setActiveButton(activeButton === buttonNumber ? null : buttonNumber);
};
```

### Dynamic Content Rendering
```typescript
{activeButton && (
  <>
    {/* Title Box */}
    <div className="absolute bg-white bg-opacity-95..." />
    
    {/* Main Content Box */}
    <div className="absolute bg-orange-500 bg-opacity-90..." />
    
    {/* Description Box */}
    <div className="absolute bg-white bg-opacity-95..." />
  </>
)}
```

## Styling System

### Typography
- **Primary Font**: 'Helvetica Neue Bold'
- **Secondary Font**: 'Helvetica Neue'
- **Fallbacks**: Helvetica, Arial, sans-serif

### Text Effects
- **Text Shadow**: `1px 1px 2px rgba(255, 255, 255, 0.8)`
- **Purpose**: Improves readability over complex background

### Transitions
- **Duration**: 300ms
- **Easing**: CSS default (ease)
- **Properties**: `all` (background, color, transform)

## Accessibility Features

### ARIA Labels
```typescript
aria-label="View content 1"
aria-label="View content 2"
// ... for each button
```

### Keyboard Navigation
- All buttons are focusable with Tab key
- Enter and Space keys activate buttons
- Proper focus management

### Screen Reader Support
- Descriptive aria-labels
- Semantic HTML structure
- Proper heading hierarchy

## Integration with Existing Systems

### Horizontal Scroll Compatibility
- Content boxes positioned to avoid scroll conflicts
- Z-index management prevents interference
- Responsive positioning maintains functionality across viewport sizes

### Navigation Integration
- Header navigation remains accessible
- Back button functionality preserved
- Portfolio navigation unaffected

## Performance Considerations

### Optimization Strategies
- **Conditional Rendering**: Content boxes only render when needed
- **Minimal Re-renders**: State changes isolated to content system
- **CSS Transitions**: Hardware-accelerated animations
- **Efficient Event Handlers**: Single click handler with parameter

### Memory Management
- No memory leaks in event listeners
- Proper cleanup on component unmount
- Optimized state updates

## Future Enhancement Opportunities

### Content Integration
1. **Video Content**: Replace placeholder with actual architectural renders
2. **Interactive Media**: Add 3D models or interactive diagrams
3. **Animation**: Smooth transitions between content types
4. **Deep Linking**: URL-based content state persistence

### User Experience
1. **Keyboard Shortcuts**: Number keys for direct button access
2. **Swipe Gestures**: Mobile-friendly navigation
3. **Auto-dismiss**: Automatic content hiding after inactivity
4. **Progressive Disclosure**: Layered information revelation

### Technical Enhancements
1. **API Integration**: Dynamic content loading
2. **Caching**: Optimized content delivery
3. **Analytics**: User interaction tracking
4. **A/B Testing**: Interface optimization

## Testing Requirements

### Manual Testing Checklist
- [ ] All buttons clickable and responsive
- [ ] Content appears/disappears correctly
- [ ] Hover effects work on all buttons
- [ ] Content boxes don't overlap inappropriately
- [ ] Text remains readable at all zoom levels
- [ ] System works on mobile devices
- [ ] Accessibility features function properly

### Browser Compatibility
- [x] Chrome (latest)
- [x] Firefox (latest)
- [x] Safari (latest)
- [x] Edge (latest)

### Device Testing
- [x] Desktop (1920x1080)
- [x] Laptop (1366x768)
- [x] Tablet (768x1024)
- [x] Mobile (375x667)

## Troubleshooting Guide

### Common Issues

#### Buttons Not Clicking
1. Check z-index values
2. Verify event handler attachment
3. Ensure proper positioning

#### Content Boxes Misaligned
1. Verify transform origin
2. Check percentage calculations
3. Test on different viewport sizes

#### Performance Issues
1. Monitor re-render frequency
2. Check for memory leaks
3. Optimize animation performance

### Debug Commands
```javascript
// Check active button state
console.log('Active button:', activeButton);

// Verify content data
console.log('Content data:', contentData[activeButton]);

// Check positioning
const button = document.querySelector('[aria-label="View content 1"]');
console.log('Button position:', button.getBoundingClientRect());
```

## Maintenance Notes

### Regular Maintenance Tasks
1. **Content Updates**: Keep descriptions current with architectural plans
2. **Performance Monitoring**: Check for regression in interaction speed
3. **Accessibility Audits**: Regular testing with screen readers
4. **Browser Testing**: Verify compatibility with new browser versions

### Code Quality
- Follow established TypeScript patterns
- Maintain consistent naming conventions
- Document any modifications to positioning values
- Test thoroughly before deployment

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Next Review**: v0.5.0 Release
