'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface PathChooserProps {
  onChoosePath: (path: 'tenant' | 'sponsor' | 'event') => void;
  onSkip: () => void;
}

const PATHS = [
  {
    id: 'tenant' as const,
    icon: '🏪',
    title: 'Retail Tenant',
    subtitle: 'I\'m looking to open a store or F&B location',
    tagline: 'Access 30M+ annual visitors',
    gradient: 'from-[#C9A962]/20 via-transparent to-transparent',
    borderColor: 'border-[#C9A962]',
    accentColor: '#C9A962',
    stats: ['800+ brands', '100K daily traffic', 'Luxury to pop-up'],
    image: '/images/retail.png',
    bgHint: 'border-[#C9A962]/30 hover:border-[#C9A962]',
  },
  {
    id: 'sponsor' as const,
    icon: '🤝',
    title: 'Brand Sponsor',
    subtitle: 'I want to activate my brand inside WEM',
    tagline: 'Reach 50M+ through our platform',
    gradient: 'from-[#A8C4E0]/20 via-transparent to-transparent',
    borderColor: 'border-[#A8C4E0]',
    accentColor: '#A8C4E0',
    stats: ['250+ activations/yr', '320% avg ROI', '$25K–$500K+ tiers'],
    image: '/images/events-concert-v2.png',
    bgHint: 'border-[#A8C4E0]/30 hover:border-[#A8C4E0]',
  },
  {
    id: 'event' as const,
    icon: '🎤',
    title: 'Event Partner',
    subtitle: 'I want to host an event, concert, or expo',
    tagline: 'Venue for 2K to 20K attendees',
    gradient: 'from-[#E8B4B8]/20 via-transparent to-transparent',
    borderColor: 'border-[#E8B4B8]',
    accentColor: '#E8B4B8',
    stats: ['15K seat arena', '20K expo floor', '50M media reach'],
    image: '/images/wem-real-events.jpg',
    bgHint: 'border-[#E8B4B8]/30 hover:border-[#E8B4B8]',
  },
];

export default function PathChooser({ onChoosePath, onSkip }: PathChooserProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (pathId: 'tenant' | 'sponsor' | 'event') => {
    setSelected(pathId);
    setTimeout(() => onChoosePath(pathId), 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A962]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A8C4E0]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl px-6"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[#C9A962] text-xs uppercase tracking-[0.5em] mb-4 font-medium"
          >
            West Edmonton Mall · Exclusive Opportunity
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            What brings you here?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/50 text-lg"
          >
            We'll personalize your experience
          </motion.p>
        </div>

        {/* Path Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PATHS.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.15, duration: 0.7 }}
            >
              <motion.button
                className={`relative w-full text-left overflow-hidden border transition-all duration-500 ${path.bgHint} bg-white/[0.02] backdrop-blur-sm group`}
                style={{
                  borderColor: selected === path.id ? path.accentColor : undefined,
                }}
                onMouseEnter={() => setHovered(path.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleSelect(path.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background image reveal on hover */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={path.image}
                    alt={path.title}
                    fill
                    className="object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-700 scale-110 group-hover:scale-100 transition-transform"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${path.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>

                {/* Glow accent line */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: path.accentColor }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hovered === path.id || selected === path.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <div className="text-5xl mb-5">{path.icon}</div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {path.title}
                  </h2>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">
                    {path.subtitle}
                  </p>

                  {/* Tagline */}
                  <div
                    className="text-xs font-semibold uppercase tracking-widest mb-6 transition-colors"
                    style={{ color: path.accentColor }}
                  >
                    {path.tagline}
                  </div>

                  {/* Stats */}
                  <div className="flex flex-col gap-1.5">
                    {path.stats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/40 text-xs group-hover:text-white/70 transition-colors">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: path.accentColor }}
                        />
                        {stat}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: path.accentColor }}
                    animate={{ x: hovered === path.id ? 4 : 0 }}
                  >
                    <span>Explore This Path</span>
                    <span>→</span>
                  </motion.div>
                </div>

                {/* Selected flash */}
                {selected === path.id && (
                  <motion.div
                    className="absolute inset-0"
                    style={{ backgroundColor: path.accentColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.15, 0] }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Skip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8"
        >
          <button
            onClick={onSkip}
            className="text-white/30 hover:text-white/60 text-sm transition-colors underline underline-offset-4"
          >
            Skip — show me everything
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
