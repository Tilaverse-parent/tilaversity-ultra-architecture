# Tilaversity Ultra Architecture

A stunning, production-grade web application showcasing the Tilaversity Ultra Architecture — the blueprint for a $1 Trillion AI company.

## Deploy to Vercel in 3 Steps

### Option A: GitHub + Vercel (Recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Next.js — click **Deploy**. Done.

### Option B: Vercel CLI
```bash
npm install
npm run build
npx vercel --prod
```

### Option C: Local Dev
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Tech Stack
- **Framework**: Next.js 14 (Static Export)
- **Fonts**: Cormorant Garamond, Syne, JetBrains Mono (Google Fonts)
- **Animation**: Pure CSS + Canvas API (Neural Network Background)
- **No external UI libraries** — everything custom

## Features
- Animated neural network background canvas
- Scroll-triggered reveal animations
- Sticky navigation with scroll detection
- All 6 Architecture Volumes
- Complete TIS-13 subsystem cards
- Revenue pyramid (6 tiers)
- 4-phase roadmap timeline
- Responsive down to 320px
- Dark mode optimized

## Project Structure
```
tilaversity-ultra/
├── pages/
│   ├── _app.js        # App wrapper
│   └── index.js       # Main page (all components)
├── styles/
│   └── globals.css    # All styles + CSS variables
├── next.config.js     # Static export config
├── vercel.json        # Vercel deployment config
└── package.json
```
