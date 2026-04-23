# Mall2 Project - AI Agent Guide

## Project Overview
**Mall2** is a Next.js 16.2.4 e-commerce application built with the App Router architecture. This is a fresh project initialized with `create-next-app` and uses modern React 19.2.4 with TypeScript.

## Tech Stack
- **Framework**: Next.js 16.2.4 (App Router)
- **React**: 19.2.4
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x with PostCSS
- **Animation**: Framer Motion 12.38.0
- **Font**: Geist Sans & Geist Mono (via next/font)
- **Linting**: ESLint 9.x with eslint-config-next

## Project Structure
```
mall2/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with WEM metadata
│   ├── page.tsx           # Main digideck entry point
│   ├── globals.css        # Global styles with luxury theme
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── SideNav.tsx         # Fixed side dot navigation
│   │   │   └── TopBar.tsx          # Top bar with logo + CTA
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # Cinematic video hero
│   │   │   ├── WhySection.tsx      # Stats & value proposition
│   │   │   ├── RetailSection.tsx   # Retail environment
│   │   │   ├── LuxurySection.tsx   # Luxury wing showcase
│   │   │   ├── DiningSection.tsx   # Dining & lifestyle
│   │   │   ├── AttractionsSection.tsx  # Theme parks
│   │   │   ├── EventsSection.tsx   # Events & activations
│   │   │   └── CTASection.tsx      # Final call-to-action
│   │   ├── ui/
│   │   │   ├── VideoBackground.tsx # Reusable video component
│   │   │   ├── StatCard.tsx        # Animated stat cards
│   │   │   ├── AnimatedCounter.tsx # Number animations
│   │   │   └── ScrollReveal.tsx    # Scroll animations
│   │   └── modules/
│   │       ├── LeasingModule.tsx   # Leasing paths modal
│   │       └── SponsorshipModule.tsx # Sponsorship tiers
│   └── lib/
│       └── constants.ts   # All content data (300 lines)
├── public/                # Static assets
│   ├── videos/            # Video assets (placeholders)
│   └── images/            # Image assets
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── next.config.ts         # Next.js config
├── README.md              # Full documentation
├── PROJECT_SUMMARY.md     # Quick project overview
└── AGENTS.md              # This file
```

## Key Configuration Details

### TypeScript (tsconfig.json)
- **Target**: ES2017
- **Module Resolution**: bundler
- **Strict Mode**: Enabled
- **Path Alias**: `@/*` maps to root directory
- **JSX**: react-jsx
- **Includes**: All .ts, .tsx, .mts files + Next.js generated types

### Next.js Config (next.config.ts)
- Currently using default configuration
- No custom webpack or routing overrides

### Styling Approach
- **Tailwind CSS 4**: Uses new `@import "tailwindcss"` syntax
- **CSS Variables**: Defines `--background` and `--foreground` for theming
- **Dark Mode**: Automatic via `prefers-color-scheme` media query
- **Font Variables**: `--font-geist-sans` and `--font-geist-mono` applied to HTML

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Development Conventions

### File Naming
- Components: PascalCase (e.g., `Header.tsx`)
- Pages: lowercase with hyphens if needed (e.g., `product-detail/page.tsx`)
- Utilities: camelCase (e.g., `formatPrice.ts`)

### Component Structure
- Server Components by default (no `"use client"` directive)
- Use `"use client"` only when needing:
  - React hooks (useState, useEffect, etc.)
  - Browser APIs
  - Event handlers
  - Framer Motion animations

### Path Imports
Use the `@/*` alias for absolute imports:
```typescript
import { Button } from "@/components/Button";
import { formatPrice } from "@/lib/utils";
```

## Current State
This is a **fully functional West Edmonton Mall interactive digideck** with:
- ✅ Cinematic video-first hero section
- ✅ Non-linear navigation (side dots + top bar)
- ✅ 7 immersive sections (Hero, Why, Retail, Luxury, Dining, Attractions, Events, CTA)
- ✅ Scroll-triggered animations with Framer Motion
- ✅ Animated stat counters
- ✅ Expandable Leasing & Sponsorship modules
- ✅ Luxury brand aesthetic (dark + gold palette)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ All content data centralized in constants.ts
- ✅ Video backgrounds with autoplay/pause on scroll
- ✅ Contact CTAs for leasing, sponsorship, and events

