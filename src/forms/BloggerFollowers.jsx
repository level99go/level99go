// src/forms/BloggerFollowers.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MIN_FOLLOWERS = {
  Instagram: 10000,
  YouTube: 10000,
  TikTok: 10000,
};

export default function BloggerFollowers() {
  const navigate = useNavigate();
  const [platforms, setPlatforms] = useState([]);
  const [followers, setFollowers] = useState({});
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("level99_user")) || {};
    const selected = user.answers?.blogger?.platforms || [];
    if (!selected || selected.length === 0) {
      navigate("/blogger");
    } else {
      setPlatforms(selected);
      setUsername(user.username || "Unknown");
    }
  }, [navigate]);

  const handleChange = (platform, value) => {
    const num = Number(value);
    setFollowers((prev) => ({
      ...prev,
      [platform]: isNaN(num) ? 0 : num,
    }));
  };

  const handleSubmit = () => {
    const eligiblePlatforms = platforms.filter(
      (p) => (followers[p] || 0) >= (MIN_FOLLOWERS[p] || 0)
    );

    const updatedUser = JSON.parse(localStorage.getItem("level99_user")) || {};
    updatedUser.answers = {
      ...updatedUser.answers,
      blogger: {
        platforms,
        followers,
        eligiblePlatforms,
      },
    };
    localStorage.setItem("level99_user", JSON.stringify(updatedUser));

    if (eligiblePlatforms.length > 0) {
      const adminQueue = JSON.parse(localStorage.getItem("level99_admin_queue")) || [];
      adminQueue.push({
        username,
        platforms: eligiblePlatforms,
        followers,
      });
      localStorage.setItem("level99_admin_queue", JSON.stringify(adminQueue));
    }

    navigate("/blogger-result");
  };

  const floatingElements = [
    { emoji: "♡", size: 16, x: 20, y: 50, delay: 0 },
    { emoji: "★", size: 24, x: 80, y: 300, delay: 1 },
    { emoji: "💜", size: 20, x: 150, y: 100, delay: 2 },
    { emoji: "🔥", size: 18, x: 250, y: 400, delay: 3 },
    { emoji: "✨", size: 22, x: 300, y: 150, delay: 4 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100 p-6 relative overflow-hidden">
      {/* Floating decorative emojis */}
      {floatingElements.map((el, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{
            fontSize: `${el.size}px`,
            left: el.x,
            top: el.y,
            opacity: 0.25,
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 6 + idx, repeat: Infinity, delay: el.delay, ease: "easeInOut" }}
        >
          {el.emoji}
        </motion.div>
      ))}

      {/* Background floating gradient bubbles */}
      <motion.div
        className="absolute w-40 h-40 bg-pink-300 rounded-full top-10 left-10 opacity-20"
        animate={{ y: [0, -25, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-yellow-300 rounded-full bottom-20 right-5 opacity-20"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-red-300 rounded-full top-1/2 right-1/3 opacity-15"
        animate={{ y: [0, -15, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main form container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-3xl rounded-4xl p-12 w-full max-w-lg space-y-6 relative z-10"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-pink-600 drop-shadow-lg animate-pulse"
        >
          📊 Obunachilar soni
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 mb-6"
        >
          Har bir platformadagi umumiy followerlaringiz sonini kiriting.
        </motion.p>

        {/* Inputs */}
        {platforms.map((platform, idx) => (
          <motion.div
            key={platform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
            className="space-y-2"
          >
            <label className="block text-gray-700 font-medium">{platform} obunachilaringiz soni:</label>
            <motion.input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="Masalan: 15000"
              value={followers[platform] || ""}
              onChange={(e) => handleChange(platform, e.target.value)}
              whileFocus={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(255,0,150,0.2)" }}
              whileHover={{ scale: 1.01, boxShadow: "0px 5px 15px rgba(255,0,150,0.2)" }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-pink-400 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </motion.div>
        ))}

        {/* Submit button */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(255,0,150,0.5)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-full py-4 mt-4 rounded-3xl text-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 shadow-2xl"
        >
          ✅ Natijani ko‘rish
        </motion.button>

        {/* Extra floating bubbles */}
        <motion.div
          className="absolute w-6 h-6 bg-pink-300 rounded-full opacity-30"
          style={{ top: "10%", left: "70%" }}
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-8 h-8 bg-purple-300 rounded-full opacity-25"
          style={{ top: "80%", left: "30%" }}
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-5 h-5 bg-indigo-300 rounded-full opacity-20"
          style={{ top: "50%", left: "50%" }}
          animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
