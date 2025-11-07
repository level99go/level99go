import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import geographyQuestions from "../data/geographyQuestions";
import { motion } from "framer-motion";

export default function GeographyForm() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);

  const currentQuestion = geographyQuestions[currentIndex];
  const totalQuestions = geographyQuestions.length;

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
    const isCorrect = selectedOption === currentQuestion.correct;

    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.correct,
        isCorrect: isCorrect,
      },
    ];
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(10);
    } else {
      const correctAnswers = updatedAnswers.filter((a) => a.isCorrect).length;
      const score = correctAnswers * 5;

      localStorage.setItem(
        "level99_geo_answers",
        JSON.stringify(updatedAnswers)
      );

      navigate("/geography-result", {
        state: { score, total: totalQuestions, correctAnswers },
      });
    }
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1950&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-blue-900/70 to-yellow-900/60 backdrop-blur-sm z-0" />

      {/* Floating sparkles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
          animate={{ y: [0, 15, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: Math.random() }}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full blur-sm"
        />
      ))}

      {/* Card */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-3xl space-y-6 text-white"
      >
        {/* Progress */}
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-green-400 to-lime-300"
          />
        </div>

        {/* Timer */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center text-lg font-semibold"
        >
          <span>⏱ Vaqt: {timeLeft} soniya</span>
          <span>
            {currentIndex + 1} / {totalQuestions}
          </span>
        </motion.div>

        {/* Question */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center"
        >
          {currentQuestion.question}
        </motion.h2>

        {/* Options */}
        <div className="grid gap-4 mt-2">
          {currentQuestion.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(option)}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 hover:from-green-600 hover:via-teal-600 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
            >
              {option}
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm text-white/80 text-center"
        >
          Har bir savol uchun 10 soniya vaqtingiz bor. Bilimlaringizni sinang! 🌍
        </motion.p>
      </motion.div>
    </div>
  );
}
