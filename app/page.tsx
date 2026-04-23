'use client';

import { useState, useEffect } from 'react';
import EntryScreen from './components/EntryScreen';
import IntroVideo from './components/IntroVideo';
import PresentationMode from './components/PresentationMode';
import LeftNav from './components/navigation/LeftNav';
import WhySection from './components/sections/WhySection';
import RetailSection from './components/sections/RetailSection';
import LuxurySection from './components/sections/LuxurySection';
import DiningSection from './components/sections/DiningSection';
import AttractionsSection from './components/sections/AttractionsSection';
import EventsSection from './components/sections/EventsSection';
import CTASection from './components/sections/CTASection';

type AppStage = 'entry' | 'intro' | 'main';

export default function Home() {
  const [stage, setStage] = useState<AppStage>('entry');
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleEnter = () => {
    setStage('intro');
  };

  const handleIntroComplete = () => {
    setStage('main');
  };

  // Listen for slide changes from PresentationMode
  useEffect(() => {
    const handleGoToSlide = (e: CustomEvent) => {
      setCurrentSlide(e.detail);
    };
    const handleSlideChanged = (e: CustomEvent) => {
      setCurrentSlide(e.detail);
    };

    window.addEventListener('goToSlide', handleGoToSlide as EventListener);
    window.addEventListener('slideChanged', handleSlideChanged as EventListener);
    return () => {
      window.removeEventListener('goToSlide', handleGoToSlide as EventListener);
      window.removeEventListener('slideChanged', handleSlideChanged as EventListener);
    };
  }, []);

  if (stage === 'entry') {
    return <EntryScreen onEnter={handleEnter} />;
  }

  if (stage === 'intro') {
    return <IntroVideo onComplete={handleIntroComplete} />;
  }

  // Main Presentation Slides
  const slides = [
    <WhySection key="why" />,
    <RetailSection key="retail" />,
    <LuxurySection key="luxury" />,
    <DiningSection key="dining" />,
    <AttractionsSection key="attractions" />,
    <EventsSection key="events" />,
    <CTASection key="cta" />,
  ];

  return (
    <PresentationMode
      children={slides}
      leftNav={<LeftNav activeSlide={currentSlide} />}
    />
  );
}
