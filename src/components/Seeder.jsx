// src/components/Seeder.jsx
import { useEffect } from "react";
import users from "../data/users.json"; // 🔁 To‘g‘ri yo‘l bo‘lishi kerak

export default function Seeder() {
  useEffect(() => {
    const alreadySeeded = localStorage.getItem("level99_users");
    if (!alreadySeeded) {
      localStorage.setItem("level99_users", JSON.stringify(users));
      console.log("✅ Userlar localStorage ga yozildi");
    }
  }, []);

  return null;
}
