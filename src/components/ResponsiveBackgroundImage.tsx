'use client';

import React from 'react';
import Image from 'next/image';

interface ResponsiveBackgroundImageProps {
  src: string;
  alt: string;
  aspectRatio: '21-9' | '16-9' | '4-3';
  className?: string;
  priority?: boolean;
  overlay?: boolean;
  overlayOpacity?: number;
}

const ResponsiveBackgroundImage: React.FC<ResponsiveBackgroundImageProps> = ({
  src,
  alt,
  aspectRatio,
  className = '',
  priority = false,
  overlay = true,
  overlayOpacity = 40
}) => {
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '21-9':
        return 'bg-image-21-9';
      case '16-9':
        return 'bg-image-16-9';
      case '4-3':
        return 'bg-image-4-3';
      default:
        return 'bg-image-16-9';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${getAspectRatioClass()}`}
        priority={priority}
      />
      {overlay && (
        <div className={`absolute inset-0 bg-black/${overlayOpacity}`}></div>
      )}
    </div>
  );
};

export default ResponsiveBackgroundImage;
