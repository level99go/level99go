// src/profiles/InformaticsProfile.jsx
import React, { useEffect, useMemo, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/*
  InformaticsProfile.jsx
  - Premium creative profile UI for Informatics (visual only — logic preserved)
  - No external animation libs used (pure CSS + small JS)
  - Confetti implemented via CSS animated elements (no react-confetti dependency)
  - Big, self-contained component with many subcomponents and styles
*/

/* ---------------------------- Utilities ---------------------------- */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const uid = (prefix = "id") => prefix + "_" + Math.random().toString(36).slice(2, 9);

function formatXP(level = 0) {
  // Example: simple XP formula for display only
  return level * 20;
}

/* ------------------------ Decorative Elements ---------------------- */

function AnimatedBackground() {
  // Animated gradient blobs and subtle grid overlay
  return (
    <div aria-hidden className="inf-bg">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="grid-overlay" />
      <style>{`
        .inf-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.6; transform: translate3d(0,0,0); }
        .b1 { width: 700px; height: 700px; left: -200px; top: -180px; background: radial-gradient(circle at 30% 30%, #06b6d4, #0ea5a4); animation: floaty 12s ease-in-out infinite; }
        .b2 { width: 520px; height: 520px; right: -120px; top: -120px; background: radial-gradient(circle at 20% 20%, #7c3aed, #60a5fa); animation: floaty 14s ease-in-out infinite reverse; }
        .b3 { width: 680px; height: 680px; right: -200px; bottom: -200px; background: radial-gradient(circle at 70% 70%, #34d399, #06b6d4); animation: floaty 18s ease-in-out infinite; }
        .grid-overlay { position:absolute; inset:0; background-image: linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px); background-size: 60px 60px, 60px 60px; opacity: 0.08; mix-blend-mode: overlay; pointer-events: none; }
        @keyframes floaty { 0% { transform: translateY(0) scale(1);} 50%{ transform: translateY(-22px) scale(1.03);} 100% { transform: translateY(0) scale(1);} }
      `}</style>
    </div>
  );
}

/* ----------------------------- Confetti ----------------------------- */
/* CSS-confetti (renders many small elements that fall) */
function ConfettiLayer({ active = false }) {
  // generate array of confetti pieces once
  const pieces = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
      arr.push({
        id: uid("c"),
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        dur: 3 + Math.random() * 3,
        size: 6 + Math.random() * 10,
        rotate: Math.random() * 360,
        color: ["#FDE68A", "#FDBA74", "#FB7185", "#A78BFA", "#60A5FA", "#34D399"][
          Math.floor(Math.random() * 6)
        ],
      });
    }
    return arr;
  }, []);

  if (!active) return null;

  return (
    <div className="confetti-layer" aria-hidden>
      {pieces.map((p) => (
        <i
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: `${p.size}px`,
            height: `${p.size * 0.6}px`,
            transform: `rotate(${p.rotate}deg)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
      <style>{`
        .confetti-layer { position: fixed; inset:0; pointer-events:none; z-index:1000; overflow:hidden; }
        .confetti-piece { position: absolute; top:-10vh; border-radius: 3px; opacity: 0.95; transform-origin: center; }
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity:1; }
          70% { opacity:1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity:0; }
        }
        .confetti-piece { animation-name: confetti-fall; animation-timing-function: linear; }
      `}</style>
    </div>
  );
}

/* ----------------------------- Subcomponents ----------------------------- */

/* Avatar with glow and upload */
function AvatarCard({ user, avatarPreview, onUpload }) {
  return (
    <div className="card avatar-card">
      <div className="avatar-wrap">
        <div className="avatar-frame">
          <img src={avatarPreview || user.avatar || placeholderAvatar(user)} alt="avatar" className="avatar-img" />
          <div className="avatar-glow" />
        </div>
        <label className="upload-btn">
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
          Rasmni o'zgartirish
        </label>
      </div>

      <div className="meta">
        <h3 className="name">{user.name || "Foydalanuvchi"}</h3>
        <div className="username">@{user.username || "username"}</div>
      </div>

      <style>{`
        .avatar-card { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border-radius:16px; padding:18px; display:flex; flex-direction:column; align-items:center; gap:12px; border:1px solid rgba(255,255,255,0.06); box-shadow: 0 8px 30px rgba(2,6,23,0.6); }
        .avatar-wrap { display:flex; flex-direction:column; align-items:center; gap:10px; }
        .avatar-frame { width:160px; height:160px; border-radius:22px; overflow:hidden; position:relative; border:4px solid rgba(255,255,255,0.06); box-shadow: 0 18px 50px rgba(3,7,18,0.6); }
        .avatar-img { width:100%; height:100%; object-fit:cover; display:block; }
        .avatar-glow { position:absolute; inset:0; box-shadow: 0 0 40px 8px rgba(56,189,248,0.08) inset; pointer-events:none; }
        .upload-btn { background: linear-gradient(90deg,#06b6d4,#3b82f6); color:#031026; padding:8px 14px; border-radius:999px; font-weight:700; cursor:pointer; box-shadow: 0 6px 18px rgba(59,130,246,0.12); transition: transform 200ms ease; }
        .upload-btn:hover { transform: translateY(-3px); }
        .meta .name { font-size:20px; font-weight:800; color:#e6f9f9; }
        .meta .username { font-size:13px; color:rgba(255,255,255,0.6); }
      `}</style>
    </div>
  );
}

function placeholderAvatar(user = {}) {
  // generate simple data-URI svg placeholder with initials
  const initials = ((user.name || "U").split(" ").map(s => s[0]).slice(0,2).join("") || "U").toUpperCase();
  const bg = "#0ea5a4";
  const fg = "#ffffff";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='54%' font-family='Arial' font-size='140' fill='${fg}' text-anchor='middle' alignment-baseline='middle'>${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* Small stats card with circular progress */
function StatCircle({ label, valueText, percent, colorFrom = "#34d399", colorTo = "#06b6d4" }) {
  return (
    <div className="stat-circle">
      <div className="circle-wrap">
        <CircularProgressbar
          value={clamp(percent, 0, 100)}
          maxValue={100}
          text={valueText}
          styles={buildStyles({
            pathColor: `url(#grad-${valueText.replace(/\s+/g, "")})`,
            textColor: "#e6f9f9",
            trailColor: "rgba(255,255,255,0.04)",
          })}
        />
        {/* gradient def hack: rendered visually via CSS background; pathColor accepts color only, but for consistent look we keep single color */}
      </div>
      <div className="stat-label">{label}</div>
      <style>{`
        .stat-circle { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); padding:12px; border-radius:12px; display:flex; flex-direction:column; align-items:center; gap:8px; border:1px solid rgba(255,255,255,0.04); }
        .circle-wrap { width:84px; height:84px; }
        .stat-label { font-size:13px; color:rgba(255,255,255,0.75); text-align:center; }
      `}</style>
    </div>
  );
}

/* Progress bar (full width) */
function ProgressBar({ percent = 40, label = "Progress" }) {
  const p = clamp(Math.round(percent), 0, 100);
  return (
    <div className="progress-full">
      <div className="label">{label} <span className="val">{p}%</span></div>
      <div className="bar">
        <div className="fill" style={{ width: `${p}%` }} />
      </div>
      <style>{`
        .progress-full .label { font-size:13px; color:rgba(255,255,255,0.75); margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; }
        .progress-full .bar { width:100%; height:10px; background: rgba(255,255,255,0.03); border-radius:999px; overflow:hidden; box-shadow: inset 0 2px 6px rgba(0,0,0,0.6); }
        .progress-full .fill { height:100%; background: linear-gradient(90deg,#06b6d4,#3b82f6); transition: width 800ms cubic-bezier(.2,.9,.2,1); }
        .progress-full .val { font-weight:700; color:white; font-size:13px; }
      `}</style>
    </div>
  );
}

/* Timeline / activity list */
function Timeline({ items = [] }) {
  return (
    <div className="timeline-card">
      <h4 className="t-title">So'nggi natijalar & faoliyat</h4>
      <ul className="t-list">
        {items.map((it, i) => (
          <li key={i}>
            <div className="t-time">{it.time}</div>
            <div className="t-content">{it.text}</div>
          </li>
        ))}
      </ul>
      <style>{`
        .timeline-card { background: linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01)); padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,0.04); }
        .t-title { font-weight:700; margin-bottom:8px; color:#e6f9f9; }
        .t-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
        .t-list li { display:flex; gap:12px; align-items:flex-start; }
        .t-time { min-width:84px; font-size:12px; color:rgba(255,255,255,0.6); }
        .t-content { background: rgba(255,255,255,0.02); padding:8px 10px; border-radius:8px; color:#fff; font-size:14px; }
      `}</style>
    </div>
  );
}

/* Projects grid (cards) */
function ProjectsGrid({ projects = [] }) {
  return (
    <div className="projects-grid">
      <div className="projects-inner">
        {projects.map((p, i) => (
          <div className="proj-card" key={i}>
            <div className="proj-head">
              <div className="proj-type">{p.type}</div>
              <div className="proj-progress">{p.progress}%</div>
            </div>
            <div className="proj-title">{p.title}</div>
            <div className="proj-desc">{p.desc}</div>
            <div className="proj-bar" aria-hidden>
              <div className="proj-fill" style={{ width: `${p.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .projects-grid { display:block; }
        .projects-inner { display:grid; grid-template-columns: repeat(2,1fr); gap:12px; }
        .proj-card { background: rgba(255,255,255,0.02); padding:12px; border-radius:12px; border:1px solid rgba(255,255,255,0.04); box-shadow: 0 6px 18px rgba(2,6,23,0.5); }
        .proj-head { display:flex; justify-content:space-between; align-items:center; font-size:12px; color:rgba(255,255,255,0.7); margin-bottom:8px; }
        .proj-title { font-weight:700; color:#e6f9f9; margin-bottom:6px; }
        .proj-desc { font-size:13px; color:rgba(255,255,255,0.7); margin-bottom:10px; }
        .proj-bar { width:100%; height:8px; background: rgba(255,255,255,0.03); border-radius:999px; overflow:hidden; }
        .proj-fill { height:100%; background: linear-gradient(90deg,#34d399,#06b6d4); }
      `}</style>
    </div>
  );
}

/* Action Buttons row */
function ActionRow({ onRetake, onShare, onSearch }) {
  return (
    <div className="action-row">
      <button className="btn primary" onClick={onRetake}>🔁 Testni qayta topshirish</button>
      <button className="btn ghost" onClick={onShare}>📤 Natijani ulashish</button>
      <button className="btn accent" onClick={onSearch}>🔎 Qidiruv</button>
      <style>{`
        .action-row { display:flex; gap:12px; margin-top:10px; flex-wrap:wrap; }
        .btn { padding:10px 14px; border-radius:10px; font-weight:700; cursor:pointer; border: none; }
        .btn.primary { background: linear-gradient(90deg,#06b6d4,#3b82f6); color:#031026; box-shadow: 0 8px 22px rgba(59,130,246,0.12); }
        .btn.ghost { background: rgba(255,255,255,0.03); color:#e6f9f9; border:1px solid rgba(255,255,255,0.05); }
        .btn.accent { background: linear-gradient(90deg,#34d399,#06b6d4); color:#002018; }
      `}</style>
    </div>
  );
}

/* ----------------------------- Main Export ----------------------------- */

export default function InformaticsProfile() {
  // read user
  const storedUser = JSON.parse(localStorage.getItem("level99_user")) || {};
  const [user, setUser] = useState(storedUser);
  const [avatarPreview, setAvatarPreview] = useState(storedUser.avatar || "");
  const [bio, setBio] = useState(localStorage.getItem(`bio_${storedUser.username}`) || storedUser.bio || "");
  const [activeTab, setActiveTab] = useState("overview");
  const [confettiActive, setConfettiActive] = useState(false);

  // sample projects & activities (visual only)
  const projects = useMemo(() => [
    { title: "Algorithm Challenge", desc: "Daily algorithm tasks", type: "Course", progress: 72 },
    { title: "Data Structures Lab", desc: "Hands-on structures", type: "Project", progress: 46 },
    { title: "System Design Mini", desc: "Design patterns & architecture", type: "Course", progress: 33 },
    { title: "Web Optimizations", desc: "Performance tweaks", type: "Challenge", progress: 88 },
  ], []);

  const activity = useMemo(() => [
    { time: "2h", text: "Informatika testi topshirildi — 16/20" },
    { time: "3d", text: "Profil rasmi yangilandi" },
    { time: "1w", text: "Level oshdi: 36 -> 40" },
  ], []);

  // derived stats
  const scoreCorrect = (user.answers?.informatics?.score) ?? (user.score ?? 12); // fallback
  const scoreCount = Number(scoreCorrect);
  const level = (user.answers?.informatics?.level) ?? (user.level ?? 30);
  const percent = clamp(Math.round((level / 50) * 100), 0, 100);
  const totalScore = (scoreCount * 2.5).toFixed(0);

  useEffect(() => {
    // update confetti trigger when level becomes 50 (perfect)
    if (level >= 50) {
      setConfettiActive(true);
      // stop after some time
      const t = setTimeout(() => setConfettiActive(false), 7000);
      return () => clearTimeout(t);
    }
  }, [level]);

  useEffect(() => {
    // keep local user in sync when user state changes
    // Save avatar+bio into localStorage, but do not mutate other fields unexpectedly
    const updated = { ...user, avatar: avatarPreview || user.avatar, bio: bio || user.bio };
    localStorage.setItem("level99_user", JSON.stringify(updated));
  }, [avatarPreview, bio]); // eslint-disable-line

  // Handlers
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    const updated = { ...user, avatar: url };
    setUser(updated);
    localStorage.setItem("level99_user", JSON.stringify(updated));
  };

  const handleSaveBio = () => {
    if (!user || !user.username) return;
    localStorage.setItem(`bio_${user.username}`, bio);
    const updated = { ...user, bio };
    setUser(updated);
    localStorage.setItem("level99_user", JSON.stringify(updated));
    // little visual feedback via confetti
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 1400);
  };

  const handleRetake = () => {
    // just a visual placeholder: in real app route to test form
    window.location.href = "/informatics"; // preserving routing logic
  };

  const handleShare = () => {
    // simple share fallback
    try {
      navigator.share?.({
        title: `${user.name || "User"} — Informatika natijasi`,
        text: `Men Informatika testida ${scoreCount}/20, level: ${level}/50!`,
      }) || alert("Ulashish (clipboardga nusxalandi).");
    } catch (e) {
      navigator.clipboard?.writeText(`Natija: ${scoreCount}/20 — Level: ${level}/50`);
      alert("Natija clipboardga nusxalandi.");
    }
  };

  const handleSearch = () => {
    window.location.href = "/search";
  };

  /* ---------------------------- Layout return ---------------------------- */
  return (
    <div className="inf-root">
      <AnimatedBackground />
      <ConfettiLayer active={confettiActive} />

      <div className="inf-container">
        <header className="inf-header">
          <div className="title">
            <div className="small-badge">💻 Informatika</div>
            <h1>Profil — Informatika bo'limi</h1>
          </div>

          <div className="header-meta">
            <div className="xp">
              <div className="xp-label">XP</div>
              <div className="xp-value">{formatXP(level)}</div>
            </div>
            <div className="level-pill">Lv. {level}</div>
          </div>
        </header>

        <main className="inf-main">
          <aside className="inf-left">
            <AvatarCard user={user} avatarPreview={avatarPreview} onUpload={handleUpload} />
            <div style={{ height: 12 }} />
            <div className="card">
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 60 }}>
                  <StatCircle label="Level" valueText={`${level}/50`} percent={percent} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>Umumiy progress</div>
                  <ProgressBar percent={percent} label="Umumiy" />
                </div>
              </div>
              <div style={{ height: 10 }} />
              <div className="card-foot">
                <div className="mini">
                  <div className="mini-label">To'g'ri</div>
                  <div className="mini-value">{scoreCount} / 20</div>
                </div>
                <div className="mini">
                  <div className="mini-label">Ball</div>
                  <div className="mini-value">{totalScore} / 50</div>
                </div>
                <div className="mini">
                  <div className="mini-label">XP</div>
                  <div className="mini-value">{formatXP(level)}</div>
                </div>
              </div>
            </div>

            <div style={{ height: 12 }} />

            <div className="card">
              <h4 style={{ marginBottom: 8 }}>Qisqacha bio</h4>
              <textarea className="bio-input" value={bio} onChange={(e) => setBio(e.target.value)} rows={5} placeholder="O'zingiz haqida qisqacha yozing..." />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button className="btn-primary small" onClick={handleSaveBio}>Saqlash</button>
                <button className="btn-ghost small" onClick={() => { setBio(localStorage.getItem(`bio_${user.username}`) || ""); }}>Bekor</button>
              </div>
            </div>

            <div style={{ height: 12 }} />

            <Timeline items={activity} />
          </aside>

          <section className="inf-center">
            <div className="tabs">
              <button className={`tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>Overview</button>
              <button className={`tab ${activeTab === "projects" ? "active" : ""}`} onClick={() => setActiveTab("projects")}>Projects</button>
              <button className={`tab ${activeTab === "activity" ? "active" : ""}`} onClick={() => setActiveTab("activity")}>Activity</button>
              <button className={`tab ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>Settings</button>
            </div>

            <div className="tab-body">
              {activeTab === "overview" && (
                <>
                  <div className="hero-card">
                    <div className="hero-left">
                      <h2>So'nggi test natijasi</h2>
                      <p className="muted">Siz {scoreCount} / 20 savolga to'g'ri javob berdingiz.</p>
                      <div style={{ display: "flex", gap: 10, marginTop: 12, alignItems: "center" }}>
                        <div style={{ width: 92, height: 92 }}>
                          <CircularProgressbar value={clamp((scoreCount/20)*100,0,100)} text={`${scoreCount}/20`} styles={buildStyles({ textColor: "#fff", pathColor: "#06b6d4", trailColor: "rgba(255,255,255,0.06)" })} />
                        </div>
                        <div>
                          <h3 style={{ margin: 0 }}>Daraja: <span style={{ color: "#34d399" }}>{level}/50</span></h3>
                          <p className="muted" style={{ marginTop: 6 }}>Sizning umumiy ball: <strong>{totalScore}/50</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="hero-right">
                      <div className="quick-stats">
                        <div className="qs">
                          <div className="qv">{Math.round((scoreCount/20)*100)}%</div>
                          <div className="ql">Success rate</div>
                        </div>
                        <div className="qs">
                          <div className="qv">{formatXP(level)}</div>
                          <div className="ql">XP</div>
                        </div>
                        <div className="qs">
                          <div className="qv">{percent}%</div>
                          <div className="ql">Progress</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: 12 }} />

                  <div className="card">
                    <h4>Top Tavsiyalar</h4>
                    <ul className="tips">
                      <li>Imloni takomillashtirish uchun kundalik mashq qiling.</li>
                      <li>Algoritmlar bo‘yicha 3 ta darsni yakunlang.</li>
                      <li>So‘z boyligini kengaytirish uchun har hafta 50 ta yangi termin o‘rganing.</li>
                    </ul>
                  </div>
                </>
              )}

              {activeTab === "projects" && (
                <>
                  <div className="card">
                    <h4>Loyihalar</h4>
                    <ProjectsGrid projects={projects} />
                  </div>
                </>
              )}

              {activeTab === "activity" && (
                <>
                  <div className="card">
                    <h4>Faoliyat tarixi</h4>
                    <Timeline items={activity} />
                  </div>
                </>
              )}

              {activeTab === "settings" && (
                <>
                  <div className="card">
                    <h4>Sozlamalar</h4>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <button className="btn-ghost">Profilni jamoatchilik/shalsh </button>
                      <button className="btn-ghost">Bildirishnomalar</button>
                      <button className="btn-ghost">Ma'lumotlarni saqlash</button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div style={{ height: 10 }} />

            <ActionRow onRetake={handleRetake} onShare={handleShare} onSearch={handleSearch} />
          </section>

          <aside className="inf-right">
            <div className="card">
              <h4>Achievements</h4>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                <div className="badge">🏅 Level {level}</div>
                <div className="badge">🔥 {scoreCount} correct</div>
                <div className="badge">💡 Fast & Accurate</div>
              </div>
            </div>

            <div style={{ height: 12 }} />

            <div className="card">
              <h4>Recommended</h4>
              <div style={{ display: "grid", gap: 8 }}>
                <div className="rec">Algorithm Practice — 5 lessons</div>
                <div className="rec">System Design — Starter pack</div>
                <div className="rec">Web Performance — Tips</div>
              </div>
            </div>

            <div style={{ height: 12 }} />

            <div className="card small">
              <h4>Qisqa statistika</h4>
              <div className="muted">Oxirgi 30 kun: 6 test</div>
            </div>
          </aside>
        </main>

        <footer className="inf-footer">
          <div>© 2025 Level99 — Informatika bo‘limi</div>
        </footer>
      </div>

      {/* Component-level styles */}
      <style>{`
        :root { --card-bg: rgba(255,255,255,0.03); --glass: rgba(255,255,255,0.02); }
        .inf-root { position: relative; min-height: 100vh; color: #e6f9f9; font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; background: linear-gradient(180deg,#020617 0%, #081022 60%); overflow-x:hidden; }
        .inf-container { position: relative; z-index:10; max-width:1200px; margin:0 auto; padding:36px 20px; }
        .inf-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; gap:12px; }
        .inf-header .title .small-badge { font-weight:700; background:linear-gradient(90deg,#06b6d4,#3b82f6); color:#021028; padding:6px 10px; border-radius:999px; display:inline-block; margin-bottom:6px; box-shadow: 0 6px 18px rgba(59,130,246,0.08); }
        .inf-header h1 { margin:0; font-size:20px; font-weight:800; letter-spacing:-0.01em; color:#e6f9f9; }
        .header-meta { display:flex; gap:12px; align-items:center; }
        .xp { background: rgba(255,255,255,0.02); padding:8px 12px; border-radius:10px; text-align:center; }
        .xp-label { font-size:12px; color:rgba(255,255,255,0.65); }
        .xp-value { font-weight:800; color:#e6f9f9; }
        .level-pill { background:linear-gradient(90deg,#34d399,#06b6d4); color:#002018; padding:8px 12px; border-radius:999px; font-weight:700; }

        .inf-main { display:grid; grid-template-columns: 320px 1fr 280px; gap:18px; align-items:start; }
        .inf-left, .inf-right { display:flex; flex-direction:column; gap:12px; }
        .inf-center { display:flex; flex-direction:column; gap:12px; }

        .card { background: var(--card-bg); padding:14px; border-radius:12px; border:1px solid rgba(255,255,255,0.04); box-shadow:0 10px 30px rgba(2,6,23,0.6); }
        .card.small { padding:10px; }
        .bio-input { width:100%; background: rgba(0,0,0,0.45); border:1px solid rgba(255,255,255,0.04); color:#fff; border-radius:8px; padding:10px; min-height:80px; }
        .card-foot { display:flex; gap:10px; margin-top:12px; justify-content:space-between; }
        .mini { text-align:center; }
        .mini-label { font-size:12px; color:rgba(255,255,255,0.6); }
        .mini-value { font-weight:800; color:#e6f9f9; }

        .tabs { display:flex; gap:8px; align-items:center; margin-bottom:8px; }
        .tab { background:transparent; border:1px solid rgba(255,255,255,0.03); padding:8px 14px; border-radius:999px; color:rgba(255,255,255,0.8); cursor:pointer; }
        .tab.active { background:linear-gradient(90deg,#06b6d4,#3b82f6); color:#021028; box-shadow: 0 8px 22px rgba(3,7,18,0.6); }

        .hero-card { background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border-radius:12px; padding:14px; display:flex; gap:16px; align-items:center; justify-content:space-between; border:1px solid rgba(255,255,255,0.04); }
        .hero-left { flex:1; }
        .hero-right { width:260px; display:flex; justify-content:flex-end; align-items:center; }
        .muted { color: rgba(255,255,255,0.7); font-size:13px; }

        .quick-stats { display:flex; gap:10px; background: rgba(255,255,255,0.02); padding:8px; border-radius:8px; }
        .qs { text-align:center; padding:8px 12px; }
        .qv { font-weight:800; font-size:18px; color:#fff; }
        .ql { font-size:12px; color:rgba(255,255,255,0.65); }

        .tips { margin:0; padding-left:18px; color: rgba(255,255,255,0.9); }
        .badge { display:inline-block; padding:8px 10px; border-radius:999px; background: rgba(255,255,255,0.03); color:#fff; font-weight:700; }

        .rec { padding:8px; background: rgba(255,255,255,0.02); border-radius:8px; color:#fff; }

        .action-row { margin-top:18px; display:flex; gap:12px; }
        .btn-primary { background: linear-gradient(90deg,#06b6d4,#3b82f6); color:#021028; padding:10px 14px; border-radius:10px; font-weight:800; border:none; cursor:pointer; }
        .btn-ghost { background: rgba(255,255,255,0.03); color:#fff; padding:10px 14px; border-radius:10px; }
        .btn-primary.small, .btn-ghost.small { padding:8px 10px; font-size:13px; border-radius:8px; }

        .inf-footer { margin-top:20px; text-align:center; color:rgba(255,255,255,0.5); font-size:13px; }

        /* responsive */
        @media (max-width: 1024px) {
          .inf-main { grid-template-columns: 1fr; }
          .inf-left, .inf-right { order: 2; }
          .inf-center { order: 1; }
        }
      `}</style>
    </div>
  );
}
