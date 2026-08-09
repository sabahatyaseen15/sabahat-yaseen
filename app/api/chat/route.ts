// File location: app/api/chat/route.ts
// This runs on the SERVER, so your API key stays hidden from the browser.
// Uses Groq's free, OpenAI-compatible chat completions API.

import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the assistant on Sabahat Yaseen's portfolio website.
Sabahat is a Web Developer with 2+ years of experience in Angular, React, Next.js,
API integration, authentication, state management, Tailwind CSS, and Bootstrap.
Answer visitor questions about her skills, projects, and how to contact her
(email: sabahatyaseen15@gmail.com, GitHub: github.com/sabahatyaseen15,
LinkedIn: linkedin.com/in/sabahat-yaseen-4a4193235).
Keep replies short, friendly, and professional — 2 to 4 sentences max.
If asked something unrelated to Sabahat or web development, politely redirect
the conversation back to her work and skills.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing GROQ_API_KEY" },
        { status: 500 }
      );
    }

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(Array.isArray(history) ? history : []).map((m: { role: string; text: string }) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Groq API error:", errText);
      return NextResponse.json({ error: "AI request failed" }, { status: 502 });
    }

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content ??
      "Sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}