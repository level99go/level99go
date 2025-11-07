// src/forms/BloggerResult.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BloggerResult() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [platforms, setPlatforms] = useState([]);
  const [shouldSendToAdmin, setShouldSendToAdmin] = useState(false);
  const [message, setMessage] = useState("");
  const [usernames, setUsernames] = useState({});
  const [needUsernames, setNeedUsernames] = useState(false);

  // Load user data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("level99_user"));
    if (!storedUser) {
      navigate("/register");
      return;
    }

    const bloggerAnswers = storedUser.answers?.blogger || {};
    const followers = bloggerAnswers.followers || {};
    const selectedPlatforms = bloggerAnswers.platforms || [];
    const nickname = storedUser.username || "Unknown";

    const weights = { Instagram: 1.0, YouTube: 1.3, TikTok: 0.7 };

    const rawScore = selectedPlatforms.reduce((acc, platform) => {
      const count = followers[platform] || 0;
      const weight = weights[platform] || 1;
      return acc + count * weight;
    }, 0);

    const calculatedLevel = Math.floor((rawScore / 30000) * 50);

    let review = false;
    if (selectedPlatforms.length === 3 && rawScore >= 30000) review = true;
    else if (selectedPlatforms.length === 2 && rawScore >= 20000) review = true;
    else if (selectedPlatforms.length === 1 && rawScore >= 10000) review = true;

    setScore(Math.floor(rawScore));
    setLevel(calculatedLevel);
    setPlatforms(selectedPlatforms);
    setShouldSendToAdmin(review);
    if (review) setNeedUsernames(true);

    const updatedUser = { ...storedUser, level: calculatedLevel, review };
    localStorage.setItem("level99_user", JSON.stringify(updatedUser));
  }, [navigate]);

  const handleSaveUsernames = () => {
    const storedUser = JSON.parse(localStorage.getItem("level99_user"));
    if (!storedUser) return;

    const updatedUser = {
      ...storedUser,
      answers: {
        ...storedUser.answers,
        blogger: {
          ...storedUser.answers.blogger,
          usernames,
        },
      },
    };
    localStorage.setItem("level99_user", JSON.stringify(updatedUser));

    const adminQueue = JSON.parse(localStorage.getItem("level99_admin_queue")) || [];
    const exists = adminQueue.find((u) => u.username === storedUser.username);
    if (!exists) {
      adminQueue.push({
        username: storedUser.username,
        platforms,
        followers: storedUser.answers.blogger.followers || {},
        totalScore: score,
        usernames,
      });
      localStorage.setItem("level99_admin_queue", JSON.stringify(adminQueue));
    }

    setMessage("✅ Username kiritildi va adminga yuborildi.");
    setNeedUsernames(false);
  };

  // Floating decorative emojis
  const floatingElements = [
    { emoji: "✨", size: 20, x: 30, y: 100, delay: 0 },
    { emoji: "💜", size: 16, x: 200, y: 50, delay: 1 },
    { emoji: "🌟", size: 22, x: 120, y: 300, delay: 2 },
    { emoji: "🔥", size: 18, x: 300, y: 150, delay: 3 },
    { emoji: "💫", size: 24, x: 50, y: 400, delay: 4 },
    { emoji: "♠️", size: 18, x: 250, y: 200, delay: 5 },
    { emoji: "♡", size: 20, x: 150, y: 50, delay: 6 },
    { emoji: "⭐", size: 22, x: 320, y: 100, delay: 7 },
    { emoji: "🌈", size: 28, x: 400, y: 350, delay: 8 },
    { emoji: "💎", size: 18, x: 100, y: 200, delay: 9 },
    { emoji: "🎉", size: 26, x: 220, y: 120, delay: 10 },
  ];

  // Background particles
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    opacity: Math.random() * 0.3 + 0.1,
    delay: Math.random() * 5,
  }));

  // Particle sparkle trail
  const sparkleTrail = Array.from({ length: 25 }, (_, i) => ({
    id: i + 100,
    size: Math.random() * 3 + 2,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    opacity: Math.random() * 0.5 + 0.1,
    delay: Math.random() * 4,
    color: ["#f9d423", "#fc4a1a", "#6a11cb"][i % 3],
  }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1c1f] via-[#101113] to-[#070708] text-white px-4 relative overflow-hidden">
      {/* Background particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y, opacity: p.opacity }}
          animate={{ y: [0, -20, 0], x: [0, 20, 0], opacity: [p.opacity, p.opacity + 0.3, p.opacity] }}
          transition={{ duration: 5 + p.delay, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* Sparkle Trail */}
      {sparkleTrail.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y, backgroundColor: p.color, opacity: p.opacity }}
          animate={{ y: [0, -10, 0], x: [0, 10, 0], opacity: [p.opacity, 0, p.opacity] }}
          transition={{ duration: 4 + p.delay, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {/* Floating emojis */}
      {floatingElements.map((el, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ fontSize: `${el.size}px`, left: el.x, top: el.y, opacity: 0.25 }}
          animate={{ y: [0, -35, 0], rotate: [0, 25, -25, 0] }}
          transition={{ duration: 6 + idx, repeat: Infinity, delay: el.delay, ease: "easeInOut" }}
        >
          {el.emoji}
        </motion.div>
      ))}

      {/* Main container */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#121316] border border-gray-800 rounded-3xl p-10 w-full max-w-xl shadow-3xl space-y-6 relative z-10"
      >
        {/* Title */}
        <motion.h2
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-purple-500 animate-pulse tracking-wider"
        >
          📊 Bloger natijalari
        </motion.h2>

        {/* Platforms, score, level */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div className="text-lg">
            📱 <span className="text-gray-400">Platformalar:</span>{" "}
            <span className="font-semibold text-pink-400">{platforms.join(", ") || "yo‘q"}</span>
          </div>
          <div className="text-lg">
            📦 <span className="text-gray-400">Umumiy ball:</span>{" "}
            <span className="font-semibold text-blue-400">{score.toLocaleString()}</span>
          </div>
          <div className="text-lg">
            🎯 <span className="text-gray-400">Level:</span>{" "}
            <span className="font-semibold text-yellow-400">{level} / 50</span>
          </div>
        </motion.div>

        {/* Username input */}
        <AnimatePresence>
          {needUsernames && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <p className="text-center text-yellow-300 text-sm animate-pulse">
                ⚠️ Followerlaringiz yetarli. Iltimos, username kiriting:
              </p>
              {platforms.map((p, idx) => (
                <motion.input
                  key={p}
                  type="text"
                  placeholder={`${p} username (@nickname)`}
                  value={usernames[p] || ""}
                  onChange={(e) =>
                    setUsernames((prev) => ({ ...prev, [p]: e.target.value }))
                  }
                  whileFocus={{ scale: 1.02, boxShadow: "0px 5px 20px rgba(255,255,255,0.2)" }}
                  whileHover={{ scale: 1.01, boxShadow: "0px 5px 15px rgba(255,255,255,0.2)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 transition"
                />
              ))}
              <motion.button
                onClick={handleSaveUsernames}
                whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,255,150,0.4)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-full py-3 mt-2 rounded-xl text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-xl"
              >
                ✅ Yuborish
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message */}
        {!needUsernames && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-sm p-4 rounded-xl text-center ${
              shouldSendToAdmin ? "bg-green-800/40 text-green-300" : "bg-yellow-800/30 text-yellow-200"
            }`}
          >
            {message ||
              (shouldSendToAdmin
                ? "✅ Profilingiz adminga yuborildi. Tekshiruv jarayonida."
                : "📌 Ball hisoblandi. Lekin followerlar soni tekshiruv uchun yetarli emas.")}
          </motion.div>
        )}

        {/* Go to profile */}
        <motion.button
          onClick={() => navigate(`/profiles/blogger`)}
          disabled={needUsernames}
          whileHover={{
            scale: needUsernames ? 1 : 1.05,
            boxShadow: needUsernames ? "none" : "0px 10px 25px rgba(255,255,255,0.3)",
          }}
          whileTap={{ scale: needUsernames ? 1 : 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className={`w-full py-3 mt-4 rounded-xl text-lg font-bold transition-transform ${
            needUsernames
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl"
          }`}
        >
          👤 Profilga o‘tish
        </motion.button>
      </motion.div>
    </div>
  );
}
