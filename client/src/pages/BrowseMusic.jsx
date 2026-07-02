import { useState, useEffect } from "react";
import axios from "axios";
import SearchResults from "../components/SearchResults";
import { useNavigate } from "react-router-dom";
import MusicImage from "../assets/MusicImage.jpg";   
import server from "../environment.js";

export default function BrowseMusic() {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [songs, setSongs] = useState([]);
  const [pageSongs, setPageSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const songsPerPage = 50;

  const genres = [
    "All", "Pop", "Rock", "Hip-Hop", "Jazz", "Classical",
    "Electronic", "R&B", "Country", "Reggae", "Metal", "Indie"
  ];

  useEffect(() => {
    handleGenreClick("All");
  }, []);

  //  Fetch multiple images for a genre
  const fetchGenreImages = async (genre) => {
    try {
     const resImg = await axios.get(`${server}/api/unsplash`,{
        params: { query: `${genre} music` }
      });
      return resImg.data.urls || [];
    } catch {
      return [];
    }
  };

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setLoading(true);

    try {
      let results = [];

      if (genre === "All") {
        const res = await axios.get(`${server}/api/songs`);
        results = res.data || [];
      } else {
        const res = await axios.post(`${server}/api/recommend`, { query: genre });
        results = res.data?.results || [];
      }

      setSongs(results);
    } catch (err) {
      console.error("Error fetching songs:", err);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);

  //  Attach images only for current page
  useEffect(() => {
    const attachImages = async () => {
      try {
        const updated = await Promise.all(
          currentSongs.map(async (song, idx) => {
            const g = song.genre || "music";
            const urls = await fetchGenreImages(g);
            const image = urls.length > 0 ? urls[idx % urls.length] : MusicImage; //  fallback
            return { ...song, image };
          })
        );
        setPageSongs(updated);
      } catch (err) {
        console.error("Error attaching images:", err);
      }
    };

    if (currentSongs.length > 0) {
      attachImages();
    }
  }, [currentPage, songs]);

  return (
    <div className="browse-container">
      <h2>Browse Music 🎵</h2>

      {/* Genre Buttons */}
      <div className="genre-buttons">
        {genres.map((g) => (
          <button
            key={g}
            className={selectedGenre === g ? "active" : ""}
            onClick={() => handleGenreClick(g)}
          >
            {loading && selectedGenre === g ? "Loading..." : g}
          </button>
        ))}
      </div>

      {/* Song Grid */}
      <div className="song-grid">
        {pageSongs.map((song, idx) => (
          <div key={idx} className="song-card">
            <div className="song-card-imageWrapper">
              <img
                src={song.image || MusicImage}
                alt={song.track_name || song.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
                onError={(e) => {
                  console.log("Image failed:", song.image);
                  e.target.src = MusicImage;   
                }}
              />
              {song.song_id ? (
                <button
                  className="song-card-overlayBtn"
                  onClick={() => navigate(`/song/${song.song_id}`)}
                >
                  View Details
                </button>
              ) : (
                <button className="song-card-overlayBtn disabled">
                  No Details
                </button>
              )}
            </div>
            <h4>{song.track_name || song.title}</h4>
            <p>{song.artist_name || song.artist}</p>
            <small>{song.album_name || song.release} • {song.year}</small>
          </div>
        ))}
      </div>

      {/* Results */}
      <SearchResults songs={pageSongs} />

      {/* Pagination */}
      {songs.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Details Modal */}
      {selectedSong && (
        <div className="songDetails-overlay">
          <div className="songDetails-card">
            <button
              className="songDetails-close"
              onClick={() => setSelectedSong(null)}
            >
              
            </button>
            <div className="songDetails-left">
              <img
                src={selectedSong.image || MusicImage}
                alt={selectedSong.track_name || selectedSong.title}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
            </div>
            <div className="songDetails-right">
              <h2>{selectedSong.track_name || selectedSong.title}</h2>
              <p><strong>Artist:</strong> {selectedSong.artist_name || selectedSong.artist}</p>
              <p><strong>Album:</strong> {selectedSong.album_name || selectedSong.release}</p>
              <p><strong>Year:</strong> {selectedSong.year}</p>
              <p><strong>Genre:</strong> {selectedSong.genre || "Unknown"}</p>
              <p className="songDetails-overview">
                {selectedSong.overview || "No description available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
