'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const TABS = ['Retail Leasing', 'Sponsorship', 'Events & Venues'] as const;
type Tab = typeof TABS[number];

const LEASING = [
  {
    tier: 'Flagship',
    space: '3,000–8,000 sq ft',
    traffic: '25K+ daily in zone',
    price: 'From $150/sq ft/yr',
    best: 'Luxury & premium brands seeking address status',
    icon: '♦',
  },
  {
    tier: 'Boutique',
    space: '1,500–4,000 sq ft',
    traffic: '80K+ daily main concourse',
    price: 'From $80/sq ft/yr',
    best: 'Contemporary fashion, beauty & lifestyle',
    icon: '◈',
  },
  {
    tier: 'Pop-Up',
    space: '200–1,500 sq ft',
    traffic: '100K+ daily',
    price: 'From $5K/month',
    best: 'Emerging brands, seasonal retail, market testing',
    icon: '⬟',
  },
];

const SPONSORSHIP = [
  {
    tier: 'Presenting Partner',
    price: '$500K+/yr',
    reach: '50M+ media reach',
    benefits: ['Naming rights', 'Year-round integration', '100 VIP tickets', 'Dedicated activation space', 'Quarterly ROI reports'],
  },
  {
    tier: 'Category Partner',
    price: '$250K–$500K/yr',
    reach: '25M+ media reach',
    benefits: ['Co-branding', 'Priority placement', '50 VIP tickets', 'Activation space', 'Bi-annual ROI reports'],
  },
  {
    tier: 'Activation Partner',
    price: '$25K–$100K',
    reach: '10M+ media reach',
    benefits: ['Single event', 'Branded display', '10 tickets', 'Limited space', 'Post-event summary'],
  },
];

const VENUES = [
  { name: 'Ice Palace Arena', capacity: '15,000', type: 'Concerts, Sports, Shows' },
  { name: 'World Waterpark', capacity: '5,000', type: 'Brand activations, Launches' },
  { name: 'Centre Court', capacity: '8,000', type: 'Expos, Festivals, Activations' },
  { name: 'Convention Hall', capacity: '20,000', type: 'Trade shows, Conferences' },
  { name: 'Galaxyland', capacity: '3,000', type: 'Corporate events, Team days' },
];

