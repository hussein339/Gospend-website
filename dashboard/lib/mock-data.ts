import { subDays, subHours, subMinutes, format, addDays, startOfMonth } from "date-fns";

// ─── Types ───────────────────────────────────────────────────────────────────

export type HookNiche = "AI" | "Finance" | "Productivity" | "Fitness" | "Business";
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
    text: "ChatGPT just killed Google Search",
    template: "[TOOL] just killed [COMPETITOR]",
    niche: "AI",
    hookType: "killed",
    views: 4200000,
    creator: "@theaihustle7",
    followerCount: 312000,
    tiktokUrl: "https://tiktok.com/@theaihustle7/video/1",
    savedAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: "h2",
    text: "5 ChatGPT prompts that pay better than your job",
    template: "[NUMBER] [TOOL] [ACTION] that [OUTCOME BETTER THAN STATUS QUO]",
    niche: "AI",
    hookType: "number",
    views: 2800000,
    creator: "@kreatorking",
    followerCount: 890000,
    tiktokUrl: "https://tiktok.com/@kreatorking/video/2",
    savedAt: subDays(new Date(), 4).toISOString(),
  },
  {
    id: "h3",
    text: "Stop using Google Docs and use this instead",
    template: "Stop using [OLD TOOL] and use [NEW TOOL] instead",
    niche: "Productivity",
    hookType: "stop-doing",
    views: 1900000,
    creator: "@productivitywithpat",
    followerCount: 450000,
    tiktokUrl: "https://tiktok.com/@productivitywithpat/video/3",
    savedAt: subDays(new Date(), 6).toISOString(),
  },
  {
    id: "h4",
    text: "7 things your financial advisor never told you",
    template: "[NUMBER] things [AUTHORITY FIGURE] never told you about [TOPIC]",
    niche: "Finance",
    hookType: "wish-i-knew",
    views: 3400000,
    creator: "@themarketingmind",
    followerCount: 620000,
    tiktokUrl: "https://tiktok.com/@themarketingmind/video/4",
    savedAt: subDays(new Date(), 8).toISOString(),
  },
  {
    id: "h5",
    text: "AI replaced 3 of my freelancers — here's what happened",
    template: "[TECHNOLOGY] replaced [NUMBER] of my [WORKERS] — here's what happened",
    niche: "AI",
    hookType: "contrast",
    views: 5100000,
    creator: "@aiforeveryone",
    followerCount: 1200000,
    tiktokUrl: "https://tiktok.com/@aiforeveryone/video/5",
    savedAt: subDays(new Date(), 3).toISOString(),
  },
  {
    id: "h6",
    text: "The morning routine that made me $10k last month",
    template: "The [HABIT/ROUTINE] that made me [INCOME MILESTONE] last [TIME PERIOD]",
    niche: "Business",
    hookType: "contrast",
    views: 2200000,
    creator: "@solopreneursteve",
    followerCount: 340000,
    tiktokUrl: "https://tiktok.com/@solopreneursteve/video/6",
    savedAt: subDays(new Date(), 10).toISOString(),
  },
  {
    id: "h7",
    text: "3 AI tools that run my entire business while I sleep",
    template: "[NUMBER] AI tools that [DO THE WORK] while you [DO NOTHING]",
    niche: "AI",
    hookType: "number",
    views: 3700000,
    creator: "@theaihustle7",
    followerCount: 312000,
    tiktokUrl: "https://tiktok.com/@theaihustle7/video/7",
    savedAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: "h8",
    text: "I gave AI my $50k debt problem — the answer was insane",
    template: "I gave AI my [PROBLEM] — the answer was [REACTION]",
    niche: "Finance",
    hookType: "contrast",
    views: 4800000,
    creator: "@debtfreedom_dan",
    followerCount: 780000,
    tiktokUrl: "https://tiktok.com/@debtfreedom_dan/video/8",
    savedAt: subDays(new Date(), 5).toISOString(),
  },
  {
    id: "h9",
    text: "10 Notion hacks nobody talks about",
    template: "[NUMBER] [TOOL] hacks nobody talks about",
    niche: "Productivity",
    hookType: "number",
    views: 1600000,
    creator: "@notionwizard",
    followerCount: 290000,
    tiktokUrl: "https://tiktok.com/@notionwizard/video/9",
    savedAt: subDays(new Date(), 14).toISOString(),
  },
  {
    id: "h10",
    text: "Stop trading your time for money — do this instead",
    template: "Stop trading [COMMODITY] for [OUTCOME] — do [ALTERNATIVE] instead",
    niche: "Business",
    hookType: "stop-doing",
    views: 2900000,
    creator: "@passiveincomepro",
    followerCount: 510000,
    tiktokUrl: "https://tiktok.com/@passiveincomepro/video/10",
    savedAt: subDays(new Date(), 7).toISOString(),
  },
  {
    id: "h11",
    text: "The gym routine that adds muscle without cardio",
    template: "The [ACTIVITY] that [DESIRED OUTCOME] without [DREADED THING]",
    niche: "Fitness",
    hookType: "contrast",
    views: 890000,
    creator: "@fitnessfacts_",
    followerCount: 220000,
    tiktokUrl: "https://tiktok.com/@fitnessfacts_/video/11",
    savedAt: subDays(new Date(), 11).toISOString(),
  },
  {
    id: "h12",
    text: "OpenAI just changed everything — watch before it's gone",
    template: "[COMPANY] just changed everything — watch before [URGENCY]",
    niche: "AI",
    hookType: "killed",
    views: 6200000,
    creator: "@aiforeveryone",
    followerCount: 1200000,
    tiktokUrl: "https://tiktok.com/@aiforeveryone/video/12",
    savedAt: subDays(new Date(), 0).toISOString(),
  },
];

