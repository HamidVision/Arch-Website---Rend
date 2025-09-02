import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HELoadingComponent from '@/components/HE_Loading_Component';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Architecture Portfolio',
  description: 'Professional architecture and design portfolio showcasing sustainable projects and research-driven design.',
  keywords: 'architecture, design, sustainability, portfolio, research',
  authors: [{ name: 'Architect' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {/* HE Splash Screen */}
        <HELoadingComponent
          variant="splash"
          timeoutMs={2000}
          logoUrl="/brand/logo-loading.svg"
          subtitle="Architecture & Design Studio"
          tagline="Creating spaces that inspire"
        />

        {children}
      </body>
    </html>
  );
}
