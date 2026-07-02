import { FaHome, FaSearch, FaStar, FaClock, FaSpotify, FaYoutube, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="musicflix-footer">
      <div className="musicflix-footer-content">
        
        {/* Explore Section */}
        <div className="musicflix-footer-section">
          <h4 className="musicflix-footer-title">Explore</h4>
          <ul>
            <li><FaHome /> Home</li>
            <li><FaSearch /> Search</li>
            <li><FaStar /> Top Rated</li>
            <li><FaClock /> Latest Release</li>
          </ul>
        </div>

        {/* Genres Section */}
        <div className="musicflix-footer-section">
          <h4 className="musicflix-footer-title">Genres</h4>
          <ul>
            <li>Pop</li>
            <li>Rock</li>
            <li>Hip-Hop</li>
            <li>Jazz</li>
            <li>Classical</li>
            <li>Electronic</li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="musicflix-footer-section">
          <h4 className="musicflix-footer-title">Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Help Center</li>
          </ul>
        </div>

        {/* Legal Section */}
        <div className="musicflix-footer-section">
          <h4 className="musicflix-footer-title">Legal</h4>
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>

        {/* Social Section */}
        <div className="musicflix-footer-section">
          <h4 className="musicflix-footer-title">Follow Us</h4>
          <div className="musicflix-footer-social">
            <FaSpotify />
            <FaYoutube />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>
      </div>

     

     
      <div className="musicflix-footer-bottom">
        <p>© 2026 MusicFlix. All rights reserved.</p>
        <p className="musicflix-footer-credit">
          Made with <FaHeart className="heart-icon" /> by <span>Divya Singh</span>
        </p>
      </div>

    </footer>
  );
}
