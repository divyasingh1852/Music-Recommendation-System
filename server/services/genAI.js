import "dotenv/config";
import fetch from "node-fetch"; // install if Node <18: npm install node-fetch

// Generate an embedding vector for text
export async function buildSongVector(text) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "text-embedding-3-small", // free embedding model
        input: text
      })
    });

    const data = await response.json();
    return data.data[0].embedding;
  } catch (err) {
    console.error("❌ Embedding error:", err);
    return [];
  }
}

// Ask GenAI for a natural language explanation
export async function askGenAI(prompt) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // free + fast model
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (err) {
    console.error(" Chat error:", err);
    return "Sorry, I couldn’t generate an explanation.";
  }
}
