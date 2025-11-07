// src/pages/EnglishIntro.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function EnglishIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 relative overflow-hidden">
      {/* Fon bezaklari */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-indigo-500/40 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Asosiy Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl max-w-2xl w-full space-y-8 transition hover:shadow-yellow-400/30 hover:scale-[1.01] duration-500">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.7)]">
          📖 Ingliz tili testiga xush kelibsiz!
        </h1>

        {/* Description */}
        <p className="text-lg text-center text-white/80 leading-relaxed">
          Bu test orqali sizning ingliz tili bo‘yicha bilimlaringizni{" "}
          <span className="font-bold text-yellow-300">aniqlaymiz</span> va
          natijaga qarab sizga Level belgilanadi.
        </p>

        {/* Rules */}
        <ul className="grid sm:grid-cols-3 gap-4 text-white/90 text-center">
          <li className="bg-white/10 p-4 rounded-2xl shadow-inner hover:bg-white/20 transition duration-300">
            <span className="text-2xl block mb-2">📝</span>
            20 ta savol
          </li>
          <li className="bg-white/10 p-4 rounded-2xl shadow-inner hover:bg-white/20 transition duration-300">
            <span className="text-2xl block mb-2">⏳</span>
            Har savolga 10 soniya
          </li>
          <li className="bg-white/10 p-4 rounded-2xl shadow-inner hover:bg-white/20 transition duration-300">
            <span className="text-2xl block mb-2">🏆</span>
            Natijada Level chiqadi
          </li>
        </ul>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/english")}
            className="px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-2xl font-bold text-white text-lg shadow-lg shadow-green-500/30 hover:shadow-green-400/50 transition-all duration-500 animate-pulse hover:animate-none"
          >
            🚀 Boshlash
          </button>
        </div>
      </div>
    </div>
  );
}
