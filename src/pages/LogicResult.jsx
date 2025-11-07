import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LogicResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Natija uchun score'ni location state'dan olamiz, default 0
  const score = location.state?.score || 0;
  const totalQuestions = 20; // agar savollar soni 20 bo'lsa
  const maxLevel = 50;       // maksimal daraja

  const [level, setLevel] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("level99_user"));
    if (userData) {
      // Darajani hisoblash: to'g'ri javoblar / savollar soni * maksimal ball
      const newLevel = Math.floor((score / totalQuestions) * maxLevel);
      setLevel(newLevel);

      // Foydalanuvchi ma'lumotlarini yangilash
      const updatedUser = {
        ...userData,
        answers: {
          ...userData.answers,
          logic: {
            score,
            level: newLevel,
          },
        },
      };

      localStorage.setItem("level99_user", JSON.stringify(updatedUser));
    }
  }, [score]);

  const handleBack = () => {
    navigate("/profiles/logic");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-yellow-700 mb-4">🧠 Mantiq fani natijasi</h1>
        <p className="text-gray-700 text-lg mb-4">
          Siz <span className="font-bold">{score} / {totalQuestions}</span> ta savolga to‘g‘ri javob berdingiz.
        </p>
        <p className="text-xl font-semibold text-pink-600 mb-6">
          Darajangiz: {level} / {maxLevel}
        </p>
        <button
          onClick={handleBack}
          className="px-6 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition"
        >
          Profilga qaytish
        </button>
      </div>
    </div>
  );
};

export default LogicResult;
