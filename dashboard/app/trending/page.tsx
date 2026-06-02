"use client";

import { useState, useMemo } from "react";
import { ExternalLink, Bookmark, Bell, Flame, BookOpen, SkipForward } from "lucide-react";
import { trendingItems, type HookPotential, type HookTag } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const sources = ["All", "Anthropic Blog", "OpenAI Blog", "X Lists", "HN", "MIT Tech Review"];

const sourceColors: Record<string, string> = {
  "Anthropic Blog": "bg-orange-900/30 text-orange-400 border border-orange-800/50",
  "OpenAI Blog": "bg-green-900/30 text-green-400 border border-green-800/50",
  "X Lists": "bg-blue-900/30 text-blue-400 border border-blue-800/50",
  "HN": "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50",
  "MIT Tech Review": "bg-purple-900/30 text-purple-400 border border-purple-800/50",
};

const potentialEmoji: Record<HookPotential, string> = {
  high: "🔥",
  medium: "📖",
  skip: "⏭",
};

const potentialLabel: Record<HookPotential, string> = {
  high: "Hook Potential",
  medium: "Explainer",
  skip: "Skip",
};

const potentialBadge: Record<HookPotential, Parameters<typeof Badge>[0]["variant"]> = {
  high: "terra",
  medium: "blue",
  skip: "secondary",
};

export default function TrendingPage() {
  const [sourceFilter, setSourceFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState<"all" | HookTag>("all");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    let items = [...trendingItems];

    if (sourceFilter !== "All") {
      items = items.filter((i) => i.source === sourceFilter);
    }

    if (tagFilter !== "all") {
      items = items.filter((i) => i.tag === tagFilter);
    }

    return items.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [sourceFilter, tagFilter]);

  const topHookWorthy = useMemo(
    () =>
      trendingItems
        .filter((i) => i.hookPotential === "high")
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 5),
    []
  );

  const handleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#E8E8E8]">What&apos;s Trending</h1>
          <p className="text-sm text-[#888888] mt-1">
            {sources.length - 1} sources, updated daily
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-sm text-[#888888]">
          <Bell className="h-3.5 w-3.5 text-[#C05A38]" />
          Slack digest at 7am
        </div>
      </div>

      {/* Top 5 Hook-Worthy */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="h-5 w-5 text-[#C05A38]" />
          <h2 className="text-base font-semibold text-[#E8E8E8]">Top Hook-Worthy Today</h2>
          <Badge variant="terra">5 items</Badge>
        </div>
        <div className="space-y-2">
          {topHookWorthy.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#1A1A1A] border border-[#C05A38]/20 rounded-xl p-4 flex items-start gap-3 hover:border-[#C05A38]/40 transition-colors"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded bg-[#C05A38]/15 flex items-center justify-center text-[#C05A38] text-xs font-bold">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <span
                    className={cn(
                      "text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0",
                      sourceColors[item.source] || "bg-[#242424] text-[#888888]"
                    )}
                  >
                    {item.source}
                  </span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#E8E8E8] hover:text-[#C05A38] transition-colors mt-1 block leading-snug"
                >
                  {item.title}
                </a>
              </div>
              <span className="flex-shrink-0 text-sm">{potentialEmoji[item.hookPotential]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Source filter chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {sources.map((source) => (
          <button
            key={source}
            onClick={() => setSourceFilter(source)}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium border transition-all",
              sourceFilter === source
                ? "bg-[#C05A38]/15 border-[#C05A38]/40 text-[#E07A5F]"
                : "bg-[#1A1A1A] border-[#2A2A2A] text-[#666666] hover:text-[#888888] hover:border-[#3A3A3A]"
            )}
          >
            {source}
          </button>
        ))}
      </div>

      {/* Tag filter */}
      <div className="flex gap-2 mb-5">
        {(["all", "hook-potential", "explainer", "skip"] as const).map((tag) => {
          const labels: Record<string, string> = {
            all: "All",
            "hook-potential": "🔥 Hook Potential",
            explainer: "📖 Explainer",
            skip: "⏭ Skip",
          };
          return (
            <button
              key={tag}
              onClick={() => setTagFilter(tag)}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium border transition-all",
                tagFilter === tag
                  ? "bg-[#242424] border-[#444] text-[#E8E8E8]"
                  : "bg-transparent border-[#2A2A2A] text-[#666666] hover:text-[#888888]"
              )}
            >
              {labels[tag]}
            </button>
          );
        })}
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isSaved = savedIds.has(item.id);

          return (
            <div
              key={item.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#3A3A3A] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  {/* Source + time */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={cn(
                        "text-[10px] font-medium px-2 py-0.5 rounded-full",
                        sourceColors[item.source] || "bg-[#242424] text-[#888888]"
                      )}
                    >
                      {item.source}
                    </span>
                    <span className="text-xs text-[#555555]">
                      {formatDistanceToNow(new Date(item.publishedAt), { addSuffix: true })}
                    </span>
                    <Badge variant={potentialBadge[item.hookPotential]} className="ml-auto text-[10px]">
                      {potentialEmoji[item.hookPotential]} {potentialLabel[item.hookPotential]}
                    </Badge>
                  </div>

                  {/* Title */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#E8E8E8] hover:text-[#C05A38] transition-colors leading-snug flex items-start gap-1 group"
                  >
                    {item.title}
                    <ExternalLink className="h-3 w-3 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  {/* Summary */}
                  <p className="text-sm text-[#666666] mt-1.5 leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>

                  {/* Actions */}
                  {item.hookPotential === "high" && (
                    <div className="mt-3">
                      <Button
                        variant={isSaved ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleSave(item.id)}
                        className={cn(
                          "gap-1.5 h-7 text-xs",
                          isSaved && "border-[#C05A38]/30 text-[#C05A38] bg-[#C05A38]/10"
                        )}
                      >
                        <Bookmark
                          className={cn("h-3 w-3", isSaved && "fill-current")}
                        />
                        {isSaved ? "Saved as Hook" : "Save as Hook"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#555555]">
          <p className="text-4xl mb-3">📡</p>
          <p className="text-lg font-medium">No items found</p>
          <p className="text-sm mt-1">Try a different source or tag filter</p>
        </div>
      )}
    </div>
  );
}
