import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { texts } from "../constants/texts";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");

  const { language } = useLanguage();
  const t = texts[language] || texts.vi;

  const actions = [
    { label: t.managePlan, icon: "🎧", path: "/account/plan" },
    { label: t.editProfile, icon: "✏️", path: "/profile/edit" },
    { label: t.recoverPlaylist, icon: "🔁", path: "/playlist/recover" },
  ];

  const filteredActions = actions.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 pb-12 space-y-8 max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-purple-700 to-pink-500 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <img src="/logo.png" alt="Premium" className="w-24 h-24 rounded-md" />
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-2">{t.promoTitle}</h2>
          <p className="text-sm mb-3 text-gray-100">{t.promoDesc}</p>
          <button className="bg-white text-black font-bold px-4 py-2 rounded-full hover:opacity-90">
            {t.promoBtn}
          </button>
        </div>
      </div>

      <div className="relative max-w-xl">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#181818] text-white px-12 py-3 rounded-md border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
      </div>

      <div className="bg-[#1f1f1f] p-5 rounded-lg flex justify-between items-center">
        <div>
          <h3 className="text-gray-400 text-sm">{t.yourPlan}</h3>
          <h2 className="text-xl font-bold">TieM Free</h2>
        </div>
        <img src="/logo.png" alt="Spotify" className="w-6 h-6" />
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3">{t.account}</h2>
        <div className="bg-[#1f1f1f] rounded-lg divide-y divide-gray-700">
          {filteredActions.length > 0 ? (
            filteredActions.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 hover:bg-[#2a2a2a] cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                <div className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span>➡️</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 p-4">{t.noResult}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
