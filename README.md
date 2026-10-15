# Aura Advisory — Premium Study Abroad Landing Website

A modern, responsive landing website for a premium **Study Abroad Advisory** service featuring a cinematic, scroll-controlled background video narrative, interactive destination exploration, transparent advisory principles, structured roadmap, and accessible consultation booking flows.

## ✨ Key Features

- **Cinematic Scroll-Controlled Video Hero**: Full-width video experience synchronized with scroll progress via GSAP ScrollTrigger and requestAnimationFrame seeking.
  - Scene 1: Global Horizons & Earth in Orbit (0s – 5s)
  - Scene 2: Destination Exploration & Flight Paths (5s – 12s)
  - Scene 3: Campus Architecture & Facilities (12s – 18s)
  - Scene 4: Student Life & Quad Arrival (18s – 23s)
- **Explore Study Destinations**: Curated cards for the United Kingdom, Canada, and Australia with fast facts, degree durations, post-study work permit information, and modal overviews.
- **Why Choose Our Advisory**: 4 honest, benefit pillars emphasizing objective matching and transparent advisory principles.
- **Study-Abroad Roadmap**: 4-step structured process from initial diagnostic consultation to campus departure.
- **Accessible Contact Form**: Full validation, WCAG-compliant form fields, real-time feedback, and documented backend integration points.
- **Interactive Calendar Modal**: Fast 1-on-1 consultation scheduling accessible from any CTA on the page.
- **Graceful Fallbacks & Accessibility**: Responsive layout across desktop, tablet, and mobile; poster image fallback; and full support for `prefers-reduced-motion`.

## 🎨 Visual Design Palette

- **Deep Midnight Navy**: `#142235`
- **Slate Blue**: `#344B60`
- **Muted Teal**: `#789A98`
- **Soft Ivory**: `#F4F3EE`
- **Light Mist Grey**: `#E7EBED`
- **Muted Body Text**: `#697783`

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/infouseverpeaksolutions-coder/Study-Abroad.git
cd Study-Abroad

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Animation & Scroll Engine**: GSAP 3 + ScrollTrigger
- **Icons**: Lucide React
- **Styling**: Modern CSS Design System with CSS Custom Properties
