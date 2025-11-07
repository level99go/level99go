// src/profiles/BoxerProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";

export default function BoxerProfile() {
  const [user, setUser] = useState(null);
  const [level, setLevel] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("level99_user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      const lvl = calculateLevel(parsed.answers || {});
      setLevel(lvl);
    }
  }, []);

  const calculateLevel = (answers) => {
    const wins = parseInt(answers["g‘alabalar"]) || 0;
    const losses = parseInt(answers["mag‘lubiyatlar"]) || 0;
    const diff = wins - losses;
    if (diff >= 25) return 99;
    if (diff >= 15) return 80;
    if (diff >= 10) return 60;
    if (diff >= 5) return 40;
    if (diff >= 1) return 20;
    return 1;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Foydalanuvchi topilmadi.</p>
      </div>
    );
  }

  const stats = Object.entries(user.answers || {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="bg-[#1e1e1e] rounded-2xl p-6 shadow-xl">
          {/* Avatar & Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-red-500 shadow-lg"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-400">@{user.username} • {user.age} yosh</p>
              <p className="text-red-400 font-medium mt-1">Kasb: {user.career}</p>
              <p className="mt-3 italic text-gray-300 max-w-md">
                {user.bio || "Bio mavjud emas..."}
              </p>
              <div className="flex gap-4 mt-4 flex-wrap justify-center sm:justify-start">
                {user.social?.instagram && (
                  <a
                    href={user.social.instagram}
                    target="_blank"
                    className="text-pink-500 hover:underline"
                  >
                    📸 Instagram
                  </a>
                )}
                {user.social?.youtube && (
                  <a
                    href={user.social.youtube}
                    target="_blank"
                    className="text-red-500 hover:underline"
                  >
                    ▶️ YouTube
                  </a>
                )}
              </div>
              <div className="flex gap-3 mt-4 flex-wrap justify-center sm:justify-start">
                <button
                  onClick={() => navigate("/search")}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full"
                >
                  🔍 Qidiruv
                </button>
                <button
                  onClick={() => alert("Bokschi uchun forma hali tayyor emas")}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full"
                >
                  ✏️ Forma
                </button>
              </div>
            </div>
          </div>

          {/* Level */}
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-1">
              Level: <span className="text-white font-bold">{level}/99</span>
            </p>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-400 to-yellow-500"
                style={{ width: `${(level / 99) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">📊 Statistika</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map(([key, value]) => (
                <InfoCard
                  key={key}
                  title={key}
                  value={value}
                  icon="🥊"
                />
              ))}
              <InfoCard
                title="Jami janglar"
                value={(parseInt(user.answers["g‘alabalar"]) || 0) + (parseInt(user.answers["mag‘lubiyatlar"]) || 0)}
                icon="🧮"
              />
              <InfoCard
                title="Win Rate"
                value={
                  user.answers["g‘alabalar"]
                    ? `${
                        Math.round(
                          (parseInt(user.answers["g‘alabalar"]) /
                            ((parseInt(user.answers["g‘alabalar"]) || 0) +
                              (parseInt(user.answers["mag‘lubiyatlar"]) || 0))) *
                            100
                        )
                      }%`
                    : "0%"
                }
                icon="🏆"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
