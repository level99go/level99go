// src/profiles/blogger/BloggerProfile2High.jsx
import React from "react";
import { Instagram, Youtube } from "lucide-react";
import TiktokIcon from "../../icons/TiktokIcon";

export default function BloggerProfile2High({ user }) {
  const { answers } = user || {};
  const { blogger = {} } = answers || {};
  const { platforms = [], followers = {} } = blogger;

  const platformIcons = {
    Instagram: <Instagram className="w-10 h-10 text-pink-500" />,
    YouTube: <Youtube className="w-10 h-10 text-red-500" />,
    TikTok: <TiktokIcon className="w-10 h-10 text-white" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-800 to-black text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-4 text-red-300">🔥 Superstar Bloger</h1>

      {/* Platforma ikonkalari */}
      <div className="flex space-x-4 mb-6">
        {platforms.map((platform) => (
          <div key={platform} className="bg-black p-4 rounded-full shadow-lg">
            {platformIcons[platform]}
          </div>
        ))}
      </div>

      {/* Katta Card */}
      <div className="bg-white/10 border border-red-500 p-6 rounded-3xl shadow-xl max-w-md w-full space-y-6 text-center">
        <p className="text-xl text-yellow-300 font-semibold">
          🏆 100,000+ obunachilar bilan siz haqiqiy professional blogersiz!
        </p>

        {platforms.map((platform) => (
          <div key={platform} className="bg-black/50 p-4 rounded-xl">
            <p className="text-sm text-gray-300">{platform} obunachilari:</p>
            <p className="text-2xl font-bold text-red-300 mt-1">
              {followers[platform]?.toLocaleString()} ta
            </p>
          </div>
        ))}

        <p className="text-green-400 text-sm">
          Siz kontent dunyosining old qatoridasiz. Reklama shartnomalari va xalqaro hamkorliklar sizni kutmoqda.
        </p>
      </div>
    </div>
  );
}
