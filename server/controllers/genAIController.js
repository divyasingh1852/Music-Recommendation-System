import { askGenAI } from "../services/genAI.js";

// Explain why a song might be recommended
export const explainSong = async (req, res) => {
  try {
    const { trackName, artistName } = req.body;

    if (!trackName || !artistName) {
      return res.status(400).json({ error: "Track name and artist name are required" });
    }

    const prompt = `Explain why the song "${trackName}" by ${artistName} might be recommended.`;

    const explanation = await askGenAI(prompt);

    //  Add this log here to see what OpenRouter actually returns
    console.log(" GenAI raw response:", explanation);

    res.json({ explanation });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "GenAI explanation failed" });
  }
};
