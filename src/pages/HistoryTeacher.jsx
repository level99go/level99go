import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const historyTopics = {
  beginner: [
    "Tarix fani va manbalari bilan tanishuv",
    "Qadimgi sivilizatsiyalar: Misr, Shumer, Hindiston, Xitoy",
    "Antik davr: Yunoniston va Rim imperiyasi",
    "O‘rta asrlar tarixi: feodalizm va ilk davlatlar",
    "Markaziy Osiyo qadimgi xalqlari va madaniyati",
    "Tarixiy manbalar bilan ishlash asoslari",
  ],
  intermediate: [
    "Islom davri va musulmon davlatlari tarixi",
    "Uyg‘onish davri (Renessans) va Yevropada o‘zgarishlar",
    "Buyuk geografik kashfiyotlar",
    "Markaziy Osiyo tarixida Amir Temur va Temuriylar davri",
    "XIX asr: sanoat inqilobi va yangi siyosiy tuzumlar",
    "Milliy uyg‘onish harakatlari va mustamlakachilik",
  ],
  advanced: [
    "XX asr jahon urushlari va ularning oqibatlari",
    "Sovet davri va mustaqillik uchun kurashlar",
    "O‘zbekiston mustaqillikka erishishi va taraqqiyoti",
    "Globalizatsiya jarayoni va zamonaviy tarixiy muammolar",
    "Tarixshunoslik va metodologik yondashuvlar",
    "Tarixiy tadqiqotlar va manbashunoslikning yangi usullari",
  ],
};

const levelLabels = {
  beginner: "Boshlang‘ich",
  intermediate: "O‘rta",
  advanced: "Yuqori",
};

const adviceByLevel = {
  beginner:
    "📖 Siz boshlang‘ich darajani tanladingiz. Avvalo qadimgi sivilizatsiyalar va tarixiy manbalarni o‘rganib chiqing. Kitoblar va hujjatlar bilan ishlashni mashq qiling.",
  intermediate:
    "📚 O‘rta daraja tanlandi. Endi Islom davri, Uyg‘onish davri va sanoat inqilobi kabi jarayonlarni chuqurlashtirib o‘rganing. Tarixiy sabablarga e’tibor qarating.",
  advanced:
    "🏛️ Yuqori daraja tanlandi. Endi zamonaviy tarix, mustaqillik davri va global muammolarni chuqur tahlil qiling. Mustaqil tadqiqotlar olib boring va ilmiy maqolalar yozishga harakat qiling.",
};

export default function HistoryTeacher() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-100 to-orange-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-4xl w-full border border-orange-200"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-orange-800 mb-8 tracking-wide drop-shadow-md"
        >
          {levelLabels[selectedLevel]} darajadagi Tarix mavzulari
        </motion.h1>

        {/* Advice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto text-center text-lg mb-10 italic text-gray-700 leading-relaxed"
        >
          {adviceByLevel[selectedLevel]}
        </motion.p>

        {/* Topics List */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="list-disc list-inside text-gray-900 space-y-3 mb-12 text-lg leading-relaxed"
        >
          {historyTopics[selectedLevel]?.map((topic, idx) => (
            <motion.li
              key={idx}
              whileHover={{ scale: 1.05, x: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="hover:text-orange-700 transition-colors duration-300 cursor-pointer"
            >
              {topic}
            </motion.li>
          ))}
        </motion.ul>

        {/* Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/level-selection")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-2xl shadow-md transition duration-300"
          >
            ◀️ Orqaga
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate("/universities", { state: { subject: "Tarix" } })
            }
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition duration-300"
          >
            🎓 Universitetlar ro‘yxatini ko‘rish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
