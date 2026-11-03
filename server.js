const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    app: "RAPZ AI",
    status: "Aktif"
  });
});

app.post("/solve", (req, res) => {
  res.status(410).json({
    error: "Gunakan endpoint Vercel /api/solve."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`RAPZ AI berjalan di port ${PORT}`);
});
