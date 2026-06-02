/**
 * Apify Integration Stubs
 *
 * This file documents all Apify actor integrations used by this dashboard.
 * Currently returns mock data — replace with real Apify API calls when ready.
 *
 * Setup:
 *   1. Create an account at https://apify.com
 *   2. Get your API token from https://console.apify.com/account/integrations
 *   3. Add APIFY_API_TOKEN to your .env.local
 *   4. Install: npm install apify-client
 *
 * Actor Reference:
 *   - TikTok Scraper: https://apify.com/clockworks/tiktok-scraper
 *   - RSS Reader: https://apify.com/apify/rss-reader
 */

import { competitors, trendingItems, type Competitor, type TrendingItem } from "./mock-data";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApifyRunOptions {
  timeout?: number; // seconds
  memoryMbytes?: number;
}

export interface TikTokProfileResult {
  username: string;
  displayName: string;
  followerCount: number;
  followingCount: number;
  heartCount: number;
  videoCount: number;
  verified: boolean;
  bio: string;
  avatarUrl: string;
}

export interface TikTokReelResult {
  id: string;
  url: string;
  description: string;
  playCount: number;
  diggCount: number;
  commentCount: number;
  shareCount: number;
  collectCount: number;
  createTime: number;
  authorUsername: string;
  videoUrl?: string;
  transcript?: string;
}

export interface RSSFeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
}

// ─── Competitor Reels Scraper ─────────────────────────────────────────────────

/**
 * Scrape the top reels from a list of TikTok handles.
 *
 * Actor: clockworks/tiktok-scraper
 * URL: https://apify.com/clockworks/tiktok-scraper
 *
 * Actor Input Schema:
 * {
 *   "profiles": ["handle1", "handle2"],
 *   "resultsPerPage": 10,
 *   "maxProfilesPerQuery": 1,
 *   "shouldDownloadVideos": false,
 *   "shouldDownloadCovers": false,
 *   "shouldDownloadSubtitles": true,
 *   "shouldDownloadSlideshowImages": false
 * }
 *
 * Live implementation:
 * ```ts
 * import { ApifyClient } from "apify-client";
 * const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN });
 * const run = await client.actor("clockworks/tiktok-scraper").call({
 *   profiles: handles,
 *   resultsPerPage: 10,
 *   shouldDownloadSubtitles: true,
 * });
 * const { items } = await client.dataset(run.defaultDatasetId).listItems();
 * return items as TikTokReelResult[];
 * ```
 */
export async function scrapeCompetitorReels(
  handles: string[],
  _options: ApifyRunOptions = {}
): Promise<TikTokReelResult[]> {
  console.log(`[Apify stub] scrapeCompetitorReels called for handles: ${handles.join(", ")}`);

  // Return mock data shaped to TikTokReelResult
  const mockResults: TikTokReelResult[] = [];
  for (const competitor of competitors) {
    if (handles.some(h => h.replace("@", "") === competitor.handle.replace("@", ""))) {
      for (const reel of competitor.reels) {
        mockResults.push({
          id: reel.id,
          url: `https://tiktok.com/${competitor.handle}/video/${reel.id}`,
          description: reel.hook,
          playCount: reel.views,
          diggCount: Math.round(reel.views * 0.08),
          commentCount: Math.round(reel.views * 0.005),
          shareCount: Math.round(reel.views * 0.02),
          collectCount: Math.round(reel.views * 0.03),
          createTime: new Date(reel.savedAt).getTime() / 1000,
          authorUsername: competitor.handle.replace("@", ""),
          transcript: reel.transcriptExcerpt,
        });
      }
    }
  }
  return mockResults;
}

// ─── TikTok Profile Scraper ───────────────────────────────────────────────────

/**
 * Scrape a TikTok creator's profile stats.
 *
 * Actor: clockworks/tiktok-scraper
 * URL: https://apify.com/clockworks/tiktok-scraper
 *
 * Actor Input Schema:
 * {
 *   "profiles": ["handle"],
 *   "profileScrapingMode": "user-info"
 * }
 *
 * Live implementation:
 * ```ts
 * import { ApifyClient } from "apify-client";
 * const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN });
 * const run = await client.actor("clockworks/tiktok-scraper").call({
 *   profiles: [handle],
 *   profileScrapingMode: "user-info",
 * });
 * const { items } = await client.dataset(run.defaultDatasetId).listItems();
 * return items[0] as TikTokProfileResult;
 * ```
 */
export async function scrapeTikTokProfile(
  handle: string,
  _options: ApifyRunOptions = {}
): Promise<TikTokProfileResult | null> {
  console.log(`[Apify stub] scrapeTikTokProfile called for handle: ${handle}`);

  const competitor = competitors.find(
    c => c.handle.replace("@", "") === handle.replace("@", "")
  );

  if (!competitor) {
    return {
      username: handle.replace("@", ""),
      displayName: handle,
      followerCount: 0,
      followingCount: 0,
      heartCount: 0,
      videoCount: 0,
      verified: false,
      bio: "",
      avatarUrl: "",
    };
  }

  return {
    username: competitor.handle.replace("@", ""),
    displayName: competitor.displayName,
    followerCount: competitor.followerCount,
    followingCount: Math.round(competitor.followerCount * 0.001),
    heartCount: competitor.reels.reduce((sum, r) => sum + r.views * 0.08, 0),
    videoCount: competitor.reels.length * 10,
    verified: competitor.followerCount > 500000,
    bio: `${competitor.niche} content. Creator & educator.`,
    avatarUrl: "",
  };
}

