// src/pages/EnglishResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EnglishResult() {
  const [user, setUser] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage dan user olish
    const data = JSON.parse(localStorage.getItem("level99_user"));

    if (!data) {
      navigate("/register");
      return;
    }

    if (!data.answers) data.answers = {};
    if (!data.answers.english) data.answers.english = { score: 0, level: 0 };

    // level hisoblash
    const score = data.answers.english.score || 0;
    const newLevel = Math.floor((score / 20) * 50);

    data.answers.english.level = newLevel;
    setUser(data);

    localStorage.setItem("level99_user", JSON.stringify(data));

    // Confetti faqat maksimal ball uchun
    if (score === 20) {
      setShowConfetti(true);
      const conf = Array.from({ length: 40 }, () => ({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: -50 - Math.random() * 300,
        size: 6 + Math.random() * 10,
        rotate: Math.random() * 360,
        color: `hsl(${Math.random() * 360}, 90%, 55%)`,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 1.5,
      }));
      setConfetti(conf);
    }
  }, [navigate]);

  const handleProfile = async () => {
    try {
      if (user) {
        if (!user.id) user.id = crypto.randomUUID();

        await fetch("http://localhost:5000/api/active-users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }
      navigate("/profiles/english");
    } catch (err) {
      console.error("❌ ActiveUsers ga yozishda xato:", err);
      navigate("/profiles/english");
    }
  };

  if (!user) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe] to-[#f0f9ff] overflow-hidden px-4">
      {/* Confetti */}
      {showConfetti &&
        confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute rounded-full"
            style={{
              width: c.size,
              height: c.size,
              backgroundColor: c.color,
              left: c.x,
              top: c.y,
            }}
            animate={{ y: window.innerHeight + 50, rotate: 360 + c.rotate }}
            transition={{
              duration: c.duration,
              repeat: Infinity,
              ease: "linear",
              delay: c.delay,
            }}
          />
        ))}

      {/* Result Card */}
      <motion.div
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-gray-200 relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-indigo-600 mb-6 tracking-wide drop-shadow-lg animate-pulse"
        >
          📖 Ingliz tili natijangiz
        </motion.h1>

        <motion.p className="text-xl mb-3 text-gray-800">
          To‘g‘ri javoblar:{" "}
          <span className="text-green-600 font-bold">
            {user.answers.english.score} / 20
          </span>
        </motion.p>

        <motion.p className="text-lg font-semibold text-blue-500 mb-6">
          Sizning darajangiz: {user.answers.english.level} / 50
        </motion.p>

        <motion.button
          onClick={handleProfile}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-3xl text-white font-bold shadow-2xl tracking-wide text-lg"
        >
          Profilga o‘tish
        </motion.button>
      </motion.div>
    </div>
  );
}
