'use client';

import { motion } from 'framer-motion';
import { MALL_STATS } from '../../lib/constants';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import Section3DBackground from '../ui/Section3DBackground';

export default function WhySection() {
  return (
    <section className="h-screen bg-primary flex flex-col items-center justify-center overflow-hidden relative px-6">
      {/* Three.js 3D Background */}
      <Section3DBackground
        particleColor="#C9A962"
        particleCount={1200}
        pattern="float"
        mouseInteraction={true}
        opacity={0.4}
        className="z-0"
      />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-px bg-[#C9A962]" />
              <p className="text-[#C9A962] text-[10px] uppercase tracking-[0.5em] font-medium">
                West Edmonton Mall
              </p>
              <div className="w-8 h-px bg-[#C9A962]" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
              Why <span className="text-[#C9A962]">Here?</span>
            </h2>
            <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
              30 million annual visitors. 5.3 million sq ft. 20+ world-class attractions.
              North America's most immersive retail destination.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { target: MALL_STATS.totalArea, label: 'Square Feet', delay: 0.1 },
            { target: MALL_STATS.totalStores, label: 'Retail Stores', delay: 0.2 },
            { target: MALL_STATS.annualVisitors, label: 'Annual Visitors', delay: 0.3 },
            { target: MALL_STATS.attractions, label: 'Major Attractions', delay: 0.4 },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={stat.delay}>
              <motion.div
                className="p-5 bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-[#C9A962]/50 transition-all duration-300 text-center"
                whileHover={{ scale: 1.04, borderColor: 'rgba(201,169,98,0.5)' }}
              >
                <div className="text-3xl font-bold text-[#C9A962] mb-1">
                  <AnimatedCounter target={stat.target} duration={2000} delay={stat.delay} />
                </div>
                <div className="text-white/50 text-[10px] uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Comparison bars */}
        <ScrollReveal delay={0.5}>
          <div className="bg-white/[0.03] border border-white/10 p-5 mb-6">
            <div className="text-[10px] text-white/40 uppercase tracking-widest mb-4 text-center">
              How WEM Compares — Annual Visitors
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'West Edmonton Mall', visitors: '30M+', bar: 100, color: '#C9A962' },
                { name: 'Mall of America', visitors: '40M', bar: 90, color: '#A0A0A0' },
                { name: 'American Dream', visitors: '16M', bar: 53, color: '#A0A0A0' },
              ].map((mall, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-2">
                    <span style={{ color: mall.color }} className="font-medium">{mall.name}</span>
                    <span className="text-white/50">{mall.visitors}/yr</span>
                  </div>
                  <div className="h-1 bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: mall.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${mall.bar}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Quote */}
        <ScrollReveal delay={0.6}>
          <div className="text-center pl-3 border-l-0">
            <p className="text-white/40 text-sm italic leading-relaxed">
              "WEM isn't just where Canadians shop. It's where the country gathers."
            </p>
            <p className="text-[#C9A962]/60 text-[10px] mt-2 uppercase tracking-wider">
              — Canadian Retail Report, 2024
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
