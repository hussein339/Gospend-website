"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { TrendingUp, TrendingDown, Eye, Bookmark, Users, MessageCircle, Flame, RefreshCw } from "lucide-react";
import { analyticsData, heaters, type Platform, type AnalyticsDayData, type HeaterPost } from "@/lib/mock-data";
import { Sparkline } from "@/components/sparkline";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import type { TikTokVideo } from "@/lib/apify";

type TimeRange = "7D" | "30D" | "90D";

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

const platformBadge: Record<Platform, Parameters<typeof Badge>[0]["variant"]> = {
  TikTok: "orange",
  Instagram: "purple",
  YouTube: "destructive",
};

function median(nums: number[]): number {
  if (!nums.length) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function videosToAnalyticsData(videos: TikTokVideo[], days: number): AnalyticsDayData[] {
  const cutoff = Date.now() / 1000 - days * 86400;
  const filtered = videos.filter((v) => v.createTime >= cutoff);
  // Group by day
  const byDay: Record<string, AnalyticsDayData> = {};
  for (const v of filtered) {
    const day = format(new Date(v.createTime * 1000), "yyyy-MM-dd");
    if (!byDay[day]) byDay[day] = { date: day, views: 0, saves: 0, follows: 0, dmVolume: 0 };
    byDay[day].views += v.playCount;
    byDay[day].saves += v.saveCount ?? 0;
    byDay[day].follows += 0; // not available per-video
    byDay[day].dmVolume += 0;
  }
  return Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date));
}

