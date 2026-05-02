'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const CATEGORIES = [
  { icon: '♦', count: '60+',  label: 'Luxury Flagships' },
  { icon: '◈', count: '200+', label: 'Fashion & Apparel' },
  { icon: '⬡', count: '40+',  label: 'Electronics & Tech' },
  { icon: '✦', count: '80+',  label: 'Beauty & Wellness' },
  { icon: '◉', count: '50+',  label: 'Home & Living' },
  { icon: '⬟', count: '20+',  label: 'Pop-Up Spaces' },
];

const ZONES = [
  {
    label: 'Luxury Wing',
    x: '13%', y: '28%',
    traffic: '25K/day',
    type: 'Premium Flagship · Phase I',
    stores: '60+ boutiques',
    color: '#C8A96E',
  },
  {
    label: 'Fashion District',
    x: '42%', y: '22%',
    traffic: '60K/day',
    type: 'Mid-Tier & Contemporary · Phase II',
    stores: '200+ stores',
    color: '#C8A96E',
  },
  {
    label: 'Galaxyland',
    x: '68%', y: '38%',
    traffic: '40K/day',
    type: 'Entertainment Anchor · Phase III',
    stores: '27 rides & attractions',
    color: '#C8A96E',
  },
  {
    label: 'World Waterpark',
    x: '18%', y: '68%',
    traffic: '35K/day',
    type: 'Recreational Anchor · Phase IV',
    stores: '5-acre wave pool',
    color: '#C8A96E',
  },
  {
    label: 'Bourbon Street',
    x: '50%', y: '72%',
    traffic: '50K/day',
    type: 'Dining & Entertainment Strip',
    stores: '110+ dining outlets',
    color: '#C8A96E',
  },
  {
    label: 'Pop-Up Gallery',
    x: '76%', y: '68%',
    traffic: '80K/day',
    type: 'Flex Retail · Centre Court',
    stores: '20+ rotating spaces',
    color: '#C8A96E',
  },
];

