'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface GSAPSectionAnimationOptions {
  staggerChildren?: boolean;
  delay?: number;
  duration?: number;
  pattern?: 'fade-up' | 'scale-in' | 'slide-left' | 'slide-right';
}

export function useGSAPSectionAnimation(
  sectionRef: React.RefObject<HTMLElement>,
  options: GSAPSectionAnimationOptions = {}
) {
  const {
    staggerChildren = true,
    delay = 0,
    duration = 0.8,
    pattern = 'fade-up',
  } = options;

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const childrenRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay });

      // Animate title based on pattern
      if (titleRef.current) {
        switch (pattern) {
          case 'fade-up':
            tl.fromTo(titleRef.current,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: duration * 0.8, ease: 'power2.out' }
            );
            break;
          case 'scale-in':
            tl.fromTo(titleRef.current,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration: duration * 0.8, ease: 'back.out(1.7)' }
            );
            break;
          case 'slide-left':
            tl.fromTo(titleRef.current,
              { opacity: 0, x: -80 },
              { opacity: 1, x: 0, duration: duration * 0.8, ease: 'power2.out' }
            );
            break;
          case 'slide-right':
            tl.fromTo(titleRef.current,
              { opacity: 0, x: 80 },
              { opacity: 1, x: 0, duration: duration * 0.8, ease: 'power2.out' }
            );
            break;
        }
      }

      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: duration * 0.6, ease: 'power2.out' },
          '-=0.3'
        );
      }

      // Animate children with stagger
      if (staggerChildren && childrenRef.current) {
        const children = childrenRef.current.children;
        if (children.length > 0) {
          tl.fromTo(children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: duration * 0.6,
              stagger: 0.1,
              ease: 'power2.out',
            },
            '-=0.2'
          );
        }
      }
    });

    return () => ctx.revert();
  }, { scope: sectionRef });

  return { titleRef, subtitleRef, childrenRef };
}
