// src/pages/Search.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, ChevronLeft, ChevronRight, User, AlertCircle } from "lucide-react";
import clsx from "clsx";

/**
 * Premium Search.jsx
 * Features:
 * - Debounced live search (300ms)
 * - Loading skeletons
 * - Result cards with hover/press animations
 * - Expand inline details + modal detailed view
 * - Sort, filters, pagination & "load more" for infinite experience
 * - Keyboard navigation (arrow keys, enter to open, esc to close)
 * - Accessible attributes (aria-*)
 * - Local cache to reduce repeat requests
 * - Robust error handling
 * - Responsive & Tailwind-friendly design
 *
 * Notes:
 * - Endpoint used: GET /api/active-users?search=...&career=...&minLevel=...
 * - Single-file component for easy paste into project
 */

/* ---------------------------
   Utilities
   --------------------------- */
const apiBase = "http://localhost:5000/api";

function debounce(fn, delay = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

function formatWhen(iso) {
  if (!iso) return "-";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

function useLocalCache() {
  // simple in-memory cache: key -> { ts, value }
  const cacheRef = useRef(new Map());
  const get = (key) => {
    const rec = cacheRef.current.get(key);
    if (!rec) return null;
    // cache for 60s only
    if (Date.now() - rec.ts > 60_000) {
      cacheRef.current.delete(key);
      return null;
    }
    return rec.value;
  };
  const set = (key, value) => {
    cacheRef.current.set(key, { ts: Date.now(), value });
  };
  const clear = () => cacheRef.current.clear();
  return { get, set, clear };
}

/* ---------------------------
   Search Component
   --------------------------- */
export default function Search() {
  // UI state
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]); // array of user objects
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // filters & sort
  const [careerFilter, setCareerFilter] = useState("");
  const [minLevel, setMinLevel] = useState(0);
  const [sortBy, setSortBy] = useState("name"); // name | username | level | career
  const [order, setOrder] = useState("asc"); // asc | desc

  // pagination / infinite
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(null);

  // expanded inline + modal
  const [expandedId, setExpandedId] = useState(null);
  const [modalUser, setModalUser] = useState(null);

  // keyboard nav
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // caching
  const cache = useLocalCache();

  // dark mode autodetect + manual toggle
  const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [dark, setDark] = useState(prefersDark);

  // derived
  const hasQuery = debouncedQuery.trim().length > 0;
  const noResults = !loading && hasQuery && results.length === 0;

  /* ---------------------------
     Fetch function
     --------------------------- */
  const fetchUsers = useCallback(
    async ({ q = "", career = "", minLvl = 0, page = 1, limit = 12, sort = "", order = "asc" } = {}) => {
      setError(null);
      setLoading(true);

      // build cache key
      const key = `q:${q}|career:${career}|min:${minLvl}|p:${page}|l:${limit}|s:${sort}|o:${order}`;
      const cached = cache.get(key);
      if (cached) {
        setResults(cached.items || []);
        setTotal(cached.total ?? null);
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams();
        if (q) params.set("search", q);
        if (career) params.set("career", career);
        if (minLvl) params.set("minLevel", String(minLvl));
        // our backend supports these params but not pagination for active-users, we'll implement client-side slice if needed
        // Try to use server-side limit/page if implemented: but backend above returns full array; here we request full and slice.
        const url = `${apiBase}/active-users?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const data = await res.json();

        // data is an array (per backend)
        let items = Array.isArray(data) ? data : data.items || [];
        // local sorting
        if (sort) {
          const dir = order === "desc" ? -1 : 1;
          items.sort((a, b) => {
            const va = String((a?.[sort] ?? "")).toLowerCase();
            const vb = String((b?.[sort] ?? "")).toLowerCase();
            if (va < vb) return -1 * dir;
            if (va > vb) return 1 * dir;
            return 0;
          });
        }
        // pagination client-side
        const start = (page - 1) * limit;
        const pageSlice = items.slice(start, start + limit);

        setResults(pageSlice);
        setTotal(items.length);

        // cache
        cache.set(key, { items: pageSlice, total: items.length });
      } catch (err) {
        console.error("Search fetch failed:", err);
        setError(err.message || "Server error");
        setResults([]);
        setTotal(null);
      } finally {
        setLoading(false);
      }
    },
    [cache]
  );

  // debounced query setter
  const debouncer = useMemo(() => debounce((v) => setDebouncedQuery(v), 350), []);

  useEffect(() => {
    debouncer(query);
  }, [query, debouncer]);

  // whenever debouncedQuery, filters, sort, page changes -> fetch
  useEffect(() => {
    setPage(1); // reset page on main search change
  }, [debouncedQuery, careerFilter, minLevel, sortBy, order]);

  useEffect(() => {
    // call fetch
    fetchUsers({
      q: debouncedQuery,
      career: careerFilter,
      minLvl: minLevel,
      page,
      limit,
      sort: sortBy,
      order,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, careerFilter, minLevel, sortBy, order, page]);

  /* ---------------------------
     keyboard navigation & focus handlers
     --------------------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (!hasQuery || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        if (focusedIndex >= 0 && focusedIndex < results.length) {
          const u = results[focusedIndex];
          setModalUser(u);
        }
      } else if (e.key === "Escape") {
        setModalUser(null);
        setExpandedId(null);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hasQuery, results, focusedIndex]);

  useEffect(() => {
    // when focusedIndex changes, scroll into view
    if (focusedIndex >= 0 && listRef.current) {
      const node = listRef.current.querySelectorAll("[data-search-item]")[focusedIndex];
      if (node) node.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [focusedIndex]);

  /* ---------------------------
     UI helpers
     --------------------------- */
  const toggleExpand = (id) => {
    setExpandedId((cur) => (cur === id ? null : id));
    setModalUser(null);
  };

  const openModal = (u) => {
    setModalUser(u);
    setExpandedId(null);
  };

  const clearAll = () => {
    setQuery("");
    setDebouncedQuery("");
    setResults([]);
    setExpandedId(null);
    setModalUser(null);
    cache.clear();
    setPage(1);
    setTotal(null);
    setError(null);
  };

  const loadMore = () => {
    // next page
    if (total == null) return;
    const maxPage = Math.ceil(total / limit);
    setPage((p) => Math.min(p + 1, maxPage));
  };

  /* ---------------------------
     Small subcomponents
     --------------------------- */
  const Skeleton = ({ lines = 3 }) => (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-gray-300/30 rounded w-3/4 mx-auto" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-12 bg-gray-300/20 rounded-lg"></div>
      ))}
    </div>
  );

  const ResultCard = ({ u, index }) => {
    const isExpanded = expandedId === u.id;
    const isFocused = focusedIndex === index;
    return (
      <motion.li
        data-search-item
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        whileHover={{ scale: 1.02 }}
        className={clsx(
          "bg-white/5 hover:bg-white/8 transition p-4 rounded-2xl shadow-sm flex items-start gap-4 cursor-pointer",
          isFocused && "ring-2 ring-purple-400/30"
        )}
        onClick={() => toggleExpand(u.id)}
        onDoubleClick={() => openModal(u)}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
      >
        <img
          src={u.avatar || "/default-avatar.png"}
          alt={u.name || u.username}
          className="w-14 h-14 rounded-xl object-cover border border-purple-600/30 flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-white font-semibold truncate">{u.name || "No name"}</h3>
              <p className="text-sm text-gray-300 truncate">@{u.username}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-500 px-3 py-1 rounded-full text-white shadow-sm">
                {u.career || "Nomalum"}
              </div>
              <div className="text-xs text-gray-400 mt-1">Lvl: {u.level ?? "—"}</div>
            </div>
          </div>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-gray-200 bg-white/3 p-3 rounded-lg"
            >
              <p className="truncate">{u.bio || "Bio mavjud emas"}</p>
              <div className="flex gap-3 mt-2 text-xs text-gray-300">
                <span>Yoshi: {u.age ?? "—"}</span>
                <span>Qo‘shilgan: {formatWhen(u.createdAt)}</span>
              </div>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(u);
                  }}
                  className="px-3 py-1 text-sm rounded-md bg-purple-600/80 hover:bg-purple-600 text-white"
                >
                  Batafsil
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // quick copy username
                    navigator.clipboard?.writeText(u.username || "");
                  }}
                  className="px-3 py-1 text-sm rounded-md bg-white/6 hover:bg-white/8 text-white"
                >
                  Nusxalash
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.li>
    );
  };

  /* ---------------------------
     Render
     --------------------------- */
  return (
    <div className={clsx("min-h-screen px-4 py-10", dark ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white" : "bg-gradient-to-br from-purple-100 via-indigo-100 to-white text-slate-900")}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              🔎 Foydalanuvchi Qidiruvi
            </h1>
            <p className="text-sm text-gray-400 mt-1">Ism, username yoki yo‘nalish bo‘yicha qidiruv — tez va chiroyli.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/6 px-3 py-2 rounded-full">
              <button
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle theme"
                className="px-2 py-1 rounded-md text-sm"
              >
                {dark ? "🌙 Dark" : "☀️ Light"}
              </button>
              <button
                onClick={clearAll}
                aria-label="Clear search"
                className="px-2 py-1 rounded-md bg-white/5 text-sm hover:bg-white/8"
              >
                Tozalash
              </button>
            </div>
          </div>
        </div>

        {/* Search & Controls */}
        <div className="bg-white/4 p-4 rounded-2xl shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="col-span-2 relative">
              <SearchIcon className={clsx("absolute left-4 top-1/2 -translate-y-1/2", dark ? "text-white/60" : "text-gray-500")} size={18} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ism, username yoki yo'nalish..."
                className={clsx(
                  "w-full rounded-full py-3 pr-4 pl-11 text-sm focus:outline-none shadow-inner",
                  dark ? "bg-slate-800 text-white placeholder-slate-400" : "bg-white text-slate-900 placeholder-slate-400"
                )}
                aria-label="Search users"
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear query"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={careerFilter}
                onChange={(e) => setCareerFilter(e.target.value)}
                className="rounded-full px-4 py-2 text-sm bg-white/6"
                aria-label="Filter by career"
              >
                <option value="">Barchasi</option>
                <option value="developer">Developer</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="designer">Designer</option>
              </select>

              <select
                value={minLevel}
                onChange={(e) => setMinLevel(Number(e.target.value))}
                className="rounded-full px-4 py-2 text-sm bg-white/6"
                aria-label="Minimum level"
              >
                <option value={0}>Min level</option>
                <option value={10}>10+</option>
                <option value={20}>20+</option>
                <option value={30}>30+</option>
                <option value={40}>40+</option>
              </select>
            </div>
          </div>

          {/* Sort & stats */}
          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm">
              <label className="text-gray-400">Sort:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-full px-3 py-1 text-sm bg-white/6">
                <option value="name">Name</option>
                <option value="username">Username</option>
                <option value="career">Career</option>
                <option value="level">Level</option>
              </select>
              <button onClick={() => setOrder((o) => (o === "asc" ? "desc" : "asc"))} className="px-2 py-1 rounded-full bg-white/6">
                {order === "asc" ? "↑" : "↓"}
              </button>
            </div>

            <div className="text-sm text-gray-400">
              {loading ? "Yuklanmoqda..." : total != null ? `${total} topildi` : ""}
            </div>
          </div>
        </div>

        {/* Results area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left: results list */}
          <div className="lg:col-span-2">
            <div className="bg-white/4 p-4 rounded-2xl shadow-inner">
              {/* Loading skeleton */}
              {loading && (
                <div className="space-y-3">
                  <Skeleton lines={4} />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-6 bg-red-600/10 rounded-md text-red-400 flex items-center gap-3">
                  <AlertCircle />
                  <div>
                    <div className="font-semibold">Xato yuz berdi</div>
                    <div className="text-xs">{error}</div>
                  </div>
                </div>
              )}

              {/* No results */}
              {noResults && (
                <div className="text-center py-8 text-gray-400">
                  <svg width="120" height="80" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4 opacity-80">
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <div className="font-semibold">Hech nima topilmadi</div>
                  <div className="text-xs mt-2">So‘rovni qisqartiring yoki boshqa so‘z bilan urinib ko‘ring</div>
                </div>
              )}

              {/* Results list */}
              <ul ref={listRef} className="space-y-3" role="list" aria-live="polite">
                <AnimatePresence>
                  {results.map((u, i) => (
                    <ResultCard key={u.id || u.username || i} u={u} index={i} />
                  ))}
                </AnimatePresence>
              </ul>

              {/* Pagination / load more */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Sahifa {page} {total != null && `— ${Math.ceil(total / limit)} sahifa`}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded-md bg-white/6 disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => {
                      const maxPage = total ? Math.ceil(total / limit) : page + 1;
                      setPage((p) => Math.min(p + 1, maxPage));
                    }}
                    className="px-3 py-1 rounded-md bg-white/6"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <button onClick={loadMore} className="px-3 py-1 rounded-md bg-purple-600 text-white">
                    Ko‘proq yuklash
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* right: details / preview */}
          <div>
            <div className="sticky top-28 bg-white/4 p-4 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              {expandedId ? (
                <div className="text-sm text-gray-200">
                  <p className="font-semibold">Keyingi:</p>
                  <p>ID: {expandedId}</p>
                </div>
              ) : modalUser ? (
                <div>
                  <img src={modalUser.avatar} alt={modalUser.name} className="w-24 h-24 rounded-xl object-cover mb-3" />
                  <h4 className="font-semibold">{modalUser.name}</h4>
                  <p className="text-xs text-gray-300">@{modalUser.username}</p>
                  <p className="text-sm mt-2">{modalUser.bio}</p>
                  <div className="mt-3 text-xs text-gray-400">
                    Qo‘shilgan: {formatWhen(modalUser.createdAt)}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 text-sm">
                  Kartochkani bosing — batafsil ko‘rish uchun.
                </div>
              )}

              {/* Quick actions */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    if (modalUser) window.open(`/public/${modalUser.username}`, "_blank");
                  }}
                  className="flex-1 px-3 py-2 rounded-md bg-purple-600 text-white"
                >
                  Open public
                </button>
                <button
                  onClick={() => {
                    if (modalUser) navigator.clipboard?.writeText(JSON.stringify(modalUser));
                  }}
                  className="px-3 py-2 rounded-md bg-white/6"
                >
                  Copy JSON
                </button>
              </div>

              {/* small hint */}
              <div className="mt-3 text-xs text-gray-400">
                Tip: double-click kartochkaga yoki Enter tugmasi bilan modal oching.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setModalUser(null)} />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-10 max-w-2xl w-full bg-white/6 backdrop-blur-md rounded-2xl p-6 mx-4"
            >
              <div className="flex items-start gap-4">
                <img src={modalUser.avatar || "/default-avatar.png"} alt={modalUser.name} className="w-28 h-28 rounded-xl object-cover border" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{modalUser.name}</h2>
                  <p className="text-sm text-gray-200">@{modalUser.username}</p>
                  <p className="text-sm text-gray-300 mt-2">{modalUser.bio || "Bio mavjud emas"}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-200">
                    <div>
                      <div className="text-xs text-gray-400">Career</div>
                      <div className="font-semibold">{modalUser.career || "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Level</div>
                      <div className="font-semibold">{modalUser.level ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Age</div>
                      <div className="font-semibold">{modalUser.age ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Joined</div>
                      <div className="font-semibold">{formatWhen(modalUser.createdAt)}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        // also push to active users endpoint to ensure latest
                        (async () => {
                          try {
                            const u = { ...modalUser, updatedAt: new Date().toISOString() };
                            if (!u.id) u.id = crypto.randomUUID();
                            await fetch(`${apiBase}/active-users`, {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(u),
                            });
                            alert("Active users yangilandi ✅");
                          } catch (e) {
                            console.error(e);
                            alert("Yuborishda xato ❌");
                          }
                        })();
                      }}
                      className="px-3 py-2 rounded-md bg-purple-600 text-white"
                    >
                      Save active
                    </button>
                    <button onClick={() => setModalUser(null)} className="px-3 py-2 rounded-md bg-white/6">Close</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
