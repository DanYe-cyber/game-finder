import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Neo Game Finder Backend Running");
});

// 🎮 Search Games
app.get("/games", async (req, res) => {
  try {
    const query = req.query.search;

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&search=${query}`
    );

    const data = await response.json();

    res.json(data);

  } catch (error) {
    res.status(500).json({
      error: "Server Error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});