function videosToHeaters(videos: TikTokVideo[]): HeaterPost[] {
  const med = median(videos.map((v) => v.playCount));
  return videos
    .filter((v) => v.playCount >= med * 2)
    .sort((a, b) => b.playCount - a.playCount)
    .slice(0, 5)
    .map((v, i) => ({
      id: `live-heat-${i}`,
      hook: v.text.split(".")[0].split("!")[0].trim().slice(0, 120),
      platform: "TikTok" as Platform,
      views: v.playCount,
      medianMultiple: Math.round((v.playCount / med) * 10) / 10,
      note: `${v.likeCount.toLocaleString()} likes · ${v.commentCount.toLocaleString()} comments · ${(v.saveCount ?? 0).toLocaleString()} saves`,
      postedAt: new Date(v.createTime * 1000).toISOString(),
    }));
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<TimeRange>("30D");
  const [liveData, setLiveData] = useState<{ rows: AnalyticsDayData[]; heats: HeaterPost[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const days = range === "7D" ? 7 : range === "30D" ? 30 : 90;

  const fetchLive = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?days=${days}`);
      const json = await res.json();
      if (json.ok && json.data?.videos?.length) {
        const rows = videosToAnalyticsData(json.data.videos as TikTokVideo[], days);
        const heats = videosToHeaters(json.data.videos as TikTokVideo[]);
        setLiveData({ rows, heats });
        setIsLive(true);
        setLastUpdated(new Date());
      }
    } catch {
      // silently fall back to mock data
    } finally {
      setLoading(false);
    }
  }, [days]);

  // Try live data on mount
  useEffect(() => { fetchLive(); }, [fetchLive]);

  const rows = liveData?.rows ?? analyticsData;
  const heatersToShow = liveData?.heats ?? heaters;

  const currentPeriod = useMemo(() => rows.slice(-days), [rows, days]);
  const previousPeriod = useMemo(() => rows.slice(-days * 2, -days), [rows, days]);

  const sumMetric = (data: AnalyticsDayData[], key: keyof AnalyticsDayData): number =>
    data.reduce((sum, d) => sum + (d[key] as number), 0);

  const metrics = useMemo(() => {
    const cur = {
      views: sumMetric(currentPeriod, "views"),
      saves: sumMetric(currentPeriod, "saves"),
      follows: sumMetric(currentPeriod, "follows"),
      dmVolume: sumMetric(currentPeriod, "dmVolume"),
    };
    const prev = {
      views: sumMetric(previousPeriod, "views"),
      saves: sumMetric(previousPeriod, "saves"),
      follows: sumMetric(previousPeriod, "follows"),
      dmVolume: sumMetric(previousPeriod, "dmVolume"),
    };
    const pct = (c: number, p: number) =>
      p === 0 ? 0 : Math.round(((c - p) / p) * 100);

    return {
      views:    { value: cur.views,    change: pct(cur.views, prev.views),       data: currentPeriod.map((d) => d.views) },
      saves:    { value: cur.saves,    change: pct(cur.saves, prev.saves),       data: currentPeriod.map((d) => d.saves) },
      follows:  { value: cur.follows,  change: pct(cur.follows, prev.follows),   data: currentPeriod.map((d) => d.follows) },
      dmVolume: { value: cur.dmVolume, change: pct(cur.dmVolume, prev.dmVolume), data: currentPeriod.map((d) => d.dmVolume) },
    };
  }, [currentPeriod, previousPeriod]);

  const metricCards = [
    { key: "views",    label: "Total Views",   icon: Eye,           color: "#C05A38" },
    { key: "saves",    label: "Saves",          icon: Bookmark,      color: "#7C3AED" },
    { key: "follows",  label: "New Followers",  icon: Users,         color: "#0EA5E9" },
    { key: "dmVolume", label: "DM Volume",      icon: MessageCircle, color: "#10B981" },
  ] as const;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#E8E8E8]">Analytics</h1>
          <p className="text-sm text-[#888888] mt-1">
            {isLive
              ? `Live data from @theaihustle7 · updated ${format(lastUpdated, "h:mm a")}`
              : `Preview data · add APIFY_API_TOKEN to .env.local for live stats`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isLive && (
            <Badge variant="success" className="text-xs">● Live</Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLive}
            disabled={loading}
            className="gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Fetching…" : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Time Range Tabs */}
      <Tabs value={range} onValueChange={(v) => setRange(v as TimeRange)} className="mb-6">
        <TabsList>
          <TabsTrigger value="7D">7D</TabsTrigger>
          <TabsTrigger value="30D">30D</TabsTrigger>
          <TabsTrigger value="90D">90D</TabsTrigger>
        </TabsList>

        {(["7D", "30D", "90D"] as TimeRange[]).map((r) => (
          <TabsContent key={r} value={r}>
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {metricCards.map(({ key, label, icon: Icon, color }) => {
                const metric = metrics[key];
                const isPositive = metric.change >= 0;
                return (
                  <div
                    key={key}
                    className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 flex flex-col gap-3 hover:border-[#3A3A3A] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#888888] text-sm">
                        <Icon className="h-4 w-4" />
                        {label}
                      </div>
                      <span className={`flex items-center gap-0.5 text-xs font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
                        {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl font-bold text-[#E8E8E8]">
                        {formatNumber(metric.value)}
                      </span>
                      <Sparkline data={metric.data} color={color} height={40} width={100} />
                    </div>
                    <p className="text-xs text-[#555555]">vs previous {r} period</p>
                  </div>
                );
              })}
            </div>

            {/* Heaters */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-[#C05A38]" />
                <h2 className="text-lg font-semibold text-[#E8E8E8]">Heaters This Period</h2>
                <Badge variant="terra" className="ml-1">Beat 30-day median 2x+</Badge>
              </div>
              <div className="space-y-3">
                {heatersToShow.map((post, idx) => (
                  <div
                    key={post.id}
                    className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-start gap-4 hover:border-[#C05A38]/30 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#C05A38]/10 border border-[#C05A38]/20 flex items-center justify-center text-[#C05A38] font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-shrink-0 w-12 h-16 rounded-lg bg-[#242424] border border-[#2A2A2A] flex items-center justify-center">
                      <span className="text-xl">🔥</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#E8E8E8] leading-snug line-clamp-2">{post.hook}</p>
                      <p className="text-sm text-[#666666] mt-1 line-clamp-2">{post.note}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={platformBadge[post.platform]}>{post.platform}</Badge>
                        <span className="text-xs text-[#555555]">{format(new Date(post.postedAt), "MMM d")}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xl font-bold text-[#E8E8E8]">{formatViews(post.views)}</p>
                      <p className="text-xs text-[#C05A38] font-medium mt-0.5">{post.medianMultiple}x median</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
