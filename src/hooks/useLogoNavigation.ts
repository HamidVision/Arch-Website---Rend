'use client';

import { useLoading } from '@/context/LoadingContext';

export const useLogoNavigation = () => {
  const { triggerTransition, isLoading } = useLoading();

  const handleLogoClick = () => {
    triggerTransition('/');
  };

  return {
    showLoading: isLoading, // Expose as showLoading for backward compatibility if needed, though mostly unused now
    handleLogoClick
  };
};
