'use client';

import Header from '@/components/Header';
import AspectRatioHeroSplit from '@/components/AspectRatioHeroSplit';

export default function SiteAnalysisPage() {
  return (
    <main className="relative h-screen bg-white">
      <Header forceSolid backgroundClass="bg-[#f5f5f5] backdrop-blur-sm" textColorClass="text-black" logoVariant="dark" />
      <AspectRatioHeroSplit
        heroSrc="/undergrad-projects/site-analysis/site-analysis.jpg"
        heroAlt="SOS Children's Village — Site Context Board"
        secondSrc="/undergrad-projects/site-analysis/site-analysis-l1.jpg"
        secondAlt="SOS Children's Village — Detailed Site Analysis"
        thirdSrc="/undergrad-projects/site-analysis/site-analysis-l2.jpg"
        thirdAlt="SOS Children's Village — Additional Analysis Layer"
        overlaySrc="/icons/ui/siteplan-toggle.png"
        overlayPositionInitial={{
          top: '69%',   // adjust after hero is correct
          left: '0.5%',
          width: '11.4%'
        }}
        overlayPositionActivated={{
          top: '69%',
          left: '0.5%',
          width: '11.4%'
        }}
      />
    </main>
  );
}