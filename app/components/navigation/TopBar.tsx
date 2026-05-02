'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section { id: string; label: string; }
interface Props {
  sections: Section[];
  activeSection: number;
  onSectionClick: (idx: number) => void;
}

export default function TopBar({ sections, activeSection, onSectionClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.snap-container');
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 60);
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid #1e1e1e' : 'none',
      transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      height: '64px',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
        onClick={() => onSectionClick(0)}>
        <div style={{
          border: '1px solid #C8A96E',
          padding: '0.25rem 0.6rem',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          fontWeight: 300,
          letterSpacing: '0.2em',
          color: '#C8A96E',
        }}>
          WEM
        </div>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#706860',
          display: 'none',
        }} className="wem-wordmark">
          West Edmonton Mall
        </span>
      </div>

      {/* Section tabs (desktop) */}
      <nav style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.15rem',
      }} className="desktop-nav">
        {sections.map((sec, i) => (
          <button
            key={sec.id}
            onClick={() => onSectionClick(i)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.4rem 0.75rem',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: i === activeSection ? '#C8A96E' : '#706860',
              borderBottom: i === activeSection ? '1px solid #C8A96E' : '1px solid transparent',
              transition: 'color 0.2s ease, border-color 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (i !== activeSection) (e.currentTarget as HTMLElement).style.color = '#e8e0d0'; }}
            onMouseLeave={e => { if (i !== activeSection) (e.currentTarget as HTMLElement).style.color = '#706860'; }}
          >
            {sec.label}
          </button>
        ))}
      </nav>

      {/* CTA */}
      <button
        className="btn-gold"
        onClick={() => onSectionClick(sections.length - 1)}
        style={{ fontSize: '0.65rem', padding: '0.6rem 1.2rem', flexShrink: 0 }}
      >
        <span>Partner With Us</span>
      </button>

      {/* Hamburger (mobile) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          marginLeft: '1rem',
          color: '#C8A96E',
        }}
        className="hamburger-btn"
      >
        <div style={{ width: '20px', height: '1.5px', background: 'currentColor', marginBottom: '5px', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 5px)' : 'none' }} />
        <div style={{ width: '20px', height: '1.5px', background: 'currentColor', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
        <div style={{ width: '20px', height: '1.5px', background: 'currentColor', marginTop: '5px', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -5px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed',
              top: '64px', left: 0, right: 0,
              background: 'rgba(8,8,8,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid #1e1e1e',
              padding: '1rem',
              zIndex: 99,
            }}
          >
            {sections.map((sec, i) => (
              <button
                key={sec.id}
                onClick={() => { onSectionClick(i); setMenuOpen(false); }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.75rem 1rem',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: i === activeSection ? '#C8A96E' : '#706860',
                  borderLeft: i === activeSection ? '2px solid #C8A96E' : '2px solid transparent',
                }}
              >
                {sec.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        @media (min-width: 1100px) {
          .wem-wordmark { display: block !important; }
        }
      `}</style>
    </header>
  );
}
