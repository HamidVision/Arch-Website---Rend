/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/Arch-Website---Rend' : '';

const nextConfig = {
  // GitHub Pages configuration
  output: 'export',
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: isProd ? `${basePath}/` : '',
  
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
