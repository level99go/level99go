import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Play, Zap } from "lucide-react";

export default function CyberIntro() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate("/cyber");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 🔥 Background animated gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,128,0.15),transparent_70%)] animate-pulse"></div>
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-xl w-full bg-gray-900/80 backdrop-blur-xl p-10 rounded-3xl border border-green-500/30 shadow-[0_0_30px_rgba(0,255,128,0.2)]"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 flex items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/50 shadow-lg shadow-green-400/40"
          >
            <Shield size={40} className="text-green-400" />
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent drop-shadow-md">
          Kiberxavfsizlik Yo‘nalishi
        </h1>
        <p className="text-lg text-gray-200 text-center mb-8">
          Ushbu yo‘nalishda siz{" "}
          <span className="font-bold text-green-400">50 level</span> ga erishishingiz mumkin.
          Har bir savol sizni keyingi bosqichga yaqinlashtiradi.
        </p>

        {/* Steps */}
        <div className="space-y-4 mb-10">
          {[
            "Savollarga tez va aniq javob bering",
            "Har bosqichda yangi darajaga ko‘tariling",
            "Oxirida sizning haqiqiy level darajangiz aniqlanadi",
          ].map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.2 }}
              className="flex items-center gap-3 text-gray-300"
            >
              <Zap className="text-green-400 w-5 h-5" />
              <span>{step}</span>
            </motion.div>
          ))}
        </div>

        {/* Start Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(34,197,94,0.8)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStartTest}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 transition-all"
        >
          <Play size={22} /> Testni boshlash
        </motion.button>
      </motion.div>
    </div>
  );
}
