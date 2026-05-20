import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

const EVENT_LABELS: Record<string, string> = {
  GrandOpening20260530: "Grand Opening 2026-05-30",
};

export async function POST(req: Request) {
  try {
    const { slug, firstName, lastName, phone, email, guests } =
      await req.json();

    if (!firstName || !lastName || !phone || !guests) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const notionKey = process.env.NOTION_API_KEY;
    const dbId = process.env.NOTION_DATABASE_ID;
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;

    if (!notionKey || !dbId) {
      console.error("Missing NOTION_API_KEY or NOTION_DATABASE_ID");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const fullName = `${firstName} ${lastName}`;
    const eventLabel = EVENT_LABELS[slug as string] ?? slug;
    const now = new Date().toISOString();

    // Write to Notion
    const notion = new Client({ auth: notionKey });
    await notion.pages.create({
      parent: { database_id: dbId },
      properties: {
        "Full Name": {
          title: [{ text: { content: fullName } }],
        },
        "First Name": {
          rich_text: [{ text: { content: firstName } }],
        },
        "Last Name": {
          rich_text: [{ text: { content: lastName } }],
        },
        Phone: { phone_number: phone },
        Email: email ? { email } : { email: null },
        "Total Number of Guests": { number: Number(guests) },
        "Registered At": { date: { start: now } },
        Status: { select: { name: "Registered" } },
        Event: { select: { name: eventLabel } },
      },
    });

    // Send Telegram notification
    if (tgToken && tgChatId) {
      const timestamp = new Date().toLocaleString("en-US", {
        timeZone: "America/New_York",
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const notionDbUrl = `https://www.notion.so/${dbId.replace(/-/g, "")}`;
      const text = [
        `🎉 <b>New RSVP — ${eventLabel}</b>`,
        ``,
        `👤 <b>Name:</b> ${fullName}`,
        `📞 <b>Phone:</b> ${phone}`,
        `📧 <b>Email:</b> ${email || "—"}`,
        `👥 <b>Guests:</b> ${guests}`,
        `⏰ <b>Time (EST):</b> ${timestamp}`,
        ``,
        `📋 <a href="${notionDbUrl}">Onsite Registrants (Notion)</a>`,
      ].join("\n");

      const tgRes = await fetch(
        `https://api.telegram.org/bot${tgToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tgChatId,
            text,
            parse_mode: "HTML",
          }),
        }
      );
      if (!tgRes.ok) {
        console.warn("Telegram notification failed:", await tgRes.text());
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("RSVP error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
