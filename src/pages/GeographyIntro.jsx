import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function GeographyIntro() {
  const navigate = useNavigate();

  const handleStart = () => navigate("/geography");

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Image + Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-blue-900/70 to-yellow-900/60 backdrop-blur-sm z-0" />

      {/* Floating sparkles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.9, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: Math.random() }}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-sm"
        />
      ))}

      {/* Content Card */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl w-full bg-white/10 border border-white/20 rounded-3xl p-10 backdrop-blur-lg shadow-2xl text-center space-y-6"
      >
        <motion.h1
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-300 via-yellow-300 to-blue-400 text-transparent bg-clip-text animate-pulse"
        >
          🌍 Geografiya Bo‘limiga Xush Kelibsiz!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-white/90 leading-relaxed"
        >
          Ushbu test orqali sizning{" "}
          <span className="font-semibold text-yellow-200">geografik bilimlaringiz</span>{" "}
          sinovdan o‘tkaziladi. <br />
          <span className="text-green-300 font-bold">20 ta savol</span>, har biriga{" "}
          <span className="text-blue-300 font-bold">10 soniya</span> vaqtingiz bor.
        </motion.p>

        <motion.ul
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-left text-white/85 space-y-2 list-disc list-inside px-6"
        >
          <li className="hover:scale-105 transition-transform duration-300">🌐 Mamlakatlar va ularning poytaxtlari</li>
          <li className="hover:scale-105 transition-transform duration-300">🏔 Tog‘lar, daryolar va okeanlar</li>
          <li className="hover:scale-105 transition-transform duration-300">🗺 Geografik obyektlar va iqlim zonalari</li>
          <li className="hover:scale-105 transition-transform duration-300">🌾 Tabiiy resurslar va joylashuvlar</li>
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-sm italic text-white/70"
        >
          ⏳ Eslatma: Sizda faqat 10 soniya bo‘ladi – o‘ylab o‘tirmang! 😉
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,170,0.8)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 hover:from-green-600 hover:via-teal-600 hover:to-blue-600 text-white font-bold shadow-lg transition-all duration-300"
        >
          🚀 Testni boshlash
        </motion.button>
      </motion.div>
    </div>
  );
}
