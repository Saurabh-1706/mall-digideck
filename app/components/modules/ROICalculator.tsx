'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

type Category = 'Luxury Fashion' | 'Quick Service Food' | 'Electronics' | 'Fitness & Wellness' | 'Pop-up / Concept' | 'Corporate Sponsor';
type Tier = 'Premium Boulevard' | 'Luxury Wing' | 'Entertainment District' | 'Food Court';

const CATEGORIES: { label: Category; icon: string; desc: string }[] = [
  { label: 'Luxury Fashion',    icon: '💎', desc: 'Designer & premium apparel' },
  { label: 'Quick Service Food',icon: '🍽️', desc: 'Fast casual & QSR concepts' },
  { label: 'Electronics',       icon: '📱', desc: 'Tech, gadgets & accessories' },
  { label: 'Fitness & Wellness',icon: '⚡', desc: 'Gyms, spas & wellness brands' },
  { label: 'Pop-up / Concept',  icon: '✦',  desc: 'Limited-run activations' },
  { label: 'Corporate Sponsor', icon: '🏆', desc: 'Brand & venue sponsorships' },
];

const TIERS: Tier[] = ['Premium Boulevard', 'Luxury Wing', 'Entertainment District', 'Food Court'];

const FOOT_TRAFFIC: Record<Tier, number> = {
  'Premium Boulevard':     18_000_000,
  'Luxury Wing':           12_000_000,
  'Entertainment District':22_000_000,
  'Food Court':            28_000_000,
};

const CONVERSION: Record<Category, number> = {
  'Luxury Fashion':    0.042,
  'Quick Service Food':0.18,
  'Electronics':       0.031,
  'Fitness & Wellness':0.008,
  'Pop-up / Concept':  0.065,
  'Corporate Sponsor': 0.002,
};

