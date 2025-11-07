import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PublicProfile() {
  const { username } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(!user);

  useEffect(() => {
    if (user) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/active-users`);
        const data = await res.json();
        const found = data.find((u) => u.username === username);
        setUser(found || null);
      } catch (err) {
        console.error("User fetch error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username, user]);

  if (loading) return <p className="text-center mt-20">Yuklanmoqda...</p>;
  if (!user) return <p className="text-center mt-20">Foydalanuvchi topilmadi 😕</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-950 text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 p-3 rounded-full bg-purple-700 hover:bg-purple-600 shadow-lg"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="max-w-xl mx-auto bg-purple-950/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm space-y-4">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.name || user.username}
          className="w-32 h-32 rounded-xl mx-auto border-2 border-purple-500 object-cover"
        />
        <h1 className="text-2xl font-bold text-center">
          {user.name || user.username}
        </h1>
        <p className="text-center text-gray-400">@{user.username}</p>
        <p className="text-center font-semibold bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-1 rounded-full inline-block shadow">
          {user.career || "Nomalum"}
        </p>

        <div className="mt-4 space-y-2 text-gray-200">
          <p>Yoshi: {user.age || "Kiritilmagan"}</p>
          <p>Bio: {user.bio || "Bio mavjud emas"}</p>
          <p>Level: {user.level || "Aniqlanmagan"}</p>
        </div>
      </div>
    </div>
  );
}
