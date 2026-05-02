'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import BottomNav from './components/navigation/BottomNav';
import HeroSection from './components/sections/HeroSection';
import ScaleSection from './components/sections/ScaleSection';
import RetailSection from './components/sections/RetailSection';
import LuxurySection from './components/sections/LuxurySection';
import DiningSection from './components/sections/DiningSection';
import AttractionsSection from './components/sections/AttractionsSection';
import EventsSection from './components/sections/EventsSection';
import PersonalizeSection from './components/sections/PersonalizeSection';
import CTASection from './components/sections/CTASection';

export const SLIDES = [
  { id: 'hero',         label: 'WEM' },
  { id: 'scale',        label: 'Scale' },
  { id: 'retail',       label: 'Retail' },
  { id: 'luxury',       label: 'Luxury' },
  { id: 'dining',       label: 'Dining' },
  { id: 'attractions',  label: 'Attractions' },
  { id: 'events',       label: 'Events' },
  { id: 'personalize',  label: 'Your Brand' },
  { id: 'cta',          label: 'Contact' },
];

const COMPONENTS = [
  HeroSection, ScaleSection, RetailSection, LuxurySection,
  DiningSection, AttractionsSection, EventsSection,
  PersonalizeSection, CTASection,
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const prevSlide = useRef(0);

  const goToSlide = useCallback((idx: number) => {
    if (idx === current || transitioning) return;
    setTransitioning(true);
    prevSlide.current = current;
    setTimeout(() => {
      setCurrent(idx);
      setTimeout(() => setTransitioning(false), 600);
    }, 300);
  }, [current, transitioning]);

  // ── Keyboard navigation ──────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToSlide(Math.min(current + 1, SLIDES.length - 1));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToSlide(Math.max(current - 1, 0));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goToSlide]);

  // ── goToSection / goToSlide custom events (from CTAs inside slides) ──
  useEffect(() => {
    const handler = (e: CustomEvent) => goToSlide(e.detail as number);
    window.addEventListener('goToSection', handler as EventListener);
    window.addEventListener('goToSlide', handler as EventListener);
    return () => {
      window.removeEventListener('goToSection', handler as EventListener);
      window.removeEventListener('goToSlide', handler as EventListener);
    };
  }, [goToSlide]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#080808', overflow: 'hidden' }}>

      {/* Slide stack */}
      {COMPONENTS.map((SlideComp, i) => {
        const isActive = i === current;
        const wasActive = i === prevSlide.current && transitioning;
        return (
          <div
            key={SLIDES[i].id}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100vw',
              height: '100vh',
              overflow: 'hidden',
              pointerEvents: isActive && !transitioning ? 'all' : 'none',
              opacity: isActive ? (transitioning ? 0 : 1) : (wasActive ? 0 : 0),
              transform: isActive
                ? (transitioning ? 'scale(1.03)' : 'scale(1)')
                : (wasActive ? 'scale(0.97)' : 'scale(1.03)'),
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              zIndex: isActive ? 2 : (wasActive ? 1 : 0),
            }}
          >
            <SlideComp isActive={isActive} onNavigate={goToSlide} />
          </div>
        );
      })}

      {/* Nav — always on top */}
      <BottomNav
        slides={SLIDES}
        current={current}
        onNavigate={goToSlide}
      />
    </div>
  );
}
