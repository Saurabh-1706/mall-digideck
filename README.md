# 🏙️ West Edmonton Mall — Interactive Digideck

> A cinematic, browser-based **slide deck** built for North America's largest mall. Designed to impress prospective tenants, sponsors, and event partners with an immersive, video-first, non-linear presentation experience that feels like a premium Digideck — not a website.

**Live Demo:** _[Deploy to Vercel — see Deployment section below]_

---

## ✨ What Makes This Different

This is **not a scroll website**. It's a true slide deck engine — each section is a full-screen slide with cinematic entrance animations, triggered precisely when the slide becomes active. Navigation is click-driven with no scroll at all.

---

## 🧠 The "I Need To Be Here" Moment

**Slide 7 features an AI-powered Brand Personalizer.** The prospect enters their brand name, category, and goal. In under 3 seconds, Claude (Anthropic) generates a fully personalized pitch with WEM-specific statistics, strategic positioning, and a custom hook written for their exact business situation.

This feature replaces a 45-minute sales call with a 30-second interactive experience that makes the commercial opportunity feel personal and immediate.

### How It Works
1. Prospect types their brand name (e.g. "Tesla", "Sephora", "Nike")
2. Selects their category chip (Luxury Fashion, Technology, F&B, etc.)
3. Selects their goal (Flagship, Pop-Up, Sponsorship, etc.)
4. Hits **"Generate My Pitch →"**
5. Claude returns: a bold **hook**, **opportunity** paragraph, **why WEM now** argument, and a **CTA line**

### Setting Up the AI Feature

**Step 1 — Get an Anthropic API Key:**
- Go to [console.anthropic.com](https://console.anthropic.com)
- Create an account → API Keys → Create key
- Copy the key (starts with `sk-ant-...`)

**Step 2 — Add to local development:**
```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-api03-...
```

**Step 3 — Add to Vercel (production):**
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add: `ANTHROPIC_API_KEY` = `sk-ant-api03-...`
4. Redeploy

> **Graceful degradation:** If the API key is missing or the call fails, the feature silently falls back to template copy using the brand name. The slide still works — it just won't be AI-generated.

---

## 🗂️ 9 Immersive Slides

| # | Slide | Key Content |
|---|-------|-------------|
| 0 | **Hero** | YouTube video BG, cinematic headline, stat strip |
| 1 | **The Scale** | Animated counters, demographic bar charts |
| 2 | **Retail** | Interactive SVG floor plan with 6 clickable zones |
| 3 | **Luxury Wing** | Gold line sweep, brand grid, HNW stats |
| 4 | **Dining** | 3-panel full-height images with hover reveal |
| 5 | **Attractions** | 4-tab crossfade (Galaxyland/Waterpark/Ice/Sea Life) |
| 6 | **Events** | SVG hotspot map with 5 venue cards |
| 7 | **Your Brand Here** | AI-powered personalized pitch generator |
| 8 | **Contact** | 3-tab: Retail Leasing / Sponsorship / Events |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2.4 (App Router) |
| **UI** | React 19.2.4 + TypeScript |
| **Styling** | Tailwind CSS 4.x + custom CSS |
| **Animation** | Framer Motion 12 |
| **AI** | Anthropic Claude (via `/api/personalize`) |
| **Fonts** | Cormorant Garamond · DM Sans · DM Mono |

---

## 🎨 Design Tokens

```css
--black:      #080808   /* Deep black — slide backgrounds */
--gold:       #C8A96E   /* WEM gold — active states, CTAs, accents */
--gold-light: #E2C898   /* Hover gold */
--text:       #DDD5C4   /* Primary text */
--muted:      #6A6050   /* Secondary / label text */
```

**Typography:**
- **Display** — Cormorant Garamond 300 (all headlines)
- **Body** — DM Sans 300
- **Labels / Eyebrows** — DM Mono uppercase, letter-spacing 0.2em

---

## 🏗️ Project Structure

```
mall2/
├── app/
│   ├── layout.tsx                    # Root layout, Google Fonts
│   ├── page.tsx                      # Slide deck engine (state + transitions)
│   ├── globals.css                   # Design tokens + all responsive CSS
│   ├── api/
│   │   └── personalize/route.ts      # Claude AI pitch generation endpoint
│   └── components/
│       ├── LoadingScreen.tsx         # WEM monogram + gold progress bar
│       ├── IntroVideo.tsx            # Entry screen + cinematic intro video
│       ├── navigation/
│       │   └── BottomNav.tsx         # Top nav: logo · tabs · counter · arrows
│       └── sections/
│           ├── HeroSection.tsx       # Slide 0: YouTube BG + stat strip
│           ├── ScaleSection.tsx      # Slide 1: Counters + bar charts
│           ├── RetailSection.tsx     # Slide 2: SVG floor plan
│           ├── LuxurySection.tsx     # Slide 3: Gold line + brand grid
│           ├── DiningSection.tsx     # Slide 4: 3-panel hover reveal
│           ├── AttractionsSection.tsx # Slide 5: 4-tab crossfade
│           ├── EventsSection.tsx     # Slide 6: Hotspot map
│           ├── PersonalizeSection.tsx # Slide 7: AI pitch generator
│           └── CTASection.tsx        # Slide 8: Contact tabs
└── public/
    ├── images/                       # All local image assets
    │   └── new/                      # Curated attraction photography
    └── videos/                       # WEM promotional videos
```

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local
# → edit .env.local and add ANTHROPIC_API_KEY

# Start dev server
npm run dev
# → http://localhost:3000
```

---

## ☁️ Deployment (Vercel)

### Quick Deploy
```bash
npm i -g vercel
vercel login
vercel --prod
```

### GitHub → Vercel Dashboard
1. Push: `git push origin main`
2. Go to [vercel.com/new](https://vercel.com/new) → Import repo
3. Framework: **Next.js** (auto-detected)
4. Add environment variable: `ANTHROPIC_API_KEY`
5. Click **Deploy** — live in ~2 minutes

### Required Environment Variables

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys |

---

## 🧭 Navigation

| Method | Action |
|---|---|
| Click tab in nav bar | Jump to that slide |
| `→` / `ArrowRight` key | Next slide |
| `←` / `ArrowLeft` key | Previous slide |
| Nav `→` arrow button | Next slide |
| Nav `←` arrow button | Previous slide |

---

## 🔮 Business Conversion Paths

```
Retail Leasing:   Hero → Retail (zone map) → Contact (Leasing tab) → leasing@wem.ca
Sponsorship:      Hero → Events (hotspot map) → Contact (Sponsorship tab) → partnerships@wem.ca
Event Booking:    Hero → Events → Contact (Events tab) → events@wem.ca
Brand Pitch:      Hero → Your Brand Here (AI pitch) → Contact → conversation
```

---

## 📄 License

Built for West Edmonton Mall commercial presentation purposes.  
© 2026 West Edmonton Mall. All rights reserved.
