// src/profiles/UzbekLanguageProfile.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Search from "../pages/Search";

/* -------------------------------------------------------------------------- */
/* --------------------------- LARGE CREATIVE PROFILE ----------------------- */
/* -------------------------------------------------------------------------- */

/* ----------------------------- Helpers / Utils --------------------------- */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

const useRandomArray = (n) =>
  useMemo(
    () =>
      Array.from({ length: n }).map((_, i) => ({
        id: `p-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 1 + Math.random() * 3,
        o: 0.12 + Math.random() * 0.5,
        dur: 4 + Math.random() * 6,
        delay: Math.random() * 3,
      })),
    [n]
  );

/* ------------------------------- Subcomponents --------------------------- */

function DecorativeParticles({ count = 60 }) {
  const parts = useRandomArray(count);
  return (
    <>
      {parts.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ y: [0, -12, 0], opacity: [0.1, p.o, 0.1] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            borderRadius: 9999,
            background:
              Math.random() > 0.5 ? "rgba(34,197,94,0.8)" : "rgba(99,102,241,0.6)",
            filter: "blur(1px)",
            zIndex: 0,
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />
      ))}
    </>
  );
}

function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      <div
        className="absolute -left-56 -top-36 w-[700px] h-[700px] rounded-full opacity-40 blur-[80px] animate-blob"
        style={{ background: "linear-gradient(180deg,#06b6d4,#34d399)" }}
      />
      <div
        className="absolute -right-56 -bottom-40 w-[700px] h-[700px] rounded-full opacity-30 blur-[80px] animate-blob animation-delay-2000"
        style={{ background: "linear-gradient(180deg,#7c3aed,#06b6d4)" }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#052f2f" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0b1220" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g1)" />
      </svg>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.06); }
        }
        .animate-blob { animation: blob 10s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

/* ----------------------------- Avatar Card -------------------------------- */
function AvatarCard({
  avatar,
  selectedImage,
  onImageChange,
  name,
  username,
  score,
  level,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-10 neon-panel p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          whileHover={{ rotateY: 12, scale: 1.04 }}
          className="relative w-44 h-44 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-4 border-white/6"
        >
          <img
            src={selectedImage || avatar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>

        <label className="cursor-pointer mt-1 inline-block">
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold shadow">
            Rasmni o‘zgartirish
          </div>
        </label>

        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight">{name}</h2>
          <p className="text-sm text-white/70">@{username}</p>
        </div>

        <div className="w-full grid grid-cols-2 gap-3 mt-3">
          <div className="bg-white/5 p-3 rounded-xl text-center">
            <div className="text-sm text-white/70">Ball</div>
            <div className="text-xl font-bold">{(score * 2.5).toFixed(0)} / 50</div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl text-center">
            <div className="text-sm text-white/70">To‘g‘ri javoblar</div>
            <div className="text-xl font-bold">{score} / 20</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------ Bio Card ---------------------------------- */
function BioCard({ bio, editing, onEditToggle, onChange, onSave }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="neon-panel p-5 rounded-2xl border border-white/10 shadow-xl"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">👤 Bio</h3>
        {!editing ? (
          <button
            onClick={onEditToggle}
            className="text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            Tahrirlash
          </button>
        ) : null}
      </div>

      {editing ? (
        <>
          <textarea
            value={bio}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className="w-full mt-3 p-3 bg-black/40 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 transition"
          />
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => onEditToggle(false)}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              Bekor qilish
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 transition text-black font-semibold"
            >
              Saqlash
            </button>
          </div>
        </>
      ) : (
        <div className="mt-3 text-white/90 whitespace-pre-wrap">
          {bio || <span className="text-white/60 italic">Bio yozilmagan — tahrirlash uchun bosing.</span>}
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------- Stats Grid ------------------------------- */
function StatsGrid({ score, level }) {
  const percent = clamp((level / 50) * 100, 0, 100);
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
    >
      <div className="neon-panel p-4 rounded-2xl border border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16">
            <CircularProgressbar
              value={percent}
              maxValue={100}
              text={`${level}/50`}
              styles={buildStyles({
                pathColor: "#34d399",
                trailColor: "rgba(255,255,255,0.06)",
                textColor: "#e6faf2",
              })}
            />
          </div>
          <div>
            <div className="text-sm text-white/70">Daraja</div>
            <div className="font-bold text-lg">{level}/50</div>
            <div className="text-xs text-white/60 mt-1">Progress: {Math.round(percent)}%</div>
          </div>
        </div>
      </div>

      <div className="neon-panel p-4 rounded-2xl border border-white/8">
        <div>
          <div className="text-sm text-white/70">To‘g‘ri javoblar</div>
          <div className="text-3xl font-extrabold">{score} <span className="text-base font-normal">/ 20</span></div>
          <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${(score/20)*100}%` }} />
          </div>
        </div>
      </div>

      <div className="neon-panel p-4 rounded-2xl border border-white/8">
        <div>
          <div className="text-sm text-white/70">Umumiy ball</div>
          <div className="text-3xl font-extrabold">{(score*2.5).toFixed(0)} <span className="text-base font-normal">/ 50</span></div>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 bg-white/5 rounded">Tez</span>
            <span className="px-2 py-1 bg-white/5 rounded">Aniq</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------- Activity Feed ------------------------------ */
function ActivityFeed({ items = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="neon-panel p-4 rounded-2xl border border-white/10"
    >
      <h4 className="font-semibold mb-3">So‘nggi faoliyat</h4>
      <ul className="space-y-3">
        {items.length === 0 ? (
          <li className="text-sm text-white/60 italic">Faoliyat yo‘q</li>
        ) : (
          items.map((it, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-sm">{it.icon || "•"}</div>
              <div>
                <div className="text-sm">{it.title}</div>
                <div className="text-xs text-white/60">{it.time}</div>
              </div>
            </li>
          ))
        )}
      </ul>
    </motion.div>
  );
}

/* ------------------------------ Project Card ------------------------------ */
function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="p-4 rounded-2xl bg-white/5 border border-white/8 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/70">{project.type}</div>
          <div className="font-bold">{project.title}</div>
          <div className="text-xs text-white/60 mt-2">{project.desc}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-white/70">{project.progress}%</div>
          <div className="mt-2 w-24 h-3 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------- Tabs Component ----------------------------- */
function Tabs({
  tabs = [],
  active,
  setActive,
}) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActive(t.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            active === t.id ? "bg-emerald-500 text-black shadow" : "bg-white/5 text-white/80"
          }`}
        >
          {t.title}
        </button>
      ))}
    </div>
  );
}

/* --------------------------- Big Export Component ------------------------- */

export default function UzbekLanguageProfile() {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const particles = useRandomArray(80);

  useEffect(() => {
    const su = JSON.parse(localStorage.getItem("level99_user"));
    setUser(su);
    if (su) {
      setSelectedImage(su.avatar || null);
      setBio(localStorage.getItem(`bio_${su.username}`) || "");
    }
  }, []);

  if (!user || !user.answers?.uzbek) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-black to-slate-900">
        <div className="max-w-md w-full text-center p-8 bg-white/5 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-2">Ma'lumot topilmadi</h2>
          <p className="text-sm text-white/70">Profilingizda Ona Tili natijalari mavjud emas.</p>
        </div>
      </div>
    );
  }

  const { name, username, avatar, answers } = user;
  const { score = 0, level = 0 } = answers.uzbek || {};

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...user, avatar: reader.result };
      setUser(updated);
      setSelectedImage(reader.result);
      localStorage.setItem("level99_user", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  const handleBioSave = () => {
    if (!user) return;
    localStorage.setItem(`bio_${user.username}`, bio);
    setEditingBio(false);
  };

  const activity = [
    { icon: "📝", title: "Test topshirildi: Ona Tili", time: "2 soat oldin" },
    { icon: "⭐", title: "Profil yangilandi", time: "3 kun oldin" },
    { icon: "🏆", title: `Daraja yangilandi: ${level}/50`, time: "1 hafta oldin" },
  ];

  const projects = [
    { title: "Imlo Mastery", desc: "Imlo va tinish belgilarini o‘rganish", type: "Kurs", progress: 55 },
    { title: "Adabiyot Qisqasi", desc: "Adabiyot asoslari", type: "Kurs", progress: 80 },
    { title: "So‘z boyligi", desc: "5000 ta so‘zni o‘rganish", type: "Challenge", progress: 22 },
    { title: "Matn tahlili", desc: "Matnlarni tahlil qilish", type: "Project", progress: 12 },
  ];

  const tabs = [
    { id: "overview", title: "Overview" },
    { id: "projects", title: "Projects" },
    { id: "activity", title: "Activity" },
    { id: "settings", title: "Settings" },
  ];

  return (
    <div className="min-h-screen relative text-white">
      <AnimatedGradientBackground />
      <DecorativeParticles count={60} />

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Avatar & basic */}
          <div className="col-span-1 flex flex-col gap-6">
            <AvatarCard
              avatar={avatar}
              selectedImage={selectedImage}
              onImageChange={handleImageChange}
              name={name}
              username={username}
              score={score}
              level={level}
            />

            <BioCard
              bio={bio}
              editing={editingBio}
              onEditToggle={() => setEditingBio((s) => !s)}
              onChange={(v) => setBio(v)}
              onSave={handleBioSave}
            />

            <ActivityFeed items={activity} />
          </div>

          {/* Middle column - main content */}
          <div className="col-span-2 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <Tabs tabs={tabs} active={activeTab} setActive={setActiveTab} />

              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Qidiruv..."
                    className="px-4 py-2 rounded-full bg-white/6 placeholder-white/50 text-white outline-none"
                  />
                  <div className="absolute right-2 top-2 text-white/60">🔎</div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="bg-white/6 text-white px-3 py-2 rounded-lg outline-none"
                  >
                    <option value="all">Hammasi</option>
                    <option value="course">Kurs</option>
                    <option value="project">Project</option>
                    <option value="challenge">Challenge</option>
                  </select>
                </div>
              </div>
            </div>

            <StatsGrid score={score} level={level} />

            <div className="neon-panel p-6 rounded-2xl border border-white/8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Qisqacha ma'lumot</h3>
                <div className="text-sm text-white/60">So‘nggi yangilanish: 2 kun oldin</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  {/* Content area changes with active tab */}
                  <AnimatePresence exitBeforeEnter>
                    {activeTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        <p className="text-white/80">
                          Ushbu bo‘limda siz ona tili bo‘yicha umumiy ma'lumotlarni,
                          yakuniy natijalarni va rivojlanish yo‘nalishlarini ko‘rib chiqishingiz mumkin.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-white/5 p-4 rounded-lg">
                            <div className="text-sm text-white/60">Oxirgi test</div>
                            <div className="font-bold">20 savol — {score} to‘g‘ri</div>
                          </div>
                          <div className="bg-white/5 p-4 rounded-lg">
                            <div className="text-sm text-white/60">Umumiy ball</div>
                            <div className="font-bold">{(score*2.5).toFixed(0)} / 50</div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h4 className="font-semibold mb-2">Top tavsiyalar</h4>
                          <ul className="list-disc ml-5 text-white/80">
                            <li>Imloni takomillashtirish uchun kundalik mashq qiling.</li>
                            <li>Adabiyotdagi matn tahlili bo‘yicha 3 ta darsni yakunlang.</li>
                            <li>So‘z boyligini kengaytirish uchun har hafta 50 so‘z o‘rganing.</li>
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "projects" && (
                      <motion.div
                        key="projects"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        <div className="grid md:grid-cols-2 gap-4">
                          {projects
                            .filter((p) => filter === "all" || p.type.toLowerCase() === filter)
                            .map((p, idx) => (
                              <ProjectCard key={idx} project={p} />
                            ))}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "activity" && (
                      <motion.div
                        key="activity"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                      >
                        <ActivityFeed items={activity} />
                      </motion.div>
                    )}

                    {activeTab === "settings" && (
                      <motion.div
                        key="settings"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-4"
                      >
                        <h4 className="font-semibold">Sozlamalar</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-white/5 p-4 rounded-lg">
                            <div className="text-sm text-white/70">Profil ko‘rinishi</div>
                            <div className="mt-2 flex gap-2">
                              <button className="px-3 py-1 rounded bg-white/6">Jamoatchilik</button>
                              <button className="px-3 py-1 rounded bg-white/6">Shaxsiy</button>
                            </div>
                          </div>
                          <div className="bg-white/5 p-4 rounded-lg">
                            <div className="text-sm text-white/70">Bildirishnomalar</div>
                            <div className="mt-2">
                              <label className="flex items-center gap-3">
                                <input type="checkbox" defaultChecked />
                                <span className="text-sm">Test natijalari</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right column inside main block - small cards */}
                <div className="space-y-3">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="text-sm text-white/70">Keyingi test</div>
                    <div className="font-bold mt-1">Tarix — 10:00, 12 Sep</div>
                    <div className="mt-2 text-xs text-white/60">Sizga moslashgan test tavsiya qilindi.</div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="text-sm text-white/70">Achievements</div>
                    <div className="flex gap-2 flex-wrap mt-2">
                      <span className="px-2 py-1 bg-white/6 rounded">🏅 Level {level}</span>
                      <span className="px-2 py-1 bg-white/6 rounded">🔥 {score} correct</span>
                      <span className="px-2 py-1 bg-white/6 rounded">📘 Ona tili</span>
                    </div>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h5 className="font-semibold">Qisqa statistika</h5>
                    <div className="mt-2 text-sm text-white/70">O‘tgan 30 kun ichida 6 ta test</div>
                  </div>
                </div>
              </div>

              {/* bottom area with small CTA */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-white/60">Sizning taraqqiyotingiz</div>
                  <div className="text-lg font-bold">{(score*2.5).toFixed(0)} / 50</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold">
                    Testni qayta topshirish
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-white/6 hover:bg-white/10">
                    Ulashish
                  </button>
                </div>
              </div>
            </div>

            {/* Search box big */}
            <div className="neon-panel p-6 rounded-2xl border border-white/10 shadow-lg">
              <h4 className="font-semibold mb-3">Qidiruv</h4>
              <Search />
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-white/60 mt-6">
              © 2025 Level99 — Ona tili bo‘limi. Dizayn: Premium UI.
            </div>
          </div>
        </div>
      </div>

      {/* local styles to make neon-panel etc look good even without additional CSS files */}
      <style>{`
        .neon-panel {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          box-shadow: 0 8px 30px rgba(2,6,23,0.6);
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
}
