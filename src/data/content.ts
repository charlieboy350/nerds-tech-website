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
  Puzzle,
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
  /** Project slug shown on the back of the flip card ("see it in action"). */
  relatedProject?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectStep {
  title: string;
  text: string;
}

export interface Project {
  slug: string;
  client: string;
  title: string;
  category: string;
  description: string;
  result: string;
  image: string;
  /** CSS object-position for the full-bleed hero (e.g. "center 25%"). Defaults to center. */
  imagePosition?: string;
  timeline: string;
  services: string[];
  overview: string[];
  challenge: string[];
  approach: ProjectStep[];
  metrics: ProjectMetric[];
  testimonial: { quote: string; name: string; role: string };
}

/* -------------------------------- Services -------------------------------- */

export const SERVICES: Service[] = [
  {
    slug: "ai-automation",
    relatedProject: "harbor-realty",
    icon: Bot,
    title: "AI Automation",
    short: "Workflows that run themselves — lead routing, follow-ups, invoicing, reporting.",
    long: "We wire your tools together so repetitive work happens on its own. From instant lead routing and smart follow-ups to invoice reminders and weekly reports — your operations keep moving while you sleep.",
    deliverables: ["Workflow audit & mapping", "CRM / tool integrations", "AI agents & triggers", "Team training & docs"],
  },
  {
    slug: "ai-chat-support",
    relatedProject: "vertex-support",
    icon: MessagesSquare,
    title: "AI Chat Support",
    short: "A trained assistant that answers customers instantly, day or night.",
    long: "A chat assistant trained on your business that resolves questions in seconds and hands off to a human exactly when it matters. Fewer missed messages, happier customers, calmer team.",
    deliverables: ["Knowledge-base training", "Brand-tuned tone of voice", "Human hand-off rules", "Analytics dashboard"],
  },
  {
    slug: "ai-codebase-integration",
    relatedProject: "vertex-support",
    icon: Puzzle,
    title: "AI Codebase Integration",
    short: "We integrate AI into your existing product — carefully, one module at a time.",
    long: "Already have a working product? You don't need a risky rewrite to benefit from AI. We audit your codebase, pinpoint the modules where AI creates the most value, and integrate them one by one — each module shipped, tested, and stable before we move to the next.",
    deliverables: ["AI-readiness codebase audit", "Module-by-module integration roadmap", "Incremental, tested AI rollouts", "Docs & team handover"],
  },
  {
    slug: "web-design-development",
    relatedProject: "ironpulse-fitness",
    icon: Code2,
    title: "Web Design & Development",
    short: "Hand-coded, lightning-fast websites. No bloated page builders.",
    long: "Custom websites built with modern frameworks — fast by default, accessible, and easy to scale. Every page is designed around one job: turning visitors into customers.",
    deliverables: ["UX/UI design", "Next.js development", "CMS integration", "Speed & Core Web Vitals tuning"],
  },
  {
    slug: "logo-design",
    relatedProject: "atelier-north",
    icon: PenTool,
    title: "Logo Design",
    short: "A mark drawn from your story, not a template.",
    long: "Logos built from strategy first: who you are, who you're for, and where the mark has to live. The result is recognizable at a glance — from a favicon to a billboard.",
    deliverables: ["Discovery & moodboards", "3 original concepts", "Refinement rounds", "Full file & usage kit"],
  },
  {
    slug: "branding",
    relatedProject: "atelier-north",
    icon: Fingerprint,
    title: "Brand Identity",
    short: "Colors, type, and voice that hold together everywhere you show up.",
    long: "A complete identity system — palette, typography, imagery rules, and tone of voice — documented so every touchpoint reads like one confident decision.",
    deliverables: ["Brand strategy", "Visual identity system", "Brand guidelines book", "Collateral templates"],
  },
  {
    slug: "content-writing",
    relatedProject: "cornerstone-dental",
    icon: FileText,
    title: "Content Writing",
    short: "Copy that holds attention and moves readers toward yes.",
    long: "Website copy, blogs, and product pages written for humans first and search engines second. Clear, persuasive, and unmistakably in your voice.",
    deliverables: ["Website copywriting", "Blog & article writing", "Product descriptions", "Content calendars"],
  },
  {
    slug: "seo",
    relatedProject: "cornerstone-dental",
    icon: TrendingUp,
    title: "SEO & AI Search",
    short: "Get found on Google — and cited in AI answers.",
    long: "Technical fixes, keyword strategy, and structured content engineered for classic search and the new AI-search era: featured snippets, LLM citations, and local packs.",
    deliverables: ["Technical SEO audit", "Keyword & topic strategy", "On-page optimization", "llms.txt & AI-readiness"],
  },
  {
    slug: "social-media-marketing",
    relatedProject: "pulsefit",
    icon: Share2,
    title: "Social Media Marketing",
    short: "Campaigns tuned to how each platform actually works.",
    long: "Content calendars, creatives, and paid campaigns built per-platform — not copy-pasted. We track what converts, not just what gets likes.",
    deliverables: ["Channel strategy", "Creative production", "Paid social management", "Monthly growth reports"],
  },
  {
    slug: "motion-graphics",
    relatedProject: "pulsefit",
    icon: Clapperboard,
    title: "Motion Graphics",
    short: "Explainers and product reveals that say more in ten seconds.",
    long: "Animated explainers, logo stings, product reveals, and social clips — motion that makes complex ideas instantly obvious and brands instantly memorable.",
    deliverables: ["Explainer videos", "Product animations", "Social clip packs", "Logo & brand motion"],
  },
  {
    slug: "mobile-app-development",
    relatedProject: "swiftbite",
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
    slug: "harbor-realty",
    client: "Harbor Realty",
    title: "Workflow & chatbot rollout",
    category: "AI Automation",
    description:
      "New listings now route to the right agent in seconds, an AI assistant answers buyer questions 24/7, and follow-ups happen without anyone remembering to.",
    result: "3.1x faster lead response",
    image: "/projects/harbor-realty.jpg",
    timeline: "5 weeks",
    services: ["AI Automation", "AI Chat Support", "CRM Integration"],
    overview: [
      "Harbor Realty is a mid-size residential brokerage handling 200+ active listings across three cities. Every new listing triggered a flood of portal inquiries — but their agents were responding in the order messages arrived, which meant serious buyers waited behind casual browsers, and most after-hours questions sat unanswered until morning.",
      "We rebuilt their entire intake: an AI assistant trained on live listings, neighborhood data, and financing FAQs now answers buyers instantly, day or night — while a smart routing workflow scores every lead and puts the hot ones in front of the right agent within seconds.",
    ],
    challenge: [
      "New listings attracted hundreds of inquiries within hours, yet agents replied first-come-first-served — hot buyers waited behind window-shoppers.",
      "Over 60% of buyer questions arrived after office hours and sat unanswered until morning, by which time many buyers had moved on.",
      "Follow-up depended entirely on individual agent discipline — no system, no consistency, no visibility for management.",
      "Their CRM held rich client data, but nothing acted on it automatically; it was a database, not an engine.",
    ],
    approach: [
      {
        title: "Map the chaos",
        text: "We shadowed the team for a week and mapped every inquiry touchpoint — portals, website, phone, walk-ins — then identified exactly where leads stalled or leaked.",
      },
      {
        title: "Score & route",
        text: "Built a lead-scoring workflow on top of their CRM: budget, timeline, and engagement signals now rank every inquiry, and hot leads route to the right specialist agent in under 30 seconds.",
      },
      {
        title: "Train the assistant",
        text: "Deployed an AI chat assistant trained on live listings, price histories, school zones, and mortgage FAQs — with strict handoff rules so complex negotiations always reach a human.",
      },
      {
        title: "Automate follow-up",
        text: "Nurture sequences now run themselves: viewing reminders, price-drop alerts, and check-ins go out on schedule, logged back to the CRM with full context.",
      },
    ],
    metrics: [
      { value: "3.1x", label: "Faster lead response time" },
      { value: "74%", label: "After-hours questions answered instantly" },
      { value: "41%", label: "More qualified viewings booked" },
      { value: "5 hrs", label: "Saved per agent, every week" },
    ],
    testimonial: {
      quote:
        "Our agents used to lose entire evenings to inbox triage. Now the hot leads are already talking to someone before the agent's coffee is done — and nobody drops a follow-up anymore.",
      name: "Sofia L.",
      role: "CMO, Harbor Realty",
    },
  },
  {
    slug: "vertex-support",
    client: "Vertex SaaS",
    title: "AI support ticket triage",
    category: "AI Automation",
    description:
      "Incoming tickets get classified, prioritized, and answered by AI in seconds — only the tricky ones reach a human agent, with full context attached.",
    result: "68% tickets auto-resolved",
    image: "/projects/vertex-support.jpg",
    timeline: "4 weeks",
    services: ["AI Automation", "AI Chat Support"],
    overview: [
      "Vertex SaaS runs a B2B project-management platform with support volume growing threefold year over year. Their six-person support team was drowning: tickets sat unclassified, urgent outages waited behind password resets, and agents spent their days copy-pasting the same answers.",
      "We built an AI triage layer in front of their helpdesk. Every ticket is now classified, prioritized, and — where possible — resolved by AI in seconds. Human agents only see the tickets that genuinely need judgment, arriving with full context and a suggested response already drafted.",
    ],
    challenge: [
      "Ticket volume had tripled in a year while headcount stayed flat — backlog was measured in days, not hours.",
      "Urgent issues (outages, billing failures) queued behind routine questions with no prioritization.",
      "Agents answered the same 20 questions on repeat, burning out the team on work a machine could do.",
      "First-response times were slipping and CSAT was trending down quarter over quarter.",
    ],
    approach: [
      {
        title: "Classify everything",
        text: "Trained a classifier on 18 months of ticket history to tag topic, sentiment, urgency, and account value — reaching 94% agreement with human taggers.",
      },
      {
        title: "Resolve the routine",
        text: "Built an answer engine on their docs, changelogs, and resolved tickets that fully resolves common requests — password resets, plan changes, how-tos — without human touch.",
      },
      {
        title: "Route the rest",
        text: "Complex tickets route to the right specialist with priority scores, full thread context, and an AI-drafted suggested reply the agent can send, edit, or escalate.",
      },
      {
        title: "Keep humans in charge",
        text: "Confidence thresholds decide what auto-resolves versus what gets reviewed. Every AI action is logged and reversible, and the team retrains the model monthly on edge cases.",
      },
    ],
    metrics: [
      { value: "68%", label: "Tickets fully auto-resolved" },
      { value: "38 sec", label: "Median first response (was 4 min)" },
      { value: "+19 pts", label: "CSAT improvement in one quarter" },
      { value: "2 agents", label: "Redeployed to customer success roles" },
    ],
    testimonial: {
      quote:
        "Support went from our biggest cost center to a quiet machine. Our agents finally do the interesting work — the AI handles the repetitive 70%.",
      name: "Arjun M.",
      role: "Head of Support, Vertex SaaS",
    },
  },
  {
    slug: "bloom-retail",
    client: "Bloom Retail",
    title: "Inventory forecasting automation",
    category: "AI Automation",
    description:
      "AI predicts demand per store and triggers reorders automatically — shelves stay stocked without the spreadsheet gymnastics.",
    result: "31% less overstock",
    image: "/projects/bloom-retail.jpg",
    timeline: "6 weeks",
    services: ["AI Automation", "Analytics Dashboards"],
    overview: [
      "Bloom Retail operates 24 home-goods stores, and every one of them was ordering on gut feel. Bestsellers stocked out in busy locations while slow stores drowned in overstock — and the planning team spent two days a week wrestling spreadsheets to make it all work.",
      "We built a demand-forecasting engine that predicts sales per store per SKU, then triggers reorders automatically. Planners went from spreadsheet operators to exception managers: the system handles the routine, humans handle the judgment calls.",
    ],
    challenge: [
      "Overstock tied up cash in slow stores while busy locations lost sales to empty shelves — the same SKU, opposite problems.",
      "Ordering ran on manager intuition and a 40-tab spreadsheet updated twice a week by hand.",
      "Seasonal swings and local events (festivals, weather) made demand unpredictable with manual methods.",
      "No one could answer the basic question: how accurate are our forecasts? Because there were none.",
    ],
    approach: [
      {
        title: "Unify the data",
        text: "Connected POS, warehouse, and supplier feeds into one clean dataset — two years of sales history, promotions, and seasonality, deduplicated and normalized.",
      },
      {
        title: "Forecast per store",
        text: "Built demand models at store × SKU granularity, factoring in seasonality, promotions, local events, and weather — refreshed nightly.",
      },
      {
        title: "Automate reorders",
        text: "Reorder triggers fire automatically when forecasted demand crosses thresholds, with safety-stock buffers tuned per category. Planners approve exceptions, not every order.",
      },
      {
        title: "Make it visible",
        text: "A simple dashboard shows forecast accuracy, stock health, and money tied up in overstock — the numbers the CFO actually cares about.",
      },
    ],
    metrics: [
      { value: "31%", label: "Less capital locked in overstock" },
      { value: "22%", label: "Fewer stockouts on bestsellers" },
      { value: "89%", label: "Forecast accuracy at SKU level" },
      { value: "15 hrs", label: "Manual planning work eliminated weekly" },
    ],
    testimonial: {
      quote:
        "We stopped guessing. The system orders better than our best manager did — and our planners finally spend their time on strategy instead of spreadsheets.",
      name: "Priya S.",
      role: "Operations Director, Bloom Retail",
    },
  },
  {
    slug: "tabletap",
    client: "TableTap",
    title: "Booking & check-in app",
    category: "Mobile App",
    description:
      "A restaurant group’s reservation and table-side check-in app for iOS and Android, with push reminders that quietly cut empty tables.",
    result: "4.8★ store rating · 60k downloads",
    image: "/projects/table-tap.jpg",
    timeline: "10 weeks",
    services: ["Mobile App Development", "UI/UX Design"],
    overview: [
      "TableTap started as one restaurant group's fix for a painful problem: 18% of reservations never showed up, and Friday-night front-of-house was controlled chaos. They needed more than a booking form — they needed the whole arrival experience rethought.",
      "We designed and built native-feeling iOS and Android apps covering discovery, booking, table-side QR check-in, and smart push reminders — plus a lightweight staff dashboard so hosts see the whole evening at a glance.",
    ],
    challenge: [
      "No-shows ran at 18%, leaving prime tables empty on the busiest nights with no way to fill them last-minute.",
      "Reservations came through phone calls, DMs, and walk-ins — nothing centralized, double-bookings were routine.",
      "Guests hated downloading clunky apps; whatever we built had to feel instant and effortless.",
      "Hosts juggled paper lists and memory during rush — one bad night could tank a week's reviews.",
    ],
    approach: [
      {
        title: "Design the arrival",
        text: "Mapped the full guest journey from 'where should we eat?' to seated with menus — then removed every unnecessary tap. Booking takes under 30 seconds.",
      },
      {
        title: "Kill the no-show",
        text: "Smart reminders (24h + 2h before), one-tap confirm/cancel, and automatic waitlist backfill turned empty tables into seated guests.",
      },
      {
        title: "QR check-in",
        text: "Table-side QR codes let guests check in and browse the menu from their phones — hosts see arrivals in real time, no paper lists.",
      },
      {
        title: "One codebase, two stores",
        text: "Built cross-platform from a single codebase for iOS and Android, with a staff web dashboard for hosts and managers — shipped to both stores in one release cycle.",
      },
    ],
    metrics: [
      { value: "4.8★", label: "Average store rating" },
      { value: "60k", label: "Downloads in year one" },
      { value: "34%", label: "Fewer no-shows across locations" },
      { value: "12", label: "Restaurant locations live" },
    ],
    testimonial: {
      quote:
        "Friday nights used to be controlled chaos. Now the hosts run the whole floor from one screen, and our no-shows fell by a third in two months.",
      name: "Marcus T.",
      role: "Founder, TableTap",
    },
  },
  {
    slug: "pulsefit",
    client: "PulseFit",
    title: "Workout tracking app",
    category: "Mobile App",
    description:
      "A social fitness app with training plans, live challenges, and streaks — designed to bring users back every single morning.",
    result: "4.9★ · 120k downloads",
    image: "/projects/pulse-fit.jpg",
    timeline: "12 weeks",
    services: ["Mobile App Development", "Motion Graphics", "Brand Identity"],
    overview: [
      "The fitness app market is brutally crowded, and most apps lose 80% of users within 30 days. PulseFit's bet: make consistency addictive. They came to us with training science and a community vision — we turned it into an app people open every morning.",
      "We built a social fitness platform around training plans, live challenges, and streak mechanics — with an onboarding flow so smooth that new users log their first workout within 90 seconds of signing up.",
    ],
    challenge: [
      "Category-wide D30 retention sits below 20% — the app had to earn its place on the home screen daily.",
      "Logging workouts felt like data entry in every competitor; the core loop had to feel like play, not paperwork.",
      "Social features in fitness apps usually become ghost towns — challenges needed real stakes and real momentum.",
      "Launch marketing was locked to a fixed date; the app had to be store-ready with zero slip.",
    ],
    approach: [
      {
        title: "90-second first workout",
        text: "Redesigned onboarding around one goal: log a workout within 90 seconds of signup. No account walls, no 12-screen setup — value first, profile later.",
      },
      {
        title: "Make streaks sacred",
        text: "Built streak mechanics with rest-day logic that forgives intelligently — punishing enough to motivate, smart enough not to break when life happens.",
      },
      {
        title: "Challenges with teeth",
        text: "Live group challenges with leaderboards, team modes, and end-of-week recaps engineered for the share — growth baked into the product.",
      },
      {
        title: "Motion that motivates",
        text: "Custom exercise animations and celebration micro-interactions make every PR feel like an event, not a database row.",
      },
    ],
    metrics: [
      { value: "4.9★", label: "Average store rating" },
      { value: "120k", label: "Downloads in year one" },
      { value: "2.3x", label: "D30 retention vs. category average" },
      { value: "41%", label: "Daily active users" },
    ],
    testimonial: {
      quote:
        "They obsessed over the first 90 seconds the way most agencies obsess over the logo. Our day-30 retention is more than double the category — that was the whole bet, and it paid off.",
      name: "Lena W.",
      role: "CEO, PulseFit",
    },
  },
  {
    slug: "swiftbite",
    client: "SwiftBite",
    title: "Food delivery app",
    category: "Mobile App",
    description:
      "Ordering, live order tracking, and rider dispatch in one snappy app — from craving to doorstep in under 30 minutes.",
    result: "45k orders in month one",
    image: "/projects/swift-bite.jpg",
    timeline: "14 weeks",
    services: ["Mobile App Development", "Web Design & Development", "Brand Identity"],
    overview: [
      "SwiftBite set out to launch food delivery in a mid-size city in 90 days — competing against giants with a fraction of the budget. They didn't need a slightly better clone; they needed the whole three-sided marketplace (customers, riders, restaurants) working flawlessly on day one.",
      "We shipped all three apps plus a dispatch engine from a single codebase: customer ordering with live tracking, a rider app with smart batching, and a restaurant dashboard — then stayed through launch week to tune it live.",
    ],
    challenge: [
      "Three apps needed to launch simultaneously — customer, rider, and restaurant — with a hard 90-day deadline.",
      "Dispatch is the whole business: bad routing means cold food, late riders, and one-star reviews from day one.",
      "Restaurants needed to trust a brand-new platform with their dinner rush — onboarding had to be effortless.",
      "Unit economics had to work at local scale, without the subsidy war chests of national competitors.",
    ],
    approach: [
      {
        title: "One codebase, three apps",
        text: "Built customer, rider, and restaurant experiences from a shared core — one team, one release train, no duplicated logic to drift apart.",
      },
      {
        title: "Dispatch that thinks",
        text: "A routing engine batches nearby orders, predicts prep times from live kitchen data, and assigns riders to minimize idle time and cold food.",
      },
      {
        title: "Track everything live",
        text: "Customers watch their order move in real time — kitchen, rider, doorstep — which cut 'where is my food?' support contacts by 70%.",
      },
      {
        title: "Launch-week war room",
        text: "We stayed embedded through launch: live dashboards, instant hotfixes, and daily tuning of dispatch parameters against real order data.",
      },
    ],
    metrics: [
      { value: "45k", label: "Orders in launch month" },
      { value: "28 min", label: "Average craving-to-doorstep time" },
      { value: "4.7★", label: "Customer app rating" },
      { value: "300+", label: "Restaurant partners onboarded" },
    ],
    testimonial: {
      quote:
        "From idea to 45,000 orders in a month. The dispatch engine they built is the reason we survived launch week — and the reason we're still growing.",
      name: "Omar F.",
      role: "Co-founder, SwiftBite",
    },
  },
  {
    slug: "ironpulse-fitness",
    client: "IronPulse Fitness",
    title: "Gym management platform",
    category: "Web App",
    description:
      "Bookings, memberships, trainer schedules, and payments — previously spread across four tools — rebuilt as one dashboard the whole team actually enjoys using.",
    result: "4 tools → 1 platform · 38% fewer no-shows",
    image: "/projects/ironpulse.jpg",
    imagePosition: "center 25%",
    timeline: "8 weeks",
    services: ["Web Design & Development", "AI Automation"],
    overview: [
      "IronPulse Fitness was running on four disconnected tools: one for bookings, one for memberships, one for trainer schedules, and spreadsheets for payments. Staff re-entered the same data three times, double-bookings were weekly events, and chasing failed payments ate entire afternoons.",
      "We rebuilt everything as one platform the whole team actually enjoys using — bookings, memberships, schedules, and payments in a single dashboard, with automated reminders and dunning that quietly fixed the no-show and late-payment problems.",
    ],
    challenge: [
      "Four tools meant four logins, four data silos, and staff re-typing the same member data across all of them.",
      "Double-booked classes and trainers were a weekly embarrassment with paying members.",
      "No-shows ran high because reminders depended on whoever remembered to send them.",
      "Failed payments were chased manually — awkward for staff, slow for cash flow.",
    ],
    approach: [
      {
        title: "One source of truth",
        text: "Consolidated members, bookings, schedules, and billing into a single database and dashboard — one login, zero re-entry.",
      },
      {
        title: "Scheduling that prevents conflicts",
        text: "Smart booking rules make double-booking trainers or rooms structurally impossible, with waitlists that auto-fill cancellations.",
      },
      {
        title: "Reminders on autopilot",
        text: "Automated class reminders and rebooking nudges run themselves — the single biggest lever on the no-show rate.",
      },
      {
        title: "Payments without awkwardness",
        text: "Integrated billing with automatic retries and polite dunning sequences — failed payments get resolved by the system, not by front-desk staff.",
      },
    ],
    metrics: [
      { value: "4 → 1", label: "Tools consolidated into one platform" },
      { value: "38%", label: "Fewer class no-shows" },
      { value: "6 hrs", label: "Admin time saved weekly" },
      { value: "99.98%", label: "Platform uptime since launch" },
    ],
    testimonial: {
      quote:
        "They replaced three separate vendors with one team that actually talks to itself. Our new platform paid for itself in the first quarter.",
      name: "Maya R.",
      role: "Founder, IronPulse Fitness",
    },
  },
  {
    slug: "pulseboard",
    client: "Pulseboard",
    title: "Analytics dashboard",
    category: "Web App",
    description:
      "A real-time analytics product for e-commerce teams — custom charts, alerts, and exports, wrapped in an interface non-technical founders understand.",
    result: "0.9s avg. load · 12k daily users",
    image: "/projects/pulseboard.jpg",
    timeline: "7 weeks",
    services: ["Web Design & Development", "UI/UX Design"],
    overview: [
      "Pulseboard sells analytics to e-commerce teams — but their own dashboard was slow, cluttered, and intimidating to the non-technical founders who actually signed the checks. Trial users bounced before they ever saw an insight.",
      "We rebuilt the product around one principle: any merchant should understand their numbers in under a minute. Custom chart builder, real-time data, and alerts — wrapped in an interface that feels obvious, loading in under a second.",
    ],
    challenge: [
      "Dashboards took 6+ seconds to load — trial users assumed the product was broken and left.",
      "The interface was built for analysts, but buyers were founders who wanted answers, not query builders.",
      "Every new chart type required engineering time — the product couldn't keep up with customer requests.",
      "'Where do I click?' was the most common support ticket about reporting.",
    ],
    approach: [
      {
        title: "Speed as a feature",
        text: "Re-architected data fetching with aggressive caching and progressive loading — median dashboard load dropped from 6.2s to 0.9s.",
      },
      {
        title: "Answers, not queries",
        text: "Redesigned around pre-built insight cards for the metrics merchants actually check daily, with drill-downs for the curious.",
      },
      {
        title: "Charts without code",
        text: "A drag-and-drop chart builder lets users create custom views in seconds — new visualizations ship without engineering tickets.",
      },
      {
        title: "Alerts that matter",
        text: "Threshold and anomaly alerts push to email and Slack, so teams hear about problems before their customers do.",
      },
    ],
    metrics: [
      { value: "0.9s", label: "Average dashboard load (was 6.2s)" },
      { value: "12k", label: "Daily active users" },
      { value: "4.6/5", label: "Usability score in user testing" },
      { value: "60%", label: "Fewer 'how do I…?' support tickets" },
    ],
    testimonial: {
      quote:
        "Our merchants finally understand their own numbers. Trial-to-paid conversion jumped the month the new dashboard shipped — speed and clarity sold it.",
      name: "David C.",
      role: "CTO, Pulseboard",
    },
  },
  {
    slug: "atelier-north",
    client: "Atelier North",
    title: "Studio identity system",
    category: "Branding",
    description:
      "A full identity for an architecture studio: wordmark, type system, and a guidelines book their whole team can follow without a designer on call.",
    result: "Full rebrand shipped in 5 weeks",
    image: "/projects/atelier-north.jpg",
    timeline: "5 weeks",
    services: ["Logo Design", "Brand Identity", "Content Writing"],
    overview: [
      "Atelier North designs beautiful buildings — but their own brand looked like a template. Proposals went out with inconsistent formatting, the website didn't match the pitch decks, and a premium studio was presenting like a commodity firm.",
      "We built them an identity as considered as their architecture: a refined wordmark, a typographic system with real personality, and a guidelines book so thorough the whole team can produce on-brand work without a designer on call.",
    ],
    challenge: [
      "A premium architecture studio was visually indistinguishable from budget competitors.",
      "Every proposal looked different — partners formatted decks their own way, eroding credibility with clients.",
      "The website, pitch materials, and site signage told three different brand stories.",
      "They needed the rebrand done between project deadlines — no six-month luxury timeline.",
    ],
    approach: [
      {
        title: "Strategy before sketching",
        text: "A half-day workshop with the partners defined the positioning: quiet confidence, material honesty, Nordic restraint — then we translated that into design principles.",
      },
      {
        title: "Wordmark & type system",
        text: "Drew a custom wordmark and paired it with a two-typeface system that scales from building signage to drawing annotations.",
      },
      {
        title: "The guidelines book",
        text: "A 40+ page identity manual covering logo usage, color, typography, imagery, and tone of voice — written for architects, not designers.",
      },
      {
        title: "Templates that stick",
        text: "Shipped 12 ready-to-use templates (proposals, presentations, site boards, email) so the system survives contact with real deadlines.",
      },
    ],
    metrics: [
      { value: "5 weeks", label: "From kickoff to full system delivery" },
      { value: "40+", label: "Page identity guidelines book" },
      { value: "12", label: "Production-ready templates shipped" },
      { value: "3x", label: "Proposal win rate after rebrand" },
    ],
    testimonial: {
      quote:
        "They gave us a look as considered as our buildings. Our proposals finally feel like they come from the studio we actually are.",
      name: "Ingrid H.",
      role: "Principal, Atelier North",
    },
  },
  {
    slug: "cornerstone-dental",
    client: "Cornerstone Dental",
    title: "Local search overhaul",
    category: "SEO",
    description:
      "Technical cleanup, service-page rewrites, and a review engine for a three-location dental practice competing in a crowded local map pack.",
    result: "+212% organic calls in 6 months",
    image: "/projects/cornerstone.jpg",
    timeline: "6 months",
    services: ["SEO & AI Search", "Content Writing", "Web Design & Development"],
    overview: [
      "Cornerstone Dental runs three locations in a metro area with a dentist on every block. They were invisible where it mattered: the Google map pack. Paid ads were eating the marketing budget, and every new patient effectively had a purchase price.",
      "We rebuilt their local search presence from the ground up — technical cleanup, service pages rewritten around real patient questions, a review engine that runs itself, and structured data tuned for both Google and AI search answers.",
    ],
    challenge: [
      "Three locations, zero map-pack visibility — competitors owned the top three spots for every money keyword.",
      "Service pages were thin, duplicated across locations, and written for search engines circa 2015.",
      "A review drought: 40 reviews across three locations in a market where leaders had 600+.",
      "Paid search was profitable but fragile — pausing ads meant the phone stopped ringing.",
    ],
    approach: [
      {
        title: "Technical triage",
        text: "Fixed crawl errors, page speed, and mobile UX issues; implemented local business schema and per-location pages that Google could actually understand.",
      },
      {
        title: "Pages patients want",
        text: "Rewrote every service page around real patient questions — costs, pain, recovery time — in plain language, unique per location.",
      },
      {
        title: "Review engine",
        text: "Built an automated post-visit review flow (timed, polite, one-tap) that took them from 40 to 600+ genuine reviews without staff nagging anyone.",
      },
      {
        title: "AI-search ready",
        text: "Structured content with FAQ schema and llms.txt so the practice gets cited in AI-generated answers, not just classic search results.",
      },
    ],
    metrics: [
      { value: "+212%", label: "Organic calls in 6 months" },
      { value: "Top 3", label: "Map-pack rankings across 38 keywords" },
      { value: "600+", label: "Genuine reviews at 4.9★ average" },
      { value: "71%", label: "Of new patients now come from search" },
    ],
    testimonial: {
      quote:
        "We used to pay for every single patient click. Now the phone rings on its own — and it keeps ringing even when we pause the ads.",
      name: "Daniel K.",
      role: "Owner, Cornerstone Dental",
    },
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
  { value: 11, suffix: "", label: "Services under one roof" },
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 24, suffix: "h", label: "Max. response time", prefix: "<" },
];
