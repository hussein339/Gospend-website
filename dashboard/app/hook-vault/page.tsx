"use client";

import { useState, useMemo } from "react";
import { Search, Copy, Check, SlidersHorizontal } from "lucide-react";
import { hooks, type HookNiche, type HookType } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function formatViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toString();
}

const nicheColors: Record<HookNiche, string> = {
  AI: "terra",
  Finance: "blue",
  Productivity: "purple",
  Fitness: "success",
  Business: "orange",
};

const hookTypeLabels: Record<HookType, string> = {
  contrast: "Contrast",
  number: "Number",
  "stop-doing": "Stop-Doing",
  killed: "Killed",
  "wish-i-knew": "Wish I Knew",
};

export default function HookVaultPage() {
  const [search, setSearch] = useState("");
  const [nicheFilter, setNicheFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sortByViews, setSortByViews] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...hooks];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.text.toLowerCase().includes(q) ||
          h.template.toLowerCase().includes(q) ||
          h.creator.toLowerCase().includes(q) ||
          h.niche.toLowerCase().includes(q)
      );
    }

    if (nicheFilter !== "all") {
      result = result.filter((h) => h.niche === nicheFilter);
    }

    if (typeFilter !== "all") {
      result = result.filter((h) => h.hookType === typeFilter);
    }

    if (sortByViews) {
      result.sort((a, b) => b.views - a.views);
    } else {
      result.sort(
        (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
      );
    }

    return result;
  }, [search, nicheFilter, typeFilter, sortByViews]);

  const handleCopy = (hook: (typeof hooks)[0]) => {
    navigator.clipboard.writeText(hook.template).catch(() => {});
    setCopiedId(hook.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#E8E8E8]">Hook Vault</h1>
        <p className="text-sm text-[#888888] mt-1">
          Save viral hooks, templatized for reuse
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
          <Input
            placeholder="Search hooks, creators, niches..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={nicheFilter} onValueChange={setNicheFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Niches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Niches</SelectItem>
              <SelectItem value="AI">AI</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Productivity">Productivity</SelectItem>
              <SelectItem value="Fitness">Fitness</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="contrast">Contrast</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="stop-doing">Stop-Doing</SelectItem>
              <SelectItem value="killed">Killed</SelectItem>
              <SelectItem value="wish-i-knew">Wish I Knew</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={sortByViews ? "default" : "outline"}
            size="sm"
            onClick={() => setSortByViews(!sortByViews)}
            className="gap-1.5 h-9"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            {sortByViews ? "By Views" : "By Date"}
          </Button>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-[#666666] mb-4">
        <span className="text-[#E8E8E8] font-medium">{filtered.length}</span> hooks saved
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((hook) => {
          const isCopied = copiedId === hook.id;
          const nicheColor = nicheColors[hook.niche] as Parameters<typeof Badge>[0]["variant"];

          return (
            <div
              key={hook.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 flex flex-col gap-3 hover:border-[#3A3A3A] transition-colors group"
            >
              {/* Template */}
              <div>
                <p className="text-base font-semibold text-[#E8E8E8] leading-snug">
                  {hook.template}
                </p>
                <p className="text-sm text-[#666666] mt-1.5 italic leading-relaxed">
                  &ldquo;{hook.text}&rdquo;
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5">
                <Badge variant={nicheColor}>{hook.niche}</Badge>
                <Badge variant="secondary">{hookTypeLabels[hook.hookType]}</Badge>
              </div>

              {/* Stats row */}
              <div className="flex items-center justify-between text-sm">
                <div>
                  <span className="text-[#888888]">{hook.creator}</span>
                  <span className="text-[#555555] ml-1.5">
                    · {formatFollowers(hook.followerCount)} followers
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#E8E8E8] font-semibold">
                  <span className="text-[#C05A38]">▶</span>
                  {formatViews(hook.views)}
                </div>
              </div>

              {/* Use This button */}
              <Button
                variant={isCopied ? "secondary" : "default"}
                size="sm"
                className="w-full mt-1"
                onClick={() => handleCopy(hook)}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied to clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Use This
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#555555]">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-medium">No hooks found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
