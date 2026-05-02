'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const ATTRACTIONS = [
  {
    name: 'Galaxyland',
    type: 'Indoor Amusement Park',
    desc: "The world's largest indoor amusement park — 27 rides and attractions, including roller coasters, a triple-loop ride, and family zones. Draws 2M+ visitors annually.",
    stat: '27 Rides',
    img: '/images/new/galaxyland.jpg',
    icon: '🎢',
  },
  {
    name: 'World Waterpark',
    type: 'Indoor Waterpark',
    desc: "The world's largest indoor wave pool spans 5 acres under a climate-controlled dome. Year-round tropical escape inside the mall — unprecedented for any retail destination.",
    stat: '5 Acre Wave Pool',
    img: '/images/new/world-water-park.jpg',
    icon: '🌊',
  },
  {
    name: 'Ice Palace',
    type: 'NHL-Spec Ice Rink',
    desc: "A full NHL-specification ice surface hosts public skating, hockey leagues, and figure skating. One of the few indoor arenas in the world inside a shopping centre.",
    stat: 'NHL Spec Rink',
    img: '/images/new/ice-palace.jpg',
    icon: '⛸️',
  },
  {
    name: 'Sea Life Caverns',
    type: 'Indoor Aquarium',
    desc: "Home to sea lions, sharks, tropical fish and interactive marine experiences with 100+ species. A world-class aquarium experience accessible without leaving the mall.",
    stat: '100+ Species',
    img: '/images/new/sea-life.jpg',
    icon: '🐠',
  },
];

export default function AttractionsSection() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#080808', display: 'flex' }}>

      {/* Left: tabs */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '45%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '80px 3% 60px 6%',
      }}>
        <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '0.8rem' }}>
          World-Class Attractions
        </motion.p>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease }}
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '2rem' }}
        >
          The world's most visited<br />
          <em className="display-italic" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>indoor destination.</em>
        </motion.h2>

        {/* Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {ATTRACTIONS.map((a, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease }}
              style={{
                display: 'flex', alignItems: 'flex-start',
                gap: '1rem', padding: '1rem 1.2rem',
                border: 'none', cursor: 'pointer',
                textAlign: 'left',
                borderLeft: i === active ? '2px solid #C8A96E' : '2px solid #1e1e1e',
                borderBottom: '1px solid #1e1e1e',
                transition: 'border-color 0.3s ease, background 0.3s ease',
                background: i === active ? 'rgba(200,169,110,0.05)' : 'transparent',
              }}
            >
              <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '0.1rem' }}>{a.icon}</span>
              <div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem', fontWeight: 500,
                  color: i === active ? '#C8A96E' : '#e8e0d0',
                  transition: 'color 0.3s ease',
                  marginBottom: '0.2rem',
                }}>{a.name}</div>
                <div className="eyebrow" style={{ fontSize: '0.52rem', color: '#706860' }}>{a.type}</div>

                <AnimatePresence>
                  {i === active && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: '0.6rem' }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease }}
                    >
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#706860', lineHeight: 1.7 }}>
                        {a.desc}
                      </p>
                      <div style={{
                        marginTop: '0.5rem',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.1rem', color: '#C8A96E',
                      }}>{a.stat}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right: crossfading image */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '58%', height: '100%', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={ATTRACTIONS[active].img}
            alt={ATTRACTIONS[active].name}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, ease }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AnimatePresence>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #080808 0%, rgba(8,8,8,0.3) 30%, rgba(8,8,8,0.0) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '2rem', right: '2rem',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          color: 'rgba(200,169,110,0.15)',
          fontWeight: 300,
          pointerEvents: 'none',
        }}>
          {ATTRACTIONS[active].stat}
        </div>
      </div>
    </div>
  );
}
