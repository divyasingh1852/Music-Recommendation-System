import Vector from "../models/Vector.js";
import SongMetadata from "../models/songMetadata.js";
import { buildSongVector } from "../services/genAI.js";
import { cosineSimilarity } from "../services/vectorService.js";

export async function recommendSongs(req, res) {
  try {
    const { query, limit = 10 } = req.body;

    console.log("[STEP 0] Request started");

    if (!query) {
      console.log("Missing query");
      return res.status(400).json({ error: "Missing query" });
    }

    console.log("[STEP 1] Query received:", query);

    // STEP 2 - embedding
    console.time("Embedding time");
    const userVector = await buildSongVector(query);
    console.timeEnd(" Embedding time");

    console.log(" [STEP 2] Embedding done:", userVector?.length);

    if (!Array.isArray(userVector) || !userVector.length) {
      console.log(" Embedding failed");
      return res.status(500).json({ error: "Embedding failed" });
    }

    // STEP 3 - DB fetch
    console.time(" DB fetch time");

    const allVectors = await Vector.find({}).limit(500).lean();

    console.timeEnd("DB fetch time");

    console.log("[STEP 3] Vectors fetched:", allVectors.length);

    if (!allVectors.length) {
      return res.status(500).json({ error: "No vectors found" });
    }

    // STEP 4 - similarity
    console.time("similarity time");

    let valid = 0;
    let skipped = 0;

    const scored = [];

    for (const song of allVectors) {
      try {
        const v = song.embedding;

        if (!Array.isArray(v)) {
          skipped++;
          continue;
        }

        if (v.length !== userVector.length) {
          skipped++;
          continue;
        }

        const score = cosineSimilarity(userVector, v);

        if (!isFinite(score)) {
          skipped++;
          continue;
        }

        valid++;

        scored.push({
          track_id: song.track_id,
          score
        });

      } catch (err) {
        console.log("Error in song:", song.track_id);
      }
    }

    console.timeEnd(" similarity time");

    console.log(" Valid songs:", valid);
    console.log(" Skipped songs:", skipped);

    if (!scored.length) {
      console.log(" No scored results");
      return res.json({ query, results: [] });
    }

    // STEP 5 - sort
    console.time(" sorting time");
    scored.sort((a, b) => b.score - a.score);
    console.timeEnd("⏱ sorting time");

    const top = scored.slice(0, limit);

    console.log(" Top IDs:", top.map(t => t.track_id));

    // STEP 6 - metadata
    console.time("metadata fetch");

    const trackIds = top.map(t => t.track_id);

    const metadata = await SongMetadata.find({
      track_id: { $in: trackIds }
    }).lean();

    console.timeEnd(" metadata fetch");

    console.log(" Metadata count:", metadata.length);

    // STEP 7 - merge
    const results = top.map(t => {
      const meta = metadata.find(m => m.track_id === t.track_id);

      return {
        track_id: t.track_id,
        similarity: t.score,
         _id: meta?._id,              
        ...(meta || {})
      };
    });

       console.log(" FINAL RESULTS:", results.length);

    return res.json({
      query,
      count: results.length,
      results
    });

  } catch (err) {
    console.error(" FULL ERROR:", err);
    return res.status(500).json({
      error: "Server crashed"
    });
  }
}