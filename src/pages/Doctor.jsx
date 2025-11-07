import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * DOCTOR.JSX — katta, boy sahifa
 * - Intro banner
 * - Stats
 * - Timeline
 * - Specialties (tabs)
 * - Study Plan (weekly schedule) + localStorage
 * - Checklist (skills) + progress
 * - Quiz (3 savol)
 * - FAQ (accordion)
 * - Resources (books/courses)
 * - CTA buttons
 *
 * TailwindCSS kerak. Routerdan faqat useNavigate ishlatiladi.
 */

/* ------------------------------- Helpers -------------------------------- */

const classNames = (...arr) => arr.filter(Boolean).join(" ");

const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};
const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

/* ------------------------------- Data ----------------------------------- */

const STAT_CARDS = [
  {
    title: "O‘qish davomiyligi",
    value: "6–7 yil",
    note: "Bakalavr + ixtisos",
    icon: "🎓",
  },
  {
    title: "Rezidentura",
    value: "2–4 yil",
    note: "Mutaxassislikka qarab",
    icon: "🏥",
  },
  {
    title: "Amaliy soat",
    value: "Ko‘p",
    note: "Rotation & klinika",
    icon: "⏱️",
  },
  {
    title: "Mas’uliyat",
    value: "Juda yuqori",
    note: "Hayot — 1-o‘rinda",
    icon: "⚠️",
  },
];

const TIMELINE = [
  {
    year: "Boshlang‘ich tayyorgarlik",
    items: [
      "Biologiya va kimyo asoslari",
      "Anatomiya haqida umumiy tasavvur",
      "Tibbiy etika bilan tanishish",
    ],
  },
  {
    year: "Tibbiyot universiteti (1–3-kurs)",
    items: [
      "Anatomiya, gistologiya, fiziologiya",
      "Biokimyo, mikrobiologiya",
      "Ma’ruza + laboratoriya mashg‘ulotlari",
    ],
  },
  {
    year: "4–6-kurs",
    items: [
      "Klinik fanlar (terapiya, jarrohlik, pediatriya)",
      "Internatura/rotation: kasalxonada amaliyot",
      "Tibbiy hujjatlar yuritish",
    ],
  },
  {
    year: "Rezidentura (ixtisoslashuv)",
    items: [
      "Tanlagan soha bo‘yicha chuqur bilim",
      "Murabbiy shifokorlar bilan birga ishlash",
      "Muntazam sertifikatlash",
    ],
  },
];

const SPECIALTIES = [
  {
    id: "therapy",
    name: "Terapiya (Ichki kasalliklar)",
    emoji: "🩺",
    about:
      "Kattalar ichki organ kasalliklarini tashxislash va davolash. Profil keng: yurak-qon tomir, o‘pka, endokrin va b.",
    path: [
      "6–7 yil tibbiyot (umumiy)",
      "2–3 yil rezidentura (terapiya)",
      "Klinik amaliyot va doimiy malaka oshirish",
    ],
    skills: ["Differensial tashxis", "EKG asoslari", "Farmakologiya", "Muloqot"],
  },
  {
    id: "surgery",
    name: "Jarrohlik",
    emoji: "🔪",
    about:
      "Operatsion ishlar, shoshilinch holatlarda tezkor qaror. Qo‘l mahorati, jamoa bo‘lib ishlash muhim.",
    path: [
      "6–7 yil tibbiyot",
      "3–5 yil jarrohlik rezidenturasi",
      "Operatsion amaliyot, simulyatorlar",
    ],
    skills: ["Aseptika/antiseptika", "Anatomiya chuqur", "Operatsion texnika"],
  },
  {
    id: "pediatrics",
    name: "Pediatriya",
    emoji: "🧒",
    about:
      "Bolalar tibbiyoti: yangi tug‘ilgan davrdan o‘smirlikka qadar. Ota-onalar bilan to‘g‘ri muloqot nihoyatda muhim.",
    path: [
      "6–7 yil tibbiyot yoki alohida pediatriya yo‘nalishi",
      "2–4 yil pediatriya rezidenturasi",
      "Poliklinika + shifoxona amaliyoti",
    ],
    skills: ["O‘sish/jadval", "Emizish/ovqatlanish", "Vaksinatsiya kalendari"],
  },
  {
    id: "dentistry",
    name: "Stomatologiya",
    emoji: "🦷",
    about:
      "Tish va og‘iz bo‘shlig‘i kasalliklari. Estetika, protez, jarrohlik tish amaliyotlari.",
    path: [
      "5 yil stomatologiya (alohida fakultet)",
      "Ixtisosga qarab 2–3 yil rezidentura",
      "Klinika, xususiy amaliyot imkoni",
    ],
    skills: ["Rentgen o‘qish", "Sterilizatsiya", "Anesteziya", "Estetik yondashuv"],
  },
  {
    id: "er",
    name: "Shoshilinch Tibbiyot",
    emoji: "🚑",
    about:
      "Favqulodda holatlarda qisqa vaqtda to‘g‘ri tashxis va reanimatsion yordam. Stressga bardoshlilik shart.",
    path: [
      "6–7 yil tibbiyot",
      "3 yil shoshilinch tibbiyot rezidenturasi",
      "ATLS/ACLS kabi kurslar",
    ],
    skills: ["Airway, Breathing, Circulation", "EKG, ultratovush", "Triyaj"],
  },
  {
    id: "obgyn",
    name: "Akusherlik-ginekologiya",
    emoji: "🤰",
    about:
      "Homiladorlikni kuzatish, tug‘ruq, ayollar salomatligi. Tezkor vaziyatlar va mehribon muloqot muhim.",
    path: [
      "6–7 yil tibbiyot",
      "3–4 yil OBGYN rezidentura",
      "Amaliyot: tug‘ruqxonalar, poliklinika",
    ],
    skills: ["USG asoslari", "Neonatal reanimatsiya", "Steril texnika"],
  },
];

