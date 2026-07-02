import mongoose from "mongoose";

const VectorSchema = new mongoose.Schema({
  track_id: { type: String, required: true, unique: true },   
  embedding: { type: [Number], required: true },              // vector array (AI-generated)
}, { timestamps: true }); // adds createdAt + updatedAt automatically


const Vector =
  mongoose.models.Vector ||
  mongoose.model("Vector", VectorSchema);

export default Vector;
