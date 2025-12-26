import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HELoadingComponent from '@/components/HE_Loading_Component';
import RouteTransitionWrapper from '@/components/RouteTransitionWrapper';
import DisableRightClick from '@/components/DisableRightClick';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://archml.io'),
  title: {
    default: 'Hamid Esmaeillou | Architecture & Machine Learning',
    template: '%s | Hamid Esmaeillou'
  },
  description: 'Architecture portfolio showcasing sustainable design projects and research in machine learning, computer vision, and their applications in architectural design and urban planning.',
  keywords: [
    'architecture',
    'machine learning',
    'computer vision',
    'AI in architecture',
    'sustainable design',
    'architectural research',
    'computational design',
    'urban design',
    'Hamid Esmaeillou'
  ],
  authors: [{ name: 'Hamid Esmaeillou' }],
  creator: 'Hamid Esmaeillou',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://archml.io',
    siteName: 'Hamid Esmaeillou | ArchML',
    title: 'Hamid Esmaeillou | Architecture & Machine Learning',
    description: 'Exploring the intersection of architecture, machine learning, and computer vision through innovative design projects and research.',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Hamid Esmaeillou - Architecture & Machine Learning Portfolio'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamid Esmaeillou | Architecture & ML Research',
    description: 'Architecture portfolio featuring machine learning and computer vision applications in design',
    images: ['/images/og-image.jpg']
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
            <p style={{ fontSize: '1rem', color: '#888', marginBottom: '0.5rem' }}>
              Architecture & Machine Learning
            </p>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '2rem' }}>
              Exploring AI applications in architectural design
            </p>
            <p style={{ fontSize: '0.75rem', color: '#555', maxWidth: '400px', lineHeight: 1.6 }}>
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