const UNIT_SIZE: Record<Category, string> = {
  'Luxury Fashion':    '2,000 – 4,500 sqft',
  'Quick Service Food':'800 – 1,800 sqft',
  'Electronics':       '3,000 – 6,000 sqft',
  'Fitness & Wellness':'5,000 – 12,000 sqft',
  'Pop-up / Concept':  '400 – 1,200 sqft',
  'Corporate Sponsor': 'N/A — activation space',
};

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${(n / 1_000).toFixed(0)}K`;
}

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) { setVal(0); return; }
    const steps = 60;
    const step = target / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + step, target);
      setVal(cur);
      if (cur >= target) clearInterval(id);
    }, duration / steps);
    return () => clearInterval(id);
  }, [target, active]);
  return val;
}

interface Props { onClose: () => void; }

export default function ROICalculator({ onClose }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [dir, setDir]   = useState(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [txValue, setTxValue]   = useState('');
  const [tier, setTier]         = useState<Tier>('Premium Boulevard');

  const goTo = (s: 1 | 2 | 3, d: number) => { setDir(d); setStep(s); };

  const low  = category ? FOOT_TRAFFIC[tier] * CONVERSION[category] * Number(txValue) * 0.8 : 0;
  const high = category ? FOOT_TRAFFIC[tier] * CONVERSION[category] * Number(txValue) * 1.2 : 0;

  const lowCount  = useCountUp(low,  step === 3);
  const highCount = useCountUp(high, step === 3);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease } },
    exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.3 } }),
  };

  const mailto = `mailto:leasing@wem.ca?subject=Leasing Inquiry — ${category} at ${tier}&body=I'd like to learn more about ${category} leasing at West Edmonton Mall (${tier}).`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 800,
        background: 'rgba(4,4,4,0.97)',
        backdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: '1px solid #2a2a2a', color: '#6a6050', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', padding: '0.4rem 0.8rem', cursor: 'pointer' }}>
        ESC ✕
      </button>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#C8A96E', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          WEM · Revenue Opportunity Calculator
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ width: s === step ? '2rem' : '0.5rem', height: '2px', background: s <= step ? '#C8A96E' : '#2a2a2a', transition: 'all 0.4s ease', borderRadius: '2px' }} />
          ))}
        </div>
      </div>

      {/* Steps */}
      <div style={{ width: '100%', maxWidth: '760px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={dir}>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <motion.div key="s1" custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F5F0E8', fontWeight: 300, textAlign: 'center', marginBottom: '2rem' }}>
                What brings you to WEM?
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
                {CATEGORIES.map(c => (
                  <motion.button
                    key={c.label}
                    onClick={() => { setCategory(c.label); goTo(2, 1); }}
                    whileHover={{ scale: 1.02 }}
                    style={{
                      background: category === c.label ? 'rgba(200,169,110,0.1)' : 'rgba(20,20,20,0.8)',
                      border: `1px solid ${category === c.label ? '#C8A96E' : '#1e1e1e'}`,
                      padding: '1.5rem 1rem', textAlign: 'left', cursor: 'pointer',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#e8e0d0', fontWeight: 300, marginBottom: '0.25rem' }}>{c.label}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#6a6050' }}>{c.desc}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <motion.div key="s2" custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F5F0E8', fontWeight: 300, textAlign: 'center', marginBottom: '2.5rem' }}>
                Tell us about your operation.
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Transaction value */}
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.2em', color: '#C8A96E', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                    Avg. Transaction Value
                  </label>
                  <div style={{ display: 'flex', alignItems: 'baseline', borderBottom: '1px solid #2a2a2a', paddingBottom: '0.5rem' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#C8A96E', marginRight: '0.3rem' }}>$</span>
                    <input
                      type="number" min="1"
                      value={txValue}
                      onChange={e => setTxValue(e.target.value)}
                      placeholder="e.g. 85"
                      style={{ background: 'none', border: 'none', outline: 'none', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#F5F0E8', width: '100%', fontWeight: 300 }}
                    />
                  </div>
                </div>

                {/* Tier */}
                <div>
                  <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.2em', color: '#C8A96E', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                    Desired Location Tier
                  </label>
                  <select
                    value={tier}
                    onChange={e => setTier(e.target.value as Tier)}
                    style={{ background: '#141414', border: '1px solid #2a2a2a', color: '#e8e0d0', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', padding: '0.75rem', width: '100%', outline: 'none', cursor: 'pointer' }}
                  >
                    {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => goTo(1, -1)} style={{ background: 'none', border: 'none', color: '#6a6050', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', cursor: 'pointer' }}>
                  ← Change Category
                </button>
                <button
                  disabled={!txValue || Number(txValue) <= 0}
                  onClick={() => goTo(3, 1)}
                  className="btn-gold"
                  style={{ opacity: (!txValue || Number(txValue) <= 0) ? 0.4 : 1, fontSize: '0.65rem', padding: '0.85rem 2rem' }}
                >
                  <span>Calculate My Opportunity →</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <motion.div key="s3" custom={dir} variants={variants} initial="enter" animate="center" exit="exit">
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.25em', color: '#6a6050', textTransform: 'uppercase', textAlign: 'center', marginBottom: '0.5rem' }}>
                Estimated Annual Revenue Opportunity
              </p>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#C8A96E', fontWeight: 300, lineHeight: 1 }}>
                  {fmt(lowCount)} – {fmt(highCount)}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: '#6a6050', letterSpacing: '0.15em', marginTop: '0.4rem' }}>
                  {category} · {tier}
                </div>
              </div>

              {/* Stat pills */}
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Zone Annual Traffic', value: `${(FOOT_TRAFFIC[tier] / 1_000_000).toFixed(0)}M visitors` },
                  { label: 'Est. Conversion Rate', value: `${((CONVERSION[category!]) * 100).toFixed(1)}%` },
                  { label: 'Recommended Unit', value: UNIT_SIZE[category!] },
                ].map((s, i) => (
                  <div key={i} style={{ border: '1px solid #1e1e1e', background: 'rgba(20,20,20,0.8)', padding: '0.75rem 1.1rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.5rem', color: '#6a6050', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{s.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#e8e0d0', fontWeight: 300 }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Insight box */}
              <div style={{ border: '1px solid rgba(200,169,110,0.3)', background: 'rgba(200,169,110,0.04)', padding: '1.2rem 1.5rem', marginBottom: '2rem' }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#a09080', lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>
                  "{category} brands in the {tier} at WEM consistently report revenue-per-square-foot that outperforms their top standalone locations — driven by 32M annual visitors who arrive with intent to discover, experience, and spend."
                </p>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => goTo(1, -1)} style={{ background: 'none', border: 'none', color: '#6a6050', fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', cursor: 'pointer' }}>
                  ← Recalculate
                </button>
                <a href={mailto} className="btn-gold" style={{ fontSize: '0.65rem', padding: '0.85rem 1.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                  <span>Request Your Leasing Proposal →</span>
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
