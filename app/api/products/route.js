import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import { currentUser } from "@/lib/currentUser";
import { uploadFilesToCloudinary, slugifyFolderName } from "@/lib/upload";
import { CATEGORY_DEFINITIONS, CATEGORY_MAP, normalizeCategory, ALLOWED_CATEGORIES } from "@/lib/categories"; 

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();

    const products = await Product.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { 
        products, 
        // ✅ Return the full object so frontend can show Chinese
        categories: CATEGORY_DEFINITIONS 
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json({ message: e?.message || "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await currentUser();
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    await connectDB();

    const form = await request.formData();
    const categoryRaw = form.get("category");

    // ✅ Use the shared map logic
    const pickedCategory = CATEGORY_MAP.get(normalizeCategory(categoryRaw));
    
    if (!pickedCategory) {
      return NextResponse.json(
        { message: "Invalid category", allowedCategories: ALLOWED_CATEGORIES },
        { status: 400 }
      );
    }

    const all = form.getAll("images") || [];
    const files = all.filter((f) => typeof f === "object" && f && "arrayBuffer" in f);

    if (files.length < 1) return NextResponse.json({ message: "At least 1 image required" }, { status: 400 });
    if (files.length > 10) return NextResponse.json({ message: "Max 10 images per upload" }, { status: 400 });

    const existing = await Product.findOne({ userId: user.id, category: pickedCategory }).select("images").lean();
    const existingCount = existing?.images?.length || 0;
    const nextTotal = existingCount + files.length;

    if (nextTotal > 10) {
      return NextResponse.json(
        { message: `Category has ${existingCount} images. Limit is 10.` },
        { status: 400 }
      );
    }

    const folder = `products/${slugifyFolderName(pickedCategory)}`;
    const imageUrls = await uploadFilesToCloudinary(files, { folder });

    const product = await Product.findOneAndUpdate(
      { userId: user.id, category: pickedCategory },
      {
        $setOnInsert: { userId: user.id, category: pickedCategory },
        $push: { images: { $each: imageUrls } },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ product }, { status: 201 });
  } catch (e) {
    console.error("Upload Error:", e);
    return NextResponse.json({ message: e?.message || "Server error" }, { status: 500 });
  }
}