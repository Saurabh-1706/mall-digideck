'use client';

import { useState, useEffect } from 'react';
import EntryScreen from './components/EntryScreen';
import IntroVideo from './components/IntroVideo';
import PathChooser from './components/PathChooser';
import PresentationMode from './components/PresentationMode';
import LeftNav from './components/navigation/LeftNav';
import WhySection from './components/sections/WhySection';
import RetailSection from './components/sections/RetailSection';
import LuxurySection from './components/sections/LuxurySection';
import DiningSection from './components/sections/DiningSection';
import AttractionsSection from './components/sections/AttractionsSection';
import EventsSection from './components/sections/EventsSection';
import CTASection from './components/sections/CTASection';

type AppStage = 'entry' | 'intro' | 'path' | 'main';
type AudiencePath = 'tenant' | 'sponsor' | 'event' | 'all';

// Define curated paths — each path shows sections in a different order optimized for that audience
const PATH_CONFIGS: Record<AudiencePath, { slides: React.ReactNode[]; navLabels: string[] }> = {
  tenant: {
    slides: [],
    navLabels: ['Overview', 'Retail', 'Luxury', 'Dining', 'Attractions', 'Events', 'Contact'],
  },
  sponsor: {
    slides: [],
    navLabels: ['Overview', 'Events', 'Why WEM', 'Attractions', 'Contact'],
  },
  event: {
    slides: [],
    navLabels: ['Overview', 'Attractions', 'Events', 'Why WEM', 'Contact'],
  },
  all: {
    slides: [],
    navLabels: ['Overview', 'Retail', 'Luxury', 'Dining', 'Attractions', 'Events', 'Contact'],
  },
};

export default function Home() {
  const [stage, setStage] = useState<AppStage>('entry');
  const [audiencePath, setAudiencePath] = useState<AudiencePath>('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleEnter = () => setStage('intro');
  const handleIntroComplete = () => setStage('path');

  const handleChoosePath = (path: 'tenant' | 'sponsor' | 'event') => {
    setAudiencePath(path);
    setStage('main');
  };

  const handleSkipPath = () => {
    setAudiencePath('all');
    setStage('main');
  };

  // Listen for slide changes from PresentationMode
  useEffect(() => {
    const handleGoToSlide = (e: CustomEvent) => setCurrentSlide(e.detail);
    const handleSlideChanged = (e: CustomEvent) => setCurrentSlide(e.detail);
    window.addEventListener('goToSlide', handleGoToSlide as EventListener);
    window.addEventListener('slideChanged', handleSlideChanged as EventListener);
    return () => {
      window.removeEventListener('goToSlide', handleGoToSlide as EventListener);
      window.removeEventListener('slideChanged', handleSlideChanged as EventListener);
    };
  }, []);

  if (stage === 'entry') return <EntryScreen onEnter={handleEnter} />;
  if (stage === 'intro') return <IntroVideo onComplete={handleIntroComplete} />;
  if (stage === 'path') return <PathChooser onChoosePath={handleChoosePath} onSkip={handleSkipPath} />;

  // Build slides based on audience path
  const allSections = {
    why: <WhySection key="why" />,
    retail: <RetailSection key="retail" />,
    luxury: <LuxurySection key="luxury" />,
    dining: <DiningSection key="dining" />,
    attractions: <AttractionsSection key="attractions" />,
    events: <EventsSection key="events" />,
    cta: <CTASection key="cta" />,
  };

  type SectionKey = keyof typeof allSections;

  const pathSections: Record<AudiencePath, SectionKey[]> = {
    tenant: ['why', 'retail', 'luxury', 'dining', 'attractions', 'events', 'cta'],
    sponsor: ['why', 'events', 'attractions', 'retail', 'cta'],
    event: ['why', 'attractions', 'events', 'dining', 'cta'],
    all: ['why', 'retail', 'luxury', 'dining', 'attractions', 'events', 'cta'],
  };

  const pathNavLabels: Record<AudiencePath, string[]> = {
    tenant: ['Overview', 'Retail', 'Luxury', 'Dining', 'Attractions', 'Events', 'Contact'],
    sponsor: ['Overview', 'Events & Platform', 'Attractions', 'Retail', 'Contact'],
    event: ['Overview', 'Venues', 'Events', 'Dining', 'Contact'],
    all: ['Overview', 'Retail', 'Luxury', 'Dining', 'Attractions', 'Events', 'Contact'],
  };

  const slides = pathSections[audiencePath].map(key => allSections[key]);
  const navLabels = pathNavLabels[audiencePath];

  // Audience badge for TopBar
  const audienceBadge: Record<AudiencePath, { label: string; color: string } | null> = {
    tenant: { label: 'Retail Tenant Path', color: '#C9A962' },
    sponsor: { label: 'Brand Sponsor Path', color: '#A8C4E0' },
    event: { label: 'Event Partner Path', color: '#E8B4B8' },
    all: null,
  };

  const badge = audienceBadge[audiencePath];

  return (
    <PresentationMode
      children={slides}
      leftNav={<LeftNav activeSlide={currentSlide} navLabels={navLabels} audienceBadge={badge} />}
    />
  );
}
