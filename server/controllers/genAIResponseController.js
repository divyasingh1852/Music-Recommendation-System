import GenAIResponse from "../models/GenAIResponse.js";
import { askGenAI, buildSongVector } from "../services/genAI.js";

// Save a GenAI explanation for a song
export const saveGenAIResponse = async (req, res) => {
  try {
    const { track_id, query } = req.body;

    // Call GenAI to generate explanation
    const explanation = await askGenAI(query);

    // Optionally generate embedding for the query
    const embedding = await buildSongVector(query);

    // Save in MongoDB
    const response = await GenAIResponse.create({
      track_id,
      query,
      explanation,
      embedding
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to save GenAI response" });
  }
};

// Get all GenAI responses
export const getAllGenAIResponses = async (req, res) => {
  try {
    const responses = await GenAIResponse.find();
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch GenAI responses" });
  }
};

// Get GenAI responses for a specific track
export const getResponsesByTrack = async (req, res) => {
  try {
    const { track_id } = req.params;
    const responses = await GenAIResponse.find({ track_id });
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch responses for track" });
  }
};
