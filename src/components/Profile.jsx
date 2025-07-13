import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");

  const actions = [
    { label: "Quản lý gói đăng ký", icon: "🎧" },
    { label: "Chỉnh sửa thông tin cá nhân", icon: "✏️" },
    { label: "Khôi phục danh sách phát", icon: "🔁" },
  ];

  const filteredActions = actions.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 pb-12 space-y-8 max-w-3xl mx-auto">
      {/* Banner Premium */}
      <div className="bg-gradient-to-r from-purple-700 to-pink-500 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
        <img src="/logo.png" alt="Premium" className="w-24 h-24 rounded-md" />
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Nghe không giới hạn. Dùng thử gói Premium trong 3 tháng với giá 59.000 ₫.
          </h2>
          <p className="text-sm mb-3 text-gray-100">
            Chỉ áp dụng cho người dùng mới. Sau đó là 59.000 ₫/tháng. Có áp dụng điều khoản. Ưu đãi kết thúc vào 15 tháng 7, 2025.
          </p>
          <button className="bg-white text-black font-bold px-4 py-2 rounded-full hover:opacity-90">
            Dùng thử 3 tháng với giá 59.000 ₫
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="relative max-w-xl">
        <input
          type="text"
          placeholder="Tìm kiếm tài khoản hoặc bài viết trợ giúp"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#181818] text-white px-12 py-3 rounded-md border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
      </div>

      {/* Gói của bạn */}
      <div className="bg-[#1f1f1f] p-5 rounded-lg flex justify-between items-center">
        <div>
          <h3 className="text-gray-400 text-sm">Gói của bạn</h3>
          <h2 className="text-xl font-bold">TieM Free</h2>
        </div>
        <img src="/logo.png" alt="Spotify" className="w-6 h-6" />
      </div>

      {/* Tài khoản */}
      <div>
        <h2 className="text-lg font-bold mb-3">Tài khoản</h2>
        <div className="bg-[#1f1f1f] rounded-lg divide-y divide-gray-700">
          {filteredActions.length > 0 ? (
  filteredActions.map((item, index) => (
    <div
      key={index}
      className="flex justify-between items-center p-4 hover:bg-[#2a2a2a] cursor-pointer"
      onClick={() => {
  if (item.label === "Quản lý gói đăng ký") {
    navigate("/account/plan");
  } else if (item.label === "Chỉnh sửa thông tin cá nhân") {
    navigate("/profile/edit");
  } else if (item.label === "Khôi phục danh sách phát") {
    navigate("/playlist/recover");
  }
}}
    >
      <div className="flex items-center gap-3">
        <span>{item.icon}</span>
        <span>{item.label}</span>
      </div>
      <span>➡️</span>
    </div>
  ))
) : (
  <p className="text-sm text-gray-400 p-4">Không tìm thấy kết quả nào.</p>
)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
