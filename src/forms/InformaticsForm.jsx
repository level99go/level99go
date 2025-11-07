// src/forms/InformaticsForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Hourglass, Award, Laptop } from "lucide-react";
import informaticsQuestions from "../data/informaticsQuestions";

export default function InformaticsForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  const current = informaticsQuestions[currentQuestion];

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOptionClick = (option) => {
    if (selectedOption) return;

    setSelectedOption(option);
    const isCorrect = option === current.correct;
    const isLast = currentQuestion + 1 === informaticsQuestions.length;

    if (isCorrect) {
      setScore((prev) => {
        const newScore = prev + 1;
        if (isLast) {
          const level = Math.ceil((newScore / informaticsQuestions.length) * 50);
          navigate("/informatics-result", { state: { score: newScore, level } });
        }
        return newScore;
      });
    } else if (isLast) {
      const level = Math.ceil((score / informaticsQuestions.length) * 50);
      navigate("/informatics-result", { state: { score, level } });
    }

    setTimeout(() => {
      if (!isLast) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOption("");
        setTimeLeft(10);
      }
    }, 800);
  };

  const handleNext = () => {
    const isLast = currentQuestion + 1 === informaticsQuestions.length;
    if (isLast) {
      const level = Math.ceil((score / informaticsQuestions.length) * 50);
      navigate("/informatics-result", { state: { score, level } });
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption("");
      setTimeLeft(10);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Laptop className="text-cyan-400 w-8 h-8" />
          <h1 className="text-2xl font-bold">Informatika Testi</h1>
        </div>

        {/* Question */}
        <motion.h2
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-semibold text-cyan-300 mb-6"
        >
          {current.question}
        </motion.h2>

        {/* Options */}
        <div className="grid gap-4 mb-8">
          {current.options.map((option, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleOptionClick(option)}
              disabled={!!selectedOption}
              className={`px-5 py-3 rounded-xl font-medium text-left transition shadow-md
                ${
                  selectedOption
                    ? option === current.correct
                      ? "bg-green-500/20 border border-green-400 text-green-300"
                      : option === selectedOption
                      ? "bg-red-500/20 border border-red-400 text-red-300"
                      : "bg-white/10 border border-white/20 text-gray-300"
                    : "bg-white/10 border border-cyan-400/40 hover:bg-cyan-500/20"
                }`}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Footer - Timer & Progress */}
        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>
            Savol <span className="text-cyan-400">{currentQuestion + 1}</span> /{" "}
            {informaticsQuestions.length}
          </span>
          <div className="flex items-center gap-2">
            <Hourglass className="w-4 h-4 text-cyan-400" />
            <span>{timeLeft} soniya</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-2 mt-4 overflow-hidden">
          <motion.div
            key={timeLeft}
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 10) * 100}%` }}
            transition={{ duration: 1, ease: "linear" }}
            className="h-2 bg-gradient-to-r from-cyan-400 to-blue-500"
          />
        </div>
      </motion.div>
    </div>
  );
}
