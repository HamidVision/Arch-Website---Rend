# Asset Naming Conventions

## File Naming Standards

### Images
- **Format:** `kebab-case` (lowercase with hyphens)
- **Examples:** 
  - `hero-landing.webp`
  - `site-plan.svg`
  - `logo-header.svg`
  - `logo-loading.svg`

### Videos
- **Format:** `kebab-case` with descriptive names
- **Examples:**
  - `landing-hero.mp4`
  - `landing-hero-secondary.mp4`

### Components
- **Format:** `PascalCase` for React components
- **Examples:**
  - `HE_Loading_Component.tsx`
  - `ProjectsOverlay.tsx`
  - `MatrixOverlay.tsx`

### Files and Directories
- **Format:** `kebab-case` for files, `PascalCase` for components
- **Examples:**
  - `timeline-coordinator.ts`
  - `TimelineCoordinator.ts`

---

## Directory Structure

```
public/
├── brand/                    # Brand assets
│   ├── logo-loading.svg     # Loading screen logo
│   └── logo.svg             # Main brand logo
├── icons/                   # Icon assets
│   ├── navigation/          # Navigation icons
│   ├── social/             # Social media icons
│   └── ui/                 # UI icons
│       └── logo-header.svg # Header logo
├── images/                  # Image assets
│   ├── about/              # About page images
│   ├── common/             # Common/shared images
│   ├── diagrams/           # Diagram images
│   ├── projects/           # Project images
│   │   └── wellness/       # Specific project images
│   ├── renders/            # Architectural renders
│   ├── hero.jpg            # Hero background image
│   └── hero-landing.webp   # Alternative hero image
├── videos/                  # Video assets
│   └── landing-hero.mp4    # Hero video
├── incoming/               # Raw/unprocessed assets
│   ├── animations/         # Animation files
│   ├── diagrams/           # Raw diagrams
│   ├── logos/              # Raw logo files
│   ├── projects/           # Raw project assets
│   ├── renders/            # Raw renders
│   └── videos/             # Raw video files
└── processed/              # Processed assets
    ├── ffmpeg/             # Video processing output
    └── sharp/              # Image processing output
```

---

## Naming Rules

### 1. Descriptive Names
- Use clear, descriptive names that indicate content
- Avoid generic names like `image1.jpg` or `file2.mp4`

### 2. Consistent Formatting
- Use lowercase for all file names
- Separate words with hyphens (kebab-case)
- Include file extensions

### 3. Version Control
- For multiple versions, use descriptive suffixes
- Examples: `hero-primary.jpg`, `hero-secondary.jpg`

### 4. Special Characters
- Avoid spaces, special characters, and accented letters
- Use only letters, numbers, hyphens, and underscores

### 5. File Extensions
- Use appropriate file extensions
- Prefer modern formats (WebP for images, MP4 for videos)

---

## Asset Optimization Guidelines

### Images
- **Hero Images:** High quality, optimized for web (max 2MB)
- **Icons:** SVG format for scalability
- **Logos:** SVG format when possible
- **Thumbnails:** WebP format for better compression

### Videos
- **Hero Videos:** MP4 format, optimized for web streaming
- **Background Videos:** Compressed for performance
- **Maximum Duration:** 30 seconds for hero videos

### Performance Considerations
- Use appropriate image sizes for different screen sizes
- Implement lazy loading for images below the fold
- Optimize video compression for web delivery
- Consider using next/image for automatic optimization

---

## Maintenance

### Regular Tasks
- [ ] Review and optimize image sizes monthly
- [ ] Update outdated assets
- [ ] Remove unused assets
- [ ] Verify all assets are properly referenced

### Quality Control
- [ ] Ensure all images meet quality standards
- [ ] Verify video compression is optimal
- [ ] Check that all assets load correctly
- [ ] Validate accessibility requirements
