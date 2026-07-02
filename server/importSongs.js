import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import Song from "./models/Song.js"; // Schema for "songs" collection

dotenv.config();

async function importSongs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");

    // Clear old songs from the "songs" collection
    await Song.deleteMany({});
    console.log(" Old songs deleted from 'songs' collection");

    // Read dataset
    const songs = JSON.parse(fs.readFileSync("data/song.json", "utf-8"));

    // Limit to first 500
    const limitedSongs = songs.slice(0, 500);

    // Insert new songs
    await Song.insertMany(limitedSongs);
    console.log(` Songs imported: ${limitedSongs.length}`);

    process.exit();
  } catch (err) {
    console.error(" Error importing songs:", err);
    process.exit(1);
  }
}

importSongs();