## Next Steps / TODOs
Future enhancements for the digideck:
- [ ] Replace placeholder videos with official WEM promotional videos
- [ ] Add WEM official brand logos and imagery
- [ ] Implement Lenis smooth scrolling (currently using native smooth scroll)
- [ ] Add loading skeletons for better UX
- [ ] Optimize video formats (WebM + MP4 fallback)
- [ ] Add Lighthouse performance optimizations
- [ ] Deploy to Vercel for production
- [ ] Add analytics tracking
- [ ] Implement A/B testing for CTAs

## Important Notes for Agents

### DO NOT
- ❌ Scan the entire codebase repeatedly - refer to this guide
- ❌ Modify the video URLs in constants.ts without checking quality first
- ❌ Change the luxury color palette (primary: #0A0A0A, accent: #C9A962)
- ❌ Remove existing sections without user confirmation
- ❌ Change the scroll-triggered animation patterns

### ALWAYS
- ✅ Use `@/*` path alias for imports (or relative paths from component folder)
- ✅ Keep all content data in `app/lib/constants.ts`
- ✅ Use Framer Motion for animations (already installed)
- ✅ Follow the dark + gold luxury aesthetic
- ✅ Make sections video-first (not decoration)
- ✅ Ensure non-linear navigation works when adding new sections
- ✅ Test on multiple screen sizes (mobile, tablet, desktop)

### Video Assets
- Currently using public stock videos from Pexels as placeholders
- Replace VIDEO_URLS in `app/lib/constants.ts` with official WEM videos
- Videos should be: 10-15 seconds, muted, looping, <5MB each, WebM preferred

### Expandable Modules
- LeasingModule and SponsorshipModule are modal overlays
- Trigger them from CTA buttons or add triggers in other sections
- Both modules have their own internal state management

### Next.js 16 Breaking Changes
This version has breaking changes from Next.js 13/14. Always check:
- `node_modules/next/dist/docs/` for latest API changes
- Deprecation notices in console during development
- New routing conventions if applicable

## Token Optimization
This AGENTS.md file contains all project context. Reference it instead of:
- Reading package.json repeatedly
- Scanning directory structure
- Checking configuration files
- Understanding tech stack from scratch

When working on this project, assume everything documented here is current and accurate.

## Digideck User Flow

### User Journey
1. **Landing** → Hero section with cinematic video (immediate emotional impact)
2. **Exploration** → User scrolls or clicks side nav dots to explore sections
3. **Engagement** → Each section tells a story with video + data
4. **Interest** → Expandable modules provide detailed leasing/sponsorship info
5. **Action** → CTA section drives contact for leasing, sponsorship, or events

### Section Flow
```
Hero (video) → Why (stats) → Retail (brands) → Luxury (premium)
    ↓
Dining (lifestyle) → Attractions (entertainment) → Events (activations)
    ↓
CTA (contact + action buttons)
```

### Business Conversion Paths
1. **Retail Leasing Path**: Hero → Retail → Luxury → CTA → Email leasing@wem.ca
2. **Sponsorship Path**: Hero → Events → CTA → Email partnerships@wem.ca
3. **Event Booking Path**: Hero → Events → CTA → Email events@wem.ca

## Quick Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Deploy to Vercel
vercel
```

## Troubleshooting

### Videos Not Loading
- Check network tab for CORS errors
- Verify video URLs in constants.ts
- Ensure videos are publicly accessible

### Animations Not Working
- Check if Framer Motion is installed
- Verify 'use client' directive on components
- Check browser console for errors

### Navigation Not Working
- Ensure section IDs match between SideNav and sections
- Check smooth scroll behavior in globals.css
- Verify Intersection Observer is supported
