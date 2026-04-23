'use client';

import { DINING_DATA, IMAGE_URLS, VIDEO_URLS, DINING_IMAGES } from '../../lib/constants';
import ScrollReveal from '../ui/ScrollReveal';
import ImageCollage from '../ui/ImageCollage';
import VideoBackground from '../ui/VideoBackground';
import { Utensils, Coffee, Clock } from 'lucide-react';
import Section3DBackground from '../ui/Section3DBackground';

export default function DiningSection() {
  return (
    <section id="dining" className="relative h-full w-full overflow-hidden">
      {/* Three.js 3D Background - Warm Wave Particles */}
      <Section3DBackground
        particleColor="#D4AF37"
        secondaryColor="#FF8C00"
        pattern="wave"
        particleCount={1000}
        opacity={0.4}
        className="z-0"
      />
      
      {/* Full background image + video — cinematic like other sections */}
      <VideoBackground
        src={VIDEO_URLS.dining}
        imageSrc={IMAGE_URLS.dining}
        overlay="bg-gradient-to-r from-black/90 via-black/70 to-black/50"
        kenBurns={true}
      >
        <div className="absolute inset-0 px-6 py-20 overflow-y-auto" data-lenis-prevent="true">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Dining &amp; Lifestyle
                </h2>
                <p className="text-xl text-text-muted max-w-3xl mx-auto">
                  Culinary experiences that keep visitors engaged
                </p>
              </div>
            </ScrollReveal>

            {/* Full-width dining image strip — no images cropped */}
            <ScrollReveal>
              <div className="mb-8 h-[180px]">
                <ImageCollage
                  images={[
                    { src: DINING_IMAGES[0], alt: 'Fine Dining', label: 'Fine Dining' },
                    { src: DINING_IMAGES[1], alt: 'Casual Dining', label: 'Casual Dining' },
                    { src: DINING_IMAGES[2], alt: 'Coffee & Cafes', label: 'Coffee & Cafes' },
                    { src: DINING_IMAGES[4], alt: 'Food Court', label: 'Food Court' },
                  ]}
                  layout="strip"
                />
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-5 bg-black/40 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-4">
                    <Utensils className="text-accent" size={24} />
                    <div>
                      <div className="text-3xl font-bold text-accent">{DINING_DATA.totalFBOppportunities}</div>
                      <div className="text-text-muted text-sm">F&amp;B Opportunities</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 bg-black/40 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center gap-4">
                    <Coffee className="text-accent" size={24} />
                    <div>
                      <div className="text-3xl font-bold text-accent">{DINING_DATA.averageDailyDiners}</div>
                      <div className="text-text-muted text-sm">Daily Diners</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Dining Categories + Right Collage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DINING_DATA.categories.map((category, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div className="group relative overflow-hidden p-5 bg-black/40 backdrop-blur-sm border border-white/10 hover:border-accent transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,169,98,0.15)] hover:-translate-y-1">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-20 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                        style={{ backgroundImage: `url(${DINING_IMAGES[index]})` }}
                      />
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">{category.name}</h3>
                        <p className="text-text-muted mb-3 text-sm">{category.description}</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock size={12} className="text-accent" />
                            <span className="text-text-muted text-xs">Dwell: {category.dwellTime}</span>
                          </div>
                          <div className="text-accent font-semibold text-sm">{category.count} locations</div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Right: lifestyle collage — no crops */}
              <ScrollReveal>
                <div className="h-[280px]">
                  <ImageCollage
                    images={[
                      { src: DINING_IMAGES[5], alt: 'Lifestyle Dining', label: 'More Than Just a Meal', size: 'large' },
                      { src: DINING_IMAGES[3], alt: 'Specialty Cafes', label: 'Specialty Cafes', size: 'medium' },
                      { src: DINING_IMAGES[2], alt: 'Restaurant Row', label: 'Restaurant Row', size: 'small' },
                    ]}
                    layout="left-heavy"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-white mb-2">More Than Just a Meal</h3>
                  <p className="text-text-muted leading-relaxed text-sm">
                    From Michelin-caliber fine dining to beloved local favorites, WEM's culinary
                    landscape extends visitor dwell time and creates memorable experiences.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </VideoBackground>
    </section>
  );
}
