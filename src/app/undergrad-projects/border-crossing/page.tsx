'use client';

import HorizontalProjectLayout from '@/components/projects/HorizontalProjectLayout';

export default function BorderCrossingPage() {
  const panels = [
    {
      id: 'hero',
      type: 'hero' as const,
      image: '/undergrad-projects/border-crossing/border-tile.jpg',
      title: 'BORDER CROSSING',
      subtitle: 'Transitional Spaces',
      description: 'Exploring the architectural significance of border spaces and their role in creating meaningful transitions between territories.',
      alt: 'Border Crossing Project Hero Image'
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