import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import {
  Brain,
  GraduationCap,
  Target,
  Instagram,
  Send,
  BarChart3,
  Users,
  Menu,
  X,
  Zap, 
  Sparkles,
  Star,
  Mail,
} from 'lucide-react';

// ----------------------------- Utilities ---------------------------------
const cls = (...vals) => vals.filter(Boolean).join(' ');

// Detect prefers-reduced-motion for accessibility
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReduced(mq.matches);
      const handler = () => setReduced(mq.matches);
      mq.addEventListener?.('change', handler);
      return () => mq.removeEventListener?.('change', handler);
    } catch (e) {
      return undefined;
    }
  }, []);
  return reduced;
}

// Small count-up component (safe and simple)
function CountUp({ to = 100, duration = 1200, suffix = '' }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = null;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * to));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{value >= to ? `${to}${suffix}` : `${value}${suffix}`}</>;
}

// Hook: track pointer position relative to an element and return normalized coords (-1..1)
function usePointerCoords(containerRef) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let rafId = null;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      // normalized -1..1 centered
      const nx = Math.max(-1, Math.min(1, (x - 0.5) * 2));
      const ny = Math.max(-1, Math.min(1, (y - 0.5) * 2));
      // throttle to rAF for performance
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        mx.set(Number(nx.toFixed(3)));
        my.set(Number(ny.toFixed(3)));
      });
    };

    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef, mx, my]);

  return { mx, my };
}

