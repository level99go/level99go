// src/hooks/useCyberQuiz.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cyberQuestions } from "../data/cyberQuestions";

export default function useCyberQuiz() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("level99_user"));
    if (!userData || userData.career !== "Kiberxavfsizlik xodimi") {
      navigate("/register");
    } else {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleAnswer(null);
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (index) => {
    const isCorrect = index === cyberQuestions[current].correct;
    if (isCorrect) setScore((s) => s + 1);

    if (current + 1 < cyberQuestions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setTimeLeft(10);
    } else {
      const finalLevel = Math.round(((score + (isCorrect ? 1 : 0)) * 2.5) * 10) / 10;
      const updatedUser = {
        ...user,
        level: finalLevel,
        answers: {
          ...user.answers,
          cyber: finalLevel
        }
      };
      localStorage.setItem("level99_user", JSON.stringify(updatedUser));
      navigate("/cyber-result");
    }
  };

  return {
    user,
    current,
    score,
    selected,
    timeLeft,
    handleAnswer,
    setSelected,
    questions: cyberQuestions
  };
}
