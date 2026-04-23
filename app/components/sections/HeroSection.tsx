'use client';

import { motion } from 'framer-motion';
import VideoBackground from '../ui/VideoBackground';
import { VIDEO_URLS, IMAGE_URLS } from '../../lib/constants';

export default function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <VideoBackground
        src={VIDEO_URLS.hero}
        imageSrc={IMAGE_URLS.hero[0]}
        overlay="bg-gradient-to-b from-black/60 via-black/40 to-black/80"
        kenBurns={true}
      >
        {/* Content - Minimal, like a cover slide */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-8xl md:text-[10rem] lg:text-[14rem] font-bold text-white mb-6 tracking-tighter leading-none"
            >
              West Edmonton
              <br />
              <span className="bg-gradient-to-r from-accent via-accent-hover to-accent bg-clip-text text-transparent">
                Mall
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="text-2xl md:text-3xl text-white/80 max-w-3xl mx-auto font-light tracking-wider"
            >
              The World's Most Immersive Retail Destination
            </motion.p>
          </motion.div>

          {/* Bottom info - minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-xs text-white/60 uppercase tracking-[0.4em] font-light">
                Scroll to Explore
              </span>
              <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </VideoBackground>
    </section>
  );
}
