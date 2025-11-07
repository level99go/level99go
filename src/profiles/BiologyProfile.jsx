// src/profiles/BiologyProfile.jsx
import React, { useEffect, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";

/* -------------------- Helpers -------------------- */
const generateParticles = (count, width, height) =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 2 + Math.random() * 6,
    speedX: 0.02 + Math.random() * 0.15,
    speedY: 0.02 + Math.random() * 0.15,
    color: Math.random() > 0.5 ? "rgba(72,187,120,0.4)" : "rgba(0,255,170,0.3)"
  }));

const generateSparkles = (count, width, height) =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 1 + Math.random() * 3,
    opacity: 0.1 + Math.random() * 0.5
  }));

const Particle = ({ p }) => (
  <div
    className="absolute rounded-full blur-sm"
    style={{
      width: `${p.size}px`,
      height: `${p.size}px`,
      left: p.x,
      top: p.y,
      backgroundColor: p.color,
      opacity: 0.3
    }}
  />
);

const Sparkle = ({ s }) => (
  <div
    className="absolute rounded-full bg-white animate-pulse"
    style={{
      width: `${s.size}px`,
      height: `${s.size}px`,
      left: s.x,
      top: s.y,
      opacity: s.opacity
    }}
  />
);

/* -------------------- Child Components -------------------- */
const AvatarBox = ({ avatar, selectedImage, handleUpload }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col items-center gap-4"
  >
    <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-green-400 shadow-[0_0_45px_rgba(0,255,160,0.8)] hover:shadow-[0_0_65px_rgba(0,255,160,1)] transition-shadow duration-500 transform hover:rotate-3 hover:scale-105">
      <img
        src={selectedImage || avatar}
        alt="Avatar"
        className="w-full h-full object-cover"
      />
    </div>
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      className="text-sm text-gray-200 file:bg-green-500 hover:file:bg-green-600 file:text-white file:py-1 file:px-3 file:rounded-full cursor-pointer"
    />
  </motion.div>
);

const BioSection = ({ bio, editingBio, setEditingBio, setBio, saveBio }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mt-6 bg-gradient-to-r from-green-900/70 to-green-800/70 p-5 rounded-2xl border border-green-500 shadow-lg"
  >
    <h3 className="text-lg font-semibold mb-2 text-green-200 flex items-center gap-2">👤 Bio (Izoh)</h3>
    {editingBio ? (
      <>
        <textarea
          className="w-full p-3 rounded-xl bg-black/50 text-white resize-none border-2 border-green-500 focus:border-green-400 outline-none transition placeholder-green-400"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="O'zingiz haqida qisqacha yozing..."
        />
        <div className="mt-3 flex justify-end gap-3">
          <button
            onClick={() => setEditingBio(false)}
            className="px-5 py-2 bg-gray-700 rounded-xl hover:bg-gray-600 shadow-md transition"
          >
            Bekor qilish
          </button>
          <button
            onClick={saveBio}
            className="px-5 py-2 bg-green-600 rounded-xl hover:bg-green-500 shadow-md transition"
          >
            Saqlash
          </button>
        </div>
      </>
    ) : (
      <div
        className="whitespace-pre-wrap cursor-pointer hover:text-green-400 transition text-gray-200"
        onClick={() => setEditingBio(true)}
        title="Bio ni tahrirlash uchun bosing"
      >
        {bio || <span className="italic text-gray-500">Bio yozilmagan. Tahrirlash uchun bosing.</span>}
      </div>
    )}
  </motion.div>
);

/* -------------------- Main Component -------------------- */
export default function BiologyProfile() {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [particles, setParticles] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [levelProgress, setLevelProgress] = useState(0);
  const [score, setScore] = useState(0);

  const containerRef = useRef();

  const sendToActiveUsers = (payload) => {
    fetch("http://localhost:5000/api/active-users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch((err) => console.error("ActiveUsers POST failed:", err));
  };

  // 🔹 Load user and send to ActiveUsers
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("level99_user"));
    if (savedUser) {
      setUser(savedUser);
      setBio(localStorage.getItem(`bio_${savedUser.username}`) || "");
      const { answers } = savedUser;
      if (answers?.biology) {
        setLevelProgress(answers.biology.level);
        setScore(answers.biology.score);
      }
      if (savedUser.avatar) setSelectedImage(savedUser.avatar);

      const payload = {
        id: savedUser.id,
        name: savedUser.name,
        username: savedUser.username,
        avatar: savedUser.avatar,
        bio: localStorage.getItem(`bio_${savedUser.username}`) || "",
        career: savedUser.career,
        level: answers?.biology?.level || 0,
        score: answers?.biology?.score || 0
      };
      sendToActiveUsers(payload);
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    setParticles(generateParticles(100, width, height));
    setSparkles(generateSparkles(80, width, height));
  }, []);

  // 🔹 Handle avatar upload and update ActiveUsers
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      if (user) {
        const payload = {
          id: user.id,
          avatar: imageURL
        };
        sendToActiveUsers(payload);
      }
    }
  };

  // 🔹 Save bio and update ActiveUsers
  const saveBioHandler = () => {
    if (user) {
      localStorage.setItem(`bio_${user.username}`, bio);
      setEditingBio(false);
      const payload = {
        id: user.id,
        bio
      };
      sendToActiveUsers(payload);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden text-white bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Particles */}
      {particles.map((p, idx) => <Particle key={idx} p={p} />)}
      {sparkles.map((s, idx) => <Sparkle key={idx} s={s} />)}

      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto bg-[#101820]/90 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-8"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-300 animate-pulse">🧬 Biologiya Profili</h1>

        <AvatarBox avatar={user?.avatar} selectedImage={selectedImage} handleUpload={handleImageUpload} />

        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">{user?.name}</h2>
          <p className="text-sm md:text-base text-gray-300">@{user?.username}</p>
        </div>

        <BioSection
          bio={bio}
          editingBio={editingBio}
          setEditingBio={setEditingBio}
          setBio={setBio}
          saveBio={saveBioHandler}
        />

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-[#004d40] to-[#1b5e20] rounded-2xl p-6 text-center border border-green-500 shadow-lg flex flex-col items-center transition transform"
        >
          <p className="text-lg font-semibold mb-2 text-green-200">Test natijalari</p>
          <div className="w-28 h-28">
            <CircularProgressbar
              value={levelProgress}
              maxValue={50}
              text={`${levelProgress}/50`}
              styles={buildStyles({
                pathColor: "#00ffae",
                textColor: "#ffffff",
                trailColor: "#1e293b",
              })}
            />
          </div>
          <p className="mt-3 text-green-300 text-xl font-bold">✅ {score} / 20</p>
        </motion.div>

        <div className="mt-10 text-center text-gray-400 text-sm">
          © 2025 Level99 Platforma. Barcha huquqlar himoyalangan.
        </div>
      </motion.div>
    </div>
  );
}
