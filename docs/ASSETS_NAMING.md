# Assets Naming Convention

## Version v0.1.2 (Current)
**Date**: December 2024
**Status**: Active

### Current Assets Structure
```
public/
├── brand/
│   ├── logo-loading.svg          # Loading screen logo
│   └── logo.svg                  # Main brand logo (if needed)
├── images/
│   ├── hero.jpg                  # Home page hero background
│   └── [project-specific]/       # Future project images
├── design-philosophy/
│   ├── design-philosophy-tile.jpg        # Portfolio tile image
│   ├── design-philosophy-21.9.jpg        # Main page background
│   ├── design-philosophy-21.9-bg.jpg     # Text animation background
│   └── design-philosophy-phone.jpg       # Mobile version
├── undergrad-projects/
│   ├── site-analysis/            # Site Analysis project assets
│   ├── border-crossing/          # Border Crossing project assets
│   └── congregation-center/       # Congregation Center project assets
├── graduate-projects/
│   ├── the-nook/                 # The Nook project assets
│   ├── momentum-hub/             # Momentum Hub project assets
│   └── wellness-bazaar/          # Wellness Bazaar project assets
├── computer-science/             # Computer Science projects
├── research-papers/              # Research papers and publications
├── about/                        # About page assets
├── contact/                      # Contact page assets
└── logo.png                      # Header logo
```

### Naming Rules
1. **Lowercase with hyphens** for multi-word files
2. **Descriptive names** that indicate purpose
3. **Consistent extensions** (.jpg, .png, .svg)
4. **Organized folders** by project category
5. **Aspect ratio indicators** in filenames (21.9, 16.9, 4.3)
6. **Device-specific versions** (phone, tablet, desktop)

### Asset Usage
- `logo-loading.svg`: Loading screen (HE_Loading_Component)
- `hero.jpg`: Home page background (page.tsx)
- `logo.png`: Header navigation (Header.tsx)
- `design-philosophy-*.jpg`: Design Philosophy page backgrounds
- Project folders: Organized by portfolio tile categories

---

## Version v0.1.1 (Completed)
**Date**: December 2024
**Status**: ✅ Structure established

### Assets Structure Added
- ✅ `public/undergrad-projects/` - Main folder for undergraduate projects
- ✅ `public/undergrad-projects/site-analysis/` - Site Analysis project assets
- ✅ `public/undergrad-projects/border-crossing/` - Border Crossing project assets
- ✅ `public/undergrad-projects/congregation-center/` - Congregation Center project assets
- ✅ `public/graduate-projects/` - Main folder for graduate projects
- ✅ `public/graduate-projects/the-nook/` - The Nook project assets
- ✅ `public/graduate-projects/momentum-hub/` - Momentum Hub project assets
- ✅ `public/graduate-projects/wellness-bazaar/` - Wellness Bazaar project assets
- ✅ `public/computer-science/` - Computer Science projects folder
- ✅ `public/research-papers/` - Research papers folder
- ✅ `public/about/` - About page assets folder
- ✅ `public/contact/` - Contact page assets folder

### Asset Organization
- ✅ **Project-Based Structure**: Each portfolio tile has its own folder
- ✅ **Consistent Naming**: Lowercase with hyphens for folder names
- ✅ **Scalable Architecture**: Easy to add new projects and assets
- ✅ **Clear Hierarchy**: Main categories with sub-project organization

---

## Version v0.1 (Completed)
**Date**: December 2024
**Status**: ✅ All assets implemented

### Assets Added
- ✅ `public/brand/logo-loading.svg` - Loading screen logo
- ✅ `public/images/hero.jpg` - Home page hero background
- ✅ `public/logo.png` - Header navigation logo

### Asset Integration
- ✅ **Loading Component**: Uses `logo-loading.svg` with proper sizing
- ✅ **Home Page**: Uses `hero.jpg` as full-screen background
- ✅ **Header**: Uses `logo.png` for navigation branding
- ✅ **Preflight Script**: Validates required assets exist

---

## Version v0.0.1 (Initial Setup)
**Date**: December 2024
**Status**: ✅ Foundation established

### Initial Structure
- **Brand Assets**: `/public/brand/` for logos and brand elements
- **Images**: `/public/images/` for photos and graphics
- **Videos**: `/public/videos/` for video content (future)
- **Documents**: `/public/documents/` for PDFs and files (future)
