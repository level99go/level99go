// src/pages/MathResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, User, Star, Award } from "lucide-react";

export default function MathResult() {
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
    if (!data.answers.math) data.answers.math = { score: 0 };

    // score va levelni yangilab qo‘yish
    const math = data.answers.math;
    math.score = math.score || 0;
    data.level = location.state?.level || math.level || 0;

    setUser(data);
  }, [location.state, navigate]);

  if (!user) return null;

  const score = user.answers?.math?.score || 0;
  const level = user.level || 0;

  const getTitle = () => {
    if (level >= 45) return "🎓 Matematik dahosan!";
    if (level >= 35) return "📘 Zo‘r ishladingiz!";
    if (level >= 20) return "📐 Yaxshi natija!";
    return "🔍 Yana harakat qilish kerak!";
  };

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
      navigate("/profiles/math");
    } catch (err) {
      console.error("❌ ActiveUsers ga yozishda xato:", err);
      navigate("/profiles/math");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1740&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-purple-900/40"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-3xl p-10 text-white space-y-10 border border-white/20"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-yellow-300 drop-shadow-xl tracking-wide"
        >
          {getTitle()}
        </motion.h1>

        {/* User info */}
        <div className="flex justify-center items-center gap-6">
          <motion.img
            src={user.avatar}
            alt={user.name}
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-xl object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-300 text-sm italic">
              📊 Matematika yo‘nalishi
            </p>
          </div>
        </div>

        {/* Results cards */}
        <div className="grid md:grid-cols-2 gap-8 text-center">
          {/* Score */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-emerald-700/40 to-emerald-900/30 border border-emerald-400 shadow-lg"
          >
            <Trophy className="mx-auto w-12 h-12 text-emerald-400 mb-3" />
            <p className="text-lg font-medium">To‘g‘ri javoblar</p>
            <p className="text-3xl font-extrabold text-emerald-300">
              {score} / 20
            </p>
            <div className="mt-3 w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(score / 20) * 100}%` }}
                transition={{ duration: 1 }}
                className="bg-emerald-400 h-3 rounded-full"
              ></motion.div>
            </div>
          </motion.div>

          {/* Level */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-700/40 to-indigo-900/30 border border-blue-400 shadow-lg"
          >
            <Star className="mx-auto w-12 h-12 text-blue-400 mb-3" />
            <p className="text-lg font-medium">Level</p>
            <p className="text-3xl font-extrabold text-blue-300">
              {level} / 50
            </p>
            <div className="mt-3 w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(level / 50) * 100}%` }}
                transition={{ duration: 1 }}
                className="bg-blue-400 h-3 rounded-full"
              ></motion.div>
            </div>
          </motion.div>
        </div>

        {/* Achievement badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/90 to-orange-600/90 shadow-lg">
            <Award className="w-6 h-6 text-white" />
            <span className="font-semibold tracking-wide">
              Sizning yutuqlaringizni saqladik!
            </span>
          </div>
        </motion.div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProfile}  // 🔥 ActiveUsers ga yozib keyin profilga o‘tadi
          className="w-full py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
        >
          <User className="w-6 h-6" /> Profilga o‘tish
        </motion.button>
      </motion.div>
    </div>
  );
}
