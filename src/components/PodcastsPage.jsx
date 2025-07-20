import React from "react";
import Footer from "./Footer";
import { useLanguage } from "../context/LanguageContext";
import { texts } from "../constants/texts";
import { useNavigate } from "react-router-dom";


const categories = [
  "Bảng xếp hạng ", "Sư phạm", "Tài liệu", "Hài kịch", "Văn hoá Pop",
  "Thể dục và dinh dưỡng", "Người nổi tiếng", "Podcast về truyền hình",
  "Sắc đẹp", "Trò chơi điện tử", "Phim ảnh", "Sách"
];

const PodcastsPage = () => {
  const { language } = useLanguage();
  const t = texts[language] || texts.vi;
  const navigate = useNavigate();
  const categoryRoutes = {
    "Bảng xếp hạng ": "/podcasts/rankings",
  };

  return (
    <div className="flex-1 p-8 pt-24 text-white">
      <h1 className="text-5xl font-bold mb-4">{t.podcastTitle}</h1>
      <h2 className="text-xl font-semibold mt-8 mb-4">{t.podcastCategories}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((title, index) => (
          <div
            key={index}
            onClick={() => {
              const route = categoryRoutes[title];
              if (route) navigate(route);
              else alert(`Chức năng "${title}" đang phát triển`);
            }}
            className="cursor-pointer relative rounded-lg p-4 overflow-hidden hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: "#1f2937" }}
          >
            <div className="relative z-10 text-white text-lg font-semibold">{title}</div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PodcastsPage;
