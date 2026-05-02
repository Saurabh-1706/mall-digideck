'use client';

import { useEffect, useRef, useState } from 'react';
import TopBar from './components/navigation/TopBar';
import SideNav from './components/navigation/SideNav';
import LoadingScreen from './components/LoadingScreen';
import IntroVideo from './components/IntroVideo';
import HeroSection from './components/sections/HeroSection';
import ScaleSection from './components/sections/ScaleSection';
import RetailSection from './components/sections/RetailSection';
import LuxurySection from './components/sections/LuxurySection';
import DiningSection from './components/sections/DiningSection';
import AttractionsSection from './components/sections/AttractionsSection';
import EventsSection from './components/sections/EventsSection';
import PersonalizeSection from './components/sections/PersonalizeSection';
import CTASection from './components/sections/CTASection';

const SECTIONS = [
  { id: 'hero',         label: 'Home' },
  { id: 'scale',        label: 'Scale' },
  { id: 'retail',       label: 'Retail' },
  { id: 'luxury',       label: 'Luxury' },
  { id: 'dining',       label: 'Dining' },
  { id: 'attractions',  label: 'Attractions' },
  { id: 'events',       label: 'Events' },
  { id: 'personalize',  label: 'Your Brand' },
  { id: 'cta',          label: 'Partner' },
];

// 3-stage app flow: loading → intro video → main deck
type Stage = 'loading' | 'intro' | 'deck';

export default function Home() {
  const [stage, setStage] = useState<Stage>('loading');
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // ── Keyboard navigation ─────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (stage !== 'deck') return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        scrollToSection(Math.min(activeSection + 1, SECTIONS.length - 1));
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        scrollToSection(Math.max(activeSection - 1, 0));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSection, stage]);

  // ── Intersection observer ───────────────────────────
  useEffect(() => {
    if (stage !== 'deck') return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex(s => s.id === entry.target.id);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { root: containerRef.current, threshold: 0.5 }
    );
    sectionRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [stage]);

  // ── goToSection events from CTAs ────────────────────
  useEffect(() => {
    const handler = (e: CustomEvent) => scrollToSection(e.detail);
    window.addEventListener('goToSection', handler as EventListener);
    return () => window.removeEventListener('goToSection', handler as EventListener);
  }, []);

  const scrollToSection = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (el && containerRef.current) {
      containerRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
  };

  // ── Stage: Loading ──────────────────────────────────
  if (stage === 'loading') {
    return <LoadingScreen onComplete={() => setStage('intro')} />;
  }

  // ── Stage: Intro Video ──────────────────────────────
  if (stage === 'intro') {
    return <IntroVideo onComplete={() => setStage('deck')} />;
  }

  // ── Stage: Main Deck ────────────────────────────────
  return (
    <>
      <TopBar sections={SECTIONS} activeSection={activeSection} onSectionClick={scrollToSection} />
      <SideNav sections={SECTIONS} activeSection={activeSection} onSectionClick={scrollToSection} />

      <div ref={containerRef} className="snap-container">
        {SECTIONS.map((sec, i) => {
          const SectionComponent = [
            HeroSection, ScaleSection, RetailSection, LuxurySection,
            DiningSection, AttractionsSection, EventsSection,
            PersonalizeSection, CTASection,
          ][i];
          return (
            <section
              key={sec.id}
              id={sec.id}
              className="snap-section"
              ref={el => { sectionRefs.current[i] = el; }}
            >
              <SectionComponent />
            </section>
          );
        })}
      </div>
    </>
  );
}
