 import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { sendDiscordMessage } from "./send.js";

const app = express();
app.use(helmet());
app.use(express.json({ limit: "256kb" }));
app.use(cors({ origin: "*" }));

app.get("/healthz", (_req, res) => res.status(200).send("ok"));

app.get("/test", async (_req, res) => {
  try {
    await sendDiscordMessage("🚀 Drop-Scout Notify: /test ping");
    res.json({ ok: true, message: "Sent ping to Discord" });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

// POST /notify  { "content": "your message" }
app.post("/notify", async (req, res) => {
  const content = req.body?.content;
  if (!content) return res.status(400).json({ ok: false, error: "Missing content" });

  try {
    await sendDiscordMessage(content);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Drop-Scout Notify listening on ${port}`));

const fetch = require('node-fetch');

app.post('/notify', async (req, res) => {
  
  try {
    await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });
    res.status(200).send('✅ Notification sent!');
  } catch (error) {
    console.error(error);
    res.status(500).send('❌ Error sending notification.');
  }
});

app.listen(port, () => console.log(`🚀 App live on port ${port}`));
