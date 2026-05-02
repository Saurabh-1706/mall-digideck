'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props { onComplete: () => void; }

export default function LoadingScreen({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(onComplete, 1800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#080808',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      {/* WEM Monogram */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        style={{
          border: '1px solid #C8A96E',
          padding: '1.2rem 2rem',
          marginBottom: '3rem',
        }}
      >
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.5rem',
          fontWeight: 300,
          letterSpacing: '0.3em',
          color: '#C8A96E',
        }}>
          WEM
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#706860',
          marginBottom: '2.5rem',
        }}
      >
        West Edmonton Mall
      </motion.p>

      {/* Progress bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: '2px', background: '#1e1e1e',
      }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: [0.16,1,0.3,1] }}
          style={{ height: '100%', background: '#C8A96E' }}
        />
      </div>
    </div>
  );
}
