'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

interface Props {
  isActive?: boolean;
  onNavigate?: (idx: number) => void;
}

const BRANDS = [
  'Louis Vuitton', 'Gucci', 'Hermès', 'Tiffany & Co.',
  'Prada', 'Burberry', 'Valentino', 'Bottega Veneta',
];

const STATS = [
  { value: '60+',   label: 'Luxury Boutiques' },
  { value: '$180K', label: 'Avg HNW Visitor Spend' },
  { value: 'AAA',   label: 'Zone Classification' },
];

export default function LuxurySection({ isActive }: Props) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setEntered(true), 80);
      return () => clearTimeout(t);
    } else {
      setEntered(false);
    }
  }, [isActive]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#080808', display: 'flex' }}>

      {/* Right full-bleed image collage */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Primary: luxury3.png — full height left 70% */}
        <div style={{ position: 'absolute', inset: 0, width: '70%', height: '100%' }}>
          <img
            src="/images/new/luxury3.png"
            alt="WEM Luxury Wing"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        {/* Secondary stack: right 30% split vertically */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '30%', height: '50%', borderBottom: '2px solid #080808' }}>
          <img
            src="/images/new/luxury1.jpg"
            alt="WEM Luxury Boutique"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <div style={{ position: 'absolute', right: 0, bottom: 0, width: '30%', height: '50%' }}>
          <img
            src="/images/new/luxury2.webp"
            alt="WEM Luxury Interior"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        {/* Gradient toward left content */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #080808 0%, rgba(8,8,8,0.55) 30%, rgba(8,8,8,0.05) 70%, rgba(8,8,8,0.15) 100%)' }} />
        {/* Subtle dark vignette top & bottom */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, transparent 20%, transparent 80%, rgba(8,8,8,0.4) 100%)' }} />
      </div>


      {/* Left content */}
      <div style={{ position: 'relative', zIndex: 2, width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 4% 80px 6%' }}>
        <motion.p className="eyebrow"
          initial={{ opacity: 0 }} animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }} style={{ marginBottom: '1rem' }}>
          The Luxury Wing
        </motion.p>
        <motion.h2 className="display"
          initial={{ opacity: 0, y: 30 }} animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', marginBottom: '1.2rem' }}>
          The address<br />
          <em className="display-italic" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}>luxury demands.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: "'DM Sans', sans-serif", color: '#706860', fontSize: '0.95rem', maxWidth: '380px', lineHeight: 1.7, marginBottom: '2rem' }}>
          WEM's luxury corridor attracts high-net-worth visitors from across Canada and internationally, creating a premium captive audience that no standalone luxury address can replicate.
        </motion.p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {STATS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.35 + i * 0.12, duration: 0.7, ease }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#C8A96E', fontWeight: 300 }}>{s.value}</div>
              <div className="eyebrow" style={{ fontSize: '0.55rem' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Brand grid */}
        <motion.p className="eyebrow"
          initial={{ opacity: 0 }} animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }} style={{ marginBottom: '0.8rem', fontSize: '0.55rem', color: '#2a2a2a' }}>
          Flagship Neighbours
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', maxWidth: '380px' }}>
          {BRANDS.map((brand, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }} animate={entered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ delay: 0.75 + i * 0.07, duration: 0.5, ease }}
              style={{ padding: '0.6rem 0.8rem', border: '1px solid #1e1e1e', fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#706860', cursor: 'default', transition: 'border-color 0.25s ease, color 0.25s ease' }}
              whileHover={{ borderColor: '#C8A96E', color: '#C8A96E' } as never}>
              {brand}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
          style={{ marginTop: '2rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(200,169,110,0.4)' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.95rem', color: '#706860', lineHeight: 1.6 }}>
            "Positioning inside WEM's luxury wing commands immediate brand equity in Canada's most visited retail destination."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
