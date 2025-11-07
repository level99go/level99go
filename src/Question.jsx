// src/Question.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Question() {
  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("level99_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const uCareer = parsedUser?.career?.toLowerCase();

      if (
        uCareer === "ufc" ||
        uCareer === "ufc jangchisi" ||
        uCareer === "bokschi"
      ) {
        navigate("/profile");
      } else if (uCareer === "bloger") {
        navigate("/blogger-followers");
      } else {
        setUser(parsedUser);
      }
    } else {
      navigate("/register");
    }
  }, []);

  if (!user) return null;

  const questionsByCareer = {
    // ✅ Hozircha faqat PUBG uchun
    "pubg o‘yinchisi": [
      {
        id: "pubgId",
        text: "🎮 ID raqamingizni kiriting (11 ta raqam):",
        isId: true,
      },
    ],
  };

  const careerKey = user.career?.toLowerCase();
  const questions = questionsByCareer[careerKey] || [];

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let level = 0;

    for (const key in answers) {
      const val = parseFloat(answers[key]);
      if (key === "pubgId") continue;

      if (!isNaN(val)) {
        level += val;
      }
    }

    const extendedUser = {
      ...user,
      answers: {
        ...user.answers,
        [careerKey]: answers,
      },
      level,
    };

    localStorage.setItem("level99_user", JSON.stringify(extendedUser));
    alert("✅ Ma’lumotlar saqlandi!");

    if (careerKey === "pubg o‘yinchisi") {
      navigate("/profiles/basic");
    } else {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
          {user.career} uchun savollar
        </h2>

        {questions.length === 0 ? (
          <p className="text-red-400 text-center">
            Bu yo‘nalish uchun savollar yo‘q.{" "}
            <button
              type="button"
              className="underline text-blue-400"
              onClick={() => navigate("/profile")}
            >
              Profilga o‘tish
            </button>
          </p>
        ) : (
          <>
            {questions.map((q, i) => (
              <div key={q.id} className="mb-4">
                <label className="block mb-1 font-medium">
                  {i + 1}. {q.text}
                </label>
                <input
                  type={q.isId ? "text" : "number"}
                  className="w-full p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  required
                  pattern={q.isId ? "\\d{11}" : undefined}
                  maxLength={q.isId ? 11 : undefined}
                  inputMode={q.isId ? "numeric" : "decimal"}
                  placeholder={q.isId ? "Masalan: 12345678901" : ""}
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 px-4 rounded-xl font-bold mt-4 transition-all duration-300"
            >
              ✅ Yakunlash
            </button>
          </>
        )}
      </form>
    </div>
  );
}
