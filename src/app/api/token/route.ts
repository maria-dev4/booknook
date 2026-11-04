import { headers } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ message: "JWT_SECRET is missing in .env.local" }, { status: 500 });
    }
    const token = jwt.sign(
      { email: session.user.email, name: session.user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return NextResponse.json({ token });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Token error";
    return NextResponse.json({ message }, { status: 500 });
  }
}