'use client';

import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  delay?: number;
}

export default function StatCard({ value, label, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group relative p-10 bg-surface/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-500"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-hover group-hover:w-full transition-all duration-700 ease-out" />
      
      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-2 right-2 w-2 h-2 bg-accent/30 rounded-full" />
      </div>
      
      <div className="flex flex-col items-center text-center">
        {icon && (
          <motion.div 
            className="mb-6 text-accent/70 group-hover:text-accent transition-colors duration-300"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {icon}
          </motion.div>
        )}
        
        <div className="text-6xl md:text-7xl font-bold bg-gradient-to-b from-accent to-accent-hover bg-clip-text text-transparent mb-4">
          <AnimatedCounter target={value} />
        </div>
        
        <div className="text-sm md:text-base text-text-muted uppercase tracking-[0.2em] font-light">
          {label}
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </motion.div>
  );
}
