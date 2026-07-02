import { useState } from "react";
import { useEffect } from "react";

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState([]);
   const [message, setMessage] = useState(""); 

  const genres = [
    "Pop","Rock","Jazz","Hip-Hop","Classical","Bollywood",
    "Romantic","Sad","Rap","Electronic","Indie","Folk"
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser.username || "");
      setEmail(storedUser.email || "");
      setSelected(storedUser.preferences || []);
    }
  }, []);


  const toggleGenre = (genre) => {
    if (selected.includes(genre)) {
      setSelected(selected.filter((g) => g !== genre));
    } else {
      setSelected([...selected, genre]);
    }
  };

  const handleSave = () => {
    const updatedUser = {
      username,
      email,
      preferences: selected
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMessage("Settings updated successfully!");
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <h2 className="settings-title">🎵 Settings</h2>

        {/* Profile Section */}
        <section className="settings-section">
          <h3>Profile</h3>
          <div className="settings-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="settings-field">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </section>

        <section className="settings-section">
          <h3>Song Preferences</h3>
          <div className="settings-genres">
            {genres.map((genre) => (
              <button
                key={genre}
                className={`genre-tag ${selected.includes(genre) ? "selected" : ""}`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>

        <button className="settings-save" onClick={handleSave}>
          Save Changes
        </button>


        {message && <p className="settings-msg">{message}</p>}
      </div>
    </div>
  );
}