// --------------------------- Decorative SVGs -----------------------------
function GradientBackground({ reduced }) {
  // slow animated gradient with purple/black vibe
  return (
    <svg className="absolute inset-0 -z-20 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800" aria-hidden>
      <defs>
        <linearGradient id="g-a" x1="0" x2="1">
          <stop offset="0%" stopColor="#1f0446" />
          <stop offset="45%" stopColor="#5b21b6" />
          <stop offset="90%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="60" />
        </filter>
      </defs>
      <motion.circle
        cx="200"
        cy="200"
        r="280"
        fill="url(#g-a)"
        opacity="0.085"
        filter="url(#soft)"
        animate={reduced ? {} : { cx: [180, 220, 180], cy: [200, 160, 200] }}
        transition={{ duration: 18, repeat: Infinity }}
      />
      <motion.circle
        cx="920"
        cy="600"
        r="240"
        fill="url(#g-a)"
        opacity="0.06"
        filter="url(#soft)"
        animate={reduced ? {} : { cx: [900, 940, 900], cy: [600, 640, 600] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
    </svg>
  );
}

function SubtleParticles({ seed = 7, reduced }) {
  const nodes = useMemo(() => Array.from({ length: 22 }, (_, i) => ({
    left: (i * 37) % 100,
    top: (i * 23) % 100,
    dur: 6 + (i % 5),
  })), []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {nodes.map((p, i) => (
        <motion.span
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-white/40"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={reduced ? {} : { opacity: [0.02, 0.22, 0.02], y: [0, (i % 5) - 2, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}
    </div>
  );
}

// ----------------------------- Main Page --------------------------------
export default function Home() {
  const heroRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const { mx, my } = usePointerCoords(heroRef);

  // Derived transforms for layers
  const heroX = useTransform(mx, (v) => `${v * 28}px`);
  const heroY = useTransform(my, (v) => `${v * 18}px`);
  const heroR = useTransform(mx, (v) => `${v * -5}deg`);

  const blobA_X = useTransform(mx, (v) => `${v * -60}px`);
  const blobA_Y = useTransform(my, (v) => `${v * -40}px`);
  const blobB_X = useTransform(mx, (v) => `${v * 46}px`);
  const blobB_Y = useTransform(my, (v) => `${v * 34}px`);

  const cardRotateX = useTransform(my, (v) => `${v * 6}deg`);
  const cardRotateY = useTransform(mx, (v) => `${v * -8}deg`);
  const cardTX = useTransform(mx, (v) => `${v * -12}px`);
  const cardTY = useTransform(my, (v) => `${v * -8}px`);

  const [menuOpen, setMenuOpen] = useState(false);
  const features = useMemo(() => [
    { icon: <Brain size={36} />, title: 'Interaktiv Testlar', desc: "Shaxsiy mos testlar va chuqur feedback bilan." },
    { icon: <Target size={36} />, title: "Yo'nalish Tanlash", desc: 'Natijalar asosida shaxsiy yo‘nalish tavsiyalari.' },
    { icon: <GraduationCap size={36} />, title: 'Universitetlar', desc: "Oliy ta'lim muassasalari va qabul jarayonlari." },
  ], []);

  // stats animation values
  const [u, setU] = useState(0);
  const [j, setJ] = useState(0);
  const [uni, setUni] = useState(0);
  useEffect(() => {
    let raf; let start;
    const dur = 1200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setU(Math.floor(p * 10000));
      setJ(Math.floor(p * 50));
      setUni(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // control for staggered entrance animations
  const animateControls = useAnimation();
  useEffect(() => {
    if (!reduced) {
      animateControls.start('visible');
    } else {
      animateControls.set('visible');
    }
  }, [animateControls, reduced]);

  // subtle floating for CTA
  const ctaFloat = {
    y: reduced ? 0 : [0, -6, 0],
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white antialiased overflow-hidden font-sans">

      {/* Background layers */}
      <GradientBackground reduced={reduced} />
      <SubtleParticles reduced={reduced} />

      {/* Decorative blobs that subtly respond to mouse */}
      <motion.div style={{ x: blobA_X, y: blobA_Y }} className="pointer-events-none absolute -left-32 top-8 w-[560px] h-[480px] rounded-3xl bg-gradient-to-br from-indigo-700/30 via-pink-500/18 to-sky-400/12 blur-3xl -z-10 transform-gpu" animate={reduced ? {} : { rotate: [0, 5, 0, -5, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />

      <motion.div style={{ x: blobB_X, y: blobB_Y }} className="pointer-events-none absolute right-8 bottom-12 w-[420px] h-[340px] rounded-3xl bg-gradient-to-br from-sky-600/22 to-indigo-600/18 blur-2xl -z-10 transform-gpu" animate={reduced ? {} : { rotate: [0, -6, 0, 6, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} />

      {/* NAVBAR */}
      <header className="w-full px-8 py-4 flex items-center justify-between fixed top-0 left-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 shadow-xl flex items-center justify-center text-white font-bold">L99</div>
          <div className="hidden sm:block">
            <div className="text-lg font-semibold">Level99</div>
            <div className="text-xs text-gray-300">Ta'lim va Kasb</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-gray-200 font-medium">
          <motion.div initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <Link to="/" className="hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded">Home</Link>
          </motion.div>
          <motion.div initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
            <Link to="/about" className="hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded">About</Link>
          </motion.div>
          <motion.div initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Link to="/login" className="hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 px-2 py-1 rounded">Register / Login</Link>
          </motion.div>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-sm text-gray-300">Interaktiv kurslar & mentorlik</div>
          <button aria-label="Open menu" onClick={() => setMenuOpen((s) => !s)} className="md:hidden p-2 rounded-lg bg-white/6 border border-white/8">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="absolute top-16 right-4 md:hidden bg-black/92 border border-white/8 rounded-xl p-4 shadow-2xl">
              <Link to="/" className="block py-2">Home</Link>
              <Link to="/about" className="block py-2">About</Link>
              <Link to="/login" className="block py-2">Register / Login</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <main ref={heroRef} className="relative pt-28 pb-20 px-6 flex flex-col items-center text-center overflow-visible">
        <motion.div style={{ x: heroX, y: heroY, rotate: heroR }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Kasbingizni tanlang — <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">kelajagingiz</span>ni yarating ✨
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Level99 orqali interaktiv testlar, yo‘naltirish va universitet ma’lumotlarini bir joyda oling. Dizayn — fikr va funksiya uyg‘unligi.
          </p>

          <div className="flex items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} className="relative inline-flex items-center px-12 py-4 rounded-full text-lg font-semibold shadow-2xl overflow-hidden" style={{ background: 'linear-gradient(90deg,#5b21b6,#ec4899)', color: 'white' }}>
              <motion.span className="absolute inset-0 rounded-full opacity-30" animate={reduced ? {} : { x: [-12, 12, -12] }} transition={{ duration: 8, repeat: Infinity }} style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02))' }} />
              <Link to="/login" className="relative z-10 focus:outline-none focus:ring-2 focus:ring-white/40 px-6 py-2">Boshlash</Link>
            </motion.div>

            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="flex items-center gap-2 bg-white/6 px-4 py-2 rounded-full text-sm border border-white/8">
              <Zap size={16} /> Demo
            </motion.button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center text-sm text-gray-300">
            <motion.span whileHover={{ y: -4 }} className="px-3 py-2 rounded-full bg-white/4 border border-white/8">Interaktiv</motion.span>
            <motion.span whileHover={{ y: -4 }} className="px-3 py-2 rounded-full bg-white/4 border border-white/8">Mentorlik</motion.span>
            <motion.span whileHover={{ y: -4 }} className="px-3 py-2 rounded-full bg-white/4 border border-white/8">Sertifikat</motion.span>
          </div>
        </motion.div>

        {/* subtle underline decorative */}
        <motion.div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-64 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#5b21b6,#ec4899)' }} animate={reduced ? {} : { scaleX: [0.95, 1.05, 0.95] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />

      </main>

      {/* FEATURES GRID */}
      <section className="py-12 px-6 max-w-6xl mx-auto z-10">
        <motion.div initial="hidden" animate={animateControls} variants={{ hidden: {}, visible: {} }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.article key={i} style={{ rotateX: cardRotateX, rotateY: cardRotateY, x: cardTX, y: cardTY }} whileHover={{ scale: 1.035, y: -8 }} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12, duration: 0.6 }} className="p-8 rounded-3xl bg-white/4 backdrop-blur-md border border-white/8 shadow-lg">
              <div className="flex items-center justify-center mb-4 text-indigo-300">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-6 flex items-center gap-3">
                <Link to="/login" className="text-sm underline underline-offset-4">Boshlash</Link>
                <button aria-hidden className="ml-auto rounded-full bg-white/6 px-3 py-2 text-xs flex items-center gap-2">
                  <Sparkles size={14} /> Demo
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* EXTENDED FEATURE ROW - visually rich with micro-interactions */}
      <section className="py-10 px-6 max-w-6xl mx-auto z-10">
        <motion.div className="rounded-2xl bg-white/5 border border-white/8 p-6 backdrop-blur-md shadow-2xl" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Interaktiv kurslar va mentorlik</h3>
              <p className="text-gray-300 mt-2">Mutaxassislar tomonidan tuzilgan dasturlar, amaliy topshiriqlar va yo‘l-yo‘riqlar.</p>
            </div>
            <div className="flex gap-3">
              <motion.button whileHover={{ y: -4 }} className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold">Boshlash</motion.button>
              <motion.button whileHover={{ y: -4 }} className="px-4 py-2 rounded-full bg-white/6 border border-white/8">Batafsil</motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-gradient-to-r from-indigo-900/6 to-pink-900/4 border-y border-white/8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center py-6">
          <motion.div whileHover={{ scale: 1.03 }} className="p-6">
            <div className="mx-auto w-20 h-20 rounded-full border border-indigo-400/20 flex items-center justify-center mb-4">
              <Users className="text-indigo-300" size={26} />
            </div>
            <h3 className="text-3xl font-bold"><CountUp to={10000} duration={1200} suffix={'+'} /></h3>
            <p className="text-gray-400">Foydalanuvchilar</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="p-6">
            <div className="mx-auto w-20 h-20 rounded-full border border-pink-400/20 flex items-center justify-center mb-4">
              <BarChart3 className="text-pink-300" size={26} />
            </div>
            <h3 className="text-3xl font-bold"><CountUp to={50} duration={1100} suffix={'+'} /></h3>
            <p className="text-gray-400">Kasblar</p>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} className="p-6">
            <div className="mx-auto w-20 h-20 rounded-full border border-sky-400/20 flex items-center justify-center mb-4">
              <GraduationCap className="text-sky-300" size={26} />
            </div>
            <h3 className="text-3xl font-bold"><CountUp to={100} duration={1200} suffix={'+'} /></h3>
            <p className="text-gray-400">Universitetlar</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <motion.div className="max-w-3xl mx-auto p-10 rounded-3xl bg-gradient-to-r from-purple-800/10 to-pink-800/8 border border-white/8 shadow-2xl" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h2 className="text-3xl font-bold mb-4">🎯 Kelajagingizni bugun boshlang!</h2>
          <p className="text-gray-300 mb-6">Ro‘yxatdan o‘tish orqali bilimlaringizni sinab ko‘rib, o‘z kasbingizni tanlang.</p>
          <motion.div animate={reduced ? {} : ctaFloat} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }} whileHover={{ scale: 1.02 }}>
            <Link to="/login" className="inline-block px-12 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg">Ro‘yxatdan o‘tish</Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-sm text-gray-300 border-t border-white/8">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/about" className="hover:text-white transition flex items-center gap-2">ℹ️ About</Link>
            <a href="https://t.me/level99uzb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-2">
              <motion.span whileHover={{ y: -4 }} className="flex items-center gap-2"><Send size={16} /> Telegram</motion.span>
            </a>
            <a href="https://instagram.com/level99uzb" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-2">
              <motion.span whileHover={{ y: -4 }} className="flex items-center gap-2"><Instagram size={16} /> Instagram</motion.span>
            </a>
            <a href="mailto:level99uzb@gmail.com" className="hover:text-white transition flex items-center gap-2">
              <motion.span whileHover={{ y: -4 }} className="flex items-center gap-2"><Mail size={16} /> level99uzb@gmail.com</motion.span>
            </a>
            <span className="opacity-60">v1.0.0</span>
          </div>

          <div className="flex gap-6 mt-2 items-center">
            <motion.a href="https://instagram.com/level99uzb" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.03 }} className="flex items-center gap-2 hover:text-pink-400 transition">
              <Instagram size={18} /> @level99uzb
            </motion.a>

            <motion.a href="https://t.me/level99uzb" target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, scale: 1.03 }} className="flex items-center gap-2 hover:text-purple-300 transition">
              <Send size={18} /> @level99uzb
            </motion.a>

            <motion.a href="mailto:level99uzb@gmail.com" whileHover={{ y: -4, scale: 1.03 }} className="flex items-center gap-2 hover:text-sky-300 transition">
              <Mail size={18} /> level99uzb@gmail.com
            </motion.a>
          </div>

          <p className="text-xs text-gray-500 mt-4">© {new Date().getFullYear()} Level99. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