const SKILL_GROUPS = [
  {
    title: "Hard Skills",
    items: [
      "Anatomiya va fiziologiya asoslari",
      "Farmakologiya (dori dozalari)",
      "EKG/USG asoslarini tushunish",
      "Tibbiy hujjatlar yuritish",
      "Gigiyena, aseptika, antiseptika",
    ],
  },
  {
    title: "Soft Skills",
    items: [
      "Empatiya va tinglash",
      "Stressga chidamlilik",
      "Jamoada ishlash",
      "Tezkor va aniq qarorlar",
      "Axloqiy me’yorlarga rioya",
    ],
  },
];

const QUIZ = [
  {
    q: "Qon bosimini o‘lchashda qaysi birlik ishlatiladi?",
    choices: ["mmHg", "kPa", "dB", "nm"],
    answer: 0,
    explain: "Standart birlik — millimetr simob ustuni (mmHg).",
  },
  {
    q: "Aseptika va antiseptika nima uchun kerak?",
    choices: [
      "Operatsion xonani bezash",
      "Infeksiyani oldini olish",
      "Dori dozasini tekshirish",
      "Qon bosimini oshirish",
    ],
    answer: 1,
    explain: "Jarayon va instrumental tozalik orqali infeksiya tarqalishini kamaytiradi.",
  },
  {
    q: "Tibbiy etikada eng muhim qadriyat?",
    choices: ["Boylik", "Mashhurlik", "Bemor xavfsizligi", "Shoshilish"],
    answer: 2,
    explain: "Har doim bemor xavfsizligi va manfaatlari ustuvor.",
  },
];

const BOOKS = [
  { title: "Gray’s Anatomy (Student Edition)", type: "Kitob", note: "Anatomiya asoslari" },
  { title: "Robbins Basic Pathology", type: "Kitob", note: "Patologiya kirish" },
  { title: "Clinical Microbiology Made Ridiculously Simple", type: "Kitob", note: "Mikrobiologiya" },
];

const COURSES = [
  { title: "ACLS / BLS", type: "Kurs", note: "Hayotiy ko‘nikmalar" },
  { title: "First Aid & CPR", type: "Kurs", note: "Birlamchi yordam" },
  { title: "Evidence-Based Medicine", type: "Kurs", note: "EBM asoslari" },
];

const DEFAULT_WEEK = [
  { day: "Dushanba", slots: ["Biologiya", "Anatomiya", "Sport/Running"] },
  { day: "Seshanba", slots: ["Kimyo", "Fiziologiya", "English Med"] },
  { day: "Chorshanba", slots: ["Farmakologiya", "Seminar", "Amaliy ko‘nikma"] },
  { day: "Payshanba", slots: ["Psixologiya", "Mikrobiologiya", "Self-study"] },
  { day: "Juma", slots: ["Klinik asoslar", "Simulyator", "Qayta takrorlash"] },
  { day: "Shanba", slots: ["Reja tuzish", "Yengil sport", "Dam olish"] },
  { day: "Yakshanba", slots: ["Dam olish", "Oila", "Hobbi"] },
];

