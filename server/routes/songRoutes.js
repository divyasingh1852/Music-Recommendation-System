import express from "express";
import Song from "../models/Song.js"; // import your Song model

const router = express.Router();

// GET all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find(); // limit for frontend
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

// // GET song by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) return res.status(404).json({ error: "Song not found" });
//     res.json(song);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch song" });
//   }
// });

// GET song by song_id
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findOne({ song_id: req.params.id });
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch song" });
  }
});


// POST new song
router.post("/", async (req, res) => {
  try {
    const newSong = new Song(req.body);
    await newSong.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ error: "Failed to add song" });
  }
});

// DELETE song
router.delete("/:id", async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete song" });
  }
});

export default router;
