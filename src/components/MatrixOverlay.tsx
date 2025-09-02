'use client';

import React, { useRef, useEffect, useCallback } from 'react';

export interface MatrixOverlayProps {
  running: boolean;
  internalFadeTiming?: number; // ms for fade transition
  side?: 'right' | 'left'; // which side to draw the matrix
  widthPct?: number; // percentage of screen width to use
  message?: string; // message to encode as binary
  colorHead?: string; // color for the head character
  colorTrail?: string; // color for trail characters
  bgFade?: number; // background fade strength
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
  side = 'right',
  widthPct = 50,
  message = "You were born with wings. You are not meant for crawling",
  colorHead = 'rgba(0,0,0,0.85)',
  colorTrail = 'rgba(0,0,0,0.6)',
  bgFade = 0.12
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const streamsRef = useRef<Stream[]>([]);

  // Matrix configuration
  const config = {
    fontSize: 16,
    minSpeed: 80,
    maxSpeed: 220,
    trailLenMin: 10,
    trailLenMax: 24
  };

  // Convert text to binary bits
  const textToBits = (text: string): string[] => {
    const bits = [];
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      const b = code.toString(2).padStart(8, '0');
      for (let j = 0; j < b.length; j++) bits.push(b[j]);
    }
    return bits;
  };

  // Split bits into segments for different streams
  const splitBits = (bits: string[], segments: number): string[][] => {
    const out = [];
    const size = Math.ceil(bits.length / segments);
    for (let i = 0; i < segments; i++) {
      const start = i * size;
      const end = Math.min(bits.length, start + size);
      const seg = bits.slice(start, end);
      if (seg.length === 0) break;
      out.push(seg);
    }
    return out;
  };

  // Initialize matrix streams
  const initStreams = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    
    // Calculate matrix area
    const matrixWidth = Math.floor(w * (widthPct / 100));
    const columns = Math.max(1, Math.floor(matrixWidth / config.fontSize));
    
    // Create binary segments from message
    const allBits = textToBits(message);
    const segments = splitBits(allBits, Math.max(3, Math.min(12, Math.ceil(columns / 6))));
    
    streamsRef.current = [];
    
    for (let i = 0; i < columns; i++) {
      const len = Math.floor(Math.random() * (config.trailLenMax - config.trailLenMin + 1)) + config.trailLenMin;
      const seg = segments[i % segments.length];
      const startIdx = Math.floor(Math.random() * seg.length);
      const chars = Array.from({ length: len }, (_, t) => seg[(startIdx + t) % seg.length]);
      
      streamsRef.current.push({
        y: -Math.random() * h,
        speed: Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed,
        len,
        chars,
        seg,
        idx: (startIdx + len) % seg.length
      });
    }
  }, [message, widthPct, config.fontSize, config.trailLenMin, config.trailLenMax, config.minSpeed, config.maxSpeed]);

  // Matrix rain animation with binary streams
  const drawMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Guard against unsized canvas
    if (canvas.width === 0 || canvas.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Clear canvas with fade effect - only in the matrix region
    const matrixWidth = Math.floor(w * (widthPct / 100));
    const startX = side === 'right' ? w - matrixWidth : 0;
    ctx.fillStyle = `rgba(255,255,255,${bgFade})`;
    ctx.fillRect(startX, 0, matrixWidth, h);

    // Set text properties
    ctx.font = `${config.fontSize}px "Courier New", Consolas, monospace`;
    ctx.textBaseline = 'top';

    // Draw streams
    streamsRef.current.forEach((s, i) => {
      if (!running) return;

      const x = startX + (i * config.fontSize);
      const headY = s.y;
      
      // Draw head character
      if (headY >= 0 && headY < h) {
        ctx.fillStyle = colorHead;
        ctx.fillText(s.chars[0], x, headY);
      }

      // Draw trail characters
      for (let t = 1; t < s.len; t++) {
        const yy = headY - t * config.fontSize;
        if (yy < -config.fontSize) break;
        if (yy > h) continue;
        
        const op = Math.max(0, 0.7 - (t / s.len) * 0.7);
        ctx.fillStyle = colorTrail.replace('0.6', op.toString());
        ctx.fillText(s.chars[t], x, yy);
      }

      // Update stream position
      s.y += s.speed * 0.016; // Assume 60fps
      
      // Reset stream when it goes off screen
      if (headY - (s.len * config.fontSize) > h) {
        s.y = -Math.random() * h;
        s.speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
        s.len = Math.floor(Math.random() * (config.trailLenMax - config.trailLenMin + 1)) + config.trailLenMin;
        
        // Update characters from segments
        const seg = s.seg;
        const startIdx = Math.floor(Math.random() * seg.length);
        s.chars = Array.from({ length: s.len }, (_, t) => seg[(startIdx + t) % seg.length]);
        s.idx = (startIdx + s.len) % seg.length;
      }
    });

    // Continue animation if running
    if (running) {
      animationRef.current = requestAnimationFrame(drawMatrix);
    }
  }, [running, side, widthPct, bgFade, colorHead, colorTrail, config.fontSize, config.trailLenMin, config.trailLenMax, config.minSpeed, config.maxSpeed]);

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
      resizeCanvas();
      initStreams();
      drawMatrix();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [running, drawMatrix, initStreams, resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-overlay-canvas"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%',
        pointerEvents: 'none',
        zIndex: 20
      }}
    />
  );
};
