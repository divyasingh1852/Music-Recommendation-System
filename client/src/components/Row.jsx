import SongCard from "./SongCard";

export default function Row({ title, songs }) {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="cards">
        {songs.map((song, i) => (
          <SongCard 
            key={i} 
            song={song} 
            fallbackImage="/assets/MusicImage.jpg" 
          />
        ))}
      </div>
    </div>
  );
}
