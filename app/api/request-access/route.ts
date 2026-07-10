import { Resend } from "resend";
import { NextResponse } from "next/server";

import { createServerClient } from "@/lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALREADY_REGISTERED_MESSAGE =
  "This email is already registered. Try signing in instead, or use 'Forgot password' if you need to reset your access.";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function confirmationEmail(name: string) {
  const displayName = capitalize(name);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've received your request</title>
  <style>
    body { margin: 0; padding: 0; background-color: #141b27; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: 520px; margin: 0 auto; padding: 48px 24px; }
    .wordmark { font-size: 22px; font-weight: 700; background: linear-gradient(135deg, #a855f7, #14b8a6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -0.5px; margin-bottom: 40px; }
    .card { background: #111118; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 36px 32px; }
    h1 { color: #f4f4f5; font-size: 20px; font-weight: 600; margin: 0 0 12px; }
    p { color: #a1a1aa; font-size: 15px; line-height: 1.6; margin: 0 0 20px; }
    .footer { margin-top: 32px; color: #52525b; font-size: 12px; text-align: center; }
    .footer a { color: #52525b; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="wordmark">WISK</div>
    <div class="card">
      <h1>Request received.</h1>
      <p>Hi ${displayName}, thanks for your interest in WISK. We've got your request and we'll review it shortly.</p>
      <p>Once approved, you'll receive a separate email with a link to set your password and get into your command centre.</p>
      <p>In the meantime — WISK is your business, whisked together. Projects, tasks, goals, content, leads, and ideas. One place.</p>
    </div>
    <div class="footer">WISK · <a href="https://wiskapp.com">wiskapp.com</a></div>
  </div>
</body>
</html>`;
}

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

    const { data: existingUser, error: lookupError } = await supabase
      .from("users")
      .select("id")
      .ilike("email", email)
      .maybeSingle();

    if (lookupError) {
      console.error("request-access: user lookup:", lookupError);
      return NextResponse.json(
        { error: "Unable to submit your request. Please try again." },
        { status: 500 },
      );
    }

    if (existingUser) {
      return NextResponse.json(
        {
          error: ALREADY_REGISTERED_MESSAGE,
          alreadyRegistered: true,
        },
        { status: 409 },
      );
    }

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

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "WISK <hello@wiskapp.com>",
        to: email,
        subject: "We've received your request — WISK",
        html: confirmationEmail(name),
      });
    } catch (emailErr) {
      console.error("request-access: failed to send confirmation email:", emailErr);
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
