import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Link to={`/user/${user.id}`}>
      <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4 shadow hover:bg-gray-700 transition">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full border-2 border-blue-500"
        />
        <div>
          <p className="font-bold text-lg">{user.name}</p>
          <p className="text-sm text-gray-400">Kasb: {user.career}</p>
          <p className="text-sm text-yellow-400">Level: {user.level}/99</p>
        </div>
      </div>
    </Link>
  );
}
