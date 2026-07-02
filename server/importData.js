import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import SongMetadata from "./models/songMetadata.js";
import SongFeatures from "./models/songFeatures.js";
import Vector from "./models/vector.js";

//  Correct imports: buildSongVector from genAI.js, cosineSimilarity from vectorService.js
import { buildSongVector, askGenAI } from "./services/genAI.js";
import { cosineSimilarity } from "./services/vectorService.js";

dotenv.config();

async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");

    // Load datasets
    const metadataSongs = JSON.parse(fs.readFileSync("./data/spotify_data.json", "utf-8"));
    const featureSongs = JSON.parse(fs.readFileSync("./data/track_data.json", "utf-8"));

    // 1. SongMetadata (skip duplicates)
    console.log(" Importing SongMetadata...");
    const existingMetaIds = await SongMetadata.distinct("track_id");
    const newMetadata = metadataSongs.filter(song => !existingMetaIds.includes(song.track_id));

    if (newMetadata.length > 0) {
      await SongMetadata.insertMany(newMetadata, { ordered: false });
      console.log(` Inserted ${newMetadata.length} new SongMetadata`);
    } else {
      console.log(" No new SongMetadata to insert");
    }

    // 2. SongFeatures (skip duplicates)
    console.log(" Importing SongFeatures...");
    const existingFeatureIds = await SongFeatures.distinct("track_id");
    const newFeatures = featureSongs.filter(song => !existingFeatureIds.includes(song.track_id));

    if (newFeatures.length > 0) {
      await SongFeatures.insertMany(newFeatures, { ordered: false });
      console.log(` Inserted ${newFeatures.length} new SongFeatures`);
    } else {
      console.log(" No new SongFeatures to insert");
    }

    // 3. Vectors (chunked + upsert)
    console.log(" Importing Vectors...");
    const existingVectorIds = await Vector.distinct("track_id");
    const songsWithoutVector = metadataSongs.filter(song => !existingVectorIds.includes(song.track_id));

    const chunkSize = 100;
    for (let i = 0; i < songsWithoutVector.length; i += chunkSize) {
      const chunk = songsWithoutVector.slice(i, i + chunkSize);

      await Promise.all(chunk.map(async (song) => {
        try {
          const text = `${song.track_name} by ${song.artist_name}`;
          const embedding = await buildSongVector(text);

          await Vector.updateOne(
            { track_id: song.track_id },
            { $set: { embedding } },
            { upsert: true }
          );

          console.log(` Vector processed for: ${song.track_id}`);
        } catch (err) {
          console.error(` Vector insert failed for: ${song.track_id}`, err.message);
        }
      }));

      console.log(` Finished chunk ${i / chunkSize + 1}`);
    }

    // Final counts
    console.log(` Metadata count: ${await SongMetadata.countDocuments()}`);
    console.log(` Features count: ${await SongFeatures.countDocuments()}`);
    console.log(` Vectors count: ${await Vector.countDocuments()}`);

    console.log(" Resume import finished!");
    process.exit();
  } catch (error) {
    console.error(" Import failed:", error);
    process.exit(1);
  }
}

importData();






//Importing without chunks

// import fs from "fs";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// import SongMetadata from "./models/songMetadata.js";
// import SongFeatures from "./models/songFeatures.js";
// import Vector from "./models/vector.js";
// import { buildSongVector } from "./services/genAI.js";

// dotenv.config();

// async function importData() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log(" MongoDB connected");

//     const metadataSongs = JSON.parse(
//       fs.readFileSync("./data/spotify_data.json", "utf-8")
//     );
//     const featureSongs = JSON.parse(
//       fs.readFileSync("./data/track_data.json", "utf-8")
//     );

//     await SongMetadata.deleteMany();
//     await SongFeatures.deleteMany();
//     await Vector.deleteMany();
//     console.log(" Old collections cleared");

//     // Insert metadata + vectors
//     for (const song of metadataSongs) {
//       if (typeof song.explicit === "string") {
//         song.explicit = song.explicit.toLowerCase() === "true";
//       }

//       console.log(" Processing:", song.track_id, song.track_name);

//       try {
//         await SongMetadata.create(song);
//       } catch (err) {
//         console.error(" Metadata insert failed for:", song.track_id, err.message);
//         continue;
//       }

//       const text = `${song.track_name} by ${song.artist_name}, album: ${song.album_name}, genre: ${song.artist_genres || ""}`;
//       let embedding;
//       try {
//         embedding = await buildSongVector(text);
//       } catch (err) {
//         console.error(" Embedding failed for:", song.track_id, song.track_name, err.message);
//         continue;
//       }

//       try {
//         await Vector.create({
//           track_id: song.track_id,
//           embedding
//         });
//         console.log(" Vector inserted for:", song.track_id);
//       } catch (err) {
//         console.error(" Vector insert failed for:", song.track_id, err.message);
//       }
//     }

//     console.log(` Finished metadata + vectors loop`);

//     // Insert features
//     for (const song of featureSongs) {
//       if (typeof song.explicit === "string") {
//         song.explicit = song.explicit.toLowerCase() === "true";
//       }
//       try {
//         await SongFeatures.create(song);
//       } catch (err) {
//         console.error(" Feature insert failed for:", song.track_id, err.message);
//       }
//     }
//     console.log(` Finished features loop`);

//     console.log(" Counts:");
//     console.log("Metadata:", await SongMetadata.countDocuments());
//     console.log("Features:", await SongFeatures.countDocuments());
//     console.log("Vectors:", await Vector.countDocuments());

//     console.log(" Import complete!");
//     process.exit();
//   } catch (error) {
//     console.error(" Import failed:", error);
//     process.exit(1);
//   }
// }

// importData();

