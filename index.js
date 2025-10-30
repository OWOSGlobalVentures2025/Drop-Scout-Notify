import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();
app.use(helmet());
app.use(express.json({ limit: "256kb" }));
app.use(cors({ origin: "*" }));

app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.get("/test", (_req, res) => res.json({ ok: true, message: "🚀 Drop-Scout Notify live" }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Drop-Scout Notify listening on ${port}`));
