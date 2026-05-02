require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
const db = require("./database");

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

// POST /summarize
app.post("/summarize", async (req, res) => {
  try {
    const { title, notes, participants } = req.body;

    const prompt = `
You are an AI meeting assistant. Analyze these meeting notes and return a JSON response.

Meeting Title: ${title}
Participants: ${participants}
Raw Notes: ${notes}

Return ONLY this JSON format:
{
  "summary": "2-3 sentence summary",
  "action_items": [
    {
      "task": "task description",
      "owner": "owner name",
      "priority": "High/Medium/Low"
    }
  ]
}`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const raw = response.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned);

    // Save to database
    db.prepare(`
      INSERT INTO meetings (title, participants, raw_notes, summary, action_items)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      title,
      participants,
      notes,
      result.summary,
      JSON.stringify(result.action_items)
    );

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /history
app.get("/history", (req, res) => {
  try {
    const meetings = db.prepare("SELECT * FROM meetings ORDER BY created_at DESC").all();
    const formatted = meetings.map((m) => ({
      ...m,
      action_items: JSON.parse(m.action_items),
    }));
    return res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});