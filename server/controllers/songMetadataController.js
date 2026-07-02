import SongMetadata from "../models/songMetadata.js";

// Get all songs
export const getAllMetadataSongs = async (req, res) => {
  try {
    const songs = await SongMetadata.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metadata songs" });
  }
};

// Get top songs by popularity
export const getTopSongsByPopularity = async (req, res) => {
  try {
    const songs = await SongMetadata.find().sort({ track_popularity: -1 }).limit(10);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top songs" });
  }
};

// Get songs by genre
export const getSongsByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const songs = await SongMetadata.find({ artist_genres: genre });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs by genre" });
  }
};
