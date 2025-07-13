import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [username, setUsername] = useState(savedUser.username || "");
  const [email, setEmail] = useState(savedUser.email || "");
  const [gender, setGender] = useState(savedUser.gender || "Nam");
  const [dob, setDob] = useState(savedUser.dob || { day: "", month: "", year: "" });
  const [country, setCountry] = useState(savedUser.country || "Việt Nam");
  const [agreed, setAgreed] = useState(savedUser.agreed || true);

  const handleSave = () => {
    const updatedUser = {
      ...savedUser,
      username,
      email,
      gender,
      dob,
      country,
      agreed,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    navigate("/profile");
  };

  return (
    
    <div className="min-h-screen bg-black text-white pt-24 px-4 max-w-2xl mx-auto space-y-6">
        <button
    onClick={() => navigate("/profile")}
    className="text-sm text-green-400 hover:underline"
  >
    ← Quay lại trang hồ sơ
  </button>
      <h1 className="text-3xl font-bold">Chỉnh sửa thông tin cá nhân</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Tên người dùng</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#121212] text-white px-4 py-2 rounded border border-gray-700"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#121212] text-white px-4 py-2 rounded border border-gray-700"
          />
        </div>

        <div>
          <label className="block mb-1">Giới tính</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full bg-[#121212] text-white px-4 py-2 rounded border border-gray-700"
          >
            <option>Nam</option>
            <option>Nữ</option>
            <option>Khác</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Ngày sinh</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Ngày"
              value={dob.day}
              onChange={(e) => setDob({ ...dob, day: e.target.value })}
              className="w-1/3 bg-[#121212] text-white px-3 py-2 rounded border border-gray-700"
            />
            <input
              type="text"
              placeholder="Tháng"
              value={dob.month}
              onChange={(e) => setDob({ ...dob, month: e.target.value })}
              className="w-1/3 bg-[#121212] text-white px-3 py-2 rounded border border-gray-700"
            />
            <input
              type="number"
              placeholder="Năm"
              value={dob.year}
              onChange={(e) => setDob({ ...dob, year: e.target.value })}
              className="w-1/3 bg-[#121212] text-white px-3 py-2 rounded border border-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Quốc gia hoặc khu vực</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full bg-[#121212] text-white px-4 py-2 rounded border border-gray-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label>Chia sẻ dữ liệu đăng ký với các nhà cung cấp nội dung Spotify cho mục đích tiếp thị.</label>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => navigate("/profile")}
          className="text-gray-400 hover:underline"
        >
          Hủy
        </button>
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-full"
        >
          Lưu hồ sơ
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
