import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { texts } from "../constants/texts";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = texts[language] || texts.vi;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/users?email=${email.trim().toLowerCase()}`);
      if (res.data.length > 0) {
        alert("Email đã được sử dụng!");
        return;
      }

      await axios.post(
        `${API_URL}/users`,
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim(),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
      alert("Đăng ký thất bại");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center px-4 w-full">
      <div className="w-full max-w-sm mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center">{t.signupTitle}</h1>

        <input
          type="text"
          placeholder="Tên hiển thị"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-800 w-full border border-gray-600 text-white placeholder-gray-400"
        />
        <input
          type="email"
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-800 w-full border border-gray-600 text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-800 w-full border border-gray-600 text-white placeholder-gray-400"
        />

        <button
          onClick={handleSignup}
          className="bg-green-500 px-4 py-2 rounded w-full font-bold hover:scale-105 transition"
        >
          {t.next}
        </button>

        <div className="text-center text-gray-400">{t.or}</div>

        <button className="bg-white text-black font-bold px-4 py-2 rounded w-full hover:scale-105 transition">
          {t.signupGoogle}
        </button>
        <button className="bg-white text-black font-bold px-4 py-2 rounded w-full hover:scale-105 transition">
          {t.signupApple}
        </button>

        <p className="text-sm text-center text-gray-300 mt-4">
          {t.alreadyHaveAccount}{" "}
          <span
            className="underline cursor-pointer text-white hover:text-green-400"
            onClick={() => navigate("/login")}
          >
            {t.loginHere}
          </span>
        </p>

        <p className="text-[11px] text-center text-gray-500 mt-4">
          {t.privacyLine}{" "}
          <span className="underline cursor-pointer">{t.privacyPolicy}</span>{" "}
          {t.byGoogle} <span className="underline cursor-pointer">{t.terms}</span>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
