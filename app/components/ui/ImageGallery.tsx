'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Maximize2, Pause, Play } from 'lucide-react';
import Image from 'next/image';

const MotionImage = motion(Image);

interface ImageGalleryProps {
  images: string[];
  className?: string;
  autoRotate?: boolean; // Enable auto-rotation
  interval?: number; // Auto-rotation interval in ms (default: 4000)
}

export default function ImageGallery({ 
  images, 
  className = '',
  autoRotate = false,
  interval = 4000,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || isPaused || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoRotate, isPaused, images.length, interval]);

  if (images.length === 0) return null;

  // Single image
  if (images.length === 1) {
    return (
      <div className={`relative group ${className} overflow-hidden`}>
        <Image
          src={images[0]}
          alt="Gallery image"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Maximize2 size={20} />
        </button>
      </div>
    );
  }

  // Multiple images
  return (
    <>
      {/* Gallery */}
      <div 
        className={`relative group ${className} overflow-hidden`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <MotionImage
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Fullscreen button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent"
        >
          <Maximize2 size={20} />
        </button>

        {/* Auto-rotation indicator */}
        {autoRotate && images.length > 1 && (
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent"
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
        )}

        {/* Thumbnail dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent scale-125'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-3 text-white hover:text-accent transition-colors z-10"
          >
            <X size={32} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-accent transition-colors"
          >
            <ChevronLeft size={40} />
          </button>

          <div className="relative w-[90vw] h-[90vh]">
            <MotionImage
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Fullscreen image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white hover:text-accent transition-colors"
          >
            <ChevronRight size={40} />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
