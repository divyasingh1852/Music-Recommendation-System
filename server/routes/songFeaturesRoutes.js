import express from "express";
import {
  getAllFeatureSongs,
  getExplicitSongs,
  getShortSongs
} from "../controllers/songFeaturesController.js";

const router = express.Router();

router.get("/", getAllFeatureSongs);

router.get("/explicit", getExplicitSongs);

router.get("/short/:maxDuration", getShortSongs);

export default router;
