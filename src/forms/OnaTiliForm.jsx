import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uzbekQuestions from "../data/uzbekQuestions";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function OnaTiliForm() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);

  const currentQuestion = uzbekQuestions[currentIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleAnswer(null);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleAnswer = (selectedOption) => {
    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.correct,
        isCorrect: selectedOption === currentQuestion.correct,
      },
    ];
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < uzbekQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(10);
    } else {
      localStorage.setItem("level99_uzbek_answers", JSON.stringify(updatedAnswers));
      navigate("/uzbek-result");
    }
  };

  const progressPercent = (timeLeft / 10) * 100;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      <div className="relative z-10 w-full max-w-3xl p-8 bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-white font-semibold text-lg">⏱ Vaqt:</p>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={progressPercent}
                maxValue={100}
                text={`${timeLeft}s`}
                styles={buildStyles({
                  pathColor: "#FACC15",
                  textColor: "#ffffff",
                  trailColor: "#1E293B",
                  textSize: "24px",
                })}
              />
            </div>
          </div>
          <span className="text-white/90 font-semibold text-sm">
            Savol {currentIndex + 1} / {uzbekQuestions.length}
          </span>
        </div>

        {/* Savol */}
        <h1 className="text-3xl font-bold text-center text-white animate-pulse">
          {currentQuestion.question}
        </h1>

        {/* Javoblar */}
        <div className="grid gap-4">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              className="w-full py-4 px-5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-white/70 mt-4">
          Har bir savol uchun 10 soniya. Bilimlaringizni sinang! 📚
        </p>
      </div>
    </div>
  );
}
