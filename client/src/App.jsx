import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Row from "./components/Row";
import SearchBar from "./components/SearchBar";
import SongDetails from "./components/SongDetails";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BrowseMusic from "./pages/BrowseMusic";
import Settings from "./pages/Setting";
import { latestReleases, popularNow, topRated, browseByGenre } from "./data";
import Playlist from "./pages/Playlist";


function Home() {
  return (
    <>
      <Hero />
      <div className="rows">
        <Row title="Latest Release" songs={latestReleases} />
        <Row title="Popular Now" songs={popularNow} />
        <Row title="Top Rated" songs={topRated} />
        <Row title="Browse by Genre" songs={browseByGenre} />
      </div>
    </>
  );
}


function Search() {
  return (
    <div className="searchPage">
      <h1>Find Your Next Song</h1>
      <SearchBar />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/song/:id" element={<SongDetails />} /> 
         <Route path="/signup" element={<Signup />} />   
        <Route path="/login" element={<Login />} />     

        <Route path="/playlist" element={<Playlist />} />
        <Route path="/browse" element={<BrowseMusic />} />
          <Route path="/song/:id" element={<SongDetails />} />


           <Route path="/top-rated" element={<BrowseMusic />} />   
        <Route path="/latest" element={<BrowseMusic />} />     

          <Route path="/setting" element={<Settings />} />
      </Routes>
      <Footer /> 
    </>
  );
}
