# CLAUDE.md - car-demo-app (AutoCare Pro)

> **Documentation Version**: 1.0
> **Last Updated**: 2026-03-24
> **Project**: car-demo-app
> **Description**: AutoCare Pro — Automotive One-Stop Service PWA (Frontend Demo). Mobile-first PWA for an automotive one-stop service business. Frontend-only demo with mock data. Deploy target: Vercel.

## Tech Stack
- Next.js 14 (App Router) with PWA support (next-pwa)
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Framer Motion

## Design Direction
- Mobile-first, fully responsive
- Light color scheme — clean, bright, well-spaced
- Primary color: Orange (#FF6B35) on white background
- Secondary: Light grey card backgrounds (#F8F8F8)
- Bilingual: English + 中文 (Chinese) with language toggle, preference stored in localStorage
- Subtle Framer Motion transitions — not overdone
- Feels like a real designer built it, not a template

## Project Structure
```
car-demo-app/
├── CLAUDE.md
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── products/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── points/
│   │   └── profile/
│   ├── components/       # React components
│   │   ├── ui/           # Shadcn/UI components
│   │   ├── layout/       # Layout components (nav, footer, etc.)
│   │   ├── home/         # Home page components
│   │   ├── products/     # Product-related components
│   │   ├── cart/         # Cart components
│   │   ├── checkout/     # Checkout components
│   │   ├── points/       # Loyalty points components
│   │   ├── profile/      # Profile components
│   │   └── shared/       # Shared/common components
│   ├── lib/              # Utility functions, helpers
│   ├── data/             # Mock data (products, user, transactions)
│   ├── types/            # TypeScript type definitions
│   └── hooks/            # Custom React hooks
├── public/               # Static assets, PWA manifest, icons
│   └── icons/
└── docs/                 # Documentation
```

## Pages
1. Home (`/`) — Hero, feature highlights, category tabs, featured products, bottom nav
2. Products (`/products`) — Search, filter tabs, product grid, cart icon
3. Cart (`/cart`) — Item list with quantity controls, subtotal/total, checkout button
4. Checkout (`/checkout`) — Order summary, mock payment selection, success modal
5. Loyalty Points (`/points`) — Points balance, redeem section, transaction history
6. Profile (`/profile`) — User info, order history, language toggle, logout

## Key Rules
- All data is mock/hardcoded — no backend or database
- No real authentication — mock user always active
- Product images use placeholder (grey box with icon), no external URLs
- Chinese translations should be natural, not stiff
- Shadcn/UI components customized to match brand color (#FF6B35)
- No lorem ipsum — realistic automotive service content only
- Currency is RM (Malaysian Ringgit)
- Points system: RM1 = 1 Point

## Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linter
```
