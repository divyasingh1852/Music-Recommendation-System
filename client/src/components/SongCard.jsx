import MusicImage from "../assets/MusicImage.jpg"; 
export default function SongCard({ song }) {
  const formatDuration = (ms) => {
    if (!ms) return "";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const getImageUrl = (song) => {
    if (song.image) return song.image;
     if (!song?.track_name) return MusicImage;  // use imported image
    return `https://source.unsplash.com/400x400/?music,${encodeURIComponent(song.track_name)}`;
  };

  return (
    <div className="songCardContainer">
      {/* Image section */}
      <div className="songCardImageWrapper">
        <img
          src={getImageUrl(song)}
          alt={song.track_name}
          className="songCardImage"
          onError={(e) => {
            console.log("Image failed:", e.target.src);
            e.target.src = MusicImage;   
         }}
        />
      </div>

      {/* Details section */}
      <div className="songCardDetails">
        <h3 className="songCardTitle">{song.track_name}</h3>
        <p className="songCardArtist">{song.artist_name}</p>
        {song.album_name && (
          <small className="songCardAlbum">{song.album_name}</small>
        )}
        {song.duration_ms && (
          <small className="songCardDuration">
            ⏱ {formatDuration(song.duration_ms)}
          </small>
        )}
        {song.similarity && (
          <small className="songCardSimilarity">
            ⭐ {song.similarity.toFixed(2)}
          </small>
        )}
      </div>
    </div>
  );
}    //correct






