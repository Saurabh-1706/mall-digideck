'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

interface Props {
  isActive?: boolean;
  onNavigate?: (idx: number) => void;
}

const CATEGORIES = [
  'Luxury Fashion', 'Beauty & Wellness', 'Technology',
  'F&B / Restaurant', 'Entertainment', 'Sports',
  'Home & Living', 'Financial Services', 'Automotive', 'Other',
];
const GOALS = [
  'Open a Flagship', 'Launch a Pop-Up', 'Brand Sponsorship',
  'Event Activation', 'Corporate Event', 'Retail Expansion',
];

interface PitchResult {
  hook: string;
  opportunity: string;
  pitch: string;
  cta: string;
}

export default function PersonalizeSection({ onNavigate }: Props) {
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PitchResult | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!brand.trim()) { setError('Please enter your brand name.'); return; }
    if (!category) { setError('Please select a category.'); return; }
    if (!goal) { setError('Please select a goal.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/personalize', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ brand: brand.trim(), category, goal }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => { setResult(null); setBrand(''); setCategory(''); setGoal(''); setError(''); };

  const goTo = (idx: number) => {
    if (onNavigate) onNavigate(idx);
    else window.dispatchEvent(new CustomEvent('goToSlide', { detail: idx }));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Ambient background */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(200,169,110,0.04) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div className="personalize-inner" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '860px', padding: '80px 5% 40px', overflowY: 'auto', maxHeight: '100vh' }}>

        <AnimatePresence mode="wait">
          {!result ? (
            /* ── INPUT STATE ── */
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease }}
            >
              <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ marginBottom: '1rem' }}>
                The "I Need to Be Here" Moment
              </motion.p>
              <motion.h2
                className="display"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease }}
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', marginBottom: '0.5rem' }}
              >
                See why{' '}
                <em className="display-italic" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                  {brand || 'your brand'}
                </em>{' '}
                needs to be here.
              </motion.h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#706860', fontSize: '0.9rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                In under 3 seconds, we'll generate a personalised WEM pitch built around your brand and goals.
              </p>

              {/* Brand input */}
              <div style={{ marginBottom: '2rem' }}>
                <label className="eyebrow" style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.58rem' }}>Your Brand Name</label>
                <input
                  type="text"
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                  placeholder="e.g. Tesla, Sephora, Nike..."
                  onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #2a2a2a',
                    padding: '0.6rem 0',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.8rem',
                    color: '#F5F0E8',
                    fontWeight: 300,
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#C8A96E')}
                  onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                />
              </div>

              {/* Category chips */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="eyebrow" style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.58rem' }}>Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat === category ? '' : cat)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        border: `1px solid ${category === cat ? '#C8A96E' : '#2a2a2a'}`,
                        background: category === cat ? 'rgba(200,169,110,0.12)' : 'transparent',
                        color: category === cat ? '#C8A96E' : '#706860',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.58rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >{cat}</button>
                  ))}
                </div>
              </div>

              {/* Goal chips */}
              <div style={{ marginBottom: '2rem' }}>
                <label className="eyebrow" style={{ display: 'block', marginBottom: '0.6rem', fontSize: '0.58rem' }}>Business Goal</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {GOALS.map(g => (
                    <button
                      key={g}
                      onClick={() => setGoal(g === goal ? '' : g)}
                      style={{
                        padding: '0.4rem 0.85rem',
                        border: `1px solid ${goal === g ? '#C8A96E' : '#2a2a2a'}`,
                        background: goal === g ? 'rgba(200,169,110,0.12)' : 'transparent',
                        color: goal === g ? '#C8A96E' : '#706860',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: '0.58rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >{g}</button>
                  ))}
                </div>
              </div>

              {error && (
                <p style={{ color: '#e87040', fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', marginBottom: '1rem', letterSpacing: '0.08em' }}>
                  {error}
                </p>
              )}

              <button
                className="btn-gold"
                onClick={handleGenerate}
                disabled={loading}
                style={{ fontSize: '0.75rem', padding: '1rem 2.5rem' }}
              >
                <span>{loading ? 'Generating your pitch' : 'Generate My Pitch →'}</span>
                {loading && <span className="animate-blink" style={{ marginLeft: '2px' }}>|</span>}
              </button>
            </motion.div>

          ) : (
            /* ── RESULT STATE ── */
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>Your WEM Pitch — {brand}</p>

              {/* Hook */}
              <div style={{
                padding: '1.5rem 2rem',
                border: '1px solid rgba(200,169,110,0.6)',
                background: 'rgba(200,169,110,0.06)',
                marginBottom: '1.5rem',
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
                  color: '#F5F0E8',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                }}>
                  "{result.hook}"
                </p>
              </div>

              {/* 2-col grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1.2rem', border: '1px solid #1e1e1e', background: 'rgba(20,20,20,0.5)' }}>
                  <div className="eyebrow" style={{ fontSize: '0.55rem', marginBottom: '0.7rem' }}>The Opportunity</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: '#a09080', lineHeight: 1.7 }}>
                    {result.opportunity}
                  </p>
                </div>
                <div style={{ padding: '1.2rem', border: '1px solid #1e1e1e', background: 'rgba(20,20,20,0.5)' }}>
                  <div className="eyebrow" style={{ fontSize: '0.55rem', marginBottom: '0.7rem' }}>Why WEM Now</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: '#a09080', lineHeight: 1.7 }}>
                    {result.pitch}
                  </p>
                </div>
              </div>

              {/* Bottom CTA row */}
              <div style={{
                padding: '1.2rem 1.5rem',
                borderTop: '1px solid #1e1e1e',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
              }}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  color: '#C8A96E',
                  flex: 1,
                  lineHeight: 1.4,
                }}>
                  {result.cta}
                </p>
                <div style={{ display: 'flex', gap: '0.7rem', flexShrink: 0 }}>
                  <button className="btn-gold" style={{ fontSize: '0.65rem', padding: '0.7rem 1.4rem' }}
                    onClick={() => goTo(8)}
                  ><span>Start a Conversation</span></button>
                  <button className="btn-outline" style={{ fontSize: '0.65rem', padding: '0.7rem 1.4rem' }} onClick={handleReset}>
                    Try Another Brand
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