export default function CTASection() {
  const [activeTab, setActiveTab] = useState<Tab>('Retail Leasing');

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#080808', display: 'flex', flexDirection: 'column' }}>

      {/* Top content */}
      <div style={{ position: 'relative', zIndex: 1, padding: '80px 5% 0', flexShrink: 0 }}>
        <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '0.8rem' }}>
          Your Next Move
        </motion.p>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease }}
          style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '2rem' }}
        >
          Your next move <em className="display-italic" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>starts here.</em>
        </motion.h2>

        {/* Tab buttons */}
        <div style={{ display: 'flex', borderBottom: '1px solid #1e1e1e', gap: '0' }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.7rem 1.5rem',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: activeTab === tab ? '#C8A96E' : '#706860',
                borderBottom: activeTab === tab ? '2px solid #C8A96E' : '2px solid transparent',
                marginBottom: '-1px',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
            >{tab}</button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 5% 2rem', position: 'relative', zIndex: 1 }}>

        {activeTab === 'Retail Leasing' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}
          >
            {LEASING.map((l, i) => (
              <div
                key={i}
                className="card-lift"
                style={{ padding: '1.5rem', border: '1px solid #1e1e1e', background: '#141414' }}
              >
                <div style={{ fontSize: '1.2rem', color: '#C8A96E', marginBottom: '0.5rem' }}>{l.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#F5F0E8', fontWeight: 300, marginBottom: '0.8rem' }}>
                  {l.tier}
                </div>
                {[
                  ['Space', l.space],
                  ['Traffic', l.traffic],
                  ['Rate', l.price],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.4rem', marginBottom: '0.4rem', borderBottom: '1px solid #1e1e1e' }}>
                    <span className="eyebrow" style={{ fontSize: '0.52rem', color: '#706860' }}>{k}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#e8e0d0' }}>{v}</span>
                  </div>
                ))}
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#706860', marginTop: '0.6rem', lineHeight: 1.6 }}>{l.best}</p>
                <button
                  className="btn-gold"
                  style={{ marginTop: '1.2rem', fontSize: '0.6rem', padding: '0.6rem 1.2rem', width: '100%', justifyContent: 'center' }}
                  onClick={() => window.location.href = 'mailto:leasing@wem.ca?subject=Leasing Enquiry - ' + l.tier}
                ><span>Enquire →</span></button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'Sponsorship' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}
          >
            {SPONSORSHIP.map((s, i) => (
              <div
                key={i}
                className="card-lift"
                style={{ padding: '1.5rem', border: `1px solid ${i === 0 ? 'rgba(200,169,110,0.4)' : '#1e1e1e'}`, background: '#141414' }}
              >
                {i === 0 && <div className="eyebrow" style={{ fontSize: '0.5rem', color: '#C8A96E', marginBottom: '0.5rem' }}>Most Exclusive</div>}
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#F5F0E8', fontWeight: 300, marginBottom: '0.3rem' }}>{s.tier}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#C8A96E', marginBottom: '0.3rem' }}>{s.price}</div>
                <div className="eyebrow" style={{ fontSize: '0.52rem', marginBottom: '1rem', color: '#706860' }}>{s.reach}</div>
                {s.benefits.map((b, j) => (
                  <div key={j} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <span style={{ color: '#C8A96E', fontSize: '0.6rem', flexShrink: 0, marginTop: '0.1rem' }}>→</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#a09080' }}>{b}</span>
                  </div>
                ))}
                <button
                  className="btn-outline"
                  style={{ marginTop: '1.2rem', fontSize: '0.6rem', padding: '0.6rem 1.2rem', width: '100%', justifyContent: 'center' }}
                  onClick={() => window.location.href = 'mailto:partnerships@wem.ca?subject=Sponsorship Enquiry - ' + s.tier}
                >Discuss Partnership</button>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'Events & Venues' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {VENUES.map((v, i) => (
                <div
                  key={i}
                  className="card-lift"
                  style={{ padding: '1.2rem', border: '1px solid #1e1e1e', background: '#141414' }}
                >
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: '#F5F0E8', fontWeight: 300, marginBottom: '0.3rem' }}>{v.name}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#C8A96E' }}>{v.capacity}</div>
                  <div className="eyebrow" style={{ fontSize: '0.5rem', color: '#706860', marginBottom: '0.8rem' }}>max capacity</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: '#2a2a2a', letterSpacing: '0.05em' }}>{v.type}</div>
                </div>
              ))}
              {/* Book a Venue CTA card */}
              <div
                style={{
                  padding: '1.2rem',
                  border: '1px solid rgba(200,169,110,0.3)',
                  background: 'rgba(200,169,110,0.05)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => window.location.href = 'mailto:events@wem.ca?subject=Venue Booking Enquiry'}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#C8A96E', fontWeight: 300, marginBottom: '0.5rem' }}>
                  Book a Venue
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: '#706860', lineHeight: 1.6 }}>
                  Contact our events team for custom packages
                </p>
                <div style={{ marginTop: '0.8rem', color: '#C8A96E', fontSize: '1.2rem' }}>→</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #1e1e1e',
        padding: '1rem 5%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(8,8,8,0.9)',
        flexShrink: 0,
        zIndex: 1,
        flexWrap: 'wrap', gap: '0.5rem',
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.55rem', color: '#2a2a2a', letterSpacing: '0.1em' }}>
          8882 170 St NW, Edmonton, AB T5T 4J2 · leasing@wem.ca · partnerships@wem.ca · events@wem.ca
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.8rem',
          color: '#2a2a2a',
        }}>
          © {new Date().getFullYear()} West Edmonton Mall
        </div>
      </div>
    </div>
  );
}
