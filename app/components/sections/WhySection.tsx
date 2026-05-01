'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MALL_STATS } from '../../lib/constants';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import Section3DBackground from '../ui/Section3DBackground';
import LiveDashboard from '../ui/LiveDashboard';

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="h-screen bg-primary flex flex-col lg:flex-row overflow-hidden relative">
      {/* Three.js 3D Background */}
      <Section3DBackground
        particleColor="#C9A962"
        particleCount={1200}
        pattern="float"
        mouseInteraction={true}
        opacity={0.4}
        className="z-0"
      />

      {/* ── LEFT: Live Dashboard — THE "I NEED TO BE HERE" MOMENT ── */}
      <div className="w-full lg:w-[55%] h-[55vh] lg:h-full flex flex-col justify-center px-6 lg:px-10 py-6 relative z-10 overflow-y-auto" data-lenis-prevent="true">
        {/* Section Label */}
        <ScrollReveal>
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#C9A962]" />
              <div>
                <p className="text-[#C9A962] text-[10px] uppercase tracking-[0.5em] font-medium">West Edmonton Mall</p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  The Pulse of <span className="text-[#C9A962]">North America's</span>
                  <br />Largest Mall
                </h2>
              </div>
            </div>
            <p className="text-white/50 text-sm ml-4 pl-3 border-l border-white/10">
              This isn't historical data — this is what's happening inside WEM <em>right now</em>.
            </p>
          </div>
        </ScrollReveal>

        {/* THE LIVE DASHBOARD */}
        <ScrollReveal delay={0.2}>
          <LiveDashboard />
        </ScrollReveal>
      </div>

      {/* ── RIGHT: Stats + Context ── */}
      <div className="w-full lg:w-[45%] h-[45vh] lg:h-full flex flex-col justify-center px-6 lg:px-12 py-6 lg:py-0 relative z-10 overflow-y-auto pb-20 lg:pb-0" data-lenis-prevent="true">

        {/* Logo */}
        <ScrollReveal>
          <div className="mb-6">
            <img
              src="/images/logo.png"
              alt="WEM Logo"
              className="h-14 w-auto object-contain mb-3"
            />
            <motion.div
              className="w-12 h-px bg-[#C9A962]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <div className="mb-6">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
              Why Here?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              30 million annual visitors. 5.3 million sq ft. 20+ world-class attractions. 
              The numbers tell part of the story — the pulse above tells the rest.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { target: MALL_STATS.totalArea, label: 'Square Feet', delay: 0.1 },
            { target: MALL_STATS.totalStores, label: 'Retail Stores', delay: 0.2 },
            { target: MALL_STATS.annualVisitors, label: 'Annual Visitors', delay: 0.3 },
            { target: MALL_STATS.attractions, label: 'Major Attractions', delay: 0.4 },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={stat.delay}>
              <motion.div
                className="p-4 bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-[#C9A962]/50 transition-all duration-300"
                whileHover={{ scale: 1.03, borderColor: 'rgba(201,169,98,0.5)' }}
              >
                <div className="text-2xl font-bold text-[#C9A962] mb-0.5">
                  <AnimatedCounter target={stat.target} duration={2000} delay={stat.delay} />
                </div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* WEM vs Others comparison */}
        <ScrollReveal delay={0.5}>
          <div className="bg-white/[0.03] border border-white/10 p-4">
            <div className="text-[10px] text-white/40 uppercase tracking-widest mb-3">How WEM Compares</div>
            {[
              { name: 'West Edmonton Mall', visitors: '30M+', bar: 100, color: '#C9A962' },
              { name: 'Mall of America', visitors: '40M', bar: 90, color: '#A0A0A0' },
              { name: 'American Dream', visitors: '16M', bar: 53, color: '#A0A0A0' },
            ].map((mall, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: mall.color }} className="font-medium">{mall.name}</span>
                  <span className="text-white/50">{mall.visitors} visitors/yr</span>
                </div>
                <div className="h-1 bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: mall.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${mall.bar}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Quote */}
        <ScrollReveal delay={0.6}>
          <div className="mt-4 pl-3 border-l border-[#C9A962]/40">
            <p className="text-white/50 text-xs italic leading-relaxed">
              "WEM isn't just where Canadians shop. It's where the country gathers."
            </p>
            <p className="text-[#C9A962]/70 text-[10px] mt-1">— Canadian Retail Report, 2024</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
