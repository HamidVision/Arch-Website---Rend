'use client';

import React, { useRef, useEffect, useState } from 'react';

interface GridOverlayProps {
  mode?: 'px' | 'percent';
  stepPx?: number;
  cols?: number;
  rows?: number;
  color?: string;
  labelColor?: string;
  bgTint?: string;
  originMarker?: { x?: number; y?: number };
  scope?: 'container' | 'viewport';
}

const GridOverlay: React.FC<GridOverlayProps> = ({
  mode = 'px',
  stepPx = 100,
  cols = 12,
  rows = 8,
  color = 'rgba(0,0,0,0.4)',
  labelColor = 'rgba(0,0,0,0.8)',

  originMarker,
  scope = 'container'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (scope === 'viewport') {
      const setViewportSize = () => setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setViewportSize();
      window.addEventListener('resize', setViewportSize);
      return () => window.removeEventListener('resize', setViewportSize);
    } else {
      if (!containerRef.current) return;
      const el = containerRef.current;
      const ro = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setContainerSize({ width, height });
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    }
  }, [scope]);

  const gridStyle = React.useMemo<React.CSSProperties>(() => {
    const line = color;
    if (mode === 'px') {
      return {
        backgroundImage: `
          repeating-linear-gradient(to right, ${line} 0 1px, transparent 1px ${stepPx}px),
          repeating-linear-gradient(to bottom, ${line} 0 1px, transparent 1px ${stepPx}px)
        `,
        backgroundSize: `${stepPx}px ${stepPx}px`,
        backgroundPosition: '0 0'
      };
    } else {
      const col = 100 / cols;
      const row = 100 / rows;
      return {
        backgroundImage: `
          repeating-linear-gradient(to right, ${line} 0 1px, transparent 1px ${col}%),
          repeating-linear-gradient(to bottom, ${line} 0 1px, transparent 1px ${row}%)
        `,
        backgroundSize: `${col}% ${row}%`,
        backgroundPosition: '0 0'
      };
    }
  }, [mode, stepPx, cols, rows, color]);

  const renderLabels = () => {
    if (mode === 'px' && containerSize.width > 0) {
      const numCols = Math.ceil(containerSize.width / stepPx);
      const numRows = Math.ceil(containerSize.height / stepPx);
      return (
        <>
          {Array.from({ length: numCols }, (_, i) => (
            <div
              key={`col-${i}`}
              className="absolute text-xs font-mono font-bold pointer-events-none"
              style={{
                left: i * stepPx + stepPx / 2,
                top: 8,
                color: labelColor,
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                transform: 'translateX(-50%)'
              }}
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          {Array.from({ length: numRows }, (_, i) => (
            <div
              key={`row-${i}`}
              className="absolute text-xs font-mono font-bold pointer-events-none"
              style={{
                left: 8,
                top: i * stepPx + stepPx / 2,
                color: labelColor,
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                transform: 'translateY(-50%)'
              }}
            >
              {i + 1}
            </div>
          ))}
        </>
      );
    }

    if (mode === 'percent') {
      return (
        <>
          {Array.from({ length: cols }, (_, i) => (
            <div
              key={`col-${i}`}
              className="absolute text-xs font-mono font-bold pointer-events-none"
              style={{
                left: `${(i + 0.5) * (100 / cols)}%`,
                top: '8px',
                color: labelColor,
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                transform: 'translateX(-50%)'
              }}
            >
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          {Array.from({ length: rows }, (_, i) => (
            <div
              key={`row-${i}`}
              className="absolute text-xs font-mono font-bold pointer-events-none"
              style={{
                left: '8px',
                top: `${(i + 0.5) * (100 / rows)}%`,
                color: labelColor,
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                transform: 'translateY(-50%)'
              }}
            >
              {i + 1}
            </div>
          ))}
        </>
      );
    }
    return null;
  };



  // Build wrapper props per scope
  const wrapperProps =
    scope === 'viewport'
      ? {
          style: {
            ...gridStyle,
            position: 'fixed' as const,
            top: `var(--header-h, 64px)`,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none' as const,
            zIndex: 60
          }
        }
      : {
          ref: containerRef,
          className: 'absolute inset-0 w-full h-full pointer-events-none z-[60]',
          style: gridStyle
        };

  return (
    <div {...wrapperProps}>
      {renderLabels()}
      {/* optional origin marker */}
      {originMarker && (
        <div
          className="absolute w-4 h-4 pointer-events-none"
          style={{
            left: originMarker.x || 0,
            top: originMarker.y || 0,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-full h-0.5 bg-red-500 absolute top-1/2 transform -translate-y-1/2" />
          <div className="w-0.5 h-full bg-red-500 absolute left-1/2 transform -translate-x-1/2" />
        </div>
      )}
    </div>
  );
};

export default GridOverlay;
