/**
 * Apify integration for @theaihustle7 creator dashboard.
 *
 * Actors used:
 *   TikTok scraper  — clockworks/tiktok-scraper
 *   RSS reader      — apify/rss-reader
 *
 * Set APIFY_API_TOKEN in .env.local to activate live data.
 * Falls back to mock data when the token is missing.
 */

const APIFY_TOKEN = process.env.APIFY_API_TOKEN;
const APIFY_BASE = "https://api.apify.com/v2";

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function runActor(actorId: string, input: Record<string, unknown>) {
  if (!APIFY_TOKEN) throw new Error("APIFY_API_TOKEN not set");

  // Start the run
  const runRes = await fetch(
    `${APIFY_BASE}/acts/${actorId}/runs?token=${APIFY_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }
  );
  if (!runRes.ok) throw new Error(`Apify actor start failed: ${runRes.status}`);
  const { data: run } = await runRes.json();

  // Poll until finished (max 3 minutes)
  const runId = run.id;
  for (let i = 0; i < 36; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const statusRes = await fetch(
      `${APIFY_BASE}/actor-runs/${runId}?token=${APIFY_TOKEN}`
    );
    const { data: status } = await statusRes.json();
    if (status.status === "SUCCEEDED") break;
    if (status.status === "FAILED" || status.status === "ABORTED") {
      throw new Error(`Apify run ${status.status}`);
    }
  }

  // Fetch dataset items
  const datasetRes = await fetch(
    `${APIFY_BASE}/actor-runs/${runId}/dataset/items?token=${APIFY_TOKEN}&clean=true`
  );
  if (!datasetRes.ok) throw new Error("Failed to fetch Apify dataset");
  return datasetRes.json() as Promise<unknown[]>;
}

// ─── TikTok profile scrape (@theaihustle7) ───────────────────────────────────

export interface TikTokVideo {
  id: string;
  text: string;
  playCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  saveCount: number;
  createTime: number;
  webVideoUrl: string;
  coverUrl: string;
  authorMeta: {
    name: string;
    fans: number;
  };
}

/**
 * Scrape the latest videos from @theaihustle7.
 * Returns up to `limit` videos sorted by play count descending.
 */
export async function scrapeOwnProfile(limit = 30): Promise<TikTokVideo[]> {
  const raw = await runActor("clockworks/tiktok-scraper", {
    profiles: ["theaihustle7"],
    resultsPerPage: limit,
    scrapeType: "user",
    shouldDownloadVideos: false,
    shouldDownloadCovers: false,
  });

  return (raw as TikTokVideo[]).sort((a, b) => b.playCount - a.playCount);
}

// ─── Competitor reel scrape ───────────────────────────────────────────────────

export interface CompetitorVideo extends TikTokVideo {
  hook: string;
  transcriptExcerpt: string;
}

const COMPETITOR_HANDLES = [
  "mreflow",
  "howtoai",
  "levelsio",
  "gregisenberg",
  "fireship",
  "vibecodewithtom",
  "buildwithAIdan",
  "aiappbuilder",
];

/**
 * Scrape the top 5 reels from each of the 8 tracked competitor accounts.
 * Called every Sunday at 8am via Vercel Cron or Apify scheduled run.
 */
export async function scrapeCompetitorReels(
  handles: string[] = COMPETITOR_HANDLES,
  reelsPerAccount = 5
): Promise<Record<string, CompetitorVideo[]>> {
  const raw = await runActor("clockworks/tiktok-scraper", {
    profiles: handles,
    resultsPerPage: reelsPerAccount * 2,
    scrapeType: "user",
    shouldDownloadVideos: false,
    shouldDownloadCovers: false,
  });

  const grouped: Record<string, CompetitorVideo[]> = {};
  for (const item of raw as TikTokVideo[]) {
    const handle = item.authorMeta?.name ?? "unknown";
    if (!grouped[handle]) grouped[handle] = [];
    grouped[handle].push({
      ...item,
      hook: item.text.split(".")[0].split("!")[0].split("?")[0].trim(),
      transcriptExcerpt:
        item.text.slice(0, 180) + (item.text.length > 180 ? "…" : ""),
    });
  }

  for (const handle of Object.keys(grouped)) {
    grouped[handle] = grouped[handle]
      .sort((a, b) => b.playCount - a.playCount)
      .slice(0, reelsPerAccount);
  }

  return grouped;
}

// ─── RSS feed ingestion (What's Trending) ────────────────────────────────────

export interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  source: string;
}

const RSS_FEEDS = [
  { url: "https://www.anthropic.com/rss.xml",          source: "Anthropic Blog" },
  { url: "https://openai.com/blog/rss.xml",            source: "OpenAI Blog" },
  { url: "https://www.technologyreview.com/feed/",     source: "MIT Tech Review" },
  { url: "https://hnrss.org/frontpage",                source: "Hacker News" },
  { url: "https://www.deeplearning.ai/the-batch/feed/",source: "The Batch" },
  { url: "https://simonwillison.net/atom/everything/", source: "Simon Willison" },
  { url: "https://bensbites.beehiiv.com/feed",         source: "Ben's Bites" },
  { url: "https://www.lennysnewsletter.com/feed",      source: "Lenny's Newsletter" },
  { url: "https://www.producthunt.com/feed",           source: "Product Hunt" },
];

/**
 * Pull recent posts from all 9 RSS sources.
 * Returns items sorted by publication date descending.
 */
export async function scrapeRSSFeeds(
  feeds: { url: string; source: string }[] = RSS_FEEDS
): Promise<RSSItem[]> {
  const raw = await runActor("apify/rss-reader", {
    urls: feeds.map((f) => f.url),
    maxItems: 20,
    dateFrom: new Date(Date.now() - 86400000 * 3).toISOString(),
  });

  return (raw as Array<Record<string, string>>)
    .map((item) => {
      const matched = feeds.find((f) => {
        try {
          return item.url?.includes(new URL(f.url).hostname);
        } catch {
          return false;
        }
      });
      return {
        title: item.title ?? "",
        link: item.link ?? item.url ?? "",
        pubDate: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
        description: item.contentSnippet ?? item.description ?? "",
        source: matched?.source ?? "RSS",
      };
    })
    .sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );
}

// ─── Analytics helper ─────────────────────────────────────────────────────────

/**
 * Compute analytics from a profile scrape — totals + heater detection (2x median).
 */
export function computeAnalytics(videos: TikTokVideo[], days: 7 | 30 | 90) {
  const cutoff = Date.now() / 1000 - days * 86400;
  const filtered = videos.filter((v) => v.createTime >= cutoff);

  const totalViews    = filtered.reduce((s, v) => s + v.playCount, 0);
  const totalSaves    = filtered.reduce((s, v) => s + (v.saveCount ?? 0), 0);
  const totalLikes    = filtered.reduce((s, v) => s + v.likeCount, 0);
  const totalComments = filtered.reduce((s, v) => s + v.commentCount, 0);
  const medianViews   = median(filtered.map((v) => v.playCount));
  const heaters       = filtered
    .filter((v) => v.playCount >= medianViews * 2)
    .sort((a, b) => b.playCount - a.playCount);

  return { totalViews, totalSaves, totalLikes, totalComments, medianViews, heaters };
}

function median(nums: number[]): number {
  if (!nums.length) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
