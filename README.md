# NerdsTech — Agency Website

Official website for **NerdsTech** (nerdstech.co) — AI automation, web design & development, branding, SEO, and mobile app studio.

Built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS v4**, and **Framer Motion**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production

```bash
npm run build
npm start
```

Deploys cleanly to [Vercel](https://vercel.com) — just import this repo.

## Project structure

- `src/app/` — routes: Home, Services, Work, About, Contact (+ `sitemap.ts`, `robots.ts`)
- `src/components/` — Navbar, Footer, and shared UI
- `src/components/home/` — homepage sections (Hero, Services, Stats, Work, Process, Testimonials, Pricing, FAQ, Contact)
- `src/data/content.ts` — all site copy (services, projects, pricing, FAQs)
- `src/site.ts` — brand config: name, domain, email, phone, address, socials
- `public/llms.txt` — AI-crawler summary (AI SEO)
- `public/` — logo, favicons, OG social image

## Customizing

- Brand details (name, domain, contact info): edit `src/site.ts`
- Copy (services, projects, pricing, FAQs, testimonials): edit `src/data/content.ts`
- The contact form is front-end only — wire `src/components/home/ContactSection.tsx` to Formspree, Resend, or Web3Forms to receive submissions.

## SEO

Per-page metadata + canonical URLs, Open Graph/Twitter cards, JSON-LD structured data (Organization, WebSite, FAQPage, Service list), `sitemap.xml`, `robots.txt` (welcomes AI crawlers), and `llms.txt`.
