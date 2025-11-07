import React, { useEffect, useState } from "react";
import CyberProfile from "./profiles/CyberProfile";
import BloggerProfile from "./profiles/BloggerProfile";
import PUBGProfile from "./profiles/PUBGProfile";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("level99_user");
    if (!savedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) return null;

  const career = user.career?.toLowerCase();

  switch (career) {
    case "kiberxavfsizlik":
    case "kiberxavfsizlik xodimi":
      return <CyberProfile user={user} />;

    case "bloger":
    case "blogger":
      return <BloggerProfile user={user} />;

    case "pubg o‘yinchisi":
    case "pubg o'yinchisi":
    case "pubg":
      return <PUBGProfile user={user} />;

    default:
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Noma'lum kasb</h1>
            <p className="text-gray-400">
              Siz tanlagan kasb bo‘yicha profil hali mavjud emas.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              ⬅️ Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      );
  }
}
