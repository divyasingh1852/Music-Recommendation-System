import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import songMetadataRoutes from "./routes/songMetadataRoutes.js";
import songFeaturesRoutes from "./routes/songFeaturesRoutes.js";
import genAIRoutes from "./routes/genAIRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import genAIResponseRoutes from "./routes/genAIResponseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import playlistRoutes from "./routes/playlistRoute.js";
import axios from "axios";



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" MongoDB connection error:", err));

// Routes
app.use("/api/songs/metadata", songMetadataRoutes);
app.use("/api/songs/features", songFeaturesRoutes);
app.use("/api/genai", genAIRoutes);
app.use("/api/recommend", recommendationRoutes);
app.use("/api/genairesponse", genAIResponseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlist", playlistRoutes);


app.get("/api/unsplash", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, per_page: 30 },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    //  Collect multiple image URLs
    const urls = response.data.results.map(img => img.urls.small);

    res.json({ urls });   //  send array back
  } catch (err) {
    console.error("Unsplash error:", err.response?.data || err.message);
    res.status(500).json({ error: "Unsplash request failed" });
  }
});



app.get("/", (req, res) => {
  res.send("🎶 Spotify + GenAI backend is running!");
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
