// src/pages/BiologyLevelDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Leaf, Dna, Microscope } from "lucide-react";

const biologyTopics = {
  beginner: [
    {
      title: "Biologiyaga kirish: tirik organizmlar haqida umumiy tushuncha",
      info: "Biologiya tirik organizmlarni, ularning tuzilishi, rivojlanishi va o‘zaro ta’sirini o‘rganadigan fan hisoblanadi.",
    },
    {
      title: "Hujayra tuzilishi va funksiyalari",
      info: "Hujayra tirik mavjudotlarning eng kichik tuzilmaviy va funksional birligi bo‘lib, barcha hayotiy jarayonlarni amalga oshiradi.",
    },
    {
      title: "O‘simliklar va hayvonlarning asosiy turlari",
      info: "O‘simliklar fotosintez orqali oziq hosil qiladi, hayvonlar esa tayyor oziqni iste’mol qiladi.",
    },
    {
      title: "Oziq zanjiri va ekotizimlar",
      info: "Oziq zanjiri energiya oqimini ko‘rsatadi, ekotizim esa tirik va noorganik muhitning birligi hisoblanadi.",
    },
    {
      title: "Inson organizmiga kirish: organlar va tizimlar",
      info: "Inson organizmi turli tizimlardan iborat: nafas olish, qon aylanish, asab va boshqalar.",
    },
    {
      title: "Atrof-muhit va tabiatni muhofaza qilish",
      info: "Tabiatni asrash barqaror rivojlanishning muhim qismidir.",
    },
  ],
  intermediate: [
    {
      title: "Genetika asoslari: irsiyat va o‘zgaruvchanlik",
      info: "Genetika irsiy belgilar qanday o‘tishini va yangi belgilarning paydo bo‘lishini o‘rganadi.",
    },
    {
      title: "Fotosintez va nafas olish jarayonlari",
      info: "Fotosintez — o‘simliklarning quyosh nuri yordamida oziq hosil qilishi, nafas olish esa energiya olish jarayonidir.",
    },
    {
      title: "Organizmlarning moslashuvi va evolyutsiyasi",
      info: "Tirik mavjudotlar muhitga moslashadi va vaqt o‘tishi bilan yangi turlarga aylanadi.",
    },
    {
      title: "Biotsenoz va biosfera tushunchasi",
      info: "Biotsenoz — bir hududda yashovchi organizmlar majmui, biosfera esa butun tirik tabiat qobig‘idir.",
    },
    {
      title: "Inson fiziologiyasi: qon aylanish, nafas olish, ovqat hazm qilish",
      info: "Fiziologiya inson tanasidagi barcha tizimlarning qanday ishlashini tushuntiradi.",
    },
    {
      title: "Mikroorganizmlar va ularning ahamiyati",
      info: "Mikroblar kasallik ham keltirib chiqaradi, foydali jarayonlarda ham ishtirok etadi (masalan, achish).",
    },
  ],
  advanced: [
    {
      title: "Molekulyar biologiya va biokimyo asoslari",
      info: "Molekulyar biologiya tirik mavjudotlarni molekulalar darajasida o‘rganadi.",
    },
    {
      title: "Murakkab genetika va DNK texnologiyalari",
      info: "DNK tahriri (CRISPR) zamonaviy genetikaning eng muhim yutuqlaridan biridir.",
    },
    {
      title: "Ekologik muammolar va barqaror rivojlanish",
      info: "Global isish va ifloslanish insoniyat uchun katta xavf tug‘diradi.",
    },
    {
      title: "Immunologiya va zamonaviy tibbiyot",
      info: "Immun tizim kasalliklardan himoya qiladi, vaksinalar esa uni kuchaytiradi.",
    },
    {
      title: "Biotexnologiya va bioinformatika",
      info: "Biotexnologiya gen muhandisligi va bioinformatika yordamida yangi texnologiyalar yaratadi.",
    },
    {
      title: "Evolyutsion biologiya va paleontologiya",
      info: "Evolyutsion biologiya tirik mavjudotlarning kelib chiqishini, paleontologiya esa qadimgi organizmlarni o‘rganadi.",
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
    "Siz boshlang‘ich darajani tanladingiz. Avvalo hujayra, o‘simlik va hayvonot dunyosi asoslarini o‘rganing. Oddiy tajribalar orqali qiziqishingizni oshiring.",
  intermediate:
    "O‘rta daraja tanlandi. Endi genetika, fiziologiya va ekologiya bo‘yicha bilimlaringizni chuqurlashtiring. Laboratoriya ishlari va kuzatishlarga e’tibor bering.",
  advanced:
    "Yuqori daraja tanlandi. Molekulyar biologiya, biotexnologiya va ekologik muammolarni chuqur o‘rganing. Mustaqil tadqiqotlar olib boring va loyihalarda qatnashing.",
};

export default function BiologyLevelDetails() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl w-full"
      >
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-6 drop-shadow-md">
          {levelLabels[selectedLevel]} darajadagi Biologiya mavzulari
        </h1>

        <p className="text-center text-lg mb-10 italic text-gray-700 leading-relaxed">
          {adviceByLevel[selectedLevel]}
        </p>

        <div className="space-y-4 mb-12">
          {biologyTopics[selectedLevel]?.map((topic, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-green-50 rounded-2xl shadow-md hover:shadow-lg cursor-pointer overflow-hidden"
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
            >
              <div className="p-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-green-800">
                  {topic.title}
                </h3>
                <span className="text-green-600 font-bold">
                  {activeIndex === idx ? "−" : "+"}
                </span>
              </div>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-700 leading-relaxed"
                  >
                    {topic.info}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
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
            onClick={() => navigate("/universities")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition duration-300 active:scale-95"
          >
            Universitetlar ro‘yxatini ko‘rish
          </button>
        </div>
      </motion.div>
    </div>
  );
}
