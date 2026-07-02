import express from "express";
import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";

const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const userId = "demoUser"; // replace with real auth later
//     let playlist = await Playlist.findOne({ userId }).populate("songs");

//     if (!playlist) {
//       playlist = new Playlist({ userId, songs: [] });
//       await playlist.save();
//     }

//     res.json(playlist);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch playlist" });
//   }
// });


// GET playlist with full song details
router.get("/", async (req, res) => {
  try {
    const userId = "demoUser"; // replace with real auth later
    let playlist = await Playlist.findOne({ userId });

    if (!playlist) {
      playlist = new Playlist({ userId, songs: [] });
      await playlist.save();
    }

    // Fetch full song details for each song_id string
    const songs = await Song.find({ song_id: { $in: playlist.songs } });

    res.json({ songs });
  } catch (err) {
    console.error("Error fetching playlist:", err);
    res.status(500).json({ error: "Failed to fetch playlist" });
  }
});


// // Add song to playlist
// router.post("/add", async (req, res) => {
//   try {
//     const { songId } = req.body;
//     const userId = "demoUser";

//     const song = await Song.findById(songId);
//     if (!song) return res.status(404).json({ message: "Song not found" });

//     let playlist = await Playlist.findOne({ userId });
//     if (!playlist) {
//       playlist = new Playlist({ userId, songs: [] });
//     }

//     if (!playlist.songs.includes(songId)) {
//       playlist.songs.push(songId);
//       await playlist.save();
//     }

//     res.json({ message: "Song added to playlist successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: "Error adding song to playlist." });
//   }
// });


// Add song to playlist
router.post("/add", async (req, res) => {
  try {
    const { song_id } = req.body;
    const userId = "demoUser";

    let playlist = await Playlist.findOne({ userId });
    if (!playlist) playlist = new Playlist({ userId, songs: [] });

    const song = await Song.findOne({ song_id });
    if (!song) return res.status(404).json({ error: "Song not found" });

    if (playlist.songs.includes(song_id)) {
      return res.status(400).json({ error: "Song already in playlist" });
    }

    playlist.songs.push(song_id);
    await playlist.save();

    const songs = await Song.find({ song_id: { $in: playlist.songs } });
    res.json({ success: true, songs });
  } catch (err) {
    console.error("Error adding to playlist:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove song from playlist
// router.post("/remove", async (req, res) => {
//   try {
//     const { songId } = req.body;
//     const userId = "demoUser";

//     let playlist = await Playlist.findOne({ userId });
//     if (!playlist) return res.status(404).json({ message: "Playlist not found" });

//     playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
//     await playlist.save();

//     res.json({ message: "Song removed from playlist successfully!" });
//   } catch (err) {
//     res.status(500).json({ message: "Error removing song from playlist." });
//   }
// });



// Remove song from playlist
router.post("/remove", async (req, res) => {
  try {
    const { song_id } = req.body;
    const userId = "demoUser";

    const playlist = await Playlist.findOne({ userId });
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    if (!playlist.songs.includes(song_id)) {
      return res.status(400).json({ error: "Song not in playlist" });
    }

    playlist.songs = playlist.songs.filter(id => id !== song_id);
    await playlist.save();

    const songs = await Song.find({ song_id: { $in: playlist.songs } });
    res.json({ success: true, songs });
  } catch (err) {
    console.error("Error removing song from playlist:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
