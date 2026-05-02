'use client';

import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const BRANDS = [
  'Louis Vuitton', 'Gucci', 'Hermès', 'Tiffany & Co.',
  'Prada', 'Burberry', 'Valentino', 'Bottega Veneta',
];

const STATS = [
  { value: '60+', label: 'Luxury Boutiques' },
  { value: '$180K', label: 'Avg HNW Visitor Spend' },
  { value: 'AAA', label: 'Zone Classification' },
];

export default function LuxurySection() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#080808', display: 'flex' }}>

      {/* Right: full-bleed image */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%' }}>
        <img
          src="/images/wem-real-luxury.jpg"
          alt="WEM Luxury Wing"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #080808 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.0) 100%)',
        }} />
      </div>

      {/* Left: content */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '55%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '80px 4% 60px 6%',
      }}>
        <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '1rem' }}>
          The Luxury Wing
        </motion.p>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease }}
          style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', marginBottom: '1.2rem' }}
        >
          The address<br />
          <em className="display-italic" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}>luxury demands.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: "'DM Sans', sans-serif", color: '#706860', fontSize: '0.95rem', maxWidth: '380px', lineHeight: 1.7, marginBottom: '2rem' }}
        >
          WEM's luxury corridor attracts high-net-worth visitors from across Canada and internationally, creating a premium captive audience that no standalone luxury address can replicate.
        </motion.p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7, ease }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                color: '#C8A96E', fontWeight: 300,
              }}>{s.value}</div>
              <div className="eyebrow" style={{ fontSize: '0.55rem' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Brand names grid */}
        <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '0.8rem', fontSize: '0.55rem', color: '#2a2a2a' }}>
          Flagship Neighbours
        </motion.p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', maxWidth: '380px' }}>
          {BRANDS.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5, ease }}
              style={{
                padding: '0.6rem 0.8rem',
                border: '1px solid #1e1e1e',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                color: '#706860',
                cursor: 'default',
                transition: 'border-color 0.25s ease, color 0.25s ease',
              }}
              whileHover={{ borderColor: '#C8A96E', color: '#C8A96E' }}
            >
              {brand}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
          style={{ marginTop: '2rem', paddingLeft: '1rem', borderLeft: '1px solid rgba(200,169,110,0.4)' }}
        >
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.95rem', color: '#706860', lineHeight: 1.6 }}>
            "Positioning inside WEM's luxury wing commands immediate brand equity in Canada's most visited retail destination."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
