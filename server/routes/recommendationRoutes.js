import express from "express";
import { recommendSongs } from "../controllers/recommendationController.js";

const router = express.Router();

router.post("/", recommendSongs);

export default router;
