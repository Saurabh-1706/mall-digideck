'use client';

import { useRef, useEffect, useState } from 'react';
import VideoBackground from '../ui/VideoBackground';
import { VIDEO_URLS, IMAGE_URLS, CONTACT_INFO } from '../../lib/constants';
import { Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';
import Section3DBackground from '../ui/Section3DBackground';
import LeasingModule from '../modules/LeasingModule';
import SponsorshipModule from '../modules/SponsorshipModule';

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [leasingOpen, setLeasingOpen]         = useState(false);
  const [sponsorshipOpen, setSponsorshipOpen] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      sectionRef.current.querySelector('.cta-title'),
      { opacity: 0, y: 80, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1 }
    )
    .fromTo(
      sectionRef.current.querySelector('.cta-subtitle'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    .fromTo(
      sectionRef.current.querySelectorAll('.cta-button'),
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
      '-=0.4'
    )
    .fromTo(
      sectionRef.current.querySelectorAll('.cta-contact'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
      '-=0.3'
    )
    .fromTo(
      sectionRef.current.querySelector('.cta-footer'),
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      {/* ── Expandable Modals ── */}
      <LeasingModule      isOpen={leasingOpen}     onClose={() => setLeasingOpen(false)} />
      <SponsorshipModule  isOpen={sponsorshipOpen}  onClose={() => setSponsorshipOpen(false)} />

      <section id="cta" className="relative h-screen overflow-hidden" ref={sectionRef}>
        {/* Three.js 3D Background */}
        <Section3DBackground
          particleColor="#FFD700"
          pattern="rotate"
          particleCount={2500}
          mouseInteraction={true}
          opacity={0.7}
          className="z-0"
        />

        <VideoBackground
          src={VIDEO_URLS.cta}
          imageSrc={IMAGE_URLS.cta}
          overlay="bg-black/85"
          kenBurns={true}
        >
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-5xl mx-auto text-center">

              {/* Header */}
              <h2 className="cta-title text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                Be Part of Something
                <br />
                <span className="text-accent">Extraordinary</span>
              </h2>

              <p className="cta-subtitle text-xl md:text-2xl text-text-muted mb-16 max-w-3xl mx-auto">
                Join the world's most immersive retail destination
              </p>

              {/* CTA Buttons — trigger modals */}
              <div className="flex flex-col md:flex-row gap-6 justify-center mb-20">
                <button
                  id="leasing-cta-btn"
                  onClick={() => setLeasingOpen(true)}
                  className="cta-button px-10 py-5 bg-accent text-primary font-semibold text-lg hover:bg-accent-hover transition-all duration-300 hover:scale-105"
                >
                  Schedule a Leasing Tour
                </button>
                <button
                  id="sponsorship-cta-btn"
                  onClick={() => setSponsorshipOpen(true)}
                  className="cta-button px-10 py-5 border-2 border-accent text-accent font-semibold text-lg hover:bg-accent hover:text-primary transition-all duration-300"
                >
                  Explore Sponsorship
                </button>
                <a
                  id="events-cta-btn"
                  href={`mailto:${CONTACT_INFO.events.email}`}
                  className="cta-button px-10 py-5 border-2 border-white text-white font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300"
                >
                  Book an Event
                </a>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="cta-contact flex flex-col items-center gap-3">
                  <Mail className="text-accent" size={32} />
                  <div className="text-white font-semibold">{CONTACT_INFO.leasing.title}</div>
                  <a href={`mailto:${CONTACT_INFO.leasing.email}`} className="text-text-muted hover:text-accent transition-colors">
                    {CONTACT_INFO.leasing.email}
                  </a>
                  <a href={`tel:${CONTACT_INFO.leasing.phone}`} className="text-text-muted hover:text-accent transition-colors">
                    {CONTACT_INFO.leasing.phone}
                  </a>
                </div>
                <div className="cta-contact flex flex-col items-center gap-3">
                  <Phone className="text-accent" size={32} />
                  <div className="text-white font-semibold">{CONTACT_INFO.sponsorship.title}</div>
                  <a href={`mailto:${CONTACT_INFO.sponsorship.email}`} className="text-text-muted hover:text-accent transition-colors">
                    {CONTACT_INFO.sponsorship.email}
                  </a>
                  <a href={`tel:${CONTACT_INFO.sponsorship.phone}`} className="text-text-muted hover:text-accent transition-colors">
                    {CONTACT_INFO.sponsorship.phone}
                  </a>
                </div>
                <div className="cta-contact flex flex-col items-center gap-3">
                  <MapPin className="text-accent" size={32} />
                  <div className="text-white font-semibold">Visit Us</div>
                  <div className="text-text-muted text-sm max-w-xs">{CONTACT_INFO.address}</div>
                </div>
              </div>

              {/* Footer */}
              <div className="cta-footer pt-12 border-t border-border/50">
                <div className="text-text-muted text-sm">
                  © {new Date().getFullYear()} West Edmonton Mall. All rights reserved.
                </div>
                <div className="mt-2 text-text-muted/50 text-xs">
                  Built with Next.js 16 · Three.js · GSAP · Framer Motion · Tailwind CSS 4
                </div>
              </div>

            </div>
          </div>
        </VideoBackground>
      </section>
    </>
  );
}
