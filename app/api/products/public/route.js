import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

// ✅ FIXED: Changed from simple strings to Objects with translations
const PRESET_CATEGORIES = [
  { id: "Back Pack", en: "Back Pack", cn: "双肩包" },
  { id: "Tool Bag", en: "Tool Bag", cn: "工具包" },
  { id: "Makeup Bag", en: "Makeup Bag", cn: "化妆包" },
  { id: "Tote Bag", en: "Tote Bag", cn: "托特包" },
  { id: "Insulated bag", en: "Insulated bag", cn: "保温包" },
  { id: "Waterproof Bag", en: "Waterproof Bag", cn: "防水包" },
  { id: "Game Case", en: "Game Case", cn: "游戏收纳包" },
  { id: "Laptop Bag", en: "Laptop Bag", cn: "电脑包" },
  { id: "Tablet cases", en: "Tablet cases", cn: "平板电脑包" },
  { id: "Headphone Bag", en: "Headphone Bag", cn: "耳机包" },
];

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = (searchParams.get("userId") || "").trim();

    const filter = {};

    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
      }
      filter.userId = userId;
    } else if (
      process.env.PUBLIC_OWNER_USER_ID &&
      mongoose.Types.ObjectId.isValid(process.env.PUBLIC_OWNER_USER_ID)
    ) {
      filter.userId = process.env.PUBLIC_OWNER_USER_ID;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { 
        products, 
        // ✅ The frontend will now receive { id, en, cn } objects
        categories: PRESET_CATEGORIES 
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: e?.message || "Server error" },
      { status: 500 }
    );
  }
}