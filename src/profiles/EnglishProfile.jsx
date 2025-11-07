// src/profiles/EnglishLanguageProfile.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Search from "../pages/Search";

/* ----------------------------- Utils ----------------------------- */
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

/* ----------------------------- Decorative ----------------------------- */
function DecorativeParticles({ count = 60 }) {
  const parts = useRandomArray(count);
  return (
    <>
      {parts.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 0 }}
          animate={{ y: [0, -12, 0], opacity: [0.1, p.o, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            borderRadius: 9999,
            background: Math.random() > 0.5 ? "rgba(59,130,246,0.7)" : "rgba(236,72,153,0.6)",
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
        style={{ background: "linear-gradient(180deg,#3b82f6,#6366f1)" }}
      />
      <div
        className="absolute -right-56 -bottom-40 w-[700px] h-[700px] rounded-full opacity-30 blur-[80px] animate-blob animation-delay-2000"
        style={{ background: "linear-gradient(180deg,#ec4899,#3b82f6)" }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g1)" />
      </svg>
      <style>{`
        @keyframes blob { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-20px) scale(1.06);} }
        .animate-blob{animation:blob 10s ease-in-out infinite;}
        .animation-delay-2000{animation-delay:2s;}
      `}</style>
    </div>
  );
}

/* ----------------------------- Cards ----------------------------- */
function AvatarCard({ avatar, selectedImage, onImageChange, name, username, score, level }) {
  return (
    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
      className="relative z-10 neon-panel p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
      <div className="flex flex-col items-center gap-4">
        <motion.div whileHover={{ rotateY: 12, scale: 1.04 }}
          className="relative w-44 h-44 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-4 border-white/6">
          <img src={selectedImage || avatar} alt="avatar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
        <label className="cursor-pointer mt-1 inline-block">
          <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 text-black font-semibold shadow">
            Change Avatar
          </div>
        </label>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight">{name}</h2>
          <p className="text-sm text-white/70">@{username}</p>
        </div>
        <div className="w-full grid grid-cols-2 gap-3 mt-3">
          <div className="bg-white/5 p-3 rounded-xl text-center">
            <div className="text-sm text-white/70">Score</div>
            <div className="text-xl font-bold">{(score * 2.5).toFixed(0)} / 50</div>
          </div>
          <div className="bg-white/5 p-3 rounded-xl text-center">
            <div className="text-sm text-white/70">Correct</div>
            <div className="text-xl font-bold">{score} / 20</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BioCard({ bio, editing, onEditToggle, onChange, onSave }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="neon-panel p-5 rounded-2xl border border-white/10 shadow-xl">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold">👤 Bio</h3>
        {!editing && (
          <button onClick={onEditToggle} className="text-sm px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition">
            Edit
          </button>
        )}
      </div>
      {editing ? (
        <>
          <textarea value={bio} onChange={(e) => onChange(e.target.value)} rows={4}
            className="w-full mt-3 p-3 bg-black/40 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition" />
          <div className="mt-3 flex justify-end gap-2">
            <button onClick={() => onEditToggle(false)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
              Cancel
            </button>
            <button onClick={onSave} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition text-black font-semibold">
              Save
            </button>
          </div>
        </>
      ) : (
        <div className="mt-3 text-white/90 whitespace-pre-wrap">
          {bio || <span className="text-white/60 italic">No bio yet — click edit to add.</span>}
        </div>
      )}
    </motion.div>
  );
}

function StatsGrid({ score, level }) {
  const percent = clamp((level / 50) * 100, 0, 100);
  return (
    <motion.div initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="neon-panel p-4 rounded-2xl border border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16">
            <CircularProgressbar value={percent} maxValue={100} text={`${level}/50`}
              styles={buildStyles({ pathColor: "#3b82f6", trailColor: "rgba(255,255,255,0.06)", textColor: "#dbeafe" })} />
          </div>
          <div>
            <div className="text-sm text-white/70">Level</div>
            <div className="font-bold text-lg">{level}/50</div>
            <div className="text-xs text-white/60 mt-1">Progress: {Math.round(percent)}%</div>
          </div>
        </div>
      </div>
      <div className="neon-panel p-4 rounded-2xl border border-white/8">
        <div>
          <div className="text-sm text-white/70">Correct Answers</div>
          <div className="text-3xl font-extrabold">{score} <span className="text-base font-normal">/ 20</span></div>
          <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-400" style={{ width: `${(score/20)*100}%` }} />
          </div>
        </div>
      </div>
      <div className="neon-panel p-4 rounded-2xl border border-white/8">
        <div>
          <div className="text-sm text-white/70">Total Score</div>
          <div className="text-3xl font-extrabold">{(score*2.5).toFixed(0)} <span className="text-base font-normal">/ 50</span></div>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 bg-white/5 rounded">Fast</span>
            <span className="px-2 py-1 bg-white/5 rounded">Accurate</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ActivityFeed({ items = [] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="neon-panel p-4 rounded-2xl border border-white/10">
      <h4 className="font-semibold mb-3">Recent Activity</h4>
      <ul className="space-y-3">
        {items.length === 0 ? (
          <li className="text-sm text-white/60 italic">No activity</li>
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

function ProjectCard({ project }) {
  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} className="p-4 rounded-2xl bg-white/5 border border-white/8 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/70">{project.type}</div>
          <div className="font-bold">{project.title}</div>
          <div className="text-xs text-white/60 mt-2">{project.desc}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-white/70">{project.progress}%</div>
          <div className="mt-2 w-24 h-3 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-400" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Tabs({ tabs = [], active, setActive }) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      {tabs.map((t) => (
        <button key={t.id} onClick={() => setActive(t.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${active===t.id?"bg-blue-500 text-black shadow":"bg-white/5 text-white/80"}`}>
          {t.title}
        </button>
      ))}
    </div>
  );
}

/* ----------------------------- Main Export ----------------------------- */
export default function EnglishLanguageProfile() {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const su = JSON.parse(localStorage.getItem("level99_user"));
    setUser(su);
    if (su) {
      setSelectedImage(su.avatar || null);
      setBio(localStorage.getItem(`bio_${su.username}`) || "");
    }
  }, []);

  if (!user || !user.answers?.english) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-black to-slate-900">
        <div className="max-w-md w-full text-center p-8 bg-white/5 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-2">No Data</h2>
          <p className="text-sm text-white/70">English profile results not found.</p>
        </div>
      </div>
    );
  }

  const { name, username, avatar, answers } = user;
  const { score = 0, level = 0 } = answers.english || {};

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
    { icon: "📝", title: "English test completed", time: "2 hours ago" },
    { icon: "⭐", title: "Profile updated", time: "3 days ago" },
    { icon: "🏆", title: `Level up: ${level}/50`, time: "1 week ago" },
  ];

  const projects = [
    { title: "Grammar Mastery", desc: "Tenses and structures", type: "Course", progress: 60 },
    { title: "Vocabulary Booster", desc: "Learn 2000 new words", type: "Challenge", progress: 35 },
    { title: "Speaking Practice", desc: "Daily speaking sessions", type: "Project", progress: 50 },
    { title: "Reading Club", desc: "Read and analyze texts", type: "Course", progress: 75 },
  ];

 
  return (
    <div className="relative min-h-screen text-white">
      {/* Gradient background va particles */}
      <AnimatedGradientBackground />
      <DecorativeParticles count={60} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Header qismi */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 max-w-sm">
            <AvatarCard
              avatar={avatar}
              selectedImage={selectedImage}
              onImageChange={handleImageChange}
              name={name}
              username={username}
              score={score}
              level={level}
            />
          </div>
          <div className="flex-[2] space-y-4">
            <BioCard
              bio={bio}
              editing={editingBio}
              onEditToggle={setEditingBio}
              onChange={setBio}
              onSave={handleBioSave}
            />
            <StatsGrid score={score} level={level} />
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { id: "overview", title: "Overview" },
            { id: "activity", title: "Activity" },
            { id: "projects", title: "Projects" },
            { id: "search", title: "Search" },
          ]}
          active={activeTab}
          setActive={setActiveTab}
        />

        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6 mt-6"
            >
              <ActivityFeed items={activity} />
              <div className="neon-panel p-4 rounded-2xl border border-white/10">
                <h4 className="font-semibold mb-3">Achievements</h4>
                <ul className="space-y-2 text-sm">
                  <li>🏆 Finished first English test</li>
                  <li>⭐ Reached level {level}/50</li>
                  <li>📖 Grammar Mastery ongoing</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === "activity" && (
            <motion.div
              key="activity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <ActivityFeed items={activity} />
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 gap-5 mt-6"
            >
              {projects.map((p, i) => (
                <ProjectCard key={i} project={p} />
              ))}
            </motion.div>
          )}

          {activeTab === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6"
            >
              <Search />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
