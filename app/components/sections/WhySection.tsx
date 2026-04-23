'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MALL_STATS } from '../../lib/constants';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import Section3DBackground from '../ui/Section3DBackground';
import { useGSAPSectionAnimation } from '../../hooks/useGSAPSectionAnimation';

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { titleRef, subtitleRef } = useGSAPSectionAnimation(sectionRef as any, {
    pattern: 'fade-up',
    delay: 0.2,
    duration: 1,
  });

  return (
    <section ref={sectionRef} className="h-screen lg:h-screen bg-primary flex flex-col lg:flex-row overflow-hidden relative pb-16 lg:pb-0">
      {/* Three.js 3D Background - Floating Golden Particles */}
      <Section3DBackground
        particleColor="#C9A962"
        particleCount={2000}
        pattern="float"
        mouseInteraction={true}
        opacity={0.8}
        className="z-0"
      />
      {/* Mobile: Stacked layout; Desktop: Side-by-side */}
      
      {/* ── MOBILE TOP / DESKTOP LEFT ── Images */}
      <div className="w-full lg:w-[55%] h-[50vh] lg:h-full relative z-10 flex flex-col gap-2 p-2 lg:p-3">

        {/* Row 1: hero.png — full-width dominant image */}
        <div className="flex-[2] relative overflow-hidden group">
          <img
            src="/images/hero.png"
            alt="West Edmonton Mall — Luxury Exterior"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-2 left-3 lg:bottom-3 lg:left-4 text-white/90 text-xs lg:text-sm font-medium tracking-widest uppercase">
            West Edmonton Mall
          </span>
        </div>

        {/* Row 2: events.png + dining.png side by side */}
        <div className="flex-[1] flex gap-2">
          <div className="flex-1 relative overflow-hidden group">
            <img
              src="/images/events.png"
              alt="Live Events & Entertainment inside WEM"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-white/90 text-xs font-medium tracking-widest uppercase">
              🎤 Live Events
            </span>
          </div>
          <div className="flex-1 relative overflow-hidden group">
            <img
              src="/images/dining.png"
              alt="Fine Dining inside WEM"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 text-white/90 text-xs font-medium tracking-widest uppercase">
              🍽️ Fine Dining
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Desktop 45% / Mobile below ── Content */}
      <div className="w-full lg:w-[45%] h-[50vh] lg:h-full flex flex-col justify-center px-6 lg:px-14 py-8 lg:py-0 relative z-10 overflow-y-auto pb-20 lg:pb-0">

        {/* WEM Logo */}
        <ScrollReveal>
          <div className="mb-6">
            <img
              src="/images/logo.png"
              alt="WEM Logo"
              className="h-16 w-auto object-contain mb-4"
            />
            <motion.div
              className="w-16 h-px bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mb-6 lg:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
              North America's
              <br />
              <span className="text-accent">Largest Mall</span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-light">
              Shopping · Entertainment · Dining · Attractions
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid - Mobile: 1 column, Desktop: 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
          <ScrollReveal delay={0.1}>
            <motion.div
              className="p-3 sm:p-4 lg:p-5 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                <AnimatedCounter target={MALL_STATS.totalArea} duration={2000} delay={0.1} />
              </div>
              <div className="text-white/60 text-xs">{MALL_STATS.totalAreaLabel}</div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.div
              className="p-3 sm:p-4 lg:p-5 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                <AnimatedCounter target={MALL_STATS.totalStores} duration={2000} delay={0.2} />
              </div>
              <div className="text-white/60 text-xs">{MALL_STATS.totalStoresLabel}</div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <motion.div
              className="p-3 sm:p-4 lg:p-5 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                <AnimatedCounter target={MALL_STATS.annualVisitors} duration={2000} delay={0.3} />
              </div>
              <div className="text-white/60 text-xs">{MALL_STATS.annualVisitorsLabel}</div>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <motion.div
              className="p-3 sm:p-4 lg:p-5 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                {MALL_STATS.established}
              </div>
              <div className="text-white/60 text-xs">{MALL_STATS.establishedLabel}</div>
            </motion.div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.5}>
          <p className="text-white/50 leading-relaxed text-sm">
            800+ stores · 20+ major attractions · 100+ dining options.
            The ultimate destination for retail leasing, sponsorship & events.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
