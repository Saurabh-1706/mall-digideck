'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isActive?: boolean;
  onNavigate?: (idx: number) => void;
}

const STATS = [
  { value: '32M+', label: 'Annual Visitors' },
  { value: '5.3M', label: 'Square Feet' },
  { value: '800+', label: 'Stores' },
  { value: '#1', label: 'In North America' },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection({ isActive, onNavigate }: Props) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setEntered(true), 50);
      return () => clearTimeout(t);
    } else {
      setEntered(false);
    }
  }, [isActive]);

  const goTo = (idx: number) => {
    if (onNavigate) onNavigate(idx);
    else window.dispatchEvent(new CustomEvent('goToSlide', { detail: idx }));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#080808' }}>

      {/* ── Video / Image Background ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <iframe
          src="https://www.youtube.com/embed/D5e0gJFQmVY?autoplay=1&mute=1&loop=1&controls=0&playsinline=1&rel=0&playlist=D5e0gJFQmVY&modestbranding=1"
          style={{
            position: 'absolute',
            width: '120%', height: '120%',
            top: '-10%', left: '-10%',
            border: 'none',
            pointerEvents: 'none',
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <img
          src="/images/hero-v2.png"
          alt="West Edmonton Mall"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            animation: 'kenBurns 8s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        />
      </div>

      {/* ── Overlays ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.5)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to right, rgba(8,8,8,0.8) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 50%)' }} />

      {/* ── Content ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 5% 120px',
        maxWidth: '900px',
      }}>
        {/* Eyebrow */}
        <AnimatePresence>
          {entered && (
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
              style={{ marginBottom: '1.5rem' }}
            >
              Edmonton, Alberta · Est. 1981 · North America's Largest Mall
            </motion.p>
          )}
        </AnimatePresence>

        {/* H1 */}
        <AnimatePresence>
          {entered && (
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.5 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <div className="display" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 0.92 }}>Where the</div>
              <div className="display" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 0.92 }}>
                <em className="display-italic" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}>World</em>
              </div>
              <div className="display" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', lineHeight: 0.92 }}>Shops.</div>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Body */}
        <AnimatePresence>
          {entered && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.8 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                color: '#a09080',
                maxWidth: '540px',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
              }}
            >
              32 million annual visitors. 5.3 million square feet. The most powerful commercial platform on the continent.
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTAs */}
        <AnimatePresence>
          {entered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.0 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <button className="btn-gold" onClick={() => goTo(1)}>
                <span>Explore the Opportunity →</span>
              </button>
              <button className="btn-outline" onClick={() => goTo(7)}>
                Your Brand Here
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom stat bar ── */}
      <AnimatePresence>
        {entered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.3 }}
            style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              zIndex: 3,
              background: 'rgba(8,8,8,0.7)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid #1e1e1e',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              padding: '1.2rem 3rem',
            }}
          >
            {STATS.map((s, i) => (
              <div key={i} style={{
                textAlign: 'center',
                borderRight: i < 3 ? '1px solid #1e1e1e' : 'none',
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  color: '#C8A96E',
                  fontWeight: 300,
                }}>{s.value}</div>
                <div className="eyebrow" style={{ fontSize: '0.55rem', marginTop: '0.25rem' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
