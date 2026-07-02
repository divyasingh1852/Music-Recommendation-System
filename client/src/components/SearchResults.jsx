import SongCard from "./SongCard";

export default function SearchResults({ songs = [] }) {
  if (!songs.length) {
    return (
      <div className="empty">
        Search something to see recommendations 🎵
      </div>
    );
  }

  return (
    <div className="results">
      {songs.map((song, idx) => (
        <SongCard 
          key={song._id || song.track_id || idx}  
          song={song} 
        />
      ))}
    </div>
  );
}
