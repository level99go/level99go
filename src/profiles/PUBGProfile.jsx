// src/profiles/PUBGProfile.jsx
import React from "react";

export default function PUBGProfile({ user }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1c1c1c] text-white p-6">
      <div className="max-w-4xl mx-auto bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl border border-yellow-400">
        <div className="text-center">
          <img
            src={user.avatar}
            className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-500 shadow-lg"
            alt="avatar"
          />
          <h1 className="text-4xl font-extrabold mt-4 text-yellow-400">
            {user.name}
          </h1>
          <p className="text-gray-400 text-lg">
            @{user.username} • Yosh: {user.age}
          </p>
          <p className="text-yellow-300 mt-2 font-semibold text-lg">
            🎮 PUBG Oʻyinchisi
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">🏆 PUBG Level</h2>
          <div className="w-full h-4 bg-gray-700 rounded-full">
            <div
              className="h-full bg-yellow-500 rounded-full"
              style={{ width: `${(user.level / 99) * 100}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-400">Level: {user.level}/99</p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            📊 Oʻyin Statistikalari:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(user.answers || {}).map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow"
              >
                <span className="text-white capitalize">{key}</span>
                <span className="text-yellow-400 font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-bold transition duration-300">
            🔫 Profilni Yangilash
          </button>
        </div>
      </div>
    </div>
  );
}
