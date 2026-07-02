import dotenv from "dotenv";
import { buildSongVector } from "./services/genAI.js";

dotenv.config();

async function run() {
  try {
    const query = "hello world";
    const embedding = await buildSongVector(query);
    console.log(" Embedding length:", embedding.length);
    console.log(" First 5 values:", embedding.slice(0, 5));
  } catch (err) {
    console.error(" Embedding test failed:", err);
  }
}

run();
