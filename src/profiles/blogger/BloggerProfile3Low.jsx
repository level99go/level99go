// src/profiles/blogger/BloggerProfile3Low.jsx
import React from "react";
import { Instagram, Youtube } from "lucide-react";
import TiktokIcon from "../../icons/TiktokIcon";

export default function BloggerProfile3Low({ user }) {
  const { answers } = user || {};
  const { blogger = {} } = answers || {};
  const { platforms = [], followers = {} } = blogger;

  // Eng kam obunachilik platformani topamiz
  const platform = platforms.reduce((minPlatform, currPlatform) => {
    const currFollowers = followers[currPlatform] || 0;
    const minFollowers = followers[minPlatform] || 0;
    return currFollowers < minFollowers ? currPlatform : minPlatform;
  }, platforms[0]);

  const platformIcons = {
    Instagram: <Instagram className="w-8 h-8 text-pink-500" />,
    YouTube: <Youtube className="w-8 h-8 text-red-500" />,
    TikTok: <TiktokIcon className="w-8 h-8 text-white" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-6">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold mb-2 text-purple-300">
          🎬 3 Platformali Blogger (Low)
        </h1>

        {/* Eng past platforma logosi va matn */}
        <div className="flex flex-col items-center">
          <div className="bg-black p-4 rounded-full shadow-lg mb-4">
            {platformIcons[platform]}
          </div>
          <p className="text-lg mb-4 text-purple-200">
            🚀 Siz endi {platform} platformasida yo‘lni boshlayapsiz. Har bir video — bu imkoniyat!
          </p>
        </div>

        {/* Barcha 3 platforma obunachilari */}
        <div className="grid grid-cols-1 gap-3">
          {platforms.map((p) => (
            <div key={p} className="bg-white/10 p-3 rounded-xl flex items-center justify-between px-6">
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

        <div className="bg-white/10 mt-6 p-4 rounded-xl">
          <p className="text-sm text-gray-300">
            Har bir like, har bir izoh sizni keyingi bosqichga olib boradi. Kontentingizni rivojlantiring,
            kreativlikni oshiring va muntazam ishlang. Davom eting — katta auditoriya sizni kutyapti!
          </p>
        </div>
      </div>
    </div>
  );
}
