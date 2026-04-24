'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VIDEO_URLS } from '../lib/constants';

interface EntryScreenProps {
  onEnter: () => void;
}

export default function EntryScreen({ onEnter }: EntryScreenProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* ── FULL-SCREEN VIDEO ── */}
      <div className="absolute inset-0 bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={VIDEO_URLS.hero} type="video/mp4" />
        </video>
      </div>

      {/* Subtle overlay so the button stands out */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* ── BOTTOM RIGHT BUTTON ── */}
      <div className="absolute z-20 bottom-8 right-8 md:bottom-12 md:right-12">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
          onClick={onEnter}
          className="group relative px-5 md:px-8 py-2.5 md:py-3 bg-accent hover:bg-accent-hover text-primary font-bold text-xs md:text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/40"
        >
          <span className="relative z-10">Enter Experience</span>
          <motion.div
            className="absolute inset-0 bg-white/15"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{ originX: 0 }}
          />
        </motion.button>
      </div>
    </div>
  );
}
