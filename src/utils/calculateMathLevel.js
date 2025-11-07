export default function calculateMathLevel(score) {
  // Har bir to‘g‘ri javob 2.5 ball
  const level = score * 2.5;

  // Maksimal level 50 dan oshmasin
  return Math.min(level, 50);
}
