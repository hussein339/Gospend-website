"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  BarChart2,
  Users,
  Send,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Hook Vault",
    icon: Bookmark,
    href: "/hook-vault",
  },
  {
    label: "Analytics",
    icon: BarChart2,
    href: "/analytics",
  },
  {
    label: "Competitor Tracker",
    icon: Users,
    href: "/competitor-tracker",
  },
  {
    label: "Scheduler",
    icon: Send,
    href: "/scheduler",
  },
  {
    label: "Content Calendar",
    icon: CalendarDays,
    href: "/content-calendar",
  },
  {
    label: "What's Trending",
    icon: TrendingUp,
    href: "/trending",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#111111] border-r border-[#2A2A2A] flex flex-col z-40">
      {/* Profile */}
      <div className="p-5 border-b border-[#2A2A2A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C05A38] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            TM
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#E8E8E8] truncate">@tenfoldmarc</p>
            <p className="text-xs text-[#888888] truncate">The AI Hustle</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative",
                isActive
                  ? "text-[#C05A38] bg-[#C05A38]/10"
                  : "text-[#888888] hover:text-[#E8E8E8] hover:bg-[#1A1A1A]"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#C05A38] rounded-r-full" />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isActive ? "text-[#C05A38]" : "text-[#666666]"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#2A2A2A]">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <p className="text-xs text-[#555555]">
            Powered by{" "}
            <a
              href="https://apify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666666] hover:text-[#888888] transition-colors"
            >
              Apify
            </a>
          </p>
        </div>
      </div>
    </aside>
  );
}
