// import mongoose from "mongoose";

// const playlistSchema = new mongoose.Schema({
//   userId: { type: String, required: true }, 
//   songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
// });

// export default mongoose.model("Playlist", playlistSchema);




import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  songs: [{ type: String }] // store song_id strings directly
});

export default mongoose.model("Playlist", playlistSchema);
