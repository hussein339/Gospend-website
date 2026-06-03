import { NextResponse } from "next/server";
import { scrapeOwnProfile, computeAnalytics } from "@/lib/apify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = (Number(searchParams.get("days")) || 30) as 7 | 30 | 90;

  try {
    const videos = await scrapeOwnProfile(50);
    const analytics = computeAnalytics(videos, days);
    return NextResponse.json({ ok: true, data: { videos, analytics } });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
