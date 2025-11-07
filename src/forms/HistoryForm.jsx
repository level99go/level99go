// src/pages/HistoryForm.jsx
import React, { useEffect, useState } from "react";
import historyQuestions from "../data/historyQuestions";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HistoryForm() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = historyQuestions[current];

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (index) => {
    if (showAnswer) return;

    setSelected(index);
    setShowAnswer(true);

    if (index === question.correct) setScore((prev) => prev + 1);

    setTimeout(() => handleNext(), 1200);
  };

  const handleNext = () => {
    if (current + 1 < historyQuestions.length) {
      setCurrent((prev) => prev + 1);
      setTimeLeft(10);
      setSelected(null);
      setShowAnswer(false);
    } else {
      localStorage.setItem("history_score", score);
      navigate("/history-result");
    }
  };

  const progress = (timeLeft / 10) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-green-700 text-white p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 w-full max-w-2xl space-y-6 border border-green-300"
      >
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-center bg-gradient-to-r from-lime-300 to-green-200 text-transparent bg-clip-text animate-pulse">
          📘 Tarix testi ({current + 1} / {historyQuestions.length})
        </h1>

        {/* Timer & Score */}
        <div className="flex justify-between items-center">
          <div className="w-1/2 mr-4">
            <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-green-200 mt-1 text-sm text-center">⏳ {timeLeft} soniya</p>
          </div>
          <p className="text-green-300 text-sm md:text-base font-semibold">✅ Ball: {score * 2.5} / 50</p>
        </div>

        {/* Question */}
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-lg md:text-xl font-semibold text-gray-100"
        >
          {question.question}
        </motion.div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const baseClasses = "w-full text-left p-3 rounded-xl font-medium border transition-all duration-300 shadow-md";
            const selectedCorrect = showAnswer && index === question.correct;
            const selectedWrong = showAnswer && index === selected && index !== question.correct;

            const bgClass = selectedCorrect
              ? "bg-gradient-to-r from-green-500 to-green-600 border-green-400 text-white"
              : selectedWrong
              ? "bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white"
              : showAnswer
              ? "bg-gray-700 border-gray-600 text-gray-300"
              : "bg-gray-800 hover:bg-green-600 border-gray-700 text-gray-100";

            return (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`${baseClasses} ${bgClass}`}
                whileHover={{ scale: !showAnswer ? 1.03 : 1 }}
                whileTap={{ scale: !showAnswer ? 0.97 : 1 }}
              >
                {option}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
