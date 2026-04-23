'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt?: string;
  intensity?: number; // 0-1, default 0.3
  className?: string;
}

export default function ParallaxImage({
  src,
  alt = '',
  intensity = 0.3,
  className = '',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax movement (image moves slower than scroll)
  const y = useTransform(scrollYProgress, [0, 1], [`${intensity * 100}%`, `-${intensity * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
