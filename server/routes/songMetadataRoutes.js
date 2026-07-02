import express from "express";
import {
  getAllMetadataSongs,
  getTopSongsByPopularity,
  getSongsByGenre
} from "../controllers/songMetadataController.js";

const router = express.Router();

router.get("/", getAllMetadataSongs);

router.get("/top", getTopSongsByPopularity);

router.get("/genre/:genre", getSongsByGenre);

export default router;
