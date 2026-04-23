'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionLabels = [
    'Overview',
    'Retail',
    'Luxury',
    'Dining',
    'Attractions',
    'Events',
    'Contact',
  ];

  const handleNavClick = (index: number) => {
    window.dispatchEvent(new CustomEvent('goToSlide', { detail: index }));
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;
      
      setScrolled(scrollY > 100);
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? 'bg-primary/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/30">
        <motion.div 
          className="h-full bg-gradient-to-r from-accent to-accent-hover"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleNavClick(0)}
            className="relative w-12 h-12 cursor-pointer hover:scale-105 transition-transform"
          >
            <Image
              src="/images/logo.png"
              alt="WEM Logo"
              fill
              className="object-contain"
            />
          </button>
          <div className="hidden sm:block h-6 w-px bg-border" />
          <div className="hidden sm:block text-xs text-text-muted uppercase tracking-widest">
            West Edmonton Mall
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Desktop CTA Button */}
          <motion.button
            onClick={() => handleNavClick(6)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-block px-6 py-2 bg-accent text-primary font-semibold text-sm uppercase tracking-wider hover:bg-accent-hover transition-colors duration-300"
          >
            Schedule a Tour
          </motion.button>

          {/* Mobile Hamburger Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-xl border-b border-white/10 overflow-hidden md:hidden shadow-2xl"
          >
            <nav className="flex flex-col py-2">
              {sectionLabels.map((label, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(index)}
                  className="px-6 py-4 text-left text-white border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors flex items-center"
                >
                  <span className="text-accent font-mono text-sm mr-4">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-lg tracking-wide">{label}</span>
                </button>
              ))}
              
              {/* Mobile CTA inside menu */}
              <button
                onClick={() => handleNavClick(6)}
                className="mx-6 my-6 py-4 bg-accent text-primary font-bold tracking-widest uppercase text-sm rounded-none hover:bg-accent-hover transition-colors"
              >
                Schedule a Tour
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
