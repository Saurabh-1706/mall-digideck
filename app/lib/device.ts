// Device detection and optimization utilities

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function getOptimalParticleCount(baseCount: number): number {
  if (typeof window === 'undefined') return baseCount;
  return isMobile() ? Math.floor(baseCount * 0.5) : baseCount;
}

export function getOptimalPixelRatio(): number {
  if (typeof window === 'undefined') return 1;
  return isMobile() ? 1 : Math.min(window.devicePixelRatio, 2);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
