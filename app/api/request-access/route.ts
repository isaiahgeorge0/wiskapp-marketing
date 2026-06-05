import { NextResponse } from "next/server";

import { createServerClient } from "@/lib/supabase/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: string; email?: string };
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const supabase = createServerClient();

    const { error } = await supabase.from("access_requests").insert({
      name,
      email,
      status: "pending",
    });

    if (error) {
      console.error("request-access:", error);
      return NextResponse.json(
        { error: "Unable to submit your request. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("request-access:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
