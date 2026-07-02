import mongoose from "mongoose";

const SongMetadataSchema = new mongoose.Schema({
  track_id: { type: String, required: true, unique: true },
  track_name: String,
  track_number: Number,
  track_popularity: Number,
  explicit: Boolean,
  artist_name: String,
  artist_popularity: Number,
  artist_followers: Number,
  artist_genres: [String],
  album_id: String,
  album_name: String,
  album_release_date: Date,
  album_total_tracks: Number,
  album_type: String
});


const SongMetadata =
  mongoose.models.SongMetadata ||
  mongoose.model("SongMetadata", SongMetadataSchema);

export default SongMetadata;