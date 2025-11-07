// src/forms/MathForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mathQuestions from "../data/mathQuestions";
import { motion } from "framer-motion";

export default function MathForm() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("level99_user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/register");
    }
  }, [navigate]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleOptionClick = (index) => {
    if (showAnswer) return;
    setSelectedOption(index);
    setShowAnswer(true);

    if (index === mathQuestions[currentIndex].correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      handleNext();
    }, 1200);
  };

  const handleNext = async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < mathQuestions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
      setShowAnswer(false);
      setTimeLeft(30);
    } else {
      const total = mathQuestions.length;
      const percentage = Math.round((score / total) * 100);

      let levelText = "";
      if (percentage >= 95) levelText = "📊 Matematik Daho";
      else if (percentage >= 80) levelText = "💡 A'lo daraja";
      else if (percentage >= 60) levelText = "📘 O‘rtacha bilim";
      else levelText = "📕 Boshlovchi";

      const updatedUser = { ...user };
      if (!updatedUser.answers) updatedUser.answers = {};
      updatedUser.answers.math = { score, total, percentage, levelText };

      try {
        // Backendga yuborish
        const res = await fetch(
          `http://localhost:5000/api/users/${updatedUser.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers: updatedUser.answers }),
          }
        );

        if (!res.ok) throw new Error("Backend update failed");
        const saved = await res.json();

        localStorage.setItem("level99_user", JSON.stringify(saved));
        navigate("/math-result", { state: { percentage, levelText } });
      } catch (err) {
        console.error("❌ Math results update error:", err);
        // Fallback — faqat localStorage
        localStorage.setItem("level99_user", JSON.stringify(updatedUser));
        navigate("/math-result", { state: { percentage, levelText } });
      }
    }
  };

  if (!user) return null;
  const current = mathQuestions[currentIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white px-4 relative overflow-hidden">
      {/* Orqa fon effektlari */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl space-y-6 relative z-10"
      >
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-yellow-300 drop-shadow-lg">
          📐 Matematika Testi
        </h1>
        <p className="text-center text-gray-300">
          Savol {currentIndex + 1} / {mathQuestions.length}
        </p>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-semibold bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-5 rounded-2xl shadow-lg border border-purple-400/30"
        >
          {current.question}
        </motion.div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-4">
          {current.options.map((option, index) => {
            const isCorrect = index === current.correct;
            const isSelected = index === selectedOption;

            let buttonStyle = "bg-gray-800/60 border-gray-600 hover:bg-gray-700";
            if (showAnswer) {
              if (isCorrect) buttonStyle = "bg-green-600 border-green-500";
              else if (isSelected) buttonStyle = "bg-red-600 border-red-500";
              else buttonStyle = "bg-gray-700 border-gray-600";
            }

            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 ${buttonStyle}`}
                disabled={showAnswer}
              >
                {option}
              </motion.button>
            );
          })}
        </div>

        {/* Timer */}
        <div>
          <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 30) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
              className="h-3 bg-gradient-to-r from-yellow-400 to-red-500"
            />
          </div>
          <p className="text-right text-sm text-gray-300 mt-1">
            ⏳ {timeLeft} soniya
          </p>
        </div>
      </motion.div>
    </div>
  );
}
