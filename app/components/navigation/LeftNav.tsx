'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LeftNavProps {
  activeSlide: number;
}

export default function LeftNav({ activeSlide }: LeftNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const handlePrev = () => {
    if (activeSlide > 0) {
      handleNavClick(activeSlide - 1);
    }
  };

  const handleNext = () => {
    if (activeSlide < sectionLabels.length - 1) {
      handleNavClick(activeSlide + 1);
    }
  };

  return (
    <>
      {/* ── DESKTOP SIDE NAVIGATION (lg+) ── */}
      <div className="hidden lg:block h-full flex items-center">
        <nav className="flex flex-col items-center gap-6 py-8 px-4 bg-black/90 backdrop-blur-md border-r border-white/10">
          {/* Logo */}
          <div className="mb-8">
            <button 
              onClick={() => handleNavClick(0)} 
              className="block relative w-12 h-12 hover:scale-105 transition-transform duration-300 cursor-pointer border-none bg-transparent p-0"
            >
              <Image
                src="/images/logo.png"
                alt="WEM Logo"
                fill
                className="object-contain"
              />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex flex-col gap-4">
            {sectionLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group"
              >
                {/* Dot */}
                <motion.div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? 'bg-accent scale-125'
                      : index < activeSlide
                      ? 'bg-accent/60'
                      : 'bg-white/30 hover:bg-white/60'
                  }`}
                />

                {/* Tooltip */}
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 bg-black/90 backdrop-blur-sm border border-white/20 text-white text-sm z-50"
                  >
                    {label}
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* ── MOBILE TOP BAR (md and below) ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick(0)} 
            className="relative w-10 h-10 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <Image
              src="/images/logo.png"
              alt="WEM Logo"
              fill
              className="object-contain"
            />
          </button>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={activeSlide === 0}
              className={`p-2 rounded-full transition-all duration-300 ${
                activeSlide === 0
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-white hover:bg-white/10 active:scale-90'
              }`}
              aria-label="Previous section"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Section Indicator */}
            <span className="text-white/60 text-sm font-medium min-w-[60px] text-center">
              {activeSlide + 1} / {sectionLabels.length}
            </span>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={activeSlide === sectionLabels.length - 1}
              className={`p-2 rounded-full transition-all duration-300 ${
                activeSlide === sectionLabels.length - 1
                  ? 'text-white/20 cursor-not-allowed'
                  : 'text-white hover:bg-white/10 active:scale-90'
              }`}
              aria-label="Next section"
            >
              <ChevronRight size={24} />
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 ml-2 rounded-full text-white hover:bg-white/10 active:scale-90 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE SLIDE-OUT MENU ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 bg-black/95 backdrop-blur-md border-l border-white/10"
            >
              <div className="flex flex-col h-full py-20 px-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-white/40 text-sm uppercase tracking-widest">Sections</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Section List */}
                <div className="flex flex-col gap-2">
                  {sectionLabels.map((label, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavClick(index)}
                      className={`flex items-center justify-between px-4 py-4 rounded-lg transition-all duration-300 text-left ${
                        index === activeSlide
                          ? 'bg-accent/20 text-accent border border-accent/50'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span className="text-lg font-medium">{label}</span>
                      <span className="text-sm opacity-50">{index + 1}</span>
                    </button>
                  ))}
                </div>

                {/* Quick Navigation */}
                <div className="mt-auto pt-8 border-t border-white/10">
                  <div className="flex gap-4">
                    <button
                      onClick={handlePrev}
                      disabled={activeSlide === 0}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-lg transition-all duration-300 ${
                        activeSlide === 0
                          ? 'bg-white/5 text-white/30 cursor-not-allowed'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <ChevronLeft size={20} />
                      <span>Prev</span>
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={activeSlide === sectionLabels.length - 1}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 rounded-lg transition-all duration-300 ${
                        activeSlide === sectionLabels.length - 1
                          ? 'bg-white/5 text-white/30 cursor-not-allowed'
                          : 'bg-accent text-primary font-bold hover:bg-accent-hover'
                      }`}
                    >
                      <span>Next</span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* ── MOBILE BOTTOM NAVIGATION ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/10 mobile-nav">
        <div className="flex items-center justify-around py-3 px-4">
          {sectionLabels.map((label, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(index)}
              className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${
                index === activeSlide ? 'text-accent' : 'text-white/50 hover:text-white'
              }`}
            >
              {/* Mobile Dot Indicator */}
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'bg-accent scale-150'
                    : index < activeSlide
                    ? 'bg-accent/60'
                    : 'bg-white/30'
                }`}
              />
              {/* Label */}
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
