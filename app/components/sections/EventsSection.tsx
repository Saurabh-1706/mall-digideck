'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const EVENT_TYPES = [
  { icon: '🎤', name: 'Concerts', capacity: '15K seats' },
  { icon: '🚀', name: 'Brand Activations', capacity: '5–10K reach' },
  { icon: '🏢', name: 'Corporate Events', capacity: '2–5K capacity' },
  { icon: '📱', name: 'Product Launches', capacity: 'National media' },
  { icon: '⚡', name: 'Sports Events', capacity: 'NHL-spec arena' },
  { icon: '🎪', name: 'Festivals & Expos', capacity: '20K+ floor' },
];

const HOTSPOTS = [
  { label: 'Centre Court',      top: '38%', left: '44%', traffic: '80K/day',  type: 'Brand Activation Hub',   brand: 'Nike · Tesla · Samsung', capacity: '8,000' },
  { label: 'Ice Palace Arena',  top: '68%', left: '24%', traffic: '40K/day',  type: 'Concerts & Sports',      brand: 'RBC · Scotiabank · Bell',  capacity: '15,000' },
  { label: 'Waterpark Terrace', top: '72%', left: '72%', traffic: '30K/day',  type: 'Experiential Popup',     brand: 'Lululemon · GoPro · RedBull', capacity: '5,000' },
  { label: 'Main Entry Plaza',  top: '22%', left: '50%', traffic: '100K/day', type: 'Brand Gateway',          brand: 'Apple · Mercedes · Rolex',  capacity: '20,000' },
  { label: 'Galaxyland Floor',  top: '52%', left: '80%', traffic: '40K/day',  type: 'Immersive Sponsorship',  brand: 'RedBull · Adidas · Sony',   capacity: '3,000' },
];

