// Project data structure for the architecture portfolio
// Based on the visual examples shown in the portfolio

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: 'design-philosophy' | 'undergrad-projects' | 'professional-work' | 'research';
  year?: string;
  location?: string;
  client?: string;
  status: 'completed' | 'in-progress' | 'concept';
  featured: boolean;
  
  // Images and media
  heroImage: string;
  thumbnailImage: string;
  gallery?: string[];
  video?: string;
  
  // Content
  description: string;
  overview?: string;
  challenges?: string;
  solution?: string;
  
  // Technical details
  area?: string;
  program?: string;
  team?: string[];
  awards?: string[];
  
  // SEO and routing
  slug: string;
  metaDescription?: string;
  tags?: string[];
}

export interface ProjectCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  projects: Project[];
}

// Sample project data based on your current pages
export const projects: Project[] = [
  {
    id: 'design-philosophy-01',
    title: 'Core Principles and Approach',
    subtitle: 'Foundational design thinking',
    category: 'design-philosophy',
    year: '2024',
    status: 'completed',
    featured: true,
    heroImage: '/design-philosophy/design-philosophy-21.9.jpg',
    thumbnailImage: '/design-philosophy/design-philosophy-21.9-bg.jpg',
    description: 'An exploration of the fundamental principles that guide our architectural practice, emphasizing context, innovation, and sustainability.',
    overview: 'At the intersection of creativity and functionality, our design philosophy embraces the fundamental principles that shape exceptional architectural experiences.',
    slug: 'core-principles-approach',
    metaDescription: 'Exploring the foundational design principles of contemporary architectural practice.',
    tags: ['philosophy', 'principles', 'methodology']
  },
  {
    id: 'undergrad-01',
    title: 'Early Architectural Explorations',
    subtitle: 'Academic foundation',
    category: 'undergrad-projects',
    year: '2022-2023',
    status: 'completed',
    featured: true,
    heroImage: '/undergrad-projects/undergrad-hero.jpg',
    thumbnailImage: '/undergrad-projects/undergrad-thumb.jpg',
    description: 'Early architectural explorations and foundational design projects from undergraduate studies.',
    overview: 'A collection of academic projects that established the foundation for design thinking and architectural exploration.',
    slug: 'early-explorations',
    metaDescription: 'Academic architectural projects showcasing foundational design skills and creative exploration.',
    tags: ['academic', 'foundation', 'exploration', 'student-work']
  },
  {
    id: 'site-analysis-01',
    title: 'Understanding Context & Place',
    subtitle: 'Site analysis methodology',
    category: 'undergrad-projects',
    year: '2023',
    status: 'completed',
    featured: false,
    heroImage: '/undergrad-projects/site-analysis-hero.jpg',
    thumbnailImage: '/undergrad-projects/site-analysis-thumb.jpg',
    description: 'Comprehensive analysis of site conditions, environmental factors, and contextual relationships that inform architectural decisions.',
    overview: 'Understanding the complex relationships between built environment, natural systems, and human activity through rigorous site analysis.',
    slug: 'site-analysis-methodology',
    metaDescription: 'Comprehensive site analysis methodology for informed architectural design decisions.',
    tags: ['site-analysis', 'context', 'methodology', 'research']
  }
];

// Group projects by category
export const projectCategories: ProjectCategory[] = [
  {
    id: 'design-philosophy',
    title: 'Design Philosophy',
    subtitle: 'Core principles and approach',
    description: 'Fundamental design thinking and methodological approaches that guide our architectural practice.',
    heroImage: '/design-philosophy/design-philosophy-21.9.jpg',
    projects: projects.filter(p => p.category === 'design-philosophy')
  },
  {
    id: 'undergrad-projects',
    title: 'Undergrad Projects',
    subtitle: 'Academic foundation',
    description: 'Early architectural explorations and foundational design projects from undergraduate studies.',
    heroImage: '/undergrad-projects/undergrad-hero.jpg',
    projects: projects.filter(p => p.category === 'undergrad-projects')
  }
];

// Featured projects for homepage
export const featuredProjects = projects.filter(p => p.featured);

// Utility functions
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(p => p.category === category);
};

export const getCategoryBySlug = (slug: string): ProjectCategory | undefined => {
  return projectCategories.find(c => c.id === slug);
};