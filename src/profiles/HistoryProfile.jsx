// src/profiles/HistoryProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { FaEdit, FaCheckCircle, FaStar } from "react-icons/fa";

export default function HistoryProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("level99_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="text-lg">Foydalanuvchi topilmadi. Iltimos, tizimga kiring.</p>
      </div>
    );
  }

  const score = user.answers?.history || 0;
  const level = Math.floor(score * 2.5);
  const percentage = (score / 20) * 100;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, avatar: reader.result };
      localStorage.setItem("level99_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900 to-green-700 relative overflow-hidden">
      {/* 🌟 Sparkles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, delay: Math.random() }}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-sm"
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-8 relative z-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-40 h-40 rounded-3xl border-4 border-yellow-400 object-cover shadow-xl"
            />
            <label className="absolute bottom-0 right-0 bg-yellow-400 text-black text-sm px-2 py-1 rounded-full cursor-pointer hover:bg-yellow-300 flex items-center gap-1">
              <FaEdit /> O‘zgartirish
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            <span className="absolute top-2 left-2 w-4 h-4 rounded-full bg-green-400 border-2 border-white animate-pulse"></span>
          </div>

          {/* Name & Info */}
          <div className="flex-1 space-y-2">
            <h1 className="text-4xl font-extrabold text-yellow-300">{user.name}</h1>
            <p className="text-lg text-gray-200">📘 Tarix mutaxassisi</p>
            <p className="text-md text-gray-400">👤 @{user.username}</p>
            <div className="flex gap-3 mt-2">
              <span className="bg-green-600 text-white px-3 py-1 rounded-full shadow flex items-center gap-1">
                <FaCheckCircle /> Verified
              </span>
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full shadow flex items-center gap-1">
                Level {level}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-4 rounded-2xl flex flex-col items-center">
            <CircularProgressbar
              value={percentage}
              text={`${score}/20`}
              styles={buildStyles({ textColor: "#fff", pathColor: "#FFD700", trailColor: "#3d3d3d" })}
            />
            <p className="text-yellow-200 mt-2 font-semibold">To‘g‘ri javoblar</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl flex flex-col items-center">
            <CircularProgressbar
              value={(level / 50) * 100}
              text={`Lv. ${level}`}
              styles={buildStyles({ textColor: "#fff", pathColor: "#00FFCC", trailColor: "#3d3d3d" })}
            />
            <p className="text-cyan-200 mt-2 font-semibold">Daraja</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl flex flex-col items-center">
            <FaStar className="text-yellow-400 text-4xl" />
            <p className="text-yellow-300 mt-2 font-semibold">Achievement</p>
            <p className="text-gray-200 text-center text-sm mt-1">Siz tarix yo‘nalishida yetakchisiz!</p>
          </div>
        </div>

        {/* Achievements / Izoh */}
        <div className="bg-white/10 p-6 rounded-2xl space-y-3">
          <h2 className="text-xl font-bold text-yellow-300">🗨️ Izoh va yutuqlar</h2>
          <p className="text-gray-200">
            Siz tarix bo‘yicha bilimlaringizni sinovdan o‘tkazdingiz. Testni qayta topshirish orqali
            natijangizni oshirishingiz mumkin.
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full shadow">Top Historian</span>
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full shadow">Quiz Master</span>
            <span className="bg-green-600 text-white px-4 py-2 rounded-full shadow">Fast Learner</span>
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-full shadow font-bold">📘 Tarix Leader</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/search")}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl shadow-lg transition"
          >
            🔍 Foydalanuvchi qidirish
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/history-intro")}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
          >
            📝 Testni Qayta Topshirish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
