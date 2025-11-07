// src/pages/EnglishForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Star, PenTool } from "lucide-react";
import englishQuestions from "../data/englishQuestions";

export default function EnglishForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // ⏳ 10 sekund
  const navigate = useNavigate();

  const question = englishQuestions[currentQuestion];

  // Timer ishlashi
  useEffect(() => {
    if (isAnswered) return;

    if (timeLeft === 0) {
      handleTimeout();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered]);

  const handleTimeout = () => {
    setIsAnswered(true);
    setTimeout(() => {
      goNextQuestion(false);
    }, 1200);
  };

  const goNextQuestion = (answeredCorrect) => {
    const next = currentQuestion + 1;

    if (next < englishQuestions.length) {
      setCurrentQuestion(next);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimeLeft(10); // ⏳ reset
      if (answeredCorrect) setScore((prev) => prev + 1);
    } else {
      const finalScore = score + (answeredCorrect ? 1 : 0);
      const finalLevel = Math.round(finalScore * 2.5);

      const user = JSON.parse(localStorage.getItem("level99_user"));
      if (user) {
        const updatedUser = {
          ...user,
          answers: {
            ...user.answers,
            english: {
              score: finalScore,
              level: finalLevel,
            },
          },
        };
        localStorage.setItem("level99_user", JSON.stringify(updatedUser));
      }
      navigate("/english-result");
    }
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;

    const isCorrect = option === question.correct;
    setSelectedAnswer(option);
    setIsAnswered(true);

    setTimeout(() => {
      goNextQuestion(isCorrect);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 animate-gradient-x">
      {/* 🌌 Floating icons */}
      <BookOpen className="absolute top-16 left-10 text-yellow-400 opacity-30 animate-bounce" size={64} />
      <Star className="absolute top-32 right-16 text-pink-300 opacity-40 animate-spin-slow" size={48} />
      <PenTool className="absolute bottom-24 left-20 text-green-300 opacity-30 animate-pulse" size={56} />

      {/* 📦 Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -60, scale: 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.2)] p-10 max-w-2xl w-full text-center"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-6 drop-shadow-lg">
          ✨ English Test
        </h2>

        {/* Progress */}
        <div className="mb-6">
          <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-pink-500 transition-all duration-500"
              style={{
                width: `${((currentQuestion + 1) / englishQuestions.length) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-white/70 mt-2">
            Question {currentQuestion + 1} of {englishQuestions.length}
          </p>
        </div>

        {/* ⏳ Timer bar */}
        <div className="mb-8">
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 10) * 100}%` }}
              transition={{ duration: 1, ease: "linear" }}
              className="h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-400"
            />
          </div>
          <p className="text-sm text-white/80 mt-2">⏳ {timeLeft}s</p>
        </div>

        {/* Question */}
        <p className="text-xl font-semibold text-white/90 mb-6">
          {question.question}
        </p>

        {/* Options */}
        <div className="grid gap-4">
          {question.options.map((option, index) => {
            let btnStyle =
              "bg-white/20 text-white border border-white/30 hover:bg-white/30 hover:scale-105";
            if (isAnswered) {
              if (option === question.correct)
                btnStyle =
                  "bg-green-500 text-white shadow-lg shadow-green-500/50 scale-105";
              else if (option === selectedAnswer && option !== question.correct)
                btnStyle =
                  "bg-red-500 text-white shadow-lg shadow-red-500/50 animate-shake";
            }

            return (
              <motion.button
                key={index}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.07 }}
                onClick={() => handleAnswer(option)}
                className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${btnStyle}`}
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
