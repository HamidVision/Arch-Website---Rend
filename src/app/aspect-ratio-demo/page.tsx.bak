'use client';

import AspectRatioHeroSplit from '@/components/AspectRatioHeroSplit';
import Image from 'next/image';

export default function AspectRatioDemo() {
  const heroContent = (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="text-center text-white z-10">
        <h1 className="text-6xl font-bold mb-4">Hero Content</h1>
      </div>
    </div>
  );

  const secondContent = (
    <div className="relative h-full w-full flex items-center justify-center bg-gradient-to-br from-green-600 to-teal-700">
      <div className="text-center text-white z-10">
        <h2 className="text-4xl font-bold mb-4">Second Render</h2>
        <p className="text-lg opacity-90">This content appears when activated</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <AspectRatioHeroSplit
        aspectRatio="16/9"
        heroContent={heroContent}
        secondContent={secondContent}
        triggerText="Toggle Split"
        className=""
      />
    </div>
  );
}
