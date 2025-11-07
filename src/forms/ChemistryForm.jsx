import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import chemistryQuestions from "../data/chemistryQuestions";

export default function ChemistryForm() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [selected, setSelected] = useState("");
  const questions = chemistryQuestions;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s === 1) {
          handleNext();
          return 10;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = (option) => {
    const q = questions[current];

    if (option) {
      setSelected(option);
      setTimeout(() => {
        if (option === q.correct) {
          setScore((prev) => prev + 1);
        }
        goNext();
      }, 700);
    } else {
      goNext();
    }
  };

  const goNext = () => {
    setSelected("");
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSeconds(10);
    } else {
      const level = Math.round((score / questions.length) * 50);
      const user = JSON.parse(localStorage.getItem("level99_user"));
      user.answers.chemistry = { score, level };
      localStorage.setItem("level99_user", JSON.stringify(user));
      navigate("/chemistry-result", { state: { score, level } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-900 via-cyan-950 to-black p-6">
      {/* 🔮 Orqa fon effektlari */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-16 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-700/20 rounded-full blur-3xl animate-bounce"></div>
      </div>

      {/* 📦 Test Card */}
      <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl w-full max-w-2xl text-white border border-cyan-500/40">
        <h2 className="text-4xl font-extrabold text-center text-cyan-200 mb-6 drop-shadow-lg animate-pulse">
          🧪 Kimyo testi
        </h2>

        <p className="text-lg md:text-xl text-center text-cyan-100 mb-8 leading-relaxed">
          {questions[current].question}
        </p>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {questions[current].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleNext(option)}
              className={`py-3 px-4 rounded-2xl transition-all duration-300 font-semibold text-base shadow-md
                ${
                  selected
                    ? option === questions[current].correct
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-900/50 scale-105"
                      : option === selected
                      ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-red-900/50 scale-95"
                      : "bg-gray-700 text-gray-300 opacity-60"
                    : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-cyan-600 hover:to-blue-700 hover:scale-105"
                }`}
              disabled={!!selected}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Timer & Progress */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-500 transition-all duration-1000"
              style={{ width: `${(seconds / 10) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-cyan-200">
            ⏱ Qolgan vaqt:{" "}
            <span className="font-bold text-yellow-300">{seconds}</span> soniya
          </p>
          <p className="text-sm text-gray-300">
            📘 Savol: {current + 1} / {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
}
