"use client";

import { useState } from "react";
import { Sparkles, Send, Smartphone, PlayCircle, CheckSquare, Square, Clock, Calendar } from "lucide-react";
import { scheduledPosts, type Platform } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const platformBadge: Record<Platform, Parameters<typeof Badge>[0]["variant"]> = {
  TikTok: "orange",
  Instagram: "purple",
  YouTube: "destructive",
};

const statusBadge: Record<string, Parameters<typeof Badge>[0]["variant"]> = {
  scheduled: "blue",
  posted: "success",
  draft: "secondary",
};

const PlatformIcon = ({ platform }: { platform: string }) => {
  if (platform === "Instagram") return <Smartphone className="h-4 w-4" />;
  if (platform === "YouTube") return <PlayCircle className="h-4 w-4" />;
  // TikTok
  return <span className="text-sm font-bold leading-none">T</span>;
};

export default function SchedulerPage() {
  const [hook, setHook] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Set<Platform>>(
    new Set(["TikTok"])
  );
  const [scheduleDate, setScheduleDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [scheduleTime, setScheduleTime] = useState("09:00");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  const recentPosts = [...scheduledPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(platform)) {
        if (next.size > 1) next.delete(platform);
      } else {
        next.add(platform);
      }
      return next;
    });
  };

  const generateCaption = async () => {
    if (!hook.trim()) return;
    setIsGenerating(true);
    setGeneratedCaption("");

    await new Promise((r) => setTimeout(r, 1400));

    const hashtags =
      selectedPlatforms.has("TikTok")
        ? "#AItools #contentcreator #AIhacks #ChatGPT #creatoreconomy"
        : "#AI #contentcreation #businesstips #digitalcreator";

    const caption = `${hook.trim()}\n\nI've been testing this for weeks and the results speak for themselves. Drop a 🤖 if you want the full breakdown.\n\nFollow @tenfoldmarc for daily AI content. Link in bio.\n\n${hashtags}`;

    setGeneratedCaption(caption);
    setIsGenerating(false);
  };

  const handleSchedule = () => {
    if (!hook.trim() || selectedPlatforms.size === 0) return;
    setIsScheduled(true);
    setTimeout(() => setIsScheduled(false), 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#E8E8E8]">Scheduler</h1>
        <p className="text-sm text-[#888888] mt-1">
          One-click multi-platform publishing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel — compose form */}
        <div className="space-y-5">
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 space-y-5">
            <h2 className="text-base font-semibold text-[#E8E8E8]">Compose Post</h2>

            {/* Hook / script */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#888888]">
                Hook / Script
              </label>
              <textarea
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                placeholder="Paste your hook or full script here..."
                rows={5}
                className="w-full rounded-md border border-[#2A2A2A] bg-[#111111] px-3 py-2.5 text-sm text-[#E8E8E8] placeholder:text-[#555555] focus:outline-none focus:ring-1 focus:ring-[#C05A38] focus:border-[#C05A38] resize-none"
              />
            </div>

            {/* Platform checkboxes */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#888888]">Platforms</label>
              <div className="flex flex-wrap gap-2">
                {(["TikTok", "Instagram", "YouTube"] as Platform[]).map((p) => {
                  const isSelected = selectedPlatforms.has(p);
                  return (
                    <button
                      key={p}
                      onClick={() => togglePlatform(p)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all",
                        isSelected
                          ? "bg-[#C05A38]/15 border-[#C05A38]/40 text-[#E07A5F]"
                          : "bg-[#111111] border-[#2A2A2A] text-[#666666] hover:border-[#3A3A3A] hover:text-[#888888]"
                      )}
                    >
                      {isSelected ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                      <PlatformIcon platform={p} />
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#888888] flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Date
                </label>
                <Input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="[color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#888888] flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Time
                </label>
                <Input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="[color-scheme:dark]"
                />
              </div>
            </div>

            {/* Generate Caption */}
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={generateCaption}
              disabled={isGenerating || !hook.trim()}
            >
              <Sparkles className="h-4 w-4 text-[#C05A38]" />
              {isGenerating ? "Generating caption..." : "Generate Caption"}
            </Button>

            {/* Generated caption */}
            {generatedCaption && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#888888]">
                  Generated Caption
                </label>
                <textarea
                  value={generatedCaption}
                  onChange={(e) => setGeneratedCaption(e.target.value)}
                  rows={6}
                  className="w-full rounded-md border border-[#C05A38]/30 bg-[#111111] px-3 py-2.5 text-sm text-[#E8E8E8] focus:outline-none focus:ring-1 focus:ring-[#C05A38] focus:border-[#C05A38] resize-none"
                />
              </div>
            )}

            {/* Schedule button */}
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={handleSchedule}
              disabled={!hook.trim() || selectedPlatforms.size === 0}
              variant={isScheduled ? "secondary" : "default"}
            >
              <Send className="h-4 w-4" />
              {isScheduled
                ? "Scheduled!"
                : `Schedule for ${Array.from(selectedPlatforms).join(" + ")}`}
            </Button>
          </div>
        </div>

        {/* Right panel — recent posts */}
        <div>
          <h2 className="text-base font-semibold text-[#E8E8E8] mb-3">Recent & Scheduled</h2>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 hover:border-[#3A3A3A] transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-sm font-medium text-[#E8E8E8] line-clamp-2 leading-snug">
                    {post.hook}
                  </p>
                  <Badge variant={statusBadge[post.status]} className="flex-shrink-0 capitalize">
                    {post.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#666666]">
                  <Badge variant={platformBadge[post.platform]} className="text-xs">
                    {post.platform}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(post.date), "MMM d")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
