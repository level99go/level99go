// src/pages/HistoryResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HistoryResult() {
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedScore = parseInt(localStorage.getItem("history_score")) || 0;
    setScore(storedScore);

    const user = JSON.parse(localStorage.getItem("level99_user"));
    if (user) {
      user.answers = user.answers || {};
      user.answers.history = storedScore;

      // 🔹 localStorage yangilash
      localStorage.setItem("level99_user", JSON.stringify(user));

      // 🔹 Backendga yuborish (active users yangilash)
      fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("✅ History natijasi backendga yuborildi:", data);
        })
        .catch((err) => console.error("❌ Yuborishda xato:", err));
    }
  }, []);

  const progress = (score * 2.5 / 50) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-lime-700 relative overflow-hidden p-4">
      {/* Sparkles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 + Math.random() * 3, delay: Math.random() }}
          className="absolute w-2 h-2 bg-white rounded-full blur-sm"
        />
      ))}

      <motion.div
        initial={{ scale: 0.7, opacity: 0, rotateY: -10 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md border border-green-400 space-y-6 relative z-10"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-300 to-green-200 text-transparent bg-clip-text animate-pulse"
        >
          🏁 Tarix Natijasi
        </motion.h1>

        {/* Correct Answers */}
        <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-xl md:text-2xl text-gray-200"
        >
          Siz <span className="text-green-400 font-bold">{score}</span> ta savolga to‘g‘ri javob berdingiz
        </motion.p>

        {/* Score */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.05 }}
          transition={{ repeat: Infinity, repeatType: "mirror", duration: 0.8 }}
          className="text-center text-3xl md:text-4xl font-extrabold text-green-400"
        >
          ✅ Umumiy ball: {score * 2.5} / 50
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 rounded-full h-5 overflow-hidden mt-2 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-gradient-to-r from-green-400 to-lime-300"
          />
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,170,0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/profiles/history")}
          className="w-full mt-6 bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 transition-all py-3 rounded-xl font-bold text-lg shadow-lg text-white"
        >
          👤 Profilga O‘tish
        </motion.button>
      </motion.div>
    </div>
  );
}
