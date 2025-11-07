// src/pages/CareerPath.jsx
import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ⚡ CareerPath — Premium UI (faqat dizayn yangilandi)
 * - Ishlash mexanizmi O'ZGARMAGAN: state, useEffect, handleSubmit, localStorage merge, navigate
 * - UI: sticky sidebar, header hero, stepper, helper text, error states, floating labels, icons
 * - Tailwind CSS bilan. Framer Motion animatsiyalari qo'shildi.
 */

export default function CareerPath() {
  // ==== STATE (MEXANIZM O'ZGARMAGAN) ========================================
  const [age, setAge] = useState("");
  const [place, setPlace] = useState("");
  const [region, setRegion] = useState("");
  const [placesList, setPlacesList] = useState([
    "Maktab",
    "Kollej",
    "Universitet",
    "Ishlaydi",
    "Boshqa", // ✅ yangi qo'shildi
  ]);
  const [infoCareer, setInfoCareer] = useState(null); // faqat info ko'rsatish uchun
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (Number(age) > 18) {
      // ✅ 18+ bo'lsa "Maktab" olib tashlanadi
      setPlacesList(["Kollej", "Universitet", "Ishlaydi", "Boshqa"]);
      if (place === "Maktab") setPlace("");
    } else {
      // ✅ 18- bo'lsa, hammasi chiqadi
      setPlacesList(["Maktab", "Kollej", "Universitet", "Ishlaydi", "Boshqa"]);
    }
  }, [age, place]);

  const regions = [
    "Toshkent shahri","Toshkent viloyati","Andijon","Fargʻona","Namangan",
    "Samarqand","Buxoro","Xorazm","Navoiy","Qashqadaryo",
    "Surxondaryo","Jizzax","Sirdaryo","Qoraqalpogʻiston",
  ];

  // faqat info uchun kasblar
  const careers = [
    { key: "doctor", label: "🩺 Shifokor", info: "Shifokor kasbi odamlarni davolash bilan shugʻullanadi." },
    { key: "chem_teacher", label: "🧪 Kimyo oʻqituvchisi", info: "Kimyo oʻqituvchisi fan bilimini oʻrgatadi." },
    { key: "informatics_teacher", label: "💻 Informatika oʻqituvchisi", info: "Informatika oʻqituvchisi dasturlash va texnologiyalarni oʻrgatadi." },
    { key: "math_teacher", label: "📐 Matematika oʻqituvchisi", info: "Matematika oʻqituvchisi sonlar va mantiqiy masalalarni oʻrgatadi." },
    { key: "bio_teacher", label: "🧬 Biologiya oʻqituvchisi", info: "Biologiya oʻqituvchisi tabiat va organizmlarni oʻrgatadi." },
    { key: "history_teacher", label: "📜 Tarix oʻqituvchisi", info: "Tarix oʻqituvchisi oʻquvchilarga oʻtmishni oʻrgatadi." },
    { key: "geo_teacher", label: "🌍 Geografiya oʻqituvchisi", info: "Geografiya oʻqituvchisi Yer, tabiat va iqlim haqida bilim beradi." },
    { key: "uzb_teacher", label: "📖 Ona tili oʻqituvchisi", info: "Ona tili oʻqituvchisi nutq va yozuv madaniyatini oʻrgatadi." },
    { key: "eng_teacher", label: "🇬🇧 Ingliz tili oʻqituvchisi", info: "Ingliz tili oʻqituvchisi xorijiy tilni oʻrgatadi." },
    { key: "other", label: "🔎 Boshqa/Noaniq", info: "Boshqa kasblar yoki noaniq yoʻnalishlar." },
  ];

  // ==== HANDLERS (MEXANIZM O'ZGARMAGAN) =====================================
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!age) newErrors.age = "Yoshni kiriting";
    if (!place) newErrors.place = "Joyni tanlang";
    if (!region) newErrors.region = "Viloyatni tanlang";
    setErrors(newErrors);

    if (Object.keys(newErrors).length) return;

    // 🔑 MUHIM: oldingi user maʼlumotlarini MERGE qilamiz (career yoʻqolmaydi)
    const prevUser = JSON.parse(localStorage.getItem("level99_user")) || {};
    const user = {
      ...prevUser,
      age,
      place,
      region,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem("level99_user", JSON.stringify(user));
    navigate("/level-selection", { state: { user } });
  };

  // ==== UI HELPERS ==========================================================
  const FieldShell = ({ label, error, children, hint }) => (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {error ? (
          <span className="text-xs text-red-600">{error}</span>
        ) : (
          hint ? <span className="text-xs text-gray-400">{hint}</span> : null
        )}
      </div>
      {children}
    </div>
  );

  const InputWrap = ({ leftIcon, right, children }) => (
    <div className="relative group">
      {leftIcon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {leftIcon}
        </span>
      )}
      {children}
      {right}
    </div>
  );

  const Chip = ({ children, active = false, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3 py-1 rounded-full text-xs font-medium border transition",
        active
          ? "bg-indigo-600 text-white border-indigo-600 shadow"
          : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50",
      ].join(" ")}
    >
      {children}
    </button>
  );

  // Stepper purely visual
  const Stepper = () => (
    <div className="flex items-center gap-3" aria-label="Bosqichlar">
      {[
        { k: "info", t: "Maʼlumot" },
        { k: "level", t: "Daraja" },
        { k: "details", t: "Tafsilot" },
      ].map((s, i) => (
        <Fragment key={s.k}>
          <div className={`flex items-center gap-2 ${i === 0 ? "" : "opacity-60"}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold 
              ${i === 0 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}>
              {i + 1}
            </div>
            <span className={`text-xs ${i === 0 ? "text-indigo-700" : "text-gray-500"}`}>{s.t}</span>
          </div>
          {i < 2 && <div className="h-px flex-1 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />}
        </Fragment>
      ))}
    </div>
  );

  // ==== RENDER ==============================================================
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100 via-sky-50 to-white">
      {/* HERO HEADER */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/70 border-b border-indigo-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-extrabold flex items-center justify-center shadow-lg">99</div>
            <div className="leading-tight">
              <h1 className="text-lg font-bold text-gray-900">level99</h1>
              <p className="text-[11px] text-gray-500">Kelajak sari aqlli qadam</p>
            </div>
          </div>
          <Stepper />
        </div>
      </header>

      {/* CONTENT WRAPPER */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT: FORM CARD */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Shaxsiy maʼlumotlar</h2>
                  <p className="text-sm text-gray-500">Formani toʻldiring va davom eting.</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  Maʼlumotlar xavfsiz saqlanadi
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Age */}
                <FieldShell label="Yoshingiz" error={errors.age} hint="10–80 oraligʻida">
                  <InputWrap leftIcon={<AgeIcon />}
                    right={age ? <ClearBtn onClick={() => setAge("")} /> : null}
                  >
                    <input
                      type="number"
                      min="10"
                      max="80"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full pl-10 pr-10 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-300 transition shadow-sm bg-white placeholder:text-gray-400"
                      placeholder="Masalan: 18"
                      aria-invalid={!!errors.age}
                    />
                  </InputWrap>
                </FieldShell>

                {/* Place (as chips + select) */}
                <FieldShell label="Qayerda oʻqiyapsiz yoki ishlayapsiz?" error={errors.place}>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {placesList.map((p) => (
                      <Chip key={p} active={place === p} onClick={() => setPlace(p)}>
                        {p}
                      </Chip>
                    ))}
                  </div>
                  <InputWrap leftIcon={<PlaceIcon />}>
                    <select
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      className="w-full appearance-none pl-10 pr-10 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-300 transition shadow-sm bg-white"
                      aria-invalid={!!errors.place}
                    >
                      <option value="">Tanlang...</option>
                      {placesList.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
                  </InputWrap>
                </FieldShell>

                {/* Region */}
                <FieldShell label="Viloyatingiz" error={errors.region}>
                  <InputWrap leftIcon={<RegionIcon />}>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full appearance-none pl-10 pr-10 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-300 transition shadow-sm bg-white"
                      aria-invalid={!!errors.region}
                    >
                      <option value="">Viloyatni tanlang...</option>
                      {regions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▼</span>
                  </InputWrap>
                </FieldShell>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-md hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Davom etish
                  </motion.button>
                  <p className="mt-2 text-xs text-gray-500 text-center">Davom etish tugmasi sizni keyingi bosqichga olib oʻtadi.</p>
                </div>
              </form>
            </div>
          </motion.section>

          {/* RIGHT: CAREERS SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:sticky lg:top-20 self-start"
          >
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-indigo-600 text-white text-xs">i</span>
                  Kasblar haqida maʼlumot
                </h3>
                <p className="text-sm text-gray-500 mt-1">Roʻyxatdan birini bosing — faqat izoh koʼrsatadi, tanlov qilmaydi.</p>
              </div>

              <div className="p-4 sm:p-6 grid grid-cols-1 gap-3">
                {careers.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setInfoCareer(c)}
                    className="text-left p-4 rounded-xl border bg-white hover:bg-indigo-50 hover:border-indigo-300 transition shadow-sm hover:shadow group"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-800 group-hover:text-indigo-700">{c.label}</p>
                      <span className="text-gray-300 group-hover:text-indigo-400">→</span>
                    </div>
                  </button>
                ))}

                <AnimatePresence>
                  {infoCareer && (
                    <motion.div
                      key={infoCareer.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mt-2 p-4 sm:p-5 border rounded-xl bg-indigo-50/70 text-gray-700 shadow-inner"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-base">ℹ️</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{infoCareer.label}</h4>
                          <p className="text-sm leading-relaxed">{infoCareer.info}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>

      {/* FOOTER HELP */}
      <footer className="max-w-6xl mx-auto px-6 pb-10">
        <div className="mt-8 text-[11px] text-gray-400 text-center">
          © {new Date().getFullYear()} level99 • Maʼlumotlar lokal qurilmangizda saqlanadi.
        </div>
      </footer>
    </div>
  );
}

// ==== SMALL ICON COMPONENTS (SVG) ===========================================
function AgeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function PlaceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function RegionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// ==== UTILS ================================================================
const ClearBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-[11px] bg-gray-100 text-gray-600 hover:bg-gray-200"
    aria-label="Tozalash"
  >
    tozalash
  </button>
);
