// Example: Three.js + GSAP Integration
// This shows how your existing GSAP can animate Three.js objects

import * as THREE from 'three';
import { gsap } from 'gsap';

export function animateWithGSAP(scene: THREE.Scene) {
  // Create a mesh
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshPhongMaterial({ 
    color: 0xf97316 // Your brand orange
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // GSAP Timeline - just like you're already using
  const tl = gsap.timeline({ repeat: -1 });

  // Animate Three.js properties with GSAP
  tl.to(cube.rotation, {
    x: Math.PI * 2,
    duration: 2,
    ease: "power2.inOut"
  })
  .to(cube.position, {
    y: 3,
    duration: 1,
    ease: "elastic.out(1, 0.3)"
  }, "-=1")
  .to(cube.scale, {
    x: 1.5,
    y: 1.5,
    z: 1.5,
    duration: 0.5,
    ease: "back.out(1.7)"
  })
  .to(cube.material, {
    opacity: 0.5,
    duration: 1,
    ease: "power2.inOut"
  });

  // ScrollTrigger integration (if needed)
  // gsap.registerPlugin(ScrollTrigger);
  
  // gsap.to(cube.rotation, {
  //   y: Math.PI * 2,
  //   scrollTrigger: {
  //     trigger: ".some-section",
  //     start: "top center",
  //     end: "bottom center",
  //     scrub: true
  //   }
  // });

  return cube;
}

// Example: Combining with Framer Motion for UI
import { motion } from 'framer-motion';

export function HybridComponent() {
  return (
    <div className="relative">
      {/* Three.js Canvas */}
      <div id="three-container" className="w-full h-screen" />
      
      {/* Framer Motion UI Overlay */}
      <motion.div
        className="absolute top-0 left-0 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>3D + 2D Animation</h1>
      </motion.div>
    </div>
  );
}

// Example: React Three Fiber with GSAP
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export function AnimatedBox() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    // GSAP animation on mount
    gsap.from(meshRef.current.position, {
      y: -5,
      duration: 2,
      ease: "bounce.out"
    });

    gsap.to(meshRef.current.rotation, {
      z: Math.PI,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#f97316" />
    </mesh>
  );
}
