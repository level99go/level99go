// src/forms/BloggerForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BloggerForm() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const togglePlatform = (platform) => {
    if (selected.includes(platform)) {
      setSelected(selected.filter((p) => p !== platform));
    } else {
      setSelected([...selected, platform]);
    }
  };

  const handleNext = () => {
    if (selected.length === 0)
      return alert("Iltimos, kamida bitta platformani tanlang.");

    const existing = JSON.parse(localStorage.getItem("level99_user")) || {};

    const updatedUser = {
      ...existing,
      answers: {
        ...existing.answers,
        blogger: {
          platforms: selected,
          needsAdminCheck: false,
        },
      },
    };

    localStorage.setItem("level99_user", JSON.stringify(updatedUser));
    navigate("/blogger-followers");
  };

  const platforms = ["Instagram", "YouTube", "TikTok"];
  const colors = {
    Instagram: "from-pink-400 via-red-500 to-yellow-500",
    YouTube: "from-red-500 to-red-700",
    TikTok: "from-teal-400 via-blue-500 to-purple-600",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-200 to-indigo-200 p-6">
      {/* Main container with subtle hover and scale animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-3xl rounded-4xl p-12 max-w-xl w-full border border-pink-200 transform hover:scale-105 transition-transform duration-500"
      >
        {/* Title with pulse and drop-shadow */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="text-5xl font-extrabold text-center text-pink-700 mb-10 drop-shadow-xl animate-pulse"
        >
          🎥 Qaysi platformalardasiz?
        </motion.h1>

        {/* Platforms grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform, index) => {
            const isSelected = selected.includes(platform);
            return (
              <AnimatePresence key={platform}>
                <motion.button
                  onClick={() => togglePlatform(platform)}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    scale: isSelected ? 1.15 : 1,
                    opacity: 1,
                    boxShadow: isSelected
                      ? "0px 15px 25px rgba(255,105,180,0.4)"
                      : "0px 5px 10px rgba(0,0,0,0.1)",
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: index * 0.1,
                  }}
                  className={`py-5 px-6 rounded-3xl text-lg font-bold border-2 focus:outline-none transition-all duration-300 ${
                    isSelected
                      ? `bg-gradient-to-r ${colors[platform]} text-white`
                      : "bg-white text-gray-700 border-gray-300 hover:border-pink-400 hover:shadow-md hover:scale-105"
                  }`}
                >
                  {platform}
                </motion.button>
              </AnimatePresence>
            );
          })}
        </div>

        {/* Floating background icons */}
        <div className="absolute top-10 left-5 opacity-20">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-pink-300 text-6xl font-bold"
          >
            ♡
          </motion.div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-purple-300 text-6xl font-bold"
          >
            ★
          </motion.div>
        </div>

        {/* Next button with hover and tap animations */}
        <motion.button
          onClick={handleNext}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 10px 25px rgba(255,0,150,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="w-full py-5 rounded-3xl text-2xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-2xl"
        >
          🚀 Davom etish
        </motion.button>

        {/* Decorative floating bubbles */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-6 h-6 bg-pink-300 rounded-full opacity-30"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-purple-300 rounded-full opacity-30"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/2 w-5 h-5 bg-indigo-300 rounded-full opacity-20"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
