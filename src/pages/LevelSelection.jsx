// src/pages/LevelSelection.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LevelSelection = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // CareerPath yoki Register sahifasidan kelgan foydalanuvchi ma'lumotlari
  const user =
    location.state?.user || JSON.parse(localStorage.getItem("level99_user"));

  const levels = [
    {
      id: "beginner",
      label: "Boshlang‘ich",
      description: "Asosiy mavzular va boshlang‘ich tushunchalar",
      icon: "📘",
      bgColor: "from-blue-400 to-blue-600",
    },
    {
      id: "intermediate",
      label: "O‘rta",
      description: "O‘rta darajadagi bilimlar va masalalar",
      icon: "📗",
      bgColor: "from-green-400 to-green-600",
    },
    {
      id: "advanced",
      label: "Yuqori",
      description: "Murakkab mavzular va chuqur bilimlar",
      icon: "📙",
      bgColor: "from-purple-400 to-purple-600",
    },
  ];

  const handleSelect = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleContinue = () => {
    if (!selectedLevel) {
      alert("Iltimos, darajani tanlang!");
      return;
    }

    // Tanlangan levelni saqlash
    localStorage.setItem("selectedLevel", selectedLevel);

    // Career ni tekshirish
    const careerText =
      (user?.career && user.career.toLowerCase()) ||
      localStorage.getItem("career")?.toLowerCase() ||
      "";

    if (careerText.includes("matematika")) {
      navigate("/level-details", { state: { user, selectedLevel } });
    } else if (careerText.includes("kimyo")) {
      navigate("/chemistry-teacher", { state: { user, selectedLevel } });
    } else if (careerText.includes("biologiya")) {
      navigate("/biology-teacher", { state: { user, selectedLevel } });
    } else if (careerText.includes("tarix")) {
      navigate("/history-teacher", { state: { user, selectedLevel } });
    } else if (careerText.includes("geografiya")) {
      navigate("/geography-teacher", { state: { user, selectedLevel } });
    } else if (careerText.includes("ona tili")) {
      navigate("/onatili-teacher", { state: { user, selectedLevel } });
    } else if (careerText.includes("ingliz")) {
      navigate("/english-teacher", { state: { user, selectedLevel } });
    } else if (careerText.includes("informatika")) {
      navigate("/informatics-teacher", { state: { user, selectedLevel } }); // ✅ Informatika qo‘shildi
    } else {
      navigate("/other-subject", { state: { user, selectedLevel } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl max-w-lg w-full p-10">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-12 tracking-wide drop-shadow-md">
          {user?.career
            ? `${user.career} uchun darajani tanlang`
            : "Darajani tanlang"}
        </h1>

        <div className="flex flex-col space-y-6">
          {levels.map(({ id, label, description, icon, bgColor }) => {
            const isSelected = selectedLevel === id;
            return (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                className={`relative flex items-center space-x-5 rounded-2xl p-6 cursor-pointer transition-shadow duration-300
                  ${
                    isSelected
                      ? `bg-gradient-to-r ${bgColor} text-white shadow-lg`
                      : "bg-white border border-gray-300 hover:shadow-lg hover:border-indigo-400"
                  }
                `}
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-full text-3xl ${
                    isSelected
                      ? "bg-white text-indigo-700"
                      : "bg-indigo-100 text-indigo-500"
                  } shadow-md flex-shrink-0`}
                  aria-hidden="true"
                >
                  {icon}
                </div>

                <div className="flex flex-col text-left">
                  <h2
                    className={`text-2xl font-semibold ${
                      isSelected ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {label}
                  </h2>
                  <p
                    className={`mt-1 text-sm opacity-90 ${
                      isSelected ? "text-indigo-100" : "text-gray-500"
                    }`}
                  >
                    {description}
                  </p>
                </div>

                {isSelected && (
                  <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-3xl select-none">
                    ✔
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          className="mt-12 w-full bg-indigo-700 hover:bg-indigo-800 text-white py-4 rounded-3xl font-bold text-lg tracking-wide shadow-lg transition-all duration-300 active:scale-95"
          aria-label="Darajani tanlab davom etish"
        >
          Davom etish
        </button>
      </div>
    </div>
  );
};

export default LevelSelection;
