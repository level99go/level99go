// src/pages/MathProfile.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users.json";
import { motion } from "framer-motion";
import { Trophy, Camera, Star, MessageCircle, Crown } from "lucide-react";

export default function MathProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [topMath, setTopMath] = useState([]);
  const [topFootball, setTopFootball] = useState([]);
  const [topBoxing, setTopBoxing] = useState([]);
  const [topCyber, setTopCyber] = useState([]);
  const fileInputRef = useRef();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("level99_user"));
    if (!saved || !saved.career?.toLowerCase().includes("matematika")) {
      // Orqaga qaytishni o‘chirib, foydalanuvchini / sahifasiga yuboramiz
      navigate("/", { replace: true });
      return;
    }
    setUser(saved);

    setTopMath(
      users
        .filter((u) => u.career?.includes("Matematika") && u.answers?.math?.level)
        .sort((a, b) => b.answers.math.level - a.answers.math.level)
        .slice(0, 3)
    );
    setTopFootball(
      users
        .filter((u) => u.career?.includes("Futbolchi") && u.level)
        .sort((a, b) => b.level - a.level)
        .slice(0, 3)
    );
    setTopBoxing(
      users
        .filter((u) => u.career?.includes("Bokschi") && u.level)
        .sort((a, b) => b.level - a.level)
        .slice(0, 3)
    );
    setTopCyber(
      users
        .filter((u) => u.career?.includes("Kiberxavfsizlik") && u.level)
        .sort((a, b) => b.level - a.level)
        .slice(0, 3)
    );

    // Brauzer back tugmasini bloklash
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  const handleBackButton = (e) => {
    // Back bosilsa ham foydalanuvchi qoladi
    window.history.pushState(null, document.title, window.location.href);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...user, avatar: reader.result };
      setUser(updated);
      localStorage.setItem("level99_user", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  if (!user) return null;
  const math = user.answers?.math || {};
  const levelPercent = Math.min((math.level / 50) * 100, 100);

  const TopSection = ({ title, icon, list }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/20 rounded-2xl p-5 backdrop-blur-lg shadow-2xl"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      <ul className="space-y-3">
        {list.map((u, i) => (
          <motion.li
            key={u.username}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="flex items-center justify-between bg-white/10 p-3 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <span className="text-yellow-400 font-bold">#{i + 1}</span>
              <img src={u.avatar} className="w-10 h-10 rounded-full border-2 border-purple-400 shadow-lg" />
              <span className="text-white font-medium">{u.name}</span>
            </div>
            <span className="text-green-300 font-semibold">Lv. {u.level || u.answers?.math?.level}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 flex flex-col items-center px-5 py-10 relative overflow-hidden">
      {/* Orqa fon animatsiya */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full space-y-10">
        {/* 🔍 Qidiruv */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate("/search")}
            className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full font-bold shadow-lg hover:scale-105 transition"
          >
            🔍 Qidiruv
          </button>
        </div>

        {/* 👤 Profil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-purple-800/40 to-blue-800/40 border border-white/20 backdrop-blur-xl p-8 rounded-3xl text-white text-center shadow-2xl relative"
        >
          <div className="relative w-fit mx-auto">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-2xl border-4 border-yellow-400 shadow-lg"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-2 right-2 text-sm bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-full shadow-md"
              title="Rasmni yangilash"
            >
              <Camera size={18} />
            </button>
            <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
          </div>

          <h1 className="text-4xl font-extrabold mt-4">{user.name}</h1>
          <p className="text-blue-200 text-lg">@{user.username} · {user.age} yosh</p>

          <div className="mt-6">
            <p className="text-lg font-semibold flex items-center justify-center gap-2">
              <Star className="text-yellow-400" /> Level: {math.level || 0} / 50
            </p>
            <div className="w-full bg-white/20 rounded-full h-4 mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelPercent}%` }}
                transition={{ duration: 1.2 }}
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full shadow-lg"
              />
            </div>
            <p className="text-sm text-gray-300 mt-2">✅ To‘g‘ri javoblar: {math.score || 0} / 20</p>
          </div>

          <div className="mt-4">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-md">
              <Crown size={16} /> 🧠 Matematika dahosi
            </span>
          </div>
        </motion.div>

        {/* 📝 Izoh */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl shadow-xl p-6 text-white"
        >
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <MessageCircle /> Izoh qoldiring
          </h3>
          <textarea
            placeholder="Izohingizni shu yerga yozing..."
            className="w-full bg-black/40 p-3 rounded-2xl text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={3}
          />
          <button className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-purple-600 transition rounded-2xl font-semibold shadow-lg">
            Yuborish
          </button>
        </motion.div>

        {/* 🏆 TOPlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TopSection title="TOP Matematika" icon={<Trophy className="text-yellow-400" />} list={topMath} />
          <TopSection title="TOP Futbolchilar" icon="⚽" list={topFootball} />
          <TopSection title="TOP Bokschilar" icon="🥊" list={topBoxing} />
          <TopSection title="TOP Kiberxavfsizlik" icon="💻" list={topCyber} />
        </div>
      </div>
    </div>
  );
}
