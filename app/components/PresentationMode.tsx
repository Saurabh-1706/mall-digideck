'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PresentationModeProps {
  children: React.ReactNode[];
  leftNav: React.ReactNode;
}

export default function PresentationMode({ children, leftNav }: PresentationModeProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = children.length;

  const navigate = useCallback((newDirection: number) => {
    const newIndex = currentSlide + newDirection;
    if (newIndex >= 0 && newIndex < totalSlides) {
      setDirection(newDirection);
      setCurrentSlide(newIndex);
    }
  }, [currentSlide, totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    }
  }, [currentSlide, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigate(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Wheel navigation
  useEffect(() => {
    let lastNavTime = Date.now();
    let wheelTimeout: NodeJS.Timeout | null = null;
    let isLocked = false;
    let accumulatedDelta = 0;
    let blockCurrentStream = false;
    
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;

      const now = Date.now();
      
      // Trackpad inertia fix: clear timeout on every wheel event
      if (wheelTimeout) clearTimeout(wheelTimeout);
      
      // Reset accumulation, lock state, and stream state after 400ms of NO wheel events
      wheelTimeout = setTimeout(() => {
        isLocked = false;
        accumulatedDelta = 0;
        blockCurrentStream = false;
        wheelTimeout = null;
      }, 400);

      // Do not intercept if scrolling inside a scrollable section, UNLESS we are at the boundaries
      const scrollableParent = target.closest('[data-lenis-prevent="true"], .overflow-y-auto') as HTMLElement;
      if (scrollableParent) {
        const isAtTop = scrollableParent.scrollTop <= 0;
        // Add a small 2px buffer for rounding errors in scroll calculations
        const isAtBottom = Math.abs(scrollableParent.scrollHeight - scrollableParent.clientHeight - scrollableParent.scrollTop) <= 2;
        
        if (e.deltaY > 0 && !isAtBottom) {
          blockCurrentStream = true; // Mark this continuous scroll stream as native-only
          return; // Allow native scroll down
        }
        if (e.deltaY < 0 && !isAtTop) {
          blockCurrentStream = true;
          return; // Allow native scroll up
        }
      }

      // If this swipe started as a native scroll, do not let its leftover inertia change the slide
      if (blockCurrentStream) return;

      // Block if we navigated recently OR if we are still locked from a previous swipe
      if (now - lastNavTime < 1200 || isLocked) return;
      
      // Accumulate scroll distance
      accumulatedDelta += e.deltaY;
      
      // Require a deliberate, sustained scroll (accumulation > 150) to trigger
      if (Math.abs(accumulatedDelta) > 150) {
        if (accumulatedDelta > 0) {
          navigate(1);
        } else {
          navigate(-1);
        }
        lastNavTime = now;
        isLocked = true; // Lock until user completely stops scrolling
        accumulatedDelta = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [navigate]);

  // Mobile: Scroll detection (for stacked sections)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only enable on mobile/tablet
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;
    
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Find which section we're in
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 0;
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2) {
          currentSection = index;
        }
      });
      
      // Check scroll direction
      const scrollPosition = scrollTop + windowHeight / 2;
      
      // Debounce
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const sectionsArray = Array.from(sections) as HTMLElement[];
        const currentSectionEl = sectionsArray[currentSection];
        
        if (currentSectionEl) {
          const rect = currentSectionEl.getBoundingClientRect();
          
          // If scrolled to top of section (within 50px), go to next
          if (rect.top >= -50 && rect.top <= 100) {
            // At top of current section, scroll down to next
            if (currentSection < sectionsArray.length - 1) {
              sectionsArray[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
            }
          }
          
          // If scrolled past section top, stay here
          if (rect.top < -100) {
            currentSectionEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Touch navigation (swipe gestures)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let touchStartY = 0;
    let touchStartX = 0;
    let touchEndY = 0;
    let touchEndX = 0;
    let lastTouchTime = Date.now();

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Debounce
      const now = Date.now();
      if (now - lastTouchTime < 500) return;
      
      touchEndY = e.changedTouches[0].clientY;
      touchEndX = e.changedTouches[0].clientX;
      const target = e.target as HTMLElement;

      // Check if tapping on bottom nav or buttons
      const isNavClick = target.closest('.mobile-nav, button, a, [role="button"]');
      if (isNavClick) return;

      const scrollableParent = target.closest('[data-lenis-prevent="true"], .overflow-y-auto') as HTMLElement;
      if (scrollableParent) {
        const isAtTop = scrollableParent.scrollTop <= 0;
        const isAtBottom = Math.abs(scrollableParent.scrollHeight - scrollableParent.clientHeight - scrollableParent.scrollTop) <= 1;
        
        // Swipe up -> moving down the page (touchStartY > touchEndY)
        if (touchStartY > touchEndY && !isAtBottom) {
          return; 
        }
        // Swipe down -> moving up the page (touchStartY < touchEndY)
        if (touchStartY < touchEndY && !isAtTop) {
          return;
        }
      }

      // Calculate swipe distance
      const swipeDistanceY = touchStartY - touchEndY;
      const swipeDistanceX = Math.abs(touchStartX - touchEndX);
      
      // Only trigger if vertical swipe is dominant
      if (Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) {
        if (swipeDistanceY > 60) {
          // Swipe Up -> Next Slide
          navigate(1);
          lastTouchTime = now;
        } else if (swipeDistanceY < -60) {
          // Swipe Down -> Prev Slide
          navigate(-1);
          lastTouchTime = now;
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);

  // Expose goToSlide to parent via custom event
  useEffect(() => {
    const handleGoToSlide = (e: CustomEvent) => {
      goToSlide(e.detail);
    };

    window.addEventListener('goToSlide', handleGoToSlide as EventListener);
    return () => window.removeEventListener('goToSlide', handleGoToSlide as EventListener);
  }, [goToSlide]);

  // Notify parent when slide changes internally
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('slideChanged', { detail: currentSlide }));
  }, [currentSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-primary">
      {/* Left Navigation - Hidden on mobile */}
      <div className="hidden md:block fixed left-0 top-0 bottom-0 z-40">
        {leftNav}
      </div>

      {/* Slides */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'tween', duration: 0.5 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {children[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Right Side */}
      <div className="fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 md:gap-4">
        {/* Previous Arrow */}
        <button
          onClick={() => navigate(-1)}
          disabled={currentSlide === 0}
          className={`p-2 md:p-4 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            currentSlide === 0
              ? 'bg-black/20 border-white/10 text-white/20 cursor-not-allowed'
              : 'bg-black/60 border-white/20 text-white hover:border-accent hover:text-accent hover:scale-110'
          }`}
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Next Arrow */}
        <button
          onClick={() => navigate(1)}
          disabled={currentSlide === totalSlides - 1}
          className={`p-2 md:p-4 rounded-full backdrop-blur-sm border transition-all duration-300 ${
            currentSlide === totalSlides - 1
              ? 'bg-black/20 border-white/10 text-white/20 cursor-not-allowed'
              : 'bg-black/60 border-white/20 text-white hover:border-accent hover:text-accent hover:scale-110'
          }`}
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Slide Counter - Bottom Right */}
      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-40 bg-black/60 backdrop-blur-sm px-4 md:px-6 py-2 md:py-3 border border-white/20">
        <span className="text-white font-mono text-xs md:text-sm">
          <span className="text-accent font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-white/40 mx-2">/</span>
          <span className="text-white/60">{String(totalSlides).padStart(2, '0')}</span>
        </span>
      </div>
    </div>
  );
}
