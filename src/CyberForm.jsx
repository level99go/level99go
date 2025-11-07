// src/pages/CyberForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cyberQuestions } from "./data/cyberQuestions";
import { motion, AnimatePresence } from "framer-motion";

const CyberForm = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [finished, setFinished] = useState(false);

  const current = cyberQuestions[index];

  /* ---------------------------- TIMER ---------------------------- */
  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [index, finished]);

  /* ---------------------------- HANDLERS ---------------------------- */
  const handleSelect = (i) => {
    setSelected(i);
    if (i === current.correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (index + 1 < cyberQuestions.length) {
      setIndex(index + 1);
      setSelected(null);
      setTimeLeft(15);
    } else {
      setFinished(true);

      // CyberResult sahifasiga yuborish uchun localStorage update
      const updatedUser = JSON.parse(localStorage.getItem("level99_user")) || {};
      updatedUser.answers = {
        ...updatedUser.answers,
        cyber: {
          score: score,
          totalQuestions: cyberQuestions.length,
        },
      };
      updatedUser.level = Math.round((score / cyberQuestions.length) * 50);
      localStorage.setItem("level99_user", JSON.stringify(updatedUser));

      navigate("/cyber-result"); // <- Bu qator ishlashini ta'minlaydi
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(15);
    setFinished(false);
  };

  const level = Math.round((score / cyberQuestions.length) * 50);
  const progress = ((index + (finished ? 1 : 0)) / cyberQuestions.length) * 100;

  /* ---------------------------- CREATIVE ELEMENTS ---------------------------- */
  const floatingEmojis = [
    { emoji: "💻", x: 50, y: 100, size: 24, delay: 0 },
    { emoji: "🛡️", x: 300, y: 50, size: 28, delay: 1 },
    { emoji: "🧠", x: 150, y: 400, size: 22, delay: 2 },
    { emoji: "⚡", x: 400, y: 200, size: 20, delay: 3 },
    { emoji: "🕵️", x: 100, y: 250, size: 26, delay: 4 },
  ];

  const particleTrail = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 3,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    opacity: Math.random() * 0.3 + 0.1,
    delay: Math.random() * 3,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white px-4 overflow-hidden relative">
      {/* Floating emojis */}
      {floatingEmojis.map((el, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{ left: el.x, top: el.y, fontSize: el.size, opacity: 0.3 }}
          animate={{ y: [0, -40, 0], rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6 + idx, delay: el.delay }}
        >
          {el.emoji}
        </motion.div>
      ))}

      {/* Particle trail */}
      {particleTrail.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ width: p.size, height: p.size, left: p.x, top: p.y, opacity: p.opacity }}
          animate={{ y: [0, -20, 0], x: [0, 20, 0], opacity: [p.opacity, 0, p.opacity] }}
          transition={{ repeat: Infinity, duration: 5 + p.delay, ease: "easeInOut", delay: p.delay }}
        />
      ))}

      {!finished ? (
        <motion.div
          className="max-w-xl w-full bg-gradient-to-br from-slate-700 to-slate-600 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-600 rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-3 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Header */}
          <div className="flex justify-between mb-4 text-sm text-gray-300 font-mono">
            <span>Savol {index + 1} / {cyberQuestions.length}</span>
            <span className="font-bold">⏱ {timeLeft}s</span>
          </div>

          {/* Question + Options */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-wide text-cyan-400 drop-shadow-lg">
                {current.question}
              </h2>
              <div className="grid gap-4">
                {current.options.map((opt, i) => (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    key={i}
                    onClick={() => handleSelect(i)}
                    className={`w-full text-left px-5 py-3 rounded-xl border transition-all font-semibold ${
                      selected === i
                        ? i === current.correct
                          ? "bg-green-600 border-green-700 shadow-lg"
                          : "bg-red-600 border-red-700 shadow-lg"
                        : "bg-slate-600 hover:bg-slate-500 border-slate-500 hover:scale-105"
                    }`}
                    disabled={selected !== null}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>

              {selected !== null && (
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:opacity-90 text-white font-bold px-6 py-3 rounded-2xl shadow-2xl"
                >
                  Keyingi savol →
                </motion.button>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null /* Finished now navigates directly */}
    </div>
  );
};

export default CyberForm;
