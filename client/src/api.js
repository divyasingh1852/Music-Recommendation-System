import axios from "axios";
import server from "./environment.js"; 

const API = axios.create({
  //baseURL: "http://localhost:8080"
    baseURL: server
});

export const searchSongs = (query) => {
  return API.post("/api/recommend", {
    query,
    limit: 10
  });
};