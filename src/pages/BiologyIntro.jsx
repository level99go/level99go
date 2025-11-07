import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BiologyIntro() {
  const navigate = useNavigate();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);

  // Mouse tracking
  useEffect(() => {
    const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Generate random stars
  useEffect(() => {
    const s = Array.from({ length: 50 }, () => ({
      size: 2 + Math.random() * 4,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 0.1 + Math.random() * 0.3,
      opacity: 0.2 + Math.random() * 0.5
    }));
    setStars(s);

    const interval = setInterval(() => {
      setStars(prev =>
        prev.map(star => ({
          ...star,
          x: (star.x + star.speed) % window.innerWidth
        }))
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black via-green-900 to-black overflow-hidden flex items-center justify-center px-6">
      
      {/* Moving stars */}
      <div className="absolute inset-0 z-0">
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-400"
            style={{
              width: `${s.size}px`,
              height: `${s.size}px`,
              left: s.x,
              top: s.y,
              opacity: s.opacity,
              filter: "blur(1px)"
            }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Glass neon box */}
      <div className="relative z-10 max-w-2xl w-full text-center p-12 rounded-3xl backdrop-blur-xl border border-green-400/50 shadow-[0_0_40px_rgba(0,255,128,0.6)] hover:shadow-[0_0_60px_rgba(0,255,128,0.8)] transition-all duration-500">
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-teal-300 to-green-400 drop-shadow-lg animate-pulse">
          🧬 Biologiya Testi
        </h1>

        <p className="text-gray-200 text-lg md:text-xl mt-6 leading-relaxed">
          20 ta savol. Har biriga <span className="text-green-300 font-bold">10 soniya</span>!
          Sinab ko‘ring va reytingni oshiring!
        </p>

        <button
          onClick={() => navigate("/biology")}
          className="mt-8 px-14 py-5 text-xl font-bold rounded-3xl bg-gradient-to-r from-green-600 to-teal-500 text-white shadow-lg hover:shadow-[0_0_30px_rgba(0,255,128,0.8)] hover:scale-110 transition-all duration-300 relative overflow-hidden"
        >
          🚀 Boshlash
          <span className="absolute top-0 left-0 w-full h-full bg-white/10 animate-pulse pointer-events-none rounded-3xl"></span>
        </button>

      </div>

      {/* Bottom neon glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-green-400/10 blur-3xl animate-pulse"></div>

    </div>
  );
}
