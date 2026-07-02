import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1 className="hero-title">Feel The Music 🎶</h1>
        <h2 className="hero-tagline">
                 Discover Music <span className="ai-highlight">Through AI</span>
         </h2>

        <p className="hero-subtitle">
          Stop scrolling endlessly. Let AI recommend songs based on your mood & taste.
        </p>
        <button className="hero-btn" onClick={() => navigate("/browse")}>
          Browse Music
        </button>
      </div>
    </section>
  );
}

