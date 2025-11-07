// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, GraduationCap, Target } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  // 10 ta motivatsion shaxs (rasm manbalari namunaviy)
  const motivationalPeople = [
    { name: "?", img: "https://filmcolossus.com/wp-content/uploads/2021/01/Fight-Club-explained.jpeg" },
    { name: "patrick bateman", img: "https://s3.amazonaws.com/files.commons.gc.cuny.edu/wp-content/blogs.dir/2700/files/2016/12/Bateman.jpg" },
    { name: "MIYAGI", img: "https://viberate-upload.ams3.cdn.digitaloceanspaces.com/prod/entity/artist/miyagi-and-andy-panda-F5eAp" },
    { name: "RAUF FAIK", img: "https://rauffaik.com/wp-content/uploads/2022/08/rauf-faik-biography.jpeg" },
    { name: "magnus carlsen", img: "https://cdn.britannica.com/71/223171-050-EB727CF2/Norwegian-chess-player-Magnus-Carlsen-2016.jpg" },
    { name: "hikaru nakamura", img: "https://www.chessgames.com/f/10084.jpg" },
    { name: "Oldboy", img: "https://i.ytimg.com/vi/bc6EWoIOqts/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAW5uhT8gVl7rkpaLbBBIkX-9_9gA" },
    { name: "Dok", img: "data:image/jpeg;base64,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" },
    { name: "S1mple", img: "https://img-cdn.hltv.org/playerbodyshot/O2mYq7Td1la8B8xGC-dYr8.png?bg=3e4c54&h=800&ixlib=java-2.1.0&rect=124%2C4%2C467%2C467&w=800&s=8382dd7c841a704d0fad393c68714ee9" },
    { name: "Donk", img: "https://media.licdn.com/dms/image/v2/D4D12AQGocQDcWp-_dQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1708959795604?e=2147483647&v=beta&t=D1m-p8NzJ9rFoqXZDI8KNHkzHce0ErsgMI5045RhhVM" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const item = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-6 relative text-white overflow-hidden"
      style={{
        backgroundImage: `url('https://media.giphy.com/media/WrmMDD4BpYSEjzQpJS/giphy.gif')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-indigo-950/90 to-black/95 backdrop-blur-md z-0"></div>

      {/* Main Card */}
      <motion.div
        className="relative z-10 max-w-5xl w-full p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.5)] bg-white/5 backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-indigo-400 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={18} />
          Orqaga qaytish
        </motion.button>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-wide"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          ℹ️ Biz haqimizda
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-gray-300 leading-relaxed text-lg md:text-xl mb-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <strong className="text-indigo-400">Level99</strong> — yoshlar uchun kasb tanlashda yordam beradigan interaktiv platforma.
        </motion.p>

        {/* Features List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[
            { icon: <Target size={38} className="text-indigo-400" />, title: "Yo‘nalish Tanlash", desc: "O‘zingizga mos kasb va yo‘nalishni toping." },
            { icon: <Users size={38} className="text-pink-400" />, title: "Testlar", desc: "Fanlardan interaktiv testlar orqali bilimlaringizni sinab ko‘ring." },
            { icon: <GraduationCap size={38} className="text-purple-400" />, title: "Universitetlar", desc: "Oliy ta’lim va mutaxassisliklar haqida to‘liq ma’lumot oling." },
          ].map((itemData, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 shadow-lg hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{itemData.icon}</div>
              <h3 className="font-bold text-xl mb-2 text-white">{itemData.title}</h3>
              <p className="text-gray-300 text-sm md:text-base">{itemData.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Motivational People Grid */}
      <motion.section
        className="relative z-10 w-full max-w-7xl mt-16 mb-20 grid grid-cols-1 sm:grid-cols-2 gap-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {motivationalPeople.map((person, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          >
            <motion.img
              src={person.img}
              alt={person.name}
              className="absolute inset-0 w-full h-full object-cover rounded-3xl group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <motion.div
              className="absolute bottom-0 left-0 w-full py-6 text-center"
              initial={{ y: 80, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-extrabold text-white drop-shadow-lg">{person.name}</h3>
            </motion.div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
