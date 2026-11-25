require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, app: "DRAGON X AI", configured: Boolean(process.env.GEMINI_API_KEY) });
});

app.post("/api/chat", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(503).json({ error: "Gemini API key weli lama gelin. Ku dar GEMINI_API_KEY gudaha .env." });

    const message = String(req.body.message || "").trim();
    const history = Array.isArray(req.body.history) ? req.body.history.slice(-12) : [];
    const mode = String(req.body.mode || "chat");
    if (!message) return res.status(400).json({ error: "Fariin geli marka hore." });

    const system = `You are DRAGON X AI, a helpful beginner-friendly coding assistant.
Use clear explanations and practical code. If the user asks for code, return complete code in fenced code blocks.
If mode is "website", create a complete single-file HTML page with embedded CSS and JavaScript. Return only the HTML inside one html code fence.
If mode is "code", focus on generating or debugging code.
If mode is "app", explain Android app architecture and provide starter code, but never claim that this server compiles an APK.
Be honest about limitations.`;
    const contents = [
      { role: "user", parts: [{ text: system }] },
      ...history.map(item => ({
        role: item.role === "model" ? "model" : "user",
        parts: [{ text: String(item.text || "").slice(0, 12000) }]
      })),
      { role: "user", parts: [{ text: `[Mode: ${mode}]\n${message}` }] }
    ];

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 6000 }
      })
    });
    const data = await upstream.json();
    if (!upstream.ok) {
      const detail = data?.error?.message || "Gemini API request failed";
      return res.status(upstream.status).json({ error: detail });
    }
    const answer = (data.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("\n").trim();
    if (!answer) return res.status(502).json({ error: "AI jawaab kama soo celin. Mar kale isku day." });
    res.json({ answer });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Cilad ayaa dhacday. Hubi internet-ka iyo server-ka." });
  }
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, () => console.log(`DRAGON X AI running on http://localhost:${PORT}`));