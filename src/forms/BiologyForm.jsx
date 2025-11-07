import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import biologyQuestions from "../data/biologyQuestions";

export default function BiologyForm() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const question = biologyQuestions[current];

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === question.correct) setScore((prev) => prev + 1);
    setTimeout(() => handleNext(), 500);
  };

  const handleNext = () => {
    if (current + 1 < biologyQuestions.length) {
      setCurrent((prev) => prev + 1);
      setTimeLeft(10);
      setSelected(null);
    } else {
      saveResult();
    }
  };

  const saveResult = () => {
    const user = JSON.parse(localStorage.getItem("level99_user"));
    if (user) {
      const updatedUser = {
        ...user,
        answers: {
          ...user.answers,
          biology: {
            score,
            level: Math.round((score / biologyQuestions.length) * 50),
          },
        },
      };
      localStorage.setItem("level99_user", JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem("level99_users")) || [];
      const newUsers = users.map((u) =>
        u.username === updatedUser.username ? updatedUser : u
      );
      localStorage.setItem("level99_users", JSON.stringify(newUsers));

      navigate("/biology-result");
    }
  };

  const timerPercent = (timeLeft / 10) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-green-800 px-4">
      <div className="relative max-w-xl w-full bg-black/70 rounded-3xl p-8 shadow-2xl border border-green-500 space-y-6">
        
        {/* Timer bar */}
        <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-green-500 transition-all duration-1000`}
            style={{ width: `${timerPercent}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-green-300 text-sm">
          <span>Savol {current + 1} / {biologyQuestions.length}</span>
          <span>⏱ {timeLeft} soniya</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white">{question.question}</h2>

        <div className="grid gap-4">
          {question.options.map((option, index) => {
            const isCorrect = option === question.correct;
            const isSelected = option === selected;
            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={!!selected}
                className={`py-3 px-5 rounded-xl text-left font-medium transition-all duration-300 shadow-md
                  ${
                    selected
                      ? isCorrect
                        ? "bg-green-600 text-white shadow-lg scale-105"
                        : isSelected
                        ? "bg-red-600 text-white shadow-lg scale-105"
                        : "bg-gray-800 text-gray-300 opacity-70"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  }
                `}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
