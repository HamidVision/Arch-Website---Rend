# Architecture Portfolio Website v1.0.0

A sophisticated Next.js application showcasing architectural projects with interactive features, smooth animations, and professional design consistency.

> ⚠️ **Important Note on Asset Usage**:  
> While the code for this project is open source, all **images, videos, and branding materials** are proprietary and strictly copyrighted. You may use the code for educational purposes or as a reference, but you **MUST replace all assets** with your own content.

## 🚀 **Latest Release - v1.0.0**

### **Border Crossing Project Page**

- **🎯 Horizontal Navigation** - Mouse wheel converts to horizontal scroll for architectural drawings
- **✨ Text Overlay System** - Dual transparent text boxes for project information
- **🏗️ Header Consistency** - Unified navigation across all project pages
- **🎨 Professional Design** - Black theme with clean typography and spacing
- **📱 Responsive Framework** - Adaptable layout for all screen sizes

### **Enhanced Project Architecture**

- **🔗 Unified Navigation** - Same header system (HE, portfolio grid, menu) across all projects
- **📐 Consistent Layouts** - Standardized design patterns for professional presentation
- **🎪 Clean Interactions** - Transparent overlays that complement architectural content
- **⚡ Performance Optimized** - Smooth scrolling and efficient image handling

---

## 📋 **Features**

### **🏗️ Project Showcase System**

- **Site Analysis** - Interactive toggle system for layered analysis
- **Border Crossing** - Horizontal scroll navigation with text overlay system
- **Congregation Center** - Interactive button system with UX enhancement features

### **🎨 Design Excellence**

- **Glass Morphism UI** - Modern semi-transparent interfaces
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Layout** - Optimized for all screen sizes
- **Professional Typography** - Helvetica Neue font hierarchy

### **⚡ Performance Features**

- **Next.js 14** - Latest App Router architecture
- **Optimized Images** - Automatic WebP conversion and lazy loading
- **Conditional Rendering** - Efficient DOM management
- **Hardware Acceleration** - CSS transform optimizations

---

## 🛠️ **Technology Stack**

### **Frontend Framework**

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling

### **Animation & Interaction**

