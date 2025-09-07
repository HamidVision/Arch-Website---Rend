'use client';

import HorizontalProjectLayout from '@/components/projects/HorizontalProjectLayout';

export default function SiteAnalysisPage() {
  const panels = [
    {
      id: 'hero',
      type: 'hero' as const,
      image: '/undergrad-projects/site-analysis/site-tile.jpg',
      title: 'SITE ANALYSIS',
      subtitle: 'Understanding Context & Place',
      description: 'Comprehensive analysis of site conditions, environmental factors, and contextual relationships that inform architectural decisions.',
      alt: 'Site Analysis Project Hero Image'
    },
    {
      id: 'analysis',
      type: 'content' as const,
      image: '/undergrad-projects/site-analysis/site-analysis.jpg',
      title: 'Comprehensive Site Analysis',
      description: 'Detailed analysis board showing site conditions, environmental factors, and design considerations.',
      alt: 'Site Analysis Detailed Board'
    }
  ];

  return (
    <HorizontalProjectLayout 
      panels={panels}
      backLink="/undergrad-projects"
      backLinkText="Back to Projects"
    />
  );
}