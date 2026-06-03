import { NextResponse } from "next/server";
import { scrapeCompetitorReels } from "@/lib/apify";

export async function GET() {
  try {
    const data = await scrapeCompetitorReels();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
