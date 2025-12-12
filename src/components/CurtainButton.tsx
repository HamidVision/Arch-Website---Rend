'use client';

import React from 'react';

interface CurtainButtonProps {
  onClick?: (e: React.MouseEvent) => void;
  label?: string;
  className?: string;
  isWidescreen?: boolean;
  variant?: 'default' | 'inverse';
}

const CurtainButton: React.FC<CurtainButtonProps> = ({ 
  onClick, 
  label = 'READ MORE', 
  className = '',
  isWidescreen = false,
  variant = 'default'
}) => {
  const isInverse = variant === 'inverse';

  return (
    <button
      onClick={onClick}
      // 1. Changed 'group' to 'group/btn' to isolate this hover event
      // 2. Added 'backdrop-blur-none' and 'bg-transparent' to ensure no ghost background
      className={`group/btn relative overflow-hidden px-8 py-3 border outline-none focus:outline-none bg-transparent ${
        isInverse ? 'border-black' : 'border-white'
      } ${className}`}
      style={{
        borderRadius: '0px',
      }}
    >
      {/* The 'Curtain'
        - We use 'group-hover/btn' to reference the specific group name above.
        - Fixed the easing syntax to be safer.
        - Added 'will-change-transform' for smoother performance.
      */}
      <div 
        className={`absolute inset-0 w-full h-full transform translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform ${
          isInverse ? 'bg-black' : 'bg-white'
        }`}
        style={{
             top: 0,
             left: 0
        }}
      />

      {/* Text Layering
        - Transitions to black when 'group/btn' is hovered
      */}
      <span className={`relative z-10 text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-500 ${
        isInverse 
          ? 'text-black group-hover/btn:text-white' 
          : 'text-white group-hover/btn:text-black'
      }`}>
        {label}
      </span>
    </button>
  );
};

export default CurtainButton;
