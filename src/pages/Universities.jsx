// src/pages/Universities.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const universities = [
  { id: 1, name: "Toshkent Davlat Universiteti", location: "Toshkent", established: 1918, tuition: "10–15 mln so‘m / yil", subjects: ["Matematika", "Fizika", "Kimyo", "Tarix", "Biologiya"], programs: ["Bakalavr", "Magistr", "PhD"], admission: "Test imtihonlari orqali", contact: "+998 71 123-45-67", website: "https://tsu.uz", }, { id: 2, name: "Toshkent Tibbiyot Akademiyasi", location: "Toshkent", established: 1919, tuition: "12–20 mln so‘m / yil", subjects: ["Tibbiyot", "Biologiya", "Farmatsiya"], programs: ["Bakalavr", "Magistr", "Doktorantura"], admission: "Tibbiyot yo‘nalishlari uchun maxsus imtihon", contact: "+998 71 244-10-05", website: "https://tma.uz", }, { id: 3, name: "Samarqand Davlat Universiteti", location: "Samarqand", established: 1927, tuition: "7–12 mln so‘m / yil", subjects: ["Matematika", "Tarix", "Filologiya", "Fizika"], programs: ["Bakalavr", "Magistr"], admission: "DTM imtihonlari", contact: "+998 66 233-45-67", website: "https://samdu.uz", }, { id: 4, name: "Andijon Davlat Universiteti", location: "Andijon", established: 1931, tuition: "6–10 mln so‘m / yil", subjects: ["Biologiya", "Matematika", "Kimyo", "Tarix"], programs: ["Bakalavr", "Magistr"], admission: "DTM testlari", contact: "+998 74 223-45-67", website: "https://anddu.uz", }, { id: 5, name: "Namangan Davlat Universiteti", location: "Namangan", established: 1942, tuition: "6–10 mln so‘m / yil", subjects: ["Matematika", "Tarix", "Kimyo", "Geografiya"], programs: ["Bakalavr", "Magistr"], admission: "DTM testlari", contact: "+998 69 225-78-45", website: "https://namdu.uz", }, { id: 6, name: "Farg‘ona Davlat Universiteti", location: "Farg‘ona", established: 1930, tuition: "6–10 mln so‘m / yil", subjects: ["Tarix", "Matematika", "Filologiya"], programs: ["Bakalavr", "Magistr"], admission: "DTM orqali", contact: "+998 73 223-45-67", website: "https://fdu.uz", }, { id: 7, name: "Qarshi Davlat Universiteti", location: "Qashqadaryo", established: 1945, tuition: "7–12 mln so‘m / yil", subjects: ["Filologiya", "Matematika", "Kimyo", "Tarix"], programs: ["Bakalavr", "Magistr"], admission: "DTM test imtihonlari", contact: "+998 75 225-34-56", website: "https://qarshidu.uz", }, { id: 8, name: "Urganch Davlat Universiteti", location: "Xorazm", established: 1942, tuition: "6–10 mln so‘m / yil", subjects: ["Biologiya", "Tarix", "Geografiya"], programs: ["Bakalavr", "Magistr"], admission: "DTM orqali", contact: "+998 62 223-45-67", website: "https://urdu.uz", }, { id: 9, name: "Nukus Davlat Universiteti", location: "Qoraqalpog‘iston", established: 1934, tuition: "6–10 mln so‘m / yil", subjects: ["Qoraqalpoq filologiyasi", "Tarix", "Matematika"], programs: ["Bakalavr", "Magistr"], admission: "DTM orqali", contact: "+998 61 222-12-34", website: "https://ndu.uz", }, { id: 10, name: "Toshkent Axborot Texnologiyalari Universiteti", location: "Toshkent", established: 1955, tuition: "9–15 mln so‘m / yil", subjects: ["Informatika", "Telekommunikatsiya", "Dasturlash"], programs: ["Bakalavr", "Magistr", "PhD"], admission: "DTM + qo‘shimcha test", contact: "+998 71 238-64-34", website: "https://tuit.uz", }, { id: 11, name: "O‘zbekiston Milliy Universiteti", location: "Toshkent", established: 1918, tuition: "10–18 mln so‘m / yil", subjects: ["Matematika", "Biologiya", "Fizika", "Kimyo", "Tarix"], programs: ["Bakalavr", "Magistr", "PhD"], admission: "DTM imtihonlari", contact: "+998 71 246-02-77", website: "https://nuu.uz", }, { id: 12, name: "Toshkent Moliya Instituti", location: "Toshkent", established: 1931, tuition: "9–14 mln so‘m / yil", subjects: ["Moliya", "Buxgalteriya", "Iqtisodiyot"], programs: ["Bakalavr", "Magistr"], admission: "DTM testlari", contact: "+998 71 239-41-14", website: "https://tfi.uz", }, { id: 13, name: "Toshkent Davlat Yuridik Universiteti", location: "Toshkent", established: 1991, tuition: "12–20 mln so‘m / yil", subjects: ["Huquq", "Davlat boshqaruvi"], programs: ["Bakalavr", "Magistr", "PhD"], admission: "Huquqiy yo‘nalishlar uchun maxsus imtihon", contact: "+998 71 233-66-36", website: "https://tsul.uz", }, { id: 14, name: "Toshkent Arxitektura-Qurilish Instituti", location: "Toshkent", established: 1991, tuition: "8–14 mln so‘m / yil", subjects: ["Arxitektura", "Qurilish", "Muhandislik"], programs: ["Bakalavr", "Magistr"], admission: "DTM imtihonlari", contact: "+998 71 246-98-47", website: "https://taqi.uz", }, { id: 15, name: "Buxoro Davlat Universiteti", location: "Buxoro", established: 1930, tuition: "6–12 mln so‘m / yil", subjects: ["Tarix", "Matematika", "Filologiya", "Kimyo"], programs: ["Bakalavr", "Magistr"], admission: "DTM imtihonlari", contact: "+998 65 223-45-67", website: "https://buxdu.uz", }, { id: 16, name: "Jizzax Politexnika Instituti", location: "Jizzax", established: 1992, tuition: "7–12 mln so‘m / yil", subjects: ["Muhandislik", "Energetika", "Qurilish"], programs: ["Bakalavr", "Magistr"], admission: "DTM orqali", contact: "+998 72 223-34-45", website: "https://jizpi.uz", }, { id: 17, name: "Navoi Davlat Konchilik Instituti", location: "Navoiy", established: 1963, tuition: "8–13 mln so‘m / yil", subjects: ["Konchilik", "Geologiya", "Muhandislik"], programs: ["Bakalavr", "Magistr"], admission: "DTM imtihonlari", contact: "+998 79 223-45-67", website: "https://ndki.uz", }, { id: 18, name: "Termiz Davlat Universiteti", location: "Surxondaryo", established: 1992, tuition: "6–11 mln so‘m / yil", subjects: ["Tarix", "Filologiya", "Matematika"], programs: ["Bakalavr", "Magistr"], admission: "DTM orqali", contact: "+998 76 223-12-45", website: "https://terdu.uz", }, { id: 19, name: "Guliston Davlat Universiteti", location: "Sirdaryo", established: 1965, tuition: "6–10 mln so‘m / yil", subjects: ["Matematika", "Kimyo", "Tarix"], programs: ["Bakalavr", "Magistr"], admission: "DTM orqali", contact: "+998 67 223-67-89", website: "https://guldu.uz", }, { id: 20, name: "Denov Tadqiqot Universiteti", location: "Surxondaryo", established: 2020, tuition: "8–15 mln so‘m / yil", subjects: ["Iqtisodiyot", "IT", "Agronomiya"], programs: ["Bakalavr"], admission: "DTM testlari", contact: "+998 76 555-44-22", website: "https://denovuni.uz", }, ];

