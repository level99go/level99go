import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * DEVELOPER.JSX — Dasturchi bo‘lish yo‘li (keng qamrovli sahifa)
 * TailwindCSS UI, localStorage bilan ma'lumot saqlash.
 */

/* ------------------------------- Helpers -------------------------------- */
const cx = (...cls) => cls.filter(Boolean).join(" ");

const saveLS = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
};
const loadLS = (k, fb) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; }
};

/* -------------------------------- Data ---------------------------------- */
const STATS = [
  { t: "Boshlang‘ich vaqt", v: "9–12 oy", n: "Consistent o‘qish", icon: "⏳" },
  { t: "Portfolio loyihalar", v: "3–5 ta", n: "Real muammo yechimi", icon: "📁" },
  { t: "Intervyu bosqichlari", v: "2–4", n: "HR + texnik + live", icon: "🧪" },
  { t: "Eng zarur ko‘nikma", v: "Problem solving", n: "Fikrni tuzish", icon: "🧠" },
];

const ROADMAP = [
  {
    title: "0–2 oy: Fundament",
    items: [
      "Git/GitHub (branch, PR, merge conflict)",
      "Algoritm asoslari (array, string, hash map)",
      "HTML5, CSS3, responsiv dizayn",
      "Bir bitta tilni tanla (JS/Python/Java)",
    ],
  },
  {
    title: "3–4 oy: Til + Asosiy framework",
    items: [
      "JS: ES6+, async/await, modules",
      "Yoki Python: venv, pip, OOP",
      "Frontend: React asoslari (state, props, hooks)",
      "Backend: REST API (Express/FastAPI/Spring)",
    ],
  },
  {
    title: "5–7 oy: Real loyihalar",
    items: [
      "Autentikatsiya (JWT), CRUD",
      "Database: Postgres yoki MongoDB",
      "Deployment: Vercel/Netlify/Render",
      "Testing: Jest/PyTest, Postman/Insomnia",
    ],
  },
  {
    title: "8–10 oy: Kengaytirish",
    items: [
      "TypeScript yoki Strong typing",
      "State management (Redux/Zustand)",
      "Caching (React Query/Redis)",
      "CI/CD, lint/format (ESLint/Prettier)",
    ],
  },
  {
    title: "11–12 oy: Ish qidirish",
    items: [
      "Portfolio polishing, README + demo",
      "LeetCode/Codeforcesda 50–100 masala",
      "Mock interviewlar",
      "CV/LinkedIn optimizatsiya",
    ],
  },
];

const SPECIALTIES = [
  {
    id: "frontend",
    name: "Frontend",
    emoji: "🎨",
    about:
      "UI/UXga yaqin qism. React/Vue/Next.js, CSS, accessibility, performance. Foydalanuvchiga ko‘rinadigan hamma narsa.",
    path: [
      "HTML/CSS/JS — mustahkam asos",
      "React yoki Vue + routing + state",
      "TypeScript, testing, performance",
      "Deployment + SEO + accessibility",
    ],
    skills: ["Responsive UI", "Hooks/State", "API integration", "Testing"],
    stack: ["HTML", "CSS", "JS/TS", "React", "Next.js", "Redux/Zustand"],
  },
  {
    id: "backend",
    name: "Backend",
    emoji: "🧩",
    about:
      "Server taraf: API, authentikatsiya, biznes mantiq, database. Performance va xavfsizlik muhim.",
    path: [
      "Bitta til: JS(Node)/Python/Java/Go",
      "REST/GraphQL, ORM (Prisma/TypeORM/SQLAlchemy)",
      "Caching, monitoring, logging",
      "Docker + cloud deploy",
    ],
    skills: ["REST/GraphQL", "SQL/NoSQL", "Auth/JWT", "Scaling"],
    stack: ["Node/Express", "Postgres", "MongoDB", "Redis", "Docker", "NGINX"],
  },
  {
    id: "mobile",
    name: "Mobile",
    emoji: "📱",
    about:
      "iOS/Android ilovalar. React Native/Flutter — bir kod bazada 2 platforma yoki Swift/Kotlin bilan native yo‘l.",
    path: [
      "Dart(Flutter) yoki React Native",
      "Platform features: camera, storage",
      "State management, offline mode",
      "Store release, crash monitoring",
    ],
    skills: ["UI widgets", "State mgmt", "Native APIs", "Release cycle"],
    stack: ["Flutter/Dart", "React Native", "Redux/Zustand", "Firebase"],
  },
  {
    id: "data",
    name: "Data/ML",
    emoji: "📊",
    about:
      "Ma’lumotlar bilan ishlash: ETL, vizualizatsiya, ML modellar. Python, Pandas, sklearn, əsasiy statistika.",
    path: [
      "Python + NumPy/Pandas",
      "SQL, data warehousing",
      "Model: scikit-learn, basic DL",
      "MLOps, monitoring",
    ],
    skills: ["EDA", "Feature eng.", "Model eval", "SQL"],
    stack: ["Python", "Pandas", "sklearn", "Postgres/BigQuery", "Airflow"],
  },
  {
    id: "devops",
    name: "DevOps",
    emoji: "⚙️",
    about:
      "CI/CD, infratuzilma, observability. Docker, Kubernetes, Terraform, monitoring, olayotgan servislarni mustahkam qilish.",
    path: [
      "Linux, Shell, Git",
      "Docker, docker-compose",
      "K8s, IaC (Terraform)",
      "CI/CD (GitHub Actions), observability",
    ],
    skills: ["Containers", "Networking", "Infra as Code", "Monitoring"],
    stack: ["Docker", "K8s", "Terraform", "Prometheus/Grafana", "NGINX"],
  },
  {
    id: "game",
    name: "Game Dev",
    emoji: "🎮",
    about:
      "Unity/Unreal bilan o‘yinlar. Fizika, grafika, assetlar, performans optimizatsiyasi.",
    path: [
      "C# (Unity) yoki C++ (Unreal)",
      "Game loop, physics, input",
      "Level design, assets",
      "Builds & optimization",
    ],
    skills: ["OOP", "Physics", "Shaders (basic)", "Profiling"],
    stack: ["Unity", "Unreal", "Blender (assets)", "C#/C++"],
  },
];