function SponsorshipMapSVG({ active, onSelect }: { active: number | null; onSelect: (i: number) => void }) {
  const border = '#232323';
  const dimBorder = '#1a1a1a';
  const corridor = '#1c1c1c';
  const t = 'all 0.35s ease';
  const gold = '#C8A96E';
  const aF = (i: number) => active === i ? 'rgba(200,169,110,0.18)' : 'rgba(20,20,20,0.5)';
  const aS = (i: number) => active === i ? gold : border;
  const aW = (i: number) => active === i ? 1.8 : 0.7;

  return (
    <svg viewBox="0 0 520 370" style={{ width: '100%', height: 'auto', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sg" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#111" strokeWidth="0.4"/>
        </pattern>
        <radialGradient id="activeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(200,169,110,0.12)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>

      {/* Grid */}
      <rect x="0" y="0" width="520" height="370" fill="url(#sg)" />

      {/* ── MAIN ENTRY / NORTH FACADE ── */}
      <rect x="80" y="10" width="360" height="28" rx="2" fill={aF(3)} stroke={aS(3)} strokeWidth={aW(3)} style={{ transition: t }} />
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} x={84 + i*39} y="13" width="34" height="21" rx="1" fill="none" stroke={dimBorder} strokeWidth="0.4"/>
      ))}
      <text x="260" y="28" textAnchor="middle" fill={active===3 ? gold : '#2a2a2a'} fontSize="6.5" fontFamily="DM Mono,monospace" letterSpacing="2" style={{ transition: t }}>MAIN ENTRY PLAZA</text>

      {/* ── NORTH RETAIL SPINE ── */}
      <rect x="80" y="38" width="360" height="80" rx="1" fill="rgba(18,18,18,0.6)" stroke={border} strokeWidth="0.7"/>
      {/* Store fronts top row */}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} x={84 + i*39} y="42" width="34" height="35" rx="1" fill="none" stroke={dimBorder} strokeWidth="0.4"/>
      ))}
      {/* Store fronts bottom row */}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} x={84 + i*39} y="80" width="34" height="34" rx="1" fill="none" stroke={dimBorder} strokeWidth="0.4"/>
      ))}
      <text x="260" y="64" textAnchor="middle" fill="#1e1e1e" fontSize="7" fontFamily="DM Mono,monospace" letterSpacing="2">NORTH RETAIL WING</text>

      {/* ── CENTRE COURT (main activation hub) ── */}
      <rect x="160" y="118" width="200" height="75" rx="3" fill={aF(0)} stroke={aS(0)} strokeWidth={aW(0)} style={{ transition: t }} />
      {/* Court detail: atrium circles */}
      <ellipse cx="260" cy="155" rx="70" ry="30" fill="none" stroke={active===0 ? 'rgba(200,169,110,0.3)' : dimBorder} strokeWidth="0.8" style={{ transition: t }}/>
      <ellipse cx="260" cy="155" rx="45" ry="18" fill="none" stroke={active===0 ? 'rgba(200,169,110,0.2)' : '#141414'} strokeWidth="0.6" style={{ transition: t }}/>
      <text x="260" y="151" textAnchor="middle" fill={active===0 ? gold : '#2a2a2a'} fontSize="7" fontFamily="DM Mono,monospace" letterSpacing="2" style={{ transition: t }}>CENTRE COURT</text>
      <text x="260" y="163" textAnchor="middle" fill={active===0 ? 'rgba(200,169,110,0.7)' : '#1a1a1a'} fontSize="5.5" fontFamily="DM Mono,monospace" letterSpacing="1.5" style={{ transition: t }}>ACTIVATION ZONE</text>

      {/* ── WEST WING (side corridor + stores) ── */}
      <rect x="10" y="38" width="70" height="200" rx="2" fill="rgba(18,18,18,0.5)" stroke={border} strokeWidth="0.6"/>
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x="14" y={42 + i*32} width="62" height="27" rx="1" fill="none" stroke={dimBorder} strokeWidth="0.4"/>
      ))}
      <text x="45" y="145" textAnchor="middle" fill="#1e1e1e" fontSize="5.5" fontFamily="DM Mono,monospace" letterSpacing="1.5" transform="rotate(-90,45,145)">WEST WING</text>

      {/* ── EAST WING ── */}
      <rect x="440" y="38" width="70" height="200" rx="2" fill="rgba(18,18,18,0.5)" stroke={border} strokeWidth="0.6"/>
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x="444" y={42 + i*32} width="62" height="27" rx="1" fill="none" stroke={dimBorder} strokeWidth="0.4"/>
      ))}
      <text x="475" y="145" textAnchor="middle" fill="#1e1e1e" fontSize="5.5" fontFamily="DM Mono,monospace" letterSpacing="1.5" transform="rotate(90,475,145)">EAST WING</text>

      {/* ── SOUTH CORRIDOR ── */}
      <rect x="80" y="193" width="360" height="18" rx="0" fill={corridor} stroke={dimBorder} strokeWidth="0.4"/>
      <line x1="80" y1="202" x2="440" y2="202" stroke="#141414" strokeWidth="0.6" strokeDasharray="6 4"/>

      {/* ── ICE PALACE ARENA (south-west) ── */}
      <rect x="10" y="238" width="170" height="120" rx="3" fill={aF(1)} stroke={aS(1)} strokeWidth={aW(1)} style={{ transition: t }}/>
      {/* Rink oval */}
      <ellipse cx="95" cy="298" rx="72" ry="45" fill="none" stroke={active===1 ? 'rgba(200,169,110,0.3)' : dimBorder} strokeWidth="0.8" style={{ transition: t }}/>
      <ellipse cx="95" cy="298" rx="55" ry="32" fill="none" stroke={active===1 ? 'rgba(200,169,110,0.15)' : '#141414'} strokeWidth="0.6" style={{ transition: t }}/>
      {/* Goal creases */}
      <rect x="22" y="286" width="14" height="24" rx="2" fill="none" stroke={dimBorder} strokeWidth="0.5"/>
      <rect x="144" y="286" width="14" height="24" rx="2" fill="none" stroke={dimBorder} strokeWidth="0.5"/>
      {/* Centre circle */}
      <circle cx="95" cy="298" r="10" fill="none" stroke={dimBorder} strokeWidth="0.5"/>
      <line x1="95" y1="253" x2="95" y2="355" stroke={dimBorder} strokeWidth="0.5" strokeDasharray="3 3"/>
      <text x="95" y="295" textAnchor="middle" fill={active===1 ? gold : '#252525'} fontSize="6.5" fontFamily="DM Mono,monospace" letterSpacing="1.5" style={{ transition: t }}>ICE PALACE</text>
      <text x="95" y="305" textAnchor="middle" fill={active===1 ? 'rgba(200,169,110,0.6)' : '#1a1a1a'} fontSize="5.5" fontFamily="DM Mono,monospace" letterSpacing="1" style={{ transition: t }}>15,000 CAPACITY</text>

      {/* ── BOURBON STREET / DINING (south-centre strip) ── */}
      <rect x="180" y="238" width="160" height="50" rx="2" fill="rgba(18,18,18,0.5)" stroke={border} strokeWidth="0.6"/>
      {[0,1,2,3].map(i => (
        <rect key={i} x={184 + i*39} y="242" width="34" height="42" rx="1" fill="none" stroke={dimBorder} strokeWidth="0.4"/>
      ))}
      <text x="260" y="270" textAnchor="middle" fill="#1e1e1e" fontSize="6" fontFamily="DM Mono,monospace" letterSpacing="1.5">BOURBON ST.</text>

      {/* ── WORLD WATERPARK (south-east) ── */}
      <rect x="340" y="238" width="170" height="120" rx="3" fill={aF(2)} stroke={aS(2)} strokeWidth={aW(2)} style={{ transition: t }}/>
      {/* Wave pool */}
      <ellipse cx="425" cy="298" rx="68" ry="42" fill="none" stroke={active===2 ? 'rgba(200,169,110,0.3)' : dimBorder} strokeWidth="0.8" style={{ transition: t }}/>
      <ellipse cx="425" cy="298" rx="50" ry="28" fill="none" stroke={active===2 ? 'rgba(200,169,110,0.15)' : '#141414'} strokeWidth="0.6" style={{ transition: t }}/>
      {/* Water slides */}
      <line x1="360" y1="248" x2="395" y2="345" stroke={dimBorder} strokeWidth="1.2"/>
      <line x1="376" y1="244" x2="408" y2="348" stroke={dimBorder} strokeWidth="1.2"/>
      <line x1="392" y1="242" x2="420" y2="346" stroke={dimBorder} strokeWidth="1.2"/>
      <text x="425" y="295" textAnchor="middle" fill={active===2 ? gold : '#252525'} fontSize="6" fontFamily="DM Mono,monospace" letterSpacing="1.5" style={{ transition: t }}>WORLD</text>
      <text x="425" y="306" textAnchor="middle" fill={active===2 ? gold : '#252525'} fontSize="6" fontFamily="DM Mono,monospace" letterSpacing="1.5" style={{ transition: t }}>WATERPARK</text>

      {/* ── GALAXYLAND DOME (east anchor) ── */}
      <ellipse cx="470" cy="158" rx="44" ry="58" fill={aF(4)} stroke={aS(4)} strokeWidth={aW(4)} style={{ transition: t }}/>
      <ellipse cx="470" cy="158" rx="32" ry="44" fill="none" stroke={dimBorder} strokeWidth="0.5"/>
      <ellipse cx="470" cy="158" rx="18" ry="28" fill="none" stroke={dimBorder} strokeWidth="0.4"/>
      <text x="470" y="154" textAnchor="middle" fill={active===4 ? gold : '#252525'} fontSize="6" fontFamily="DM Mono,monospace" letterSpacing="1" style={{ transition: t }}>GALAXY</text>
      <text x="470" y="165" textAnchor="middle" fill={active===4 ? gold : '#252525'} fontSize="6" fontFamily="DM Mono,monospace" letterSpacing="1" style={{ transition: t }}>LAND</text>

      {/* ── Connector east wing → Galaxyland ── */}
      <rect x="440" y="130" width="30" height="55" fill={corridor} stroke={dimBorder} strokeWidth="0.4"/>

      {/* ── South connector ── */}
      <rect x="180" y="211" width="160" height="27" fill={corridor} stroke={dimBorder} strokeWidth="0.4"/>

      {/* ── COMPASS ── */}
      <g transform="translate(28,358)">
        <circle cx="0" cy="0" r="10" fill="none" stroke="#1e1e1e" strokeWidth="0.7"/>
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#252525" strokeWidth="0.8"/>
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#252525" strokeWidth="0.8"/>
        <text x="0" y="-7" textAnchor="middle" fill="#2a2a2a" fontSize="4.5" fontFamily="DM Mono,monospace">N</text>
      </g>

      {/* ── Scale ── */}
      <line x1="60" y1="362" x2="160" y2="362" stroke="#1e1e1e" strokeWidth="0.7"/>
      <line x1="60" y1="358" x2="60" y2="366" stroke="#1e1e1e" strokeWidth="0.7"/>
      <line x1="160" y1="358" x2="160" y2="366" stroke="#1e1e1e" strokeWidth="0.7"/>
      <text x="110" y="370" textAnchor="middle" fill="#1e1e1e" fontSize="4.5" fontFamily="DM Mono,monospace">≈ 500m</text>
    </svg>
  );
}

