'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useLogoNavigation = () => {
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();

  const handleLogoClick = () => {
    setShowLoading(true);
    
    // Wait longer for loading animation to be visible, then navigate
    setTimeout(() => {
      router.push('/');
    }, 1500); // Longer delay to show loading animation
    
    // Reset loading state after navigation
    setTimeout(() => {
      setShowLoading(false);
    }, 2500); // Slightly longer than loading animation
  };

  return {
    showLoading,
    handleLogoClick
  };
};
