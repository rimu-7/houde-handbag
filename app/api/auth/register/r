import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    const { email, password, name } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    await connectDB();

    const emailNorm = email.trim().toLowerCase();

    const existUser = await User.findOne({ email: emailNorm });
    if (existUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: emailNorm,
      passwordHash, // ✅ THIS is the fix
    });

    const token = signToken({ userId: user._id.toString() });

    const response = NextResponse.json({
      message: "User registered successfully",
      user: { id: user._id.toString(), name: user.name, email: user.email },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.log("Registration Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
