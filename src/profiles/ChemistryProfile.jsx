// src/pages/ChemistryProfile.jsx
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { Camera, Edit3, Share2, Save, Star } from "lucide-react";

export default function ChemistryProfile() {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("level99_user"));
    setUser(savedUser);

    if (savedUser) {
      const savedBio = localStorage.getItem(`bio_${savedUser.username}`) || "";
      setBio(savedBio);
    }
  }, []);

  if (!user || !user.answers?.chemistry) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black p-6">
        <div className="max-w-lg w-full bg-gradient-to-br from-gray-900/80 to-black/60 border border-white/6 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold mb-4">❌ Kimyo bo‘yicha ma’lumot topilmadi</h2>
          <p className="text-sm text-gray-300">
            Iltimos, avval kimyo testini yeching yoki profil sozlamalarini tekshiring.
          </p>
        </div>
      </div>
    );
  }

  const { name, username, avatar, answers } = user;
  const { score, level } = answers.chemistry;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      // faqat UI uchun saqlayapmiz, asl backup localStorage da qoladi
      const imageURL = reader.result;
      setSelectedImage(imageURL);

      // localStorage user avatarni yangilash (saqlash mexanizmini o'zgartirmadim)
      const updatedUser = { ...user, avatar: imageURL };
      setUser(updatedUser);
      localStorage.setItem("level99_user", JSON.stringify(updatedUser));

      setTimeout(() => setUploading(false), 600);
    };
    reader.readAsDataURL(file);
  };

  const saveBio = () => {
    localStorage.setItem(`bio_${username}`, bio);
    setEditingBio(false);
  };

  // Display-friendly metrics
  const pct = Math.min(Math.round((level / 50) * 100), 100);
  const grade =
    level >= 45 ? "A+" : level >= 35 ? "A" : level >= 20 ? "B" : "C";

  return (
    <div
      className="min-h-screen text-white p-6 relative overflow-hidden"
      style={{
        background: "radial-gradient(1200px 600px at 10% 10%, rgba(34,211,238,0.06), transparent), linear-gradient(180deg,#04070a 0%, #0f1220 100%)",
      }}
    >
      {/* Decorative shapes */}
      <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-gradient-to-tr from-purple-700/20 to-pink-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-yellow-400/10 to-indigo-500/8 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
              <Star className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">🧪 Kimyo Profili</h1>
              <p className="text-sm text-gray-300">Profilingiz va test natijalaringiz</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              title="Profilni bo'lishish"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/6 hover:bg-white/8 transition"
            >
              <Share2 size={16} /> <span className="text-sm">Share</span>
            </button>

            <button
              title="Saqlash"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 hover:opacity-95 transition"
            >
              <Save size={16} /> <span className="text-sm font-semibold">Saqlash</span>
            </button>
          </div>
        </div>

        {/* Main card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: avatar + bio */}
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 bg-gradient-to-br from-white/4 to-white/2/0 border border-white/6 rounded-3xl p-6 shadow-2xl backdrop-blur"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="rounded-3xl w-40 h-40 bg-gradient-to-br from-cyan-400 to-indigo-600 p-1 shadow-xl">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-[#0b0b0b] border-2 border-white/8">
                    <img
                      src={selectedImage || avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-2 right-0 bg-white/10 hover:bg-white/12 text-white px-3 py-2 rounded-full flex items-center gap-2 cursor-pointer border border-white/8"
                  title="Avatarni yuklash"
                >
                  {uploading ? "Yuklanmoqda..." : <Camera size={16} />}
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <h2 className="mt-4 text-xl font-bold">{name}</h2>
              <p className="text-sm text-gray-300">@{username}</p>

              <div className="mt-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 text-sm font-semibold">
                  Level {level} / 50
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-400/10 text-sky-300 text-sm font-semibold">
                  Grade {grade}
                </span>
              </div>

              <div className="mt-6 w-full">
                <div className="text-sm text-gray-300 mb-2">🔎 Test tasviri</div>
                <div className="w-full bg-white/6 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-400 text-right">{pct}%</div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center gap-3 justify-center py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.01] transition">
                <Edit3 size={16} /> <span className="text-sm font-semibold">Profilni tahrirlash</span>
              </button>
              <button
                onClick={() => navigator.share?.({ title: `${name} kimyo profili`, text: `Level: ${level}/50`, url: window.location.href })}
                className="w-full flex items-center gap-3 justify-center py-2 rounded-xl border border-white/6 bg-white/3 hover:bg-white/4 transition"
                title="Share"
              >
                <Share2 size={16} /> <span className="text-sm">Havolani nusxalash</span>
              </button>
            </div>
          </motion.div>

          {/* Middle column: big card with stats */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 bg-gradient-to-br from-[#071025]/60 to-[#08202d]/40 border border-white/6 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-48">
                <CircularProgressbar
                  value={level}
                  maxValue={50}
                  text={`${level}/50`}
                  styles={buildStyles({
                    pathColor: `rgba(34,211,238, ${Math.max(0.2, level / 50)})`,
                    textColor: "#e6f7ff",
                    trailColor: "#0f1724",
                    backgroundColor: "#081126",
                    textSize: "16px",
                  })}
                />
              </div>

              <div className="text-center mt-3">
                <div className="text-sm text-gray-300">🧪 Kimyo test natijasi</div>
                <h3 className="text-2xl font-bold mt-1">{score} / 20</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Bu ball sizning kimyo bilimlaringizni baholaydi. Agar siz yuqori natija ko'rsatsangiz,
                  profilga yutuqlar va tavsif qo'shiladi.
                </p>
              </div>

              {/* mini stats */}
              <div className="mt-6 grid grid-cols-3 gap-3 w-full">
                <div className="bg-white/5 p-3 rounded-2xl text-center">
                  <div className="text-sm text-gray-300">Accuracy</div>
                  <div className="font-semibold text-white"> {Math.round((score / 20) * 100)}%</div>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl text-center">
                  <div className="text-sm text-gray-300">Fast answers</div>
                  <div className="font-semibold text-white"> {Math.min(20, Math.round(level / 2))}</div>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl text-center">
                  <div className="text-sm text-gray-300">Consistency</div>
                  <div className="font-semibold text-white"> {grade}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column: bio + related blocks */}
          <motion.div
            initial={{ scale: 0.99 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 bg-gradient-to-br from-white/3 to-white/6 border border-white/6 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">👤 Bio</h3>
              <div className="text-sm text-gray-400">{editingBio ? "Tahrirlash rejimi" : "O'qish rejimi"}</div>
            </div>

            <div className="bg-black/30 border border-white/6 rounded-xl p-4 min-h-[120px]">
              {editingBio ? (
                <>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full min-h-[90px] p-3 bg-transparent resize-none outline-none text-white placeholder-gray-400"
                    placeholder="O'zingiz haqida qisqacha yozing..."
                  />
                  <div className="mt-3 flex gap-2 justify-end">
                    <button onClick={() => setEditingBio(false)} className="px-3 py-1 rounded-md bg-white/5 hover:bg-white/6">
                      Bekor qilish
                    </button>
                    <button onClick={saveBio} className="px-3 py-1 rounded-md bg-cyan-500 hover:bg-cyan-400">
                      Saqlash
                    </button>
                  </div>
                </>
              ) : (
                <div className="whitespace-pre-wrap text-gray-200">
                  {bio || <span className="text-gray-400 italic">Bio yozilmagan — tahrirlash uchun "Profilni tahrirlash" tugmasini bosing.</span>}
                </div>
              )}
            </div>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => setEditingBio((s) => !s)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 transition"
              >
                <Edit3 size={16} /> <span className="font-semibold">Bio ni tahrirlash</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-3 rounded-xl text-center">
                  <div className="text-sm text-gray-300">Followers</div>
                  <div className="font-bold text-white">—</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl text-center">
                  <div className="text-sm text-gray-300">Certificates</div>
                  <div className="font-bold text-white">—</div>
                </div>
              </div>

              <div className="mt-2 text-xs text-gray-400">
                Profilni reklama yoki ish imkoniyatlarida ishlatish uchun sahifani yangilang va tugmalar orqali baham ko'ring.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer: related content */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-8 bg-gradient-to-br from-white/2 to-white/4 border border-white/6 rounded-2xl p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold">🔬 Qo'shimcha resurslar</h4>
              <p className="text-sm text-gray-300">Mashqlar, darsliklar va laboratoriya ishlariga havolalar tez orada qoʻshiladi.</p>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8">🔗 Kurslar</button>
              <button className="px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8">📚 Kitoblar</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
