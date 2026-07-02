import { useState } from "react";
import { searchSongs } from "../api";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleSearch = async () => {

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) {
    setErrorMessage(" Please login or signup to search songs.");
    return;
  }

    if (!query.trim() || loading) return;

    setLoading(true);
     setErrorMessage(""); 
    try {
      const response = await searchSongs(query);

      console.log("FULL RESPONSE:", response.data);

      const results = response.data?.results || [];

      setSongs(results);
    } catch (err) {
      console.log("SEARCH ERROR:", err);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="searchBox">
        <input
          value={query}
          placeholder="Search songs, mood, artists..."
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={handleSearch}>
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
      <SearchResults songs={songs} />
    </>
  );
}