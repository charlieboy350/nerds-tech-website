/* ------------------------------------------------------------------ */
/* Per-service detail content: real-world problems + our solutions     */
/* ------------------------------------------------------------------ */

export interface ServiceProblem {
  title: string;
  description: string;
  solution: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  slug: string;
  problems: ServiceProblem[];
  faqs: ServiceFaq[];
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "ai-automation",
    problems: [
      {
        title: "Leads sit for hours before anyone follows up",
        description:
          "A prospect fills out your contact form at 9pm and hears nothing until the next afternoon. By then they have talked to two competitors. Your team is not lazy — they are just busy, and manual follow-up always loses to the urgent task in front of them.",
        solution:
          "We build instant lead routing and follow-up automation: new inquiries get an immediate personalized response, get scored and assigned to the right rep, and get sequenced follow-ups until they reply. Nothing waits on someone remembering.",
      },
      {
        title: "Your team copy-pastes data between tools all day",
        description:
          "Orders live in one system, customers in another, and someone spends two hours daily moving data between them. It is mind-numbing work that breeds errors — wrong addresses, missed orders, duplicate records.",
        solution:
          "We connect your tools with reliable two-way syncs and triggered workflows, so data flows on its own. Orders, contacts, and updates stay consistent everywhere with zero manual entry, and exceptions get flagged instead of silently breaking.",
      },
      {
        title: "Invoices go out late and nobody chases unpaid ones",
        description:
          "Invoicing happens when someone finds the time, which means it happens late. Overdue invoices sit for weeks because chasing payment feels awkward and always slides down the priority list. Cash flow suffers for no good reason.",
        solution:
          "We automate the full billing cycle: invoices generated and sent on schedule, polite escalating reminders for overdue accounts, and instant alerts for the ones that need a human call. You get paid faster without the awkwardness.",
      },
      {
        title: "Every Friday someone builds reports by hand",
        description:
          "Your ops manager spends half of Friday exporting CSVs, pasting into spreadsheets, and formatting a revenue report. The numbers are stale the moment they are finished, and one wrong formula poisons every decision made from them.",
        solution:
          "We wire your systems into live dashboards and scheduled reports that build themselves. The numbers are always current, always consistent, and anomalies trigger alerts so you see problems before the Friday report would have.",
      },
    ],
    faqs: [
      {
        q: "How much does automation typically cost?",
        a: "It depends on scope, but most single workflows land in the low four figures and pay for themselves within months through recovered hours. We always start with an audit that maps the ROI before you commit to anything, so you see the math first.",
      },
      {
        q: "How long does it take to automate a workflow?",
        a: "Simple integrations and email sequences ship in one to three weeks. Multi-system workflows with custom logic take four to eight weeks. We start with your highest-ROI quick wins so you see value early, not after a six-month project.",
      },
      {
        q: "Do we need our own engineers to maintain this?",
        a: "No. We build on platforms your team can understand, document everything, and hand over with training. Most clients run their automations with zero engineering involvement, and we offer a care plan if you want us to monitor and maintain them.",
      },
    ],
  },
  {
    slug: "ai-chat-support",
    problems: [
      {
        title: "Messages pile up overnight and leads go cold",
        description:
          "Customers message at 10pm with a buying question and get silence until morning. By then the urgency is gone — or they bought from someone who answered. Your business sleeps; your buyers do not.",
        solution:
          "We deploy an AI assistant trained on your business that answers instantly, day and night. It handles product questions, pricing, booking, and FAQs on the spot, and hands warm leads to your team with full context in the morning.",
      },
      {
        title: "Your team answers the same 20 questions daily",
        description:
          "What are your hours, do you deliver to my area, how much does it cost — your support reps type these answers dozens of times a day. It is expensive, boring work that burns people out and slows response to the questions that actually need a human.",
        solution:
          "The AI resolves repetitive questions automatically, freeing your team for complex cases. We analyze your ticket history to find the top intents, train the assistant on your real answers, and typically deflect 30 to 50 percent of volume within weeks.",
      },
      {
        title: "Slow replies are killing your conversions",
        description:
          "Website visitors with a quick question bounce instead of waiting. Industry data is brutal: reply in under a minute and conversion jumps; reply in an hour and the lead is mostly dead. Manual chat cannot hit one-minute response times consistently.",
        solution:
          "Instant AI responses engage every visitor the second they ask. The assistant qualifies, answers, and books — then your team steps in only where human judgment adds value. Response time drops from hours to seconds.",
      },
      {
        title: "No coverage on weekends, holidays, or sick days",
        description:
          "Support quality swings with staffing. Weekends mean skeleton coverage, holidays mean silence, and one sick day creates a backlog that takes a week to clear. Customers do not care about your rota.",
        solution:
          "The AI assistant does not take days off. It provides consistent, on-brand answers around the clock and escalates anything it cannot handle with the full conversation attached, so coverage never depends on who showed up today.",
      },
    ],
    faqs: [
      {
        q: "Will the AI give wrong answers to customers?",
        a: "It answers from your approved knowledge base, not from guesswork, and we set confidence thresholds — anything uncertain escalates to a human instead of bluffing. You review and approve the training content, and every conversation is logged so you can audit quality anytime.",
      },
      {
        q: "What happens when a customer needs a real human?",
        a: "Handoff is built in from day one. The AI escalates on low confidence, frustration signals, or topics you flag (refunds, legal, VIP accounts), passing the full transcript so the customer never repeats themselves. There is always a visible path to a person.",
      },
      {
        q: "How long does setup take?",
        a: "Most deployments go live in two to four weeks: one week to audit your docs and ticket history, one to two weeks to train and tune, then a soft launch with monitoring. We start with your website chat and expand to WhatsApp, Instagram, or email once it is performing.",
      },
    ],
  },
  {
    slug: "ai-codebase-integration",
    problems: [
      {
        title: "Competitors ship AI features while you stand still",
        description:
          "Your rivals just launched AI search, smart summaries, or an AI assistant inside their product. Your customers are starting to ask when you will have it. Every quarter you wait, the gap looks bigger and switching looks easier.",
        solution:
          "We audit your codebase, find the highest-value insertion points, and integrate AI features module by module — search, summarization, copilots, classification. You ship AI capabilities in weeks, not after a year-long rebuild.",
      },
      {
        title: "A full rewrite was quoted at six figures",
        description:
          "An agency told you the only way to get AI is to rebuild the whole product. That means a year of disruption, a massive invoice, and the very real risk of breaking what already works and pays the bills.",
        solution:
          "We integrate AI into your existing codebase without a rewrite. Each module is scoped, built, and tested in isolation against your current stack, so the product keeps running and every release is independently shippable and reversible.",
      },
      {
        title: "Your team does not know where AI actually fits",
        description:
          "Everyone agrees you need AI somewhere, but nobody can say where it creates real value versus gimmick. Random AI features get built, nobody uses them, and leadership concludes AI was hype.",
        solution:
          "Our AI-readiness audit maps your product against proven AI patterns and scores each opportunity by user value and implementation effort. You get a ranked roadmap — what to build first, what to skip — before a single line of code is written.",
      },
      {
        title: "A previous AI plugin broke things in production",
        description:
          "Someone bolted an AI API onto the product and it hallucinated in front of customers, leaked prompt data, or fell over under load. Now the team is scared of AI and leadership has trust issues.",
        solution:
          "We build with guardrails from the start: grounded responses from your data, output validation, rate limiting, and staged rollouts with monitoring. Every AI module ships with tests and rollback plans, so nothing reaches customers unproven.",
      },
    ],
    faqs: [
      {
        q: "Is it risky to add AI to a working product?",
        a: "Done carelessly, yes — which is why we integrate module by module with full test coverage and staged rollouts. Each AI feature is isolated, monitored, and reversible, so a problem in one module can never take down your product.",
      },
      {
        q: "Which AI models do you work with?",
        a: "We are model-agnostic and pick based on your needs: OpenAI and Anthropic for general intelligence, open models for data-sensitive or cost-sensitive workloads. If you have compliance requirements, we can run everything inside your own infrastructure.",
      },
      {
        q: "How long does a typical integration take?",
        a: "The audit and roadmap take two to three weeks. Individual AI modules typically ship in three to six weeks each, depending on complexity. Most clients have their first AI feature in production within two months of kickoff.",
      },
    ],
  },
  {
    slug: "web-design-development",
    problems: [
      {
        title: "Our site takes 9 seconds to load on mobile",
        description:
          "More than half your visitors are on phones, and they are gone before your hero image finishes loading. Every extra second of load time bleeds conversions — and Google quietly buries slow sites in search results.",
        solution:
          "We hand-code fast sites with modern frameworks: optimized images, minimal JavaScript, and Core Web Vitals in the green. Typical result: sub-two-second loads on mobile, which visitors feel instantly and Google rewards.",
      },
      {
        title: "The site looks dated and kills our credibility",
        description:
          "Prospects check your website before every sales call, and yours looks like a template from 2016. Enterprise buyers quietly disqualify vendors with amateur sites — you lose deals you never hear about.",
        solution:
          "We design a custom, modern site built around your brand and your buyers: sharp visuals, clear messaging, and a premium feel that makes your pricing look justified. Your site starts opening doors instead of closing them.",
      },
      {
        title: "We cannot change anything without a developer",
        description:
          "Updating a headline means filing a ticket, waiting a week, and paying an invoice. So the site goes stale — old testimonials, wrong pricing, last year's news — because every tiny change is a project.",
        solution:
          "We build on a CMS tailored to your team, so anyone can update text, images, and pages in minutes with no code. We train your staff on handover day, and the developer bottleneck disappears.",
      },
      {
        title: "Visitors browse but nobody contacts us",
        description:
          "Traffic is fine, but the phone does not ring. Pages ramble, calls-to-action are buried, and there is no clear path from curious visitor to booked call. Your site is a brochure when it should be a salesperson.",
        solution:
          "We design around one job: conversion. Clear value proposition above the fold, benefit-led sections, trust signals at decision points, and frictionless contact paths. Every page is built to turn a visit into an inquiry.",
      },
    ],
    faqs: [
      {
        q: "How long does a website project take?",
        a: "A focused marketing site typically ships in four to six weeks: two for design, two to three for build and content, one for testing and launch. Complex builds with custom functionality run eight to twelve weeks. You get a real timeline at kickoff, not a vague estimate.",
      },
      {
        q: "WordPress or custom code — which is right for us?",
        a: "If your team needs to publish content constantly and wants plugin ecosystems, WordPress can make sense. If you want maximum speed, security, and a bespoke design, custom Next.js is better. We will recommend honestly based on your needs, not our preferences — we build both.",
      },
      {
        q: "What does a website cost?",
        a: "Professional marketing sites start in the low four figures; complex custom builds go higher based on pages, integrations, and functionality. Every quote is fixed and itemized before we start — no hourly black holes, no surprise invoices.",
      },
    ],
  },
  {
    slug: "logo-design",
    problems: [
      {
        title: "Our logo is a stock icon everyone recognizes",
        description:
          "Customers have seen your mark on three other companies' websites. A generic logo signals a generic company — forgettable at best, and at worst it makes prospects question whether you are even legitimate.",
        solution:
          "We design an original mark from strategy, not templates: research into your market, dozens of explored concepts, and a refined final logo that is unmistakably yours. Nobody will mistake you for anyone else again.",
      },
      {
        title: "The logo falls apart on different backgrounds",
        description:
          "It looks okay on white, but on dark backgrounds it vanishes, on social avatars it is unreadable, and the PNG someone made years ago turns blurry when enlarged. Every new use case exposes another flaw.",
        solution:
          "You get a complete logo system: primary mark, stacked and icon versions, light and dark variants, all as crisp vector files. Your logo looks sharp everywhere from a favicon to a billboard.",
      },
      {
        title: "We pivoted and the old logo no longer fits",
        description:
          "The business outgrew its mark — new services, new audience, new ambition — but the logo still says the old story. Every pitch starts with an apology for the branding instead of excitement about the future.",
        solution:
          "We run a focused rebrand: stakeholder interviews, positioning workshop, then a new identity that reflects where the company is going. The rollout includes updated assets across every touchpoint, so the pivot looks intentional, not improvised.",
      },
      {
        title: "Our DIY logo scares off serious clients",
        description:
          "The Canva logo was fine when you were starting out, but now you are pitching five-figure contracts and the homemade mark undermines every proposal. Big clients buy confidence, and yours currently whispers small-time.",
        solution:
          "A professional logo instantly changes how the market prices you. We craft a mark with the polish and strategic thinking that signals a serious company — the kind of identity that makes your quotes feel reasonable instead of risky.",
      },
    ],
    faqs: [
      {
        q: "How much does a logo cost?",
        a: "A professional logo project — strategy, concepts, refinement, and a full file package — typically runs in the low four figures. It is a one-time investment that pays off on every proposal, deck, and business card for years.",
      },
      {
        q: "How many concepts and revisions do we get?",
        a: "We present three distinct creative directions, then refine your chosen direction through two structured revision rounds. This process beats endless tweaking — it forces real decisions and lands on a stronger mark faster.",
      },
      {
        q: "What files do we receive?",
        a: "Everything: vector AI/EPS/SVG for print and scaling, PNGs in all sizes for digital, plus light, dark, and monochrome versions. You own the files outright — no licensing traps, no holding your own logo hostage.",
      },
    ],
  },
  {
    slug: "branding",
    problems: [
      {
        title: "Every document looks like a different company",
        description:
          "The pitch deck, the invoices, the social posts, the email signatures — nothing matches. Customers notice the chaos even if they cannot name it, and it quietly erodes trust in your professionalism.",
        solution:
          "We build a unified identity system: logo usage, color palette, typography, imagery style, and templates for every touchpoint. Everything your company produces finally looks like it came from one company.",
      },
      {
        title: "We look cheap so we cannot charge premium",
        description:
          "Your work is excellent but your brand screams budget, so prospects haggle and you compete on price. The market cannot pay premium rates for a brand that looks like it charges budget ones.",
        solution:
          "A strategic rebrand repositions you: premium visual language, confident messaging, and an identity that justifies higher prices. Clients stop negotiating and start assuming quality — because the brand told them to.",
      },
      {
        title: "The team misuses the logo and colors constantly",
        description:
          "Someone stretched the logo in a deck, marketing invented a new shade of blue, and the intern used Comic Sans-adjacent fonts on a flyer. Without rules, every well-meaning employee slowly destroys the brand.",
        solution:
          "We deliver clear brand guidelines plus a ready-to-use asset library: correct logo files, color codes, font pairings, and do-and-don't examples. Anyone on the team can produce on-brand work without guessing.",
      },
      {
        title: "We blend in with every competitor",
        description:
          "Line up your website next to four competitors and they are interchangeable — same blue, same stock photos, same vague promises. When everyone looks the same, buyers choose on price alone.",
        solution:
          "We find your distinct position and express it visually: a differentiated identity built on what actually makes you different. You stop competing on price because you no longer look comparable.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a logo and a full brand identity?",
        a: "A logo is one mark. A brand identity is the complete system: logo variants, colors, typography, imagery style, voice guidelines, and templates for everything from decks to social posts. The identity is what makes you recognizable everywhere, not just on your website header.",
      },
      {
        q: "How long does a branding project take?",
        a: "A full identity typically takes six to ten weeks: strategy and positioning first, then design exploration, refinement, and the rollout across templates and guidelines. Rushing this phase is how companies end up rebranding again in two years.",
      },
      {
        q: "Will we actually use the guidelines?",
        a: "Only if they are practical, so we make them practical: concise, visual, with ready-made templates your team can grab and use immediately. We also run a handover session so everyone understands the system, not just the PDF.",
      },
    ],
  },
  {
    slug: "content-writing",
    problems: [
      {
        title: "Our blog has not been updated in eight months",
        description:
          "The last post is from last year and it shows. Prospects who check your content see a dead publication and wonder if the company is dead too. Meanwhile competitors publish weekly and own the conversation.",
        solution:
          "We run your content engine end to end: strategy, research, writing, and publishing on a consistent schedule. Your blog stays alive with genuinely useful articles that compound into traffic and authority month after month.",
      },
      {
        title: "Our website copy is vague and does not sell",
        description:
          "We are innovative solutions providers leveraging synergies — read that on your homepage? Generic copy makes every visitor work to understand what you do, and most will not bother. Confused visitors do not convert.",
        solution:
          "We rewrite your site with sharp, benefit-led copy: clear headlines that state what you do and who it is for, sections that answer real buyer questions, and calls-to-action that feel like the obvious next step. Clarity converts.",
      },
      {
        title: "The founder writes everything and it is a bottleneck",
        description:
          "Every blog post, case study, and newsletter waits on one busy person's keyboard. Content ships in bursts when there is time, then dies for months. The business cannot scale its voice on one person's spare evenings.",
        solution:
          "Our done-for-you content service takes the whole pipeline off your plate: interviews to capture your expertise, professional writing in your voice, and editing to your standards. You approve; we do everything else.",
      },
      {
        title: "Our content gets no traffic and no leads",
        description:
          "Someone is writing, but the posts rank for nothing and convert no one. Random topics with no keyword strategy and no call-to-action is content as a hobby — it costs time and returns nothing.",
        solution:
          "We write with intent: keyword research to find winnable topics, articles structured to rank, and every piece engineered toward a next step — a download, a demo, a call. Content becomes a pipeline, not a chore.",
      },
    ],
    faqs: [
      {
        q: "Can you match our brand voice?",
        a: "Yes — that is the job. We start with a voice workshop and samples of your existing writing, then draft in your tone for your approval. Most clients cannot tell our drafts from their own writing after the first two pieces.",
      },
      {
        q: "Is this just AI-generated content?",
        a: "No. We use AI for research assistance the way a journalist uses a search engine, but every piece is written and edited by a human writer. The result reads like a person wrote it — because one did — which is also what Google increasingly rewards.",
      },
      {
        q: "How fast is the turnaround?",
        a: "Blog posts typically deliver in five to seven business days including a revision round. Website copy projects run two to three weeks with stakeholder review built in. Retainer clients get a fixed publishing cadence they can plan around.",
      },
    ],
  },
  {
    slug: "seo",
    problems: [
      {
        title: "We rank page 4 while competitors own page 1",
        description:
          "Search for your core service and you are invisible — three pages deep — while competitors collect the clicks. Those top spots are not luck; they are engineered, and every month you are absent is a month of leads going elsewhere.",
        solution:
          "We run a full technical audit, fix what is broken, then build topical authority with content engineered to rank: keyword-mapped pages, proper structure, and quality backlinks. Page one is a system, and we install it.",
      },
      {
        title: "Traffic comes but nobody converts",
        description:
          "The analytics show visitors, but the phone stays quiet. Ranking for the wrong keywords brings browsers, not buyers — informational traffic that was never going to purchase from you.",
        solution:
          "We target commercial-intent keywords — the searches people make right before buying — and pair them with pages designed to convert. Traffic quality beats traffic volume, and we optimize for revenue, not vanity metrics.",
      },
      {
        title: "AI search answers questions but never mentions us",
        description:
          "Customers now ask ChatGPT and Perplexity instead of Googling, and your competitors show up in those answers while you do not exist. A whole new discovery channel opened and you missed the opening.",
        solution:
          "We optimize for AI search: structured content the models can cite, FAQ schema, clear entity signals, and authoritative mentions across the web. When AI assistants answer questions in your category, your brand is in the answer.",
      },
      {
        title: "Our last SEO agency took money and did nothing",
        description:
          "Twelve months of invoices, zero explanation of what was actually done, rankings unchanged. The SEO industry earned its shady reputation, and now you are skeptical of every proposal — understandably.",
        solution:
          "We work transparently: a baseline audit you can verify, a written plan with priorities, monthly reports showing exactly what shipped and what moved. No jargon fog, no black box — if something is not working, you will see it and we will say so.",
      },
    ],
    faqs: [
      {
        q: "How long until we see results?",
        a: "Technical fixes often lift traffic within four to eight weeks. Competitive keywords typically take four to six months of consistent work. Anyone promising page one in 30 days is selling you something — real SEO compounds, and we will show you the trajectory monthly.",
      },
      {
        q: "Do you guarantee rankings?",
        a: "No honest agency guarantees specific rankings — Google explicitly warns against those who do. What we guarantee is the work: the audit, the fixes, the content, the reporting, all delivered on schedule. Rankings follow from doing the right work consistently.",
      },
      {
        q: "Do you do local SEO?",
        a: "Yes. Google Business Profile optimization, local citations, review strategy, and location pages that rank in the map pack. For businesses serving a geographic area, local search is often the fastest ROI in all of SEO.",
      },
    ],
  },
  {
    slug: "social-media-marketing",
    problems: [
      {
        title: "We post randomly and nothing ever happens",
        description:
          "A motivational quote on Monday, a product photo three weeks later, silence in between. Random posting builds no audience and drives no business — it is just proof of life, and barely that.",
        solution:
          "We build a real content system: pillars tied to your buyers, a monthly calendar, and consistent publishing across the right platforms. Every post has a job — educate, prove, or convert — and the compound effect builds month over month.",
      },
      {
        title: "Followers grow but customers do not",
        description:
          "The follower count creeps up but revenue does not move. Vanity metrics feel good in reports and do nothing for the business, because the content entertains instead of selling.",
        solution:
          "We engineer social around your funnel: authority content that builds trust, proof content that removes doubt, and conversion content with clear next steps. Followers become leads when every post moves someone closer to buying.",
      },
      {
        title: "Nobody has time to create content consistently",
        description:
          "Marketing owns social on top of everything else, so it gets the leftover scraps of attention. Consistency dies in week three, every time, because content creation is a full-time job wearing a part-time hat.",
        solution:
          "Our done-for-you service handles the entire pipeline: strategy, copywriting, design, scheduling, and community management. Your team spends one hour a month on approvals while your channels publish like clockwork.",
      },
      {
        title: "Competitors look alive while we are invisible",
        description:
          "Their feeds are active, their founders post insights, their customers engage — and your profiles look abandoned by comparison. Buyers check social before buying, and silence reads as decline.",
        solution:
          "We build an active, credible presence: regular high-quality posts, founder-led thought leadership, and genuine engagement with your market. Within months, your brand looks like the alive, growing company you are.",
      },
    ],
    faqs: [
      {
        q: "Which platforms should we be on?",
        a: "Wherever your buyers actually spend time — for most B2B that means LinkedIn first, for consumer brands Instagram and TikTok. We audit your audience before recommending, because being mediocre on five platforms loses to being excellent on two.",
      },
      {
        q: "Organic or paid social — which works?",
        a: "Both, for different jobs. Organic builds authority and trust over months; paid puts proven content in front of buyers immediately. We usually start organic to find what resonates, then amplify winners with paid. Anyone selling paid-only without organic foundations is renting attention.",
      },
      {
        q: "How fast will we see results?",
        a: "Engagement and audience quality improve within 60 to 90 days of consistent publishing. Pipeline impact typically shows in four to six months as authority compounds. Social is a flywheel — slow to start, hard to stop once spinning.",
      },
    ],
  },
  {
    slug: "motion-graphics",
    problems: [
      {
        title: "Nobody understands what our product does",
        description:
          "Your product is powerful but explaining it takes fifteen minutes and a whiteboard. Website visitors skim, get confused, and leave. If people cannot grasp the value in sixty seconds, you do not have a marketing problem — you have an explanation problem.",
        solution:
          "We produce explainer videos that compress your value proposition into 60 to 90 seconds of clear, engaging motion: script, storyboard, animation, and voiceover handled end to end. Confusion becomes clarity, and clarity converts.",
      },
      {
        title: "Our ads are static and nobody stops scrolling",
        description:
          "Still images in a feed of motion are invisible. Click-through rates sag, cost per click climbs, and your ad budget funds impressions nobody noticed.",
        solution:
          "We create motion ad creatives engineered to stop thumbs: hook in the first second, product payoff fast, format-native for each platform. Motion consistently outperforms static on CTR — your budget starts buying attention instead of wallpaper.",
      },
      {
        title: "Every demo takes a 30-minute sales call",
        description:
          "Prospects cannot evaluate your product without booking a call, sitting through small talk, and watching a live walkthrough. Your sales team spends hours demonstrating to people who were never qualified.",
        solution:
          "A polished product demo video does the heavy lifting upfront: prospects see exactly what the product does and self-qualify before booking. Calls get shorter, close rates get higher, and reps stop performing the same demo eight times a day.",
      },
      {
        title: "Our brand feels flat and forgettable",
        description:
          "Static logo, static visuals, static everything — the brand has no energy. In markets where everyone looks the same, motion is the differentiator that makes people remember you.",
        solution:
          "We design motion identity elements: animated logo stings, kinetic typography, and micro-animations for your site and socials. Your brand starts feeling alive, modern, and impossible to confuse with competitors.",
      },
    ],
    faqs: [
      {
        q: "How long does a video take to produce?",
        a: "A 60 to 90 second explainer typically takes three to four weeks: script and storyboard approval in week one, animation in weeks two and three, revisions and final delivery in week four. Simpler social clips ship faster; series get more efficient per episode.",
      },
      {
        q: "What does motion graphics cost?",
        a: "Short social animations start in the high three figures; full explainer videos with script, voiceover, and custom animation run in the low four figures. We quote fixed per project after a brief call — you will know the exact number before we start.",
      },
      {
        q: "What formats do we get?",
        a: "Everything you need: 16:9 for YouTube and your site, 9:16 for Reels/TikTok/Shorts, 1:1 for feeds — plus source files. One production, every placement covered, no awkward cropping.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    problems: [
      {
        title: "Customers keep asking for an app",
        description:
          "Your best users email asking when the app is coming, then quietly start using a competitor that has one. Mobile web is fine for browsing, but customers expect an app for anything they use regularly — and they judge you for not having it.",
        solution:
          "We design and build native-quality iOS and Android apps from a single codebase: fast, polished, and integrated with your existing systems. Your customers get the app they have been asking for, on both stores.",
      },
      {
        title: "Our mobile web experience is embarrassing",
        description:
          "Over 60 percent of your traffic is mobile, and the site pinches, zooms, and stutters on phones. Mobile visitors bounce at brutal rates while you pay full price to acquire them.",
        solution:
          "Whether it is a dedicated app or a mobile-first rebuild, we engineer the small-screen experience properly: thumb-friendly navigation, fast loads, offline tolerance. Mobile stops being where conversions go to die.",
      },
      {
        title: "The field team runs on paper and WhatsApp",
        description:
          "Technicians, sales reps, or delivery staff coordinate through WhatsApp groups and paper forms. Jobs get lost, data never reaches the office, and nobody knows what happened until the customer complains.",
        solution:
          "We build internal business apps tailored to your operation: job dispatch, on-site data capture, photo documentation, and real-time sync to your office systems. Chaos becomes a workflow with a dashboard.",
      },
      {
        title: "A competitor launched an app and we are behind",
        description:
          "They now own the home screen, the push notification channel, and the daily habit — while you are a bookmark nobody opens. Every month without an app cements their advantage.",
        solution:
          "We ship a focused MVP fast: core features done brilliantly, in eight to twelve weeks. You get to market quickly with something excellent, then iterate based on real user data instead of guessing for a year.",
      },
    ],
    faqs: [
      {
        q: "Do we need separate iOS and Android apps?",
        a: "Usually not. We build cross-platform from a single codebase, which delivers native-quality apps on both stores for roughly the cost of one. Only apps needing deep hardware integration or extreme performance justify separate native builds — and we will tell you honestly if yours does.",
      },
      {
        q: "How long does an app take to build?",
        a: "A focused MVP takes eight to twelve weeks from approved designs to store submission. Complex apps with backends, integrations, and admin panels run four to six months. We work in milestones so you see working software early, not a big reveal at the end.",
      },
      {
        q: "What about maintenance after launch?",
        a: "Apps need ongoing care: OS updates, store compliance changes, and bug fixes. We offer maintenance plans covering all of it, plus a roadmap for v2 features driven by real user feedback. Launch day is the starting line, not the finish.",
      },
    ],
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((d) => d.slug === slug);
}
