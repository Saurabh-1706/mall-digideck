'use client';

import { useState } from 'react';

interface Section { id: string; label: string; }
interface Props {
  sections: Section[];
  activeSection: number;
  onSectionClick: (idx: number) => void;
}

export default function SideNav({ sections, activeSection, onSectionClick }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div style={{
      position: 'fixed',
      right: '1.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.6rem',
      alignItems: 'flex-end',
    }} className="side-nav-wrap">
      {sections.map((sec, i) => (
        <button
          key={sec.id}
          onClick={() => onSectionClick(i)}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.15rem 0',
          }}
          aria-label={sec.label}
        >
          {/* Label */}
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C8A96E',
            opacity: hoveredIdx === i ? 1 : 0,
            transform: hoveredIdx === i ? 'translateX(0)' : 'translateX(6px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            whiteSpace: 'nowrap',
          }}>
            {sec.label}
          </div>

          {/* Dot */}
          <div style={{
            width: i === activeSection ? '10px' : '6px',
            height: i === activeSection ? '10px' : '6px',
            borderRadius: '50%',
            background: i === activeSection ? '#C8A96E' : '#2a2a2a',
            border: i === activeSection ? '0px solid transparent' : '1px solid #706860',
            boxShadow: i === activeSection ? '0 0 12px rgba(200,169,110,0.7)' : 'none',
            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            flexShrink: 0,
          }} />
        </button>
      ))}

      <style>{`
        @media (max-width: 767px) {
          .side-nav-wrap { display: none !important; }
        }
      `}</style>
    </div>
  );
}
