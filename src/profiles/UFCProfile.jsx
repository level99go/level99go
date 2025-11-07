import React from "react";

export default function UFCProfile({ user }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white p-6">
      <div className="max-w-3xl mx-auto bg-[#111] p-6 rounded-2xl shadow-lg">
        <div className="text-center">
          <img
            src={user.avatar}
            className="w-28 h-28 rounded-full mx-auto border-4 border-red-600 shadow"
            alt="avatar"
          />
          <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
          <p className="text-gray-400">@{user.username} • Yosh: {user.age}</p>
          <p className="text-red-500 mt-2 font-semibold">🥊 UFC Jangchisi</p>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">🥇 UFC Level</h2>
          <div className="w-full h-3 bg-gray-700 rounded-full mt-2">
            <div
              className="h-full bg-red-500 rounded-full"
              style={{ width: `${(user.level / 99) * 100}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-400">Level: {user.level}/99</p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">📊 Statistika:</h3>
          <div className="space-y-2">
            {Object.entries(user.answers || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between bg-gray-800 px-4 py-2 rounded"
              >
                <span className="text-white capitalize">{key}</span>
                <span className="text-red-400 font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
