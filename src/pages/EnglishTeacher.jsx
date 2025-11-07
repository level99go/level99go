// src/pages/EnglishTeacher.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Languages, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function EnglishTeacher() {
  const location = useLocation();
  const navigate = useNavigate();

  const subject = location.state?.subject || "Ingliz tili";
  const selectedLevel = location.state?.selectedLevel || "beginner";

  // Darajaga qarab vazifalar
  const levelTasks = {
    beginner: [
      "Asosiy grammatik qoidalar bilan tanishish",
      "Oddiy so‘z va iboralarni yod olish",
      "O‘qish va talaffuzni mashq qilish",
    ],
    intermediate: [
      "Murakkabroq grammatik tuzilmalarni o‘rganish",
      "Matnlar bilan ishlash va esse yozish",
      "Nutq madaniyatini rivojlantirish",
    ],
    advanced: [
      "Akademik va ilmiy ingliz tilini o‘rganish",
      "Xalqaro imtihonlarga (IELTS, TOEFL) tayyorlanish",
      "Professional sohalarda ingliz tilini qo‘llash",
    ],
  };

  const tasks = levelTasks[selectedLevel] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-200 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full p-10"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-blue-900 mb-10 tracking-wide drop-shadow-md"
        >
          Ingliz tili o‘qituvchisi{" "}
          <span className="capitalize">({selectedLevel} daraja)</span>
        </motion.h1>

        {/* Info Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Avatar */}
          <motion.img
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="English Teacher"
            className="w-44 h-44 rounded-full shadow-lg border-4 border-sky-300"
          />

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gray-700 text-lg leading-relaxed space-y-5"
          >
            <p>
              Ingliz tili o‘qituvchilari o‘quvchilarga{" "}
              <b>grammatika, lug‘at boyligi, talaffuz va yozuv ko‘nikmalarini</b>{" "}
              o‘rgatadilar.
            </p>
            <p>Tanlangan darajaga qarab, siz quyidagi vazifalarni bajarishingiz kerak:</p>

            {/* Tasks */}
            <ul className="list-disc list-inside text-gray-800 space-y-2 pl-2">
              {tasks.map((task, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.2 }}
                  className="hover:text-blue-600 transition"
                >
                  {task}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Kim?</h3>
            <p className="text-gray-600 text-center">
              Ingliz tilini o‘rgatib, xalqaro til sifatida qo‘llashni
              o‘rgatuvchi ustoz.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <Languages className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Vazifalari
            </h3>
            <p className="text-gray-600 text-center">
              Grammatikani, talaffuzni, nutq madaniyatini o‘rgatish va xalqaro
              imtihonlarga tayyorlash.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center bg-blue-50 p-6 rounded-2xl shadow hover:shadow-xl transition"
          >
            <Globe className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Ahamiyati
            </h3>
            <p className="text-gray-600 text-center">
              Ingliz tili bilimlari — xalqaro ta’lim, ish va muloqotda
              muvaffaqiyatli bo‘lish uchun zarurdir.
            </p>
          </motion.div>
        </div>

        {/* Buttons */}
        <div className="mt-12 flex justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/level-selection")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-8 rounded-2xl shadow-md transition duration-300"
          >
            Orqaga
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/universities", { state: { subject } })}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg transition duration-300"
          >
            Universitetlar ro‘yxatini ko‘rish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
