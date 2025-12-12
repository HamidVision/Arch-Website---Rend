'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/context/LoadingContext';
import { usePathname } from 'next/navigation';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'Projects', 
    href: '', // Acts as a toggle
    children: [
      { label: 'Undergrad Projects', href: '/undergrad-projects' },
      { label: 'Graduate Projects', href: '/graduate-projects' },
      { label: 'Computer Science Project', href: '/computer-science' },
      { label: 'Research Papers and Publications', href: '/research-papers' }
    ]
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose }) => {
  const { triggerTransition } = useLoading();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, item: MenuItem) => {
    e.preventDefault();
    e.stopPropagation();

    // Handle Toggle for items with children
    if (item.children) {
      setExpandedItem(expandedItem === item.label ? null : item.label);
      return;
    }

    // Normal Navigation
    if (item.href) {
      onClose();
      // If we are already on `undergrad-projects` and clicking `undergrad-projects`, we might validly want to reset/reload or just do nothing.
      // But usually triggerTransition handles it.
      triggerTransition(item.href);
    }
  };

  const menuContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={menuContainerVariants}
        className="fixed inset-0 bg-black/95 backdrop-blur-md z-[200] flex items-center justify-center overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 p-2 text-white/50 hover:text-white transition-colors z-[210]"
          aria-label="Close menu"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <nav className="text-center w-full max-w-lg px-6 py-20">
          <motion.ul layout className="space-y-6 md:space-y-8 flex flex-col items-center">
            {MENU_ITEMS.map((item) => {
              const checkIsActive = (href: string) => pathname === href;
              const isExpanded = expandedItem === item.label;

              return (
                <motion.li 
                  layout 
                  key={item.label}
                  variants={itemVariants}
                  className="w-full"
                >
                  {/* Main Link / Toggle */}
                  <div 
                    onClick={(e) => handleNavigation(e, item)}
                    className={`
                      text-2xl md:text-3xl font-light tracking-widest uppercase cursor-pointer transition-colors duration-300
                      ${checkIsActive(item.href) ? 'text-white' : 'text-gray-400 hover:text-white'}
                      ${isExpanded ? 'text-white' : ''}
                    `}
                  >
                     {item.label}
                  </div>

                  {/* Sub-menu (Accordion) */}
                  <AnimatePresence>
                    {isExpanded && item.children && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <ul className="pt-6 pb-2 space-y-4 flex flex-col items-center">
                          {item.children.map((subItem, index) => (
                            <motion.li
                              key={subItem.label}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <a
                                href={subItem.href}
                                onClick={(e) => handleNavigation(e, subItem)}
                                className={`
                                  block text-lg font-light tracking-wider uppercase transition-colors
                                  ${checkIsActive(subItem.href) ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                                `}
                              >
                                {subItem.label}
                              </a>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default NavigationMenu;
