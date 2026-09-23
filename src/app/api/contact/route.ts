import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const LIMITS = { name: 100, email: 150, message: 3000 };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
      return NextResponse.json(
        { error: "The message is too long." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await prisma.message.create({
      data: { name, email, message },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong on the server. Please email me directly." },
      { status: 500 }
    );
  }
}
