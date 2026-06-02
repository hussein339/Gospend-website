import { subDays, subHours, subMinutes, format, addDays, startOfMonth } from "date-fns";

// ─── Types ───────────────────────────────────────────────────────────────────

export type HookNiche = "AI" | "Claude" | "Vibe Coding" | "App Building" | "Business";
export type HookType = "contrast" | "number" | "stop-doing" | "killed" | "wish-i-knew";
export type HookPotential = "high" | "medium" | "skip";
export type HookTag = "hook-potential" | "explainer" | "skip";
export type PostStatus = "scheduled" | "posted" | "draft";
export type Platform = "Instagram" | "TikTok" | "YouTube";

export interface Hook {
  id: string;
  text: string;
  template: string;
  niche: HookNiche;
  hookType: HookType;
  views: number;
  creator: string;
  followerCount: number;
  tiktokUrl: string;
  savedAt: string;
}

export interface AnalyticsDayData {
  date: string;
  views: number;
  saves: number;
  follows: number;
  dmVolume: number;
}

export interface CompetitorReel {
  id: string;
  title: string;
  hook: string;
  transcriptExcerpt: string;
  views: number;
  creator: string;
  savedAt: string;
}

export interface Competitor {
  handle: string;
  displayName: string;
  followerCount: number;
  niche: string;
  reels: CompetitorReel[];
}

export interface ScheduledPost {
  id: string;
  date: string;
  time: string;
  platform: Platform;
  hook: string;
  caption: string;
  status: PostStatus;
}

export interface TrendingItem {
  id: string;
  title: string;
  source: string;
  url: string;
  hookPotential: HookPotential;
  tag: HookTag;
  summary: string;
  publishedAt: string;
}

