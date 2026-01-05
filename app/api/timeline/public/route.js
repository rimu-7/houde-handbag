import { connectDB } from "@/lib/db";
import Timeline from "@/lib/models/timeline";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    
    // Fetch all events, sorted by date (newest first)
    const timelines = await Timeline.find({}).sort({ eventDate: -1 }).lean();

    // Transform _id to string for serialization safety
    const formatted = timelines.map((t) => ({
      ...t,
      _id: t._id.toString(),
      // Format date for the sticky sidebar (e.g., "2025" or "Dec 2025")
      displayDate: new Date(t.eventDate).getFullYear().toString(), 
    }));

    return NextResponse.json({ data: formatted }, { status: 200 });
  } catch (error) {
    console.error("Public Timeline Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch timeline" },
      { status: 500 }
    );
  }
}