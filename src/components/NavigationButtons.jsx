import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-4 justify-center p-6">
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-2xl shadow"
      >
        🏠 Bosh sahifa
      </button>
      <button
        onClick={() => navigate("/profile")}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-2xl shadow"
      >
        👤 Mening Profilim
      </button>
      <button
        onClick={() => navigate("/search")}
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-2xl shadow"
      >
        🔍 Qidiruv
      </button>
      <button
        onClick={() => navigate("/login")}
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-2xl shadow"
      >
        🔑 Login
      </button>
      <button
        onClick={() => navigate("/register")}
        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-2xl shadow"
      >
        ✍️ Ro‘yxatdan o‘tish
      </button>
    </div>
  );
};

export default NavigationButtons;