const SKILLS = [
  {
    title: "Hard Skills",
    items: [
      "Ma’lumot tuzilmalari va algoritmlar",
      "Git, branching, PR",
      "API (REST/GraphQL) bilan ishlash",
      "Database: SQL/NoSQL asoslari",
      "Testing (unit/integration)",
      "TypeScript yoki static typing",
    ],
  },
  {
    title: "Soft Skills",
    items: [
      "Tartib (clean code, naming)",
      "Teamwork & code review",
      "Muammoga strukturali yondashuv",
      "Documentation & communication",
      "Time management (Pomodoro)",
    ],
  },
];

const QUIZ = [
  {
    q: "HTTP’da GET va POST farqi nima?",
    choices: [
      "Ikkalasi ham bir xil",
      "GET — ma’lumot olish, POST — ma’lumot yuborish",
      "POST tezroq",
      "GET faqat JSON qaytaradi",
    ],
    answer: 1,
    explain: "GET odatda resursni olish, POST esa serverga ma’lumot yuborish uchun.",
  },
  {
    q: "Big O notatsiyada qaysi murakkablik eng tezkor?",
    choices: ["O(n)", "O(n log n)", "O(1)", "O(n^2)"],
    answer: 2,
    explain: "O(1) — konstant vaqt: kirish o‘lchamidan qat’i nazar deyarli doimiy.",
  },
  {
    q: "SQL’da qaysi buyruq ma’lumotni tanlash uchun?",
    choices: ["SELECT", "INSERT", "UPDATE", "DELETE"],
    answer: 0,
    explain: "SELECT — ma’lumotni o‘qish uchun ishlatiladi.",
  },
];

const BOOKS = [
  { title: "Clean Code — Robert C. Martin", note: "Kod sifati, naming, refaktor" },
  { title: "You Don’t Know JS (Yet)", note: "JS chuqur tushunchalar" },
  { title: "Grokking Algorithms", note: "Vizual va sodda izohlar" },
];

const COURSES = [
  { title: "Full-Stack Open", note: "React, Node, GraphQL, TS" },
  { title: "CS50 (Harvard)", note: "Kompyuter fanlari bazasi" },
  { title: "Frontend Mentor", note: "Amaliy UI mashqlar" },
];

const TOOLS = [
  "VS Code / JetBrains",
  "Figma (UI muhokama)",
  "Postman/Insomnia (API test)",
  "Docker (dev environment)",
  "ESLint + Prettier",
  "GitHub Actions (CI)",
];

