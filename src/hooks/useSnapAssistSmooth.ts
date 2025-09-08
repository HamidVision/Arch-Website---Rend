'use client';

import { useEffect, useRef } from 'react';

interface SnapAssistOptions {
  containerSelector: string;   // e.g., '.projects-container'
  itemSelector: string;        // e.g., '.project-card'
  minVisibleRatio?: number;    // default 0.95 → 5% tolerance
  delayMs?: number;            // default 2000 ms pause
  align?: 'start' | 'center';  // default 'start'
  useCustomEasing?: boolean;   // default false → native smooth
  easingDuration?: number;     // ms, default 500
}

export function useSnapAssistSmooth({
  containerSelector,
  itemSelector,
  minVisibleRatio = 0.95,
  delayMs = 2000,
  align = 'start',
  useCustomEasing = false,
  easingDuration = 500
}: SnapAssistOptions) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
    if (!items.length) return;

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const smoothScrollCustom = (targetTop: number) => {
      const start = container.scrollTop;
      const change = targetTop - start;
      const startTime = performance.now();

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      function animateScroll(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / easingDuration, 1);
        const eased = easeOutCubic(progress);
        container.scrollTop = start + change * eased;
        if (progress < 1) requestAnimationFrame(animateScroll);
      }

      requestAnimationFrame(animateScroll);
    };

    const onScrollStop = () => {
      let bestTile: HTMLElement | null = null;
      let bestRatio = 0;

      items.forEach(tile => {
        const rect = tile.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        const ratio = visibleHeight / window.innerHeight;

        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestTile = tile;
        }
      });

      if (bestTile && bestRatio >= minVisibleRatio) {
        if (useCustomEasing) {
          const rect = bestTile.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          let targetTop: number;

          if (align === 'center') {
            const targetCenter = rect.top + rect.height / 2;
            const viewportCenter = containerRect.top + containerRect.height / 2;
            const delta = targetCenter - viewportCenter;
            targetTop = container.scrollTop + delta;
          } else {
            const delta = rect.top - containerRect.top;
            targetTop = container.scrollTop + delta;
          }

          smoothScrollCustom(targetTop);
        } else {
          bestTile.scrollIntoView({ behavior: 'smooth', block: align });
        }
      }
    };

    const onScroll = () => {
      clearTimer();
      timerRef.current = setTimeout(onScrollStop, delayMs);
    };

    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimer();
      container.removeEventListener('scroll', onScroll);
    };
  }, [
    containerSelector,
    itemSelector,
    minVisibleRatio,
    delayMs,
    align,
    useCustomEasing,
    easingDuration
  ]);
}
