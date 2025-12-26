/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isNetlify = process.env.NETLIFY === 'true';
const isVercel = process.env.VERCEL === '1';

// Use basePath only for GitHub Pages, not for Netlify or Vercel
const basePath = (isProd && !isNetlify && !isVercel) ? '/Arch-Website---Rend' : '';

const nextConfig = {
  // Static export configuration
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: (isProd && !isNetlify && !isVercel) ? `${basePath}/` : '',
  
  // Static export for deployment
  output: 'export',
  
  // Completely disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Completely disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable all linting and type checking
  experimental: {
    esmExternals: false,
  },
  
  images: {
    domains: ['images.pexels.com'], // Allow external images for now
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: true, // Required for static export
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Note: Custom headers removed for static export compatibility
  // Headers cannot be set with output: 'export' as static files don't support custom headers
  // If needed, configure security headers at the server level (GitHub Pages, CDN, etc.)
};

export default nextConfig;
