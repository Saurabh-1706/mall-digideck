'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

// Simulated real-time visitor data
const LIVE_EVENTS = [
  { time: 'NOW', text: 'Galaxyland — 2,340 visitors inside', icon: '🎢', color: '#FFD700' },
  { time: 'NOW', text: 'World Waterpark — capacity reached', icon: '🌊', color: '#4FC3F7' },
  { time: '2 min ago', text: 'Nike pop-up launch: 847 attendees', icon: '👟', color: '#C9A962' },
  { time: '5 min ago', text: 'New lease signed: Rolex Boutique', icon: '⌚', color: '#C9A962' },
  { time: '8 min ago', text: 'Luxury Wing — 4,200 visitors/hour', icon: '💎', color: '#E0C9E8' },
  { time: '12 min ago', text: 'Food Court — 500+ seats filled', icon: '🍜', color: '#F4A460' },
  { time: '15 min ago', text: 'Concert booking confirmed: Dec 14', icon: '🎤', color: '#FF7F7F' },
];

const ZONE_DATA = [
  { name: 'Galaxyland', visitors: 2340, max: 3000, color: '#FFD700', position: { top: '15%', left: '20%' } },
  { name: 'Waterpark', visitors: 2800, max: 3000, color: '#4FC3F7', position: { top: '60%', left: '15%' } },
  { name: 'Luxury Wing', visitors: 4200, max: 5000, color: '#C9A962', position: { top: '25%', right: '20%' } },
  { name: 'Main Retail', visitors: 18500, max: 25000, color: '#A8C4E0', position: { top: '45%', left: '45%' } },
  { name: 'Dining', visitors: 6200, max: 8000, color: '#F4A460', position: { bottom: '20%', right: '25%' } },
];

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    countRef.current = 0;
    startRef.current = null;

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return count;
}

function LiveCounter({ baseCount }: { baseCount: number }) {
  const [delta, setDelta] = useState(0);
  const animated = useCountUp(baseCount + delta, 2500);

  // Simulate real-time changes
  useEffect(() => {
    const interval = setInterval(() => {
      setDelta(prev => prev + Math.floor(Math.random() * 7 - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatted = (animated + delta).toLocaleString();
  return (
    <span className="tabular-nums font-mono">{formatted}</span>
  );
}

function EventTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % LIVE_EVENTS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const event = LIVE_EVENTS[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <span className="text-lg">{event.icon}</span>
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] uppercase tracking-widest flex-shrink-0"
            style={{ color: event.color }}>
            {event.time}
          </span>
          <span className="text-white/70 text-sm truncate">{event.text}</span>
        </div>
        {/* Pulsing dot */}
        <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ backgroundColor: event.color }} />
      </motion.div>
    </AnimatePresence>
  );
}

function ZoneHeatmap() {
  return (
    <div className="relative w-full h-48 bg-white/[0.02] border border-white/10 overflow-hidden">
      {/* Simplified mall floor plan */}
      <div className="absolute inset-0 opacity-10">
        {/* Outer walls */}
        <div className="absolute inset-2 border border-white/30" />
        {/* Internal zones */}
        <div className="absolute top-4 left-4 right-4 bottom-12 border border-white/20" />
        <div className="absolute top-1/3 left-8 right-8 h-px bg-white/20" />
        <div className="absolute top-2/3 left-8 right-8 h-px bg-white/20" />
        <div className="absolute left-1/2 top-4 bottom-12 w-px bg-white/20" />
      </div>

      {/* Zone heat blobs */}
      {ZONE_DATA.map((zone) => {
        const intensity = zone.visitors / zone.max;
        const size = 40 + intensity * 50;
        return (
          <motion.div
            key={zone.name}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              ...zone.position,
              backgroundColor: zone.color,
              opacity: 0.15 + intensity * 0.35,
              filter: `blur(${8 + intensity * 6}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15 + intensity * 0.3, 0.2 + intensity * 0.4, 0.15 + intensity * 0.3],
            }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}

      {/* Zone labels */}
      {ZONE_DATA.map((zone) => (
        <div
          key={`label-${zone.name}`}
          className="absolute"
          style={{ ...zone.position, transform: 'translate(-50%, -50%)' }}
        >
          <div className="text-center">
            <div className="text-[8px] font-bold uppercase tracking-wider text-white/60 whitespace-nowrap">
              {zone.name}
            </div>
            <div className="text-[10px] font-mono" style={{ color: zone.color }}>
              {zone.visitors.toLocaleString()}
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1">
        <div className="text-[9px] text-white/30 uppercase tracking-wider">Visitor Density</div>
        <div className="flex gap-0.5">
          {['rgba(201,169,98,0.2)', 'rgba(201,169,98,0.4)', 'rgba(201,169,98,0.7)', 'rgba(201,169,98,1)'].map((c, i) => (
            <div key={i} className="w-3 h-2" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LiveDashboard() {
  const TOTAL_VISITORS = 47382;
  const displayCount = useCountUp(TOTAL_VISITORS, 2800);

  return (
    <div className="w-full space-y-3">
      {/* Main counter */}
      <div className="relative bg-white/[0.03] border border-white/10 p-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs uppercase tracking-widest font-medium">Live Now</span>
            </div>
            <div className="text-5xl md:text-6xl font-black text-white mb-1 leading-none">
              <LiveCounter baseCount={displayCount} />
            </div>
            <div className="text-white/50 text-sm uppercase tracking-wider">
              People inside West Edmonton Mall right now
            </div>
          </div>

          {/* Mini spark chart */}
          <div className="flex items-end gap-0.5 h-12 opacity-60">
            {[40, 60, 45, 80, 70, 95, 100, 85, 90, 100].map((h, i) => (
              <motion.div
                key={i}
                className="w-2 bg-[#C9A962] rounded-sm"
                style={{ height: `${h}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              />
            ))}
          </div>
        </div>

        {/* Sub-stats */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
          {[
            { val: '100K+', label: 'Peak Daily' },
            { val: '30M+', label: 'Annual' },
            { val: '82%', label: 'Repeat Visitors' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-xl font-bold text-[#C9A962]">{s.val}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white/[0.03] border border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-widest text-white/50">Zone Activity Map</span>
          <span className="text-[10px] text-green-400/70 uppercase tracking-wider">● Live</span>
        </div>
        <ZoneHeatmap />
      </div>

      {/* Live Feed */}
      <div className="bg-white/[0.03] border border-white/10 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-widest text-white/50">Live Activity Feed</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
        <EventTicker />
      </div>
    </div>
  );
}
