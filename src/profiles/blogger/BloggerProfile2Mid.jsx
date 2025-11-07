// src/profiles/blogger/BloggerProfile2Mid.jsx
import React from "react";
import { Instagram, Youtube } from "lucide-react";
import TiktokIcon from "../../icons/TiktokIcon";

export default function BloggerProfile2Mid({ user }) {
  const { answers } = user || {};
  const { blogger = {} } = answers || {};
  const { platforms = [], followers = {} } = blogger;

  const platformIcons = {
    Instagram: <Instagram className="w-8 h-8 text-pink-500" />,
    YouTube: <Youtube className="w-8 h-8 text-red-500" />,
    TikTok: <TiktokIcon className="w-8 h-8 text-white" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 via-black to-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-300">📺 Bloger (O‘rtacha)</h1>

      {/* Platformalar */}
      <div className="flex space-x-4 mb-6">
        {platforms.map((platform) => (
          <div key={platform} className="bg-black p-3 rounded-full shadow-lg">
            {platformIcons[platform]}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="bg-white/5 backdrop-blur-md border border-red-500 p-6 rounded-3xl shadow-2xl max-w-md w-full space-y-4">
        <p className="text-center text-sm text-gray-300">
          Siz 2 ta platformada faol bo‘lib, o‘rtacha auditoriyani egallagansiz.
        </p>

        <div className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform} className="bg-black/40 p-3 rounded-xl text-center">
              <p className="text-sm text-gray-300">{platform} obunachilari:</p>
              <p className="text-xl font-bold text-red-300">
                {followers[platform]?.toLocaleString()} ta
              </p>
            </div>
          ))}
        </div>

        <p className="text-green-400 text-sm text-center">
          🔥 Sizda yaxshi asos bor. Endi sifatli kontent va barqaror jadval bilan rivojlaning!
        </p>
      </div>
    </div>
  );
}
