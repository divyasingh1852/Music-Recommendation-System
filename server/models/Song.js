import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  song_id: String,
  title: String,
  release: String,
  artist_name: String,
  genre: String,   
  year: Number
});

export default mongoose.model("Song", songSchema);
