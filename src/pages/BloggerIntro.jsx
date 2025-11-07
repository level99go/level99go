import React from "react";
import { useNavigate } from "react-router-dom";

export default function BloggerIntro() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/blogger"); // Bu BloggerForm sahifasiga olib boradi
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">🎯 Level99 Blogerlar uchun!</h1>
        <p className="text-gray-700 text-lg mb-4">
          Siz YouTube, TikTok yoki Instagram platformalarida faol blogermisiz?
        </p>
        <p className="text-gray-600 mb-6">
          Obunachilaringiz 30 000 dan oshsa, biz sizning Level99 darajangizni shaxsan hisoblab beramiz!
        </p>

        <p className="text-sm text-gray-500 mb-6">
          🔹 1 ta yoki bir nechta platformani tanlang<br />
          🔹 Obunachi soningizni kiritib davom eting<br />
          🔹 Biz sizga darajani hisoblaymiz yoki adminga yuboriladi
        </p>

        <button
          onClick={handleContinue}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-purple-700 transition"
        >
          🚀 Davom etish
        </button>
      </div>
    </div>
  );
}
