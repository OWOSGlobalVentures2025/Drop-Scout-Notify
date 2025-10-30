import fetch from "node-fetch";

export async function sendDiscordMessage(content) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) throw new Error("Missing DISCORD_WEBHOOK_URL");

  if (content.length > 2000) content = content.slice(0, 1990) + "…";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Discord error ${res.status}: ${text}`);
  }

  return { ok: true };
}
