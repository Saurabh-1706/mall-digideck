'use client';

import { useState, useEffect } from 'react';

interface Slide { id: string; label: string; }

interface Props {
  slides: Slide[];
  current: number;
  onNavigate: (idx: number) => void;
}

export default function BottomNav({ slides, current, onNavigate }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  const total = slides.length;
  const padded = String(current + 1).padStart(2, '0');
  const paddedTotal = String(total).padStart(2, '0');

  return (
    <nav
      id="top-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '56px',
        background: 'rgba(8,8,8,0.95)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid #1e1e1e',
        display: 'flex',
        alignItems: 'center',
        zIndex: 9000,
        userSelect: 'none',
      }}
    >
      {/* Logo */}
      <div
        style={{
          flexShrink: 0,
          padding: '0 1.4rem',
          borderRight: '1px solid #1e1e1e',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => onNavigate(0)}
      >
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.05rem',
          fontWeight: 300,
          letterSpacing: '0.22em',
          color: '#C8A96E',
        }}>
          WEM
        </span>
      </div>

      {/* Section tabs — scrollable on small screens */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'stretch',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <div
          className="nav-tabs-inner"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            height: '100%',
          }}
        >
          {slides.map((slide, i) => {
            const isActive = i === current;
            const isHov = hovered === i;
            return (
              <button
                key={slide.id}
                onClick={() => onNavigate(i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  flexShrink: 0,
                  height: '100%',
                  padding: '0 1.1rem',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #C8A96E' : '2px solid transparent',
                  borderTop: 'none',
                  cursor: 'pointer',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isActive ? '#C8A96E' : isHov ? '#e8e0d0' : '#4a4038',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {slide.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: counter + arrows */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          borderLeft: '1px solid #1e1e1e',
          height: '100%',
        }}
      >
        {/* Slide counter */}
        <div
          style={{
            padding: '0 1.2rem',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem',
            color: '#C8A96E',
            letterSpacing: '0.1em',
            borderRight: '1px solid #1e1e1e',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            minWidth: '80px',
            justifyContent: 'center',
          }}
        >
          {padded} / {paddedTotal}
        </div>

        {/* Prev arrow */}
        <button
          onClick={() => onNavigate(Math.max(current - 1, 0))}
          disabled={current === 0}
          style={{
            width: '48px',
            height: '100%',
            background: 'none',
            border: 'none',
            borderRight: '1px solid #1e1e1e',
            cursor: current === 0 ? 'default' : 'pointer',
            color: current === 0 ? '#2a2a2a' : '#C8A96E',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => { if (current > 0) (e.currentTarget as HTMLElement).style.background = 'rgba(200,169,110,0.08)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
          aria-label="Previous slide"
        >
          ←
        </button>

        {/* Next arrow */}
        <button
          onClick={() => onNavigate(Math.min(current + 1, total - 1))}
          disabled={current === total - 1}
          style={{
            width: '48px',
            height: '100%',
            background: 'none',
            border: 'none',
            cursor: current === total - 1 ? 'default' : 'pointer',
            color: current === total - 1 ? '#2a2a2a' : '#C8A96E',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => { if (current < total - 1) (e.currentTarget as HTMLElement).style.background = 'rgba(200,169,110,0.08)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
          aria-label="Next slide"
        >
          →
        </button>
      </div>
    </nav>
  );
}
