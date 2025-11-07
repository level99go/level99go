// src/profiles/LogicProfile.jsx

import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Search from "../pages/Search";

export default function LogicProfile() {
  const [user, setUser] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("level99_user"));
    setUser(savedUser);

    if (savedUser) {
      const savedBio = localStorage.getItem(`bio_${savedUser.username}`) || "";
      setBio(savedBio);
    }
  }, []);

  if (!user || !user.answers?.logic) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p>❌ Mantiq bo‘yicha ma’lumot topilmadi.</p>
      </div>
    );
  }

  const { name, username, avatar, answers } = user;
  const { score, level } = answers.logic;

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

  return (
    <div
      className="min-h-screen text-white p-6 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/brain-abstract-technology-network-background-3d-illustration-ai_1018873-9438.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Qoraytirilgan qatlam */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="relative z-10 max-w-3xl mx-auto bg-[#101820]/80 border border-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-purple-400 animate-pulse">
          🧠 Mantiq Profili
        </h1>

        <div className="flex flex-col items-center gap-4">
          <div className="w-40 h-40 rounded-xl overflow-hidden border-4 border-purple-400 shadow-lg">
            <img
              src={selectedImage || avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-gray-200 file:bg-purple-500 hover:file:bg-purple-600 file:text-white file:py-1 file:px-3 file:rounded-full"
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-sm text-gray-300">@{username}</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 bg-gray-900 bg-opacity-80 p-4 rounded-lg border border-purple-600">
          <h3 className="text-lg font-semibold mb-2 text-purple-300">👤 Bio (Izoh)</h3>
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
                  className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-500"
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
                <span className="text-gray-500 italic">Bio yozilmagan. Tahrirlash uchun bosing.</span>
              )}
            </div>
          )}
        </div>

        {/* Level / Score */}
        <div className="bg-gradient-to-br from-purple-800 to-purple-600 rounded-xl p-6 text-center border border-purple-500 shadow-inner flex flex-col items-center">
          <p className="text-lg font-semibold mb-2 text-purple-200">Test natijalari</p>
          <div className="w-24 h-24">
            <CircularProgressbar
              value={level}
              maxValue={50}
              text={`${level}/50`}
              styles={buildStyles({
                pathColor: "#c084fc",
                textColor: "#ffffff",
                trailColor: "#1e293b",
              })}
            />
          </div>
          <p className="mt-3 text-purple-300 text-xl font-bold">✅ {score} / 20</p>
        </div>

        {/* 🔍 Search.jsx komponenti */}
        <div className="mt-6">
          <Search />
        </div>
      </div>
    </div>
  );
}