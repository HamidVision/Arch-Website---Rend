'use client';

import React, { useRef, useEffect, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import portfolioAnimation from '@/data/portfolio-icon-animation.json';

interface PortfolioIconAnimatedProps {
  isHovered: boolean;
  isActive: boolean;
  strokeColor?: string;
  size?: number;
}

/**
 * Animated Portfolio Icon using Lottie
 * 
 * A 2x2 grid icon that animates when idle (not hovered, not active).
 * The animation pauses on hover or when the portfolio overlay is open.
 */
const PortfolioIconAnimated: React.FC<PortfolioIconAnimatedProps> = ({
  isHovered,
  isActive,
  strokeColor = 'white',
  size = 24
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const shouldAnimate = !isHovered && !isActive;

  // Control animation play/pause based on hover and active state
  useEffect(() => {
    if (lottieRef.current) {
      if (shouldAnimate) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  }, [shouldAnimate]);

  return (
    <div 
      style={{ 
        width: size, 
        height: size,
        // Apply color filter if strokeColor is not white
        filter: strokeColor === 'black' ? 'invert(1)' : 'none'
      }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={portfolioAnimation}
        loop={true}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default PortfolioIconAnimated;
