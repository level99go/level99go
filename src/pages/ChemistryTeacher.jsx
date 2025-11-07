// src/pages/ChemistryTeacher.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const chemistryTopics = {
  beginner: [
    { title: "Kimyo faniga kirish va xavfsizlik qoidalari", info: "Kimyo laboratoriyasida xavfsizlikni o‘rganish eng muhim qadamdir." },
    { title: "Modda va uning xossalari", info: "Moddalar qattiq, suyuq va gaz holatida bo‘lishi mumkin." },
    { title: "Atom va molekula tushunchasi", info: "Har bir modda atomlardan, ular esa molekulalardan tashkil topadi." },
    { title: "Davriy jadval asoslari", info: "Mendeleyev davriy jadvali kimyoning asosiy kalitidir." },
    { title: "Oddiy kimyoviy reaksiyalar", info: "Reaksiyalar moddalarni yangi moddaga aylantiradi." },
    { title: "Kimyoviy belgilar va formulalar", info: "H₂O, CO₂ kabi formulalar moddalarni ifodalaydi." },
    { title: "Moddaning holatlari", info: "Qattiq, suyuq va gaz holatlari o‘zaro o‘tishi mumkin." },
    { title: "Eritmalar va ularning xossalari", info: "Eritma — ikki yoki undan ortiq moddalar aralashmasi." },
    { title: "Kimyoviy tenglamalarni yozish", info: "Reaksiyalarni matematik ko‘rinishda ifodalash." },
    { title: "Laboratoriya jihozlari bilan ishlash", info: "Kimyo tajribalarida turli asbob-uskunalardan foydalaniladi." },
  ],
  intermediate: [
    { title: "Kimyoviy reaksiyalar turlari", info: "Birlashtirish, parchalanish, almashinish va boshqa reaksiyalar mavjud." },
    { title: "Massa saqlanish qonuni", info: "Kimyoviy reaksiyada umumiy massa o‘zgarmaydi." },
    { title: "Valentlik va oksidlanish darajasi", info: "Atomlarning bog‘lanish imkoniyatini ko‘rsatadi." },
    { title: "Metallar va ularning xossalari", info: "Metallar elektr o‘tkazuvchan va yaltiroq bo‘ladi." },
    { title: "No-metallar va ularning xossalari", info: "No-metallar odatda mo‘rt va izolyator bo‘ladi." },
    { title: "Kislorod, vodorod va ularning birikmalari", info: "Eng muhim elementlardan biri hisoblanadi." },
    { title: "Kislotalar, asoslar va tuzlar", info: "pH ko‘rsatkichiga qarab ajratiladi." },
    { title: "Elektrolitlar va noelektrolitlar", info: "Eritmada ionlarga ajraladigan moddalar." },
    { title: "Kimyoviy hisob-kitoblar", info: "Mol, massa va hajm orqali hisoblash." },
    { title: "Organik kimyo asoslari", info: "Uglevodorodlar va organik moddalar haqida." },
  ],
  advanced: [
    { title: "Organik birikmalar sinflari", info: "Spirtlar, kislotalar, efirlar va boshqa sinflar mavjud." },
    { title: "Uglevodorodlar va ularning reaksiyalari", info: "Alkan, alken va alkinlar muhim organik moddalar." },
    { title: "Spirtlar, kislotalar va efirlar", info: "Organik kimyoning asosiy sinflari." },
    { title: "Polimerlar va ularning qo‘llanilishi", info: "Plastmassa, kauchuk kabi materiallar." },
    { title: "Termokimyo asoslari", info: "Reaksiyalarda issiqlik almashinuvi." },
    { title: "Elektrokimyo va galvanik elementlar", info: "Tok hosil qiluvchi kimyoviy jarayonlar." },
    { title: "Kimyoviy kinetika va muvozanat", info: "Reaksiyaning tezligi va barqaror holati." },
    { title: "Sanoat kimyosiga kirish", info: "Ishlab chiqarishda kimyoning ahamiyati." },
    { title: "Analitik kimyo usullari", info: "Moddalarning tarkibini aniqlash usullari." },
    { title: "Biokimyo asoslari", info: "Tirik organizmlardagi kimyoviy jarayonlar." },
  ],
};

const levelLabels = {
  beginner: "Boshlang‘ich",
  intermediate: "O‘rta",
  advanced: "Yuqori",
};

const adviceByLevel = {
  beginner: "Boshlang‘ich darajadasiz. Avvalo kimyo asoslari, modda va atom-molekula tushunchalarini yaxshi o‘rganing.",
  intermediate: "O‘rta daraja. Kimyoviy reaksiyalar, kislota-asoslar va organik kimyo kirish mavzulariga e’tibor bering.",
  advanced: "Yuqori daraja. Organik kimyo, elektrokimyo va termokimyo bo‘yicha chuqur bilimlar egallash tavsiya qilinadi.",
};

export default function ChemistryTeacher() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openTopic, setOpenTopic] = useState(null);

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-3xl w-full"
      >
        <h1 className="text-4xl font-extrabold text-center text-pink-800 mb-8 tracking-wide drop-shadow-md">
          {levelLabels[selectedLevel]} darajadagi kimyo mavzulari
        </h1>

        <p className="max-w-3xl mx-auto text-center text-lg mb-10 italic text-gray-700 leading-relaxed">
          {adviceByLevel[selectedLevel]}
        </p>

        <ul className="space-y-4 mb-12 text-lg leading-relaxed">
          {chemistryTopics[selectedLevel]?.map((topic, idx) => (
            <li key={idx} className="border-b pb-3">
              <button
                onClick={() => setOpenTopic(openTopic === idx ? null : idx)}
                className="w-full flex justify-between items-center font-semibold text-left text-gray-900 hover:text-pink-700 transition-colors duration-300"
              >
                {topic.title}
                <span>{openTopic === idx ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {openTopic === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-gray-600 mt-2 pl-2"
                  >
                    {topic.info}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="flex justify-between">
          <button
            onClick={() => navigate("/level-selection")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-2xl shadow-md transition transform hover:scale-105"
          >
            Orqaga
          </button>
          <button
            onClick={() => navigate("/universities")}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition transform hover:scale-105 active:scale-95"
          >
            Universitetlar ro‘yxatini ko‘rish
          </button>
        </div>
      </motion.div>
    </div>
  );
}
