import React from "react";
import { useNavigate } from "react-router-dom";

export default function HistoryIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden bg-gradient-to-br from-green-900 via-black to-green-800">
      
      {/* Orqa fon elementlari */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow top-10 left-10"></div>
        <div className="absolute w-56 h-56 bg-lime-400/20 rounded-full blur-2xl animate-pulse-slow top-1/2 right-20"></div>
        <div className="absolute w-96 h-96 bg-green-300/10 rounded-full blur-3xl animate-pulse-slow bottom-0 left-1/3"></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Asosiy kontent */}
      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        <div className="bg-white/5 border border-green-500 backdrop-blur-xl p-10 rounded-3xl shadow-[0_25px_60px_rgba(0,255,128,0.3)]">
          
          {/* Sarlavha */}
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-lime-300 animate-gradient-slow drop-shadow-lg">
            📘 Tarix faniga xush kelibsiz!
          </h1>

          {/* Ta’rif */}
          <p className="text-gray-300 text-lg md:text-xl mt-4 leading-relaxed">
            Siz bu bo‘limda O‘zbekiston va jahon tarixiga oid savollarga javob berasiz. Har bir savolga <span className="font-bold text-green-300">10 soniya</span> vaqtingiz bor.
          </p>

          {/* Tavsiyalar ro‘yxati */}
          <ul className="text-left text-white/80 mt-4 space-y-2 list-disc list-inside">
            <li>🕰 Tarixiy voqealarni aniqlang</li>
            <li>🏛 Davlatlar va hukmdorlar haqida bilim</li>
            <li>🗺 Geografik va madaniy kontekstni bilish</li>
            <li>📜 Tarixiy sanalar va faktlarni eslab qolish</li>
          </ul>

          {/* Test boshlash tugmasi */}
          <button
            onClick={() => navigate("/history")}
            className="mt-6 px-8 py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 hover:from-green-700 hover:to-lime-600 transition-all duration-300"
          >
            🧠 Testni boshlash
          </button>

          {/* Izoh */}
          <p className="text-sm text-gray-400 mt-2">
            ⏱ Har savol uchun vaqt: 10 soniya
          </p>
        </div>
      </div>

      {/* Pastki yumshoq glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
  );
}
