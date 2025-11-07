// src/pages/ChemistryResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function ChemistryResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("level99_user"));

    if (!data) {
      navigate("/register");
      return;
    }

    if (!data.answers) data.answers = {};
    if (!data.answers.chemistry)
      data.answers.chemistry = { score: 0, level: 0 };

    // Agar state orqali level yuborilgan bo‘lsa, ustunlik beriladi
    if (location.state?.level) {
      data.answers.chemistry.level = location.state.level;
    }

    setUser(data);
  }, [navigate, location.state]);

  const getTitle = () => {
    if (!user) return "";
    const level = user.answers.chemistry.level || 0;
    if (level >= 45) return "🧪 Kimyo Professori!";
    if (level >= 30) return "🔬 Yaxshi Bilim!";
    return "📘 Yana Harakat Qiling!";
  };

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
      navigate("/profiles/chemistry");
    } catch (err) {
      console.error("❌ ActiveUsers ga yozishda xato:", err);
      navigate("/profiles/chemistry");
    }
  };

  if (!user) return null;

  const level = user.answers.chemistry.level || 0;
  const score = user.answers.chemistry.score || 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white">
      <motion.div
        className="bg-white/10 backdrop-blur-xl border border-purple-500/40 rounded-3xl p-10 w-full max-w-2xl shadow-2xl text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Dekoratsiya */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-ping"></div>

        <h1 className="text-4xl font-extrabold text-cyan-300 drop-shadow-lg animate-bounce">
          {getTitle()}
        </h1>
        <p className="text-lg mt-4 text-gray-200">
          {user.name}, siz kimyo testini yakunladingiz!
        </p>

        {/* Natija */}
        <div className="mt-8 space-y-4">
          <p className="text-xl font-semibold text-green-300">
            ✅ To‘g‘ri javoblar: <span className="text-white">{score} / 20</span>
          </p>
          <p className="text-xl font-semibold text-yellow-300">
            🧪 Level: <span className="text-white">{level} / 50</span>
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded-full h-4 mt-4 overflow-hidden">
            <div
              className="h-4 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500 transition-all duration-700"
              style={{ width: `${(level / 50) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Button */}
        <motion.button
          onClick={handleProfile}
          className="mt-8 px-8 py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-green-500 via-cyan-500 to-purple-600 
          hover:from-green-600 hover:via-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          whileTap={{ scale: 0.95 }}
        >
          👤 Kimyo Profilga o‘tish
        </motion.button>
      </motion.div>
    </div>
  );
}
