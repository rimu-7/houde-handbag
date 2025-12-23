import { connectDB } from "@/lib/db";
import Timeline from "@/lib/models/timeline";
import { requireUserId } from "@/lib/requireUser";
import { NextResponse } from "next/server";

// GET handler to fetch all timelines
export async function GET(req) {
  try {
    const userId = await requireUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Not authorized." }, 
        { status: 401 }
      );
    }

    await connectDB();
    
    // Sort by eventDate descending (newest first)
    const timelines = await Timeline.find({})
      .sort({ eventDate: -1 })
      .lean();

    return NextResponse.json(
      { 
        message: "Timelines fetched successfully.", 
        timelines 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching timelines:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST handler (your existing code)
export async function POST(req) {
  try {
    // 1. Auth Check
    const userId = await requireUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Not authorized." }, 
        { status: 401 }
      );
    }

    // 2. Parse Body
    const body = await req.json();
    const { eventDate, entitle, zntitle, zndescription, endescription } = body;

    // 3. Validation
    if (!eventDate || !entitle || !zntitle || !endescription || !zndescription) {
      return NextResponse.json(
        { error: "Missing required fields (eventDate, titles, or descriptions)." },
        { status: 400 }
      );
    }

    // 4. Connect DB
    await connectDB();

    // 5. Create Document
    const newTimeline = await Timeline.create({
      eventDate: new Date(eventDate), 
      entitle,
      zntitle,
      zndescription,
      endescription,
    });

    // 6. Return Success
    return NextResponse.json(
      { 
        message: "Timeline created successfully.", 
        timeline: newTimeline 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Timeline Creation Error:", error);

    // 7. Handle Mongoose Validation Errors
    if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(val => val.message);
        return NextResponse.json({ error: messages }, { status: 400 });
    }

    // 8. Generic Server Error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE handler to delete a timeline
export async function DELETE(req) {
  try {
    // 1. Auth Check
    const userId = await requireUserId();
    if (!userId) {
      return NextResponse.json(
        { message: "Not authorized." }, 
        { status: 401 }
      );
    }

    // 2. Get timeline ID from query parameters
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Timeline ID is required." },
        { status: 400 }
      );
    }

    // 3. Connect DB
    await connectDB();

    // 4. Find and delete the timeline
    const deletedTimeline = await Timeline.findByIdAndDelete(id);

    if (!deletedTimeline) {
      return NextResponse.json(
        { error: "Timeline not found." },
        { status: 404 }
      );
    }

    // 5. Return Success
    return NextResponse.json(
      { 
        message: "Timeline deleted successfully.", 
        timeline: deletedTimeline 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Timeline Deletion Error:", error);
    
    // Handle invalid ObjectId format
    if (error.name === "CastError") {
      return NextResponse.json(
        { error: "Invalid timeline ID format." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}