// ─── Analytics Data (90 days) ─────────────────────────────────────────────────

function generateAnalyticsData(): AnalyticsDayData[] {
  const data: AnalyticsDayData[] = [];
  let baseViews = 8000;
  let baseSaves = 120;
  let baseFollows = 45;
  let baseDm = 15;

  for (let i = 89; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dayOfWeek = date.getDay();
    const weekendMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 1.3 : 1;
    const trendMultiplier = 1 + ((89 - i) / 89) * 0.8; // trending upward
    const noise = () => 0.75 + Math.random() * 0.5;

    // occasional viral spikes
    const viralSpike = Math.random() < 0.08 ? 3 + Math.random() * 4 : 1;

    baseViews = Math.max(5000, baseViews + (Math.random() - 0.45) * 800);
    baseSaves = Math.max(60, baseSaves + (Math.random() - 0.45) * 15);
    baseFollows = Math.max(20, baseFollows + (Math.random() - 0.45) * 8);
    baseDm = Math.max(5, baseDm + (Math.random() - 0.45) * 3);

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
    handle: "@kreatorking",
    displayName: "Kreator King",
    followerCount: 890000,
    niche: "AI / Business",
    reels: [
      {
        id: "kr1",
        title: "5 AI tools that print money",
        hook: "5 AI tools that print money while you sleep",
        transcriptExcerpt: "Alright so the first tool on this list changed my business completely. I went from spending 20 hours a week on content to literally 2 hours...",
        views: 4200000,
        creator: "@kreatorking",
        savedAt: subDays(new Date(), 3).toISOString(),
      },
      {
        id: "kr2",
        title: "ChatGPT prompt formula",
        hook: "This one ChatGPT prompt formula made me $8k in 30 days",
        transcriptExcerpt: "Everyone's using ChatGPT wrong. The people making real money with it aren't just typing random questions — they're using a specific structure...",
        views: 3100000,
        creator: "@kreatorking",
        savedAt: subDays(new Date(), 5).toISOString(),
      },
      {
        id: "kr3",
        title: "Stop using Canva for this",
        hook: "Stop using Canva for this — use these 3 AI tools instead",
        transcriptExcerpt: "I know you love Canva. I did too. But for this specific type of content, Canva is actually slowing you down massively and here's why...",
        views: 1800000,
        creator: "@kreatorking",
        savedAt: subDays(new Date(), 7).toISOString(),
      },
      {
        id: "kr4",
        title: "The 2-hour content week",
        hook: "How I batch 30 days of content in 2 hours using AI",
        transcriptExcerpt: "This is the exact system I use every single month. Step one is using Claude to generate your content pillars based on your niche...",
        views: 2600000,
        creator: "@kreatorking",
        savedAt: subDays(new Date(), 9).toISOString(),
      },
      {
        id: "kr5",
        title: "AI business ideas 2024",
        hook: "7 AI business ideas you can start with $0 this weekend",
        transcriptExcerpt: "The barrier to starting an online business has never been lower. With these seven AI-powered ideas, you literally need zero capital...",
        views: 5400000,
        creator: "@kreatorking",
        savedAt: subDays(new Date(), 2).toISOString(),
      },
    ],
  },
  {
    handle: "@themarketingmind",
    displayName: "The Marketing Mind",
    followerCount: 620000,
    niche: "Marketing / Finance",
    reels: [
      {
        id: "mm1",
        title: "Marketing secrets they hide",
        hook: "The marketing secret Apple, Nike & Starbucks all use — and most creators ignore",
        transcriptExcerpt: "There's a psychological trigger that every major brand weaponizes in their content. It's called identity signaling, and once you see it...",
        views: 3800000,
        creator: "@themarketingmind",
        savedAt: subDays(new Date(), 4).toISOString(),
      },
      {
        id: "mm2",
        title: "Email list growth hack",
        hook: "I grew my email list by 12,000 in 30 days — here's the exact funnel",
        transcriptExcerpt: "Most people think growing an email list means posting a link to your bio and hoping for the best. That was me 6 months ago...",
        views: 2200000,
        creator: "@themarketingmind",
        savedAt: subDays(new Date(), 6).toISOString(),
      },
      {
        id: "mm3",
        title: "Hook writing formula",
        hook: "The 3-second hook formula that stops scrollers cold",
        transcriptExcerpt: "Your first three seconds determine whether someone watches or swipes. I analyzed 500 viral videos and found the exact pattern...",
        views: 4900000,
        creator: "@themarketingmind",
        savedAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: "mm4",
        title: "Brand deal pricing",
        hook: "How to charge $5,000 for brand deals (with only 10k followers)",
        transcriptExcerpt: "Follower count is a vanity metric. Brands actually care about engagement rate, niche authority, and audience quality. Here's how to package yourself...",
        views: 1600000,
        creator: "@themarketingmind",
        savedAt: subDays(new Date(), 12).toISOString(),
      },
      {
        id: "mm5",
        title: "Viral content framework",
        hook: "This content framework went viral 6 times in a row — not luck",
        transcriptExcerpt: "People call it luck when a video goes viral. But when it happens six times in a row using the same structure, it's a system...",
        views: 3300000,
        creator: "@themarketingmind",
        savedAt: subDays(new Date(), 8).toISOString(),
      },
    ],
  },
  {
    handle: "@aiforeveryone",
    displayName: "AI For Everyone",
    followerCount: 1200000,
    niche: "AI Education",
    reels: [
      {
        id: "af1",
        title: "GPT-5 changes everything",
        hook: "GPT-5 just dropped and it changes everything about how we work",
        transcriptExcerpt: "I've been testing GPT-5 for the past 48 hours and I need to share what I found. The reasoning capability alone is a 10x improvement over GPT-4...",
        views: 7800000,
        creator: "@aiforeveryone",
        savedAt: subDays(new Date(), 0).toISOString(),
      },
      {
        id: "af2",
        title: "AI workflow 2024",
        hook: "My full AI workflow that saves me 25 hours every week",
        transcriptExcerpt: "Monday morning I wake up and the first thing I do is check what my AI agents did overnight. Yes, AI agents working while I sleep...",
        views: 5200000,
        creator: "@aiforeveryone",
        savedAt: subDays(new Date(), 3).toISOString(),
      },
      {
        id: "af3",
        title: "Claude vs ChatGPT real test",
        hook: "Claude vs ChatGPT — I gave them both the same 10 tasks (real results)",
        transcriptExcerpt: "I hear people pick sides all the time without actually testing. So I spent a week giving both models identical prompts across 10 different categories...",
        views: 4100000,
        creator: "@aiforeveryone",
        savedAt: subDays(new Date(), 5).toISOString(),
      },
      {
        id: "af4",
        title: "AI killed my agency",
        hook: "AI killed my $15k/month agency — best thing that ever happened",
        transcriptExcerpt: "18 months ago I was running a content agency with 8 clients. Then AI tools got good enough that I could do the work alone, better, and faster...",
        views: 6300000,
        creator: "@aiforeveryone",
        savedAt: subDays(new Date(), 7).toISOString(),
      },
      {
        id: "af5",
        title: "Perplexity research hack",
        hook: "Perplexity AI does in 30 seconds what used to take me 4 hours",
        transcriptExcerpt: "Research used to be the most time-consuming part of my content creation process. Open 15 tabs, read everything, synthesize it all. Now watch what happens...",
        views: 3600000,
        creator: "@aiforeveryone",
        savedAt: subDays(new Date(), 10).toISOString(),
      },
    ],
  },
  {
    handle: "@solopreneurpath",
    displayName: "Solopreneur Path",
    followerCount: 340000,
    niche: "Business / Solopreneur",
    reels: [
      {
        id: "sp1",
        title: "One-person business model",
        hook: "How I run a $20k/month business completely alone — no employees",
        transcriptExcerpt: "The one-person business model is the future and most people are still sleeping on it. Here's the exact stack I use to operate at scale solo...",
        views: 2400000,
        creator: "@solopreneurpath",
        savedAt: subDays(new Date(), 6).toISOString(),
      },
      {
        id: "sp2",
        title: "Quit your 9-5 framework",
        hook: "The exact numbers you need before you quit your 9-5",
        transcriptExcerpt: "I see people quitting their jobs with $3,000 saved and calling it a business. Here's the actual financial framework I wish I had...",
        views: 1900000,
        creator: "@solopreneurpath",
        savedAt: subDays(new Date(), 9).toISOString(),
      },
      {
        id: "sp3",
        title: "Digital product passive income",
        hook: "My digital product made $4,200 while I was on vacation — breakdown",
        transcriptExcerpt: "Last month I flew to Portugal for 10 days. Before I left, I made sure my automated sales funnel was set up. Here's the exact numbers...",
        views: 3100000,
        creator: "@solopreneurpath",
        savedAt: subDays(new Date(), 4).toISOString(),
      },
      {
        id: "sp4",
        title: "LinkedIn organic growth",
        hook: "I got 50k LinkedIn followers in 6 months — here's the playbook",
        transcriptExcerpt: "LinkedIn is still the most underrated platform for B2B creators. The algorithm is completely different from TikTok and Instagram...",
        views: 1400000,
        creator: "@solopreneurpath",
        savedAt: subDays(new Date(), 14).toISOString(),
      },
      {
        id: "sp5",
        title: "Email vs social media",
        hook: "Why I'm moving away from social media — and betting on email",
        transcriptExcerpt: "I built 200k followers across platforms and then had my account restricted for 2 weeks. That's when I realized social media is rented land...",
        views: 2700000,
        creator: "@solopreneurpath",
        savedAt: subDays(new Date(), 2).toISOString(),
      },
    ],
  },
  {
    handle: "@techinsider_",
    displayName: "Tech Insider",
    followerCount: 780000,
    niche: "Tech / AI News",
    reels: [
      {
        id: "ti1",
        title: "Nvidia stock explained",
        hook: "Why Nvidia's stock is up 200% — explained in 60 seconds",
        transcriptExcerpt: "Everyone's talking about Nvidia but most people don't actually understand why it's worth so much. It comes down to one thing: GPU scarcity...",
        views: 5600000,
        creator: "@techinsider_",
        savedAt: subDays(new Date(), 1).toISOString(),
      },
      {
        id: "ti2",
        title: "Apple Intelligence breakdown",
        hook: "Apple Intelligence is here — what it actually does vs the hype",
        transcriptExcerpt: "I spent a week with Apple Intelligence and the reality is more nuanced than the marketing. Some features are genuinely useful, others feel half-baked...",
        views: 4300000,
        creator: "@techinsider_",
        savedAt: subDays(new Date(), 4).toISOString(),
      },
      {
        id: "ti3",
        title: "Startup valuations explained",
        hook: "How a company with zero revenue gets valued at $1 billion",
        transcriptExcerpt: "Investors aren't crazy — they're playing a completely different game than you think. Let me explain the math behind startup valuations...",
        views: 3200000,
        creator: "@techinsider_",
        savedAt: subDays(new Date(), 7).toISOString(),
      },
      {
        id: "ti4",
        title: "Tesla Optimus robot update",
        hook: "Tesla's robot just did something that should scare every factory worker",
        transcriptExcerpt: "The latest Optimus video shows the robot doing tasks at human speed, with human dexterity. The implications for manufacturing are massive...",
        views: 6900000,
        creator: "@techinsider_",
        savedAt: subDays(new Date(), 2).toISOString(),
      },
      {
        id: "ti5",
        title: "OpenAI board drama",
        hook: "The OpenAI board drama explained — and what it means for AI",
        transcriptExcerpt: "If you haven't been following what happened at OpenAI you need to understand this. It's not just tech drama — it's a battle over who controls AGI...",
        views: 8200000,
        creator: "@techinsider_",
        savedAt: subDays(new Date(), 0).toISOString(),
      },
    ],
  },
  {
    handle: "@modernmoneymen",
    displayName: "Modern Money Men",
    followerCount: 510000,
    niche: "Personal Finance",
    reels: [
      {
        id: "mr1",
        title: "Index fund strategy",
        hook: "The index fund strategy that beats 90% of hedge funds",
        transcriptExcerpt: "Warren Buffett literally bet $1 million on this and won. Most people know about index funds but don't understand the compounding math...",
        views: 2800000,
        creator: "@modernmoneymen",
        savedAt: subDays(new Date(), 5).toISOString(),
      },
      {
        id: "mr2",
        title: "Credit score hack",
        hook: "I raised my credit score 120 points in 90 days — legal methods only",
        transcriptExcerpt: "A higher credit score means cheaper loans, better rates, and more financial options. Here's the exact steps I took to go from 580 to 710...",
        views: 1700000,
        creator: "@modernmoneymen",
        savedAt: subDays(new Date(), 8).toISOString(),
      },
      {
        id: "mr3",
        title: "Tax write-offs creators miss",
        hook: "8 tax write-offs creators leave on the table every year",
        transcriptExcerpt: "I talked to a CPA who works exclusively with content creators. Most of you are paying 30% more in taxes than you need to because of these 8 things...",
        views: 3500000,
        creator: "@modernmoneymen",
        savedAt: subDays(new Date(), 3).toISOString(),
      },
      {
        id: "mr4",
        title: "HYSA vs investing",
        hook: "HYSA vs investing right now — the honest answer depends on this",
        transcriptExcerpt: "Everyone keeps asking me whether to put money in a high-yield savings account or invest it. The answer isn't one-size-fits-all...",
        views: 1300000,
        creator: "@modernmoneymen",
        savedAt: subDays(new Date(), 11).toISOString(),
      },
      {
        id: "mr5",
        title: "Side hustle taxes",
        hook: "Side hustle income over $600? Watch this before tax season",
        transcriptExcerpt: "A lot of people are shocked when they get their first 1099. The IRS treats side hustle income very differently from W-2 income...",
        views: 2100000,
        creator: "@modernmoneymen",
        savedAt: subDays(new Date(), 6).toISOString(),
      },
    ],
  },
  {
    handle: "@productivitywithpat",
    displayName: "Productivity with Pat",
    followerCount: 450000,
    niche: "Productivity",
    reels: [
      {
        id: "pp1",
        title: "Second brain setup",
        hook: "My second brain setup — how I never forget anything important",
        transcriptExcerpt: "I've been building my second brain for two years and it's single-handedly changed how I work. The core system uses three connected tools...",
        views: 2000000,
        creator: "@productivitywithpat",
        savedAt: subDays(new Date(), 5).toISOString(),
      },
      {
        id: "pp2",
        title: "Notion vs Obsidian",
        hook: "Notion vs Obsidian in 2024 — I tried both for 6 months (verdict)",
        transcriptExcerpt: "I spent six months bouncing between these two apps and the answer surprised me. For most people, it comes down to one fundamental question...",
        views: 1500000,
        creator: "@productivitywithpat",
        savedAt: subDays(new Date(), 8).toISOString(),
      },
      {
        id: "pp3",
        title: "Deep work schedule",
        hook: "The deep work schedule that made me 4x more productive",
        transcriptExcerpt: "Cal Newport's deep work concept changed my life. But the way most people implement it is completely wrong. Here's what actually works...",
        views: 2900000,
        creator: "@productivitywithpat",
        savedAt: subDays(new Date(), 2).toISOString(),
      },
      {
        id: "pp4",
        title: "Email zero system",
        hook: "How I get to inbox zero every day in 20 minutes",
        transcriptExcerpt: "I used to spend 3 hours a day in email. Now it's 20 minutes and my inbox is empty. The system is embarrassingly simple once you know it...",
        views: 1100000,
        creator: "@productivitywithpat",
        savedAt: subDays(new Date(), 14).toISOString(),
      },
      {
        id: "pp5",
        title: "AI note-taking",
        hook: "I stopped taking manual notes — AI does it better (here's how)",
        transcriptExcerpt: "For the past 3 months I've been using AI to take notes for me in meetings, podcasts, and while reading books. Here's my complete system...",
        views: 3400000,
        creator: "@productivitywithpat",
        savedAt: subDays(new Date(), 1).toISOString(),
      },
    ],
  },
  {
    handle: "@fitnessfacts_",
    displayName: "Fitness Facts",
    followerCount: 220000,
    niche: "Fitness / Health",
    reels: [
      {
        id: "ff1",
        title: "Protein timing myth",
        hook: "The protein timing myth that's wasting your supplement money",
        transcriptExcerpt: "You've been told you need to drink your protein shake within 30 minutes of your workout. That window is mostly a myth, and here's the actual science...",
        views: 890000,
        creator: "@fitnessfacts_",
        savedAt: subDays(new Date(), 7).toISOString(),
      },
      {
        id: "ff2",
        title: "Walking for fat loss",
        hook: "Why walking beats running for fat loss — the science explained",
        transcriptExcerpt: "I know this sounds crazy. Running burns more calories, right? But when you factor in cortisol, appetite hormones, and sustainability, walking wins...",
        views: 1200000,
        creator: "@fitnessfacts_",
        savedAt: subDays(new Date(), 4).toISOString(),
      },
      {
        id: "ff3",
        title: "5 minute morning workout",
        hook: "5-minute morning workout that actually works (no equipment)",
        transcriptExcerpt: "I designed this specifically for people who say they have no time. Five minutes, no equipment, and it actually builds the habit you need...",
        views: 760000,
        creator: "@fitnessfacts_",
        savedAt: subDays(new Date(), 10).toISOString(),
      },
      {
        id: "ff4",
        title: "Sleep and muscle growth",
        hook: "You're destroying your muscle gains by doing this one thing at night",
        transcriptExcerpt: "Most people focus on their workouts and nutrition. But the number one factor in muscle growth is actually sleep quality and here's what's killing yours...",
        views: 1800000,
        creator: "@fitnessfacts_",
        savedAt: subDays(new Date(), 3).toISOString(),
      },
      {
        id: "ff5",
        title: "Creatine guide",
        hook: "The complete creatine guide — everything they got wrong",
        transcriptExcerpt: "Creatine is the most researched supplement in sports science. But 80% of what you've heard about it is either wrong or misleading...",
        views: 980000,
        creator: "@fitnessfacts_",
        savedAt: subDays(new Date(), 6).toISOString(),
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
    hook: "ChatGPT just killed Google Search — here's proof",
    caption: "The AI search revolution is here. Are you adapting or getting left behind? Drop a 🤖 if you've already switched.\n\nFollow for daily AI updates. #ChatGPT #AItools #FutureOfSearch",
    status: "posted",
  },
  {
    id: "sp2",
    date: format(addDays(currentMonthStart, 1), "yyyy-MM-dd"),
    time: "18:00",
    platform: "Instagram",
    hook: "3 AI tools that pay me every single month",
    caption: "These tools literally generate income. I'll break down the exact ROI in the carousel. Save this before it gets buried. 💰\n\n#AItools #PassiveIncome #CreatorEconomy",
    status: "posted",
  },
  {
    id: "sp3",
    date: format(addDays(currentMonthStart, 3), "yyyy-MM-dd"),
    time: "12:00",
    platform: "YouTube",
    hook: "The complete AI content stack for 2024 (full walkthrough)",
    caption: "I've been building and testing this system for 6 months. This is the complete walkthrough of every tool, workflow, and automation I use. Subscribe and hit the bell.\n\n#AI #ContentCreation #Automation",
    status: "posted",
  },
  {
    id: "sp4",
    date: format(addDays(currentMonthStart, 5), "yyyy-MM-dd"),
    time: "09:30",
    platform: "TikTok",
    hook: "Stop using Canva — 3 AI tools that do it better for free",
    caption: "I said what I said. These tools are free and produce better results. Follow for more AI hacks. #Canva #AIDesign #ContentCreator",
    status: "posted",
  },
  {
    id: "sp5",
    date: format(addDays(currentMonthStart, 7), "yyyy-MM-dd"),
    time: "17:00",
    platform: "Instagram",
    hook: "I gave Claude my entire content strategy — the output was insane",
    caption: "Honestly didn't expect this level of quality. Save this post, I'm going to share the exact prompt I used in my next video. 🔥\n\n#Claude #AIContent #ContentStrategy",
    status: "posted",
  },
  {
    id: "sp6",
    date: format(addDays(currentMonthStart, 9), "yyyy-MM-dd"),
    time: "10:00",
    platform: "TikTok",
    hook: "7 ways to make money with AI right now",
    caption: "The window won't be open forever. These are the highest ROI AI opportunities available right now in 2024. Follow for more. #MakeMoneyOnline #AIBusiness",
    status: "posted",
  },
  {
    id: "sp7",
    date: format(addDays(currentMonthStart, 11), "yyyy-MM-dd"),
    time: "09:00",
    platform: "TikTok",
    hook: "The AI tool that replaced my $3k/month VA",
    caption: "This is the one. I felt guilty at first but the efficiency gains are too real. Here's how I set it up. #AIAutomation #VirtualAssistant #Solopreneur",
    status: "posted",
  },
  {
    id: "sp8",
    date: format(addDays(currentMonthStart, 13), "yyyy-MM-dd"),
    time: "18:00",
    platform: "Instagram",
    hook: "How I batch 30 days of content in one afternoon",
    caption: "Sunday afternoon is content day. With this AI system, I'm done in under 3 hours. Full system in the comments. 📅\n\n#ContentBatching #CreatorTips #AIWorkflow",
    status: "scheduled",
  },
  {
    id: "sp9",
    date: format(addDays(currentMonthStart, 14), "yyyy-MM-dd"),
    time: "09:00",
    platform: "TikTok",
    hook: "OpenAI just announced something and nobody's talking about it",
    caption: "This update changes how you should be using ChatGPT. Watch to the end. Like if this was useful. #OpenAI #ChatGPT #AINews",
    status: "scheduled",
  },
  {
    id: "sp10",
    date: format(addDays(currentMonthStart, 16), "yyyy-MM-dd"),
    time: "12:00",
    platform: "YouTube",
    hook: "AI side hustles that made me $12k in 60 days — honest breakdown",
    caption: "Raw numbers, real results, no fluff. This is everything I made and spent using AI-powered side hustles over 60 days. Drop questions in the comments.\n\n#SideHustle #AI #MakeMoneyOnline",
    status: "scheduled",
  },
  {
    id: "sp11",
    date: format(addDays(currentMonthStart, 18), "yyyy-MM-dd"),
    time: "09:30",
    platform: "TikTok",
    hook: "This free AI tool is better than Midjourney",
    caption: "I know. I was shocked too. Here's the side-by-side comparison. Save this for later. #ImageAI #Midjourney #FreeAItools",
    status: "scheduled",
  },
  {
    id: "sp12",
    date: format(addDays(currentMonthStart, 20), "yyyy-MM-dd"),
    time: "17:30",
    platform: "Instagram",
    hook: "5 AI prompts every business owner needs",
    caption: "Print these out. Screenshot this. I use these prompts literally every single day and they save me hours. Follow for weekly AI prompts. 💡\n\n#AIPrompts #BusinessOwner #Productivity",
    status: "scheduled",
  },
  {
    id: "sp13",
    date: format(addDays(currentMonthStart, 22), "yyyy-MM-dd"),
    time: "09:00",
    platform: "TikTok",
    hook: "How AI made my first $1,000 in 7 days",
    caption: "I'm documenting everything. This is day 7 of the AI income challenge. Real money, real proof. Follow the journey. #AIChallenge #Entrepreneurship",
    status: "draft",
  },
  {
    id: "sp14",
    date: format(addDays(currentMonthStart, 25), "yyyy-MM-dd"),
    time: "10:00",
    platform: "TikTok",
    hook: "The AI writing tool that sounds exactly like you",
    caption: "Brand voice locked in? This tool maintains it perfectly across every piece of content. Game changer for content creators. #AIWriting #ContentCreation",
    status: "draft",
  },
  {
    id: "sp15",
    date: format(addDays(currentMonthStart, 28), "yyyy-MM-dd"),
    time: "09:00",
    platform: "YouTube",
    hook: "My complete AI toolkit 2024 — everything I actually use",
    caption: "End of month review. Every tool, every price, every use case. Honest ratings on what stayed and what got cut. Subscribe if you want the monthly round-up.\n\n#AItools #CreatorTech #MonthlyReview",
    status: "draft",
  },
];

// ─── Trending Items ───────────────────────────────────────────────────────────

export const trendingItems: TrendingItem[] = [
  {
    id: "t1",
    title: "Anthropic Releases Claude 3.5 Sonnet with Computer Use Capability",
    source: "Anthropic Blog",
    url: "https://anthropic.com/blog",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Claude can now control your computer — browsing the web, writing code, and taking actions autonomously. This marks a major shift in AI capability from chat assistant to agent.",
    publishedAt: subHours(new Date(), 3).toISOString(),
  },
  {
    id: "t2",
    title: "OpenAI Launches o3 Model with Record-Breaking Reasoning Scores",
    source: "OpenAI Blog",
    url: "https://openai.com/blog",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "The o3 model achieved 87.5% on ARC-AGI benchmark, a major test of general intelligence. Researchers say this is the closest AI has come to human-level abstract reasoning.",
    publishedAt: subHours(new Date(), 5).toISOString(),
  },
  {
    id: "t3",
    title: "Google DeepMind's AlphaFold 3 Predicts All Molecular Interactions",
    source: "MIT Tech Review",
    url: "https://technologyreview.com",
    hookPotential: "medium",
    tag: "explainer",
    summary: "AlphaFold 3 can now predict how proteins interact with DNA, RNA, and small molecules — potentially accelerating drug discovery by decades. Nobel committee is paying attention.",
    publishedAt: subHours(new Date(), 8).toISOString(),
  },
  {
    id: "t4",
    title: "Show HN: I built an AI that writes TikTok scripts in your voice",
    source: "HN",
    url: "https://news.ycombinator.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "A solo developer trained a fine-tuned model on creator transcripts to mimic individual voice and style. The demo shows eerily accurate results after 20 sample videos.",
    publishedAt: subHours(new Date(), 12).toISOString(),
  },
  {
    id: "t5",
    title: "The Creator Economy Hits $500 Billion — Where the Money Actually Goes",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "A new Goldman Sachs report breaks down the $500B creator economy. Surprisingly, 90% of revenue goes to the top 1% of creators. The middle class creator is barely surviving.",
    publishedAt: subMinutes(new Date(), 45).toISOString(),
  },
  {
    id: "t6",
    title: "Meta's New AI Video Generation Model Beats Sora on Realism",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Meta quietly released a video generation model that multiple researchers say outperforms OpenAI's Sora in temporal consistency and realism. Open source and free to use.",
    publishedAt: subHours(new Date(), 1).toISOString(),
  },
  {
    id: "t7",
    title: "The Real Reason AI Chatbots Confidently Make Things Up",
    source: "MIT Tech Review",
    url: "https://technologyreview.com",
    hookPotential: "medium",
    tag: "explainer",
    summary: "A deep explainer on hallucination — why LLMs generate false information with high confidence, and why the current architecture makes this nearly impossible to fully fix.",
    publishedAt: subHours(new Date(), 20).toISOString(),
  },
  {
    id: "t8",
    title: "Sam Altman: AGI Will Arrive Before 2026",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "In a tweet that broke the internet, Sam Altman said he believes AGI — broadly human-level AI — will be achieved within the next 18 months. The tech community is divided.",
    publishedAt: subMinutes(new Date(), 20).toISOString(),
  },
  {
    id: "t9",
    title: "New Research Shows AI-Generated Content Now 40% of the Web",
    source: "Anthropic Blog",
    url: "https://anthropic.com/research",
    hookPotential: "medium",
    tag: "explainer",
    summary: "A study analyzing 10 million web pages found that AI-assisted content has grown from 2% to 40% in under 18 months. Quality varies wildly and search engines are struggling to filter it.",
    publishedAt: subHours(new Date(), 14).toISOString(),
  },
  {
    id: "t10",
    title: "Runway ML Announces Real-Time Video Generation on Consumer GPUs",
    source: "HN",
    url: "https://news.ycombinator.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Runway's latest model can generate video in real-time on an RTX 4090. This removes the cloud dependency and dramatically reduces costs for AI video creators.",
    publishedAt: subHours(new Date(), 6).toISOString(),
  },
  {
    id: "t11",
    title: "How to Use Perplexity AI for Deep Research: A Practical Guide",
    source: "Anthropic Blog",
    url: "https://anthropic.com/guides",
    hookPotential: "medium",
    tag: "explainer",
    summary: "A step-by-step guide to using Perplexity's research features, including how to chain queries, use focused modes, and export findings — aimed at knowledge workers.",
    publishedAt: subHours(new Date(), 22).toISOString(),
  },
  {
    id: "t12",
    title: "The AI Coding Assistant That Got Me Fired (And Why I Don't Regret It)",
    source: "HN",
    url: "https://news.ycombinator.com",
    hookPotential: "skip",
    tag: "skip",
    summary: "A developer shares their story of using AI tools so effectively that management felt threatened, leading to termination. The post is polarizing the developer community.",
    publishedAt: subHours(new Date(), 30).toISOString(),
  },
  {
    id: "t13",
    title: "Nvidia CEO Jensen Huang: 'Physical AI Is the Next Frontier'",
    source: "MIT Tech Review",
    url: "https://technologyreview.com",
    hookPotential: "medium",
    tag: "explainer",
    summary: "In a keynote address, Jensen Huang outlined Nvidia's vision for physical AI — robots and autonomous systems that understand and navigate the real world using foundation models.",
    publishedAt: subHours(new Date(), 10).toISOString(),
  },
  {
    id: "t14",
    title: "TikTok Introduces AI-Generated Video Feed — Users Can't Tell the Difference",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "TikTok is quietly testing an AI-generated content feed alongside human creator content. Early users report they often cannot identify which videos were AI-made.",
    publishedAt: subHours(new Date(), 4).toISOString(),
  },
  {
    id: "t15",
    title: "Understanding Attention Mechanisms in Transformers",
    source: "MIT Tech Review",
    url: "https://technologyreview.com",
    hookPotential: "skip",
    tag: "skip",
    summary: "A technical deep-dive into how transformer attention mechanisms work mathematically, intended for ML engineers looking to understand model architecture from first principles.",
    publishedAt: subHours(new Date(), 48).toISOString(),
  },
  {
    id: "t16",
    title: "AI Is Replacing Customer Service Workers Faster Than Expected",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "Klarna's AI assistant now does the work of 700 customer service agents. A new report shows the replacement rate is 3x faster than economists predicted even 12 months ago.",
    publishedAt: subHours(new Date(), 7).toISOString(),
  },
  {
    id: "t17",
    title: "Google Gemini 2.0: What's New and How It Compares to GPT-4o",
    source: "OpenAI Blog",
    url: "https://openai.com/research",
    hookPotential: "medium",
    tag: "explainer",
    summary: "Side-by-side comparison of Google's Gemini 2.0 against OpenAI's GPT-4o across coding, reasoning, math, and creative tasks — with benchmark scores and real-world examples.",
    publishedAt: subHours(new Date(), 16).toISOString(),
  },
  {
    id: "t18",
    title: "Mistral AI Releases Open-Source Model Matching GPT-4 Performance",
    source: "HN",
    url: "https://news.ycombinator.com",
    hookPotential: "medium",
    tag: "explainer",
    summary: "French AI startup Mistral released a new open-weights model that performs comparably to GPT-4 on most benchmarks — and it can run locally on consumer hardware.",
    publishedAt: subHours(new Date(), 18).toISOString(),
  },
  {
    id: "t19",
    title: "The Creator Burnout Epidemic: Why 60% of Full-Time Creators Want to Quit",
    source: "X Lists",
    url: "https://twitter.com",
    hookPotential: "high",
    tag: "hook-potential",
    summary: "A viral survey of 2,000 full-time content creators found that 60% are considering quitting within the next year due to algorithm pressure, inconsistent income, and mental health struggles.",
    publishedAt: subHours(new Date(), 9).toISOString(),
  },
  {
    id: "t20",
    title: "History of Neural Networks: From Perceptrons to GPT-4",
    source: "MIT Tech Review",
    url: "https://technologyreview.com",
    hookPotential: "skip",
    tag: "skip",
    summary: "A comprehensive historical overview of neural network development over 70 years, from Rosenblatt's perceptron to modern large language models, intended for students and historians.",
    publishedAt: subHours(new Date(), 72).toISOString(),
  },
];

// ─── Heaters ──────────────────────────────────────────────────────────────────

export const heaters: HeaterPost[] = [
  {
    id: "heat1",
    hook: "AI replaced 3 of my freelancers — here's what happened",
    platform: "TikTok",
    views: 5100000,
    medianMultiple: 8.4,
    note: "Emotional contrast hook + personal confession drives 8.4x above median. 'Here's what happened' creates irresistible curiosity gap.",
    postedAt: subDays(new Date(), 3).toISOString(),
  },
  {
    id: "heat2",
    hook: "3 AI tools that run my entire business while I sleep",
    platform: "TikTok",
    views: 3700000,
    medianMultiple: 6.1,
    note: "Number hook + 'while I sleep' aspirational outcome. The phrase 'entire business' signals high value. Posted at 9am on Tuesday for peak reach.",
    postedAt: subDays(new Date(), 8).toISOString(),
  },
  {
    id: "heat3",
    hook: "7 things your financial advisor never told you",
    platform: "Instagram",
    views: 3400000,
    medianMultiple: 5.6,
    note: "Authority challenge hook triggers distrust of institutions. Number 7 is psychologically resonant. Finance niche has high save rate boosting distribution.",
    postedAt: subDays(new Date(), 12).toISOString(),
  },
  {
    id: "heat4",
    hook: "ChatGPT just killed Google Search",
    platform: "TikTok",
    views: 4200000,
    medianMultiple: 6.9,
    note: "The word 'killed' is algorithmically charged. Both ChatGPT and Google are high-search keywords boosting SEO. Posted during the GPT update news cycle.",
    postedAt: subDays(new Date(), 18).toISOString(),
  },
  {
    id: "heat5",
    hook: "I gave AI my $50k debt problem — the answer was insane",
    platform: "YouTube",
    views: 4800000,
    medianMultiple: 7.9,
    note: "Specific dollar amount creates credibility. 'Insane' as reaction drives curiosity. Personal finance + AI combo has 2x the audience overlap of either alone.",
    postedAt: subDays(new Date(), 22).toISOString(),
  },
];