- **[Framer Motion](https://www.framer.com/motion/)** - Component animations
- **[GSAP](https://gsap.com/)** - Complex timeline animations
- **CSS Transitions** - Hardware-accelerated interactions

### **Development Tools**

- **[ESLint](https://eslint.org/)** - Code quality and consistency
- **[TypeScript Compiler](https://www.typescriptlang.org/)** - Type checking
- **[Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)** - Optimized image delivery

---

## 🚀 **Getting Started**

### **Prerequisites**

- Node.js 18.0.0 or higher
- npm or yarn package manager

### **Installation**

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd arch-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Build for Production**

```bash
npm run build
npm start
```

---

## 📁 **Project Structure**

```
src/
├── app/                          # Next.js App Router pages
│   ├── design-philosophy/        # Design philosophy page
│   ├── undergrad-projects/       # Project showcase pages
│   │   ├── site-analysis/        # Interactive analysis system
│   │   ├── border-crossing/      # Horizontal scroll presentation
│   │   └── congregation-center/  # Interactive button system
│   ├── globals.css              # Global styles and utilities
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Homepage
├── components/                   # Reusable React components
│   ├── animations/              # Animation components
│   ├── projects/                # Project-specific components
│   ├── AspectRatioHeroSplit.tsx # Toggle overlay system
│   ├── Header.tsx               # Navigation header
│   └── RouteTransitionWrapper.tsx # Page transitions
├── lib/                         # Utility functions and configs
├── types/                       # TypeScript type definitions
└── hooks/                       # Custom React hooks

public/                          # Static assets
├── images/                      # Optimized images
├── icons/                       # UI icons and graphics
├── undergrad-projects/          # Project-specific assets
└── videos/                      # Video content

docs/                           # Comprehensive documentation
├── CHANGELOG_v0.4.0.md         # Latest release notes
├── DECISIONS.md                # Architecture decisions
├── Road Map.md                 # Development roadmap
└── *.md                        # Technical documentation
```

---

## ⚙️ **Configuration**

### **Environment Setup**

- **Node.js**: Version 18.0.0 or higher required
- **Browser Support**: Modern browsers with ES2020 support
- **Image Formats**: WebP, JPEG, PNG optimized automatically

### **Performance Optimizations**

- **Image Optimization**: Automatic next/image WebP conversion
- **Code Splitting**: Automatic route-based splitting
- **Font Loading**: Optimized Google Fonts integration
- **Bundle Analysis**: Built-in bundle analyzer

---

## 🎯 **Interactive Features**

### **Congregation Center Interactive System**

```typescript
// Button click handler with toggle functionality
const handleButtonClick = (buttonNumber: number) => {
  setActiveButton(activeButton === buttonNumber ? null : buttonNumber);
};

// Content data structure
const contentData = {
  1: { title: "Ground Floor", description: "..." },
  2: { title: "Residential Levels", description: "..." },
  // ... additional levels
};
```

### **Site Analysis Toggle System**

- **Three-state cycling**: Hero → Analysis Layer 1 → Analysis Layer 2
- **Aspect ratio preservation**: Dynamic height calculations
- **Smooth transitions**: Framer Motion powered animations

### **Horizontal Scroll Navigation**

- **Mouse wheel support**: Vertical scroll converts to horizontal
- **Touch-friendly**: Optimized for mobile gestures
- **Progress indicators**: Visual feedback for current position

---

## 📱 **Responsive Design**

### **Breakpoint Strategy**

- **Mobile**: 375px - 768px (Portrait optimization)
- **Tablet**: 768px - 1024px (Landscape adaptation)
- **Desktop**: 1024px+ (Full feature set)
- **Ultra-wide**: 21:9+ aspect ratios (Enhanced layouts)

### **Viewport Considerations**

- **Dynamic Heights**: 100dvh for mobile-safe viewports
- **Aspect Ratio Responsive**: Automatic layout adaptation
- **Touch Optimization**: Larger touch targets on mobile

---

## 🔍 **Development Scripts**

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Quality Assurance
npm run lint            # Run ESLint
npm run type-check      # TypeScript validation
npm run check           # Combined linting and type checking

# Documentation
npm run docs:check      # Validate documentation
npm run docs:validate   # Full documentation validation

# Testing
npm run test:e2e        # End-to-end testing
npm run preflight       # Pre-deployment checks
```

---

## 📊 **Performance Metrics**

### **Core Web Vitals**

- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### **Optimization Features**

- **Image Optimization**: Automatic WebP conversion
- **Code Splitting**: Route-based lazy loading
- **Font Optimization**: Preloaded critical fonts
- **Bundle Size**: Minimized JavaScript delivery

---

## 🛡️ **Browser Support**

### **Supported Browsers**

- **Chrome**: 88+ (Latest 2 versions)
- **Firefox**: 85+ (Latest 2 versions)
- **Safari**: 14+ (Latest 2 versions)
- **Edge**: 88+ (Latest 2 versions)

### **Progressive Enhancement**

- **Core Functionality**: Works in all modern browsers
- **Enhanced Features**: Advanced animations on supported browsers
- **Fallbacks**: Graceful degradation for older browsers

---

## 📚 **Documentation**

### **Technical Documentation**

- **[Architecture Decisions](docs/DECISIONS.md)** - Design and technical choices
- **[Development Roadmap](docs/Road%20Map.md)** - Future planning and milestones
- **[Changelog](docs/CHANGELOG_v0.4.0.md)** - Release notes and updates

### **Component Documentation**

- **[Interactive Systems](docs/CONGREGATION_CENTER_INTERACTIVE_SYSTEM.md)** - Button system implementation
- **[Fixed Positioning](docs/FIXED_TEXT_BOX_SOLUTION.md)** - Advanced CSS solutions

---

## 🤝 **Contributing**

### **Development Workflow**

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Code Standards**

- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow established coding standards
- **Documentation**: Update docs for significant changes
- **Testing**: Include tests for new functionality

---

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

> **Note**: The MIT License applies to the code only. All visual assets (images, videos, logos) are **Copyright © Hamid Esmaeillou** and exclude from the open source license.

---

## 📞 **Contact**

- **Project Repository**: [GitHub](repository-url)
- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](repository-url/issues)

---

## 🎉 **Acknowledgments**

- **Next.js Team** - For the excellent React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animation capabilities
- **TypeScript** - For type-safe development experience

---

**Built with ❤️ using modern web technologies**

**Version**: 1.0.0 | **Status**: Production Ready | **Next Release**: v1.1.0
