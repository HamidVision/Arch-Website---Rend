'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  speed?: number; // milliseconds per character
  isTyping: boolean;
  onComplete?: () => void;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 40,
  isTyping,
  onComplete,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCaret, setShowCaret] = useState(true);

  // Typing animation
  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [isTyping, currentIndex, text, speed, onComplete]);

  // Caret blink effect
  useEffect(() => {
    const caretTimer = setInterval(() => {
      setShowCaret(prev => !prev);
    }, 500);

    return () => clearInterval(caretTimer);
  }, []);

  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className={`font-mono ${className}`}>
      <span>{displayedText}</span>
      {isTyping && currentIndex < text.length && (
        <motion.span
          className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5"
          animate={{ opacity: showCaret ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </div>
  );
};

export default Typewriter;
