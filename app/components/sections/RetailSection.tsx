'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VideoBackground from '../ui/VideoBackground';
import { VIDEO_URLS, RETAIL_DATA, IMAGE_URLS, FLOATING_IMAGES_RETAIL } from '../../lib/constants';
import ScrollReveal from '../ui/ScrollReveal';
import ImageCollage from '../ui/ImageCollage';
import Section3DBackground from '../ui/Section3DBackground';
import LeasingModule from '../modules/LeasingModule';
import { useState } from 'react';

export default function RetailSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leasingOpen, setLeasingOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Different parallax speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [150, -250]);
  const y2 = useTransform(scrollYProgress, [0, 1], [300, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -150]);

  return (
    <>
      <LeasingModule isOpen={leasingOpen} onClose={() => setLeasingOpen(false)} />
      <section ref={containerRef} id="retail" className="relative h-screen bg-primary flex items-center justify-center px-6 py-8 lg:py-10 overflow-hidden">
      
      {/* Three.js 3D Background - Geometric Brand Particles */}
      <Section3DBackground
        particleColor="#C9A962"
        secondaryColor="#FFFFFF"
        pattern="rotate"
        particleCount={1200}
        opacity={0.3}
        className="z-0"
      />
      
      {/* Enhanced Image Collage */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none brightness-110">
        <ImageCollage
          images={[
            { src: FLOATING_IMAGES_RETAIL[0], alt: 'Retail 1', size: 'large' },
            { src: FLOATING_IMAGES_RETAIL[1], alt: 'Retail 2', size: 'medium' },
            { src: FLOATING_IMAGES_RETAIL[2], alt: 'Retail 3', size: 'small' },
            { src: FLOATING_IMAGES_RETAIL[3], alt: 'Retail 4', size: 'small' },
          ]}
          layout="horizontal"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-2">
              800+ Brands. Infinite Possibilities.
            </h2>
            <p className="text-lg md:text-xl text-text-muted max-w-3xl mx-auto">
              From luxury flagships to emerging brands
            </p>
          </div>
        </ScrollReveal>

        {/* Video + Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Video */}
          <ScrollReveal direction="left">
            <div className="aspect-video rounded-lg overflow-hidden">
              <VideoBackground
                src={VIDEO_URLS.retail}
                imageSrc={IMAGE_URLS.retail}
                overlay="bg-black/25"
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right">
            <div className="flex flex-col justify-center h-full">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Unmatched Retail Diversity
              </h3>
              <p className="text-sm lg:text-base text-text-muted mb-6 leading-relaxed">
                West Edmonton Mall houses an incredible mix of retailers, from international 
                luxury brands to unique local boutiques. Our diverse tenant mix ensures something 
                for every shopper, driving consistent foot traffic across all categories.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-accent mb-1">
                    {RETAIL_DATA.footTraffic.daily}
                  </div>
                  <div className="text-xs lg:text-sm text-text-muted">Daily Visitors</div>
                </div>
                <div>
                  <div className="text-3xl lg:text-4xl font-bold text-accent mb-1">
                    {RETAIL_DATA.footTraffic.peak}
                  </div>
                  <div className="text-xs lg:text-sm text-text-muted">Peak Traffic</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Category Grid */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {RETAIL_DATA.categories.map((category, index) => (
              <div
                key={index}
                className="group p-4 md:p-5 bg-surface/80 backdrop-blur-sm border border-border hover:border-accent transition-all duration-500 hover:scale-105 hover:shadow-[0_0_30px_rgba(201,169,98,0.15)] hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg lg:text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">{category.name}</h4>
                  <span className="text-xl lg:text-2xl font-bold text-accent">{category.count}</span>
                </div>
                <p className="text-text-muted text-sm">
                  {category.examples.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-6 lg:mt-8 text-center">
            <button
              onClick={() => setLeasingOpen(true)}
              className="group relative inline-block px-8 py-4 lg:px-10 bg-gradient-to-r from-accent to-accent-hover text-primary font-semibold text-base lg:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20"
            >
              <span className="relative z-10">Explore Leasing Opportunities</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
    </>
  );
}
