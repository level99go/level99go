// src/profiles/blogger/BloggerProfile1Low.jsx
import React from "react";
import { Instagram, Youtube } from "lucide-react";
import TiktokIcon from "../../icons/TiktokIcon";

export default function BloggerProfile1Low({ user }) {
  const { answers } = user || {};
  const { blogger = {} } = answers || {};
  const { platforms = [], followers = {} } = blogger;

  // ✅ Eng kam obunachiligi bor platformani topamiz
  const platform = platforms.reduce((minPlatform, currPlatform) => {
    const currFollowers = followers[currPlatform] || 0;
    const minFollowers = followers[minPlatform] || 0;
    return currFollowers < minFollowers ? currPlatform : minPlatform;
  }, platforms[0]);

  const followerCount = followers[platform] || 0;

  const platformIcons = {
    Instagram: <Instagram className="w-10 h-10 text-pink-500" />,
    YouTube: <Youtube className="w-10 h-10 text-red-500" />,
    TikTok: <TiktokIcon className="w-10 h-10 text-white" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a002a] via-black to-purple-900 text-white flex flex-col items-center py-10 px-4">
      {/* Platform Icon */}
      <div className="bg-gradient-to-tr from-purple-600 to-pink-500 p-1 rounded-full shadow-xl mb-6">
        <div className="bg-black p-4 rounded-full">
          {platformIcons[platform]}
        </div>
      </div>

      {/* Card */}
      <div className="bg-purple-950 w-full max-w-md p-6 rounded-3xl shadow-2xl space-y-6 border border-purple-700">
        <h1 className="text-3xl font-extrabold text-center text-purple-100">
          {platform} Bloger
        </h1>

        <p className="text-center text-sm text-gray-400">
          Siz 1 ta platformada boshlang‘ich bosqichdasiz. Harakatni davom ettiring!
        </p>

        <div className="bg-purple-800/50 p-5 rounded-2xl text-center shadow-inner border border-purple-600">
          <p className="text-sm text-gray-300">📊 Obunachilar soni:</p>
          <p className="text-3xl font-bold text-purple-300 mt-1">
            {followerCount.toLocaleString()} ta
          </p>
        </div>

        <div className="text-center">
          <p className="text-green-400 text-sm">🟢 Sizda potentsial bor!</p>
        </div>

        <input
          type="text"
          placeholder="🔍 Qidiruv..."
          className="w-full px-4 py-2 rounded-xl bg-purple-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>
    </div>
  );
}
