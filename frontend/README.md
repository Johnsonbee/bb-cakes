# BB Cakes & More — Landing Page

A premium, conversion-focused landing page for BB Cakes & More bakery.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **GSAP** (ScrollTrigger, animations)
- **Lenis** (Smooth scroll)
- **Swiper** (Hero slider)
- **Lucide React** (Icons)

## Getting Started

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Add Your Images

Place your images in the `public/images/` folders according to the naming convention below.

### 3. Configure WhatsApp

Open `lib/whatsapp.ts` and replace `234XXXXXXXXXX` with BB Cakes' actual WhatsApp number.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 5. Build for Production

```bash
npm run build
```

## Project Structure

```m
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page (all sections)
│   └── globals.css        # Global styles + Tailwind
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Cravings.tsx
│   ├── FreshFromOven.tsx
│   ├── AboutUs.tsx
│   ├── Academy.tsx
│   ├── Celebration.tsx
│   ├── Testimonials.tsx
│   ├── Footer.tsx
│   ├── FloatingWhatsApp.tsx
│   └── SmoothScrollProvider.tsx
├── data/                  # Static data
│   ├── heroSlides.ts
│   ├── products.ts
│   ├── testimonials.ts
│   ├── cravings.ts
│   ├── occasions.ts
│   └── academy.ts
├── hooks/                 # Custom React hooks
│   └── useLenis.ts
├── lib/                   # Utilities
│   └── whatsapp.ts
└── public/                # Static assets
    ├── images/
    └── logo/
```

## Sections

1. **Navbar** — Transparent → glassmorphic on scroll. Mobile hamburger menu.
2. **Hero** — Responsive dual-experience slider: dedicated top cake visual + bottom text stage on mobile, 16:9 widescreen right-aligned composition on desktop. Automatic responsive image selection via `heroSlides.ts`.
3. **Cravings** — 4 interactive category cards (Cakes, Pastries, Custom, Academy).
4. **Fresh From BB's Oven** — Product showcase carousel with GSAP transitions.
5. **About Us** — Owner portrait + story + stats.
6. **BB Academy** — 3 program cards (Adult Classes, Kids Summer, Community).
7. **Celebration** — Interactive occasion selector with dynamic content.
8. **Testimonials** — Auto-advancing story slider with pause on hover.
9. **Footer** — Large typographic CTA + contact info.
10. **Floating WhatsApp** — Fixed bottom-right button with quick messages.

## Design Principles

- **Mobile-first** — Every section optimized for mobile conversion.
- **WhatsApp-first** — Primary CTA everywhere is WhatsApp ordering.
- **Visual storytelling** — Images and animations carry the narrative.
- **Warm, fun & premium** — Cream/pink palette with fun, design-forward rounded headings (**Fredoka**), clean rounded modern body (**Quicksand**), and cursive bakery accents (**Alex Brush**).
- **Performance-conscious** — Reduced motion support, optimized animations, zero external font network hits via `next/font/google`.

## Customization

- Colors: Edit `tailwind.config.ts`
- Content: Edit files in `data/`
- WhatsApp number: Edit `lib/whatsapp.ts`
- Fonts: Configured via `next/font/google` in `app/layout.tsx` and mapped in `tailwind.config.ts` (`font-serif`, `font-sans`, `font-script`)
