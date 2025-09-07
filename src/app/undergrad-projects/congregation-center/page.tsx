'use client';

import HorizontalProjectLayout from '@/components/projects/HorizontalProjectLayout';

export default function CongregationCenterPage() {
  const panels = [
    {
      id: 'hero',
      type: 'hero' as const,
      image: '/undergrad-projects/congregation-center/congregation-tile.jpg',
      title: 'CONGREGATION CENTER',
      subtitle: 'Community & Worship',
      description: 'Designing sacred spaces that foster community connection and spiritual contemplation through thoughtful architectural intervention.',
      alt: 'Congregation Center Project Hero Image'
    }
    // Additional panels will be added as more content becomes available
  ];

  return (
    <HorizontalProjectLayout 
      panels={panels}
      backLink="/undergrad-projects"
      backLinkText="Back to Projects"
    />
  );
}