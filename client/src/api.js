import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080"
});

export const searchSongs = (query) => {
  return API.post("/api/recommend", {
    query,
    limit: 10
  });
};