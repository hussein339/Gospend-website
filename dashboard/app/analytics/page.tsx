"use client";

import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Eye, Bookmark, Users, MessageCircle, Flame } from "lucide-react";
import { analyticsData, heaters, type Platform } from "@/lib/mock-data";
import { Sparkline } from "@/components/sparkline";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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

export default function AnalyticsPage() {
  const [range, setRange] = useState<TimeRange>("30D");

  const days = range === "7D" ? 7 : range === "30D" ? 30 : 90;

  const currentPeriod = useMemo(() => analyticsData.slice(-days), [days]);
  const previousPeriod = useMemo(() => analyticsData.slice(-days * 2, -days), [days]);

  const sumMetric = (data: typeof analyticsData, key: keyof typeof analyticsData[0]): number =>
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
      views: { value: cur.views, change: pct(cur.views, prev.views), data: currentPeriod.map((d) => d.views) },
      saves: { value: cur.saves, change: pct(cur.saves, prev.saves), data: currentPeriod.map((d) => d.saves) },
      follows: { value: cur.follows, change: pct(cur.follows, prev.follows), data: currentPeriod.map((d) => d.follows) },
      dmVolume: { value: cur.dmVolume, change: pct(cur.dmVolume, prev.dmVolume), data: currentPeriod.map((d) => d.dmVolume) },
    };
  }, [currentPeriod, previousPeriod]);

  const metricCards = [
    { key: "views", label: "Total Views", icon: Eye, color: "#C05A38" },
    { key: "saves", label: "Saves", icon: Bookmark, color: "#7C3AED" },
    { key: "follows", label: "New Followers", icon: Users, color: "#0EA5E9" },
    { key: "dmVolume", label: "DM Volume", icon: MessageCircle, color: "#10B981" },
  ] as const;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#E8E8E8]">Analytics</h1>
          <p className="text-sm text-[#888888] mt-1">
            Last updated: {format(new Date(), "MMM d, yyyy 'at' h:mm a")}
          </p>
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
                      <span
                        className={`flex items-center gap-0.5 text-xs font-medium ${
                          isPositive ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5" />
                        )}
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

            {/* Heaters Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-[#C05A38]" />
                <h2 className="text-lg font-semibold text-[#E8E8E8]">
                  Heaters This Period
                </h2>
                <Badge variant="terra" className="ml-1">
                  Beat 30-day median 2x+
                </Badge>
              </div>

              <div className="space-y-3">
                {heaters.map((post, idx) => (
                  <div
                    key={post.id}
                    className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 flex items-start gap-4 hover:border-[#C05A38]/30 transition-colors"
                  >
                    {/* Rank */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#C05A38]/10 border border-[#C05A38]/20 flex items-center justify-center text-[#C05A38] font-bold text-sm">
                      {idx + 1}
                    </div>

                    {/* Thumbnail placeholder */}
                    <div className="flex-shrink-0 w-12 h-16 rounded-lg bg-[#242424] border border-[#2A2A2A] flex items-center justify-center">
                      <span className="text-xl">🔥</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#E8E8E8] leading-snug line-clamp-2">
                        {post.hook}
                      </p>
                      <p className="text-sm text-[#666666] mt-1 line-clamp-2">
                        {post.note}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={platformBadge[post.platform]}>{post.platform}</Badge>
                        <span className="text-xs text-[#555555]">
                          {format(new Date(post.postedAt), "MMM d")}
                        </span>
                      </div>
                    </div>

                    {/* Views */}
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xl font-bold text-[#E8E8E8]">
                        {formatViews(post.views)}
                      </p>
                      <p className="text-xs text-[#C05A38] font-medium mt-0.5">
                        {post.medianMultiple}x median
                      </p>
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
