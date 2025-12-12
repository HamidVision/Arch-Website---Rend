'use client';

import React, { useRef, useEffect, useCallback } from 'react';

export interface MatrixOverlayProps {
  running: boolean;
  internalFadeTiming?: number; // ms for fade transition
  side?: 'right' | 'left' | 'center'; // which side to draw the matrix
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
  colorHead = 'rgba(255,255,255,0.9)',
  colorTrail = 'rgba(255,255,255,0.6)',
  bgFade = 0.12
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  
  // State for matrix configuration
  const stateRef = useRef({
    fontSize: 16,
    minSpeed: 80,
    maxSpeed: 220,
    trailLenMin: 10,
    trailLenMax: 24,
    rightStart: 0,
    columns: 0,
    columnWidth: 0,
    streams: [] as Stream[],
    segments: [] as string[][],
    lastTime: 0
  });

  const textToBits = (str: string) => {
    const bits = [];
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        const b = code.toString(2).padStart(8, '0');
        for (let j = 0; j < b.length; j++) bits.push(b[j]);
    }
    return bits;
  };

  const splitBits = (bits: string[], segments: number) => {
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

  const rand = (min: number, max: number) => min + Math.random() * (max - min);
  const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = Math.max(1, window.innerWidth || document.documentElement.clientWidth || 1);
    const h = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1);
    
    // Set actual canvas size (no dpr scaling in HTML reference, keeping it simple to match)
    canvas.width = w; 
    canvas.height = h;

    const state = stateRef.current;
    state.columnWidth = Math.max(1, Math.floor(state.fontSize));
    
    // Calculate layout based on side and widthPct
    const matrixWidth = Math.floor(w * (widthPct / 100));
    let startOffset = 0;
    
    if (side === 'right') {
        startOffset = w - matrixWidth;
    } else if (side === 'center') {
        startOffset = (w - matrixWidth) / 2;
    } else {
        // left
        startOffset = 0;
    }

    // We store the start offset in 'rightStart' to minimize state variable changes, 
    // effectively it acts as the X-offset for the matrix block.
    state.rightStart = Math.max(0, startOffset);
    
    // Columns is based on the matrix width, not the remaining space
    state.columns = Math.max(1, Math.floor(matrixWidth / state.columnWidth));

    const allBits = textToBits(message);
    const segCount = Math.max(3, Math.min(12, Math.ceil(state.columns / 6)));
    state.segments = splitBits(allBits, segCount);

    state.streams = Array.from({ length: state.columns }, (_, i) => {
        const len = randInt(state.trailLenMin, state.trailLenMax);
        const seg = state.segments[i % state.segments.length];
        const startIdx = randInt(0, seg.length - 1);
        const chars = Array.from({ length: len }, (_, t) => seg[(startIdx + t) % seg.length]);
        
        return {
            y: -randInt(0, h),
            speed: rand(state.minSpeed, state.maxSpeed),
            len,
            chars,
            seg,
            idx: (startIdx + len) % seg.length
        };
    });

    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.font = `${state.fontSize}px "Courier New", Consolas, monospace`;
        ctx.textBaseline = 'top';
        ctxRef.current = ctx;
    }
  }, [message, side, widthPct]);

  const frame = useCallback((now: number) => {
    if (!running || !canvasRef.current || !ctxRef.current) return;

    const state = stateRef.current;
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;

    const dtRaw = (now - state.lastTime) / 1000;
    const dt = Math.max(0, Math.min(0.05, isFinite(dtRaw) ? dtRaw : 0.016));
    state.lastTime = now;

    // Use destination-out to fade existing pixels to transparent
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = `rgba(0, 0, 0, ${bgFade})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reset to source-over for drawing new text
    ctx.globalCompositeOperation = 'source-over';

    for (let i = 0; i < state.streams.length; i++) {
        const s = state.streams[i];
        const prevY = s.y;
        s.y += s.speed * dt;

        const x = state.rightStart + i * state.columnWidth;
        const prevCell = Math.floor(prevY / state.fontSize);
        const headCell = Math.floor(s.y / state.fontSize);
        const headY = headCell * state.fontSize;

        if (headCell !== prevCell) {
            const nextBit = s.seg[s.idx];
            s.idx = (s.idx + 1) % s.seg.length;
            s.chars.pop();
            s.chars.unshift(nextBit);
        }

        if (headY >= 0 && headY < canvas.height) {
            ctx.fillStyle = colorHead;
            ctx.fillText(s.chars[0], x, headY);
        }

        for (let t = 1; t < s.len; t++) {
            const yy = headY - t * state.fontSize;
            if (yy < -state.fontSize) break;
            if (yy > canvas.height) continue;
            
            const op = Math.max(0, 0.7 - (t / s.len) * 0.7);
            // Assuming colorTrail format is 'rgba(r,g,b,alpha)' we replace the alpha
            // For white trails 'rgba(255,255,255,0.6)', we want 'rgba(255,255,255, op)'
            const baseColor = colorTrail.substring(0, colorTrail.lastIndexOf(','));
            ctx.fillStyle = `${baseColor},${op})`; 
            ctx.fillText(s.chars[t], x, yy);
        }

        if (headY - (s.len * state.fontSize) > canvas.height) {
            s.y = -randInt(0, canvas.height);
            s.speed = rand(state.minSpeed, state.maxSpeed);
            s.len = randInt(state.trailLenMin, state.trailLenMax);
            const seg = state.segments[(i + randInt(0, state.segments.length - 1)) % state.segments.length];
            s.seg = seg;
            const startIdx = randInt(0, seg.length - 1);
            s.chars = Array.from({ length: s.len }, (_, t) => seg[(startIdx + t) % seg.length]);
            s.idx = (startIdx + s.len) % seg.length;
        }
    }

    animationRef.current = requestAnimationFrame(frame);
  }, [running, bgFade, colorHead, colorTrail]);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    
    if (running) {
        stateRef.current.lastTime = performance.now();
        animationRef.current = requestAnimationFrame(frame);
    } else {
        // Clear canvas when not running
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    return () => {
        window.removeEventListener('resize', resize);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [running, resize, frame]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${running ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};
