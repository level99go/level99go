import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, Star, Clock } from "lucide-react";

export default function MathIntro() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 🔥 Background gradient + pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.15),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-black/70 backdrop-blur-xl border border-yellow-400/30 shadow-[0_0_30px_rgba(255,215,0,0.3)] p-10 rounded-3xl max-w-xl w-full"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 flex items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-400/50 shadow-lg shadow-yellow-300/40"
          >
            <Calculator size={40} className="text-yellow-400" />
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
          📐 Matematika Testi
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-200 text-center mb-8">
          Sizga <span className="font-bold text-yellow-300">20 ta savol</span> beriladi.
          Har bir savol uchun <span className="text-yellow-300">30 soniya</span> vaqt
          va to‘g‘ri javob <span className="text-yellow-300">2.5 ball</span> olib keladi.
        </p>

        {/* Steps */}
        <div className="space-y-4 mb-10">
          {[
            "Savollarga tez va aniq javob bering",
            "Har to‘g‘ri javob sizni yuqori ballga olib chiqadi",
            "Oxirida umumiy natijangiz ko‘rsatiladi",
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.2 }}
              className="flex items-center gap-3 text-gray-300"
            >
              {idx === 0 && <Star className="text-yellow-400 w-5 h-5" />}
              {idx === 1 && <Calculator className="text-yellow-400 w-5 h-5" />}
              {idx === 2 && <Clock className="text-yellow-400 w-5 h-5" />}
              <span>{step}</span>
            </motion.div>
          ))}
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(255,215,0,0.9)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/math")}
          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 transition-all"
        >
          🚀 Boshlash
        </motion.button>
      </motion.div>
    </div>
  );
}
