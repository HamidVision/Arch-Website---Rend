'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface LoadingContextType {
  isLoading: boolean;
  triggerTransition: (url: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const triggerTransition = (url: string) => {
    setIsLoading(true);
    
    // Wait for fade-in (1000ms to be safe and smooth)
    setTimeout(() => {
      router.push(url);
      
      // Wait for page load/transition then fade out
      // We keep it visible for a bit longer to cover the mount
      setTimeout(() => {
        setIsLoading(false);
      }, 1500); 
    }, 1500); // Wait 1.5s before navigating (showing the logo)
  };

  return (
    <LoadingContext.Provider value={{ isLoading, triggerTransition }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