const DEFAULT_WEEK = [
  { day: "Dushanba", slots: ["Algoritm", "JS Fundament", "Git practice"] },
  { day: "Seshanba", slots: ["HTML/CSS", "React Basics", "Mini project"] },
  { day: "Chorshanba", slots: ["Node/Express", "Postman test", "SQL Practice"] },
  { day: "Payshanba", slots: ["TypeScript", "Testing (Jest)", "Refactor"] },
  { day: "Juma", slots: ["Project Work", "Code Review", "Deploy"] },
  { day: "Shanba", slots: ["Portfolio update", "Blog yozish", "LeetCode 5"] },
  { day: "Yakshanba", slots: ["Dam olish", "Sport/Yurish", "Reading"] },
];

const PROJECT_IDEAS = [
  {
    name: "Task Manager",
    desc: "Auth + CRUD + drag&drop. Kanban board (frontend) yoki full-stack.",
    tags: ["Auth", "CRUD", "Drag&Drop", "State"],
  },
  {
    name: "Recipe Finder",
    desc: "Public API dan retseptlar. Filtr, pagination, favorites.",
    tags: ["API", "Search", "Pagination"],
  },
  {
    name: "Finance Tracker",
    desc: "Daromad/chiqim, chartlar, eksport (CSV).",
    tags: ["Charts", "CSV", "LocalStorage/DB"],
  },
  {
    name: "Chat App",
    desc: "WebSocket/Socket.io real-time chat, rooms va read receipts.",
    tags: ["WebSocket", "Real-time", "Auth"],
  },
  {
    name: "E-commerce mini",
    desc: "Mahsulotlar, savat, checkout mock, admin panel.",
    tags: ["CRUD", "State", "Routing"],
  },
];

/* ------------------------------ Reusable UI ----------------------------- */
const Section = ({ title, children, className }) => (
  <section className={cx("bg-gray-800/70 rounded-2xl p-6 md:p-8", className)}>
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
    {children}
  </section>
);

const Tag = ({ children }) => (
  <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-200 mr-2 mb-2">
    {children}
  </span>
);

const AccordionItem = ({ q, a, open, onToggle }) => (
  <div className="border-b border-gray-700">
    <button className="w-full py-4 flex justify-between items-center text-left" onClick={onToggle}>
      <span className="text-gray-100">{q}</span>
      <span className="text-gray-300">{open ? "−" : "+"}</span>
    </button>
    {open && <p className="pb-4 text-gray-300">{a}</p>}
  </div>
);

