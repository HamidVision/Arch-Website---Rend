# Assets Naming Convention

## Version v0.1.1 (Current)
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
└── logo.png                      # Header logo
```

### Naming Rules
1. **Lowercase with hyphens** for multi-word files
2. **Descriptive names** that indicate purpose
3. **Consistent extensions** (.jpg, .png, .svg)
4. **Organized folders** by asset type

### Asset Usage
- `logo-loading.svg`: Loading screen (HE_Loading_Component)
- `hero.jpg`: Home page background (page.tsx)
- `logo.png`: Header navigation (Header.tsx)

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
