/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/Arch-Website---Rend' : '';

const nextConfig = {
  // GitHub Pages configuration
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: isProd ? `${basePath}/` : '',
  
  // Static export for GitHub Pages
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
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