/* ------------------------------ Subcomponents --------------------------- */

const Section = ({ title, children, className }) => (
  <section className={classNames("bg-gray-800/70 rounded-2xl p-6 md:p-8", className)}>
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
    {children}
  </section>
);

// Simple Accordion for FAQ
const AccordionItem = ({ i, q, a, open, onToggle }) => (
  <div className="border-b border-gray-700">
    <button
      className="w-full text-left py-4 flex justify-between items-center"
      onClick={onToggle}
      aria-expanded={open}
    >
      <span className="text-lg text-gray-100">{q}</span>
      <span className="text-gray-300">{open ? "−" : "+"}</span>
    </button>
    {open && <p className="pb-4 text-gray-300">{a}</p>}
  </div>
);

// Tag
const Tag = ({ children }) => (
  <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-200 mr-2 mb-2">
    {children}
  </span>
);

/* ------------------------------ Page ------------------------------------ */

export default function Doctor() {
  const navigate = useNavigate();

  // specialties tabs
  const [tab, setTab] = useState(SPECIALTIES[0].id);

  // weekly plan
  const [week, setWeek] = useState(load("doctor_week_plan", DEFAULT_WEEK));

  // checklist
  const allItems = useMemo(
    () => SKILL_GROUPS.flatMap((g) => g.items.map((txt) => `${g.title}:${txt}`)),
    []
  );
  const [checked, setChecked] = useState(load("doctor_checked_skills", []));
  const progress = Math.round((checked.length / allItems.length) * 100);

  // quiz
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const score = useMemo(() => {
    let s = 0;
    QUIZ.forEach((q, i) => {
      if (answers[i] === q.answer) s++;
    });
    return s;
  }, [answers]);

  // faq
  const FAQ = [
    {
      q: "Shifokor bo‘lish uchun nechchi yil o‘qish kerak?",
      a: "Odatda 6–7 yil bakalavr + 2–4 yil rezidentura (ixtisos) talab etiladi.",
    },
    {
      q: "Talab qilinadigan fazilatlar nimalar?",
      a: "Empatiya, mas’uliyat, sabr-toqat, stressga bardoshlilik va doimiy o‘qishga tayyorlik.",
    },
    {
      q: "Qaysi fanlarga ko‘proq e’tibor qaratish kerak?",
      a: "Biologiya, kimyo, anatomiya, fiziologiya, farmakologiya va klinik asoslar.",
    },
    {
      q: "Shifokorlik qanchalik qiyin?",
      a: "Juda mas’uliyatli va qiyin, ammo inson hayotiga foyda keltirish hissi buning o‘rnini bosadi.",
    },
  ];
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    save("doctor_week_plan", week);
  }, [week]);
  useEffect(() => {
    save("doctor_checked_skills", checked);
  }, [checked]);

  const setSlot = (dayIdx, slotIdx, text) => {
    setWeek((prev) =>
      prev.map((d, i) =>
        i === dayIdx
          ? { ...d, slots: d.slots.map((s, j) => (j === slotIdx ? text : s)) }
          : d
      )
    );
  };

  const toggleCheck = (key) => {
    setChecked((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]
    );
  };

  const resetPlan = () => setWeek(DEFAULT_WEEK);
  const clearChecks = () => setChecked([]);

  const submitQuiz = () => setFinished(true);
  const resetQuiz = () => {
    setFinished(false);
    setAnswers({});
  };

  const currentSp = useMemo(
    () => SPECIALTIES.find((s) => s.id === tab),
    [tab]
  );

  return (
    <div
      className="min-h-screen p-4 md:p-8 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1580281657527-47e47f1b0c22?q=80&w=1470&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
            ⚕️ Shifokor bo‘lish yo‘li
          </h1>
          <p className="mt-4 text-gray-200 max-w-3xl mx-auto">
            Shifokorlik — bilim, mardlik va mehr talab qiladigan oliy kasb.
            Quyidagi yo‘l xaritasi, mutaxassisliklar va ko‘nikmalar ro‘yxati
            seni rejali harakatga undash uchun tuzilgan. Bu sahifa
            ma’lumot-maqsadli, klinik maslahat emas.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_CARDS.map((c, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white shadow-lg"
            >
              <div className="text-3xl">{c.icon}</div>
              <h3 className="mt-2 font-semibold">{c.title}</h3>
              <div className="text-2xl font-bold">{c.value}</div>
              <div className="text-xs text-gray-300">{c.note}</div>
            </div>
          ))}
        </div>

        {/* Big Motivation */}
        <div className="rounded-3xl p-6 md:p-10 bg-gradient-to-r from-purple-600/60 to-pink-600/60 text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">💡 Nega shifokor?</h2>
          <p className="text-gray-100 text-lg leading-relaxed">
            Chunki har bir to‘g‘ri tashxis va o‘z vaqtida ko‘rsatilgan yordam — kimningdir
            hayotini, orzularini, oila baxtini saqlab qoladi. Qiyin, lekin
            eng oliy mukofot ham shu — inson minnatdorchiligi.
          </p>
        </div>

        {/* Timeline */}
        <Section title="📆 Yo‘l xaritasi (Timeline)">
          <div className="space-y-6">
            {TIMELINE.map((t, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-pink-400 shadow" />
                <h3 className="text-xl font-semibold text-white">{t.year}</h3>
                <ul className="mt-2 text-gray-300 list-disc list-inside space-y-1">
                  {t.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Specialties */}
        <Section title="🩻 Mutaxassisliklar">
          <div className="flex flex-wrap gap-2 mb-6">
            {SPECIALTIES.map((s) => (
              <button
                key={s.id}
                onClick={() => setTab(s.id)}
                className={classNames(
                  "px-4 py-2 rounded-full border text-sm",
                  tab === s.id
                    ? "bg-pink-600 text-white border-pink-500"
                    : "bg-white/10 text-gray-200 border-white/20 hover:bg-white/20"
                )}
              >
                <span className="mr-1">{s.emoji}</span>
                {s.name}
              </button>
            ))}
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{currentSp.emoji}</div>
              <div>
                <h3 className="text-xl font-bold text-white">{currentSp.name}</h3>
                <p className="text-gray-300 mt-1">{currentSp.about}</p>
                <div className="mt-3">
                  {currentSp.skills.map((sk) => (
                    <Tag key={sk}>{sk}</Tag>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white">O‘qish yo‘li:</h4>
              <ol className="mt-2 list-decimal list-inside text-gray-300 space-y-1">
                {currentSp.path.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ol>
            </div>
          </div>
        </Section>

        {/* Study Plan (Weekly Schedule) */}
        <Section title="🗓️ Haftalik o‘quv reja (rejalashtir va saqla)">
          <p className="text-gray-300 mb-4">
            Dars/ko‘nikmalarni kunlar bo‘yicha yozib bor. Ular brauzerda saqlanadi
            (localStorage). Istalgan payt o‘zgartirishing mumkin.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {week.map((d, i) => (
              <div
                key={d.day}
                className="bg-white/5 rounded-2xl p-4 border border-white/10"
              >
                <h4 className="text-white font-semibold mb-3">{d.day}</h4>
                {d.slots.map((s, j) => (
                  <input
                    key={`${i}-${j}`}
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900/60 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-pink-500"
                    value={s}
                    onChange={(e) => setSlot(i, j, e.target.value)}
                    placeholder={`Faoliyat ${j + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => save("doctor_week_plan", week)}
              className="px-5 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold"
            >
              💾 Saqlash
            </button>
            <button
              onClick={resetPlan}
              className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold"
            >
              ♻️ Default reja
            </button>
          </div>
        </Section>

        {/* Checklist & Progress */}
        <Section title="✅ Ko‘nikmalar checklist (progress bilan)">
          <div className="mb-3">
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm text-gray-300 mt-1">{progress}% bajarildi</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {SKILL_GROUPS.map((g) => (
              <div
                key={g.title}
                className="bg-white/5 rounded-2xl p-4 border border-white/10"
              >
                <h4 className="text-white font-semibold mb-2">{g.title}</h4>
                <ul className="space-y-2">
                  {g.items.map((txt) => {
                    const key = `${g.title}:${txt}`;
                    const is = checked.includes(key);
                    return (
                      <li
                        key={key}
                        className="flex items-center gap-3 text-gray-200"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-pink-600"
                          checked={is}
                          onChange={() => toggleCheck(key)}
                        />
                        <span className={is ? "line-through opacity-70" : ""}>
                          {txt}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => save("doctor_checked_skills", checked)}
              className="px-5 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold"
            >
              💾 Saqlash
            </button>
            <button
              onClick={clearChecks}
              className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold"
            >
              🧹 Tozalash
            </button>
          </div>
        </Section>

        {/* Quiz */}
        <Section title="🧪 Mini-Quiz (3 savol)">
          <div className="space-y-5">
            {QUIZ.map((q, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="text-white font-semibold">
                  {i + 1}. {q.q}
                </div>
                <div className="mt-2 grid md:grid-cols-2 gap-2">
                  {q.choices.map((c, idx) => {
                    const sel = answers[i] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          !finished && setAnswers((p) => ({ ...p, [i]: idx }))
                        }
                        className={classNames(
                          "text-left px-4 py-3 rounded-xl border",
                          finished
                            ? idx === q.answer
                              ? "bg-green-700 border-green-600 text-white"
                              : sel
                              ? "bg-red-700 border-red-600 text-white"
                              : "bg-white/10 text-gray-200 border-white/20"
                            : sel
                            ? "bg-pink-600 text-white border-pink-500"
                            : "bg-white/10 text-gray-200 border-white/20 hover:bg-white/20"
                        )}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
                {finished && (
                  <p className="mt-2 text-sm text-gray-300">
                    Izoh: {q.explain}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3 items-center">
            {!finished ? (
              <button
                onClick={submitQuiz}
                className="px-5 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold"
              >
                ✅ Yakunlash
              </button>
            ) : (
              <>
                <div className="text-white">
                  Natija: <span className="font-bold">{score}</span> / {QUIZ.length}
                </div>
                <button
                  onClick={resetQuiz}
                  className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold"
                >
                  🔁 Qayta ishlash
                </button>
              </>
            )}
          </div>
        </Section>

        {/* Ethics & Warnings */}
        <Section title="⚖️ Etika va ogohlantirish">
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>
              Bemor xavfsizligi har doim birinchi o‘rinda bo‘lishi kerak. Ikkinchi
              tamoyil — zarar qilmaslik (non-maleficence).
            </li>
            <li>
              Maxfiylik — bemor ma’lumotlari sir tutiladi. Ruxsatsiz ulashish
              qat’iyan man etiladi.
            </li>
            <li>
              Bu sahifa o‘quv-ma’lumot maqsadida. Klinik holatlarda faqat malakali
              tibbiyot xodimlari ko‘rsatmalariga amal qilinadi.
            </li>
            <li>
              Dori-darmonlar, muolajalar bo‘yicha mustaqil qaror qabul qilish —
              xavfli. Mutaxassis bilan maslahatlashing.
            </li>
          </ul>
        </Section>

        {/* Resources */}
        <Section title="📚 Resurslar (kitoblar & kurslar)">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Kitoblar</h4>
              <ul className="space-y-2">
                {BOOKS.map((b, i) => (
                  <li key={i} className="text-gray-200">
                    <span className="font-medium">{b.title}</span>{" "}
                    <span className="text-xs opacity-70">({b.type})</span>
                    <div className="text-sm opacity-80">{b.note}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Kurslar</h4>
              <ul className="space-y-2">
                {COURSES.map((c, i) => (
                  <li key={i} className="text-gray-200">
                    <span className="font-medium">{c.title}</span>{" "}
                    <span className="text-xs opacity-70">({c.type})</span>
                    <div className="text-sm opacity-80">{c.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section title="❓ Tez-tez so‘raladigan savollar (FAQ)">
          <div className="bg-white/5 rounded-2xl border border-white/10">
            {FAQ.map((f, i) => (
              <AccordionItem
                key={i}
                i={i}
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </Section>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pb-10">
          <button
            onClick={() => navigate("/universities")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg text-white font-bold text-lg"
          >
            🎓 Universitetlar ro‘yxati
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all duration-300 shadow-lg text-white font-bold text-lg"
          >
            ⬅️ Bosh sahifa
          </button>
        </div>
      </div>
    </div>
  );
}
