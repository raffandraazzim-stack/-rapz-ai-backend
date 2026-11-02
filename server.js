import express from "express";

const app = express();
app.use(express.json());

app.post("/solve", async (req, res) => {
  try {
    const question = req.body.question;
    if (!question) return res.status(400).json({ error: "Soal kosong" });
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${process.env.AI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-4.1-mini", input: "Jawab soal ini dalam Bahasa Indonesia dengan penjelasan singkat: " + question })
    });
    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message || "AI error" });
    res.json({ answer: data.output_text || "Jawaban tidak tersedia" });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.listen(process.env.PORT || 3000);
