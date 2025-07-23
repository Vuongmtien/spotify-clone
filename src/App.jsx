import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PlaylistCard from "./components/PlaylistCard";
import PlaylistDetail from "./components/PlaylistDetail";
import { playlists } from "./data";
import SearchPage from "./components/SearchPage";
import Navbar from "./components/Navbar";
import PodcastsPage from "./components/PodcastsPage";
import PremiumPage from "./components/PremiumPage";
import SupportPage from "./components/SupportPage";
import DownloadSection from "./components/DownloadSection";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { trendingSongs, popularArtists } from "./components/homeData";
import { useLanguage } from "./context/LanguageContext";
import { texts } from "./constants/texts";
import Profile from "./components/Profile"; 
import PlanManagement from "./components/PlanManagement"; 
import EditProfile from "./components/EditProfile";
import RecoverPlaylist from "./components/RecoverPlaylist";
import PodcastRankings from "./components/PodcastRanking";
import ArtistDetail from "./components/ArtistDetail";




function App() {
  const location = useLocation();
  const hideSidebarRoutes = ["/premium", "/download", "/signup", "/support", "/login","/profile","/account/plan","/profile/edit","/playlist/recover"];
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { language } = useLanguage();
  const t = texts[language] || texts.vi;
  const [showSidebar, setShowSidebar] = useState(false);


  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showBot, setShowBot] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState([]);
  useEffect(() => {
  const closeSidebar = () => setShowSidebar(false);
  window.addEventListener("close-sidebar", closeSidebar);
  return () => window.removeEventListener("close-sidebar", closeSidebar);
}, []);
  useEffect(() => {
  const handler = () => setShowLoginPopup(true);
  window.addEventListener("show-login-popup", handler);
  return () => window.removeEventListener("show-login-popup", handler);
}, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(percent) ? 0 : percent);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentSong]);

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlay = (playlist) => {
    const index = playlists.findIndex((p) => p.title === playlist.title);
    setCurrentIndex(index);
    setCurrentSong(playlist);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 0);
    if (!history.find((h) => h.title === playlist.title)) {
      setHistory((prev) => [...prev, playlist]);
    }
  };
  const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};
  return (
    <div className="flex h-screen bg-black text-white">

    
   
    <Navbar toggleSidebar={() => setShowSidebar(!showSidebar)} />

    
    <div className="flex flex-1 overflow-hidden">
      {!hideSidebarRoutes.includes(location.pathname) && (
        <Sidebar showSidebar={showSidebar} />
      )}

      <div className="flex-1 flex flex-col overflow-y-auto">
    
        <Routes>
          <Route path="/" element={
            <div className="flex-1 p-8 pt-24 bg-gradient-to-b from-gray-800 to-black overflow-y-auto min-h-screen pb-28">
              <h2 className="text-3xl font-bold mb-6">{t.trendingSongs}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
{trendingSongs.map((song, index) => (
  <div
  key={index}
  className="relative bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition group"
>
  <img src={song.image} alt={song.title} className="w-full h-40 object-cover rounded" />
  <h4 className="mt-2 font-semibold truncate">{song.title}</h4>
  <p className="text-gray-400 text-sm truncate">{song.artist}</p>


  <button
    onClick={() => {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        setShowLoginPopup(true);
      } else {
        handlePlay(song);
      }
    }}
    className="absolute bottom-4 right-4 bg-green-500 hover:bg-green-600 rounded-full p-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="20" height="20">
      <path d="M8 5v14l11-7z" />
    </svg>
  </button>
</div>
))}
              </div>

              <h2 className="text-3xl font-bold mb-6">{t.popularArtists}</h2>
<div className="flex gap-6 mb-12">
  {popularArtists.map((artist, index) => (
    <div
      key={index}
      className="text-center cursor-pointer hover:scale-105 transition"
      onClick={() => navigate(`/artist/${artist.name}`)} 
    >
      <img
        src={artist.image}
        alt={artist.name}
        className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mx-auto border-2 border-gray-700"
      />
      <p className="mt-2 text-white">{artist.name}</p>
    </div>
  ))}
</div>

              <h2 className="text-3xl font-semibold mb-4">{t.playlistsForYou}</h2>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div className="bg-[#2c2c2c] h-56 rounded-lg relative overflow-hidden" key={i}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredPlaylists.map((item, index) => (
                    <PlaylistCard
                      key={index}
                      title={item.title}
                      image={item.image}
                      audio={item.audio}
                      artist={item.artist}
                      onPlay={() => handlePlay(item)}
                      onClick={() => navigate(`/playlist/${item.title}`)}
                    />
                  ))}
                </div>
              )}
              {showLoginPopup && (
  <div className="fixed top-1/3 left-1/2 -translate-x-1/2 bg-blue-500 text-black p-6 rounded-xl shadow-lg w-96 z-50">
    <h2 className="text-xl font-bold mb-2">Đăng nhập để tiếp tục</h2>
    <p className="text-sm mb-4">Bạn cần đăng nhập để nghe bài hát.</p>
    <div className="flex justify-end gap-3">
      <button
        className="px-4 py-1 rounded-full font-bold hover:underline"
        onClick={() => setShowLoginPopup(false)}
      >
        Để sau
      </button>
      <button
        className="bg-white text-black font-bold px-4 py-1 rounded-full"
        onClick={() => {
          setShowLoginPopup(false);
          navigate("/login");
        }}
      >
        Đăng nhập
      </button>
    </div>
  </div>
)}
            </div>
          } />
          <Route path="/playlist/recover" element={<RecoverPlaylist />} />
          <Route path="/podcasts/rankings" element={<PodcastRankings />} />
          <Route path="/artist/:artistName" element={<ArtistDetail />} />


          <Route path="/account/plan" element={<PlanManagement />} />
          <Route path="/library" element={
            <div className="flex-1 p-8 pt-24 text-white">
              <h2 className="text-2xl font-semibold mb-4">{t.yourLibrary}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {history.length === 0 ? (
                  <p className="text-gray-400 col-span-full">{t.notPlayed}</p>
                ) : (
                  history.map((item, index) => (
                    <PlaylistCard
                      key={index}
                      title={item.title}
                      image={item.image}
                      artist={item.artist}
                      audio={item.audio}
                      onPlay={() => handlePlay(item)}
                      onClick={() => navigate(`/playlist/${item.title}`)}
                    />
                  ))
                )}
              </div>
            </div>
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />


  <Route
    path="/login"
    element={
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <Login />
      </div>
    }
  />
          <Route path="/podcasts" element={<PodcastsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/download" element={<DownloadSection />} />
          <Route
    path="/signup"
    element={
      <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <Signup />
      </div>
    }
  />
          <Route path="/favorites" element={
            <div className="flex-1 p-8 pt-24 text-white">
              <h2 className="text-2xl font-semibold mb-4">{t.favorites}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {favorites.map((item, index) => (
                  <PlaylistCard
                    key={index}
                    title={item.title}
                    image={item.image}
                    artist={item.artist}
                    audio={item.audio}
                    onPlay={() => handlePlay(item)}
                    onClick={() => navigate(`/playlist/${item.title}`)}
                  />
                ))}
              </div>
            </div>
          } />

          <Route path="/playlist/:title" element={<PlaylistDetail onPlay={handlePlay} />} />
          <Route path="/search" element={<SearchPage onPlay={handlePlay} />} />
        </Routes>
      </div>

      {currentSong && !hideSidebarRoutes.includes(location.pathname) && (
  <footer className="fixed bottom-0 left-0 right-0 h-24 bg-[#181818] border-t border-gray-700 px-6 flex items-center justify-between text-white z-50">
    <div className="flex items-center gap-4">
      <img
        src={currentSong.image}
        alt="thumbnail"
        className="w-14 h-14 object-cover rounded"
      />
      <div>
        <p className="text-sm font-semibold flex items-center gap-2">
          {currentSong.title}
          <button
            title="Add to Favorites"
            onClick={() => {
              const isFav = favorites.some((f) => f.title === currentSong.title);
              if (!isFav) {
                setFavorites([...favorites, currentSong]);
              }
            }}
          >
            ❤️
          </button>
        </p>
        <p className="text-xs text-gray-400">{currentSong.artist || "Unknown artist"}</p>
      </div>
    </div>

    <div className="flex flex-col items-center w-[40%]">
      <div className="flex gap-6 mb-1 text-xl">
        <button onClick={() => {
          if (currentIndex > 0) handlePlay(playlists[currentIndex - 1]);
        }} disabled={currentIndex <= 0}>⏮</button>

        {isPlaying ? (
          <button onClick={() => {
            setIsPlaying(false);
            audioRef.current?.pause();
          }}>⏸</button>
        ) : (
          <button onClick={() => {
            setIsPlaying(true);
            audioRef.current?.play();
          }}>▶️</button>
        )}

        <button onClick={() => {
          if (currentIndex < playlists.length - 1) handlePlay(playlists[currentIndex + 1]);
        }} disabled={currentIndex === playlists.length - 1}>⏭</button>
      </div>

      <div className="flex items-center w-full gap-2">
        <span className="text-xs">{formatTime(audioRef.current?.currentTime || 0)}</span>
        <input
          type="range"
          className="w-full"
          min={0}
          max={audioRef.current?.duration || 0}
          value={audioRef.current?.currentTime || 0}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
          }}
        />
        <span className="text-xs">{formatTime(audioRef.current?.duration || 0)}</span>
      </div>
    </div>

    <div className="flex items-center gap-2 w-36">
      <i className="ri-volume-down-line" />
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={audioRef.current?.volume || 1}
        onChange={(e) => {
          audioRef.current.volume = parseFloat(e.target.value);
        }}
      />
    </div>

    <audio ref={audioRef} src={currentSong?.audio} autoPlay controls className="hidden" />
  </footer>
)}


      {!hideSidebarRoutes.includes(location.pathname) && (
        <button
  onClick={() => setShowBot(true)}
  className="fixed bottom-28 right-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-md z-50"
>
  🤖
</button>
      )}

      {showBot && !hideSidebarRoutes.includes(location.pathname) && (
        <div className="fixed bottom-24 right-4 bg-[#121212] border border-gray-700 text-white p-4 rounded-lg shadow-lg w-64 z-50">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Spotify Assistant</p>
            <button onClick={() => setShowBot(false)}>❌</button>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => {
                const random = playlists[Math.floor(Math.random() * playlists.length)];
                handlePlay(random);
              }}
              className="bg-green-600 hover:bg-green-700 w-full py-1 rounded"
            >
              ▶ Random Song
            </button>
            <button
              onClick={() => {
                audioRef.current?.pause();
                setIsPlaying(false);
              }}
              className="bg-red-500 hover:bg-red-600 w-full py-1 rounded"
            >
              ⏸ Pause
            </button>
            <p className="text-sm text-gray-400">
              {currentSong ? `🎵 ${currentSong.title} - ${currentSong.artist}` : "No song playing"}
            </p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
