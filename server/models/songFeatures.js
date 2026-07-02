import mongoose from "mongoose";

const SongFeaturesSchema = new mongoose.Schema({
  track_id: { type: String, required: true, unique: true },
  track_number: { type: Number },
  track_popularity: { type: Number },
  track_duration_ms: { type: Number },
  explicit: { type: Boolean },
  artist_name: { type: String },
  artist_popularity: { type: Number },
  artist_followers: { type: Number },
  artist_genres: { type: String },
  album_id: { type: String },
  album_name: { type: String },
  album_release_date: { type: String },
  album_total_tracks: { type: Number },
  album_type: { type: String }
}, { timestamps: true });


const SongFeatures =
  mongoose.models.SongFeatures ||
  mongoose.model("SongFeatures", SongFeaturesSchema);

export default SongFeatures;