// ── WEM-accurate floor plan SVG ─────────────────────────
// Based on WEM's actual multi-phase rectangular layout with:
// - Main east-west spine corridor
// - North/south retail wings
// - Galaxyland dome (east)
// - World Waterpark (west annex)
// - Bourbon Street (south strip)
// - Fantasyland Hotel connector (north-east)
function FloorPlanSVG({ activeZone, onZoneClick }: { activeZone: number | null; onZoneClick: (i: number) => void }) {
  const gold = '#C8A96E';
  const goldFaint = 'rgba(200,169,110,0.15)';
  const goldActive = 'rgba(200,169,110,0.20)';
  const border = '#2a2a2a';
  const borderDim = '#1a1a1a';
  const corridor = '#232323';

  const zoneActive = (i: number) => activeZone === i;
  const zF = (i: number) => zoneActive(i) ? goldActive : 'transparent';
  const zS = (i: number) => zoneActive(i) ? gold : border;
  const zW = (i: number) => zoneActive(i) ? 1.5 : 0.6;
  const t = 'all 0.35s ease';

  return (
    <svg
      viewBox="0 0 560 380"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <pattern id="grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#141414" strokeWidth="0.5"/>
        </pattern>
      </defs>

      {/* Grid background */}
      <rect x="0" y="0" width="560" height="380" fill="url(#grid)" opacity="0.4" />

      {/* ── PHASE I — Luxury Wing (far west, narrow tall block) ── */}
      <rect x="18" y="55" width="72" height="200" rx="2"
        fill={zF(0)} stroke={zS(0)} strokeWidth={zW(0)} style={{ transition: t }} />
      {/* Store fronts inside */}
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x="22" y={60 + i * 27} width="64" height="22" rx="1"
          fill="none" stroke={borderDim} strokeWidth="0.4" />
      ))}
      <text x="54" y="165" textAnchor="middle" fill={zoneActive(0) ? gold : '#333'} fontSize="7" fontFamily="DM Mono, monospace" letterSpacing="1.5" style={{ transition: t }}>LUXURY</text>
      <text x="54" y="175" textAnchor="middle" fill={zoneActive(0) ? gold : '#333'} fontSize="7" fontFamily="DM Mono, monospace" letterSpacing="1.5" style={{ transition: t }}>WING</text>

      {/* ── MAIN SPINE CORRIDOR (east-west) ── */}
      <rect x="90" y="125" width="370" height="30" rx="0" fill={corridor} stroke={borderDim} strokeWidth="0.5" />
      {/* Corridor centerline */}
      <line x1="90" y1="140" x2="460" y2="140" stroke="#1e1e1e" strokeWidth="0.8" strokeDasharray="6 4" />

      {/* ── NORTH RETAIL WING (Phase II — main fashion block) ── */}
      <rect x="90" y="20" width="240" height="105" rx="2"
        fill={zF(1)} stroke={zS(1)} strokeWidth={zW(1)} style={{ transition: t }} />
      {/* Store row top */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={94 + i * 39} y="24" width="34" height="45" rx="1"
          fill="none" stroke={borderDim} strokeWidth="0.4" />
      ))}
      {/* Store row bottom */}
      {[0,1,2,3,4,5].map(i => (
        <rect key={i} x={94 + i * 39} y="74" width="34" height="46" rx="1"
          fill="none" stroke={borderDim} strokeWidth="0.4" />
      ))}
      <text x="210" y="122" textAnchor="middle" fill={zoneActive(1) ? gold : '#333'} fontSize="7" fontFamily="DM Mono, monospace" letterSpacing="1.5" style={{ transition: t }}>FASHION DISTRICT</text>

      {/* ── SOUTH RETAIL + BOURBON STREET (dining strip) ── */}
      <rect x="90" y="155" width="190" height="80" rx="2"
        fill={zF(4)} stroke={zS(4)} strokeWidth={zW(4)} style={{ transition: t }} />
      {/* Bourbon Street store units */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={94 + i * 37} y="159" width="32" height="72" rx="1"
          fill="none" stroke={borderDim} strokeWidth="0.4" />
      ))}
      <text x="185" y="204" textAnchor="middle" fill={zoneActive(4) ? gold : '#333'} fontSize="6.5" fontFamily="DM Mono, monospace" letterSpacing="1.2" style={{ transition: t }}>BOURBON ST.</text>

      {/* ── POP-UP / FLEX SPACE (south east corner) ── */}
      <rect x="285" y="155" width="105" height="80" rx="2"
        fill={zF(5)} stroke={zS(5)} strokeWidth={zW(5)} style={{ transition: t }} />
      {[0,1,2].map(i => (
        <rect key={i} x={289 + i * 34} y="159" width="30" height="35" rx="1"
          fill="none" stroke={borderDim} strokeWidth="0.4" />
      ))}
      {[0,1,2].map(i => (
        <rect key={i} x={289 + i * 34} y="199" width="30" height="32" rx="1"
          fill="none" stroke={borderDim} strokeWidth="0.4" />
      ))}
      <text x="337" y="204" textAnchor="middle" fill={zoneActive(5) ? gold : '#333'} fontSize="6" fontFamily="DM Mono, monospace" letterSpacing="1.2" style={{ transition: t }}>POP-UP</text>

      {/* ── EAST CONNECTOR (Phase III corridor to Galaxyland) ── */}
      <rect x="460" y="95" width="30" height="75" rx="0" fill={corridor} stroke={borderDim} strokeWidth="0.5" />

      {/* ── GALAXYLAND DOME (east anchor — rounded) ── */}
      <ellipse cx="512" cy="133" rx="46" ry="68"
        fill={zF(2)} stroke={zS(2)} strokeWidth={zW(2)} style={{ transition: t }} />
      {/* Dome detail rings */}
      <ellipse cx="512" cy="133" rx="34" ry="54" fill="none" stroke={borderDim} strokeWidth="0.5" />
      <ellipse cx="512" cy="133" rx="20" ry="36" fill="none" stroke={borderDim} strokeWidth="0.4" />
      <line x1="512" y1="68" x2="512" y2="200" stroke={borderDim} strokeWidth="0.5" />
      <line x1="467" y1="133" x2="557" y2="133" stroke={borderDim} strokeWidth="0.5" />
      <text x="512" y="130" textAnchor="middle" fill={zoneActive(2) ? gold : '#333'} fontSize="6.5" fontFamily="DM Mono, monospace" letterSpacing="1" style={{ transition: t }}>GALAXY</text>
      <text x="512" y="140" textAnchor="middle" fill={zoneActive(2) ? gold : '#333'} fontSize="6.5" fontFamily="DM Mono, monospace" letterSpacing="1" style={{ transition: t }}>LAND</text>

      {/* ── NORTH HOTEL / OFFICE WING (Fantasyland Hotel) ── */}
      <rect x="330" y="20" width="128" height="60" rx="2"
        fill="transparent" stroke={border} strokeWidth="0.6" />
      {[0,1,2,3].map(i => (
        <rect key={i} x={334 + i * 31} y="24" width="27" height="52" rx="1"
          fill="none" stroke={borderDim} strokeWidth="0.4" />
      ))}
      <text x="394" y="56" textAnchor="middle" fill="#222" fontSize="6" fontFamily="DM Mono, monospace" letterSpacing="1">HOTEL</text>

      {/* ── WORLD WATERPARK (west annex — large irregular shape) ── */}
      {/* Main pool area */}
      <rect x="18" y="260" width="180" height="100" rx="4"
        fill={zF(3)} stroke={zS(3)} strokeWidth={zW(3)} style={{ transition: t }} />
      {/* Wave pool detail */}
      <ellipse cx="108" cy="310" rx="72" ry="38" fill="none" stroke={zoneActive(3) ? 'rgba(200,169,110,0.3)' : '#1a1a1a'} strokeWidth="0.8" style={{ transition: t }} />
      <ellipse cx="108" cy="310" rx="50" ry="26" fill="none" stroke={zoneActive(3) ? 'rgba(200,169,110,0.2)' : '#161616'} strokeWidth="0.6" style={{ transition: t }} />
      {/* Water slides (diagonal lines) */}
      <line x1="50" y1="268" x2="90" y2="350" stroke={borderDim} strokeWidth="1.2" />
      <line x1="70" y1="268" x2="105" y2="355" stroke={borderDim} strokeWidth="1.2" />
      <line x1="90" y1="268" x2="120" y2="352" stroke={borderDim} strokeWidth="1.2" />
      <text x="108" y="316" textAnchor="middle" fill={zoneActive(3) ? gold : '#2a2a2a'} fontSize="6.5" fontFamily="DM Mono, monospace" letterSpacing="1.2" style={{ transition: t }}>WORLD</text>
      <text x="108" y="326" textAnchor="middle" fill={zoneActive(3) ? gold : '#2a2a2a'} fontSize="6.5" fontFamily="DM Mono, monospace" letterSpacing="1.2" style={{ transition: t }}>WATERPARK</text>

      {/* ── SOUTH CONNECTOR (waterpark to main mall) ── */}
      <rect x="90" y="238" width="30" height="22" fill={corridor} stroke={borderDim} strokeWidth="0.4" />
      <rect x="115" y="238" width="165" height="22" fill={corridor} stroke={borderDim} strokeWidth="0.4" />

      {/* ── ICE PALACE (south-east block) ── */}
      <rect x="220" y="260" width="170" height="100" rx="2"
        fill="transparent" stroke={border} strokeWidth="0.6" />
      {/* Rink markings */}
      <ellipse cx="305" cy="310" rx="68" ry="38" fill="none" stroke={borderDim} strokeWidth="0.5" />
      <line x1="305" y1="272" x2="305" y2="358" stroke={borderDim} strokeWidth="0.5" />
      <rect x="272" y="295" width="20" height="30" rx="1" fill="none" stroke={borderDim} strokeWidth="0.4" />
      <rect x="318" y="295" width="20" height="30" rx="1" fill="none" stroke={borderDim} strokeWidth="0.4" />
      <text x="305" y="315" textAnchor="middle" fill="#222" fontSize="6" fontFamily="DM Mono, monospace" letterSpacing="1">ICE PALACE</text>

      {/* ── MARINE LIFE / AQUARIUM ── */}
      <rect x="398" y="260" width="100" height="100" rx="6"
        fill="transparent" stroke={border} strokeWidth="0.6" />
      <ellipse cx="448" cy="310" rx="36" ry="36" fill="none" stroke={borderDim} strokeWidth="0.5" />
      <ellipse cx="448" cy="310" rx="22" ry="22" fill="none" stroke={borderDim} strokeWidth="0.4" />
      <text x="448" y="314" textAnchor="middle" fill="#222" fontSize="6" fontFamily="DM Mono, monospace" letterSpacing="0.8">MARINE LIFE</text>

      {/* ── COMPASS rose ── */}
      <g transform="translate(530, 345)">
        <circle cx="0" cy="0" r="12" fill="none" stroke="#1e1e1e" strokeWidth="0.8" />
        <line x1="0" y1="-8" x2="0" y2="8" stroke="#2a2a2a" strokeWidth="0.8" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#2a2a2a" strokeWidth="0.8" />
        <text x="0" y="-10" textAnchor="middle" fill="#333" fontSize="5" fontFamily="DM Mono, monospace">N</text>
      </g>

      {/* ── Scale bar ── */}
      <line x1="18" y1="368" x2="118" y2="368" stroke="#2a2a2a" strokeWidth="0.8" />
      <line x1="18" y1="364" x2="18" y2="372" stroke="#2a2a2a" strokeWidth="0.8" />
      <line x1="118" y1="364" x2="118" y2="372" stroke="#2a2a2a" strokeWidth="0.8" />
      <text x="68" y="377" textAnchor="middle" fill="#2a2a2a" fontSize="5" fontFamily="DM Mono, monospace">500m approx.</text>

      {/* ── Active zone GOLD GLOW overlay ── */}
      {activeZone !== null && (
        <rect x="0" y="0" width="560" height="380" fill="rgba(0,0,0,0)" />
      )}
    </svg>
  );
}

