// Site-wide configuration and constants
// Centralized configuration for the architecture portfolio

export const siteConfig = {
  // Basic site information
  name: 'HE Architecture',
  title: 'HE Architecture | Portfolio',
  description: 'Architecture portfolio showcasing design philosophy, projects, and creative explorations.',
  url: 'https://your-domain.com', // Update with actual domain
  
  // SEO and social
  keywords: ['architecture', 'design', 'portfolio', 'projects', 'sustainability'],
  author: 'HE Architecture',
  social: {
    instagram: '', // Add social media handles
    linkedin: '',
    email: 'contact@he-architecture.com' // Update with actual email
  },
  
  // Visual configuration
  theme: {
    // Colors matching your current design
    background: '#000000',
    text: '#ffffff',
    accent: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.3)'
  },
  
  // Image configuration
  images: {
    heroImage: '/images/hero-landing.webp',
    logoPath: '/logo.png',
    fallbackImage: '/images/placeholder.jpg'
  },
  
  // Navigation timing and animations
  animations: {
    pageTransition: 0.6,
    fadeIn: 0.8,
    textReveal: 0.4
  },
  
  // Content configuration
  content: {
    // Homepage hero text timing (for future animation implementation)
    heroTextDuration: 9000, // 9 seconds as used in design-philosophy page
    heroTextFadeOut: 1000,  // 1 second fade out
    
    // Project grid configuration
    projectsPerPage: 6,
    featuredProjectsLimit: 4
  },
  
  // Development configuration
  development: {
    showGrid: false, // Grid overlay for positioning
    enableDebugLog: true,
    enableAnimationControls: false
  }
};

export default siteConfig;