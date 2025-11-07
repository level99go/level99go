// src/pages/InformaticsIntro.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function InformaticsIntro() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-950 text-white flex items-center justify-center overflow-hidden">
      {/* Orqa fon bezaklari */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-ping" />

      {/* Kontent */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-xl text-center bg-white/5 backdrop-blur-lg p-10 rounded-3xl border border-cyan-500/20 shadow-2xl space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-cyan-400 drop-shadow-md"
        >
          💻 Informatika Testi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-gray-300 leading-relaxed"
        >
          Sizni <span className="text-cyan-300 font-semibold">20 ta informatika savoli</span> kutmoqda.  
          Har bir savolga <span className="text-yellow-400 font-bold">10 soniya</span> beriladi.  
          Tayyor bo‘lsangiz boshlaymiz!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(34,211,238,0.7)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/informatics")}
          className="mt-4 bg-cyan-600 hover:bg-cyan-700 px-8 py-4 rounded-2xl text-white font-bold text-lg tracking-wide transition"
        >
          🚀 Boshlash
        </motion.button>
      </motion.div>
    </div>
  );
}
