import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HELoadingComponent from '@/components/HE_Loading_Component';
import RouteTransitionWrapper from '@/components/RouteTransitionWrapper';
import DisableRightClick from '@/components/DisableRightClick';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hamid Esmaeillou | Architecture Portfolio',
  description: 'Professional architecture portfolio showcasing sustainable design projects, computational design, and research-driven innovation by Hamid Esmaeillou.',
  keywords: 'architecture, design, sustainability, portfolio, research, Hamid Esmaeillou, computational design',
  authors: [{ name: 'Hamid Esmaeillou' }],
  robots: 'index, follow',
  metadataBase: new URL('https://archml.io'),
  openGraph: {
    title: 'Hamid Esmaeillou | Architecture Portfolio',
    description: 'Explore architectural projects showcasing sustainable design, computational innovation, and research-driven approaches.',
    url: 'https://archml.io',
    siteName: 'Hamid Esmaeillou Architecture',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1920,
        height: 1080,
        alt: 'Hamid Esmaeillou Architecture Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamid Esmaeillou | Architecture Portfolio',
    description: 'Explore architectural projects showcasing sustainable design and computational innovation.',
    images: ['/images/hero.jpg'],
  },
  icons: {
    icon: '/brand/logo-HE-optimized.svg',
    shortcut: '/brand/logo-HE-optimized.svg',
    apple: '/brand/logo-HE-optimized.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { LoadingProvider } from '@/context/LoadingContext';

// ... (existing imports)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* Fallback for users with JavaScript disabled */}
        <noscript>
          <div style={{ 
            padding: '3rem', 
            textAlign: 'center', 
            backgroundColor: '#000', 
            color: '#fff',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 300, letterSpacing: '0.1em' }}>
              HAMID ESMAEILLOU
            </h1>
            <p style={{ fontSize: '1rem', color: '#888', marginBottom: '2rem' }}>
              Architecture & Design Portfolio
            </p>
            <p style={{ fontSize: '0.875rem', color: '#666', maxWidth: '400px', lineHeight: 1.6 }}>
              JavaScript is required to view this interactive portfolio. 
              Please enable JavaScript in your browser settings.
            </p>
          </div>
        </noscript>

        <LoadingProvider>
          {/* Global Disable Right Click */}
          <DisableRightClick />
          
          {/* HE Splash Screen - Shows on initial load AND context transitions */}
          <HELoadingComponent
            variant="splash"
            timeoutMs={2000}
            logoUrl="/brand/logo-loading.png"
            subtitle="Architecture & Design Studio"
            tagline="Creating spaces that inspire"
          />

          <RouteTransitionWrapper>
            {children}
          </RouteTransitionWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}
