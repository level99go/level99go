// src/pages/LevelDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const mathTopics = {
  beginner: [
    {
      title: "Natural sonlar va ularni taqqoslash",
      info: "Natural sonlar — 1, 2, 3 kabi sonlar. Ularni taqqoslash orqali kattaliklarni aniqlash mumkin.",
    },
    {
      title: "Qo‘shish, ayirish, ko‘paytirish, bo‘lish",
      info: "To‘rt amal arifmetika asosini tashkil etadi. Har bir amalni amalda qo‘llash mashqlar orqali mustahkamlanadi.",
    },
    {
      title: "Oddiy kasrlar va ularga amallar",
      info: "Kasrlar butun bo‘lmagan qiymatlarni ifodalaydi. Ularga qo‘shish, ayirish, ko‘paytirish va bo‘lish amallari bajariladi.",
    },
    {
      title: "O‘lchov birliklari (uzunlik, og‘irlik, vaqt)",
      info: "Metr, kilogramm, sekund kabi birliklar turli kattaliklarni o‘lchashda ishlatiladi.",
    },
    {
      title: "Oddiy geometrik shakllar",
      info: "Kvadrat, uchburchak, to‘rtburchak va aylana asosiy shakllar hisoblanadi.",
    },
  ],
  intermediate: [
    {
      title: "Algebra asoslari va ko‘paytma formulalari",
      info: "Algebra simvolli hisoblashni o‘rganadi. Ko‘paytma formulalari algebra asoslaridan biridir.",
    },
    {
      title: "Tenglamalar va tengsizliklar tizimlari",
      info: "Tenglamalar noma’lumlarni topishda, tengsizliklar esa qiymatlarni taqqoslashda ishlatiladi.",
    },
    {
      title: "Foizlar, arifmetik progressiyalar",
      info: "Foiz hisoblash iqtisodiy hisoblarda keng qo‘llanadi. Progressiya sonlarning tartibli ketma-ketligidir.",
    },
  ],
  advanced: [
    {
      title: "Murakkab algebraik ifodalar va faktorizatsiya",
      info: "Murakkab ifodalarni soddalashtirish matematik hisoblarni yengillashtiradi.",
    },
    {
      title: "Kvadrat tenglamalar va kvadrat tenglama tizimlari",
      info: "Kvadrat tenglamalar yechish usullari — diskriminant, kvadrat ildiz formulasi va hokazo.",
    },
    {
      title: "Trigonometriya asoslari va identifikatsiyalar",
      info: "Sinus, kosinus, tangens va ularning o‘zaro bog‘lanishlari trigonometriyaning asosini tashkil etadi.",
    },
  ],
};

const levelLabels = {
  beginner: "Boshlang‘ich",
  intermediate: "O‘rta",
  advanced: "Yuqori",
};

const adviceByLevel = {
  beginner:
    "Siz boshlang‘ich darajani tanladingiz. Avvalo asosiy tushunchalar va oddiy matematikani mustahkam o‘rganing.",
  intermediate:
    "O‘rta daraja tanlandi. Algebra, geometriya va trigonometriya bo‘yicha bilimlaringizni chuqurlashtiring.",
  advanced:
    "Yuqori daraja tanlandi. Murakkab mavzularni chuqur o‘rganing va amaliy masalalarda ko‘proq mashq qiling.",
};

export default function LevelDetails() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const level = localStorage.getItem("selectedLevel");
    if (!level) {
      navigate("/level-selection");
    } else {
      setSelectedLevel(level);
    }
  }, [navigate]);

  if (!selectedLevel) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full"
      >
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-8 tracking-wide drop-shadow-md">
          {levelLabels[selectedLevel]} darajadagi Matematik mavzular
        </h1>

        <p className="max-w-3xl mx-auto text-center text-lg mb-10 italic text-gray-700 leading-relaxed">
          {adviceByLevel[selectedLevel]}
        </p>

        <div className="space-y-4 mb-12">
          {mathTopics[selectedLevel]?.map((topic, idx) => (
            <div key={idx} className="border rounded-xl shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center px-5 py-3 text-left text-lg font-medium text-gray-800 hover:bg-green-100 transition-all rounded-xl"
              >
                {topic.title}
                <span className="text-green-600">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-5 pb-4 text-gray-600 bg-green-50 rounded-b-xl"
                  >
                    {topic.info}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/level-selection")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-2xl shadow-md transition duration-300"
          >
            Orqaga
          </button>
          <button
            onClick={() =>
              navigate("/universities", { state: { subject: "Matematika" } })
            }
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition duration-300 active:scale-95"
          >
            Universitetlar ro‘yxatini ko‘rish
          </button>
        </div>
      </motion.div>
    </div>
  );
}
