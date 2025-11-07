// src/pages/Lawyer.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * ⚖️ Lawyer.jsx — Premium, interaktiv, uzun (≈450–500 qator) sahifa
 * - Progress (localStorage)
 * - Roadmap (bosqichlar, vazifalar)
 * - Quiz + Case Studies (natija saqlanadi)
 * - Skill Matrix (self-assessment)
 * - Ethics Checklist
 * - Universities (UZ + intl)
 * - Internships finder (mock filter)
 * - Resources (kitoblar, kurslar, hujjatlar)
 * - Portfolio (yutuqlar, sertifikatlar)
 * - Daily Plan (Pomodoro-ish rejalari)
 * - Bookmarks + Notes + Feedback
 * - Modal + Toast + Accessible UI
 *
 * Tailwind kerak. Qo‘shimcha dependency YO‘Q.
 */

/* -------------------------- Helpers: localStorage -------------------------- */
const ls = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

/* ------------------------------ Reusable UI ------------------------------- */
function Section({ title, subtitle, children, right }) {
  return (
    <section className="bg-black/40 border border-gray-700 rounded-2xl p-6 shadow-xl">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400">{title}</h2>
          {subtitle && <p className="text-gray-300 mt-1">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function StatCard({ label, value, hint }) {
  return (
    <div className="p-4 rounded-xl bg-gray-900/70 border border-gray-700 text-center">
      <div className="text-3xl font-extrabold text-yellow-400">{value}</div>
      <div className="text-sm text-gray-300 mt-1">{label}</div>
      {hint && <div className="text-xs text-gray-500 mt-1">{hint}</div>}
    </div>
  );
}

function ProgressBar({ value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="w-full h-3 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 to-lime-500"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

function SkillTag({ label, level = 0, onChange }) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-gray-900/60 rounded-xl border border-gray-700">
      <span className="text-gray-200">{label}</span>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            aria-label={`${label} level ${i}`}
            onClick={() => onChange?.(i)}
            className={`w-7 h-7 rounded-full border ${
              i <= level
                ? "bg-emerald-500 border-emerald-400"
                : "bg-gray-800 border-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-600/30">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6" />;
}

function CTA({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition text-white shadow ${className}`}
    >
      {children}
    </button>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        className={`w-12 h-7 rounded-full p-1 transition ${
          checked ? "bg-emerald-500" : "bg-gray-700"
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      <span className="text-gray-200">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="hidden"
      />
    </label>
  );
}

function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button
            className="text-gray-400 hover:text-white rounded-lg"
            aria-label="Close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>
        {footer && <div className="p-4 border-t border-gray-800">{footer}</div>}
      </div>
    </div>
  );
}

function Toast({ show, text }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[120] px-4 py-2 rounded-xl bg-gray-900/90 border border-gray-700 text-gray-100 shadow">
      {text}
    </div>
  );
}

/* ------------------------------ Mocked Data ------------------------------- */
const UZ_UNIS = [
  "Toshkent davlat yuridik universiteti (TSUL)",
  "Jahon iqtisodiyoti va diplomatiya universiteti (UWED)",
  "O‘zbekiston Milliy universiteti – Huquq fakulteti",
  "Samarqand davlat universiteti – Huquqshunoslik",
  "Buxoro davlat universiteti – Huquqshunoslik",
  "Namangan davlat universiteti – Huquq fakulteti",
  "Farg‘ona davlat universiteti – Huquqshunoslik",
  "Andijon davlat universiteti – Huquq fakulteti",
  "Qarshi davlat universiteti – Huquqshunoslik",
  "Urganch davlat universiteti – Huquqshunoslik",
];

const INTL_UNIS = [
  "Harvard Law School",
  "Yale Law School",
  "Stanford Law School",
  "University of Oxford – Faculty of Law",
  "University of Cambridge – Faculty of Law",
  "LSE Law School",
  "UCL Laws",
  "NYU School of Law",
  "Columbia Law School",
  "National University of Singapore – NUS Law",
];

const START_CHECKLIST = [
  "O‘zbekiston Konstitutsiyasi asoslarini o‘rganish",
  "JPK, JK, MJtK — asosiy kodekslar bilan tanishish",
  "Huquqiy terminologiya lug‘ati tuzish",
  "Bir nechta sud qarorlarini tahlil qilish",
  "Ingliz tilidan B2 darajaga erishish",
];

const ETHICS = [
  { id: "conflict", label: "Manfaatlar to‘qnashuvi yo‘q", desc: "Mijoz va shaxsiy manfaatlar to‘qnashuvi bo‘lmasin." },
  { id: "confidential", label: "Maxfiylikni ta’minlash", desc: "Mijoz ma’lumotlari himoyalangan bo‘lsin." },
  { id: "competence", label: "Kompetensiya", desc: "Faqat malakangiz yetadigan ishni oling." },
  { id: "honesty", label: "Halollik", desc: "Sud va mijozga nisbatan rostgo‘y bo‘ling." },
  { id: "professional", label: "Professional muomala", desc: "Axloqiy me’yorlarga rioya." },
];

const CASES = [
  {
    id: 1,
    title: "Mehnat shartnomasini asossiz bekor qilish",
    question: "Ish beruvchi xodimni asossiz ishdan bo‘shatdi. Xodim nima qilishi mumkin?",
    options: [
      "Hech narsa qilolmaydi",
      "Mehnat inspeksiyasiga va sudga murojaat qiladi",
      "Faqat mehnat inspeksiyasiga shikoyat qiladi",
      "Faqat ijtimoiy tarmoqlarga yozadi",
    ],
    answer: 1,
    rationale:
      "Mehnat qonunchiligi buzilganda xodim inspeksiya va sud orqali tiklanish yoki kompensasiya talab qilishi mumkin.",
  },
  {
    id: 2,
    title: "Ijaraga olingan uy bo‘yicha nizolar",
    question: "Uy egasi depozitni qaytarmayapti. Ijarachi nima qilishi kerak?",
    options: [
      "Janjal qiladi",
      "Hujjat to‘playdi, yozma talab yuboradi, so‘ng sudga murojaat qiladi",
      "Ko‘chib ketadi va unutadi",
      "Faqat qo‘ng‘iroq qiladi",
    ],
    answer: 1,
    rationale:
      "Shartnoma, kvitansiya, qabul-topshirish dalolatnomasi kabi hujjatlarni to‘plab, yozma talab yuborish va zarur bo‘lsa sudga murojaat qilish kerak.",
  },
  {
    id: 3,
    title: "Mualliflik huquqi buzilishi",
    question: "Kompaniya dizayningizdan ruxsatsiz foydalandi. Nima qilasiz?",
    options: [
      "Hech narsa",
      "Do‘stlarga yozasiz",
      "Da’vo xati (cease-and-desist) yuborasiz, so‘ng muzokara / sud",
      "Ularni ijtimoiy tarmoqlarda sharmanda qilasiz",
    ],
    answer: 2,
    rationale:
      "Mualliflik huquqi bo‘yicha da’vo xati yuborish, muzokara va zarur bo‘lsa sud tartibida himoya qilinadi.",
  },
];

const RESOURCES = {
  books: [
    { title: "Legal Writing in Plain English", author: "Bryan A. Garner", note: "Yozma nutqni kuchaytiradi." },
    { title: "Thinking Like a Lawyer", author: "K. Vandevelde", note: "Huquqiy fikrlash metodologiyasi." },
    { title: "The Elements of Legal Style", author: "B. A. Garner", note: "Yuridik uslub va tahrir." },
  ],
  docs: [
    { title: "O‘zbekiston Konstitutsiyasi (2023)", link: "#" },
    { title: "JPK / JK / MJtK — konspekt", link: "#" },
    { title: "Shartnoma shablonlari — civil", link: "#" },
  ],
  courses: [
    { title: "Introduction to International Law", org: "Coursera", link: "#" },
    { title: "Legal Research & Writing", org: "edX", link: "#" },
    { title: "Corporate & Contract Law", org: "Udemy", link: "#" },
  ],
};

const INTERNSHIPS = [
  { id: 1, org: "LexPro Attorneys", type: "Advokatlik byurosi", city: "Toshkent", area: "Fuqarolik", paid: true },
  { id: 2, org: "Justitia Law", type: "Law firm", city: "Samarqand", area: "Mehnat", paid: false },
  { id: 3, org: "Public Defender Office", type: "Davlat", city: "Toshkent", area: "Jinoyat", paid: true },
  { id: 4, org: "Lex&Tax", type: "Law firm", city: "Namangan", area: "Soliq", paid: false },
  { id: 5, org: "GlobalLex Int.", type: "Xalqaro", city: "Toshkent", area: "Xalqaro", paid: true },
  { id: 6, org: "ComplianceHub", type: "Korporativ", city: "Buxoro", area: "Korporativ", paid: false },
];

/* ----------------------------- Page Component ----------------------------- */
export default function Lawyer() {
  const navigate = useNavigate();

  /* ---------------------------- Page State (LS) --------------------------- */
  const [progress, setProgress] = useState(() => ls.get("lawyer_progress", 0));
  const [checklist, setChecklist] = useState(() => ls.get("lawyer_checklist", {}));
  const [ethics, setEthics] = useState(() => ls.get("lawyer_ethics", {}));
  const [skills, setSkills] = useState(() =>
    ls.get("lawyer_skills", {
      Konstitutsiya: 0,
      "Fuqarolik huquqi": 0,
      "Jinoyat huquqi": 0,
      "Mehnat huquqi": 0,
      "Xalqaro huquq": 0,
      "Huquqiy yozish": 0,
      "Sud nutqi": 0,
      Muzokara: 0,
      "Ingliz tili": 0,
      "IT-huquq": 0,
    })
  );

  const [quiz, setQuiz] = useState(() => ls.get("lawyer_quiz", { answers: {}, score: 0, done: false }));

  const [roadmap, setRoadmap] = useState(() =>
    ls.get("lawyer_roadmap", [
      {
        id: "phase1",
        title: "Boshlang‘ich poydevor",
        items: [
          { id: "rm1", text: "Konstitutsiya bo‘yicha konspekt tayyorlash", done: false },
          { id: "rm2", text: "Huquqiy atamalar lug‘atini to‘plash", done: false },
          { id: "rm3", text: "2 ta sud qarorini tahlil qilish", done: false },
        ],
      },
      {
        id: "phase2",
        title: "Asosiy tarmoqlar",
        items: [
          { id: "rm4", text: "Fuqarolik protsessual kodeksini o‘rganish", done: false },
          { id: "rm5", text: "Jinoyat huquqi asoslari", done: false },
          { id: "rm6", text: "Mehnat huquqi amaliy masalalar", done: false },
        ],
      },
      {
        id: "phase3",
        title: "Amaliyot va tarmoq",
        items: [
          { id: "rm7", text: "Advokatlik byurosida stajirovka topish", done: false },
          { id: "rm8", text: "Mock-trial (sud jarayoni)ga qatnashish", done: false },
          { id: "rm9", text: "Legal Writing bo‘yicha 3 memorandum yozish", done: false },
        ],
      },
    ])
  );

  const [notes, setNotes] = useState(() => ls.get("lawyer_notes", []));
  const [bookmarks, setBookmarks] = useState(() => ls.get("lawyer_bookmarks", []));

  const [daily, setDaily] = useState(() =>
    ls.get("lawyer_daily", {
      goal: "Har kuni 1 soat legal writing",
      blocks: [
        { id: 1, title: "Qonun o‘qish", minutes: 25, done: false },
        { id: 2, title: "Konspekt yozish", minutes: 25, done: false },
        { id: 3, title: "Tahlil & Review", minutes: 15, done: false },
      ],
    })
  );

  const [portfolio, setPortfolio] = useState(() =>
    ls.get("lawyer_portfolio", {
      achievements: ["Legal Writing tanlovida 2-o‘rin"],
      certificates: ["Coursera — Intro to International Law"],
      cases: ["Mock-trial: Fuqarolik da’vo arizasi", "Mediation mashg‘uloti"],
    })
  );

  const [internFilter, setInternFilter] = useState(() => ls.get("lawyer_intern_filter", { city: "", area: "", paid: "any" }));

  const [feedback, setFeedback] = useState(() => ls.get("lawyer_feedback", { name: "", msg: "" }));
  const [toast, setToast] = useState({ open: false, text: "" });
  const [caseModal, setCaseModal] = useState(null);

  /* ------------------------------ Derived Data ---------------------------- */
  const checklistProgress = useMemo(() => {
    const keys = START_CHECKLIST;
    const done = keys.filter((_, i) => checklist[i]);
    return Math.round(((done.length || 0) / keys.length) * 100);
  }, [checklist]);

  const ethicsProgress = useMemo(() => {
    const keys = ETHICS;
    const done = keys.filter((e) => ethics[e.id]);
    return Math.round(((done.length || 0) / keys.length) * 100);
  }, [ethics]);

  const roadmapProgress = useMemo(() => {
    const all = roadmap.flatMap((p) => p.items);
    const done = all.filter((i) => i.done);
    return Math.round(((done.length || 0) / (all.length || 1)) * 100);
  }, [roadmap]);

  const skillAvg = useMemo(() => {
    const vals = Object.values(skills);
    const sum = vals.reduce((a, b) => a + b, 0);
    return Math.round((sum / (vals.length || 1)) * 20); // out of 100
  }, [skills]);

  const overall = useMemo(() => {
    const parts = [checklistProgress, ethicsProgress, roadmapProgress, skillAvg, quiz.score];
    const sum = parts.reduce((a, b) => a + b, 0);
    return Math.round(sum / parts.length);
  }, [checklistProgress, ethicsProgress, roadmapProgress, skillAvg, quiz.score]);

  const filteredInterns = useMemo(() => {
    return INTERNSHIPS.filter((r) => {
      if (internFilter.city && r.city !== internFilter.city) return false;
      if (internFilter.area && r.area !== internFilter.area) return false;
      if (internFilter.paid !== "any" && r.paid !== (internFilter.paid === "true")) return false;
      return true;
    });
  }, [internFilter]);

  /* ------------------------------ Persist to LS --------------------------- */
  useEffect(() => ls.set("lawyer_checklist", checklist), [checklist]);
  useEffect(() => ls.set("lawyer_ethics", ethics), [ethics]);
  useEffect(() => ls.set("lawyer_skills", skills), [skills]);
  useEffect(() => ls.set("lawyer_quiz", quiz), [quiz]);
  useEffect(() => ls.set("lawyer_roadmap", roadmap), [roadmap]);
  useEffect(() => ls.set("lawyer_notes", notes), [notes]);
  useEffect(() => ls.set("lawyer_bookmarks", bookmarks), [bookmarks]);
  useEffect(() => ls.set("lawyer_daily", daily), [daily]);
  useEffect(() => ls.set("lawyer_portfolio", portfolio), [portfolio]);
  useEffect(() => ls.set("lawyer_intern_filter", internFilter), [internFilter]);
  useEffect(() => ls.set("lawyer_feedback", feedback), [feedback]);
  useEffect(() => {
    setProgress(overall);
    ls.set("lawyer_progress", overall);
  }, [overall]);

  // Auto-hide toast
  useEffect(() => {
    if (!toast.open) return;
    const t = setTimeout(() => setToast({ open: false, text: "" }), 1600);
    return () => clearTimeout(t);
  }, [toast.open]);

  /* ------------------------------- Handlers ------------------------------- */
  const toggleChecklist = (idx) => setChecklist((s) => ({ ...s, [idx]: !s[idx] }));
  const toggleEthics = (id) => setEthics((s) => ({ ...s, [id]: !s[id] }));
  const updateSkill = (k, v) => setSkills((s) => ({ ...s, [k]: v }));

  const setRoadItem = (pid, iid, val) =>
    setRoadmap((s) =>
      s.map((p) =>
        p.id === pid
          ? { ...p, items: p.items.map((i) => (i.id === iid ? { ...i, done: val } : i)) }
          : p
      )
    );

  const addNote = (text) => {
    const t = String(text || "").trim();
    if (!t) return;
    setNotes((s) => [{ id: Date.now(), text: t }, ...s]);
  };

  const addBookmark = (text) => {
    const t = String(text || "").trim();
    if (!t) return;
    setBookmarks((s) => [{ id: Date.now(), text: t }, ...s]);
  };

  const removeBookmark = (id) => setBookmarks((s) => s.filter((b) => b.id !== id));
  const removeNote = (id) => setNotes((s) => s.filter((n) => n.id !== id));

  const answerCase = (caseObj, choiceIdx) => {
    setQuiz((prev) => {
      const prevChoice = prev.answers[caseObj.id];
      const wasCorrect = prevChoice === caseObj.answer;
      const willBeCorrect = choiceIdx === caseObj.answer;
      let score = prev.score;
      if (wasCorrect && !willBeCorrect) score -= 20;
      if (!wasCorrect && willBeCorrect) score += 20;
      return {
        ...prev,
        answers: { ...prev.answers, [caseObj.id]: choiceIdx },
        score,
      };
    });
  };

  const toggleDaily = (id) =>
    setDaily((s) => ({
      ...s,
      blocks: s.blocks.map((b) => (b.id === id ? { ...b, done: !b.done } : b)),
    }));

  const addPortfolioItem = (type, text) => {
    const t = String(text || "").trim();
    if (!t) return;
    setPortfolio((s) => ({ ...s, [type]: [t, ...s[type]] }));
    setToast({ open: true, text: "Qo‘shildi" });
  };

  /* --------------------------------- UI ---------------------------------- */
  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-100 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="text-emerald-400">⚖️ Lawyer</span> — Roadmap & Practice
          </h1>
          <p className="text-gray-300 mt-1">Yurist bo‘lish uchun bosqichma-bosqich yo‘llanma.</p>
        </div>
        <div className="w-56">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Umumiy progress</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>
      </div>

      {/* Stats */}
      <Section title="Qisqa statistik ko‘rsatkichlar">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Checklist" value={`${checklistProgress}%`} hint="Boshlang‘ich vazifalar" />
          <StatCard label="Etika" value={`${ethicsProgress}%`} hint="Professional me’yorlar" />
          <StatCard label="Ko‘nikmalar" value={`${skillAvg}%`} hint="Self-assessment" />
          <StatCard label="Roadmap" value={`${roadmapProgress}%`} hint="Bosqichlar" />
        </div>
      </Section>

      {/* Roadmap */}
      <Section
        title="Yo‘l xaritasi (Roadmap)"
        subtitle="Bosqichlardagi vazifalarni bajarib boring. Barchasi localStorage’da saqlanadi."
      >
        <div className="grid md:grid-cols-3 gap-4">
          {roadmap.map((phase) => (
            <div key={phase.id} className="p-4 rounded-xl bg-gray-900/60 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{phase.title}</h3>
                <Chip>{
                  `${Math.round((phase.items.filter(i => i.done).length / phase.items.length) * 100)}%`
                }</Chip>
              </div>
              <div className="space-y-2">
                {phase.items.map((item) => (
                  <label key={item.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={(e) => setRoadItem(phase.id, item.id, e.target.checked)}
                    />
                    <span className={item.done ? "line-through text-gray-400" : ""}>{item.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Starter Checklist */}
      <Section title="Boshlang‘ich Checklist">
        <div className="grid md:grid-cols-2 gap-4">
          {START_CHECKLIST.map((item, i) => (
            <label key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/60 border border-gray-700">
              <input type="checkbox" checked={!!checklist[i]} onChange={() => toggleChecklist(i)} />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Ethics */}
      <Section title="Etika qoidalari" subtitle="Professional odob va me’yorlar.">
        <div className="grid md:grid-cols-2 gap-3">
          {ETHICS.map((e) => (
            <label key={e.id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-900/60 border border-gray-700">
              <input type="checkbox" checked={!!ethics[e.id]} onChange={() => toggleEthics(e.id)} />
              <div>
                <div className="font-medium">{e.label}</div>
                <div className="text-sm text-gray-400">{e.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section title="Ko‘nikmalar matritsasi" subtitle="Har bir ko‘nikmani 1–5 oralig‘ida baholang.">
        <div className="grid md:grid-cols-2 gap-3">
          {Object.entries(skills).map(([k, v]) => (
            <SkillTag key={k} label={k} level={v} onChange={(val) => updateSkill(k, val)} />
          ))}
        </div>
      </Section>

      {/* Case Studies + Quiz */}
      <Section title="Case Studies & Quiz" subtitle="Real vaziyatlar asosida qaror qabul qiling.">
        <div className="grid md:grid-cols-3 gap-4">
          {CASES.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-gray-900/60 border border-gray-700 flex flex-col">
              <div className="font-semibold mb-2">{c.title}</div>
              <p className="text-sm text-gray-300 line-clamp-3 mb-3">{c.question}</p>
              <CTA className="mt-auto" onClick={() => setCaseModal(c)}>Ko‘rish</CTA>
            </div>
          ))}
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700">
            <div className="text-sm text-gray-400">Joriy ball:</div>
            <div className="text-3xl font-extrabold text-yellow-400">{quiz.score}</div>
            <p className="text-xs text-gray-500 mt-1">Har to‘g‘ri javob: +20</p>
            <Divider />
            <CTA onClick={() => setQuiz({ answers: {}, score: 0, done: false })}>Qayta boshlash</CTA>
          </div>
        </div>
      </Section>

      {/* Universities */}
      <Section title="Universitetlar" subtitle="O‘zbekiston va xorijdagi yuridik fakultetlar.">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">O‘zbekiston</h3>
            <ul className="list-disc ml-6 space-y-1">
              {UZ_UNIS.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Xorij</h3>
            <ul className="list-disc ml-6 space-y-1">
              {INTL_UNIS.map((u, i) => (
                <li key={i}>{u}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Internships Finder */}
      <Section title="Stajirovka qidirish" subtitle="Shahar, yo‘nalish va to‘lov bo‘yicha filtrlash.">
        <div className="grid md:grid-cols-4 gap-3 mb-4">
          <select
            className="p-2 rounded-lg bg-gray-900 border border-gray-700"
            value={internFilter.city}
            onChange={(e) => setInternFilter((s) => ({ ...s, city: e.target.value }))}
          >
            <option value="">Shahar (hammasi)</option>
            {[...new Set(INTERNSHIPS.map((i) => i.city))].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            className="p-2 rounded-lg bg-gray-900 border border-gray-700"
            value={internFilter.area}
            onChange={(e) => setInternFilter((s) => ({ ...s, area: e.target.value }))}
          >
            <option value="">Yo‘nalish (hammasi)</option>
            {[...new Set(INTERNSHIPS.map((i) => i.area))].map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <select
            className="p-2 rounded-lg bg-gray-900 border border-gray-700"
            value={internFilter.paid}
            onChange={(e) => setInternFilter((s) => ({ ...s, paid: e.target.value }))}
          >
            <option value="any">To‘lov — barchasi</option>
            <option value="true">To‘lanadi</option>
            <option value="false">To‘lanmaydi</option>
          </select>
          <CTA onClick={() => setInternFilter({ city: "", area: "", paid: "any" })}>Tozalash</CTA>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {filteredInterns.map((r) => (
            <div key={r.id} className="p-4 rounded-xl bg-gray-900/60 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{r.org}</div>
                <Chip>{r.type}</Chip>
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {r.city} • {r.area} • {r.paid ? "To‘lanadi" : "To‘lanmaydi"}
              </div>
              <div className="mt-3">
                <CTA onClick={() => setToast({ open: true, text: "Ariza yuborildi (mock)" })}>Ariza yuborish</CTA>
              </div>
            </div>
          ))}
          {filteredInterns.length === 0 && (
            <div className="text-gray-400">Hech narsa topilmadi. Filtrlarni o‘zgartiring.</div>
          )}
        </div>
      </Section>

      {/* Resources */}
      <Section title="Resurslar" subtitle="Kitoblar, hujjatlar, onlayn kurslar">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700">
            <h4 className="font-semibold mb-2">Kitoblar</h4>
            <ul className="space-y-2 text-sm">
              {RESOURCES.books.map((b, i) => (
                <li key={i} className="border-b border-gray-800 pb-2">
                  <div className="font-medium">{b.title}</div>
                  <div className="text-gray-400">{b.author}</div>
                  <div className="text-gray-500">{b.note}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700">
            <h4 className="font-semibold mb-2">Hujjatlar</h4>
            <ul className="space-y-2 text-sm">
              {RESOURCES.docs.map((d, i) => (
                <li key={i} className="flex items-center justify-between gap-3 border-b border-gray-800 pb-2">
                  <span>{d.title}</span>
                  <button className="text-indigo-300 hover:underline" onClick={() => setToast({ open: true, text: "Havola (mock)" })}>
                    Ko‘rish
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700">
            <h4 className="font-semibold mb-2">Kurslar</h4>
            <ul className="space-y-2 text-sm">
              {RESOURCES.courses.map((c, i) => (
                <li key={i} className="flex items-center justify-between gap-3 border-b border-gray-800 pb-2">
                  <div>
                    <div className="font-medium">{c.title}</div>
                    <div className="text-gray-400">{c.org}</div>
                  </div>
                  <button className="text-indigo-300 hover:underline" onClick={() => setToast({ open: true, text: "Kurs (mock)" })}>
                    Ochish
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Daily plan */}
      <Section title="Kundalik reja (Pomodoro)" subtitle="Kichik bloklar orqali odat yarating.">
        <div className="flex items-center gap-3 mb-3">
          <input
            className="px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 w-full"
            value={daily.goal}
            onChange={(e) => setDaily((s) => ({ ...s, goal: e.target.value }))}
          />
          <CTA onClick={() => setDaily((s) => ({ ...s, blocks: [...s.blocks, { id: Date.now(), title: "Yangi blok", minutes: 20, done: false }] }))}>Blok qo‘shish</CTA>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {daily.blocks.map((b) => (
            <div key={b.id} className={`p-4 rounded-xl border ${b.done ? "bg-emerald-900/30 border-emerald-700" : "bg-gray-900/60 border-gray-700"}`}>
              <div className="flex items-center justify-between mb-2">
                <input
                  className="bg-transparent font-semibold w-full"
                  value={b.title}
                  onChange={(e) => setDaily((s) => ({ ...s, blocks: s.blocks.map((x) => (x.id === b.id ? { ...x, title: e.target.value } : x)) }))}
                />
                <span className="text-sm text-gray-400 ml-2">{b.minutes} min</span>
              </div>
              <div className="flex items-center gap-3">
                <Toggle checked={b.done} onChange={() => toggleDaily(b.id)} label={b.done ? "Bajarildi" : "Jarayonda"} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Portfolio */}
      <Section title="Portfolio" subtitle="Yutuqlar, sertifikatlar va amaliy ishlar">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Achievements */}
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Yutuqlar</h4>
              <button
                className="text-xs text-indigo-300 hover:underline"
                onClick={() => {
                  const t = prompt("Yangi yutuq");
                  addPortfolioItem("achievements", t);
                }}
              >Qo‘shish</button>
            </div>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              {portfolio.achievements.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          {/* Certificates */}
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Sertifikatlar</h4>
              <button
                className="text-xs text-indigo-300 hover:underline"
                onClick={() => {
                  const t = prompt("Sertifikat nomi");
                  addPortfolioItem("certificates", t);
                }}
              >Qo‘shish</button>
            </div>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              {portfolio.certificates.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          {/* Cases */}
          <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Amaliy ishlar</h4>
              <button
                className="text-xs text-indigo-300 hover:underline"
                onClick={() => {
                  const t = prompt("Ish nomi");
                  addPortfolioItem("cases", t);
                }}
              >Qo‘shish</button>
            </div>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              {portfolio.cases.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        </div>
      </Section>

      {/* Notes */}
      <Section title="Eslatmalar">
        <div className="space-y-2">
          <input
            className="px-3 py-2 rounded bg-gray-800 w-full"
            placeholder="Yangi eslatma..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNote(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <div className="grid md:grid-cols-2 gap-2">
            {notes.map((n) => (
              <div key={n.id} className="bg-gray-800 p-3 rounded flex items-start justify-between">
                <span className="whitespace-pre-wrap pr-3">{n.text}</span>
                <button className="text-red-400" onClick={() => removeNote(n.id)}>✕</button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Bookmarks */}
      <Section title="Bookmarks">
        <div className="space-y-2">
          <input
            className="px-3 py-2 rounded bg-gray-800 w-full"
            placeholder="Yangi bookmark..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addBookmark(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <div className="grid md:grid-cols-2 gap-2">
            {bookmarks.map((b) => (
              <div key={b.id} className="bg-gray-800 p-3 rounded flex items-center justify-between">
                <span className="truncate pr-3">{b.text}</span>
                <button className="text-red-400" onClick={() => removeBookmark(b.id)}>O‘chirish</button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feedback */}
      <Section title="Fikr-mulohaza">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            className="px-3 py-2 rounded bg-gray-800 w-full"
            placeholder="Ismingiz"
            value={feedback.name}
            onChange={(e) => setFeedback((s) => ({ ...s, name: e.target.value }))}
          />
          <textarea
            className="px-3 py-2 rounded bg-gray-800 w-full md:col-span-2"
            placeholder="Xabar"
            value={feedback.msg}
            onChange={(e) => setFeedback((s) => ({ ...s, msg: e.target.value }))}
          />
          <div className="md:col-span-2">
            <CTA onClick={() => setToast({ open: true, text: "Feedback yuborildi!" })}>Yuborish</CTA>
          </div>
        </div>
      </Section>

      <Divider />
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700"
        >
          ⬅️ Bosh sahifa
        </button>
        <div className="text-xs text-gray-500">Barcha ma’lumotlar brauzeringizda saqlanadi (localStorage).</div>
      </div>

      {/* Case Modal */}
      <Modal
        open={!!caseModal}
        onClose={() => setCaseModal(null)}
        title={caseModal?.title}
        footer={
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-gray-400">Joriy ball: <span className="text-yellow-400 font-semibold">{quiz.score}</span></div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700" onClick={() => setCaseModal(null)}>Yopish</button>
            </div>
          </div>
        }
      >
        {caseModal && (
          <div>
            <p className="mb-3 text-gray-200">{caseModal.question}</p>
            <div className="space-y-2">
              {caseModal.options.map((o, i) => {
                const picked = quiz.answers[caseModal.id];
                const checked = picked === i;
                const isCorrect = i === caseModal.answer;
                return (
                  <label key={i} className={`flex items-center gap-2 p-2 rounded ${checked ? (isCorrect ? "bg-emerald-900/40" : "bg-red-900/30") : ""}`}>
                    <input
                      type="radio"
                      name={`case-${caseModal.id}`}
                      checked={checked}
                      onChange={() => answerCase(caseModal, i)}
                    />
                    <span>{o}</span>
                  </label>
                );
              })}
            </div>
            {typeof quiz.answers[caseModal.id] === "number" && (
              <div className="mt-3 text-sm">
                {quiz.answers[caseModal.id] === caseModal.answer ? (
                  <span className="text-emerald-400">To‘g‘ri javob! (+20)</span>
                ) : (
                  <span className="text-red-400">Noto‘g‘ri. Yana urinib ko‘ring.</span>
                )}
              </div>
            )}
            <Divider />
            <div className="text-sm text-gray-400">
              <span className="font-medium text-gray-300">Izoh:</span> {caseModal.rationale}
            </div>
          </div>
        )}
      </Modal>

      <Toast show={toast.open} text={toast.text} />
    </div>
  );
}
