import express from "express";
import { explainSong } from "../controllers/genAIController.js";

const router = express.Router();

// Explain why a song is recommended
router.post("/explain", explainSong);

export default router;
