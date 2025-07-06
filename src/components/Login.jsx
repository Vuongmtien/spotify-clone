import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { texts } from "../constants/texts";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = texts[language] || texts.vi;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng điền email và mật khẩu!");
      return;
    }

    try {
      const res = await axios.get(
  `http://localhost:3001/users?email=${email.trim().toLowerCase()}&password=${password.trim()}`
);
      if (res.data.length > 0) {
        const user = res.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));
        alert("Đăng nhập thành công!");
        navigate("/");
      } else {
        alert("Sai email hoặc mật khẩu!");
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      alert("Đăng nhập thất bại");
    }
  };

  return (
  <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">
    <div className="w-full max-w-sm mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center">{t.loginTitle}</h1>

      <button className="bg-white text-black font-bold px-4 py-2 rounded w-full hover:scale-105 transition">
        {t.loginGoogle}
      </button>
      <button className="bg-white text-black font-bold px-4 py-2 rounded w-full hover:scale-105 transition">
        {t.loginApple}
      </button>
      <button className="bg-white text-black font-bold px-4 py-2 rounded w-full hover:scale-105 transition">
        {t.loginPhone}
      </button>

      <input
        type="text"
        placeholder={t.emailOrUsername}
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
        onClick={handleLogin}
        className="bg-green-500 px-4 py-2 rounded w-full font-bold hover:scale-105 transition"
      >
        {t.loginTitle}
      </button>

      <p className="text-sm text-center text-gray-300 mt-4">
        {t.noAccount}{" "}
        <span
          className="underline cursor-pointer text-white hover:text-green-400"
          onClick={() => navigate("/signup")}
        >
          {t.signupSpotify}
        </span>
      </p>
    </div>
  </div>
);
};

export default Login;
