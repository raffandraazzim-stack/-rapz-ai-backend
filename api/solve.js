module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Gunakan metode POST"
    });
  }

  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "API key belum diatur"
    });
  }

  try {
    const question = String(
      req.body?.question ||
      req.body?.text ||
      req.body?.ocrText ||
      ""
    ).trim();

    if (!question) {
      return res.status(400).json({
        error: "Pertanyaan masih kosong"
      });
    }

    const ai = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          instructions:
            "Kamu adalah RAPZ AI, asisten belajar berbahasa Indonesia. Jawab soal dengan benar dan jelaskan langkah-langkahnya secara mudah dipahami.",
          input: question,
          max_output_tokens: 1200
        })
      }
    );

    const data = await ai.json();

    if (!ai.ok) {
      return res.status(502).json({
        error: data.error?.message || "AI gagal menjawab"
      });
    }

    return res.status(200).json({
      answer: data.output_text || "Tidak ada jawaban."
    });

  } catch (error) {
    return res.status(500).json({
      error: "Terjadi kesalahan server"
    });
  }
};