// ─── RSS Feed Scraper ─────────────────────────────────────────────────────────

/**
 * Scrape multiple RSS feeds for trending content.
 *
 * Actor: apify/rss-reader
 * URL: https://apify.com/apify/rss-reader
 *
 * Actor Input Schema:
 * {
 *   "urls": [
 *     "https://anthropic.com/rss.xml",
 *     "https://openai.com/blog/rss.xml",
 *     "https://news.ycombinator.com/rss",
 *     "https://feeds.feedburner.com/TechCrunch",
 *     "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml"
 *   ],
 *   "maxItems": 50,
 *   "dateFrom": "2024-01-01"
 * }
 *
 * Configured RSS sources for @tenfoldmarc:
 *   - Anthropic Blog: https://anthropic.com/rss.xml
 *   - OpenAI Blog: https://openai.com/blog/rss.xml
 *   - Hacker News: https://news.ycombinator.com/rss
 *   - MIT Tech Review: https://www.technologyreview.com/feed/
 *   - The Verge AI: https://www.theverge.com/rss/ai-artificial-intelligence/index.xml
 *   - VentureBeat AI: https://feeds.feedburner.com/venturebeat/SZYF
 *
 * Live implementation:
 * ```ts
 * import { ApifyClient } from "apify-client";
 * const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN });
 * const run = await client.actor("apify/rss-reader").call({
 *   urls,
 *   maxItems: 50,
 * });
 * const { items } = await client.dataset(run.defaultDatasetId).listItems();
 * return items as RSSFeedItem[];
 * ```
 */
export async function scrapeRSSFeeds(
  urls: string[],
  _options: ApifyRunOptions = {}
): Promise<RSSFeedItem[]> {
  console.log(`[Apify stub] scrapeRSSFeeds called for ${urls.length} URLs`);

  // Return mock trending data shaped as RSS items
  return trendingItems.map((item): RSSFeedItem => ({
    title: item.title,
    link: item.url,
    description: item.summary,
    pubDate: item.publishedAt,
    source: item.source,
  }));
}

// ─── Scheduled Scrape Runner ──────────────────────────────────────────────────

/**
 * Run all scraping jobs on schedule (called by a cron job or Vercel cron).
 *
 * Recommended schedule: Every Sunday at 8:00 AM UTC
 *   Vercel cron: "0 8 * * 0" in vercel.json
 *
 * ```json
 * {
 *   "crons": [{
 *     "path": "/api/scrape",
 *     "schedule": "0 8 * * 0"
 *   }]
 * }
 * ```
 */
export async function runScheduledScrape(): Promise<{
  competitors: TikTokReelResult[];
  profile: TikTokProfileResult | null;
  trending: RSSFeedItem[];
}> {
  const handles = competitors.map(c => c.handle);

  const [competitorReels, profile, trending] = await Promise.all([
    scrapeCompetitorReels(handles),
    scrapeTikTokProfile("theaihustle7"),
    scrapeRSSFeeds([
      "https://anthropic.com/rss.xml",
      "https://openai.com/blog/rss.xml",
      "https://news.ycombinator.com/rss",
      "https://www.technologyreview.com/feed/",
    ]),
  ]);

  return { competitors: competitorReels, profile, trending };
}

// ─── Hook Extraction Helper ───────────────────────────────────────────────────

/**
 * Extract the hook (first sentence/line) from a TikTok video description.
 * In production, use the transcript for better accuracy.
 */
export function extractHookFromReel(reel: TikTokReelResult): string {
  const desc = reel.description || "";
  // Take first sentence or first 100 chars
  const firstSentence = desc.split(/[.!?]/)[0];
  if (firstSentence && firstSentence.length > 10) return firstSentence.trim();
  return desc.slice(0, 100).trim();
}

/**
 * Templatize a hook by replacing specific nouns/numbers with placeholders.
 * Basic heuristic — in production, use Claude API for better extraction.
 *
 * Example:
 *   "5 ChatGPT prompts that pay better than your job"
 *   → "[NUMBER] [TOOL] prompts that [OUTCOME BETTER THAN STATUS QUO]"
 */
export function templatizeHook(hook: string): string {
  return hook
    .replace(/\b\d+\b/g, "[NUMBER]")
    .replace(/\b(ChatGPT|Claude|Gemini|Perplexity|Midjourney|Canva|Notion|Slack)\b/gi, "[TOOL]")
    .replace(/\b\$[\d,]+k?\/?(month|year|week|day)?\b/gi, "[DOLLAR AMOUNT]")
    .replace(/\b(Google|Apple|Microsoft|OpenAI|Anthropic|Meta|Tesla|Nvidia)\b/gi, "[COMPANY]");
}
