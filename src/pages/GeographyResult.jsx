// src/pages/GeographyResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function GeographyResult() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem("level99_geo_answers")) || [];
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const calculatedLevel = Math.floor((correctCount / 20) * 50);

    setScore(correctCount);
    setLevel(calculatedLevel);

    if (correctCount === 20) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    // 🔹 foydalanuvchini yangilash
    const user = JSON.parse(localStorage.getItem("level99_user"));
    if (user) {
      user.answers = user.answers || {};
      user.answers.geography = { score: correctCount, level: calculatedLevel };

      // localStorage yangilash
      localStorage.setItem("level99_user", JSON.stringify(user));
    }
  }, []);

  const progress = (score / 20) * 100;

  // 🔹 Backendga yuborish va profilga o‘tish
  const handleProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("level99_user"));
      if (user) {
        if (!user.id) user.id = crypto.randomUUID();

        await fetch("http://localhost:5000/api/active-users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }
      navigate("/profiles/geography");
    } catch (err) {
      console.error("❌ Geography natijasini active-users ga yuborishda xato:", err);
      navigate("/profiles/geography");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative p-6 overflow-hidden">
      {/* Background + Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/hand-drawn-world-map_23-2148879006.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-blue-900/70 to-yellow-900/60 backdrop-blur-sm z-0" />

      {/* Confetti */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Result Card */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-xl space-y-6 text-white"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-300 to-green-200 text-transparent bg-clip-text animate-pulse"
        >
          🌍 Geografiya Testi Natijasi
        </motion.h1>

        <div className="bg-green-100/20 p-6 rounded-2xl border border-green-300 shadow-inner space-y-3">
          <p className="text-xl font-semibold text-green-200">✅ To‘g‘ri javoblar:</p>
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold text-green-400"
          >
            {score} / 20
          </motion.p>

          <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-green-400 to-lime-300"
            />
          </div>

          <p className="mt-2 text-lg text-green-200 font-semibold">🧭 Level: {level} / 50</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,170,0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProfile}
          className="w-full mt-6 bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 transition-all py-3 rounded-xl font-bold text-lg shadow-lg text-white"
        >
          🧑‍🏫 Profilga O‘tish
        </motion.button>
      </motion.div>
    </div>
  );
}
