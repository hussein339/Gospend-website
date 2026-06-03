import { NextResponse } from "next/server";
import { scrapeRSSFeeds } from "@/lib/apify";

export async function GET() {
  try {
    const items = await scrapeRSSFeeds();
    return NextResponse.json({ ok: true, data: items });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
