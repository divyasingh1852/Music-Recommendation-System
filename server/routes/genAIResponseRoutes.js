import express from "express";
import {
  saveGenAIResponse,
  getAllGenAIResponses,
  getResponsesByTrack
} from "../controllers/genAIResponseController.js";

const router = express.Router();

router.post("/save", saveGenAIResponse);

router.get("/", getAllGenAIResponses);

router.get("/:track_id", getResponsesByTrack);

export default router;
