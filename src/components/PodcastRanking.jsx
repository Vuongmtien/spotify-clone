import React from "react";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";
import { texts } from "../constants/texts";

const PodcastRankings = () => {
  const { language } = useLanguage();
  const t = texts[language] || texts.vi;

  const topPodcasts = [
    { title: "Podcast Tâm Sự Đêm Khuya", author: "Ngọc Trinh", image: "https://via.placeholder.com/80" },
    { title: "Cà Phê Sáng", author: "Hải Yến", image: "https://via.placeholder.com/80" },
    { title: "Khởi nghiệp 4.0", author: "Minh Khoa", image: "https://via.placeholder.com/80" },
  ];

  return (
    <div className="text-white p-8 pt-24 min-h-screen bg-black">
      <h1 className="text-4xl font-bold mb-6">{t.podcastRankingsTitle || "Bảng xếp hạng Podcast"}</h1>

      <div className="space-y-4">
        {topPodcasts.map((podcast, index) => (
          <div key={index} className="flex items-center bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <span className="text-2xl font-bold w-10">{index + 1}</span>
            <img src={podcast.image} alt={podcast.title} className="w-16 h-16 rounded object-cover mr-4" />
            <div>
              <h3 className="font-semibold">{podcast.title}</h3>
              <p className="text-gray-400 text-sm">{podcast.author}</p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PodcastRankings;