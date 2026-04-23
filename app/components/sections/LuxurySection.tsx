'use client';

import { motion } from 'framer-motion';
import VideoBackground from '../ui/VideoBackground';
import { VIDEO_URLS, IMAGE_URLS, LUXURY_DATA } from '../../lib/constants';
import ScrollReveal from '../ui/ScrollReveal';
import ImageCollage from '../ui/ImageCollage';
import AnimatedCounter from '../ui/AnimatedCounter';
import Section3DBackground from '../ui/Section3DBackground';
import LeasingModule from '../modules/LeasingModule';
import { useState } from 'react';

export default function LuxurySection() {
  const [leasingOpen, setLeasingOpen] = useState(false);

  return (
    <>
      <LeasingModule isOpen={leasingOpen} onClose={() => setLeasingOpen(false)} />
      <section id="luxury" className="relative h-screen overflow-hidden">
      {/* Three.js 3D Background - Elegant Spiral Particles */}
      <Section3DBackground
        particleColor="#C9A962"
        pattern="spiral"
        particleCount={1500}
        mouseInteraction={true}
        opacity={0.6}
        className="z-0"
      />
      
      <VideoBackground
        src={VIDEO_URLS.luxury}
        imageSrc={IMAGE_URLS.luxury}
        overlay="bg-gradient-to-r from-black/90 via-black/80 to-black/70"
        kenBurns={true}
      >
        <div className="absolute inset-0 px-6 py-20 overflow-y-auto" data-lenis-prevent="true">
          <div className="max-w-7xl mx-auto h-full">
            {/* Header */}
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-6xl md:text-7xl font-bold text-white mb-6">
                  Luxury <span className="text-accent">Redefined</span>
                </h2>
                <p className="text-xl text-text-muted max-w-3xl mx-auto">
                  An elevated experience for discerning brands
                </p>
              </div>
            </ScrollReveal>

            {/* Main Content - Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              {/* Left: Image Collage */}
              <ScrollReveal>
                <div className="h-[450px]">
                  <ImageCollage
                    images={[
                      { src: '/images/luxury-main.jpg', alt: 'Luxury Retail', size: 'large' },
                      { src: '/images/retail-float-1.jpg', alt: 'Premium Fashion', size: 'medium' },
                      { src: '/images/retail-float-2.jpg', alt: 'High-End Brands', size: 'small' },
                      { src: '/images/retail-float-3.jpg', alt: 'Designer Collections', size: 'small' },
                    ]}
                    layout="left-heavy"
                  />
                </div>
              </ScrollReveal>

              {/* Right: Content & Stats */}
              <div className="flex flex-col justify-center">
                <ScrollReveal>
                  <p className="text-lg text-text-muted mb-12 leading-relaxed">
                    {LUXURY_DATA.description}
                  </p>
                </ScrollReveal>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {LUXURY_DATA.stats.map((stat, index) => (
                    <ScrollReveal key={index} delay={index * 0.1}>
                      <motion.div
                        className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300"
                        whileHover={{ scale: 1.03 }}
                      >
                        <div className="text-4xl font-bold text-accent mb-2">
                          {stat.value.includes('%') || stat.value.includes('$') || stat.value.includes('/') ? (
                            stat.value
                          ) : (
                            <AnimatedCounter target={stat.value} duration={2000} delay={index * 0.1} />
                          )}
                        </div>
                        <div className="text-text-muted text-sm">{stat.label}</div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>

                {/* Luxury Brands */}
                <ScrollReveal delay={0.5}>
                  <div className="mb-8">
                    <h4 className="text-sm text-text-muted uppercase tracking-wider mb-4">Featured Luxury Brands</h4>
                    <div className="flex flex-wrap gap-3">
                      {['Gucci', 'Louis Vuitton', 'Prada', 'Chanel', 'Hermès', 'Dior'].map((brand) => (
                        <span
                          key={brand}
                          className="px-4 py-2 bg-white/5 border border-white/10 text-white text-sm hover:border-accent hover:text-accent transition-all duration-300"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                {/* CTA */}
                <ScrollReveal delay={0.6}>
                  <button
                    onClick={() => setLeasingOpen(true)}
                    className="group relative inline-block px-10 py-4 bg-gradient-to-r from-accent to-accent-hover text-primary font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20"
                  >
                    <span className="relative z-10">Position Your Brand</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </ScrollReveal>
              </div>
            </div>

            {/* Decorative line */}
            <ScrollReveal delay={0.8}>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
            </ScrollReveal>
          </div>
        </div>
      </VideoBackground>
    </section>
    </>
  );
}
