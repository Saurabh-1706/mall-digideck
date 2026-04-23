'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface GSAPAnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  trigger?: boolean;
}

export default function GSAPAnimatedText({
  children,
  className = '',
  delay = 0,
  duration = 1,
  trigger = true,
}: GSAPAnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !trigger) return;

    const elements = containerRef.current.querySelectorAll('.gsap-char');
    
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: duration,
        stagger: 0.03,
        delay: delay,
        ease: 'back.out(1.7)',
      }
    );
  }, { scope: containerRef, dependencies: [trigger] });

  // Split text into individual characters
  const splitText = (text: React.ReactNode): React.ReactNode[] => {
    if (typeof text !== 'string') return [text];
    
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="gsap-char inline-block"
        style={{ opacity: 0 }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={className}>
      {splitText(children)}
    </div>
  );
}
