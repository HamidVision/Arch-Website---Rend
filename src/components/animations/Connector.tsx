'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConnectorProps {
  from: string; // Box ID
  to: string;   // Box ID
  fromAnchor: 'left' | 'right' | 'top' | 'bottom';
  toAnchor: 'left' | 'right' | 'top' | 'bottom';
  color?: string;
  strokeWidth?: number;
  glowColor?: string;
  glowBlur?: number;
  isVisible?: boolean;
  onAnimationComplete?: () => void;
}

const Connector: React.FC<ConnectorProps> = ({
  from,
  to,
  fromAnchor,
  toAnchor,
  color = '#3B82F6',
  strokeWidth = 2,

  glowBlur = 8,
  isVisible = true,
  onAnimationComplete,
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathData, setPathData] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);

  // Calculate connection points between boxes
  const calculateConnection = () => {
    const fromBox = document.getElementById(from);
    const toBox = document.getElementById(to);
    
    if (!fromBox || !toBox) return null;

    const fromRect = fromBox.getBoundingClientRect();
    const toRect = toBox.getBoundingClientRect();
    const containerRect = document.getElementById('hero-stage')?.getBoundingClientRect();
    
    if (!containerRect) return null;

    // Convert to container-relative coordinates
    const fromX = fromRect.left - containerRect.left;
    const fromY = fromRect.top - containerRect.top;
    const toX = toRect.left - containerRect.left;
    const toY = toRect.top - containerRect.top;

    let startX: number, startY: number, endX: number, endY: number;

    // Calculate start point (from box anchor)
    switch (fromAnchor) {
      case 'left':
        startX = fromX;
        startY = fromY + fromRect.height / 2;
        break;
      case 'right':
        startX = fromX + fromRect.width;
        startY = fromY + fromRect.height / 2;
        break;
      case 'top':
        startX = fromX + fromRect.width / 2;
        startY = fromY;
        break;
      case 'bottom':
        startX = fromX + fromRect.width / 2;
        startY = fromY + fromRect.height;
        break;
    }

    // Calculate end point (to box anchor)
    switch (toAnchor) {
      case 'left':
        endX = toX;
        endY = toY + toRect.height / 2;
        break;
      case 'right':
        endX = toX + toRect.width;
        endY = toY + toRect.height / 2;
        break;
      case 'top':
        endX = toX + toRect.width / 2;
        endY = toY;
        break;
      case 'bottom':
        endX = toX + toRect.width / 2;
        endY = toY + toRect.height;
        break;
    }

    // Calculate control points for smooth S-curve
    const midX = (startX + endX) / 2;
    const control1X = startX + (midX - startX) * 0.5;
    const control1Y = startY;
    const control2X = endX - (endX - midX) * 0.5;
    const control2Y = endY;

    // Create cubic Bézier path
    const path = `M ${startX} ${startY} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${endX} ${endY}`;
    
    return { path, startX, startY, endX, endY };
  };

  // Update connection when boxes are positioned
  useEffect(() => {
    const updateConnection = () => {
      const connection = calculateConnection();
      if (connection) {
        setPathData(connection.path);
        setIsConnected(true);
      }
    };

    // Initial calculation
    updateConnection();

    // Update on window resize
    window.addEventListener('resize', updateConnection);
    
    // Update when boxes become visible
    const observer = new MutationObserver(updateConnection);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', updateConnection);
      observer.disconnect();
    };
  }, [from, to, fromAnchor, toAnchor]);

  if (!isConnected || !pathData) return null;

  return (
    <motion.svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 45 }} // Above background, below boxes
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onAnimationComplete={onAnimationComplete}
    >
      {/* Glow effect */}
      <defs>
        <filter id={`glow-${from}-${to}`}>
          <feGaussianBlur stdDeviation={glowBlur} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Wire path */}
      <motion.path
        ref={pathRef}
        d={pathData}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        filter={`url(#glow-${from}-${to})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          pathLength: { duration: 0.25, ease: 'easeOut' },
          opacity: { duration: 0.2, ease: 'easeOut' }
        }}
      />
    </motion.svg>
  );
};

export default Connector;
