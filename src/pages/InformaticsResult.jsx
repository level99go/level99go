// src/results/InformaticsResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function InformaticsResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, level } = location.state || {};

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // 🎯 backendga natijalarni yuborish
  useEffect(() => {
    if (score !== undefined && level !== undefined) {
      fetch("http://localhost:5000/active-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Informatics",
          score,
          level,
          createdAt: new Date().toISOString(),
        }),
      }).catch((err) => console.error("❌ Yuborishda xato:", err));
    }
  }, [score, level]);

  useEffect(() => {
    if (level >= 45) {
      setTitle("🧠 Ustoz darajasi!");
      setColor("text-green-500");
    } else if (level >= 30) {
      setTitle("📘 Bilimli foydalanuvchi");
      setColor("text-blue-500");
    } else if (level >= 15) {
      setTitle("📗 Boshlovchi");
      setColor("text-yellow-500");
    } else {
      setTitle("❗ Yana urinib ko‘ring");
      setColor("text-red-500");
    }

    if (score === 20) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 7000);
    }
  }, [level, score]);

  const handleProfile = () => {
    navigate("/profiles/informatics");
  };

  if (score === undefined || level === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600 font-bold">
        ❌ Natijalar topilmadi. Testni boshqatdan bajaring.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-400 flex items-center justify-center px-6 relative overflow-hidden">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center relative"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700 mb-4"
        >
          🚀 Informatika Testi Yakuni
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-2xl font-semibold mb-6 ${color}`}
        >
          {score === 20 ? "🏆 Perfect! Siz mukammalsiz!" : title}
        </motion.p>

        {/* Natija kartochkalari */}
        <div className="grid grid-cols-2 gap-6 text-center mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-100 via-white to-blue-50 py-7 rounded-2xl shadow-lg"
          >
            <p className="text-gray-600 text-lg">Ball</p>
            <p className="text-blue-700 text-4xl font-extrabold">{score} / 20</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-100 via-white to-green-50 py-7 rounded-2xl shadow-lg"
          >
            <p className="text-gray-600 text-lg">Level</p>
            <p className="text-green-700 text-4xl font-extrabold">{level} / 50</p>
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-5 mb-8 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(level / 50) * 100}%` }}
            transition={{ duration: 1.2 }}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 h-5 rounded-full"
          />
        </div>

        {/* Profilga o'tish tugmasi */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleProfile}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-bold py-3 px-10 rounded-2xl shadow-xl transition"
        >
          👤 Profilga o‘tish
        </motion.button>
      </motion.div>
    </div>
  );
}
