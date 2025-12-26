'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
const SOCIAL_LINKS = {
  github: {
    url: 'https://github.com/HamidVision',
    label: 'GitHub',
    color: '#6e5494', // GitHub purple
    hoverText: 'View GitHub Profile',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/hamid-e/',
    label: 'LinkedIn',
    color: '#0A66C2', // LinkedIn blue
    hoverText: 'Connect on LinkedIn',
  },
  orchid: {
    url: 'https://orcid.org/0000-0003-2715-6550',
    label: 'ORCID',
    color: '#A6CE39', // ORCID green
    hoverText: 'View ORCID Profile',
  },
  instagram: {
    url: '#',
    label: 'Instagram',
    color: '#E4405F', // Instagram pink
    hoverText: 'Coming Soon',
    disabled: true,
  },
};

type SocialKey = keyof typeof SOCIAL_LINKS;

// --- SVG ICONS ---
const OrcidIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.209-.666-3.722-3.853-3.722h-2.466z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const icons: Record<SocialKey, React.FC> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  orchid: OrcidIcon,
  instagram: InstagramIcon,
};

// --- MAIN COMPONENT ---
const InteractiveSocialPanel: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<SocialKey | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentLink = hoveredIcon ? SOCIAL_LINKS[hoveredIcon] : null;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Link Preview Pill */}
      <AnimatePresence>
        {(hoveredIcon || !isRevealed) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-6 flex justify-center"
          >
            <div
              className="px-8 py-4 rounded-full border-2 transition-all duration-300"
              style={{
                borderColor: currentLink?.color || 'rgba(255,255,255,0.2)',
                backgroundColor: currentLink 
                  ? `${currentLink.color}15` 
                  : 'rgba(255,255,255,0.05)',
              }}
            >
              <motion.p
                key={hoveredIcon || 'default'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium tracking-wide"
                style={{ color: currentLink?.color || 'rgba(255,255,255,0.6)' }}
              >
                {currentLink?.hoverText || 'Reveal links'}
              </motion.p>
              {!hoveredIcon && (
                <p className="text-xs text-white/40 mt-1 text-center">
                  Hover on icons
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Icons Row */}
      <div 
        className="flex justify-center items-center gap-6"
        onMouseEnter={() => setIsRevealed(true)}
      >
        {(Object.keys(SOCIAL_LINKS) as SocialKey[]).map((key) => {
          const social = SOCIAL_LINKS[key];
          const Icon = icons[key];
          const isHovered = hoveredIcon === key;
          const isDisabled = 'disabled' in social && social.disabled;

          return (
            <motion.a
              key={key}
              href={isDisabled ? undefined : social.url}
              target={isDisabled ? undefined : "_blank"}
              rel={isDisabled ? undefined : "noopener noreferrer"}
              className={`relative p-4 rounded-xl transition-all duration-300 ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              style={{
                backgroundColor: isHovered 
                  ? `${social.color}20` 
                  : 'rgba(255,255,255,0.05)',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: isHovered 
                  ? social.color 
                  : 'rgba(255,255,255,0.1)',
              }}
              onMouseEnter={() => setHoveredIcon(key)}
              onMouseLeave={() => setHoveredIcon(null)}
              whileHover={{ scale: isDisabled ? 1 : 1.1 }}
              whileTap={{ scale: isDisabled ? 1 : 0.95 }}
              aria-label={isDisabled ? `${social.label} - Coming Soon` : `Open ${social.label}`}
              onClick={isDisabled ? (e) => e.preventDefault() : undefined}
            >
              <motion.div
                animate={{
                  color: isHovered ? social.color : 'rgba(255,255,255,0.7)',
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon />
              </motion.div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={{
                  boxShadow: isHovered && !isDisabled
                    ? `0 0 30px ${social.color}40, 0 0 60px ${social.color}20`
                    : '0 0 0px transparent',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveSocialPanel;
