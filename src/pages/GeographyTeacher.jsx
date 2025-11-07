// src/pages/GeographyLevelDetails.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------------------- Mavzular + Info ---------------------------- */
const geographyTopics = {
  beginner: [
    {
      title: "Geografiya faniga kirish va uning bo‘limlari",
      info: "Geografiya — Yer yuzasini, uning tabiati, aholisi va xo‘jaligini o‘rganadigan fan. Bo‘limlari: tabiiy, iqtisodiy va ijtimoiy geografiya.",
    },
    {
      title: "Yer sharining tuzilishi va asosiy shakllari",
      info: "Yerning ichki qatlami: yadrosi, mantiyasi va litosfera. Tashqi shakllari: tog‘lar, tekisliklar, pasttekisliklar.",
    },
    {
      title: "Materiklar va okeanlar haqida umumiy tushuncha",
      info: "6 ta materik va 4 ta okean mavjud. Har birining o‘ziga xos iqlimi, relyefi va biologik resurslari bor.",
    },
    {
      title: "Iqlim turlari va ob-havo hodisalari",
      info: "Yerda ekvatorial, tropik, mo‘tadil va qutbiy iqlimlar mavjud. Ob-havo — qisqa muddatli, iqlim esa uzoq muddatli jarayon.",
    },
    {
      title: "Tabiiy resurslar va ularning turlari",
      info: "Resurslar: foydali qazilmalar, suv, havo, o‘rmonlar va tuproq. Ular iqtisodiy rivojlanishning asosiy omili hisoblanadi.",
    },
    {
      title: "O‘zbekiston geografiyasiga kirish",
      info: "O‘zbekiston — Markaziy Osiyoning markazida joylashgan. Asosiy daryolari: Amudaryo va Sirdaryo.",
    },
  ],
  intermediate: [
    {
      title: "Dunyo materiklari va ularning tabiiy-geografik xususiyatlari",
      info: "Har bir materikning o‘ziga xos tabiiy sharoiti mavjud. Masalan, Afrika — issiq iqlimi, Amazonka havzasi — tropik o‘rmonlari bilan mashhur.",
    },
    {
      title: "Daryolar, ko‘llar va okean oqimlari",
      info: "Daryolar — ichimlik suvi manbai, ko‘llar — biologik xilma-xillik hududi, okean oqimlari esa iqlimni tartibga soladi.",
    },
    {
      title: "Aholi geografiyasi va demografiya asoslari",
      info: "Yer aholisi notekis joylashgan. Demografiya aholining soni, tarkibi va o‘sishini o‘rganadi.",
    },
    {
      title: "Iqtisodiy geografiya: sanoat va qishloq xo‘jaligi",
      info: "Iqtisodiy geografiya ishlab chiqarishning hududiy joylashuvini va ularning rivojlanish omillarini o‘rganadi.",
    },
    {
      title: "O‘zbekiston tabiiy boyliklari va iqtisodiy resurslari",
      info: "O‘zbekistonda oltin, uran, gaz va paxta asosiy resurslardan hisoblanadi.",
    },
    {
      title: "Global ekologik muammolar",
      info: "Atmosfera isishi, suv tanqisligi va o‘rmonlarning qisqarishi global muammolardan biridir.",
    },
  ],
  advanced: [
    {
      title: "Geomorfologiya va Yerning ichki tuzilishi",
      info: "Geomorfologiya Yer yuzasining relyefini va ularning shakllanish jarayonlarini o‘rganadi.",
    },
    {
      title: "Atmosfera jarayonlari va iqlim o‘zgarishi",
      info: "Iqlim o‘zgarishi issiqxona gazlari ko‘payishi va inson faoliyati bilan bog‘liq global muammo.",
    },
    {
      title: "Global iqtisodiy mintaqalar va integratsiya",
      info: "Dunyo iqtisodiy mintaqalarga bo‘linadi: Yevropa Ittifoqi, NAFTA, ASEAN kabi tashkilotlar mavjud.",
    },
    {
      title: "Geosiyosat va strategik resurslar",
      info: "Neft, gaz va suv kabi resurslar davlatlarning geosiyosiy kuchida muhim o‘rin tutadi.",
    },
    {
      title: "Barqaror rivojlanish va ekologik siyosat",
      info: "Barqaror rivojlanish — iqtisodiy o‘sishni ekologiyani saqlash bilan uyg‘unlashtirish.",
    },
    {
      title: "Zamonaviy kartografiya va GIS texnologiyalari",
      info: "GIS texnologiyalari geografik ma’lumotlarni to‘plash, saqlash va tahlil qilish imkonini beradi.",
    },
  ],
};

/* ---------------------------- Daraja nomlari ---------------------------- */
const levelLabels = {
  beginner: "Boshlang‘ich",
  intermediate: "O‘rta",
  advanced: "Yuqori",
};

const adviceByLevel = {
  beginner:
    "Boshlang‘ich daraja tanlandi. Avvalo Yerning tuzilishi, materiklar va iqlim asoslarini o‘rganing. Xaritalar bilan ishlashni mashq qiling.",
  intermediate:
    "O‘rta daraja tanlandi. Endi daryolar, okean oqimlari, aholi va iqtisodiy geografiya mavzulariga e’tibor qarating. Statistik ma’lumotlar bilan ishlashni o‘rganing.",
  advanced:
    "Yuqori daraja tanlandi. Endi geosiyosat, barqaror rivojlanish va GIS texnologiyalarini chuqur o‘rganing. Mustaqil loyihalar va tadqiqot ishlariga kirishing.",
};

export default function GeographyLevelDetails() {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const level = localStorage.getItem("selectedLevel");
    if (!level) {
      navigate("/level-selection");
    } else {
      setSelectedLevel(level);
    }
  }, [navigate]);

  if (!selectedLevel) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-200 flex flex-col items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6 tracking-wide drop-shadow-md">
          {levelLabels[selectedLevel]} darajadagi Geografiya mavzulari
        </h1>

        <p className="max-w-3xl mx-auto text-center text-lg mb-10 italic text-gray-700 leading-relaxed">
          {adviceByLevel[selectedLevel]}
        </p>

        <div className="space-y-4 mb-12">
          {geographyTopics[selectedLevel]?.map((topic, idx) => (
            <div key={idx} className="border rounded-xl shadow-md">
              <button
                onClick={() =>
                  setExpanded(expanded === idx ? null : idx)
                }
                className="w-full flex justify-between items-center px-5 py-4 text-lg font-semibold text-gray-800 hover:bg-blue-50 transition rounded-xl"
              >
                {topic.title}
                <span className="text-blue-500">
                  {expanded === idx ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence>
                {expanded === idx && (
                  <motion.div
                    className="px-6 pb-4 text-gray-700 text-base leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
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
              navigate("/universities", { state: { subject: "Geografiya" } })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition duration-300 active:scale-95"
          >
            Universitetlar ro‘yxatini ko‘rish
          </button>
        </div>
      </motion.div>
    </div>
  );
}
