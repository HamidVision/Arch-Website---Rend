'use client';

import AspectRatioHeroSplit from '@/components/AspectRatioHeroSplit';

export default function SiteAnalysisEnhanced() {
  return (
    <AspectRatioHeroSplit
      triggerText="Show Analysis"
      heroContent={
        <img
          src="/undergrad-projects/site-analysis/site-analysis.jpg"
          alt="SOS Children's Village — Site Context Board"
          draggable={false}
        />
      }
      secondContent={
        <img
          src="/undergrad-projects/site-analysis/site-analysis-l1.jpg"
          alt="SOS Children's Village — Analysis Board"
          draggable={false}
        />
      }
    />
  );
}
