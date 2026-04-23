'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, SkipForward } from 'lucide-react';
import { VIDEO_URLS } from '../lib/constants';

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Video (16:9 aspect ratio, centered) */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <div className="relative w-full h-full max-w-[177.78vh] max-h-[56.25vw]">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnd}
            onLoadedData={() => setIsLoaded(true)}
          >
            <source src={VIDEO_URLS.intro} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Controls - Responsive positioning */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        {/* Sound Toggle */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-black/60 backdrop-blur-sm border border-white/20 hover:border-accent text-white hover:text-accent transition-all duration-300 text-sm"
        >
          {isMuted ? <VolumeX size={16} className="sm:w-5 sm:h-5" /> : <Volume2 size={16} className="sm:w-5 sm:h-5" />}
          <span className="hidden sm:inline text-sm font-medium">{isMuted ? 'Sound Off' : 'Sound On'}</span>
        </button>

        {/* Skip Button */}
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-accent hover:bg-accent-hover text-primary font-bold transition-all duration-300 hover:scale-105 text-sm"
        >
          <SkipForward size={16} className="sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm uppercase tracking-wider">Skip Intro</span>
          <span className="sm:hidden text-xs uppercase tracking-wider">Skip</span>
        </button>
      </div>

      {/* WEM Logo/Branding - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-8 left-8"
      >
        <div className="text-white text-2xl font-bold tracking-tight">
          West Edmonton <span className="text-accent">Mall</span>
        </div>
      </motion.div>

      {/* Loading Overlay (Optional - doesn't hide controls) */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            <div className="text-accent text-sm uppercase tracking-widest">Loading...</div>
          </div>
        </div>
      )}
    </div>
  );
}
