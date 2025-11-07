import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import defaultUsers from "./data/users.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaBirthdayCake,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMoon,
  FaSun,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaGithub,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaInfoCircle,
} from "react-icons/fa";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

/**
 * -----------------------------------------------------------------------
 * Register.jsx — Neon / purple redesign (design-only)
 * - Logic preserved
 * - Enhanced animations, neon glows, purple/black themed
 * - Uses Tailwind utility classes + small local keyframes
 * -----------------------------------------------------------------------
 */

/* ---------------------------------- Data --------------------------------- */

const careerRoutes = {
  Bloger: "/blogger",
  "PUBG o‘yinchisi": "/question",
  "Kiberxavfsizlik xodimi": "/cyber-intro",
  Biologiya: "/biology-intro",
  Tarix: "/history-intro",
  Geografiya: "/geography-intro",
  "Ona tili": "/uzbek-intro",
  "Ingliz tili": "/english-intro",
  Informatika: "/informatics-intro",
  Shifokor: "/doctor",
  Dasturchi: "/developer",
  Yurist: "/lawyer",
  Kimyo: "/chemistry-intro",
  Matematika: "/math-intro",
};

const categories = [
  { id: "career", label: "🧪 Test ishlash", desc: "Fan yoki kasb bo‘yicha test topshirish" },
  { id: "plan", label: "🧭 Yo‘nalish tanlash", desc: "Kelajak kasb yo‘nalishini aniqlash" },
];

const careersByCategory = {
  career: [
    { name: "Bloger", icon: "📝" },
    { name: "PUBG o‘yinchisi", icon: "🎮" },
    { name: "Kiberxavfsizlik xodimi", icon: "🛡️" },
    { name: "Matematika", icon: "📐" },
    { name: "Kimyo", icon: "🧪" },
    { name: "Biologiya", icon: "🧬" },
    { name: "Tarix", icon: "📘" },
    { name: "Geografiya", icon: "🌍" },
    { name: "Ona tili", icon: "📚" },
    { name: "Ingliz tili", icon: "📖" },
    { name: "Informatika", icon: "💻" },
  ],
  plan: [
    { name: "O‘qituvchi", icon: "👩‍🏫" },
    { name: "Shifokor", icon: "⚕️" },
    { name: "Dasturchi", icon: "💻" },
    { name: "Yurist", icon: "⚖️" },
  ],
};

const teachingSubjects = [
  "Matematika",
  "Kimyo",
  "Biologiya",
  "Tarix",
  "Geografiya",
  "Ona tili",
  "Ingliz tili",
  "Informatika",
];

/* ----------------------------- Helper Components ------------------------- */

const GlassCard = ({ children, className = "" }) => (
  <div
    className={[
      "rounded-3xl border border-white/6 bg-black/20 backdrop-blur-2xl",
      "overflow-hidden",
      className,
    ].join(" ")}
    style={{ boxShadow: "0 8px 40px rgba(88,24,163,0.18), inset 0 1px 0 rgba(255,255,255,0.02)" }}
  >
    {children}
  </div>
);

const LargeBadge = ({ children }) => (
  <div className="inline-flex items-center gap-3 bg-gradient-to-tr from-purple-700 to-pink-600 text-white rounded-2xl px-4 py-2 shadow-[0_8px_40px_rgba(168,85,247,0.18)]">
    <div className="text-lg">{children}</div>
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="space-y-2">
    <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h2>
    {subtitle && <p className="text-sm text-gray-300/90">{subtitle}</p>}
  </div>
);

