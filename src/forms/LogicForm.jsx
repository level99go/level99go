// src/forms/LogicForm.jsx
import React, { useState, useEffect } from "react";
import logicQuestions from "../data/logicQuestions";
import { useNavigate } from "react-router-dom";

const LogicForm = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showResult, setShowResult] = useState(false);

  const question = logicQuestions[currentQuestion];

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === question.correct) {
      setScore((prev) => prev + 1);
    }
    setTimeout(handleNext, 500);
  };

  const handleNext = () => {
    if (currentQuestion + 1 < logicQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelected(null);
      setTimeLeft(10);
    } else {
      setShowResult(true);
    }
  };

  const finishTest = () => {
    navigate("/profiles/logic", { state: { score } });
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-blue-100 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">✅ Test yakunlandi!</h1>
        <p className="text-xl mb-4">Natija: {score} / {logicQuestions.length}</p>
        <button
          onClick={finishTest}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Profilga o‘tish
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-100 to-orange-100 p-4 text-center">
      <h2 className="text-xl font-semibold mb-2">🧠 Mantiqiy Savol {currentQuestion + 1} / {logicQuestions.length}</h2>
      <p className="text-lg font-medium mb-4">{question.question}</p>
      <div className="flex flex-col gap-3 w-full max-w-md">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(option)}
            disabled={!!selected}
            className={`px-4 py-2 rounded-xl border text-left ${
              selected === option
                ? option === question.correct
                  ? "bg-green-300 border-green-600"
                  : "bg-red-300 border-red-600"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-6 text-gray-700 text-sm">⏳ Qolgan vaqt: {timeLeft} soniya</div>
    </div>
  );
};

export default LogicForm;
