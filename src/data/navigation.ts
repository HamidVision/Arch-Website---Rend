// Navigation structure and routing configuration
// Centralized navigation for the architecture portfolio

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  submenu?: NavigationItem[];
}

export interface ProjectRoute {
  category: string;
  slug: string;
  title: string;
}

// Main navigation items (for header menu)
export const mainNavigation: NavigationItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Projects',
    href: '/projects',
    submenu: [
      {
        label: 'Design Philosophy',
        href: '/design-philosophy'
      },
      {
        label: 'Undergrad Projects', 
        href: '/undergrad-projects'
      },
      {
        label: 'All Projects',
        href: '/projects'
      }
    ]
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

// Project category routes (matching your current structure)
export const projectRoutes: ProjectRoute[] = [
  {
    category: 'design-philosophy',
    slug: 'design-philosophy',
    title: 'Design Philosophy'
  },
  {
    category: 'undergrad-projects',
    slug: 'undergrad-projects', 
    title: 'Undergrad Projects'
  }
];

// Utility functions for navigation
export const getRouteBySlug = (slug: string): ProjectRoute | undefined => {
  return projectRoutes.find(route => route.slug === slug);
};

export const isActiveRoute = (currentPath: string, targetPath: string): boolean => {
  if (targetPath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(targetPath);
};

// Breadcrumb generation
export const generateBreadcrumbs = (currentPath: string): NavigationItem[] => {
  const breadcrumbs: NavigationItem[] = [
    { label: 'Home', href: '/' }
  ];
  
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  pathSegments.forEach((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const route = getRouteBySlug(segment);
    
    breadcrumbs.push({
      label: route?.title || segment.charAt(0).toUpperCase() + segment.slice(1),
      href
    });
  });
  
  return breadcrumbs;
};