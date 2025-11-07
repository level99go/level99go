// src/profiles/BasicProfile.jsx

import React, { useEffect, useState } from "react";

export default function BasicProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("level99_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-700">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <p className="text-sm text-gray-300 mb-1">@{user.username}</p>
        <p className="text-sm text-gray-400 mb-4">{user.career}</p>

        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">📊 Profil ma'lumotlari</h2>
          <p>🧠 Daraja: <span className="font-bold text-blue-400">{Math.floor(user.level || 0)}</span></p>
        </div>

        {user.answers && Object.keys(user.answers).length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="font-semibold text-gray-200 mb-2">📝 Javoblar:</h3>
            <ul className="space-y-1 text-sm">
              {Object.entries(user.answers).map(([key, value]) => (
                <li key={key}>
                  <span className="text-blue-300">{key}</span>: <span className="text-white">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
