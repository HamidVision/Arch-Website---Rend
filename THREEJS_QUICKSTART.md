# Quick Start: Adding Three.js to Your Project

## Installation Commands

### Option 1: Basic Three.js
```bash
npm install three @types/three
```

### Option 2: React Three Fiber (Recommended for React)
```bash
npm install three @types/three @react-three/fiber @react-three/drei
```

## Test the Integration

1. **Install Three.js**:
   ```bash
   npm install three @types/three
   ```

2. **Run your dev server**:
   ```bash
   npm run dev
   ```

3. **Visit the test page**:
   ```
   http://localhost:3000/three-test
   ```

   You should see:
   - A rotating orange cube (your brand color)
   - Framer Motion animations on the UI
   - Tailwind-styled overlay panels
   - Smooth integration with your existing stack

## What's Working

The test page demonstrates:
- ✅ Three.js WebGL rendering
- ✅ Dynamic imports (no SSR issues)
- ✅ Framer Motion UI animations
- ✅ Tailwind CSS styling
- ✅ TypeScript compatibility
- ✅ Next.js 14 integration

## No Configuration Needed

Your existing setup is already compatible:
- `next.config.js` - No changes required
- `tsconfig.json` - Already configured properly
- `tailwind.config.js` - Works alongside Three.js
- Package versions - All compatible

## Next Steps

1. **Explore React Three Fiber** for better React integration:
   ```bash
   npm install @react-three/fiber @react-three/drei
   ```

2. **Add 3D models** to your architecture projects:
   - GLTF/GLB files for building models
   - FBX for animated sequences
   - OBJ for simple geometries

3. **Integrate with your portfolio**:
   - 3D project showcases
   - Interactive building walkthroughs
   - Data visualizations

## Performance Tips

1. **Use dynamic imports** to prevent blocking:
   ```typescript
   const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
     ssr: false
   });
   ```

2. **Lazy load 3D content** on scroll or user interaction

3. **Optimize models** before importing:
   - Use Draco compression for GLTF
   - Reduce polygon count
   - Optimize textures

## Support

All your existing features continue to work:
- Portfolio overlay
- Horizontal scrolling
- Route transitions
- Animation timelines
- Loading screens

Three.js simply adds 3D capabilities on top of your existing architecture.
