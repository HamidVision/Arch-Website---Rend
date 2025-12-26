'use client';

import { useEffect } from 'react';

// Set to true to temporarily allow right-click for debugging
const DEBUG_MODE = false;

export default function DisableRightClick() {
  useEffect(() => {
    // Skip right-click prevention in debug mode
    if (DEBUG_MODE) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return null;
}
