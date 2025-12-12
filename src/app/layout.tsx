import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HELoadingComponent from '@/components/HE_Loading_Component';
import RouteTransitionWrapper from '@/components/RouteTransitionWrapper';
import DisableRightClick from '@/components/DisableRightClick';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Architecture Portfolio',
  description: 'Professional architecture and design portfolio showcasing sustainable projects and research-driven design.',
  keywords: 'architecture, design, sustainability, portfolio, research',
  authors: [{ name: 'Architect' }],
  robots: 'index, follow',
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
