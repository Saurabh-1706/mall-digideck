'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface VideoBackgroundProps {
  src?: string;
  imageSrc?: string;
  poster?: string;
  overlay?: string;
  children?: React.ReactNode;
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  kenBurns?: boolean;
}

export default function VideoBackground({
  src,
  imageSrc,
  poster,
  overlay = 'bg-black/60',
  children,
  className = '',
  autoplay = true,
  loop = true,
  kenBurns = false,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '400px 0px',
    triggerOnce: false,
  });

  useEffect(() => {
    if (videoRef.current && src) {
      if (inView && autoplay) {
        // Only attempt to play if we're in view and autoplay is true
        videoRef.current.play().catch(() => {
          // Autoplay blocked, image will show
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView, autoplay, src]);

  return (
    <div ref={ref} className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Primary: Image background (always visible) */}
      {imageSrc && (
        <div 
          className={`absolute inset-0 bg-cover bg-center ${kenBurns ? 'animate-ken-burns' : ''}`}
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        />
      )}
      
      {/* Secondary: Video overlay (enhancement when loaded) */}
      {src && (
        <video
          ref={videoRef}
          className={`video-background ${isLoaded ? 'opacity-80' : 'opacity-0'} transition-opacity duration-700`}
          muted
          loop={loop}
          playsInline
          poster={poster}
          preload="none"
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Fallback gradient if no image provided */}
      {!imageSrc && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary" />
      )}

      {/* Overlay */}
      <div className={`video-overlay ${overlay}`} />

      {/* Content */}
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
}
