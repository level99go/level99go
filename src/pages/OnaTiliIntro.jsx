import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OnaTiliIntro() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Qoraytirish va blur */}
      <div className="absolute inset-0 bg-rose-900/70 backdrop-blur-sm z-0"></div>

      {/* Kontent */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 max-w-2xl w-full space-y-6"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-pink-100 animate-pulse"
        >
          📚 Ona tili testi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-white/90 leading-relaxed"
        >
          20 ta ona tili savoliga <span className="font-bold text-yellow-200">10 soniyada</span> javob bering.
          Savollar umumiy bilim, imlo va ifoda qoidalariga asoslangan.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,192,203,0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/uzbek")}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          🚀 Testni boshlash
        </motion.button>
      </motion.div>
    </div>
  );
}
