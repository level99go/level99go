// src/profiles/BloggerProfile.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BloggerProfile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("level99_user")) || {};
  const level = storedUser.level || 0;

  const bloggerAnswers = storedUser.answers?.blogger || {};
  const { platforms = [], needsAdminCheck = false } = bloggerAnswers;

  useEffect(() => {
    if (!platforms.length) return;

    // 🔐 Admin tekshiruvi bo‘lsa — alohida sahifaga o‘tadi
    if (needsAdminCheck) {
      navigate("/profiles/blogger-admin-review");
      return;
    }

    const count = platforms.length;

    // ✅ Adolatli bo‘linma: 0–16 = low, 17–34 = mid, 35–50 = high
    const getProfileRoute = (base) => {
      if (level < 17) return `/profiles/${base}-low`;
      else if (level < 35) return `/profiles/${base}-mid`;
      else return `/profiles/${base}-high`;
    };

    // ✅ Platformalar soniga qarab yo‘naltirish
    if (count === 1) navigate(getProfileRoute("blogger-1"));
    else if (count === 2) navigate(getProfileRoute("blogger-2"));
    else if (count === 3) navigate(getProfileRoute("blogger-3"));
    else navigate("/profiles/basic"); // fallback
  }, [level, navigate, platforms.length, needsAdminCheck]);

  return (
    <div className="text-white text-center mt-20 text-lg font-semibold">
      Yuklanmoqda...
    </div>
  );
}