const HOTSPOT_SVG_POS = [
  { top: '38%', left: '44%' },
  { top: '72%', left: '24%' },
  { top: '74%', left: '74%' },
  { top: '12%', left: '50%' },
  { top: '47%', left: '88%' },
];

export default function EventsSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#080808' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="/images/events-concert-v2.png" alt="WEM Events" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.14 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,8,0.84)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', height: '100%', padding: '80px 3% 30px 5%' }}>
        {/* Left */}
        <div style={{ width: '44%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: '3%' }}>
          <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '0.8rem' }}>
            Events & Platform
          </motion.p>
          <motion.h2
            className="display"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease }}
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}
          >
            A global stage.<br />
            <em className="display-italic" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>Not just a building.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontFamily: "'DM Sans', sans-serif", color: '#706860', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '340px' }}
          >
            WEM hosts 300+ events annually — reaching a combined audience of 50M+ through media, digital, and in-person channels.
          </motion.p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {[{ val: '300+', label: 'Annual Events' }, { val: '20K+', label: 'Max Capacity' }, { val: '5', label: 'Distinct Venues' }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease }}
                style={{ padding: '0.9rem 1.1rem', border: '1px solid #2a2a2a', background: 'rgba(20,20,20,0.6)', backdropFilter: 'blur(10px)', minWidth: '80px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#C8A96E', fontWeight: 300 }}>{s.val}</div>
                <div className="eyebrow" style={{ fontSize: '0.52rem' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {EVENT_TYPES.map((evt, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease }}
                style={{ padding: '0.7rem', border: '1px solid #1e1e1e', background: 'rgba(14,14,14,0.8)', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{evt.icon}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#e8e0d0', fontWeight: 500, marginBottom: '0.1rem' }}>{evt.name}</div>
                <div className="eyebrow" style={{ fontSize: '0.46rem', color: '#706860' }}>{evt.capacity}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button className="btn-gold" style={{ fontSize: '0.65rem', padding: '0.7rem 1.4rem' }} onClick={() => window.dispatchEvent(new CustomEvent('goToSection', { detail: 8 }))}><span>Book a Venue</span></button>
            <button className="btn-outline" style={{ fontSize: '0.65rem', padding: '0.7rem 1.4rem' }} onClick={() => window.dispatchEvent(new CustomEvent('goToSection', { detail: 7 }))}>Your Activation Here</button>
          </div>
        </div>

        {/* Right: Sponsorship map */}
        <div style={{ width: '56%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem', textAlign: 'center', fontSize: '0.55rem' }}>
            Sponsorship Activation Map — click a venue
          </p>

          <div style={{ position: 'relative', maxWidth: '520px', margin: '0 auto', width: '100%' }}>
            <SponsorshipMapSVG active={activeHotspot} onSelect={setActiveHotspot} />

            {HOTSPOT_SVG_POS.map((pos, i) => (
              <button key={i} onClick={() => setActiveHotspot(activeHotspot === i ? null : i)} className="hotspot"
                style={{
                  top: pos.top, left: pos.left,
                  background: activeHotspot === i ? '#C8A96E' : '#8a7040',
                  transform: 'translate(-50%, -50%)',
                  width: activeHotspot === i ? '16px' : '11px',
                  height: activeHotspot === i ? '16px' : '11px',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                }}
                title={HOTSPOTS[i].label}
              />
            ))}
          </div>

          <div style={{ minHeight: '90px', maxWidth: '520px', margin: '0.5rem auto 0', width: '100%' }}>
            <AnimatePresence mode="wait">
              {activeHotspot !== null ? (
                <motion.div key={activeHotspot} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}
                  style={{ padding: '0.9rem 1.2rem', border: '1px solid rgba(200,169,110,0.5)', background: 'rgba(200,169,110,0.05)', backdropFilter: 'blur(10px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                    <div>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: '#F5F0E8', fontWeight: 300 }}>{HOTSPOTS[activeHotspot].label}</div>
                      <div className="eyebrow" style={{ fontSize: '0.5rem', color: '#C8A96E', marginTop: '0.15rem' }}>{HOTSPOTS[activeHotspot].type}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#C8A96E' }}>{HOTSPOTS[activeHotspot].traffic}</div>
                      <div className="eyebrow" style={{ fontSize: '0.46rem', color: '#706860' }}>foot traffic · cap. {HOTSPOTS[activeHotspot].capacity}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.57rem', color: '#706860', letterSpacing: '0.05em' }}>
                    Example brands: {HOTSPOTS[activeHotspot].brand}
                  </div>
                </motion.div>
              ) : (
                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', fontFamily: "'DM Mono', monospace", fontSize: '0.56rem', color: '#252525', letterSpacing: '0.1em', paddingTop: '1rem' }}>
                  ↑ select a venue to see sponsorship details
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
