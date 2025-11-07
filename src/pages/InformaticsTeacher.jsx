// src/pages/InformaticsTeacher.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Monitor, Code, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function InformaticsTeacher() {
  const location = useLocation();
  const navigate = useNavigate();

  const subject = location.state?.subject || "Informatika";
  const selectedLevel = location.state?.selectedLevel || "beginner";

  // Darajaga qarab vazifalar
  const levelTasks = {
    beginner: [
      "Kompyuter va uning asosiy qismlari bilan tanishish",
      "Dasturlash asoslari va algoritmlarni o‘rganish",
      "Ofis dasturlari va internetdan foydalanish",
    ],
    intermediate: [
      "Algoritmik fikrlashni rivojlantirish",
      "OOP va dasturlash tillarini chuqurlashtirish (Python, Java, C++)",
      "Ma’lumotlar bazalari bilan ishlash",
    ],
    advanced: [
      "Sun’iy intellekt va mashinani o‘qitish asoslari",
      "Katta loyihalar yaratish va jamoada ishlash",
      "Kiberxavfsizlik va zamonaviy texnologiyalarni o‘rganish",
    ],
  };

  const tasks = levelTasks[selectedLevel] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-200 to-teal-300 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full p-10"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-emerald-900 mb-10 tracking-wide drop-shadow"
        >
          Informatika o‘qituvchisi{" "}
          <span className="text-emerald-600">
            ({selectedLevel.toUpperCase()} daraja)
          </span>
        </motion.h1>

        {/* Info Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Avatar */}
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            src="https://cdn-icons-png.flaticon.com/512/2721/2721265.png"
            alt="Informatics Teacher"
            className="w-44 h-44 rounded-full shadow-xl border-4 border-emerald-400 hover:scale-105 transition-transform duration-300"
          />

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-gray-700 text-lg leading-relaxed space-y-5"
          >
            <p>
              Informatika o‘qituvchilari o‘quvchilarga{" "}
              <b>dasturlash, algoritmlar, kompyuter tizimlari</b> va
              texnologiyalarni o‘rgatadilar.
            </p>
            <p>Tanlangan darajaga qarab, quyidagi vazifalar bajariladi:</p>

            {/* Tasks */}
            <ul className="list-disc list-inside text-gray-800 space-y-2 pl-2">
              {tasks.map((task, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5, color: "#059669" }}
                  className="cursor-pointer transition"
                >
                  {task}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[
            {
              icon: <Monitor className="w-12 h-12 text-emerald-600 mb-4" />,
              title: "Kim?",
              desc: "Kompyuter savodxonligi va dasturlashni o‘rgatuvchi ustoz.",
            },
            {
              icon: <Code className="w-12 h-12 text-emerald-600 mb-4" />,
              title: "Vazifalari",
              desc: "Algoritmlar, dasturlash tillari va loyihalarni tushuntirish.",
            },
            {
              icon: <Cpu className="w-12 h-12 text-emerald-600 mb-4" />,
              title: "Ahamiyati",
              desc: "Informatika bilimlari zamonaviy kasblar uchun poydevor.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center bg-green-50 p-6 rounded-2xl shadow hover:shadow-xl transition"
            >
              {card.icon}
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-600 text-center">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-12 flex justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/level-selection")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-2xl shadow-md transition duration-300"
          >
            Orqaga
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/universities", { state: { subject } })}
            className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg transition duration-300"
          >
            Universitetlar ro‘yxatini ko‘rish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
