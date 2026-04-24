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

      {/* Mobile overlay (darkens for better text) */}
      <div className="md:hidden absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Full screen gradient blending from dark left to transparent right */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.60) 40%, rgba(10,10,10,0) 80%)',
        }}
      />

      {/* ── BRANDING CONTENT ── */}
      <div className="relative z-20 flex flex-col justify-between h-full w-full lg:w-1/2 px-6 md:px-12 lg:px-20 py-6 md:py-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {/* Top: Brand label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="w-10 h-px bg-accent mb-2 md:mb-4" />
          <p className="text-accent/80 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium">
            West Edmonton Mall
          </p>
        </motion.div>

        {/* Middle: Headline + stats + CTA */}
        <div className="my-auto py-2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-none tracking-tighter mb-3 md:mb-6"
          >
            North
            <br />
            America&apos;s
            <br />
            <span className="text-accent">Largest</span>
            <br />
            Mall.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-xs md:max-w-sm mb-4 md:mb-8"
          >
            5.3M sq ft · 800+ stores · 30M annual visitors ·
            Edmonton, Alberta
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-10"
          >
            {[
              { val: '800+', label: 'Stores' },
              { val: '30M+', label: 'Visitors' },
              { val: '20+',  label: 'Attractions' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xl sm:text-2xl font-bold text-accent">{s.val}</div>
                <div className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Enter button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8 }}
            onClick={onEnter}
            className="group relative px-6 md:px-10 py-3 md:py-4 bg-accent hover:bg-accent-hover text-primary font-bold text-xs md:text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/40"
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

        {/* Bottom: Address */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="text-white/25 text-[10px] md:text-xs uppercase tracking-[0.25em]"
        >
          8882 170 St NW · Edmonton, AB
        </motion.div>
      </div>

      {/* Bottom-right floating tag */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="hidden md:block absolute bottom-8 right-8 text-right z-10"
      >
        <div className="text-white/40 text-xs uppercase tracking-[0.25em]">Edmonton, Alberta</div>
        <div className="text-white/60 text-sm font-light">Since 1981</div>
      </motion.div>

    </div>
  );
}
