import SongFeatures from "../models/SongFeatures.js";

// Get all songs
export const getAllFeatureSongs = async (req, res) => {
  try {
    const songs = await SongFeatures.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch feature songs" });
  }
};

// Get explicit songs
export const getExplicitSongs = async (req, res) => {
  try {
    const songs = await SongFeatures.find({ explicit: true });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch explicit songs" });
  }
};

// Get short songs under X minutes
export const getShortSongs = async (req, res) => {
  try {
    const { maxDuration } = req.params;
    const songs = await SongFeatures.find({ track_duration_min: { $lt: maxDuration } });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch short songs" });
  }
};
