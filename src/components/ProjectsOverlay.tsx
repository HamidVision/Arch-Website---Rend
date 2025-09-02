'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ProjectsOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const projects = [
    {
      id: 'momentum-hub',
      title: 'Momentum Hub',
      category: 'Commercial',
      description: 'Innovative workspace design',
      image: '/images/projects/momentum-hub.jpg'
    },
    {
      id: 'wellness-center',
      title: 'Wellness Center',
      category: 'Healthcare',
      description: 'Holistic healing environment',
      image: '/images/projects/wellness/site-plan.svg'
    },
    {
      id: 'residential-complex',
      title: 'Residential Complex',
      category: 'Residential',
      description: 'Modern living spaces',
      image: '/images/projects/residential.jpg'
    }
  ];

  const handleProjectClick = (projectId: string) => {
    setIsVisible(false);
    setTimeout(() => {
      router.push(`/projects/${projectId}`);
    }, 300);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-6 py-12">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-8 right-8 text-white text-2xl hover:text-gray-300 transition-colors"
              aria-label="Close projects overlay"
            >
              ×
            </button>

            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-light text-white mb-4 tracking-wider uppercase">
                Our Projects
              </h2>
              <p className="text-gray-400 text-lg">
                Exploring innovative architectural solutions
              </p>
            </motion.div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-[4/3] mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:from-gray-600 group-hover:to-gray-800 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        </div>
                        <p className="text-sm text-gray-300">{project.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-medium mb-2 group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Projects Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={() => router.push('/projects')}
                className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 tracking-wider uppercase text-sm"
              >
                View All Projects
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectsOverlay;
