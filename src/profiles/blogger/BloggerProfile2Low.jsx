// src/profiles/blogger/BloggerProfile2Low.jsx
import React from "react";
import { Instagram, Youtube } from "lucide-react";
import TiktokIcon from "../../icons/TiktokIcon";

export default function BloggerProfile2Low({ user }) {
  const { answers } = user || {};
  const { blogger = {} } = answers || {};
  const { platforms = [], followers = {} } = blogger;

  // 2 ta platforma bo‘ladi
  const firstPlatform = platforms[0];
  const secondPlatform = platforms[1];
  const firstCount = followers[firstPlatform] || 0;
  const secondCount = followers[secondPlatform] || 0;

  const platformIcons = {
    Instagram: <Instagram className="w-8 h-8 text-pink-500" />,
    YouTube: <Youtube className="w-8 h-8 text-red-500" />,
    TikTok: <TiktokIcon className="w-8 h-8 text-white" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white flex flex-col items-center py-10 px-4">
      <div className="bg-gradient-to-tr from-red-600 to-pink-500 p-1 rounded-full shadow-xl mb-6">
        <div className="bg-black p-4 rounded-full flex space-x-4 items-center justify-center">
          {platformIcons[firstPlatform]}
          {platformIcons[secondPlatform]}
        </div>
      </div>

      <div className="bg-red-950 w-full max-w-md p-6 rounded-3xl shadow-2xl space-y-6 border border-red-700">
        <h1 className="text-2xl font-extrabold text-center text-red-100">
          2 Platformali Bloger
        </h1>

        <p className="text-center text-sm text-gray-400">
          Siz ikkita platformada boshlang‘ich bosqichdasiz.
        </p>

        <div className="space-y-4">
          <div className="bg-red-800/40 p-4 rounded-xl border border-red-600">
            <p className="text-sm text-gray-300">{firstPlatform}:</p>
            <p className="text-xl font-bold text-red-300">
              {firstCount.toLocaleString()} ta obunachi
            </p>
          </div>
          <div className="bg-red-800/40 p-4 rounded-xl border border-red-600">
            <p className="text-sm text-gray-300">{secondPlatform}:</p>
            <p className="text-xl font-bold text-red-300">
              {secondCount.toLocaleString()} ta obunachi
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-green-400 text-sm">
            🟢 Harakatni davom ettiring — sizda imkoniyat bor!
          </p>
        </div>

        <input
          type="text"
          placeholder="🔍 Qidiruv..."
          className="w-full px-4 py-2 rounded-xl bg-red-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />
      </div>
    </div>
  );
}
