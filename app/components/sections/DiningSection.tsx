'use client';

import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const CARDS = [
  {
    label: 'Fine Dining',
    count: '15+',
    desc: "From James Beard-calibre tasting menus to elevated casual experiences \u2014 WEM's fine dining draws dedicated dinner audiences from across Alberta.",
    img: '/images/dining-1.jpg',
    stat: '90–120 min avg dwell',
  },
  {
    label: 'Casual Dining',
    count: '60+',
    desc: 'Family-friendly concepts, celebrated chains, and independent operators create a dining mix that serves every visit occasion.',
    img: '/images/wem-real-dining.jpg',
    stat: '60–90 min avg dwell',
  },
  {
    label: 'Quick Service',
    count: '35+',
    desc: "High-throughput quick service locations capitalise on WEM's 100K+ daily foot traffic to deliver consistent, predictable revenue.",
    img: '/images/dining-3.jpg',
    stat: '30–45 min avg dwell',
  },
];

export default function DiningSection() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0d0d0d', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      <div style={{ position: 'relative', zIndex: 1, padding: '80px 5% 40px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: '2rem' }}>

        {/* Header */}
        <div>
          <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '0.8rem' }}>
            Dining & Lifestyle
          </motion.p>
          <motion.h2
            className="display"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Food is the <em className="display-italic" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>destination.</em>
          </motion.h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.8, ease }}
              className="card-lift"
              style={{
                border: '1px solid #1e1e1e',
                background: '#141414',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Image */}
              <div style={{ height: '180px', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={card.img}
                  alt={card.label}
                  className="card-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* Text */}
              <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.4rem', color: '#F5F0E8', fontWeight: 300,
                  }}>{card.label}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.8rem', color: '#C8A96E', fontWeight: 300,
                  }}>{card.count}</div>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: '#706860', lineHeight: 1.7, flex: 1 }}>
                  {card.desc}
                </p>
                <div className="eyebrow" style={{ fontSize: '0.52rem', color: '#2a2a2a', marginTop: '0.8rem' }}>
                  {card.stat}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8, ease }}
          style={{ paddingLeft: '1.5rem', borderLeft: '2px solid rgba(200,169,110,0.5)', maxWidth: '680px' }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
            color: '#a09080',
            lineHeight: 1.5,
          }}>
            "WEM's dining program generates more than 40% of repeat visits, making it one of the most powerful food & beverage draws of any enclosed property on the continent."
          </p>
        </motion.div>
      </div>
    </div>
  );
}
