import {
  Bot,
  MessagesSquare,
  Code2,
  PenTool,
  Fingerprint,
  FileText,
  TrendingUp,
  Share2,
  Clapperboard,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------- Types --------------------------------- */

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  long: string;
  deliverables: string[];
}

export interface Project {
  slug: string;
  client: string;
  title: string;
  category: string;
  description: string;
  result: string;
  accent: string;
}

/* -------------------------------- Services -------------------------------- */

export const SERVICES: Service[] = [
  {
    slug: "ai-automation",
    icon: Bot,
    title: "AI Automation",
    short: "Workflows that run themselves — lead routing, follow-ups, invoicing, reporting.",
    long: "We wire your tools together so repetitive work happens on its own. From instant lead routing and smart follow-ups to invoice reminders and weekly reports — your operations keep moving while you sleep.",
    deliverables: ["Workflow audit & mapping", "CRM / tool integrations", "AI agents & triggers", "Team training & docs"],
  },
  {
    slug: "ai-chat-support",
    icon: MessagesSquare,
    title: "AI Chat Support",
    short: "A trained assistant that answers customers instantly, day or night.",
    long: "A chat assistant trained on your business that resolves questions in seconds and hands off to a human exactly when it matters. Fewer missed messages, happier customers, calmer team.",
    deliverables: ["Knowledge-base training", "Brand-tuned tone of voice", "Human hand-off rules", "Analytics dashboard"],
  },
  {
    slug: "web-design-development",
    icon: Code2,
    title: "Web Design & Development",
    short: "Hand-coded, lightning-fast websites. No bloated page builders.",
    long: "Custom websites built with modern frameworks — fast by default, accessible, and easy to scale. Every page is designed around one job: turning visitors into customers.",
    deliverables: ["UX/UI design", "Next.js development", "CMS integration", "Speed & Core Web Vitals tuning"],
  },
  {
    slug: "logo-design",
    icon: PenTool,
    title: "Logo Design",
    short: "A mark drawn from your story, not a template.",
    long: "Logos built from strategy first: who you are, who you're for, and where the mark has to live. The result is recognizable at a glance — from a favicon to a billboard.",
    deliverables: ["Discovery & moodboards", "3 original concepts", "Refinement rounds", "Full file & usage kit"],
  },
  {
    slug: "branding",
    icon: Fingerprint,
    title: "Brand Identity",
    short: "Colors, type, and voice that hold together everywhere you show up.",
    long: "A complete identity system — palette, typography, imagery rules, and tone of voice — documented so every touchpoint reads like one confident decision.",
    deliverables: ["Brand strategy", "Visual identity system", "Brand guidelines book", "Collateral templates"],
  },
  {
    slug: "content-writing",
    icon: FileText,
    title: "Content Writing",
    short: "Copy that holds attention and moves readers toward yes.",
    long: "Website copy, blogs, and product pages written for humans first and search engines second. Clear, persuasive, and unmistakably in your voice.",
    deliverables: ["Website copywriting", "Blog & article writing", "Product descriptions", "Content calendars"],
  },
  {
    slug: "seo",
    icon: TrendingUp,
    title: "SEO & AI Search",
    short: "Get found on Google — and cited in AI answers.",
    long: "Technical fixes, keyword strategy, and structured content engineered for classic search and the new AI-search era: featured snippets, LLM citations, and local packs.",
    deliverables: ["Technical SEO audit", "Keyword & topic strategy", "On-page optimization", "llms.txt & AI-readiness"],
  },
  {
    slug: "social-media-marketing",
    icon: Share2,
    title: "Social Media Marketing",
    short: "Campaigns tuned to how each platform actually works.",
    long: "Content calendars, creatives, and paid campaigns built per-platform — not copy-pasted. We track what converts, not just what gets likes.",
    deliverables: ["Channel strategy", "Creative production", "Paid social management", "Monthly growth reports"],
  },
  {
    slug: "motion-graphics",
    icon: Clapperboard,
    title: "Motion Graphics",
    short: "Explainers and product reveals that say more in ten seconds.",
    long: "Animated explainers, logo stings, product reveals, and social clips — motion that makes complex ideas instantly obvious and brands instantly memorable.",
    deliverables: ["Explainer videos", "Product animations", "Social clip packs", "Logo & brand motion"],
  },
  {
    slug: "mobile-app-development",
    icon: Smartphone,
    title: "Mobile App Development",
    short: "iOS & Android apps that feel native, minus the maintenance drama.",
    long: "Native-feeling apps for iOS and Android from a single codebase. Designed, built, shipped to the stores, and maintained — without the usual headaches.",
    deliverables: ["Product & UX design", "Cross-platform build", "App Store deployment", "Maintenance plans"],
  },
];

/* --------------------------------- Work ----------------------------------- */