// Hotspot positions matching zone data
const HOTSPOT_POS = [
  { x: '13%', y: '37%' },  // Luxury Wing
  { x: '40%', y: '18%' },  // Fashion District
  { x: '88%', y: '36%' },  // Galaxyland
  { x: '20%', y: '78%' },  // Waterpark
  { x: '44%', y: '57%' },  // Bourbon Street
  { x: '60%', y: '57%' },  // Pop-Up
];

export default function RetailSection() {
  const [activeZone, setActiveZone] = useState<number | null>(null);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0d0d0d', display: 'flex' }}>

      {/* Faint bg */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src="/images/retail.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.04 }} />
      </div>

      {/* Left: content */}
      <div style={{ position: 'relative', zIndex: 1, width: '48%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 3% 40px 5%', overflow: 'hidden' }}>
        <motion.p className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginBottom: '0.8rem' }}>
          Retail Environment
        </motion.p>
        <motion.h2
          className="display"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, ease }}
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '0.5rem' }}
        >
          Every brand.<br />
          <em className="display-italic" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Every audience.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
          style={{ fontFamily: "'DM Sans', sans-serif", color: '#706860', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '380px', lineHeight: 1.7 }}
        >
          From global luxury flagships to agile pop-up concepts, WEM hosts 800+ stores across every category — all under one climate-controlled, year-round roof.
        </motion.p>

        {/* Category grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease }}
              className="card-lift"
              style={{ padding: '1rem', border: '1px solid #1e1e1e', background: 'rgba(20,20,20,0.6)', cursor: 'default' }}
            >
              <div style={{ fontSize: '1rem', color: '#C8A96E', marginBottom: '0.4rem' }}>{cat.icon}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', color: '#C8A96E', fontWeight: 300 }}>{cat.count}</div>
              <div className="eyebrow" style={{ fontSize: '0.52rem', marginTop: '0.2rem', lineHeight: 1.4 }}>{cat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="btn-gold"
          onClick={() => window.dispatchEvent(new CustomEvent('goToSection', { detail: 8 }))}
          style={{ alignSelf: 'flex-start', fontSize: '0.65rem' }}
        >
          <span>Leasing Enquiry →</span>
        </motion.button>
      </div>

      {/* Right: interactive floor map */}
      <div style={{ position: 'relative', width: '52%', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '72px 2% 20px 1%' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem', textAlign: 'center', fontSize: '0.55rem' }}>
          West Edmonton Mall · Interactive Floor Plan
        </p>

        {/* Map container */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '560px', margin: '0 auto' }}>
          <FloorPlanSVG activeZone={activeZone} onZoneClick={setActiveZone} />

          {/* Hotspot buttons */}
          {ZONES.map((z, i) => (
            <button
              key={i}
              onClick={() => setActiveZone(activeZone === i ? null : i)}
              className="hotspot"
              style={{
                left: HOTSPOT_POS[i].x,
                top: HOTSPOT_POS[i].y,
                background: activeZone === i ? '#C8A96E' : '#8a7040',
                transform: 'translate(-50%, -50%)',
                width: activeZone === i ? '16px' : '11px',
                height: activeZone === i ? '16px' : '11px',
                transition: 'all 0.3s ease',
                zIndex: 10,
              }}
              title={z.label}
            />
          ))}
        </div>

        {/* Zone info panel */}
        <div style={{ minHeight: '80px', maxWidth: '560px', margin: '0.5rem auto 0', width: '100%' }}>
          <AnimatePresence mode="wait">
            {activeZone !== null ? (
              <motion.div
                key={activeZone}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                style={{
                  padding: '0.8rem 1.2rem',
                  border: '1px solid rgba(200,169,110,0.5)',
                  background: 'rgba(200,169,110,0.05)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: '#F5F0E8', fontWeight: 300 }}>
                    {ZONES[activeZone].label}
                  </div>
                  <div className="eyebrow" style={{ fontSize: '0.5rem', marginTop: '0.15rem', color: '#706860' }}>
                    {ZONES[activeZone].type}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: '#C8A96E', marginTop: '0.2rem', letterSpacing: '0.05em' }}>
                    {ZONES[activeZone].stores}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#C8A96E' }}>
                    {ZONES[activeZone].traffic}
                  </div>
                  <div className="eyebrow" style={{ fontSize: '0.48rem', color: '#706860' }}>Foot Traffic</div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: '#2a2a2a', letterSpacing: '0.1em', paddingTop: '0.8rem' }}
              >
                ↑ select a zone to explore
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
