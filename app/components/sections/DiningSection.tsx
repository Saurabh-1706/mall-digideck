'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

interface Props {
  isActive?: boolean;
  onNavigate?: (idx: number) => void;
}

const CARDS = [
  {
    label: 'Fine Dining',
    count: '15+',
    desc: "From James Beard-calibre tasting menus to elevated casual experiences — WEM's fine dining draws dedicated dinner audiences from across Alberta.",
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

export default function DiningSection({ isActive }: Props) {
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setEntered(true), 80);
      return () => clearTimeout(t);
    } else {
      setEntered(false);
    }
  }, [isActive]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0d0d0d', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, padding: '72px 5% 1.5rem', flexShrink: 0 }}>
        <motion.p className="eyebrow"
          initial={{ opacity: 0 }} animate={entered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }} style={{ marginBottom: '0.6rem' }}>
          Dining & Lifestyle
        </motion.p>
        <motion.h2 className="display"
          initial={{ opacity: 0, y: 25 }} animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
          Food is the{' '}<em className="display-italic" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>destination.</em>
        </motion.h2>
      </div>

      {/* 3-panel cards — full height remaining */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', minHeight: 0 }}>
        {CARDS.map((card, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }} animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.25 + i * 0.12, duration: 0.8, ease }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRight: i < 2 ? '1px solid #1e1e1e' : 'none',
              cursor: 'default',
            }}>
            {/* Full-height image */}
            <div style={{
              position: 'absolute', inset: 0,
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered === i ? 'scale(1.06)' : 'scale(1)',
            }}>
              <img src={card.img} alt={card.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Normal overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.15) 100%)',
              transition: 'opacity 0.4s ease',
              opacity: hovered === i ? 0.7 : 1,
            }} />

            {/* Hover brightening */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(200,169,110,0.06)',
              opacity: hovered === i ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }} />

            {/* Text slides up on hover */}
            <div style={{
              position: 'absolute',
              left: 0, right: 0,
              bottom: 0,
              padding: '1.5rem',
              transform: hovered === i ? 'translateY(0)' : 'translateY(8px)',
              transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
              zIndex: 2,
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                marginBottom: '0.5rem',
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#F5F0E8', fontWeight: 300 }}>{card.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#C8A96E', fontWeight: 300 }}>{card.count}</div>
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#a09080', lineHeight: 1.6,
                maxHeight: hovered === i ? '80px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease, opacity 0.4s ease',
                opacity: hovered === i ? 1 : 0,
              }}>
                {card.desc}
              </p>
              <div className="eyebrow" style={{ fontSize: '0.5rem', color: '#C8A96E', marginTop: '0.5rem' }}>{card.stat}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pull quote strip */}
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={entered ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: 0.7, duration: 0.8, ease }}
        style={{
          flexShrink: 0,
          padding: '1rem 5%',
          borderTop: '1px solid #1e1e1e',
          paddingLeft: 'calc(5% + 1.5rem)',
          borderLeft: 'none',
          background: 'rgba(8,8,8,0.9)',
          position: 'relative',
          marginBottom: 0,
        }}>
        <div style={{ position: 'absolute', left: '5%', top: 0, bottom: 0, width: '2px', background: 'rgba(200,169,110,0.4)' }} />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)', color: '#a09080', lineHeight: 1.5 }}>
          "WEM's dining program generates more than 40% of repeat visits — one of the most powerful F&B draws of any enclosed property on the continent."
        </p>
      </motion.div>
    </div>
  );
}