export const PROJECTS: Project[] = [
  {
    slug: "ironpulse-fitness",
    client: "IronPulse Fitness",
    title: "Gym management platform",
    category: "Web App",
    description:
      "Bookings, memberships, trainer schedules, and payments — previously spread across four tools — rebuilt as one dashboard the whole team actually enjoys using.",
    result: "4 tools → 1 platform · 38% fewer no-shows",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    slug: "atelier-north",
    client: "Atelier North",
    title: "Studio identity system",
    category: "Branding",
    description:
      "A full identity for an architecture studio: wordmark, type system, and a guidelines book their whole team can follow without a designer on call.",
    result: "Full rebrand shipped in 5 weeks",
    accent: "from-amber-400 to-orange-500",
  },
  {
    slug: "pulseboard",
    client: "Pulseboard",
    title: "Analytics dashboard",
    category: "Web App",
    description:
      "A real-time analytics product for e-commerce teams — custom charts, alerts, and exports, wrapped in an interface non-technical founders understand.",
    result: "0.9s avg. load · 12k daily users",
    accent: "from-cyan-400 to-sky-500",
  },
  {
    slug: "tabletap",
    client: "TableTap",
    title: "Booking & check-in app",
    category: "Mobile App",
    description:
      "A restaurant group’s reservation and table-side check-in app for iOS and Android, with push reminders that quietly cut empty tables.",
    result: "4.8★ store rating · 60k downloads",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    slug: "cornerstone-dental",
    client: "Cornerstone Dental",
    title: "Local search overhaul",
    category: "SEO",
    description:
      "Technical cleanup, service-page rewrites, and a review engine for a three-location dental practice competing in a crowded local map pack.",
    result: "+212% organic calls in 6 months",
    accent: "from-rose-400 to-pink-500",
  },
  {
    slug: "harbor-realty",
    client: "Harbor Realty",
    title: "Workflow & chatbot rollout",
    category: "AI Automation",
    description:
      "New listings now route to the right agent in seconds, an AI assistant answers buyer questions 24/7, and follow-ups happen without anyone remembering to.",
    result: "3.1x faster lead response",
    accent: "from-indigo-400 to-violet-500",
  },
];

/* -------------------------------- Process --------------------------------- */

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    text: "We dig into your goals, customers, and bottlenecks — then map the shortest path from where you are to where you need to be.",
  },
  {
    step: "02",
    title: "Design",
    text: "Wireframes evolve into polished, on-brand interfaces. You see real screens early and give feedback while changes are cheap.",
  },
  {
    step: "03",
    title: "Build",
    text: "Clean code, AI wired in where it earns its keep, and rigorous testing across devices. No surprises at launch.",
  },
  {
    step: "04",
    title: "Launch & Grow",
    text: "We ship, measure, and iterate. SEO, content, and automation keep compounding long after go-live day.",
  },
];

/* ------------------------------- Testimonials ---------------------------- */

export const TESTIMONIALS = [
  {
    quote:
      "They replaced three separate vendors with one team that actually talks to itself. Our new site paid for itself in the first quarter.",
    name: "Maya R.",
    role: "Founder, IronPulse Fitness",
  },
  {
    quote:
      "The AI assistant handles 70% of our after-hours questions now. My front desk finally gets to do front-desk work.",
    name: "Daniel K.",
    role: "Owner, Cornerstone Dental",
  },
  {
    quote:
      "Fast, honest, and allergic to jargon. They told us what we didn't need — then built exactly what we did.",
    name: "Sofia L.",
    role: "CMO, Harbor Realty",
  },
];

/* --------------------------------- Pricing -------------------------------- */
// Placeholder tiers — edit freely in src/data/content.ts

export const PRICING = [
  {
    name: "Launch",
    price: "$1,900",
    period: "starting at",
    blurb: "For new businesses that need to look legit, fast.",
    features: ["Brand starter kit or landing page", "Mobile-first responsive build", "Basic on-page SEO", "Contact & lead capture setup", "2 revision rounds"],
    featured: false,
    cta: "Start with Launch",
  },
  {
    name: "Grow",
    price: "$4,900",
    period: "starting at",
    blurb: "Our most popular — a full website built to convert.",
    features: [
      "Custom multi-page website",
      "Copywriting & brand polish",
      "Technical SEO + AI-search setup",
      "Blog / CMS integration",
      "Analytics & conversion tracking",
      "30 days post-launch support",
    ],
    featured: true,
    cta: "Grow with us",
  },
  {
    name: "Scale",
    price: "$9,900+",
    period: "custom quote",
    blurb: "Apps, automation, and always-on growth engines.",
    features: [
      "Everything in Grow",
      "AI automation & chat support",
      "Web or mobile app build",
      "Advanced integrations (CRM, payments)",
      "Dedicated project manager",
      "Priority support plan",
    ],
    featured: false,
    cta: "Talk to us",
  },
];

/* ----------------------------------- FAQ ---------------------------------- */

export const FAQS = [
  {
    q: "How quickly can we start a project?",
    a: "Most projects kick off within one week of signing. Smaller builds (landing pages, brand refreshes) can start even sooner — tell us your deadline and we'll be honest about what's possible.",
  },
  {
    q: "Do you only work with large companies?",
    a: "Not at all. Roughly half our clients are startups and small businesses. Our Launch tier exists specifically so early-stage companies can get agency-quality work without agency-sized budgets.",
  },
  {
    q: "Who owns the final code and designs?",
    a: "You do — 100%. On final payment, all source files, designs, and accounts transfer to you. No lock-in, no hostage situations, no licensing surprises.",
  },
  {
    q: "Will my website actually rank on Google?",
    a: "Every site we ship is technically SEO-ready: fast loads, clean structure, proper metadata, and AI-search formatting. Rankings also depend on competition and content over time — we'll give you a straight answer about your market before you spend a dollar.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. Every project includes a post-launch support window, and most clients move to a simple monthly care plan covering updates, backups, monitoring, and small improvements.",
  },
  {
    q: "Can you take over or fix my existing website?",
    a: "Absolutely. We audit what's there, tell you what's worth keeping, and rebuild or repair only what needs it. About a third of our work starts as rescue missions.",
  },
];

/* ---------------------------------- Stats --------------------------------- */

export const STATS = [
  { value: 10, suffix: "", label: "Services under one roof" },
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 24, suffix: "h", label: "Max. response time", prefix: "<" },
];
