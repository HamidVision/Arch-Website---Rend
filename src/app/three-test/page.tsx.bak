'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Dynamic import for Three.js (Next.js compatible)
let THREE: any;

export default function ThreeTestPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import Three.js (client-side only)
    import('three').then((module) => {
      THREE = module;
      initScene();
    });

    return () => {
      // Cleanup
      if (sceneRef.current) {
        mountRef.current?.removeChild(sceneRef.current.domElement);
      }
    };
  }, []);

  const initScene = () => {
    if (!mountRef.current || !THREE) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    sceneRef.current = renderer;

    // Add a cube with your brand color
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xf97316, // Your orange brand color
      specular: 0x111111,
      shininess: 100
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* UI Overlay with Framer Motion */}
      <motion.div
        className="absolute top-8 left-8 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Three.js Integration Test
        </h1>
        <p className="text-gray-600">
          Three.js working with Next.js, Framer Motion, and Tailwind CSS
        </p>
      </motion.div>

      {/* Back button */}
      <motion.button
        onClick={() => window.history.back()}
        className="absolute top-8 right-8 z-10 px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Back to Portfolio
      </motion.button>

      {/* Info panel with Tailwind styling */}
      <motion.div
        className="absolute bottom-8 left-8 z-10 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Compatibility Confirmed ✅
        </h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Three.js rendering in WebGL canvas</li>
          <li>• Framer Motion animations on UI elements</li>
          <li>• Tailwind CSS styling the overlay</li>
          <li>• Next.js dynamic imports working</li>
          <li>• TypeScript types available with @types/three</li>
        </ul>
      </motion.div>
    </div>
  );
}
