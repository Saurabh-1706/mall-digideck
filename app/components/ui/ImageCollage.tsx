'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CollageImage {
  src: string;
  alt: string;
  size?: 'large' | 'medium' | 'small';
  label?: string;
}

interface ImageCollageProps {
  images: CollageImage[];
  layout?: 'left-heavy' | 'right-heavy' | 'center' | 'masonry' | 'strip' | 'featured' | 'horizontal';
  className?: string;
  hoverEffect?: boolean;
}

// ─── Strip tile: landscape crop, no borders ──────────────────────────────────
function StripTile({
  image,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  image: CollageImage;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const isHovered = hoveredIndex === index;
  return (
    <motion.div
      className="relative flex-1 overflow-hidden cursor-pointer"
      style={{ minWidth: 0 }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover rounded-lg"
        animate={{ scale: isHovered ? 1.06 : 1 }}
        transition={{ duration: 0.5 }}
      />
      {/* Dim others on hover for focus effect */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: hoveredIndex !== null && !isHovered ? 0.45 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Label bar slides up on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
        transition={{ duration: 0.25 }}
      >
        {image.label && (
          <span className="text-white text-xs font-semibold tracking-widest uppercase">
            {image.label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Collage tile: contain, no borders, subtle bg ────────────────────────────
function CollageTile({
  image,
  index,
  hoveredIndex,
  setHoveredIndex,
  className = '',
}: {
  image: CollageImage;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  className?: string;
}) {
  const isHovered = hoveredIndex === index;
  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <motion.img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-contain bg-black/30 rounded-lg"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.45 }}
      />
      {/* Gradient + label on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent rounded-lg"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />
      {image.label && (
        <motion.div
          className="absolute bottom-2 left-3 right-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
          transition={{ duration: 0.25 }}
        >
          <span className="text-white text-xs font-semibold tracking-widest uppercase">
            {image.label}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function ImageCollage({ 
  images, 
  layout = 'left-heavy',
  className = '',
  hoverEffect = true,
}: ImageCollageProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const tp = { hoveredIndex, setHoveredIndex };

  if (images.length === 0) return null;

  // ── Strip: horizontal landscape row, compact height ─────────────────────────
  if (layout === 'strip') {
    return (
      <div className={`flex gap-1.5 w-full h-full ${className}`}>
        {images.map((img, i) => (
          <StripTile key={i} image={img} index={i} {...tp} />
        ))}
      </div>
    );
  }

  // ── Masonry: 2-column stagger ────────────────────────────────────────────────
  if (layout === 'masonry') {
    const col1 = images.filter((_, i) => i % 2 === 0);
    const col2 = images.filter((_, i) => i % 2 === 1);
    return (
      <div className={`flex gap-2 h-full ${className}`}>
        <div className="flex flex-col gap-2 flex-1">
          {col1.map((img, i) => (
            <div key={i} className="flex-1" style={{ minHeight: 0 }}>
              <CollageTile image={img} index={i * 2} {...tp} className="w-full h-full" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 flex-1 mt-8">
          {col2.map((img, i) => (
            <div key={i} className="flex-1" style={{ minHeight: 0 }}>
              <CollageTile image={img} index={i * 2 + 1} {...tp} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Horizontal: 4 equal columns ─────────────────────────────────────────────
  if (layout === 'horizontal') {
    return (
      <div className={`flex gap-2 h-full ${className}`}>
        {images.slice(0, 4).map((img, i) => (
          <div key={i} className="flex-1">
            <CollageTile image={img} index={i} {...tp} className="w-full h-full" />
          </div>
        ))}
      </div>
    );
  }

  // ── Featured: Large hero + 3 stacked on right ────────────────────────────────
  if (layout === 'featured') {
    const [hero, ...rest] = images;
    return (
      <div className={`flex gap-2 h-full ${className}`}>
        <div className="flex-[2]">
          <CollageTile image={hero} index={0} {...tp} className="w-full h-full" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {rest.slice(0, 3).map((img, i) => (
            <div key={i} className="flex-1">
              <CollageTile image={img} index={i + 1} {...tp} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Left-heavy: 1 large left + stacked right ─────────────────────────────────
  if (layout === 'left-heavy') {
    const [main, ...rest] = images;
    return (
      <div className={`flex gap-2 h-full ${className}`}>
        <div className="flex-[2]">
          <CollageTile image={main} index={0} {...tp} className="w-full h-full" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          {rest.slice(0, 3).map((img, i) => (
            <div key={i} className="flex-1">
              <CollageTile image={img} index={i + 1} {...tp} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Right-heavy: stacked left + 1 large right ────────────────────────────────
  if (layout === 'right-heavy') {
    const last = images[images.length - 1];
    const rest = images.slice(0, images.length - 1);
    return (
      <div className={`flex gap-2 h-full ${className}`}>
        <div className="flex-1 flex flex-col gap-2">
          {rest.slice(0, 3).map((img, i) => (
            <div key={i} className="flex-1">
              <CollageTile image={img} index={i} {...tp} className="w-full h-full" />
            </div>
          ))}
        </div>
        <div className="flex-[2]">
          <CollageTile image={last} index={rest.length} {...tp} className="w-full h-full" />
        </div>
      </div>
    );
  }

  // ── Center: small | large | small + extras row ───────────────────────────────
  const [topLeft, center, topRight, ...extras] = images;
  return (
    <div className={`flex flex-col gap-2 h-full ${className}`}>
      <div className="flex gap-2 flex-1">
        {topLeft && (
          <div className="flex-1">
            <CollageTile image={topLeft} index={0} {...tp} className="w-full h-full" />
          </div>
        )}
        {center && (
          <div className="flex-[2]">
            <CollageTile image={center} index={1} {...tp} className="w-full h-full" />
          </div>
        )}
        {topRight && (
          <div className="flex-1">
            <CollageTile image={topRight} index={2} {...tp} className="w-full h-full" />
          </div>
        )}
      </div>
      {extras.length > 0 && (
        <div className="flex gap-2 flex-1">
          {extras.slice(0, 3).map((img, i) => (
            <div key={i} className="flex-1">
              <CollageTile image={img} index={i + 3} {...tp} className="w-full h-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
