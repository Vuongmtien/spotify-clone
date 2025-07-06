import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { texts } from "../constants/texts";

const languageList = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
];

function Sidebar({ showSidebar }) {

  const navigate = useNavigate();
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [showLibraryPrompt, setShowLibraryPrompt] = useState(false);
  const [showLikedPrompt, setShowLikedPrompt] = useState(false);

  const { language, changeLanguage } = useLanguage();
  const t = texts[language] || texts.vi;

  const savedUser = localStorage.getItem("user");
  const isLoggedIn = !!savedUser;

  return (
    <>
      <aside
  className={`
    fixed top-0 left-0 z-50 transition-transform duration-300
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:relative
    flex flex-col justify-between
    bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-md
    pt-24 px-4 pb-24 w-64 h-screen
  `}
>
  {showSidebar && (
  <button
    onClick={() => window.dispatchEvent(new CustomEvent("close-sidebar"))}
    className="absolute top-4 right-4 text-white text-2xl md:hidden z-[999]"
  >
    ❌
  </button>
)}
        <div>
          <h1 className="text-2xl font-bold mb-6 text-white">TieM</h1>
          <ul className="space-y-4 text-lg text-white">
            <li
              className="cursor-pointer hover:underline"
              onClick={() => {
                if (!isLoggedIn) {
                  setShowLibraryPrompt(true);
                  setShowLikedPrompt(false);
                } else {
                  navigate("/library");
                }
              }}
            >
              📁 {t.yourLibrary}
            </li>
            <li
              className="cursor-pointer hover:underline"
              onClick={() => {
                if (!isLoggedIn) {
                  setShowLikedPrompt(true);
                  setShowLibraryPrompt(false);
                } else {
                  navigate("/favorites");
                }
              }}
            >
              💖 {t.favorites}
            </li>

            <div className="mt-6 bg-[#121212] text-white p-4 rounded-lg shadow-md">
              <h3 className="text-base font-bold mb-1">
                Hãy cùng tìm và theo dõi một số podcast
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới
              </p>
              <button
                onClick={() => navigate("/podcasts")}
                className="bg-white text-black font-semibold text-sm px-4 py-1 rounded-full hover:scale-105 transition-transform"
              >
                Duyệt xem podcast
              </button>
            </div>
          </ul>
        </div>

        <div className="text-[11px] text-gray-400 space-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="hover:underline cursor-pointer">Pháp lý</span>
            <span className="hover:underline cursor-pointer">Trung tâm an toàn và quyền riêng tư</span>
            <span className="hover:underline cursor-pointer">Chính sách quyền riêng tư</span>
            <span className="hover:underline cursor-pointer">Cookie</span>
            <span className="hover:underline cursor-pointer">Giới thiệu Quảng cáo</span>
            <span className="hover:underline cursor-pointer">Hỗ trợ tiếp cận</span>
          </div>

          <button
            onClick={() => setShowLangPopup(true)}
            className="mt-3 border border-gray-400 rounded-full px-3 py-1 text-sm flex items-center gap-2 hover:border-white hover:text-white"
          >
            🌐 {languageList.find((l) => l.code === language)?.label || "Ngôn ngữ"}
          </button>
        </div>

        {!isLoggedIn && showLibraryPrompt && (
          <div className="absolute top-[145px] left-[260px] bg-blue-400 text-black p-4 rounded-xl shadow-lg w-80 z-50">
            <div className="absolute left-[-8px] top-4 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-blue-400"></div>
            <h2 className="text-lg font-bold mb-1">Tạo danh sách phát</h2>
            <p className="mb-4 text-sm">Đăng nhập để tạo và chia sẻ playlist.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLibraryPrompt(false)}
                className="px-4 py-1 rounded-full font-bold hover:underline"
              >
                Để sau
              </button>
              <button
                className="bg-white text-black font-bold px-4 py-1 rounded-full"
                onClick={() => {
                  navigate("/login");
                  setShowLibraryPrompt(false);
                }}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        )}

        {!isLoggedIn && showLikedPrompt && (
          <div className="absolute top-[190px] left-[260px] bg-blue-400 text-black p-4 rounded-xl shadow-lg w-80 z-50">
            <div className="absolute left-[-8px] top-4 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-blue-400"></div>
            <h2 className="text-lg font-bold mb-1">Tạo danh sách yêu thích</h2>
            <p className="mb-4 text-sm">Đăng nhập để tạo danh sách nhạc yêu thích của bạn.</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowLikedPrompt(false)}
                className="px-4 py-1 rounded-full font-bold hover:underline"
              >
                Để sau
              </button>
              <button
                className="bg-white text-black font-bold px-4 py-1 rounded-full"
                onClick={() => {
                  navigate("/login");
                  setShowLikedPrompt(false);
                }}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        )}
      </aside>

      {showLangPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-[#1f1f1f] text-white w-[90%] max-w-3xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowLangPopup(false)}
              className="absolute top-2 right-3 text-xl text-gray-400 hover:text-white"
            >
              ❌
            </button>

            <h2 className="text-xl font-semibold mb-2">{t.chooseLanguage}</h2>
            <p className="text-sm text-gray-400 mb-4">{t.languageNote}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto">
              {languageList.map((lang) => (
                <div
                  key={lang.code}
                  className={`cursor-pointer hover:bg-gray-700 p-2 rounded text-sm ${
                    language === lang.code ? "bg-gray-600" : ""
                  }`}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setShowLangPopup(false);
                  }}
                >
                  {lang.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
