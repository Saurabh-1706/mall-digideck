'use client';

import { motion } from 'framer-motion';
import VideoBackground from '../ui/VideoBackground';
import { VIDEO_URLS, IMAGE_URLS, EVENTS_DATA, EVENTS_IMAGES } from '../../lib/constants';
import ScrollReveal from '../ui/ScrollReveal';
import ImageCollage from '../ui/ImageCollage';
import Section3DBackground from '../ui/Section3DBackground';
import SponsorshipModule from '../modules/SponsorshipModule';
import { useState } from 'react';

export default function EventsSection() {
  const [sponsorshipOpen, setSponsorshipOpen] = useState(false);

  return (
    <>
      <SponsorshipModule isOpen={sponsorshipOpen} onClose={() => setSponsorshipOpen(false)} />
      <section id="events" className="relative h-full w-full bg-primary overflow-y-auto px-6 py-20" data-lenis-prevent="true">
      {/* Three.js 3D Background - Confetti Particles */}
      <Section3DBackground
        particleColor="#C9A962"
        secondaryColor="#C0C0C0"
        tertiaryColor="#FFFFFF"
        pattern="float"
        particleCount={1400}
        mouseInteraction={true}
        opacity={0.5}
        className="z-0"
      />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Events & Activations
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Your brand on the world&apos;s stage
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Events Collage - Dynamic Showcase */}
        <ScrollReveal>
          <div className="mb-12 h-[300px]">
            <ImageCollage
              images={[
                { src: EVENTS_IMAGES[0], alt: 'Concerts & Live Shows', label: 'Concerts & Live Shows', size: 'large' },
                { src: EVENTS_IMAGES[1], alt: 'Brand Activations', label: 'Brand Activations', size: 'medium' },
                { src: EVENTS_IMAGES[2], alt: 'Corporate Events', label: 'Corporate Events', size: 'small' },
                { src: EVENTS_IMAGES[3], alt: 'Conventions & Expos', label: 'Conventions & Expos', size: 'small' },
              ]}
              layout="featured"
            />
          </div>
        </ScrollReveal>

        {/* Event Types with Enhanced Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Event Details */}
          <div className="flex flex-col gap-4">
            {EVENTS_DATA.types.map((event, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <motion.div 
                  className="group relative p-6 bg-surface border border-border hover:border-accent transition-all duration-300 overflow-hidden cursor-default"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(201,169,98,0.15)' }}
                >
                  {/* Subtle background image tint on hover */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ backgroundImage: `url(${EVENTS_IMAGES[index]})` }}
                  />
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">{event.name}</h3>
                    <p className="text-text-muted mb-3 leading-relaxed text-sm">{event.description}</p>
                    
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-2xl font-bold text-accent">{event.capacity}</div>
                        <div className="text-xs text-text-muted uppercase">Capacity</div>
                      </div>
                      <div className="h-8 w-px bg-border" />
                      <div>
                        <div className="text-2xl font-bold text-accent">{event.count}</div>
                        <div className="text-xs text-text-muted uppercase">Per Year</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right: Enhanced Collage with All Event Types */}
          <ScrollReveal>
            <div className="h-[480px]">
              <ImageCollage
                images={[
                  { src: EVENTS_IMAGES[0], alt: 'Concert', label: 'Live Concerts', size: 'large' },
                  { src: EVENTS_IMAGES[1], alt: 'Brand Activation', label: 'Brand Activations', size: 'medium' },
                  { src: EVENTS_IMAGES[2], alt: 'Corporate Event', label: 'Corporate Events', size: 'small' },
                  { src: EVENTS_IMAGES[3], alt: 'Convention', label: 'Conventions', size: 'small' },
                ]}
                layout="masonry"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Stats Grid - Enhanced Cards */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { val: EVENTS_DATA.stats.totalEventsPerYear, label: 'Events/Year' },
              { val: EVENTS_DATA.stats.averageAttendance, label: 'Avg Attendance' },
              { val: EVENTS_DATA.stats.mediaReach, label: 'Media Reach' },
              { val: EVENTS_DATA.stats.sponsorshipROI, label: 'Sponsorship ROI' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-5 bg-surface/50 border border-border rounded-lg"
                whileHover={{ scale: 1.05, borderColor: 'rgba(201, 169, 98, 0.5)' }}
              >
                <div className="text-3xl font-bold text-accent mb-1">{stat.val}</div>
                <div className="text-xs text-text-muted uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="text-center flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="#cta"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-block px-12 py-5 bg-gradient-to-r from-accent to-accent-hover text-primary font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/20"
            >
              <span className="relative z-10">Host Your Next Event Here</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            
            <button
              onClick={() => setSponsorshipOpen(true)}
              className="group relative inline-block px-12 py-5 border-2 border-accent text-accent font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Explore Sponsorship</span>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
    </>
  );
}
