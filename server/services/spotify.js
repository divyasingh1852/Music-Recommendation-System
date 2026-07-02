// spotify.js
import fetch from "node-fetch";

let accessToken = null;
let tokenExpiry = null;

// Get a fresh access token using Client ID + Secret
export async function getAccessToken() {
  // If we already have a valid token, reuse it
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  accessToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000; // expires_in is in seconds
  return accessToken;
}

// Get track metadata
export async function getSongData(spotifyId) {
  const token = await getAccessToken();
  const res = await fetch(`https://api.spotify.com/v1/tracks/${spotifyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch song data");
  return res.json();
}

// Get audio features (danceability, energy, tempo, etc.)
export async function getAudioFeatures(spotifyId) {
  const token = await getAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/audio-features/${spotifyId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch audio features");
  return res.json();
}
