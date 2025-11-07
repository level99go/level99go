// src/PublicProfile.jsx
import React from "react";
import { useParams } from "react-router-dom";
import usersData from "./data/users.json";

export default function PublicProfile() {
  const { username } = useParams();
  const user = usersData.find((u) => u.username === username);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Foydalanuvchi topilmadi.</p>
      </div>
    );
  }

  const isLegend = user.level >= 99;

  const getAvatarByLevel = (level) => {
    if (level < 10)
      return "https://cdn-icons-png.flaticon.com/512/921/921347.png";
    if (level < 30)
      return "https://cdn-icons-png.flaticon.com/512/921/921336.png";
    if (level < 60)
      return "https://cdn-icons-png.flaticon.com/512/921/921348.png";
    if (level < 90)
      return "https://cdn-icons-png.flaticon.com/512/921/921351.png";
    return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; // Premium avatar
  };

  return (
    <div
      className={`min-h-screen ${
        isLegend ? "bg-gradient-animated text-white" : "bg-black"
      } p-6`}
    >
      {/* 🔄 Animatsion background uchun style */}
      {isLegend && (
        <style>
          {`
            @keyframes animatedGradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            .bg-gradient-animated {
              background: linear-gradient(-45deg, #422006, #0f0f0f, #7f1d1d, #1c1917);
              background-size: 400% 400%;
              animation: animatedGradient 15s ease infinite;
            }
          `}
        </style>
      )}

      <div
        className={`max-w-md mx-auto ${
          isLegend ? "bg-gradient-to-br from-yellow-400 to-red-500" : "bg-gray-800"
        } rounded-2xl shadow-xl p-6 border-4 ${
          isLegend ? "border-yellow-400" : "border-gray-700"
        }`}
      >
        {/* Avatar + Badge */}
        <div className="flex flex-col items-center text-center relative">
          <img
            src={user.avatar ? user.avatar : getAvatarByLevel(user.level)}
            alt="avatar"
            className={`w-24 h-24 rounded-full border-4 ${
              isLegend ? "border-yellow-500 shadow-md" : "border-gray-500 shadow"
            } mb-3`}
          />
          {isLegend && (
            <div className="absolute top-1 right-1 bg-yellow-300 text-black font-bold text-[0.6rem] px-2 py-0.5 rounded-md shadow-sm">
              🏆 LEVEL 99 LEGEND
            </div>
          )}
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-400">@{user.username}</p>
          <p className="text-gray-400">Yosh: {user.age}</p>
          <p className="text-green-400 font-semibold">Kasb: {user.career}</p>
        </div>

        {/* Level bar */}
        <div className="mt-6">
          <p className="text-sm text-center text-gray-300 mb-1">
            Level: <span className="text-white font-bold">{user.level}/99</span>
          </p>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-3 ${
                isLegend
                  ? "bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500"
                  : "bg-blue-500"
              } rounded-full`}
              style={{ width: `${(user.level / 99) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-center mb-3">📊 Statistika:</h3>
          <div className="space-y-2">
            {Object.entries(user.answers || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between bg-gray-700 px-4 py-2 rounded"
              >
                <span className="text-white font-medium">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </span>
                <span className="text-yellow-400">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend Message */}
        {isLegend && (
          <div className="mt-6 text-center">
            <p className="text-yellow-200 font-semibold text-base mb-1">
              🔥 Siz Level99 afsonasisiz!
            </p>
            <p className="text-sm text-gray-200">
              Profilingiz barcha foydalanuvchilarga ochiq — afsona darajasidasiz!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
