'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

type Phase = 'entry' | 'intro' | 'exit';

const ease = [0.16, 1, 0.3, 1] as const;

export default function IntroVideo({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('entry');
  const [showSkip, setShowSkip] = useState(false);
  const [muted, setMuted] = useState(true);
  const introVideoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => setPhase('intro');

  const handleExit = () => {
    if (phase === 'exit') return;
    setPhase('exit');
  };

  const handleVideoPlay = () => {
    setTimeout(() => setShowSkip(true), 3000);
  };

  const toggleMute = () => {
    const video = introVideoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: '#000', overflow: 'hidden' }}>
      <AnimatePresence mode="wait" onExitComplete={() => phase === 'exit' && onComplete()}>

        {/* ══════════════════════════════════════════
            PHASE 1 — ENTRY SCREEN
            Ambient loop + bottom-center ENTER button
        ═══════════════════════════════════════════ */}
        {phase === 'entry' && (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {/* Ambient looping video */}
            <video
              src="/videos/sequence-03-1.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                width: '177.78vh', height: '100vh',
                minWidth: '100vw', minHeight: '56.25vw',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                objectFit: 'cover',
              }}
            />

            {/* Dark overlays */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.88) 100%)',
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
            }} />

            {/* WEM wordmark — top left */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease }}
              style={{
                position: 'absolute', top: '2.5rem', left: '3rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}
            >
              <div style={{
                width: '44px', height: '44px',
                border: '1px solid rgba(200,169,110,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: '#C8A96E', letterSpacing: '0.05em' }}>WEM</span>
              </div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.58rem', color: 'rgba(200,169,110,0.7)',
                letterSpacing: '0.25em', textTransform: 'uppercase',
              }}>
                West Edmonton Mall
              </div>
            </motion.div>

            {/* ── ENTER BUTTON — bottom center ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.9, ease }}
              style={{
                position: 'absolute',
                bottom: '3.5rem',
                left: 0,
                right: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.2rem',
              }}
            >
              {/* Tagline above button */}
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.52rem',
                color: 'rgba(200,169,110,0.35)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                5.3M sq ft · 32M Annual Visitors · 800+ Stores
              </div>

              <motion.button
                onClick={handleEnter}
                style={{
                  padding: '1rem 4.5rem',
                  border: '1px solid #C8A96E',
                  background: 'transparent',
                  color: '#C8A96E',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.72rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.3s ease',
                }}
                whileHover={{ background: 'rgba(200,169,110,0.12)', scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                Enter
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════
            PHASE 2 — INTRO VIDEO
            sequence-01.mp4 fullscreen + Skip + Sound
        ═══════════════════════════════════════════ */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease }}
            style={{ position: 'absolute', inset: 0 }}
          >
            {/* Main intro video */}
            <video
              ref={introVideoRef}
              src="/videos/sequence-01.mp4"
              autoPlay
              muted
              playsInline
              onPlay={handleVideoPlay}
              onEnded={handleExit}
              style={{
                position: 'absolute',
                width: '177.78vh', height: '100vh',
                minWidth: '100vw', minHeight: '56.25vw',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                objectFit: 'cover',
              }}
            />

            {/* Gradient overlays */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 80%, rgba(0,0,0,0.6) 100%)',
              pointerEvents: 'none',
            }} />

            {/* WEM wordmark — top left */}
            <div style={{
              position: 'absolute', top: '2.5rem', left: '3rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
              opacity: 0.8,
            }}>
              <div style={{
                width: '40px', height: '40px',
                border: '1px solid rgba(200,169,110,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: '#C8A96E' }}>WEM</span>
              </div>
            </div>

            {/* ── Bottom-right controls: Sound + Skip Intro ── */}
            <AnimatePresence>
              {showSkip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{
                    position: 'absolute',
                    bottom: '2.5rem', right: '3rem',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-end', gap: '0.6rem',
                  }}
                >
                  {/* Sound toggle — above Skip Intro */}
                  <button
                    onClick={toggleMute}
                    title={muted ? 'Unmute' : 'Mute'}
                    style={{
                      background: 'rgba(0,0,0,0.45)',
                      border: '1px solid rgba(200,169,110,0.45)',
                      color: 'rgba(200,169,110,0.85)',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.62rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '0.65rem 1.5rem',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      transition: 'border-color 0.2s, color 0.2s',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={e => {
                      const b = e.currentTarget;
                      b.style.borderColor = '#C8A96E';
                      b.style.color = '#C8A96E';
                    }}
                    onMouseLeave={e => {
                      const b = e.currentTarget;
                      b.style.borderColor = 'rgba(200,169,110,0.45)';
                      b.style.color = 'rgba(200,169,110,0.85)';
                    }}
                  >
                    {muted ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                          <line x1="23" y1="9" x2="17" y2="15"/>
                          <line x1="17" y1="9" x2="23" y2="15"/>
                        </svg>
                        Sound Off
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                        </svg>
                        Sound On
                      </>
                    )}
                  </button>

                  {/* Skip Intro */}
                  <button
                    onClick={handleExit}
                    style={{
                      background: 'rgba(0,0,0,0.45)',
                      border: '1px solid rgba(200,169,110,0.45)',
                      color: 'rgba(200,169,110,0.85)',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.62rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '0.65rem 1.5rem',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      transition: 'border-color 0.2s, color 0.2s',
                      width: '100%',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={e => {
                      const b = e.currentTarget;
                      b.style.borderColor = '#C8A96E';
                      b.style.color = '#C8A96E';
                    }}
                    onMouseLeave={e => {
                      const b = e.currentTarget;
                      b.style.borderColor = 'rgba(200,169,110,0.45)';
                      b.style.color = 'rgba(200,169,110,0.85)';
                    }}
                  >
                    Skip Intro
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 2L7 5L2 8V2Z" fill="currentColor"/>
                      <line x1="8" y1="2" x2="8" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Exit phase — black fade out */}
        {phase === 'exit' && (
          <motion.div
            key="exit"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease }}
            style={{ position: 'absolute', inset: 0, background: '#000' }}
          />
        )}

      </AnimatePresence>
    </div>
  );
}