const FloatingInput = ({
  icon,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  autoComplete,
  error,
  name,
  ariaDescribedBy,
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && String(value).length > 0;

  return (
    <div className="relative">
      <div
        className={[
          "flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-300",
          "bg-gradient-to-b from-black/30 to-black/10",
          "border-white/8",
          error ? "ring-1 ring-red-400/50" : "hover:border-white/20",
          "focus-within:ring-2 focus-within:ring-purple-500/30",
        ].join(" ")}
        aria-hidden={false}
      >
        {icon && <span className="text-white/80 text-lg">{icon}</span>}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="peer w-full bg-transparent outline-none text-white placeholder:text-gray-400/60"
          aria-invalid={!!error}
          aria-describedby={ariaDescribedBy}
        />
      </div>

      <label
        htmlFor={name}
        className={[
          "absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none px-1 transition-all duration-200",
          focused || hasValue ? "-top-3 text-xs text-purple-200/90" : "text-gray-300/80",
        ].join(" ")}
      >
        {label}
      </label>

      {error && (
        <div id={ariaDescribedBy} className="mt-2 flex items-center gap-2 text-sm text-red-300">
          <FaExclamationTriangle /> <span>{error}</span>
        </div>
      )}
    </div>
  );
};

const CategoryCard = ({ active, icon, title, desc, onClick }) => (
  <motion.button
    type="button"
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className={[
      "text-left p-5 rounded-2xl border transition-all w-full text-white",
      active
        ? "bg-gradient-to-tr from-purple-700 to-pink-500 border-transparent shadow-[0_20px_60px_rgba(168,85,247,0.12)] ring-1 ring-purple-500/30"
        : "bg-black/25 border-white/8 hover:bg-black/20",
    ].join(" ")}
    aria-pressed={active}
  >
    <div className="flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm opacity-90 mt-1">{desc}</div>
      </div>
    </div>
  </motion.button>
);

const ChoiceCard = ({ active, icon, title, onClick }) => (
  <motion.button
    type="button"
    whileHover={{ y: -8 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={[
      "p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all text-center text-white",
      active
        ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent shadow-[0_10px_40px_rgba(99,102,241,0.12)] ring-1 ring-purple-400/40 transform-gpu"
        : "bg-black/25 border-white/8 hover:bg-black/20",
    ].join(" ")}
    aria-pressed={active}
  >
    <div className="text-3xl">{icon}</div>
    <div className="text-sm sm:text-base">{title}</div>
  </motion.button>
);

const Chip = ({ active, label, onClick }) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={[
      "px-4 py-2 rounded-2xl border text-sm transition-all",
      active
        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-transparent shadow-md ring-1 ring-emerald-300"
        : "bg-black/25 border-white/8 hover:bg-black/20 text-white",
    ].join(" ")}
    aria-pressed={active}
  >
    {label}
  </motion.button>
);

const Stepper = ({ step }) => {
  const steps = [
    { id: 1, label: "Profil" },
    { id: 2, label: "Kategoriya" },
    { id: 3, label: "Yo‘nalish" },
    { id: 4, label: "Fan (agar o‘qituvchi)" },
  ];

  const progress = Math.min(100, Math.round((step / steps.length) * 100));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        {steps.map((s, idx) => {
          const active = step >= s.id;
          return (
            <div key={s.id} className="flex-1 flex items-center">
              <div
                className={[
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold z-10",
                  active
                    ? "bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-white/8 text-white/70 border border-white/12",
                ].join(" ")}
              >
                {active ? <FaCheckCircle /> : s.id}
              </div>
              {idx < steps.length - 1 && <div className="flex-1 h-[4px] bg-white/6 mx-3 rounded-full" />}
            </div>
          );
        })}
      </div>

      <div className="h-2 w-full bg-white/8 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full shadow-sm"
        />
      </div>
    </div>
  );
};

/* ------------------------------- Main Page ------------------------------- */

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // ----------------------------
  // Form / domain state
  // ----------------------------
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [career, setCareer] = useState("");
  const [teachingSubject, setTeachingSubject] = useState("");

  // ----------------------------
  // UI states
  // ----------------------------
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ name: "", age: "" });
  const [themeDark, setThemeDark] = useState(true);
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ----------------------------
  // Prefill from query params (Google OAuth redirect)
  // Example URL: /register?provider=google&email=foo%40bar.com&name=Foo+Bar&from=oauth
  // ----------------------------
  useEffect(() => {
    try {
      const q = new URLSearchParams(location.search);
      const provider = q.get("provider");
      const from = q.get("from");
      const nameFromGoogle = q.get("name") || "";

      if ((provider === "google" || from === "oauth") && nameFromGoogle) {
        // if name present and name field empty, prefill
        setName((prev) => (prev ? prev : nameFromGoogle));
        setError("");
      }
    } catch (e) {
      // ignore parsing errors
    }
  }, [location.search]);

  // ----------------------------
  // Load users from backend (or fallback)
  // ----------------------------
  useEffect(() => {
    let canceled = false;

    async function load() {
      // try backend first
      try {
        const res = await fetch("http://localhost:5000/api/users");
        if (!res.ok) throw new Error("Server returned " + res.status);
        const data = await res.json();
        if (!canceled) {
          // if backend returns array, use it
          if (Array.isArray(data)) {
            setUsers(data);
            localStorage.setItem("level99_users", JSON.stringify(data));
            return;
          }
        }
      } catch (err) {
        // ignore and fallback to localStorage
      }

      // fallback: localStorage then bundled defaultUsers
      try {
        const saved = JSON.parse(localStorage.getItem("level99_users"));
        if (!canceled) setUsers(saved || defaultUsers || []);
      } catch (e) {
        if (!canceled) setUsers(defaultUsers || []);
      }
    }

    load();
    return () => {
      canceled = true;
    };
  }, []);

  // ----------------------------
  // visible careers depends on selected category and search query
  // ----------------------------
  const visibleCareers = useMemo(() => {
    const arr = careersByCategory[category] || [];
    if (!search.trim()) return arr;
    const q = search.toLowerCase();
    return arr.filter((c) => c.name.toLowerCase().includes(q));
  }, [category, search]);

  // ----------------------------
  // determine step from filled fields
  // ----------------------------
  const step = useMemo(() => {
    if (!name || !age) return 1;
    if (!category) return 2;
    if (!career) return 3;
    if (career === "O‘qituvchi" && !teachingSubject) return 4;
    return 4;
  }, [name, age, category, career, teachingSubject]);

  /* ----------------------------- Submit (logic) ---------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // clear UI errors
    setError("");
    setFieldErrors({ name: "", age: "" });

    const trimmedName = (name || "").trim();

    // Name validation
    if (trimmedName.length < 2 || trimmedName.length > 20) {
      setFieldErrors((s) => ({ ...s, name: "Ism 2 dan kam yoki 20 dan ko‘p bo‘lishi mumkin emas" }));
      setError("Ism noto‘g‘ri, iltimos tekshiring");
      return;
    }
    if (!/^[a-zA-Z\u0400-\u04FF\s]+$/.test(trimmedName)) {
      setFieldErrors((s) => ({ ...s, name: "Ism faqat harflardan iborat bo‘lishi kerak" }));
      setError("Ism noto‘g‘ri, faqat harflar ruxsat etiladi");
      return;
    }

    // Age validation
    if (!/^\d+$/.test(age) || parseInt(age) > 70 || parseInt(age) < 10) {
      setFieldErrors((s) => ({ ...s, age: "Yosh 10–70 oralig‘ida bo‘lishi kerak" }));
      setError("Yosh noto‘g‘ri kiritildi (10–70)");
      return;
    }

    if (!career) {
      setError("Iltimos, yo‘nalish tanlang");
      return;
    }
    if (career === "O‘qituvchi" && !teachingSubject) {
      setError("Iltimos, fan tanlang");
      return;
    }

    // Prepare object to save
    const careerToSave = career === "O‘qituvchi" ? `${career} (${teachingSubject})` : career;

    // generate simple id and avatar seed from name + timestamp
    const id = `u_${Date.now()}`;
    const avatarSeed = encodeURIComponent(trimmedName || id);

    const newUser = {
      id,
      name: trimmedName,
      age: parseInt(age, 10),
      career: careerToSave,
      avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${avatarSeed}`,
      answers: {
        cyber: {},
        math: {},
        chemistry: {},
        biology: {},
        history: {},
        geography: {},
        uzbek: {},
        english: {},
        informatics: {},
        blogger: {},
        pubg: {},
      },
    };

    setIsSubmitting(true);

    // Try to send to backend, but gracefully fallback to localStorage if fails
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const savedUser = await res.json();

      // Update local copy + storage
      const updatedUsers = [...users, savedUser];
      setUsers(updatedUsers);
      localStorage.setItem("level99_users", JSON.stringify(updatedUsers));
      // store "current user" for later flows
      localStorage.setItem("level99_user", JSON.stringify(savedUser));

      setSubmitted(true);
      setError("");

      // Navigate after a small success animation delay
      setTimeout(() => {
        if (career === "O‘qituvchi") {
          navigate("/career-path", { state: { career: "O‘qituvchi", subject: teachingSubject } });
        } else {
          const route = careerRoutes[career];
          if (route) navigate(route);
          else setError("Tanlangan yo‘nalish uchun sahifa mavjud emas");
        }
      }, 420);
    } catch (err) {
      // fallback to localStorage-only save if backend unavailable
      console.warn("Backend save failed, falling back to localStorage:", err.message);

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem("level99_users", JSON.stringify(updatedUsers));
      localStorage.setItem("level99_user", JSON.stringify(newUser));

      setSubmitted(true);
      setError("");

      setTimeout(() => {
        if (career === "O‘qituvchi") {
          navigate("/career-path", { state: { career: "O‘qituvchi", subject: teachingSubject } });
        } else {
          const route = careerRoutes[career];
          if (route) navigate(route);
          else setError("Tanlangan yo‘nalish uchun sahifa mavjud emas");
        }
      }, 420);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* --------------------------------- UI ----------------------------------- */

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5 }}
      className={[
        "min-h-screen relative overflow-hidden transition-colors duration-500",
        themeDark
          ? "bg-gradient-to-br from-[#04040a] via-[#0b0713] to-[#0f0620] text-white"
          : "bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e0f2fe] text-slate-900",
      ].join(" ")}
    >
      {/* local keyframes & helper classes */}
      <style>{`
        @keyframes floaty { 0% { transform: translateY(0);} 50% { transform: translateY(-12px);} 100% { transform: translateY(0);} }
        .neon-glow { box-shadow: 0 0 18px rgba(168,85,247,0.18), 0 4px 40px rgba(99,102,241,0.06); }
        .bg-animated { background-size: 400% 400%; animation: bgShift 12s ease infinite; }
        @keyframes bgShift { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
      `}</style>

      {/* Animated gradient blobs (framer-motion for subtle movement) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ x: [-20, 20, -20], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-28 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 blur-[110px] mix-blend-screen opacity-80"
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0.5 }}
        animate={{ x: [10, -10, 10], y: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-36 -right-28 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 blur-[120px] mix-blend-screen opacity-70"
      />

      <motion.div
        aria-hidden
        initial={{ opacity: 0.8 }}
        animate={{ rotate: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 blur-[90px] mix-blend-screen opacity-80"
      />

      {/* Header */}
      <header className="relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl transform-gpu neon-glow">
                <FaStar />
              </div>
              <div>
                <div className="font-extrabold tracking-tight text-lg">Level99</div>
                <div className="text-xs opacity-70">Future Career Platform</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setThemeDark((s) => !s)}
                className={[
                  "group inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all",
                  themeDark
                    ? "bg-black/30 border-white/8 text-white hover:bg-black/20"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-900",
                ].join(" ")}
                title="Theme switch"
              >
                {themeDark ? <FaMoon /> : <FaSun />}
                <span className="text-sm">{themeDark ? "Dark" : "Light"}</span>
              </button>

              <a
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/80 hover:bg-white/6"
                href="#"
                aria-label="Help"
              >
                <FaInfoCircle />
                <span className="text-sm">Yordam</span>
              </a>
            </div>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <LargeBadge>Beta</LargeBadge>
                <span className="text-sm text-white/60">— Nafis dizayn va tezkor onboarding</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Kelajak kasbingizni{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300">bugun tanlang</span>
              </h1>

              <p className="text-lg text-white/80 max-w-2xl">
                Profil yarating, yo‘nalish tanlang va bilim yo‘lingizni boshlang. Nafis dizayn,
                tezkor ishlash va intuitiv interfeys — barcha yoshlar uchun moslashtirilgan.
              </p>

              <div className="flex items-center gap-6 text-white/75">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="opacity-80" />
                  <span className="text-sm">Ma’lumot xavfsizligi</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="opacity-80" />
                  <span className="text-sm">Oddiy va tezkor ro‘yxatdan o‘tish</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-[1.02] transform-gpu shadow-lg neon-glow"
                  onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
                  whileHover={{ scale: 1.02 }}
                >
                  Boshlash
                  <FiArrowRight />
                </motion.button>

                <button type="button" onClick={() => navigate("/about")} className="text-sm text-white/70 hover:underline underline-offset-2">
                  Platforma haqida batafsil
                </button>
              </div>
            </div>

            {/* Hero illustration card */}
            <GlassCard className="p-6 neon-glow">
              <div
                className="rounded-2xl border border-white/6 p-6 bg-animated"
                style={{
                  background:
                    "radial-gradient(ellipse at top left, rgba(168,85,247,0.14), transparent 40%), radial-gradient(ellipse at bottom right, rgba(59,130,246,0.12), transparent 40%)",
                }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  {['🧠','🧪','📐','⚖️','💻','📚'].map((i, idx) => (
                    <motion.div key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3 + idx * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      className="rounded-xl bg-black/20 border border-white/8 p-6 flex items-center justify-center text-2xl transition-all hover:scale-105"
                    >
                      {i}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 text-center text-sm opacity-80">Qiziqishlaringizga mos fanlarni tanlang</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </header>

      {/* Main form area */}
      <main className="relative mt-12 pb-28 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-6 sm:p-10 neon-glow">
            {/* Stepper */}
            <div className="mb-8">
              <Stepper step={step} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-10" noValidate>
              {/* Profile Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <FloatingInput
                  icon={<FaUser />}
                  label="Ism"
                  placeholder="Ismingiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  error={fieldErrors.name}
                  name="name"
                  ariaDescribedBy="name-error"
                />
                <FloatingInput
                  icon={<FaBirthdayCake />}
                  label="Yosh"
                  placeholder="Yoshingiz"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  autoComplete="off"
                  error={fieldErrors.age}
                  name="age"
                  ariaDescribedBy="age-error"
                />
                {/* Username removed from register — login will handle user identification */}
                <div className="flex items-center justify-center text-white/60 italic text-sm p-3 rounded-2xl bg-black/25 border border-white/8">
                  Username login bosqichida yaratiladi
                </div>
              </div>

              {/* Category */}
              <div className="space-y-4">
                <SectionTitle title="🧭 Yo‘nalish turini tanlang" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      active={category === cat.id}
                      icon={cat.label.split(" ")[0]}
                      title={cat.label.replace(/^[^\s]+\s/, "")}
                      desc={cat.desc}
                      onClick={() => {
                        setCategory(cat.id);
                        setCareer("");
                        setTeachingSubject("");
                        setSearch("");
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Careers (conditional) */}
              {category && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <SectionTitle title="🎯 Yo‘nalish tanlang" />
                    <div className="relative w-full sm:w-80">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                      <input
                        className="w-full bg-black/25 border border-white/8 rounded-2xl py-2.5 pl-10 pr-4 outline-none text-white placeholder:text-white/60 focus:ring-2 focus:ring-purple-500/20"
                        placeholder="Qidirish..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Qidirish yo'nalish"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {visibleCareers.map((c) => (
                      <ChoiceCard
                        key={c.name}
                        active={career === c.name}
                        icon={c.icon}
                        title={c.name}
                        onClick={() => {
                          setCareer(c.name);
                          setTeachingSubject("");
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Teaching subjects */}
              {career === "O‘qituvchi" && (
                <div className="space-y-4">
                  <SectionTitle title="📚 Qaysi fandan o‘qituvchisiz?" />
                  <div className="flex flex-wrap gap-3">
                    {teachingSubjects.map((s) => (
                      <Chip key={s} label={s} active={teachingSubject === s} onClick={() => setTeachingSubject(s)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Live preview / summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <GlassCard className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white/70">Profil oldindan ko‘rinishi</div>
                        <div className="mt-2 flex items-center gap-3">
                          <img
                            src={
                              name
                                ? `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(name)}`
                                : "https://api.dicebear.com/7.x/thumbs/svg?seed=guest"
                            }
                            alt="avatar"
                            className="w-12 h-12 rounded-xl border border-white/6"
                          />
                          <div>
                            <div className="font-semibold">{name || "Ismingiz"}</div>
                            <div className="text-sm text-white/60">{age ? `${age} yosh` : "yosh"}</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-sm text-white/70">
                        <div>{career || "Yo‘nalish tanlanmagan"}</div>
                        <div className="text-xs text-white/50">{teachingSubject ? `Fan: ${teachingSubject}` : ""}</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                <div>
                  <GlassCard className="p-4">
                    <div className="text-sm text-white/70">Qisqacha ko‘rsatkich</div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-black/20 p-3 text-center">
                        <div className="text-xs text-white/60">Bosqich</div>
                        <div className="font-semibold">{step}</div>
                      </div>
                      <div className="rounded-xl bg-black/20 p-3 text-center">
                        <div className="text-xs text-white/60">Tanlangan</div>
                        <div className="font-semibold">{career || "-"}</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Error & Success */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="rounded-2xl border border-red-500/30 bg-red-500/8 text-red-200 px-4 py-3 flex items-center gap-3"
                  >
                    <FaExclamationTriangle />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                {submitted && !error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-emerald-400/30 bg-emerald-500/8 text-emerald-200 px-4 py-3 flex items-center gap-3"
                  >
                    <FaCheckCircle />
                    <span className="text-sm">Ro‘yxatdan o‘tish muvaffaqiyatli amalga oshirildi — yo‘naltirilmoqda...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-white/70 max-w-md">
                  “Davom etish” bilan siz{" "}
                  <span className="underline decoration-dotted underline-offset-4">foydalanish shartlari</span> va{" "}
                  <span className="underline decoration-dotted underline-offset-4">maxfiylik siyosati</span> ga rozilik bildirasiz.
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={[
                      "inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold border border-white/10 shadow-xl",
                      isSubmitting ? "opacity-60 cursor-wait bg-black/25" : "bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 hover:opacity-95 neon-glow",
                    ].join(" ")}
                  >
                    🚀 Davom etish
                    <FiArrowRight />
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => {
                      setName("");
                      setAge("");
                      setCategory("");
                      setCareer("");
                      setTeachingSubject("");
                      setError("");
                      setFieldErrors({ name: "", age: "" });
                      setSubmitted(false);
                    }}
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-white/12 text-white/70 hover:bg-black/20"
                  >
                    <FiArrowLeft /> Bekor qilish
                  </button>
                </div>
              </div>
            </form>
          </GlassCard>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-16 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-pink-500 flex items-center justify-center shadow-2xl neon-glow">
                  <FaStar />
                </div>
                <div>
                  <div className="font-bold text-lg">Level99</div>
                  <div className="text-xs text-white/60">Future Career Platform</div>
                </div>
              </div>
              <p className="text-sm text-white/80 max-w-sm">Ta’lim yo‘nalishlari va kasb tanlash bo‘yicha interaktiv platforma. Biz yoshlarni kelajakka tayyorlaymiz.</p>
            </div>

            <div className="space-y-2">
              <div className="font-semibold mb-2">Havolalar</div>
              <ul className="text-sm space-y-1 text-white/80">
                <li className="hover:underline underline-offset-4 cursor-pointer">Maxfiylik</li>
                <li className="hover:underline underline-offset-4 cursor-pointer">Qoidalar</li>
                <li className="hover:underline underline-offset-4 cursor-pointer">Yordam</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="font-semibold mb-2">Ijtimoiy tarmoq</div>
              <div className="flex items-center gap-3 text-xl text-white/80">
                <a className="hover:text-white" href="#" aria-label="Github"><FaGithub /></a>
                <a className="hover:text-white" href="#" aria-label="Facebook"><FaFacebook /></a>
                <a className="hover:text-white" href="#" aria-label="YouTube"><FaYoutube /></a>
                <a className="hover:text-white" href="https://instagram.com/level99uzb" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-white/60">© {new Date().getFullYear()} Level99. Barcha huquqlar himoyalangan.</div>
        </div>
      </footer>

      {/* Floating hint */}
      <div className="fixed left-6 bottom-6 z-50">
        <div className="bg-black/30 text-white px-3 py-2 rounded-2xl shadow-lg text-sm flex items-center gap-2">
          <FaInfoCircle /> <span className="text-xs">Maslahat: username login bosqichida yaratiladi</span>
        </div>
      </div>
    </motion.div>
  );
}
