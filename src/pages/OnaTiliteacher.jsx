// src/pages/OnaTiliTeacher.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BookOpen, PenTool, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function OnaTiliTeacher() {
  const location = useLocation();
  const navigate = useNavigate();

  const subject = location.state?.subject || "Ona tili";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-100 to-red-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-3xl max-w-5xl w-full p-10 border border-rose-100"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-extrabold text-center text-red-800 mb-10 tracking-wide drop-shadow-lg"
        >
          Ona tili o‘qituvchisi haqida
        </motion.h1>

        {/* Info Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Avatar */}
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Ona tili o‘qituvchisi"
            className="w-44 h-44 rounded-full shadow-xl border-4 border-rose-300 hover:scale-105 transition-transform duration-300"
          />

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-gray-700 text-lg leading-relaxed space-y-5"
          >
            <p>
              Ona tili o‘qituvchilari o‘quvchilarga{" "}
              <span className="font-semibold text-red-700">
                o‘zbek tilining imlo qoidalari, grammatikasi, uslublari va nutq
                madaniyatini
              </span>{" "}
              o‘rgatadilar.
            </p>
            <p>
              Ular o‘quvchilarning yozma va og‘zaki nutqini rivojlantirish,
              badiiy asarlarni tahlil qilish hamda tilshunoslik bo‘yicha
              bilimlarini mustahkamlashda muhim rol o‘ynaydi.
            </p>
            <p>
              Ona tili fani — kelajakdagi{" "}
              <span className="font-semibold text-red-700">
                adabiyotshunos, jurnalist, tilshunos va pedagoglar
              </span>{" "}
              uchun poydevor bo‘lib xizmat qiladi.
            </p>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2, duration: 0.6 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {[
            {
              icon: <BookOpen className="w-12 h-12 text-red-600 mb-4" />,
              title: "Kim?",
              text: "Tilni o‘rgatuvchi, nutq madaniyatini rivojlantiruvchi ustoz.",
            },
            {
              icon: <PenTool className="w-12 h-12 text-red-600 mb-4" />,
              title: "Vazifalari",
              text: "Imlo, grammatikani o‘rgatish, yozma va og‘zaki nutqni shakllantirish, asarlarni tahlil qilish.",
            },
            {
              icon: <GraduationCap className="w-12 h-12 text-red-600 mb-4" />,
              title: "Ahamiyati",
              text: "O‘zbek tilini mukammal bilish — ko‘plab kasblar uchun asosiy poydevor hisoblanadi.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center bg-rose-50 p-6 rounded-2xl shadow-md hover:shadow-2xl transition duration-300"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons */}
        <div className="mt-12 flex justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/onatili-level-details")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-2xl shadow-md transition"
          >
            Orqaga
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/universities", { state: { subject } })}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg transition"
          >
            Universitetlar ro‘yxatini ko‘rish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