/* -------------------------------- Page ---------------------------------- */
export default function Developer() {
  const navigate = useNavigate();

  // tabs
  const [tab, setTab] = useState(SPECIALTIES[0].id);

  // week plan
  const [week, setWeek] = useState(loadLS("dev_week_plan", DEFAULT_WEEK));
  const setSlot = (dIdx, sIdx, v) => {
    setWeek((prev) =>
      prev.map((d, i) =>
        i === dIdx ? { ...d, slots: d.slots.map((s, j) => (j === sIdx ? v : s)) } : d
      )
    );
  };

  // checklist
  const allSkillKeys = useMemo(
    () => SKILLS.flatMap((g) => g.items.map((txt) => `${g.title}:${txt}`)),
    []
  );
  const [checked, setChecked] = useState(loadLS("dev_checked", []));
  const toggleCheck = (k) =>
    setChecked((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]));
  const progress = Math.round((checked.length / allSkillKeys.length) * 100);

  // quiz
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const score = useMemo(() => QUIZ.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0), [
    answers,
  ]);

  // faq
  const FAQ = [
    { q: "Frontendmi yoki Backendmi?", a: "Qaysi tomonni yoqtirishingga bog‘liq. UI/UXga yaqin bo‘lsang — Frontend. Mantiq, API, ma’lumotlar — Backend." },
    { q: "Ingliz tili qanchalik muhim?", a: "Dokumentatsiya, kurslar, intervyu savollari ko‘pincha ingliz tilida. Kamida o‘rta daraja shart." },
    { q: "Matematika shartmi?", a: "Web/CRUD uchun chuqur matematika shart emas. Algoritmlar va mantiqiy fikrlash yetarli. ML/Game’da esa ko‘proq kerak bo‘ladi." },
    { q: "Qanday kompyuter kerak?", a: "8GB RAM minimal, 16GB yaxshi. SSD muhim. VS Code/JetBrains bemalol ishlasin." },
  ];
  const [openFaq, setOpenFaq] = useState(null);

  // effects
  useEffect(() => saveLS("dev_week_plan", week), [week]);
  useEffect(() => saveLS("dev_checked", checked), [checked]);

  // handlers
  const resetPlan = () => setWeek(DEFAULT_WEEK);
  const clearChecks = () => setChecked([]);
  const submitQuiz = () => setFinished(true);
  const resetQuiz = () => { setAnswers({}); setFinished(false); };

  const current = useMemo(() => SPECIALTIES.find((s) => s.id === tab), [tab]);

  return (
    <div
      className="min-h-screen p-4 md:p-8 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1470&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text drop-shadow-lg">
            💻 Dasturchi bo‘lish yo‘li
          </h1>
          <p className="mt-4 text-gray-200 max-w-3xl mx-auto">
            Reja + amaliyot + muammolarni yechish — muvaffaqiyat kaliti. Quyidagi
            yo‘l xaritasi, yo‘nalishlar, reja va resurslar seni mustahkam tayyorlaydi.
          </p>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((c, i) => (
            <div key={i} className="bg-white/10 border border-white/20 rounded-2xl p-5 text-white shadow-lg">
              <div className="text-3xl">{c.icon}</div>
              <h3 className="mt-2 font-semibold">{c.t}</h3>
              <div className="text-2xl font-bold">{c.v}</div>
              <div className="text-xs text-gray-300">{c.n}</div>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <Section title="🗺️ 12 oylik Roadmap (bosqichma-bosqich)">
          <div className="space-y-6">
            {ROADMAP.map((r, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-cyan-400 shadow" />
                <h3 className="text-xl font-semibold text-white">{r.title}</h3>
                <ul className="mt-2 text-gray-300 list-disc list-inside space-y-1">
                  {r.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Specialties */}
        <Section title="🧭 Yo‘nalish(lar)ni tanla">
          <div className="flex flex-wrap gap-2 mb-6">
            {SPECIALTIES.map((s) => (
              <button
                key={s.id}
                onClick={() => setTab(s.id)}
                className={cx(
                  "px-4 py-2 rounded-full border text-sm",
                  tab === s.id
                    ? "bg-cyan-600 text-white border-cyan-500"
                    : "bg-white/10 text-gray-200 border-white/20 hover:bg-white/20"
                )}
              >
                <span className="mr-1">{s.emoji}</span>{s.name}
              </button>
            ))}
          </div>

          <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{current.emoji}</div>
              <div>
                <h3 className="text-xl font-bold text-white">{current.name}</h3>
                <p className="text-gray-300 mt-1">{current.about}</p>
                <div className="mt-3">{current.skills.map((sk) => <Tag key={sk}>{sk}</Tag>)}</div>
                <div className="mt-3">{current.stack.map((st) => <Tag key={st}>{st}</Tag>)}</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white">Yo‘l:</h4>
              <ol className="mt-2 list-decimal list-inside text-gray-300 space-y-1">
                {current.path.map((p, i) => <li key={i}>{p}</li>)}
              </ol>
            </div>
          </div>
        </Section>

        {/* Weekly Plan */}
        <Section title="📅 Haftalik reja (o‘zgartir va saqla)">
          <p className="text-gray-300 mb-4">Kundalik mashg‘ulotlarni yozib bor. Brauzeringda saqlanadi.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {week.map((d, i) => (
              <div key={d.day} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-3">{d.day}</h4>
                {d.slots.map((s, j) => (
                  <input
                    key={`${i}-${j}`}
                    className="w-full mb-2 px-3 py-2 rounded-lg bg-gray-900/60 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-cyan-500"
                    value={s}
                    onChange={(e) => setSlot(i, j, e.target.value)}
                    placeholder={`Faoliyat ${j + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={() => saveLS("dev_week_plan", week)} className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold">💾 Saqlash</button>
            <button onClick={resetPlan} className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold">♻️ Default reja</button>
          </div>
        </Section>

        {/* Skills Checklist */}
        <Section title="✅ Skill checklist + progress">
          <div className="mb-3">
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-sm text-gray-300 mt-1">{progress}% bajarildi</div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {SKILLS.map((g) => (
              <div key={g.title} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <h4 className="text-white font-semibold mb-2">{g.title}</h4>
                <ul className="space-y-2">
                  {g.items.map((txt) => {
                    const key = `${g.title}:${txt}`;
                    const on = checked.includes(key);
                    return (
                      <li key={key} className="flex items-center gap-3 text-gray-200">
                        <input
                          type="checkbox"
                          className="w-5 h-5 accent-cyan-600"
                          checked={on}
                          onChange={() => toggleCheck(key)}
                        />
                        <span className={on ? "line-through opacity-70" : ""}>{txt}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={() => saveLS("dev_checked", checked)} className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold">💾 Saqlash</button>
            <button onClick={clearChecks} className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold">🧹 Tozalash</button>
          </div>
        </Section>

        {/* Projects */}
        <Section title="🧱 Portfolio uchun loyiha g‘oyalari">
          <div className="grid md:grid-cols-2 gap-4">
            {PROJECT_IDEAS.map((p, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <h4 className="text-white font-semibold">{p.name}</h4>
                <p className="text-gray-300 mt-1">{p.desc}</p>
                <div className="mt-2">
                  {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-300 mt-4 text-sm">
            Har bir loyiha uchun: <strong>README</strong>, <strong>demo link</strong>, <strong>screenshots</strong>, <strong>tech stack</strong> va
            <strong> kommit tarixi</strong>ni to‘liq qo‘y.
          </p>
        </Section>

        {/* Quiz */}
        <Section title="🧪 Mini-Quiz (3 savol)">
          <div className="space-y-5">
            {QUIZ.map((q, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="text-white font-semibold">{i + 1}. {q.q}</div>
                <div className="mt-2 grid md:grid-cols-2 gap-2">
                  {q.choices.map((c, idx) => {
                    const sel = answers[i] === idx;
                    const correct = idx === q.answer;
                    return (
                      <button
                        key={idx}
                        onClick={() => !finished && setAnswers((p) => ({ ...p, [i]: idx }))}
                        className={cx(
                          "text-left px-4 py-3 rounded-xl border",
                          finished
                            ? correct
                              ? "bg-green-700 border-green-600 text-white"
                              : sel
                              ? "bg-red-700 border-red-600 text-white"
                              : "bg-white/10 text-gray-200 border-white/20"
                            : sel
                            ? "bg-cyan-600 text-white border-cyan-500"
                            : "bg-white/10 text-gray-200 border-white/20 hover:bg-white/20"
                        )}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
                {finished && <p className="mt-2 text-sm text-gray-300">Izoh: {q.explain}</p>}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-3 items-center">
            {!finished ? (
              <button onClick={submitQuiz} className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold">✅ Yakunlash</button>
            ) : (
              <>
                <div className="text-white">Natija: <span className="font-bold">{score}</span> / {QUIZ.length}</div>
                <button onClick={resetQuiz} className="px-5 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold">🔁 Qayta ishlash</button>
              </>
            )}
          </div>
        </Section>

        {/* Interview Prep */}
        <Section title="🧭 Intervyuga tayyorgarlik">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h4 className="text-white font-semibold">Texnik savollar</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                <li>Asinxronlik (event loop, promise, threads/processes)</li>
                <li>HTTP, status-kodlar, cookies vs JWT</li>
                <li>Ma’lumot tuzilmalari (stack/queue/map/set/tree)</li>
                <li>SQL vs NoSQL qaror qabul qilish</li>
                <li>Testing strategiyalari</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h4 className="text-white font-semibold">Behavioral savollar</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mt-2">
                <li>Jamoada nizoni qanday hal qilgansiz?</li>
                <li>Eng katta xatoyingiz va undan olgan saboqlaringiz?</li>
                <li>Deadline bosimi ostida ishlagan vaziyat?</li>
                <li>Qanday qilib yangi texnologiyani o‘rgangan edingiz?</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Resources */}
        <Section title="📚 Resurslar (kitob/kurs/tools)">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Kitoblar</h4>
              <ul className="space-y-2">
                {BOOKS.map((b, i) => (
                  <li key={i} className="text-gray-200">
                    <span className="font-medium">{b.title}</span>
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
                    <span className="font-medium">{c.title}</span>
                    <div className="text-sm opacity-80">{c.note}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <h4 className="text-white font-semibold mb-2">Tools</h4>
              <ul className="space-y-2 text-gray-200">
                {TOOLS.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        </Section>

        {/* Ethics */}
        <Section title="⚖️ Professional etika">
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Open-source/StackOverflow kodini olib ishlatsang — lisensiyasini hurmat qil.</li>
            <li>Maxfiy ma’lumotlar (API keys, parollar) — .env’larda, repoga qo‘shma.</li>
            <li>Plagiatdan qoch, o‘zing yozgan kodni tushuntirib bera ol.</li>
          </ul>
        </Section>

        {/* FAQ */}
        <Section title="❓ Tez-tez so‘raladigan savollar">
          <div className="bg-white/5 rounded-2xl border border-white/10">
            {FAQ.map((f, i) => (
              <AccordionItem
                key={i}
                q={f.q}
                a={f.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </Section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pb-10">
          <button
            onClick={() => navigate("/universities")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg text-white font-bold text-lg"
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
