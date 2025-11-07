// src/intros/LogicIntro.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const LogicIntro = () => {
  const navigate = useNavigate();

  const startTest = () => {
    navigate("/logic");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden text-white p-4"
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/R.08597082b275bc529f6fec1fc77e3ff3?rik=ziuVE10w1gpNMA&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1742595%2fthumbs%2fo-BRAIN-facebook.jpg&ehk=Zm7g48NN9gxip3QQU8TKrXl%2bmsGOp4B2weN3jJLM%2bgE%3d&risl=&pid=ImgRaw&r=0')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Qoraytirilgan qatlam */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Kontent */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl max-w-2xl w-full p-8 text-center">
        <h1 className="text-4xl font-bold text-purple-300 mb-4 animate-pulse">🧠 Mantiq Fani</h1>

        <p className="text-gray-200 mb-6">
          Bu bo‘limda sizning mantiqiy fikrlash, muammo yechish va tahlil qilish
          qobiliyatingiz sinovdan o‘tadi.
        </p>

        <ul className="text-left text-sm text-gray-300 mb-6 list-disc list-inside">
          <li>📋 20 ta savol</li>
          <li>⏱️ Har bir savolga 10 soniya</li>
          <li>📊 Javoblarga qarab daraja aniqlanadi</li>
        </ul>

        <button
          onClick={startTest}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
        >
          🚀 Testni boshlash
        </button>
      </div>
    </div>
  );
};

export default LogicIntro;
