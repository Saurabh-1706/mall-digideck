'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, visible } = useInView();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const dur = 1800, start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const DEMO_BARS = [
  { label: 'Ages 18–34', pct: 38, color: '#C8A96E' },
  { label: 'Ages 35–54', pct: 35, color: '#C8A96E' },
  { label: 'Ages 55+',   pct: 27, color: '#C8A96E' },
];
const ORIGIN_BARS = [
  { label: 'Local Edmonton', pct: 45, color: '#C8A96E' },
  { label: 'Alberta',        pct: 30, color: '#8a7040' },
  { label: 'National',       pct: 15, color: '#8a7040' },
  { label: 'International',  pct: 10, color: '#8a7040' },
];

const MARQUEE_ITEMS = [
  '5.3M Square Feet', '800+ Stores', '32M Annual Visitors', '110+ Dining Outlets',
  'Est. 1981', 'NHL-Spec Ice Rink', 'Indoor Waterpark', 'World-Class Aquarium',
  '20+ Attractions', '$180K HNW Visitor Spend', '50M Media Reach',
  '5.3M Square Feet', '800+ Stores', '32M Annual Visitors', '110+ Dining Outlets',
  'Est. 1981', 'NHL-Spec Ice Rink', 'Indoor Waterpark', 'World-Class Aquarium',
  '20+ Attractions', '$180K HNW Visitor Spend', '50M Media Reach',
];

function BarChart({ bars }: { bars: typeof DEMO_BARS }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {bars.map((b, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.15em', color: '#706860', textTransform: 'uppercase' }}>{b.label}</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', color: '#C8A96E' }}>{b.pct}%</span>
          </div>
          <div style={{ height: '2px', background: '#1e1e1e', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: b.color,
              width: visible ? `${b.pct}%` : '0%',
              transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ScaleSection() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#080808', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

      {/* Faint bg image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/images/wem-aerial.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.06 }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '80px 5% 0', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: '480px' }}>
            <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '1rem' }}>
              The Numbers
            </motion.p>
            <motion.h2
              className="display"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.9, ease }}
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1rem' }}
            >
              Not a mall.<br />
              <em className="display-italic" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>A city</em><br />
              unto itself.
            </motion.h2>
          </div>

          {/* Counters */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: '1', maxWidth: '480px' }}>
            {[
              { target: 32, suffix: 'M+', label: 'Annual Visitors' },
              { target: 5, suffix: '.3M sqft', label: 'Total Floor Area' },
              { target: 800, suffix: '+', label: 'Retail Stores' },
              { target: 110, suffix: '+', label: 'Dining Outlets' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7, ease }}
                style={{ padding: '1.2rem', border: '1px solid #1e1e1e', background: 'rgba(20,20,20,0.5)' }}
              >
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  color: '#C8A96E', fontWeight: 300,
                }}>
                  <Counter target={s.target} suffix={s.suffix} />
                </div>
                <div className="eyebrow" style={{ fontSize: '0.55rem', marginTop: '0.3rem' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Demographic bars */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '960px' }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <p className="eyebrow" style={{ marginBottom: '0.8rem', fontSize: '0.58rem' }}>Visitor Age Demographics</p>
            <BarChart bars={DEMO_BARS} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.1 }}>
            <p className="eyebrow" style={{ marginBottom: '0.8rem', fontSize: '0.58rem' }}>Visitor Origin</p>
            <BarChart bars={ORIGIN_BARS} />
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        borderTop: '1px solid #1e1e1e',
        background: 'rgba(8,8,8,0.8)',
        overflow: 'hidden',
        padding: '0.9rem 0',
        zIndex: 2,
      }}>
        <div className="marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '4rem' }}>
              <span className="eyebrow" style={{ fontSize: '0.6rem', color: i % 3 === 0 ? '#C8A96E' : '#706860' }}>{item}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#2a2a2a', flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
