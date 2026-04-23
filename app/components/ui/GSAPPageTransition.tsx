'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GSAPPageTransitionProps {
  children: React.ReactNode;
  isActive: boolean;
  direction?: number;
}

export default function GSAPPageTransition({
  children,
  isActive,
  direction = 1,
}: GSAPPageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          x: direction > 0 ? 100 : -100,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      // Animate children with stagger
      const childElements = containerRef.current!.querySelectorAll('.gsap-animate');
      gsap.fromTo(
        childElements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power2.out',
        }
      );
    });

    return () => ctx.revert();
  }, [isActive, direction]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ display: isActive ? 'block' : 'none' }}
    >
      {children}
    </div>
  );
}
