// src/pages/ChemistryIntro.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChemistryIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-900 via-cyan-950 to-black p-6">
      {/* 🌌 Orqa fon effektlari */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-24 left-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-700/20 rounded-full blur-3xl animate-bounce"></div>
      </div>

      {/* 📦 Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl max-w-2xl w-full text-white border border-cyan-500/40">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-cyan-200 mb-6 tracking-wide drop-shadow-lg animate-pulse">
          🧪 Kimyo Testiga Xush Kelibsiz!
        </h1>

        {/* Info */}
        <p className="text-lg md:text-xl text-center text-cyan-100 mb-10 leading-relaxed">
          Sizni <span className="font-bold text-emerald-300">20 ta savol</span> kutmoqda.  
          Har bir savol uchun <span className="text-yellow-300 font-semibold">10 soniya</span> beriladi.  
          🌌 O‘zingizni kimyoviy tajribadek sinovdan o‘tkazing!
        </p>

        {/* Molecule dekorlar */}
        <div className="flex justify-center gap-4 mb-8">
          <span className="w-6 h-6 bg-cyan-300 rounded-full animate-bounce"></span>
          <span className="w-4 h-4 bg-emerald-400 rounded-full animate-ping"></span>
          <span className="w-5 h-5 bg-blue-400 rounded-full animate-pulse"></span>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/chemistry")}
          className="w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 
          hover:from-cyan-600 hover:via-sky-600 hover:to-emerald-600 
          text-white py-4 rounded-2xl text-2xl font-bold tracking-wide 
          transition-all duration-300 shadow-lg shadow-cyan-900/40 hover:shadow-cyan-800/60"
        >
          🚀 Testni boshlash
        </button>
      </div>
    </div>
  );
}
