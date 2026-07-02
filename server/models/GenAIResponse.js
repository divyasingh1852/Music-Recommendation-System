import mongoose from "mongoose";

const GenAIResponseSchema = new mongoose.Schema({
  track_id: { type: String, required: true },        
  query: { type: String, required: true },           
  explanation: { type: String },                    
  embedding: { type: [Number] },                    
  createdAt: { type: Date, default: Date.now }      
});

export default mongoose.model("GenAIResponse", GenAIResponseSchema);
