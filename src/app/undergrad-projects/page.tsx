'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const UndergradProjectsPage: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      id: 'site-analysis',
      title: 'Site Analysis',
      subtitle: 'Understanding Context & Place',
      description: 'Comprehensive analysis of site conditions, environmental factors, and contextual relationships that inform architectural decisions.',
      color: 'from-emerald-600 to-teal-600',
      image: null // Will be provided later
    },
    {
      id: 'border-crossing',
      title: 'Border Crossing',
      subtitle: 'Thresholds & Transitions',
      description: 'Exploration of architectural thresholds, spatial transitions, and the design of boundary conditions that define and connect spaces.',
      color: 'from-blue-600 to-indigo-600',
      image: null // Will be provided later
    },
    {
      id: 'congregation-center',
      title: 'Congregation Center',
      subtitle: 'Community & Gathering',
      description: 'Design for communal spaces that foster connection, facilitate gatherings, and create meaningful social interactions.',
      color: 'from-purple-600 to-pink-600',
      image: null // Will be provided later
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Track scroll position to update current project
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const projectIndex = Math.floor(scrollPosition / windowHeight);
      setCurrentProject(Math.max(0, Math.min(projectIndex, projects.length - 1)));
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [projects.length]);

  const handleBackClick = () => {
    router.push('/');
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/undergrad-projects/${projectId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Navigation - Always visible */}
      <motion.button
        onClick={handleBackClick}
        className="fixed top-8 left-8 text-white text-2xl font-semibold tracking-wide hover:text-gray-300 transition-colors z-[70] bg-transparent border-none outline-none cursor-pointer"
        aria-label="Go to homepage"
        style={{ fontFamily: 'inherit', textRendering: 'optimizeLegibility' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        HE
      </motion.button>

      {/* Portfolio and Menu Buttons - Always visible */}
      <div className="fixed top-0 right-0 z-[70] p-6">
        <div className="flex items-center space-x-6">
          {/* Portfolio Button */}
          <motion.button
            onClick={() => router.push('/')}
            className="focus:outline-none"
            aria-label="Go to portfolio"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              <rect x="14" y="4" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              <rect x="4" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
              <rect x="14" y="14" width="6" height="6" rx="1" stroke="white" strokeWidth="1.5"/>
            </svg>
          </motion.button>

          {/* Menu Button */}
          <motion.button
            className="relative z-[70] h-6 w-8 focus:outline-none"
            aria-label="Toggle menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
              <span aria-hidden="true" className="absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out -translate-y-1"></span>
              <span aria-hidden="true" className="absolute block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out translate-y-1"></span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Page Title */}
      <motion.div
        className="fixed top-24 left-8 z-[60] text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-6xl font-title mb-4 tracking-wider uppercase">
          Undergrad Projects
        </h1>
        <p className="text-lg md:text-xl font-body text-white/70 max-w-md">
          Early architectural explorations and foundational design projects from undergraduate studies.
        </p>
      </motion.div>

      {/* Projects Container */}
      <div className="pt-48 pb-24 projects-container">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="min-h-screen flex items-center justify-center px-8 relative project-card"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + (index * 0.2) }}
          >
            {/* Project Card */}
            <div className="w-full max-w-6xl mx-auto">
              <motion.div
                className="relative w-full aspect-[4/3] cursor-pointer group overflow-hidden rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleProjectClick(project.id)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} group-hover:scale-105 transition-transform duration-500`}>
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Project Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
                  >
                    <h2 className="text-4xl md:text-6xl font-title text-white mb-4 tracking-wider uppercase">
                      {project.title}
                    </h2>
                    <h3 className="text-xl md:text-2xl font-subtitle text-white/90 mb-6 tracking-wide">
                      {project.subtitle}
                    </h3>
                    <p className="text-lg md:text-xl font-body text-white/80 max-w-2xl leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0, x: 20 }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress Indicator */}
      <motion.div
        className="fixed bottom-8 left-8 z-[60] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="flex items-center space-x-4">
          <span className="text-sm font-subtitle tracking-wider uppercase">
            {projects[currentProject].title}
          </span>
          <div className="flex space-x-2">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentProject ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UndergradProjectsPage;
