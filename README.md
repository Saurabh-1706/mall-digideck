# 🏙️ West Edmonton Mall — Interactive Digideck

> A cinematic, browser-based **slide deck** built for North America's largest mall. Designed to impress prospective tenants, sponsors, and event partners with an immersive, non-linear presentation that feels like a premium Digideck — not a website.

---

## 1. Overview

This is a **9-slide interactive sales deck** built for West Edmonton Mall's commercial partnerships team. It replaces a traditional PDF deck or sales presentation with a browser-based experience where each section is a full-screen slide — navigated by click, keyboard arrow, or the persistent bottom navigation bar.

**Who it's for:** Retail tenants, brand sponsors, event partners, and corporate clients evaluating WEM as a commercial platform.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2.4 (App Router) |
| **UI** | React 19.2.4 + TypeScript |
| **Styling** | Tailwind CSS 4.x + custom CSS variables |
| **Animation** | Framer Motion 12 |
| **AI** | OpenAI GPT-4o via `/api/personalize` |
| **Fonts** | Cormorant Garamond · DM Sans · DM Mono (Google Fonts) |

---

## 3. Setup

```bash
# 1. Clone the repo
git clone https://github.com/Saurabh-1706/mall-digideck.git
cd mall-digideck

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# → edit .env.local and add your ANTHROPIC_API_KEY

# 4. Start development server
npm run dev
# → http://localhost:3000
```

### Required Environment Variable

```bash
# .env.local
OPENAI_API_KEY=sk-proj-...
```

Get your key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys).

> **Without the key:** The AI slide still works — it falls back to template copy using the brand name. No errors, no broken UI.

---

## 4. Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

Or: push to GitHub → import at [vercel.com/new](https://vercel.com/new) → add environment variable → Deploy.

### ⚠️ Fix 401 Error on Vercel

If you see a **401 Unauthorized** error when visiting your Vercel URL, it's because **Deployment Protection** is enabled by default.

**To fix:**
1. Go to your Vercel project dashboard
2. **Settings → Deployment Protection**
3. **Vercel Authentication → set to OFF**
4. Redeploy

### Add API Key to Vercel

1. Vercel project → **Settings → Environment Variables**
2. Add: `OPENAI_API_KEY` = `sk-proj-...`
3. Redeploy for the change to take effect

---

## 5. AI Integration — The Brand Personalizer

**Slide 7 features an AI-powered Brand Personalizer built on OpenAI GPT-4o.**

The prospect enters their brand name, selects a category (Luxury Fashion, Technology, F&B, etc.) and a goal (Flagship, Pop-Up, Sponsorship, etc.), then hits **"Generate My Pitch →"**. In under 3 seconds, Claude returns a fully personalized WEM pitch — custom hook, opportunity paragraph, strategic fit analysis, and a call-to-action line.

This replaces a 45-minute sales call with a 30-second interactive experience that makes the commercial opportunity feel personal and immediate.

**API Route:** `POST /api/personalize` with `{ brand, category, goal }`  
**Returns:** `{ hook, opportunity, pitch, cta }`  
**Fallback:** If the API key is missing or the call fails, the slide returns high-quality template copy using the brand name — no broken UI, no error states shown to the user.

---

## 6. The "I Need To Be Here" Moments

Three interactive features are designed to create an unmissable emotional hook:

### Zone Map (Slide 2 — Retail)
An interactive SVG floor plan of WEM with 6 clickable zones. Each zone reveals a sliding info panel with daily foot traffic, key tenants, available space, and a direct enquiry CTA. The prospect literally clicks on where their brand would live.

### Venue Hotspot Map (Slide 6 — Events)
5 pulsing gold dots on a dark venue silhouette. Click any dot — a glassmorphism card appears with venue capacity, event type, and a real example activation. Makes abstract event sponsorship feel tangible.

### AI Brand Personalizer (Slide 7 — Your Brand)
Described in detail in Section 5 above. The output is a pitch written specifically for the prospect's brand — not generic copy. This is the moment that closes the interest gap.

---

## 7. Design Decisions

**Slide deck, not scroll:** The entire UX is click-driven with no scrolling. Each section occupies 100vw × 100vh. This mirrors professional Digideck platforms (like Sportsdigita) and prevents the visitor from "skimming" — they experience each slide fully before moving on.

**Fonts:**
- **Cormorant Garamond 300** — all display headlines. The thin weight and serif elegance communicates luxury and authority.
- **DM Sans 300** — body copy. Modern, clean, readable at small sizes.
- **DM Mono** — all eyebrows, labels, counters, nav tabs. Monospace gives a data/precision feel that balances the editorial display font.

**Gold palette (`#C8A96E`):** Warm, not brash. This specific gold reads as premium without feeling garish — closer to champagne than neon.

**Slide transitions:** `opacity` + `scale(0.97→1)` on enter, `scale(1→0.97)` on exit. The subtle scale creates depth without the jarring motion of slides or the lag of full page transitions.

---

## 8. AI Tools Used

| Tool | Purpose |
|---|---|
| **OpenAI GPT-4o** | Brand Personalizer API (`/api/personalize`) |
| **DALL-E / Stable Diffusion** | Supplemental imagery where stock unavailable |
| **Cursor / GitHub Copilot** | Development acceleration |

---

## 9. Slide Map

| # | Slide | Key Feature |
|---|-------|-------------|
| 0 | **Hero** | YouTube video BG, staggered entrance, 4-stat strip |
| 1 | **Scale** | Animated counters + demographic bar charts |
| 2 | **Retail** | Interactive SVG zone map with slide-in info panel |
| 3 | **Luxury** | Full-bleed image, brand name grid |
| 4 | **Dining** | 3-panel full-height hover-reveal layout |
| 5 | **Attractions** | 4-tab crossfading image system |
| 6 | **Events** | SVG venue hotspot map with glassmorphism cards |
| 7 | **Your Brand** | AI-powered personalized pitch generator |
| 8 | **Contact** | 3-tab: Leasing / Sponsorship / Events |

---

## 10. Navigation

| Input | Action |
|---|---|
| Click nav tab | Jump to that slide |
| `→` / `ArrowRight` | Next slide |
| `←` / `ArrowLeft` | Previous slide |
| Nav `→` button | Next slide |
| Nav `←` button | Previous slide |
| Swipe left/right | Next/prev slide (mobile) |

---

© 2026 West Edmonton Mall. Built for commercial presentation purposes.
