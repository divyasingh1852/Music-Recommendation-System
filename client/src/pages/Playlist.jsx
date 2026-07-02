import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MusicImage from "../assets/MusicImage.jpg";  
import server from "../environment.js";


export default function Playlist() {
  const navigate = useNavigate();
  const [playlistItems, setPlaylistItems] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get(`${server}/api/playlist`);
        const items = res.data.songs || [];

        const withImages = items.map((item, idx) => ({
          ...item,
          image: item.image || `https://source.unsplash.com/400x400/?music&sig=${idx}`,
          overview:
            item.overview ||
            "This track blends melody and rhythm beautifully, making it a must‑listen."
        }));

        setPlaylistItems(withImages);
      } catch (err) {
        console.error("Error fetching playlist:", err);
        setPlaylistItems([]);
      }
    };

    fetchPlaylist();
  }, []);

  const handleRemove = async (songId) => {
    try {
      const res = await axios.post(`${server}/api/playlist/remove`,  {
        song_id: songId
      });
      // alert(res.data.message || "Song removed from playlist!");
      setPlaylistItems((prev) => prev.filter((item) => item.song_id !== songId));
    } catch (err) {
      console.error("Error removing song:", err);
      //alert("Failed to remove song.");
    }
  };

  return (
    <div className="watchlist-container">
      <h2>My Playlist 🎶</h2>

      {playlistItems.length === 0 ? (
        <div className="empty-watchlist">
          <p>Your playlist is currently empty.</p>
          <button onClick={() => navigate("/browse")}>Browse Music</button>
        </div>
      ) : (
        <div className="watchlist-grid">
          {playlistItems.map((item) => (
            <div key={item.song_id} className="watchlist-card">
              <img src={item.image} alt={item.track_name || item.title} 
                  onError={(e) => {
                    console.log("Image failed:", item.image);
                    e.target.src = MusicImage;   
                  }}
              />
              <h4>{item.track_name || item.title}</h4>
              <p>{item.artist_name || item.artist}</p>
              <small>{item.album_name || item.release} • {item.year}</small>
              <p className="playlist-description">{item.overview}</p>

              {/* Hover actions */}
              <div className="hover-actions">
                <button
                  className="playlist-viewBtn"
                  onClick={() => navigate(`/song/${item.song_id}`)}
                >
                  View Details
                </button>
                <button
                  className="playlist-trashBtn"
                  onClick={() => handleRemove(item.song_id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
