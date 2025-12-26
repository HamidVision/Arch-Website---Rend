'use client';

import { useState, useEffect } from 'react';

interface PreloadOptions {
  timeout?: number;  // Max wait time (default: 3000ms)
  onProgress?: (loaded: number, total: number) => void;
}

/**
 * Hook to preload images before displaying content
 * Useful for portfolio overlays and content-heavy pages
 * 
 * @param imageUrls - Array of image URLs to preload
 * @param shouldPreload - Whether to start preloading (default: true)
 * @param options - Configuration options
 * @returns { loaded: boolean, progress: number }
 */
export function useImagePreloader(
  imageUrls: string[], 
  shouldPreload: boolean = true,
  options: PreloadOptions = {}
) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const { timeout = 3000, onProgress } = options;

  useEffect(() => {
    // If not preloading or no images, mark as loaded immediately
    if (!shouldPreload || imageUrls.length === 0) {
      setLoaded(true);
      setProgress(100);
      return;
    }

    // Reset state when imageUrls change
    setLoaded(false);
    setProgress(0);

    let loadedCount = 0;
    const validUrls = imageUrls.filter(Boolean);
    const total = validUrls.length;

    if (total === 0) {
      setLoaded(true);
      setProgress(100);
      return;
    }

    const updateProgress = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / total) * 100);
      setProgress(pct);
      onProgress?.(loadedCount, total);
      
      if (loadedCount >= total) {
        setLoaded(true);
      }
    };

    // Preload all images in parallel
    validUrls.forEach(url => {
      const img = new Image();
      img.onload = updateProgress;
      img.onerror = updateProgress; // Don't block on errors
      img.src = url;
    });

    // Fallback timeout - show content even if some images fail
    const timer = setTimeout(() => {
      if (!loaded) {
        setLoaded(true);
        setProgress(100);
      }
    }, timeout);
    
    return () => clearTimeout(timer);
  }, [imageUrls.join(','), shouldPreload, timeout]); // eslint-disable-line react-hooks/exhaustive-deps

  return { loaded, progress };
}

export default useImagePreloader;
