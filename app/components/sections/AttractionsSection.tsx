'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoBackground from '../ui/VideoBackground';
import { IMAGE_URLS, ATTRACTIONS_DATA, WEM_ATTRACTIONS_REAL } from '../../lib/constants';
import ScrollReveal from '../ui/ScrollReveal';
import ImageCollage from '../ui/ImageCollage';
import Section3DBackground from '../ui/Section3DBackground';

export default function AttractionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(null);

  return (
    <section ref={containerRef} id="attractions" className="relative h-full w-full overflow-hidden">
      {/* Three.js 3D Background - Dynamic Burst Particles */}
      <Section3DBackground
        particleColor="#FFD700"
        secondaryColor="#C9A962"
        pattern="burst"
        particleCount={1800}
        mouseInteraction={true}
        opacity={0.5}
        className="z-0"
      />
      
      <VideoBackground
        imageSrc={IMAGE_URLS.attractions}
        overlay="bg-black/80"
        kenBurns={true}
      >


        <div className="absolute inset-0 px-6 py-24 overflow-y-auto z-10" data-lenis-prevent="true">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Beyond <span className="text-accent">Shopping</span>
                </h2>
                <p className="text-xl text-text-muted max-w-3xl mx-auto">
                  World-class attractions that drive foot traffic
                </p>
              </div>
            </ScrollReveal>

            {/* Strip — all WEM attractions side by side */}
            <ScrollReveal>
              <div className="mb-12 h-[240px]">
                <ImageCollage
                  images={[
                    { src: '/images/attractions.png',             alt: 'WEM Indoor Attractions Overview',  label: '🏟️ Inside WEM' },
                    { src: WEM_ATTRACTIONS_REAL[0],               alt: 'Galaxyland Indoor Theme Park',     label: '🎢 Galaxyland' },
                    { src: WEM_ATTRACTIONS_REAL[1],               alt: 'World Waterpark Wave Pool',        label: '🌊 World Waterpark' },
                    { src: WEM_ATTRACTIONS_REAL[2],               alt: 'Ice Palace Skating Rink',          label: '⛸️ Ice Palace' },
                    { src: '/images/attractions-coaster.jpg',     alt: 'Amusement Rides & Attractions',   label: '🎡 Rides & Fun' },
                  ]}
                  layout="strip"
                />
              </div>
            </ScrollReveal>

            {/* Main Attractions - Two Column Layout with Enhanced Collage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Left: Attraction Details */}
              <div className="flex flex-col justify-center">
                {ATTRACTIONS_DATA.main.map((attraction, index) => (
                  <ScrollReveal key={index} delay={index * 0.15}>
                    <motion.div
                      className={`mb-4 p-6 border border-border cursor-pointer transition-all duration-300 ${
                        selectedAttraction === index
                          ? 'border-accent bg-surface'
                          : 'hover:border-accent/50'
                      }`}
                      onClick={() => setSelectedAttraction(selectedAttraction === index ? null : index)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{attraction.icon}</span>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{attraction.name}</h3>
                            <div className="text-accent text-sm uppercase tracking-wider">
                              {attraction.type}
                            </div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: selectedAttraction === index ? 180 : 0 }}
                          className="text-accent"
                        >
                          ▼
                        </motion.div>
                      </div>

                      <AnimatePresence>
                        {selectedAttraction === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-4 border-t border-border"
                          >
                            <p className="text-white/80 mb-4 leading-relaxed">
                              {attraction.description}
                            </p>
                            <div className="flex items-center gap-6">
                              <div>
                                <div className="text-3xl font-bold text-accent">
                                  {attraction.annualVisitors}
                                </div>
                                <div className="text-white/60 text-sm">Annual Visitors</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Right: attractions.png as hero — shows WEM interior with all attractions */}
              <ScrollReveal>
                <div className="h-[480px]">
                  <ImageCollage
                    images={[
                      { src: '/images/attractions.png',         alt: 'WEM Indoor Attractions — Waterpark, Coaster & Stores', label: 'Inside WEM',     size: 'large' },
                      { src: '/images/attractions-coaster.jpg', alt: 'Amusement Rides & Fair Attractions',                  label: 'Rides & Fun',    size: 'medium' },
                      { src: WEM_ATTRACTIONS_REAL[1],           alt: 'World Waterpark',                                     label: 'Waterpark',      size: 'small' },
                      { src: WEM_ATTRACTIONS_REAL[2],           alt: 'Ice Palace',                                          label: 'Ice Palace',     size: 'small' },
                    ]}
                    layout="left-heavy"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Combined Stats - Enhanced Cards */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div 
                  className="text-center p-8 bg-primary/60 backdrop-blur-sm border border-border rounded-lg"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(201, 169, 98, 0.5)' }}
                >
                  <div className="text-5xl font-bold text-accent mb-2">
                    {ATTRACTIONS_DATA.totalAttractions}
                  </div>
                  <div className="text-text-muted uppercase tracking-wider text-sm">
                    Total Attractions
                  </div>
                </motion.div>
                <motion.div 
                  className="text-center p-8 bg-primary/60 backdrop-blur-sm border border-border rounded-lg"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(201, 169, 98, 0.5)' }}
                >
                  <div className="text-5xl font-bold text-accent mb-2">
                    {ATTRACTIONS_DATA.combinedAnnualVisitors}
                  </div>
                  <div className="text-text-muted uppercase tracking-wider text-sm">
                    Combined Annual Visitors
                  </div>
                </motion.div>
                <motion.div 
                  className="text-center p-8 bg-primary/60 backdrop-blur-sm border border-border rounded-lg"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(201, 169, 98, 0.5)' }}
                >
                  <div className="text-5xl font-bold text-accent mb-2">
                    4
                  </div>
                  <div className="text-text-muted uppercase tracking-wider text-sm">
                    Major Attractions
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delay={0.3}>
              <div className="max-w-4xl mx-auto text-center pb-12">
                <p className="text-lg text-text-muted leading-relaxed">
                  West Edmonton Mall isn't just a shopping destination—it's a complete 
                  entertainment complex. From the thrill of Galaxyland to the tropical paradise 
                  of World Waterpark, these attractions draw millions of visitors who also shop, 
                  dine, and explore the mall.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </VideoBackground>
    </section>
  );
}