export interface HeaterPost {
  id: string;
  hook: string;
  platform: Platform;
  views: number;
  medianMultiple: number;
  note: string;
  postedAt: string;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export const hooks: Hook[] = [
  {
    id: "h1",
    text: "Claude just killed Copilot — I built a full app in 47 minutes",
    template: "[AI TOOL] just killed [COMPETITOR] — I built [THING] in [TIME]",
    niche: "Claude",
    hookType: "killed",
    views: 5800000,
    creator: "@theaihustle7",
    followerCount: 312000,
    tiktokUrl: "https://tiktok.com/@theaihustle7/video/1",
    savedAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: "h2",
    text: "I built and launched a SaaS in 3 days using only Claude — here's the breakdown",
    template: "I built and launched [PRODUCT] in [TIME] using only [TOOL] — here's the breakdown",
    niche: "Vibe Coding",
    hookType: "contrast",
    views: 4200000,
    creator: "@mreflow",
    followerCount: 920000,
    tiktokUrl: "https://tiktok.com/@mreflow/video/2",
    savedAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: "h3",
    text: "Stop writing code from scratch — vibe code it in 10 minutes instead",
    template: "Stop [OLD WAY] — [NEW WAY] it in [TIME] instead",
    niche: "Vibe Coding",
    hookType: "stop-doing",
    views: 3700000,
    creator: "@vibecodewithtom",
    followerCount: 540000,
    tiktokUrl: "https://tiktok.com/@vibecodewithtom/video/3",
    savedAt: subDays(new Date(), 4).toISOString(),
  },
  {
    id: "h4",
    text: "5 Claude prompts that replace a $5k/month dev team",
    template: "[NUMBER] [TOOL] prompts that replace [EXPENSIVE THING]",
    niche: "Claude",
    hookType: "number",
    views: 6100000,
    creator: "@theaihustle7",
    followerCount: 312000,
    tiktokUrl: "https://tiktok.com/@theaihustle7/video/4",
    savedAt: subDays(new Date(), 3).toISOString(),
  },
  {
    id: "h5",
    text: "7 things I wish I knew before building my first AI app",
    template: "[NUMBER] things I wish I knew before [DOING THING]",
    niche: "App Building",
    hookType: "wish-i-knew",
    views: 3400000,
    creator: "@buildwithAIdan",
    followerCount: 480000,
    tiktokUrl: "https://tiktok.com/@buildwithAIdan/video/5",
    savedAt: subDays(new Date(), 6).toISOString(),
  },
  {
    id: "h6",
    text: "GPT-4o just made Claude obsolete for this one thing",
    template: "[NEW TOOL] just made [OLD TOOL] obsolete for [SPECIFIC USE CASE]",
    niche: "AI",
    hookType: "killed",
    views: 4900000,
    creator: "@howtoai",
    followerCount: 1100000,
    tiktokUrl: "https://tiktok.com/@howtoai/video/6",
    savedAt: subDays(new Date(), 5).toISOString(),
  },
  {
    id: "h7",
    text: "I gave Claude my app idea at 9pm — by midnight it was live",
    template: "I gave Claude my [IDEA] at [TIME] — by [TIME] it was [RESULT]",
    niche: "Claude",
    hookType: "contrast",
    views: 7200000,
    creator: "@theaihustle7",
    followerCount: 312000,
    tiktokUrl: "https://tiktok.com/@theaihustle7/video/7",
    savedAt: subDays(new Date(), 0).toISOString(),
  },
  {
    id: "h8",
    text: "The vibe coding workflow that's replacing junior developers",
    template: "The [WORKFLOW] that's replacing [JOB/ROLE]",
    niche: "Vibe Coding",
    hookType: "contrast",
    views: 5500000,
    creator: "@levelsio",
    followerCount: 680000,
    tiktokUrl: "https://tiktok.com/@levelsio/video/8",
    savedAt: subDays(new Date(), 3).toISOString(),
  },
  {
    id: "h9",
    text: "8 Claude features nobody talks about",
    template: "[NUMBER] [TOOL] features nobody talks about",
    niche: "Claude",
    hookType: "number",
    views: 2900000,
    creator: "@aiappbuilder",
    followerCount: 310000,
    tiktokUrl: "https://tiktok.com/@aiappbuilder/video/9",
    savedAt: subDays(new Date(), 8).toISOString(),
  },
  {
    id: "h10",
    text: "Stop paying developers — vibe code your MVP and ship it this weekend",
    template: "Stop paying [PERSON] — [ALTERNATIVE] your [PRODUCT] and [ACTION] this [TIME]",
    niche: "Business",
    hookType: "stop-doing",
    views: 4100000,
    creator: "@gregisenberg",
    followerCount: 890000,
    tiktokUrl: "https://tiktok.com/@gregisenberg/video/10",
    savedAt: subDays(new Date(), 7).toISOString(),
  },
  {
    id: "h11",
    text: "How I went from zero code knowledge to shipping 3 apps with Claude",
    template: "How I went from [STARTING STATE] to [OUTCOME] with [TOOL]",
    niche: "App Building",
    hookType: "contrast",
    views: 3800000,
    creator: "@theaihustle7",
    followerCount: 312000,
    tiktokUrl: "https://tiktok.com/@theaihustle7/video/11",
    savedAt: subDays(new Date(), 10).toISOString(),
  },
  {
    id: "h12",
    text: "Anthropic just dropped something and every developer needs to see this",
    template: "[COMPANY] just dropped something and [AUDIENCE] needs to see this",
    niche: "Claude",
    hookType: "killed",
    views: 8900000,
    creator: "@howtoai",
    followerCount: 1100000,
    tiktokUrl: "https://tiktok.com/@howtoai/video/12",
    savedAt: subDays(new Date(), 0).toISOString(),
  },
];

// ─── Analytics Data (90 days) ─────────────────────────────────────────────────

function generateAnalyticsData(): AnalyticsDayData[] {
  const data: AnalyticsDayData[] = [];
  let baseViews = 12000;
  let baseSaves = 180;
  let baseFollows = 65;
  let baseDm = 22;

  for (let i = 89; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayOfWeek = date.getDay();
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 1.4 : 1;
    const trendMultiplier = 1 + ((89 - i) / 89) * 1.1;
    const noise = () => 0.75 + Math.random() * 0.5;
    const viralSpike = Math.random() < 0.09 ? 4 + Math.random() * 5 : 1;

    baseViews = Math.max(8000, baseViews + (Math.random() - 0.44) * 1200);
    baseSaves = Math.max(90, baseSaves + (Math.random() - 0.44) * 20);
    baseFollows = Math.max(30, baseFollows + (Math.random() - 0.44) * 10);
    baseDm = Math.max(8, baseDm + (Math.random() - 0.44) * 4);

    data.push({
      date: format(date, "yyyy-MM-dd"),
      views: Math.round(baseViews * weekendMultiplier * trendMultiplier * noise() * viralSpike),
      saves: Math.round(baseSaves * weekendMultiplier * trendMultiplier * noise() * (viralSpike * 0.6 + 0.4)),
      follows: Math.round(baseFollows * weekendMultiplier * trendMultiplier * noise() * (viralSpike * 0.5 + 0.5)),
      dmVolume: Math.round(baseDm * weekendMultiplier * trendMultiplier * noise() * (viralSpike * 0.4 + 0.6)),
    });
  }
  return data;
}

export const analyticsData: AnalyticsDayData[] = generateAnalyticsData();

// ─── Competitor Data ──────────────────────────────────────────────────────────

export const competitors: Competitor[] = [
  {
    handle: "@mreflow",
    displayName: "Mr Eflow",
    followerCount: 920000,
    niche: "AI Tools / Automation",
    reels: [
      {
        id: "mre1",
        title: "Claude built my entire SaaS",
        hook: "I described my SaaS idea to Claude and it built the entire thing — no code written",
        transcriptExcerpt: "So I literally just typed out what I wanted the app to do. I didn't write a single line of code. Claude generated the full stack — React frontend, Node backend, database schema...",
        views: 6400000,
        creator: "@mreflow",
        savedAt: subDays(new Date(), 2).toISOString(),
      },
      {
        id: "mre2",
        title: "5 AI automation stacks",
        hook: "5 AI automation stacks that run my business on autopilot",
        transcriptExcerpt: "The first stack is my content pipeline. Every Monday morning, Claude scrapes my niche for trending topics, drafts 10 script outlines, and drops them into my Notion...",
        views: 4800000,
        creator: "@mreflow",
        savedAt: subDays(new Date(), 4).toISOString(),
      },
      {
        id: "mre3",
        title: "Stop using ChatGPT for code",
        hook: "Stop using ChatGPT for coding — Claude 3.5 is not even close",
        transcriptExcerpt: "I ran the same 10 coding tasks through both models. ChatGPT got 4 right. Claude got 9 right and the code it wrote was actually production-ready. Here's the breakdown...",
        views: 5200000,
        creator: "@mreflow",
        savedAt: subDays(new Date(), 6).toISOString(),
      },
      {
        id: "mre4",
        title: "Vibe coding my first SaaS",
        hook: "How I vibe coded my first SaaS to $2k MRR in 30 days",
        transcriptExcerpt: "Day one I had an idea. Day two I had a working prototype thanks to Claude Code. Day seven I had paying customers. This is the exact workflow that made it happen...",
        views: 7100000,
        creator: "@mreflow",
        savedAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: "mre5",
        title: "AI stack for non-developers",
        hook: "The AI stack that lets non-developers build real apps in 2024",
        transcriptExcerpt: "You don't need to know how to code anymore. I'm serious. Between Claude, Cursor, and Vercel you can ship a production app with zero prior programming knowledge...",
        views: 9300000,
        creator: "@mreflow",
        savedAt: subDays(new Date(), 0).toISOString(),
      },
    ],
  },
  {
    handle: "@howtoai",
    displayName: "HowToAI",
    followerCount: 1100000,
    niche: "AI Education",
    reels: [
      {
        id: "hta1",
        title: "Claude vs GPT-4o coding test",
        hook: "Claude vs GPT-4o — I gave them both the same app to build (real results)",
        transcriptExcerpt: "Same prompt. Same task. Build me a full-stack todo app with authentication. Watch what happens when I give this to Claude first, then GPT-4o...",
        views: 8200000,
        creator: "@howtoai",
        savedAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: "hta2",
        title: "Anthropic announcement breakdown",
        hook: "Anthropic just announced something massive — here's what it means for you",
        transcriptExcerpt: "The Claude 3.5 Sonnet update changes everything about how we use AI for coding. Extended context, better tool use, and the new artifact feature is a game changer...",
        views: 11400000,
        creator: "@howtoai",
        savedAt: subDays(new Date(), 0).toISOString(),
      },
      {
        id: "hta3",
        title: "10 Claude prompts for developers",
        hook: "10 Claude prompts every developer needs to save right now",
        transcriptExcerpt: "These aren't generic prompts. These are battle-tested, production-ready prompt templates I use daily when building apps with Claude. Number 7 alone saved me 8 hours last week...",
        views: 5700000,
        creator: "@howtoai",
        savedAt: subDays(new Date(), 3).toISOString(),
      },
      {
        id: "hta4",
        title: "AI agents explained simply",
        hook: "AI agents explained in 60 seconds — and why they're changing everything",
        transcriptExcerpt: "An AI agent isn't just a chatbot. It's an AI that can take actions, use tools, browse the web, write and run code, and complete multi-step tasks autonomously...",
        views: 6900000,
        creator: "@howtoai",
        savedAt: subDays(new Date(), 5).toISOString(),
      },
      {
        id: "hta5",
        title: "Build an app with no code",
        hook: "I built a real app with zero coding experience — step by step",
        transcriptExcerpt: "Six months ago I couldn't even explain what an API was. Today I have a live app with 200 users. Here's exactly what I used and what I learned...",
        views: 4300000,
        creator: "@howtoai",
        savedAt: subDays(new Date(), 7).toISOString(),
      },
    ],
  },
  {
    handle: "@levelsio",
    displayName: "Pieter Levels",
    followerCount: 680000,
    niche: "Indie Hacking / App Building",
    reels: [
      {
        id: "lev1",
        title: "12 startups in 12 months",
        hook: "I built 12 startups in 12 months using AI — here's what actually made money",
        transcriptExcerpt: "Most people think you need a team, funding, and months of planning. I built 12 separate products in 12 months, all solo, all using AI tools. Here's the honest scorecard...",
        views: 5400000,
        creator: "@levelsio",
        savedAt: subDays(new Date(), 3).toISOString(),
      },
      {
        id: "lev2",
        title: "Ship fast philosophy",
        hook: "Stop planning. Start shipping. Here's why your MVP should be live this weekend",
        transcriptExcerpt: "I see builders spending 6 months building the perfect product before showing anyone. That's the opposite of what works. Here's my exact framework for shipping in days...",
        views: 7800000,
        creator: "@levelsio",
        savedAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: "lev3",
        title: "Vibe coding workflow 2024",
        hook: "My vibe coding workflow that generates $80k/month — full breakdown",
        transcriptExcerpt: "I use Claude as my co-founder, Cursor as my IDE, and Vercel for deployment. The entire stack costs me $50/month and generates $80k. Let me show you exactly how...",
        views: 12600000,
        creator: "@levelsio",
        savedAt: subDays(new Date(), 0).toISOString(),
      },
      {
        id: "lev4",
        title: "Solo founder advantage",
        hook: "Why solo founders beat VC-funded startups in the AI era",
        transcriptExcerpt: "Speed is the only moat that matters now. A solo founder with Claude can ship faster than a team of 10 engineers. I've experienced both sides and the data is clear...",
        views: 4100000,
        creator: "@levelsio",
        savedAt: subDays(new Date(), 6).toISOString(),
      },
      {
        id: "lev5",
        title: "From idea to $1k MRR",
        hook: "From idea to $1k MRR in 7 days — the exact steps using Claude Code",
        transcriptExcerpt: "Day 1: idea. Day 2: Claude built the MVP. Day 3: landing page live. Day 5: first paying customer. Day 7: $1,200 MRR. I documented every step. Here it is...",
        views: 8900000,
        creator: "@levelsio",
        savedAt: subDays(new Date(), 2).toISOString(),
      },
    ],
  },
  {
    handle: "@gregisenberg",
    displayName: "Greg Isenberg",
    followerCount: 890000,
    niche: "Startup Ideas / Business Building",
    reels: [
      {
        id: "gi1",
        title: "100 AI startup ideas",
        hook: "100 AI startup ideas you could build this weekend with Claude",
        transcriptExcerpt: "Every single one of these ideas is real, buildable, and has a clear monetization path. I'm giving them away for free because ideas aren't the hard part — execution is...",
        views: 9700000,
        creator: "@gregisenberg",
        savedAt: subDays(new Date(), 0).toISOString(),
      },
      {
        id: "gi2",
        title: "Vibe coding business model",
        hook: "The vibe coding business model that's minting millionaires in 2024",
        transcriptExcerpt: "Build with Claude. Sell with Lemon Squeezy. Distribute on TikTok. That's the entire playbook. Let me break down exactly why this works and who's doing it...",
        views: 6200000,
        creator: "@gregisenberg",
        savedAt: subDays(new Date(), 3).toISOString(),
      },
      {
        id: "gi3",
        title: "Community-led AI products",
        hook: "Why community-led AI products are outperforming VC-backed ones",
        transcriptExcerpt: "The best AI products being built right now aren't coming from Silicon Valley. They're coming from solo creators who understand their audience deeply...",
        views: 3800000,
        creator: "@gregisenberg",
        savedAt: subDays(new Date(), 8).toISOString(),
      },
      {
        id: "gi4",
        title: "AI niche validation",
        hook: "How to validate an AI startup idea in 24 hours for free",
        transcriptExcerpt: "Before you build anything, you need to know people will pay for it. Here's my exact validation framework using Claude, Reddit, and a fake landing page...",
        views: 5100000,
        creator: "@gregisenberg",
        savedAt: subDays(new Date(), 5).toISOString(),
      },
      {
        id: "gi5",
        title: "Micro-SaaS goldmine",
        hook: "The micro-SaaS goldmine nobody's talking about in the Claude era",
        transcriptExcerpt: "There are entire categories of software that big companies can't build fast enough. Niche tools, workflow automations, industry-specific solutions — all buildable solo with Claude...",
        views: 4600000,
        creator: "@gregisenberg",
        savedAt: subDays(new Date(), 4).toISOString(),
      },
    ],
  },
  {
    handle: "@fireship",
    displayName: "Fireship",
    followerCount: 2400000,
    niche: "Dev Education / App Building",
    reels: [
      {
        id: "fs1",
        title: "Claude Code review",
        hook: "I spent a week with Claude Code — here's the honest verdict",
        transcriptExcerpt: "Is it actually better than Copilot? I ran 50 real-world tasks through Claude Code. The results surprised me. In some areas it's miles ahead, in others it still struggles...",
        views: 14200000,
        creator: "@fireship",
        savedAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: "fs2",
        title: "Vibe coding explained",
        hook: "Vibe coding explained in 100 seconds",
        transcriptExcerpt: "Vibe coding is when you describe what you want to build in plain English and let an AI write all the code. You are the architect. Claude is the engineer...",
        views: 18600000,
        creator: "@fireship",
        savedAt: subDays(new Date(), 0).toISOString(),
      },
      {
        id: "fs3",
        title: "Full stack app in 6 minutes",
        hook: "I built a full stack app in 6 minutes with Claude — it actually works",
        transcriptExcerpt: "Zero boilerplate. No Stack Overflow. No documentation reading. Just a clear description and Claude generated a working full-stack application in under 6 minutes...",
        views: 22100000,
        creator: "@fireship",
        savedAt: subDays(new Date(), 2).toISOString(),
      },
      {
        id: "fs4",
        title: "AI that codes itself",
        hook: "The AI that writes, runs, and debugs its own code — this changes everything",
        transcriptExcerpt: "Claude's new computer use feature can actually run the code it writes, see the errors, and fix them autonomously. I watched it debug a React app for 20 minutes without touching anything...",
        views: 11400000,
        creator: "@fireship",
        savedAt: subDays(new Date(), 4).toISOString(),
      },
      {
        id: "fs5",
        title: "Is programming dead?",
        hook: "Is programming dead? The honest answer in 2024",
        transcriptExcerpt: "Every few months someone declares programming is dead. They've been wrong every time. But this time something is genuinely different. Here's what actually changes and what doesn't...",
        views: 8700000,
        creator: "@fireship",
        savedAt: subDays(new Date(), 7).toISOString(),
      },
    ],
  },
  {
    handle: "@vibecodewithtom",
    displayName: "Vibe Code With Tom",
    followerCount: 540000,
    niche: "Vibe Coding",
    reels: [
      {
        id: "vct1",
        title: "First vibe coded app",
        hook: "I vibe coded my first app with Claude — made $400 the first week",
        transcriptExcerpt: "I had never built an app before. I used Claude to write every single line. I used Cursor to manage the project. I deployed on Vercel. First week: $400. Second week: $1,100...",
        views: 4900000,
        creator: "@vibecodewithtom",
        savedAt: subDays(new Date(), 2).toISOString(),
      },
      {
        id: "vct2",
        title: "Vibe coding mistake to avoid",
        hook: "The #1 vibe coding mistake that wastes hours — and how to fix it",
        transcriptExcerpt: "The biggest mistake beginners make is asking Claude to do too much at once. When you give it a 500-word prompt, it hallucinates. Here's the correct chunking strategy...",
        views: 3200000,
        creator: "@vibecodewithtom",
        savedAt: subDays(new Date(), 5).toISOString(),
      },
      {
        id: "vct3",
        title: "Vibe coding stack 2024",
        hook: "The exact vibe coding stack I use to ship apps in hours, not months",
        transcriptExcerpt: "Claude for generation. Cursor for editing. Supabase for the database. Vercel for hosting. Lemon Squeezy for payments. The whole thing costs $60/month and can scale to millions...",
        views: 6700000,
        creator: "@vibecodewithtom",
        savedAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: "vct4",
        title: "Non-developer ships SaaS",
        hook: "How a non-developer shipped a SaaS with 500 users using vibe coding",
        transcriptExcerpt: "My friend has zero technical background. She had an idea for a niche scheduling tool. Three weekends of vibe coding with Claude later, she had 500 users and $800 MRR...",
        views: 5800000,
        creator: "@vibecodewithtom",
        savedAt: subDays(new Date(), 3).toISOString(),
      },
      {
        id: "vct5",
        title: "Claude vs Cursor for vibe coding",
        hook: "Claude vs Cursor for vibe coding — which one should you use?",
        transcriptExcerpt: "They're not really competitors — they're complementary. But if you had to pick one to start with, here's my honest recommendation and why...",
        views: 2900000,
        creator: "@vibecodewithtom",
        savedAt: subDays(new Date(), 9).toISOString(),
      },
    ],
  },
  {
    handle: "@buildwithAIdan",
    displayName: "Build With AI Dan",
    followerCount: 480000,
    niche: "App Building / AI Tools",
    reels: [
      {
        id: "bwa1",
        title: "Zero to SaaS with Claude",
        hook: "Zero to SaaS with Claude — the complete 2024 roadmap",
        transcriptExcerpt: "Step 1: validate your idea in 24 hours. Step 2: build your MVP with Claude in a weekend. Step 3: get your first 10 users. Step 4: start charging. Here's each step in detail...",
        views: 4400000,
        creator: "@buildwithAIdan",
        savedAt: subDays(new Date(), 3).toISOString(),
      },
      {
        id: "bwa2",
        title: "Claude prompts for app building",
        hook: "The 5 Claude prompts I use for every single app I build",
        transcriptExcerpt: "After building 15 apps with Claude, I've refined my prompt library down to 5 essential templates. These handle architecture, components, debugging, testing, and deployment...",
        views: 3800000,
        creator: "@buildwithAIdan",
        savedAt: subDays(new Date(), 6).toISOString(),
      },
      {
        id: "bwa3",
        title: "AI app monetization",
        hook: "How to monetize your AI app — 7 models that actually work in 2024",
        transcriptExcerpt: "Freemium, subscription, usage-based, one-time payment, API access, white-label, affiliate. I've tried all seven. Here's what actually works depending on your app type...",
        views: 2700000,
        creator: "@buildwithAIdan",
        savedAt: subDays(new Date(), 8).toISOString(),
      },
      {
        id: "bwa4",
        title: "Claude Code for beginners",
        hook: "Claude Code for beginners — everything you need to get started today",
        transcriptExcerpt: "If you've never used Claude Code before, this video is for you. I'll walk you through installation, your first project, the most important commands, and the exact prompts to start with...",
        views: 5100000,
        creator: "@buildwithAIdan",
        savedAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: "bwa5",
        title: "App ideas you can build this weekend",
        hook: "10 AI app ideas you can build this weekend — all with real revenue potential",
        transcriptExcerpt: "None of these are theoretical. Every idea on this list has a comparable product already making money. The market exists. The question is whether you'll be the one to build it...",
        views: 6200000,
        creator: "@buildwithAIdan",
        savedAt: subDays(new Date(), 4).toISOString(),
      },
    ],
  },
  {
    handle: "@aiappbuilder",
    displayName: "AI App Builder",
    followerCount: 310000,
    niche: "AI App Building",
    reels: [
      {
        id: "aab1",
        title: "Cursor AI deep dive",
        hook: "Cursor AI is the best coding tool I've ever used — here's why",
        transcriptExcerpt: "I've used VSCode, JetBrains, Sublime, Neovim. Cursor beats all of them for AI-assisted development. The Composer feature with Claude 3.5 is genuinely magical...",
        views: 3600000,
        creator: "@aiappbuilder",
        savedAt: subDays(new Date(), 4).toISOString(),
      },
      {
        id: "aab2",
        title: "Build a SaaS with no money",
        hook: "How to build a SaaS with zero budget using free AI tools",
        transcriptExcerpt: "Claude free tier. Supabase free tier. Vercel free tier. Lemon Squeezy free until you make money. The total upfront cost to launch your SaaS is literally $0...",
        views: 4200000,
        creator: "@aiappbuilder",
        savedAt: subDays(new Date(), 2).toISOString(),
      },
      {
        id: "aab3",
        title: "React app in 20 minutes",
        hook: "I built a full React app in 20 minutes — Claude wrote every line",
        transcriptExcerpt: "Component architecture, state management, API integration, responsive design. All of it built by Claude in 20 minutes. Would have taken me 3 days to do manually...",
        views: 5700000,
        creator: "@aiappbuilder",
        savedAt: subDays(new Date(), 0).toISOString(),
      },
      {
        id: "aab4",
        title: "Claude API tutorial",
        hook: "How to use the Claude API — beginner tutorial with real examples",
        transcriptExcerpt: "The Claude API is easier to use than you think. In this tutorial I'll show you how to make your first API call, handle streaming responses, and build a simple AI chatbot...",
        views: 2400000,
        creator: "@aiappbuilder",
        savedAt: subDays(new Date(), 7).toISOString(),
      },
      {
        id: "aab5",
        title: "App building mistakes",
        hook: "5 app building mistakes that cost me 3 months — don't repeat them",
        transcriptExcerpt: "I built the wrong thing for 3 months before validating. Don't do what I did. Here's the exact checklist I run through before writing a single line of code now...",
        views: 3100000,
        creator: "@aiappbuilder",
        savedAt: subDays(new Date(), 5).toISOString(),
      },
    ],
  },
];

// ─── Scheduled Posts ──────────────────────────────────────────────────────────

const currentMonthStart = startOfMonth(new Date());

export const scheduledPosts: ScheduledPost[] = [
  {
    id: "sp1",
    date: format(addDays(currentMonthStart, 0), "yyyy-MM-dd"),
    time: "09:00",
    platform: "TikTok",
    hook: "I gave Claude my app idea at 9pm — by midnight it was live",
    caption: "No dev experience. No team. Just Claude and a clear vision. The AI era is wild 🤖\n\nFollow @theaihustle7 for daily Claude + vibe coding tips. #Claude #VibeCoding #AppBuilding #AItools",
    status: "posted",
  },
  {
    id: "sp2",
    date: format(addDays(currentMonthStart, 1), "yyyy-MM-dd"),
    time: "18:00",
    platform: "Instagram",
    hook: "5 Claude prompts that replace a $5k/month dev team",
    caption: "Save this. These 5 prompts handle architecture, frontend, backend, debugging, and deployment. Your dev team in your pocket 💻\n\n#Claude #AIPrompts #VibeCoding #SoloFounder",
    status: "posted",
  },
  {
    id: "sp3",
    date: format(addDays(currentMonthStart, 3), "yyyy-MM-dd"),
    time: "12:00",
    platform: "YouTube",
    hook: "Full vibe coding walkthrough: from idea to live app in 2 hours",
    caption: "This is the complete workflow. Claude Code + Cursor + Vercel. Watch me build a real app from scratch — concept, code, deploy. No skips, no edits.\n\n#VibeCoding #ClaudeAI #AppBuilding #Tutorial",
    status: "posted",
  },
  {
    id: "sp4",
    date: format(addDays(currentMonthStart, 5), "yyyy-MM-dd"),
    time: "09:30",
    platform: "TikTok",
    hook: "Stop writing code from scratch — vibe code it in 10 minutes",
    caption: "Manual coding is the slow lane now. Let me show you what 10 minutes of vibe coding with Claude produces 🔥 #Claude #VibeCoding #Coding #AItools",
    status: "posted",
  },
  {
    id: "sp5",
    date: format(addDays(currentMonthStart, 7), "yyyy-MM-dd"),
    time: "17:00",
    platform: "Instagram",
    hook: "Anthropic just dropped something every builder needs to know",
    caption: "The Claude update changes how I build apps. Full breakdown of what's new and how to use it. Save for later 📌\n\n#Anthropic #Claude #AINews #AppBuilding",
    status: "posted",
  },
  {
    id: "sp6",
    date: format(addDays(currentMonthStart, 9), "yyyy-MM-dd"),
    time: "10:00",
    platform: "TikTok",
    hook: "How I went from zero code knowledge to shipping 3 apps with Claude",
    caption: "6 months ago I couldn't read JavaScript. Today I have 3 live apps. Claude made this possible. Your turn 🚀 #ClaudeAI #VibeCoding #ZeroToShipped",
    status: "posted",
  },
  {
    id: "sp7",
    date: format(addDays(currentMonthStart, 11), "yyyy-MM-dd"),
    time: "09:00",
    platform: "TikTok",
    hook: "The vibe coding stack that costs $60/month and scales to millions",
    caption: "Claude + Cursor + Supabase + Vercel. This is the stack. I've tested everything. This wins. Follow for the full breakdown 🛠️ #VibeCoding #TechStack #BuildInPublic",
    status: "posted",
  },
  {
    id: "sp8",
    date: format(addDays(currentMonthStart, 13), "yyyy-MM-dd"),
    time: "18:00",
    platform: "Instagram",
    hook: "8 Claude features nobody's using (but should be)",
    caption: "Most people use Claude like a chatbot. These 8 features turn it into a full development environment. Game changers every one 🎯\n\n#Claude #AItools #Developer #Productivity",
    status: "scheduled",
  },
  {
    id: "sp9",
    date: format(addDays(currentMonthStart, 14), "yyyy-MM-dd"),
    time: "09:00",
    platform: "TikTok",
    hook: "I built a SaaS in a weekend — here's week 2 revenue",
    caption: "Week 1: $0. Week 2: $840. Week 3: $2,100. Documenting the whole journey. Real numbers, real product. Follow the build 📈 #BuildInPublic #SaaS #VibeCoding",
    status: "scheduled",
  },
  {
    id: "sp10",
    date: format(addDays(currentMonthStart, 16), "yyyy-MM-dd"),
    time: "12:00",
    platform: "YouTube",
    hook: "Claude Code vs Cursor — which is better for vibe coding in 2024?",
    caption: "I've used both for 3 months straight. Full honest comparison with real projects. The answer might surprise you.\n\n#ClaudeCode #Cursor #VibeCoding #AItools",
    status: "scheduled",
  },
  {
    id: "sp11",
    date: format(addDays(currentMonthStart, 18), "yyyy-MM-dd"),
    time: "09:30",
    platform: "TikTok",
    hook: "This Claude prompt builds entire React components in 30 seconds",
    caption: "One prompt. Thirty seconds. Production-ready component. Save this. #Claude #React #VibeCoding #FrontendDev",
    status: "scheduled",
  },
  {
    id: "sp12",
    date: format(addDays(currentMonthStart, 20), "yyyy-MM-dd"),
    time: "17:30",
    platform: "Instagram",
    hook: "7 app ideas in the Claude/AI niche with real revenue potential",
    caption: "All buildable solo. All with paying customers already in the market. All perfect for vibe coding. Pick one and build this weekend 💡\n\n#AppIdeas #AItools #SaaS #VibeCoding",
    status: "scheduled",
  },
  {
    id: "sp13",
    date: format(addDays(currentMonthStart, 22), "yyyy-MM-dd"),
    time: "09:00",
    platform: "TikTok",
    hook: "Non-technical founder challenge: build an app in 48 hours",
    caption: "Day 1 starts now. Documenting everything — the wins, the failures, the Claude conversations. Follow to watch in real time 🎬 #BuildChallenge #VibeCoding #Claude",
    status: "draft",
  },
  {
    id: "sp14",
    date: format(addDays(currentMonthStart, 25), "yyyy-MM-dd"),
    time: "10:00",
    platform: "TikTok",
    hook: "The Claude prompt that generates an entire SaaS architecture",
    caption: "One prompt. Full system design. Database schema, API routes, component structure, authentication flow. Claude thinks like a senior architect. #Claude #SystemDesign #VibeCoding",
    status: "draft",
  },
  {
    id: "sp15",
    date: format(addDays(currentMonthStart, 28), "yyyy-MM-dd"),
    time: "09:00",
    platform: "YouTube",
    hook: "Month in review: everything I built, shipped, and learned with Claude",
    caption: "End of month. Full breakdown of every project, every revenue number, every lesson. This is the honest creator build-in-public review you've been asking for.\n\n#BuildInPublic #Claude #MonthlyReview #VibeCoding",
    status: "draft",
  },
];

// ─── Trending Items ───────────────────────────────────────────────────────────

export const trendingItems: TrendingItem[] = [
  {
    id: "t1",
    title: "Anthropic Releases Claude 3.5 Sonnet — Now the Best Coding Model Available",
    source: "Anthropic Blog",
    url: "https://anthropic.com/blog",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Anthropic's Claude 3.5 Sonnet benchmarks as the top coding model, beating GPT-4o and Gemini 1.5 Pro on SWE-bench. Developers are already calling it a step-change for vibe coding workflows.",
    publishedAt: subHours(new Date(), 2).toISOString(),
  },
  {
    id: "t2",
    title: "Claude Code Now Available — Anthropic's Official CLI for Agentic Coding",
    source: "Anthropic Blog",
    url: "https://anthropic.com/blog",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Claude Code is Anthropic's new terminal-based coding agent. It can read entire codebases, write tests, run commands, and fix its own bugs autonomously — a direct shot at Cursor and GitHub Copilot.",
    publishedAt: subHours(new Date(), 4).toISOString(),
  },
  {
    id: "t3",
    title: "Vibe Coding Is Now a Job Title at Several YC Companies",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Multiple YC-backed startups have posted job listings for 'AI-first builder' and 'vibe coder' roles — people who build with Claude/GPT rather than traditional engineering. Salary ranges: $120k–$200k.",
    publishedAt: subMinutes(new Date(), 30).toISOString(),
  },
  {
    id: "t4",
    title: "Show HN: I vibe coded a $4k MRR SaaS in a single weekend",
    source: "Hacker News",
    url: "https://news.ycombinator.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "A solo founder built, deployed, and got paying customers for a niche B2B tool in 48 hours using Claude 3.5 and Cursor. The HN post went viral and drove 600 signups in 24 hours.",
    publishedAt: subHours(new Date(), 6).toISOString(),
  },
  {
    id: "t5",
    title: "OpenAI's o3 Model Matches Senior Developer Performance on Real Coding Tasks",
    source: "OpenAI Blog",
    url: "https://openai.com/blog",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "OpenAI's o3 model scored 71.7% on SWE-bench verified, meaning it can solve most real-world GitHub issues autonomously. This is the benchmark where human senior devs score around 86%.",
    publishedAt: subHours(new Date(), 8).toISOString(),
  },
  {
    id: "t6",
    title: "The Economics of Vibe Coding: Why Solo Builders Are Winning",
    source: "Ben's Bites",
    url: "https://bensbites.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "A deep analysis of the vibe coding economy. Solo builders using Claude are shipping products that would have required 5-person teams 2 years ago, with 80% lower costs and 10x faster iteration.",
    publishedAt: subHours(new Date(), 3).toISOString(),
  },
  {
    id: "t7",
    title: "How Transformer Architecture Actually Works — Visual Explainer",
    source: "MIT Tech Review",
    url: "https://technologyreview.com",
    hookPotential: "medium",
    tag: "explainer",
    summary: "A clear visual breakdown of transformer attention mechanisms — how tokens attend to each other, what positional encoding does, and why scaling laws keep surprising researchers.",
    publishedAt: subHours(new Date(), 24).toISOString(),
  },
  {
    id: "t8",
    title: "Andrej Karpathy Coins 'Vibe Coding' — The Term Takes Over the Internet",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Andrej Karpathy's tweet defining vibe coding as 'fully give in to the vibes, embrace exponentials, and forget that the code even exists' has 50M+ impressions. Entire communities formed overnight.",
    publishedAt: subMinutes(new Date(), 15).toISOString(),
  },
  {
    id: "t9",
    title: "Cursor Raises $60M Series B — Now Valued at $400M",
    source: "Hacker News",
    url: "https://news.ycombinator.com",
    hookPotential: "medium",
    tag: "explainer",
    summary: "Cursor, the AI-first code editor built on VSCode that integrates Claude and GPT-4, raised a $60M Series B. Active user growth is reportedly 40% month-over-month with strong enterprise adoption.",
    publishedAt: subHours(new Date(), 12).toISOString(),
  },
  {
    id: "t10",
    title: "Google Gemini 1.5 Pro vs Claude 3.5 Sonnet — The Definitive Coding Benchmark",
    source: "Simon Willison's Blog",
    url: "https://simonwillison.net",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Independent researcher Simon Willison ran 200 identical coding prompts through both models. Claude wins on code quality, Gemini wins on context length tasks. Full breakdown with examples.",
    publishedAt: subHours(new Date(), 5).toISOString(),
  },
  {
    id: "t11",
    title: "How to Build a Claude-Powered App: A Complete Beginner's Guide",
    source: "Anthropic Blog",
    url: "https://anthropic.com/docs",
    hookPotential: "medium",
    tag: "explainer",
    summary: "Step-by-step tutorial for building your first app using the Claude API — covering authentication, prompt engineering, streaming responses, and cost optimization with prompt caching.",
    publishedAt: subHours(new Date(), 18).toISOString(),
  },
  {
    id: "t12",
    title: "The Dark Side of Vibe Coding Nobody Talks About",
    source: "Hacker News",
    url: "https://news.ycombinator.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "A senior engineer's thread on why vibe-coded apps often have hidden security vulnerabilities, unscalable architecture, and technical debt that's invisible to non-technical founders. Viral counterpoint.",
    publishedAt: subHours(new Date(), 9).toISOString(),
  },
  {
    id: "t13",
    title: "Anthropic's Constitutional AI — Why Claude Refuses Certain Requests",
    source: "Anthropic Blog",
    url: "https://anthropic.com/research",
    hookPotential: "medium",
    tag: "explainer",
    summary: "An accessible breakdown of how Claude's values are trained using Constitutional AI — why it's different from RLHF, what the principles are, and how it affects real-world usage for builders.",
    publishedAt: subHours(new Date(), 36).toISOString(),
  },
  {
    id: "t14",
    title: "TikTok Creators Making $50k+/Month Building AI Tools — The New Creator Economy",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "A thread documenting TikTok and YouTube creators who pivoted to building and selling AI tools. Several are making $30k–$80k/month with products they built using Claude in weeks.",
    publishedAt: subHours(new Date(), 1).toISOString(),
  },
  {
    id: "t15",
    title: "History of Large Language Models: From GPT-1 to Claude 3",
    source: "MIT Tech Review",
    url: "https://technologyreview.com",
    hookPotential: "skip",
    tag: "skip",
    summary: "Academic overview of LLM development from 2018 to present — covering architecture milestones, parameter scaling, training compute, and the emergence of instruction following.",
    publishedAt: subHours(new Date(), 72).toISOString(),
  },
  {
    id: "t16",
    title: "Lenny Rachitsky: 'AI is Making Solo PMs as Effective as Teams of 10'",
    source: "Lenny's Newsletter",
    url: "https://lennysnewsletter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Product legend Lenny Rachitsky's newsletter on how AI tools — particularly Claude for writing, analysis, and user research synthesis — are making solo operators as effective as small teams.",
    publishedAt: subHours(new Date(), 7).toISOString(),
  },
  {
    id: "t17",
    title: "Supabase + Claude: The Full Stack Vibe Coding Setup Guide",
    source: "Product Hunt",
    url: "https://producthunt.com",
    hookPotential: "medium",
    tag: "explainer",
    summary: "Step-by-step guide for connecting Supabase to Claude-generated apps — database setup, row level security, realtime subscriptions, and edge functions, all generated with AI prompts.",
    publishedAt: subHours(new Date(), 14).toISOString(),
  },
  {
    id: "t18",
    title: "The AI Tools Replacing $200k Developer Salaries in 2024",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Viral thread comparing the output of a $200k senior engineer vs a non-technical founder with Claude + Cursor. For 80% of startup tasks, the AI stack wins on speed and cost.",
    publishedAt: subHours(new Date(), 11).toISOString(),
  },
  {
    id: "t19",
    title: "Andrew Ng: 'AI Literacy is the New Coding Literacy'",
    source: "The Batch",
    url: "https://deeplearning.ai/the-batch",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Andrew Ng's weekly newsletter argues that knowing how to prompt, evaluate, and integrate AI models will be as fundamental as basic coding was in the 2000s. The window to learn is now.",
    publishedAt: subHours(new Date(), 20).toISOString(),
  },
  {
    id: "t20",
    title: "Comparing Token Limits: Claude 3.5 vs GPT-4 vs Gemini 1.5 Pro",
    source: "Simon Willison's Blog",
    url: "https://simonwillison.net",
    hookPotential: "skip",
    tag: "skip",
    summary: "Technical comparison of context window sizes, practical token usage, and cost per million tokens across the three leading frontier models. Includes benchmark results on long-document tasks.",
    publishedAt: subHours(new Date(), 48).toISOString(),
  },
];

// ─── Heaters ──────────────────────────────────────────────────────────────────

export const heaters: HeaterPost[] = [
  {
    id: "heat1",
    hook: "I gave Claude my app idea at 9pm — by midnight it was live",
    platform: "TikTok",
    views: 7200000,
    medianMultiple: 9.4,
    note: "Specific time stamps (9pm → midnight) create urgency and relatability. 'Live' as the payoff word signals real outcome, not just a demo. Posted during prime TikTok hours.",
    postedAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: "heat2",
    hook: "5 Claude prompts that replace a $5k/month dev team",
    platform: "TikTok",
    views: 6100000,
    medianMultiple: 7.9,
    note: "Specific dollar amount ($5k/month) creates an instantly quantified value proposition. Number hook (5) + direct savings message drives save rate 3x above average.",
    postedAt: subDays(new Date(), 8).toISOString(),
  },
  {
    id: "heat3",
    hook: "Anthropic just dropped something every builder needs to see",
    platform: "TikTok",
    views: 5400000,
    medianMultiple: 7.0,
    note: "News-cycle hook timed to Anthropic announcement. 'Every builder needs to see' creates FOMO and signals relevance. Reshared by 3 large AI accounts amplifying reach.",
    postedAt: subDays(new Date(), 14).toISOString(),
  },
  {
    id: "heat4",
    hook: "Claude just killed Copilot — I built a full app in 47 minutes",
    platform: "YouTube",
    views: 5800000,
    medianMultiple: 7.5,
    note: "'Killed' is algorithmically charged. Specific time (47 min) more credible than a round number. Comparison hook between two known products drives comment debate = more distribution.",
    postedAt: subDays(new Date(), 20).toISOString(),
  },
  {
    id: "heat5",
    hook: "How I went from zero code knowledge to shipping 3 apps with Claude",
    platform: "Instagram",
    views: 3800000,
    medianMultiple: 4.9,
    note: "Transformation arc resonates with the non-technical audience. 'Zero code knowledge' is the aspirational entry point. '3 apps' signals repeatable system, not luck.",
    postedAt: subDays(new Date(), 25).toISOString(),
  },
];
