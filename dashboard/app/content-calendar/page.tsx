"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  Clock,
  Smartphone,
  PlayCircle,
} from "lucide-react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { scheduledPosts, type ScheduledPost, type Platform } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const platformColors: Record<Platform, string> = {
  TikTok: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  Instagram: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  YouTube: "bg-red-500/20 text-red-400 border border-red-500/30",
};

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

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  if (platform === "Instagram") return <Smartphone className="h-3 w-3" />;
  if (platform === "YouTube") return <PlayCircle className="h-3 w-3" />;
  return <span className="text-xs font-bold leading-none">T</span>;
};

export default function ContentCalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  const postsByDate = useMemo(() => {
    const map = new Map<string, ScheduledPost[]>();
    for (const post of scheduledPosts) {
      const key = post.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(post);
    }
    return map;
  }, []);

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleDayClick = (day: Date) => {
    const key = format(day, "yyyy-MM-dd");
    const posts = postsByDate.get(key);
    if (posts && posts.length > 0) {
      setSelectedDay(day);
      setSelectedPost(posts[0]);
    } else {
      setSelectedDay(day);
      setSelectedPost(null);
    }
  };

  const handlePostClick = (post: ScheduledPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPost(post);
    setSelectedDay(new Date(post.date));
  };

  return (
    <div className="p-6 h-screen flex flex-col max-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-[#E8E8E8]">Content Calendar</h1>
          <p className="text-sm text-[#888888] mt-1">
            {scheduledPosts.length} posts this month
          </p>
        </div>
        {/* Month nav */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
            className="w-8 h-8 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] flex items-center justify-center text-[#888] hover:text-[#E8E8E8] hover:border-[#3A3A3A] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-base font-semibold text-[#E8E8E8] min-w-[140px] text-center">
            {format(currentMonth, "MMMM yyyy")}
          </span>
          <button
            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
            className="w-8 h-8 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] flex items-center justify-center text-[#888] hover:text-[#E8E8E8] hover:border-[#3A3A3A] transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Calendar Grid */}
        <div className={cn("flex-1 flex flex-col min-w-0", selectedPost ? "lg:flex-[2]" : "")}>
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1 flex-shrink-0">
            {dayLabels.map((label) => (
              <div
                key={label}
                className="text-center text-xs font-semibold text-[#666666] py-2 uppercase tracking-wider"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-px bg-[#2A2A2A] border border-[#2A2A2A] rounded-xl overflow-hidden flex-1">
            {days.map((day) => {
              const key = format(day, "yyyy-MM-dd");
              const posts = postsByDate.get(key) || [];
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isToday = isSameDay(day, new Date());
              const isSelected = selectedDay && isSameDay(day, selectedDay);

              return (
                <div
                  key={key}
                  onClick={() => handleDayClick(day)}
                  className={cn(
                    "bg-[#0C0C0C] p-1.5 cursor-pointer transition-colors min-h-[80px] flex flex-col",
                    !isCurrentMonth && "opacity-30",
                    isSelected && "bg-[#C05A38]/5",
                    isCurrentMonth && !isSelected && "hover:bg-[#1A1A1A]"
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-medium w-5 h-5 flex items-center justify-center rounded-full mb-1 flex-shrink-0",
                      isToday
                        ? "bg-[#C05A38] text-white"
                        : isSelected
                        ? "text-[#C05A38]"
                        : "text-[#888888]"
                    )}
                  >
                    {format(day, "d")}
                  </span>

                  <div className="flex flex-col gap-0.5 flex-1 overflow-hidden">
                    {posts.slice(0, 3).map((post) => (
                      <button
                        key={post.id}
                        onClick={(e) => handlePostClick(post, e)}
                        className={cn(
                          "w-full text-left text-[10px] font-medium rounded px-1 py-0.5 truncate flex items-center gap-1",
                          platformColors[post.platform]
                        )}
                      >
                        <PlatformIcon platform={post.platform} />
                        <span className="truncate">{post.hook.slice(0, 20)}…</span>
                      </button>
                    ))}
                    {posts.length > 3 && (
                      <span className="text-[10px] text-[#555555] px-1">
                        +{posts.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side panel */}
        {selectedPost && (
          <div className="w-80 flex-shrink-0 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden flex flex-col">
            {/* Panel header */}
            <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
              <div>
                <p className="text-sm font-semibold text-[#E8E8E8]">Post Details</p>
                {selectedDay && (
                  <p className="text-xs text-[#666666] mt-0.5">
                    {format(selectedDay, "EEEE, MMMM d")}
                  </p>
                )}
              </div>
              <button
                onClick={() => { setSelectedPost(null); setSelectedDay(null); }}
                className="w-7 h-7 rounded-lg bg-[#242424] flex items-center justify-center text-[#888] hover:text-[#E8E8E8] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Panel content */}
            <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={platformBadge[selectedPost.platform]}>
                  {selectedPost.platform}
                </Badge>
                <Badge variant={statusBadge[selectedPost.status]} className="capitalize">
                  {selectedPost.status}
                </Badge>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2 text-sm text-[#888888]">
                <Calendar className="h-3.5 w-3.5" />
                <span>{format(new Date(selectedPost.date), "MMM d, yyyy")}</span>
                <Clock className="h-3.5 w-3.5 ml-2" />
                <span>{selectedPost.time}</span>
              </div>

              {/* Hook */}
              <div>
                <p className="text-xs font-semibold text-[#666666] uppercase tracking-wider mb-1.5">
                  Hook
                </p>
                <p className="text-sm font-semibold text-[#E8E8E8] leading-snug">
                  {selectedPost.hook}
                </p>
              </div>

              {/* Caption */}
              <div>
                <p className="text-xs font-semibold text-[#666666] uppercase tracking-wider mb-1.5">
                  Caption
                </p>
                <p className="text-sm text-[#AAAAAA] leading-relaxed whitespace-pre-line">
                  {selectedPost.caption}
                </p>
              </div>

              {/* Other posts on same day */}
              {selectedDay && (() => {
                const key = format(selectedDay, "yyyy-MM-dd");
                const dayPosts = (postsByDate.get(key) || []).filter(p => p.id !== selectedPost.id);
                return dayPosts.length > 0 ? (
                  <div>
                    <p className="text-xs font-semibold text-[#666666] uppercase tracking-wider mb-2">
                      Also on this day
                    </p>
                    <div className="space-y-2">
                      {dayPosts.map(p => (
                        <button
                          key={p.id}
                          onClick={() => setSelectedPost(p)}
                          className="w-full text-left p-2.5 rounded-lg bg-[#242424] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors"
                        >
                          <p className="text-xs text-[#888888] line-clamp-1">{p.hook}</p>
                          <div className="flex gap-1.5 mt-1.5">
                            <Badge variant={platformBadge[p.platform]} className="text-[10px] py-0">
                              {p.platform}
                            </Badge>
                            <span className="text-[10px] text-[#555555]">{p.time}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
