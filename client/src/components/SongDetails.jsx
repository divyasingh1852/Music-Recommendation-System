import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import server from "../environment.js"; 

export default function SongDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [inPlaylist, setInPlaylist] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await axios.get(`${server}/api/songs/${id}`);
        const data = res.data;
        setSong({
          ...data,
          image: data.image || `https://source.unsplash.com/400x400/?music&sig=${id}`,
          overview:
            data.overview ||
            "This track brings a unique vibe blending melody and rhythm, perfect for music lovers."
        });

        const playlistRes = await axios.get(`${server}/api/playlist`);
        const songs = playlistRes.data.songs || [];

        const inList = songs.some((s) => s.song_id === data.song_id);

        setInPlaylist(inList);
        
      } catch (err) {
        console.error("Error fetching song:", err);
      }
    };
    fetchSong();
  }, [id]);

  const handleAddToPlaylist = async () => {
    try {
      const res = await axios.post(`${server}/api/playlist/add`, {
        song_id: song.song_id,
      });
      // alert(res.data.message || "Song added to playlist successfully!");
      setInPlaylist(true); //  update state
    } catch (err) {
      console.error("Error adding to playlist:", err);
      alert("Failed to add song to playlist.");
    }
  };

  if (!song) return <p>Loading...</p>;

  return (
    <div className="songDetails-page">
      <div className="songDetails-card">
        <div className="songDetails-left">
          <img src={song.image} alt={song.track_name || song.title} />
        </div>
        <div className="songDetails-right">
          <h2>{song.track_name || song.title}</h2>
          <p><strong>Artist:</strong> {song.artist_name || song.artist}</p>
          <p><strong>Album:</strong> {song.album_name || song.release}</p>
          <p><strong>Year:</strong> {song.year}</p>
          <p><strong>Genre:</strong> {song.genre || "Unknown"}</p>
          <p><strong>Rating:</strong> {song.rating || "N/A"}</p>
          <p><strong>Duration:</strong> {song.duration || "N/A"}</p>
          <p className="songDetails-overview">{song.overview}</p>

          {/* Back Button */}
          <button className="songDetails-backBtn" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>

          <button
             className={`songDetails-watchlistBtn ${inPlaylist ? "in-playlist" : ""}`}
             onClick={handleAddToPlaylist}
             disabled={inPlaylist} 
           >
              {inPlaylist ? "In Playlist" : "Add to Playlist"}
          </button>

        </div>
      </div>
    </div>
  );
}







