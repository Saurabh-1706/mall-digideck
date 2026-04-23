'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  target: string;
  duration?: number;
  delay?: number; // Additional delay before animation starts
  className?: string;
  decimals?: number; // Number of decimal places
}

export default function AnimatedCounter({
  target,
  duration = 2000,
  delay = 0,
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    // Extract numeric value and suffix
    const numericPart = target.replace(/[^0-9.]/g, '');
    const suffix = target.replace(/[0-9.]/g, '');
    const targetValue = parseFloat(numericPart);

    if (isNaN(targetValue)) {
      setCount(targetValue);
      return;
    }

    // Apply delay before starting animation
    const timeoutId = setTimeout(() => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Enhanced easing function (ease-out cubic)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = easedProgress * targetValue;
        
        setCount(decimals > 0 ? parseFloat(currentCount.toFixed(decimals)) : Math.floor(currentCount));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(targetValue);
        }
      };

      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [inView, target, duration, delay, decimals]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {count}
      {target.replace(/[0-9.]/g, '')}
    </motion.span>
  );
}
