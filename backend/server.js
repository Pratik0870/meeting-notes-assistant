require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
const db = require("./database");
const multer = require("multer");
const fs = require("fs");

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/summarize", upload.single("audio"), async (req, res) => {
  try {
    let { title, notes, participants } = req.body;

    if (req.file) {
      const ext = req.file.originalname.split(".").pop();
      const newPath = req.file.path + "." + ext;
      fs.renameSync(req.file.path, newPath);
      const audioStream = fs.createReadStream(newPath);
      const transcription = await groq.audio.transcriptions.create({
        file: audioStream,
        model: "whisper-large-v3",
      });
      notes = transcription.text;
      fs.unlinkSync(newPath);
    }

    if (!notes) {
      return res.status(400).json({ success: false, message: "No notes or audio provided" });
    }

    const prompt = `You are an AI meeting assistant. Analyze these meeting notes and return a JSON response.

Meeting Title: ${title}
Participants: ${participants}
Raw Notes: ${notes}

Return ONLY this JSON format, no extra text:
{
  "summary": "2-3 sentence summary",
  "tags": ["tag1", "tag2", "tag3"],
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

    db.prepare("INSERT INTO meetings (title, participants, raw_notes, summary, tags, action_items) VALUES (?, ?, ?, ?, ?, ?)")
      .run(title, participants, notes, result.summary, JSON.stringify(result.tags), JSON.stringify(result.action_items));

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/history", (req, res) => {
  try {
    const meetings = db.prepare("SELECT * FROM meetings ORDER BY created_at DESC").all();
    const formatted = meetings.map((m) => ({
      ...m,
      tags: JSON.parse(m.tags),
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