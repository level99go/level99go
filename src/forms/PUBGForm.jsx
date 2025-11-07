import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PUBGForm() {
  const [pubgId, setPubgId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNumeric = /^\d{11}$/.test(pubgId);

    if (!isNumeric) {
      setError("❌ PUBG ID faqat 11 ta raqamdan iborat bo‘lishi kerak!");
      return;
    }

    // TODO: Backendga yuboriladi
    console.log("PUBG ID:", pubgId);

    // Foydalanuvchini profil sahifasiga yo‘naltiramiz
    navigate("/profiles/basic");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-200 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600">
          🎮 PUBG ID-ni kiriting
        </h1>

        <input
          type="text"
          maxLength="11"
          value={pubgId}
          onChange={(e) => {
            setPubgId(e.target.value);
            setError("");
          }}
          placeholder="Masalan: 12345678901"
          className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Tasdiqlash
        </button>
      </form>
    </div>
  );
}
