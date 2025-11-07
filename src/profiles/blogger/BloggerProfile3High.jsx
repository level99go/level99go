// src/profiles/blogger/BloggerProfile3High.jsx
import React from "react";

export default function BloggerProfile3High() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-black to-[#000000] text-white px-6 py-16 animate-fade-in">
      <div className="max-w-5xl mx-auto text-center space-y-12">

        {/* 3 platforma logolari */}
        <div className="flex justify-center gap-10 animate-slide-in">
          {[
            { src: "/platforms/tiktok.png", alt: "TikTok" },
            { src: "/platforms/youtube.png", alt: "YouTube" },
            { src: "/platforms/instagram.png", alt: "Instagram" },
          ].map(({ src, alt }) => (
            <div
              key={alt}
              className="bg-white/5 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            >
              <img src={src} alt={alt} className="w-16 h-16 drop-shadow-md" />
            </div>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent tracking-wide animate-glow">
          🌟 Professional Bloger
        </h1>

        {/* Tavsif */}
        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Siz uchta platformada ham yuqori darajaga yetgansiz. Bu sizning mehnatingiz, ijodingiz va ta’sir kuchingizning natijasidir. Siz kontent olamining haqiqiy liderisiz.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-white/10 to-white/5 p-6 rounded-2xl border border-white/10 shadow-inner animate-fade-in">
          {/* TikTok */}
          <div className="bg-black/30 p-4 rounded-xl hover:bg-black/50 transition duration-300">
            <h2 className="text-xl font-semibold text-pink-400 mb-2">🎵 TikTok</h2>
            <ul className="text-sm space-y-1 text-gray-200">
              <li>Obunachilar: 320,000+</li>
              <li>Ko‘rishlar: 75M+</li>
              <li>Engagement: 8.1%</li>
            </ul>
          </div>

          {/* YouTube */}
          <div className="bg-black/30 p-4 rounded-xl hover:bg-black/50 transition duration-300">
            <h2 className="text-xl font-semibold text-red-400 mb-2">▶️ YouTube</h2>
            <ul className="text-sm space-y-1 text-gray-200">
              <li>Obunachilar: 210,000+</li>
              <li>Ko‘rishlar: 40M+</li>
              <li>Engagement: 6.4%</li>
            </ul>
          </div>

          {/* Instagram */}
          <div className="bg-black/30 p-4 rounded-xl hover:bg-black/50 transition duration-300">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">📸 Instagram</h2>
            <ul className="text-sm space-y-1 text-gray-200">
              <li>Obunachilar: 180,000+</li>
              <li>Ko‘rishlar: 22M+</li>
              <li>Engagement: 7.3%</li>
            </ul>
          </div>
        </div>

        {/* Motivatsion Matn */}
        <div className="mt-10 text-center text-gray-400 italic text-sm animate-pulse">
          Sizga qarab boshqalar ham ilhom oladi. Davom eting — bu faqat boshlanishi!
        </div>
      </div>
    </div>
  );
}