function Badge({ text }) {
  return (
    <span className="inline-block bg-blue-600/50 text-white text-xs font-semibold px-3 py-1 rounded-full mr-2 mb-2 shadow-sm hover:bg-blue-500/70 transition-all duration-200">
      {text}
    </span>
  );
}

function UniversityCard({ university, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="cursor-pointer bg-gray-800/90 p-6 rounded-3xl shadow-xl border border-gray-700/50 hover:border-blue-400/70 hover:shadow-blue-500/40 transition-all duration-300"
    >
      <h2 className="text-2xl font-bold mb-3 text-blue-400 drop-shadow-md">
        {university.name}
      </h2>
      <p className="text-sm text-gray-300 mb-1">📍 {university.location}</p>
      <p className="text-sm text-gray-400 mb-2">🏛️ {university.established}-yilda tashkil etilgan</p>
      <p className="text-sm text-gray-400 mb-2">💰 {university.tuition}</p>
      <div className="flex flex-wrap mt-2">
        {university.subjects.map((s, i) => (
          <Badge key={i} text={s} />
        ))}
      </div>
      <div className="flex flex-wrap mt-2">
        {university.programs.map((p, i) => (
          <Badge key={i} text={p} />
        ))}
      </div>
    </motion.div>
  );
}

function UniversityModal({ university, onClose }) {
  const [tab, setTab] = useState("general");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-3xl w-full relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
        >
          ✖
        </button>
        <h2 className="text-3xl font-bold text-blue-400 mb-4 drop-shadow-md">{university.name}</h2>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setTab("general")}
            className={`px-4 py-2 rounded-xl ${tab === "general" ? "bg-blue-500/60" : "bg-gray-700/50"} text-white font-semibold transition-all`}
          >
            General
          </button>
          <button
            onClick={() => setTab("subjects")}
            className={`px-4 py-2 rounded-xl ${tab === "subjects" ? "bg-blue-500/60" : "bg-gray-700/50"} text-white font-semibold transition-all`}
          >
            Subjects
          </button>
          <button
            onClick={() => setTab("programs")}
            className={`px-4 py-2 rounded-xl ${tab === "programs" ? "bg-blue-500/60" : "bg-gray-700/50"} text-white font-semibold transition-all`}
          >
            Programs
          </button>
          <button
            onClick={() => setTab("contact")}
            className={`px-4 py-2 rounded-xl ${tab === "contact" ? "bg-blue-500/60" : "bg-gray-700/50"} text-white font-semibold transition-all`}
          >
            Contact
          </button>
        </div>

        <div className="text-gray-300 space-y-3">
          {tab === "general" && (
            <div>
              <p>📍 Location: {university.location}</p>
              <p>🏛️ Established: {university.established}</p>
              <p>💰 Tuition: {university.tuition}</p>
              <p>📝 Admission: {university.admission}</p>
            </div>
          )}
          {tab === "subjects" && (
            <div className="flex flex-wrap">
              {university.subjects.map((s, i) => (
                <Badge key={i} text={s} />
              ))}
            </div>
          )}
          {tab === "programs" && (
            <div className="flex flex-wrap">
              {university.programs.map((p, i) => (
                <Badge key={i} text={p} />
              ))}
            </div>
          )}
          {tab === "contact" && (
            <div className="space-y-2">
              <p>📞 Contact: {university.contact}</p>
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                🌐 Website
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function Universities() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredUniversities = universities.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 tracking-wide drop-shadow-lg">
        🎓 Universities List
      </h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by university or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-2xl p-3 rounded-xl text-black shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUniversities.map((u) => (
          <UniversityCard key={u.id} university={u} onClick={() => setSelected(u)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <UniversityModal university={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
