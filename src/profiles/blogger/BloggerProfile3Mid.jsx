// src/profiles/blogger/BloggerProfile3Mid.jsx
import React from "react";
import { Instagram, Youtube } from "lucide-react";
import TiktokIcon from "../../icons/TiktokIcon";

export default function BloggerProfile3Mid({ user }) {
  const { answers } = user || {};
  const { blogger = {} } = answers || {};
  const { platforms = [], followers = {} } = blogger;

  // Obunachilar soni bo‘yicha o‘rtadagi platformani topamiz
  const sortedPlatforms = [...platforms].sort((a, b) => (followers[a] || 0) - (followers[b] || 0));
  const midPlatform = sortedPlatforms[1] || platforms[0]; // 2-chi o‘rtadagi platforma
  const followerCount = followers[midPlatform] || 0;

  const platformIcons = {
    Instagram: <Instagram className="w-8 h-8 text-pink-500" />,
    YouTube: <Youtube className="w-8 h-8 text-red-500" />,
    TikTok: <TiktokIcon className="w-8 h-8 text-white" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1c1c1c] to-black text-white p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* O‘rtadagi platforma asosiy boshi */}
        <div>
          <div className="bg-white/10 p-4 rounded-full w-fit mx-auto shadow-xl">
            {platformIcons[midPlatform]}
          </div>
          <h1 className="text-4xl font-bold mt-4">
            {midPlatform} O‘rta Bloger
          </h1>
          <p className="text-lg text-gray-300 mt-2">
            👏 Siz allaqachon auditoriya e’tiborini qozongansiz. Endi esa brend bilan ishlash, yangi formatlar sinab ko‘rish va shaxsiy uslubingizni kuchaytirish vaqti.
          </p>
        </div>

        {/* Statistika va Maqsadlar */}
        <div className="grid grid-cols-2 gap-4 bg-white/10 p-6 rounded-xl text-left">
          <div>
            <h2 className="text-xl font-semibold mb-1">📊 Statistika</h2>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>Obunachilar: {followerCount.toLocaleString()}+</li>
              <li>Video ko‘rishlar: 1M+</li>
              <li>O‘rtacha engagement: 4.5%</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">🎯 Maqsadlar</h2>
            <ul className="text-sm space-y-1 text-gray-300">
              <li>💡 Brend hamkorliklarini topish</li>
              <li>📅 Kontent rejasini tuzish</li>
              <li>🎥 Seriyalar yaratish</li>
            </ul>
          </div>
        </div>

        {/* Barcha platformalar ro‘yxati */}
        <div className="mt-6 space-y-2">
          <h2 className="text-purple-400 font-semibold mb-2">📱 Sizning platformalaringiz:</h2>
          {platforms.map((p) => (
            <div
              key={p}
              className="flex items-center justify-between bg-white/5 p-3 rounded-xl px-6"
            >
              <span className="flex items-center space-x-2">
                {platformIcons[p]}
                <span className="text-sm text-gray-300">{p}</span>
              </span>
              <span className="font-bold text-purple-300">
                {followers[p]?.toLocaleString()} ta
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
