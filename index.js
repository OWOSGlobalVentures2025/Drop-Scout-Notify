// index.js (Modified for pure ES Modules)

// Import 'node-fetch' at the top with other imports
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { sendDiscordMessage } from "./send.js";
// NEW LINE: Use ES Module import for node-fetch
import fetch from "node-fetch";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "256kb" }));
app.use(cors({ origin: "*" }));

// Health Check Endpoint
app.get("/healthz", (_, res) => res.status(200).send("ok"));

// Test Endpoint (Pings Discord)
app.get("/test", async (_, res) => {
  try {
    await sendDiscordMessage("Drop-Scout Notify: /test ping");
    res.json({ ok: true, message: "Sent PING to Discord" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e) });
  }
});

// POST /notify (for your first notification logic)
app.post("/notify", async (req, res) => {
  const content = req.body.content;
  if (!content) {
    return res.status(400).json({ ok: false, error: "Missing content" });
  }

  try {
    await sendDiscordMessage(content);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: String(e) });
  }
});

// The Problem Code Block - Reworked!
/* // OLD CODE - REMOVE THIS BLOCK
const fetch = require('node-fetch'); // <-- THIS LINE IS THE PROBLEM
app.post('/notify/', async (req, res) => {
    try {
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message }),
        });
        res.status(200).send('Notification sent!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending notification.');
    }
});
// END OLD CODE BLOCK
*/

// Server Setup
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`✅ Drop-Scout Notify listening on ${port}`)
);
