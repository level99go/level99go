import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import Confetti from "react-confetti"; // ✅ Confetti kutubxonasi
import Search from "../pages/Search";

export default function GeographyProfile() {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("level99_user"));
    setUser(savedUser);

    if (savedUser) {
      const savedBio = localStorage.getItem(`bio_${savedUser.username}`) || "";
      setBio(savedBio);

      // Confetti sharti: level >= 40 bo‘lsa
      const level = savedUser.answers?.geography?.level || 0;
      if (level >= 40) setShowConfetti(true);
    }
  }, []);

  if (!user || !user.answers?.geography) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>❌ Geografiya bo‘yicha ma’lumot topilmadi.</p>
      </div>
    );
  }

  const { name, username, avatar, answers } = user;
  const { score, level } = answers.geography;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  const saveBio = () => {
    localStorage.setItem(`bio_${username}`, bio);
    setEditingBio(false);
  };

  // Achievement badges
  const badges = [
    { name: "Novice Explorer", levelReq: 10, color: "bg-gray-400" },
    { name: "Skilled Navigator", levelReq: 25, color: "bg-yellow-500" },
    { name: "Master Geographer", levelReq: 40, color: "bg-green-500" },
    { name: "Legendary Explorer", levelReq: 50, color: "bg-blue-500" },
  ];

  return (
    <div
      className="min-h-screen text-white p-6 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto bg-[#101820]/80 border border-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6"
      >
        {/* Title */}
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold text-center text-yellow-300 animate-pulse"
        >
          🗺️ Geografiya Profili
        </motion.h1>

        {/* Avatar + Name */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="w-40 h-40 rounded-xl overflow-hidden border-4 border-yellow-400 shadow-lg"
          >
            <img
              src={selectedImage || avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-gray-200 file:bg-yellow-500 hover:file:bg-yellow-600 file:text-white file:py-1 file:px-3 file:rounded-full"
          />

          <div className="text-center">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-sm text-gray-300">@{username}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 bg-gray-900 bg-opacity-80 p-4 rounded-lg border border-yellow-600">
          <h3 className="text-lg font-semibold mb-2 text-yellow-300">👤 Bio</h3>
          {editingBio ? (
            <>
              <textarea
                className="w-full p-2 rounded-md bg-gray-800 text-white resize-none"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="O'zingiz haqida qisqacha yozing..."
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  onClick={() => setEditingBio(false)}
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={saveBio}
                  className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500"
                >
                  Saqlash
                </button>
              </div>
            </>
          ) : (
            <div
              className="whitespace-pre-wrap cursor-pointer"
              onClick={() => setEditingBio(true)}
              title="Bio ni tahrirlash uchun bosing"
            >
              {bio || (
                <span className="text-gray-500 italic">
                  Bio yozilmagan. Tahrirlash uchun bosing.
                </span>
              )}
            </div>
          )}
        </div>

        {/* Level / Score */}
        <div className="bg-gradient-to-br from-yellow-800 to-yellow-600 rounded-xl p-6 text-center border border-yellow-500 shadow-inner flex flex-col items-center space-y-3">
          <p className="text-lg font-semibold mb-2 text-yellow-200">Test natijalari</p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-28 h-28"
          >
            <CircularProgressbar
              value={level}
              maxValue={50}
              text={`${level}/50`}
              styles={buildStyles({
                pathColor: "#facc15",
                textColor: "#ffffff",
                trailColor: "#1e293b",
                pathTransitionDuration: 0.8,
              })}
            />
          </motion.div>
          <p className="text-yellow-300 text-xl font-bold">✅ {score} / 20</p>
        </div>

        {/* Achievement badges */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {badges.map((badge, idx) => {
            const earned = level >= badge.levelReq;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`${badge.color} text-white text-center p-3 rounded-xl shadow-lg cursor-pointer ${
                  earned ? "border-4 border-white" : "opacity-50"
                }`}
                title={badge.name}
              >
                {badge.name}
              </motion.div>
            );
          })}
        </div>

        {/* Search */}
        <div className="mt-6">
          <Search />
        </div>
      </motion.div>
    </div>
  );
}
