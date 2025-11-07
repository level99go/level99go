// src/pages/BiologyResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function BiologyResult() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("level99_user"));

    if (!data) {
      navigate("/register");
      return;
    }

    if (!data.answers) data.answers = {};
    if (!data.answers.biology) data.answers.biology = { score: 0, level: 0 };

    setUser(data);
  }, [navigate]);

  const handleProfile = async () => {
    try {
      if (user) {
        if (!user.id) user.id = crypto.randomUUID();

        // Ma’lumotlarni active-users ga yuborish
        await fetch("http://localhost:5000/api/active-users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }
      navigate("/profiles/biology");
    } catch (err) {
      console.error("❌ ActiveUsers ga yozishda xato:", err);
      navigate("/profiles/biology");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-green-950 p-6">
      <motion.div
        className="bg-black/60 p-10 rounded-3xl shadow-2xl w-full max-w-md text-center border border-green-600 relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-green-400 mb-6 tracking-wider drop-shadow-lg animate-pulse"
        >
          🧬 Biology Test Yakunlandi!
        </motion.h1>

        <motion.p className="text-2xl mb-3 text-white">
          To‘g‘ri javoblar:{" "}
          <span className="text-green-300 font-bold">
            {user.answers.biology.score} / 20
          </span>
        </motion.p>

        <motion.p className="text-2xl font-bold text-teal-300 mb-8 animate-pulse">
          Sizning darajangiz: {user.answers.biology.level || 0} / 50
        </motion.p>

        <motion.button
          onClick={handleProfile}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-3xl text-white font-bold shadow-2xl tracking-wide text-lg"
        >
          Profilga qaytish
        </motion.button>
      </motion.div>
    </div>
  );
}
