'use client';

import React, { useRef, useEffect, useCallback } from 'react';

export interface MatrixOverlayProps {
  running: boolean;
  internalFadeTiming?: number; // ms for fade transition
}

interface Stream {
  y: number;
  speed: number;
  len: number;
  chars: string[];
  seg: string[];
  idx: number;
}

export const MatrixOverlay: React.FC<MatrixOverlayProps> = ({ 
  running, 
  internalFadeTiming = 1000 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const streamsRef = useRef<Stream[]>([]);

  // Matrix configuration
  const config = {
    fontSize: 14,
    columns: 40,
    fadeStrength: 0.1,
    headColor: '#0F0',
    trailColor: (opacity: number) => `rgba(0, 255, 0, ${opacity})`
  };

  // Convert text to binary
  const textToBinary = (text: string): string => {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
  };

  // Initialize matrix streams
  const initStreams = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    
    streamsRef.current = [];
    
    for (let i = 0; i < config.columns; i++) {
      const x = i * (w / config.columns);
      const y = Math.random() * h;
      const speed = 1 + Math.random() * 2;
      const len = 10 + Math.random() * 20;
      
      // Create binary stream from sample text
      const sampleText = 'MATRIX FLOW ANIMATION';
      const binary = textToBinary(sampleText);
      const chars = binary.split('');
      
      streamsRef.current.push({
        y,
        speed,
        len,
        chars,
        seg: chars,
        idx: Math.floor(Math.random() * chars.length)
      });
    }
  }, [config.columns]);

  // Matrix rain animation with binary streams
  const drawMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear canvas with fade effect
    ctx.fillStyle = `rgba(0, 0, 0, ${config.fadeStrength})`;
    ctx.fillRect(0, 0, w, h);

    // Set text properties
    ctx.font = `${config.fontSize}px "Courier New", Consolas, monospace`;
    ctx.textBaseline = 'top';

    // Draw streams
    streamsRef.current.forEach((s, i) => {
      if (!running) return;

      const x = i * (w / config.columns);
      const headY = s.y;
      
      // Draw head character
      if (headY >= 0 && headY < h) {
        ctx.fillStyle = config.headColor;
        ctx.fillText(s.chars[0], x, headY);
      }

      // Draw trail characters
      for (let t = 1; t < s.len; t++) {
        const yy = headY - t * config.fontSize;
        if (yy > h) continue;
        
        const op = 1 - (t / s.len);
        ctx.fillStyle = config.trailColor(op);
        ctx.fillText(s.chars[t], x, yy);
      }

      // Update stream position
      s.y += s.speed;
      
      // Reset stream when it goes off screen
      if (headY - s.len * config.fontSize > h) {
        s.y = -Math.random() * h;
      }
    });

    // Continue animation if running
    if (running) {
      animationRef.current = requestAnimationFrame(drawMatrix);
    }
  }, [running, config.fontSize, config.columns, config.fadeStrength, config.headColor, config.trailColor]);

  // Handle canvas resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Set canvas size with device pixel ratio scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    
    initStreams();
  }, [initStreams]);

  // Initialize and start animation
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    if (running) {
      drawMatrix();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [running, drawMatrix, resizeCanvas]);

  // Handle running state changes
  useEffect(() => {
    if (running) {
      drawMatrix();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [running, drawMatrix]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ 
        width: '100%', 
        height: '100%',
        background: 'transparent'
      }}
    />
  );
};
