import React from "react";

export default function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 shadow-md hover:shadow-xl transition">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-white font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}
