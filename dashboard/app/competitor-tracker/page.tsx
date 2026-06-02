"use client";

import { useState } from "react";
import { Clock, Bookmark, Eye, Users, RefreshCw } from "lucide-react";
import { competitors } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function formatViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

export default function CompetitorTrackerPage() {
  const [selectedHandle, setSelectedHandle] = useState(competitors[0].handle);
  const [savedReels, setSavedReels] = useState<Set<string>>(new Set());

  const selectedCompetitor = competitors.find(
    (c) => c.handle === selectedHandle
  )!;

  const sortedReels = [...selectedCompetitor.reels].sort(
    (a, b) => b.views - a.views
  );

  const handleSave = (reelId: string) => {
    setSavedReels((prev) => {
      const next = new Set(prev);
      if (next.has(reelId)) {
        next.delete(reelId);
      } else {
        next.add(reelId);
      }
      return next;
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#E8E8E8]">Competitor Tracker</h1>
          <p className="text-sm text-[#888888] mt-1">
            Updated every Sunday at 8am
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 py-1.5">
            <Clock className="h-3.5 w-3.5" />
            Next scrape: Sunday 8am
          </Badge>
          <Button variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Account Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-[#2A2A2A]">
        {competitors.map((c) => (
          <button
            key={c.handle}
            onClick={() => setSelectedHandle(c.handle)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              selectedHandle === c.handle
                ? "bg-[#C05A38]/15 text-[#C05A38] border border-[#C05A38]/30"
                : "bg-[#1A1A1A] text-[#888888] border border-[#2A2A2A] hover:text-[#E8E8E8] hover:border-[#3A3A3A]"
            )}
          >
            <span>{c.handle}</span>
          </button>
        ))}
      </div>

      {/* Selected account info */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-[#1A1A1A] rounded-xl border border-[#2A2A2A]">
        <div className="w-12 h-12 rounded-full bg-[#242424] border border-[#2A2A2A] flex items-center justify-center text-[#888888]">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-[#E8E8E8]">{selectedCompetitor.displayName}</p>
          <p className="text-sm text-[#888888]">{selectedCompetitor.handle}</p>
        </div>
        <div className="ml-auto flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="font-bold text-[#E8E8E8]">
              {formatFollowers(selectedCompetitor.followerCount)}
            </p>
            <p className="text-[#666666] text-xs">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-[#E8E8E8]">
              {selectedCompetitor.reels.length * 10}+
            </p>
            <p className="text-[#666666] text-xs">Videos</p>
          </div>
          <div className="text-center">
            <p className="text-[#E8E8E8] font-medium text-xs">
              {selectedCompetitor.niche}
            </p>
            <p className="text-[#666666] text-xs">Niche</p>
          </div>
        </div>
      </div>

      {/* Top Reels */}
      <div>
        <h2 className="text-sm font-semibold text-[#888888] uppercase tracking-wider mb-4">
          Top 5 Reels · Sorted by Views
        </h2>

        <div className="space-y-4">
          {sortedReels.map((reel, idx) => {
            const isSaved = savedReels.has(reel.id);

            return (
              <div
                key={reel.id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#3A3A3A] transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Rank + view count */}
                  <div className="flex-shrink-0 text-center min-w-[52px]">
                    <div className="w-8 h-8 rounded-lg bg-[#C05A38]/10 border border-[#C05A38]/20 flex items-center justify-center text-[#C05A38] font-bold text-sm mb-2 mx-auto">
                      {idx + 1}
                    </div>
                    <p className="text-base font-bold text-[#E8E8E8]">
                      {formatViews(reel.views)}
                    </p>
                    <div className="flex items-center gap-0.5 justify-center text-[#555555] text-xs mt-0.5">
                      <Eye className="h-3 w-3" />
                      views
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-[#E8E8E8] leading-snug mb-2">
                      {reel.hook}
                    </p>
                    <p className="text-sm text-[#666666] leading-relaxed line-clamp-3 italic border-l-2 border-[#2A2A2A] pl-3">
                      &ldquo;{reel.transcriptExcerpt}&rdquo;
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#888888]">{reel.creator}</span>
                        <span className="text-[#444] text-sm">·</span>
                        <span className="text-sm text-[#555555]">
                          {formatFollowers(selectedCompetitor.followerCount)} followers
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Save button */}
                  <div className="flex-shrink-0">
                    <Button
                      variant={isSaved ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleSave(reel.id)}
                      className={cn(
                        "gap-1.5",
                        isSaved && "border-[#C05A38]/30 text-[#C05A38] bg-[#C05A38]/10"
                      )}
                    >
                      <Bookmark
                        className={cn("h-3.5 w-3.5", isSaved && "fill-current")}
                      />
                      {isSaved ? "Saved" : "Save Hook"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
