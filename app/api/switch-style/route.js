
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { style } = await request.json();
    
    const validStyles = ["playful-modern", "rainbow-burst", "minimal-clean", "neon-pop", "retro-comic"];
    
    if (!validStyles.includes(style)) {
      return NextResponse.json({ error: "Invalid style" }, { status: 400 });
    }

    // Call your Google Apps Script web app
    const scriptUrl = process.env.STYLE_SWITCHER_URL;
    
    if (!scriptUrl) {
      return NextResponse.json({ error: "Style switcher not configured" }, { status: 500 });
    }

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ style })
    });

    if (!response.ok) {
      throw new Error("Failed to trigger style change");
    }

    return NextResponse.json({ success: true, style });
  } catch (error) {
    console.error("Error switching style:", error);
    return NextResponse.json({ error: "Failed to switch style" }, { status: 500 });
  }
}
