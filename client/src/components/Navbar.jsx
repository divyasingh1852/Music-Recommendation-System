import { FiSearch, FiUser, FiLogOut, FiSettings, FiList, FiLogIn, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user:", err);
        localStorage.removeItem("user");
      }
    } else {
      setUser(null);
    }
  };

  loadUser(); 
  window.addEventListener("storage", loadUser); 
  window.addEventListener("userUpdated", loadUser); 

  return () => {
    window.removeEventListener("storage", loadUser);
    window.removeEventListener("userUpdated", loadUser);
  };
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="nav-logo" onClick={() => navigate("/")}>
        🎵 MUSICFLIX
      </div>

      <ul className="nav-menu">
        <li className="nav-item" onClick={() => navigate("/")}>Home</li>
        <li className="nav-item" onClick={() => navigate("/search")}>Search</li>
        <li className="nav-item" onClick={() => navigate("/top-rated")}>Top Rated</li>
        <li className="nav-item" onClick={() => navigate("/latest")}>Latest Release</li>
      </ul>

      <div className="nav-actions">
        <FiSearch className="nav-icon" onClick={() => navigate("/search")} />
        <div className="nav-profile">
          <FiUser className="nav-icon" onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown && (
            <div className="profile-dropdown">
              {user ? (
                <>
                  <div className="dropdown-header">
                    <strong>{user.username}</strong>
                    <small>{user.email}</small>
                  </div>
                  <div className="dropdown-item" onClick={() => navigate("/playlist")}>
                    <FiList className="dropdown-icon" /> Playlist
                  </div>
                  <div className="dropdown-item" onClick={() => navigate("/setting")}>
                    <FiSettings className="dropdown-icon" /> Settings
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <FiLogOut className="dropdown-icon" /> Sign Out
                  </div>
                </>
              ) : (
                <>
                  <div className="dropdown-item" onClick={() => navigate("/login")}>
                    <FiLogIn className="dropdown-icon" /> Login
                  </div>
                  <div className="dropdown-item" onClick={() => navigate("/signup")}>
                    <FiUserPlus className="dropdown-icon" /> Sign Up
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
