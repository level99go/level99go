// server.js — Level99 robust backend (with login_passwords persistence).
// Deps: express, cors, fs/promises, path, uuid, dotenv, bcrypt
// Run:  npm run server   (package.json -> "server": "node server.js")

import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
// note: you already have routes/users.js — this server keeps inline handlers for clarity.
// if you prefer to use the router module, remove the inline /api/users handlers below and mount the router:
// import usersRouter from "./routes/users.js";
// app.use("/api/users", usersRouter);

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// paths for data files
const USERS_FILE = path.resolve(__dirname, "./src/data/users.json");
const LOGIN_PASSWORDS_FILE = path.resolve(__dirname, "./src/data/login_passwords.json");

// CORS whitelist (dev)
const CORS_WHITELIST = [
  "http://localhost:1234",
  "http://127.0.0.1:1234",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin(origin, cb) {
      // allow when origin is missing (curl/Postman) or in whitelist
      if (!origin || CORS_WHITELIST.includes(origin)) return cb(null, true);
      return cb(null, true); // dev: allow all
    },
  })
);

app.use(express.json({ limit: "1mb" }));

/* =============================================================================
   UTILITIES: file IO, validation, logs
============================================================================= */
async function ensureUsersFile() {
  try {
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.access(USERS_FILE);
  } catch {
    const seed = [];
    await fs.writeFile(USERS_FILE, JSON.stringify(seed, null, 2), "utf8");
    console.log("ℹ️  users.json yaratildi:", USERS_FILE);
  }
}

async function readUsers() {
  try {
    const buf = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(buf || "[]");
  } catch (e) {
    console.warn("Users file read error:", e.message);
    return [];
  }
}

async function writeUsers(users) {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
  } catch (e) {
    console.error("Users file write error:", e.message);
    throw e;
  }
}

/* -------------------------
   login_passwords helpers
--------------------------*/
async function ensureLoginPasswordsFile() {
  try {
    await fs.mkdir(path.dirname(LOGIN_PASSWORDS_FILE), { recursive: true });
    await fs.access(LOGIN_PASSWORDS_FILE);
  } catch {
    const seed = [];
    await fs.writeFile(LOGIN_PASSWORDS_FILE, JSON.stringify(seed, null, 2), "utf8");
    console.log("ℹ️  login_passwords.json yaratildi:", LOGIN_PASSWORDS_FILE);
  }
}

async function readLoginPasswords() {
  try {
    const buf = await fs.readFile(LOGIN_PASSWORDS_FILE, "utf8");
    return JSON.parse(buf || "[]");
  } catch (e) {
    console.warn("login_passwords read error:", e.message);
    return [];
  }
}

async function writeLoginPasswords(list) {
  try {
    await fs.writeFile(LOGIN_PASSWORDS_FILE, JSON.stringify(list, null, 2), "utf8");
  } catch (e) {
    console.error("login_passwords write error:", e.message);
    throw e;
  }
}

/* ------------------------- end login helpers ---------------------------- */

function normalizeUsername(u = "") {
  return String(u).trim().toLowerCase();
}

function isValidName(name) {
  const n = String(name || "").trim();
  if (n.length < 2 || n.length > 20) return false;
  return /^[a-zA-Z\u0400-\u04FF\s]+$/.test(n);
}

function isValidAge(age) {
  const n = Number(age);
  return Number.isInteger(n) && n >= 10 && n <= 70;
}

function isValidUsername(username) {
  const u = normalizeUsername(username);
  return u.length >= 3 && u.length <= 24 && /^[a-z0-9_]+$/.test(u);
}

function buildAvatar(seed) {
  return `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed || "guest")}`;
}

function logReq(req, res, next) {
  const started = Date.now();
  res.on("finish", () => {
    const ms = Date.now() - started;
    console.log(`${req.method} ${req.originalUrl} — ${res.statusCode} (${ms}ms)`);
  });
  next();
}
app.use(logReq);

/* =============================================================================
   HEALTH & META
============================================================================= */
app.get("/", (_req, res) => {
  res.json({
    ok: true,
    name: "Level99 Backend",
    version: "1.0.0",
    docs: "/api",
    usersFile: USERS_FILE,
    loginPasswordsFile: LOGIN_PASSWORDS_FILE,
  });
});

app.get("/api", (_req, res) => {
  res.json({
    routes: {
      health: "GET /health",
      list: "GET /api/users?search=&sort=&order=&page=&limit=",
      get: "GET /api/users/:id",
      exists: "GET /api/users/exists?username=xxx",
      create: "POST /api/users",
      update: "PUT /api/users/:id",
      remove: "DELETE /api/users/:id",
      stats: "GET /api/stats/all",
      verifyLogin: "POST /api/verify-login",
      savePassword: "POST /api/save-password (and aliases)",
    },
  });
});

app.get("/health", async (_req, res) => {
  await ensureUsersFile();
  await ensureLoginPasswordsFile();
  const users = await readUsers();
  const logins = await readLoginPasswords();
  res.json({ ok: true, usersCount: users.length, loginsCount: logins.length, file: USERS_FILE });
});

/* =============================================================================
   USERS: list + query (search, sort, pagination)
   (these are kept inline for compatibility)
============================================================================= */
// GET /api/users?search=&sort=&order=&page=&limit=
app.get("/api/users", async (req, res) => {
  try {
    await ensureUsersFile();
    const users = await readUsers();

    const search = String(req.query.search || "").trim().toLowerCase();
    let filtered = users;
    if (search) {
      filtered = users.filter((u) => {
        const hay = `${u.name || ""} ${u.username || ""} ${u.career || ""}`.toLowerCase();
        return hay.includes(search);
      });
    }

    const sort = String(req.query.sort || "").toLowerCase();
    const order = String(req.query.order || "asc").toLowerCase();
    const dir = order === "desc" ? -1 : 1;

    const sortable = new Set(["name", "age", "username", "career", "createdAt"]);
    if (sort && sortable.has(sort)) {
      filtered.sort((a, b) => {
        const va = (a?.[sort] ?? "").toString().toLowerCase();
        const vb = (b?.[sort] ?? "").toString().toLowerCase();
        if (va < vb) return -1 * dir;
        if (va > vb) return 1 * dir;
        return 0;
      });
    }

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "50", 10), 1);
    const start = (page - 1) * limit;
    const end = start + limit;
    const slice = filtered.slice(start, end);

    res.json({
      total: filtered.length,
      page,
      limit,
      items: slice,
    });
  } catch (err) {
    console.error("GET /api/users error:", err);
    res.status(500).json({ error: "Users fetch failed" });
  }
});

/* =============================================================================
   USERS: helpers
============================================================================= */
// GET /api/users/exists?username=xxx
app.get("/api/users/exists", async (req, res) => {
  const q = normalizeUsername(req.query.username || "");
  if (!q) return res.status(400).json({ error: "username query is required" });
  await ensureUsersFile();
  const users = await readUsers();
  const exists = users.some((u) => normalizeUsername(u.username) === normalizeUsername(q));
  res.json({ username: q, exists });
});

// GET /api/users/:id
app.get("/api/users/:id", async (req, res) => {
  await ensureUsersFile();
  const users = await readUsers();
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

/* =============================================================================
   USERS: create (Register)
   - if payload.password is present, hash & save to login_passwords.json
============================================================================= */
// POST /api/users
app.post("/api/users", async (req, res) => {
  try {
    await ensureUsersFile();
    await ensureLoginPasswordsFile();

    const users = await readUsers();

    const payload = req.body || {};
    const name = String(payload.name || "").trim();
    const username = normalizeUsername(payload.username || "");
    const age = Number(payload.age);
    const career = String(payload.career || "").trim();
    const plainPassword = payload.password || null;

    const errors = {};
    if (!isValidName(name)) errors.name = "Ism 2–20 oraliqda va faqat harflar bo‘lishi kerak";
    if (!isValidAge(age)) errors.age = "Yosh 10–70 oralig‘ida bo‘lishi kerak";
    if (!isValidUsername(username)) errors.username = "Username 3–24, faqat kichik lotin/raqam/'_' bo‘lishi kerak";
    if (!career) errors.career = "Yo‘nalish (career) talab qilinadi";
    const dup = users.some((u) => normalizeUsername(u.username) === normalizeUsername(username));
    if (dup) errors.username = "Bu username allaqachon band";
    if (Object.keys(errors).length) return res.status(400).json({ error: "Validation error", errors });

    const now = new Date().toISOString();
    const newUser = {
      id: payload.id || uuidv4(),
      name,
      username,
      age,
      career,
      avatar: payload.avatar || buildAvatar(username),
      createdAt: now,
      updatedAt: now,
      answers: {
        cyber: {}, math: {}, chemistry: {}, biology: {}, history: {}, geography: {}, uzbek: {}, english: {}, informatics: {}, blogger: {}, pubg: {},
        ...(payload.answers || {}),
      },
    };

    users.push(newUser);
    await writeUsers(users);

    if (plainPassword) {
      try {
        const hash = await bcrypt.hash(String(plainPassword), 10);
        const logins = await readLoginPasswords();
        const loginEntry = { id: newUser.id, username: newUser.username, passwordHash: hash, createdAt: now };
        logins.push(loginEntry);
        await writeLoginPasswords(logins);
      } catch (e) {
        console.warn("Warning: failed to write login_passwords.json:", e.message);
      }
    }

    res.status(201).json(newUser);
  } catch (err) {
    console.error("POST /api/users error:", err);
    res.status(500).json({ error: "User create failed" });
  }
});

/* =============================================================================
   USERS: update (PUT /api/users/:id) - existing inlined implementation
============================================================================= */
app.put("/api/users/:id", async (req, res) => {
  try {
    await ensureUsersFile();
    await ensureLoginPasswordsFile();

    const users = await readUsers();
    const idx = users.findIndex((u) => u.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "User not found" });

    const current = users[idx];
    const patch = req.body || {};

    if (patch.username) {
      const nu = normalizeUsername(patch.username);
      if (!isValidUsername(nu)) return res.status(400).json({ error: "Invalid username format" });
      const dup = users.some((u, i) => i !== idx && normalizeUsername(u.username) === normalizeUsername(nu));
      if (dup) return res.status(400).json({ error: "Username already taken" });
      patch.username = nu;
      patch.avatar = buildAvatar(nu);
    }

    if (patch.name && !isValidName(patch.name)) return res.status(400).json({ error: "Invalid name" });
    if (patch.age != null && !isValidAge(patch.age)) return res.status(400).json({ error: "Invalid age" });

    const mergedAnswers = { ...current.answers, ...(patch.answers || {}) };
    const updated = { ...current, ...patch, id: current.id, answers: mergedAnswers, updatedAt: new Date().toISOString() };

    users[idx] = updated;
    await writeUsers(users);

    if (patch.password) {
      try {
        const logins = await readLoginPasswords();
        const li = logins.findIndex((l) => l.id === current.id || l.username === current.username);
        const hash = await bcrypt.hash(String(patch.password), 10);
        if (li !== -1) {
          logins[li] = { ...logins[li], passwordHash: hash, updatedAt: new Date().toISOString() };
        } else {
          logins.push({ id: current.id, username: updated.username, passwordHash: hash, createdAt: new Date().toISOString() });
        }
        await writeLoginPasswords(logins);
      } catch (e) {
        console.warn("Warning: failed to update login_passwords.json:", e.message);
      }
    }

    res.json(updated);
  } catch (err) {
    console.error("PUT /api/users/:id error:", err);
    res.status(500).json({ error: "User update failed" });
  }
});

/* =============================================================================
   USERS: delete
============================================================================= */
app.delete("/api/users/:id", async (req, res) => {
  try {
    await ensureUsersFile();
    await ensureLoginPasswordsFile();

    const users = await readUsers();
    const next = users.filter((u) => u.id !== req.params.id);
    if (next.length === users.length) return res.status(404).json({ error: "User not found" });
    await writeUsers(next);

    try {
      const logins = await readLoginPasswords();
      const filtered = logins.filter((l) => l.id !== req.params.id && l.username !== req.params.id);
      await writeLoginPasswords(filtered);
    } catch (e) {
      console.warn("Warning: failed to update login_passwords.json on delete:", e.message);
    }

    res.json({ ok: true, id: req.params.id });
  } catch (err) {
    console.error("DELETE /api/users/:id error:", err);
    res.status(500).json({ error: "User delete failed" });
  }
});

/* =============================================================================
   STATS
============================================================================= */
app.get("/api/stats/all", async (_req, res) => {
  try {
    await ensureUsersFile();
    const users = await readUsers();

    const totalUsers = users.length;
    const careers = {};
    const ageGroups = { "15-18": 0, "19-22": 0, "23+": 0 };

    for (const u of users) {
      if (u.career) careers[u.career] = (careers[u.career] || 0) + 1;
      const a = Number(u.age);
      if (Number.isInteger(a)) {
        if (a >= 15 && a <= 18) ageGroups["15-18"]++;
        else if (a >= 19 && a <= 22) ageGroups["19-22"]++;
        else if (a >= 23) ageGroups["23+"]++;
      }
    }

    let topCareer = null;
    let topCount = 0;
    for (const [c, n] of Object.entries(careers)) {
      if (n > topCount) {
        topCareer = c;
        topCount = n;
      }
    }

    res.json({ totalUsers, careers, ageGroups, topCareer, topCount });
  } catch (err) {
    console.error("GET /api/stats/all error:", err);
    res.status(500).json({ error: "Stats failed" });
  }
});

/* =============================================================================
   ACTIVE USERS
============================================================================= */
const activeUsersFile = path.join(__dirname, "./src/data/activeUsers.json");

app.get("/api/active-users", async (req, res) => {
  try {
    const data = await fs.readFile(activeUsersFile, "utf-8");
    const users = JSON.parse(data || "[]");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to read active users" });
  }
});

app.post("/api/active-users", async (req, res) => {
  try {
    const newUser = req.body;
    const data = await fs.readFile(activeUsersFile, "utf-8");
    const users = JSON.parse(data || "[]");
    users.push(newUser);
    await fs.writeFile(activeUsersFile, JSON.stringify(users, null, 2));
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to save active user" });
  }
});

/* =============================================================================
   NEW: Compatibility endpoints for frontend (verify-login + save-password aliases)
   These endpoints let LoginWithCreate.jsx talk to the server without changing frontend.
============================================================================= */

/**
 * POST /api/verify-login
 * body: { username, password }
 * - If login record exists -> bcrypt.compare -> return user
 * - If login record doesn't exist but user exists -> create login record (hash) and return user
 */
app.post("/api/verify-login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ ok: false, message: "username & password required" });

    const normalized = normalizeUsername(username);
    await ensureUsersFile();
    await ensureLoginPasswordsFile();

    const users = await readUsers();
    const logins = await readLoginPasswords();

    const recIdx = logins.findIndex((r) => normalizeUsername(r.username) === normalized);
    const rec = recIdx !== -1 ? logins[recIdx] : null;

    if (rec) {
      const match = await bcrypt.compare(String(password), rec.passwordHash);
      if (!match) return res.status(401).json({ ok: false, message: "Incorrect password" });

      // update lastLogin
      logins[recIdx] = { ...rec, lastLogin: new Date().toISOString() };
      try { await writeLoginPasswords(logins); } catch (e) { console.warn("Failed to update login_passwords lastLogin:", e.message); }

      const user = users.find((u) => u.id === rec.id) || users.find((u) => normalizeUsername(u.username) === normalized);
      return res.json({ ok: true, user: user ? { ...user, passwordHash: undefined } : { username } });
    }

    // no login record -> try to find user and create login record
    const user = users.find((u) => normalizeUsername(u.username) === normalized);
    if (!user) {
      // demo fallback
      if (username === "demo" && password === "demo123") {
        return res.json({ ok: true, user: { username: "demo", name: "Demo User" } });
      }
      return res.status(401).json({ ok: false, message: "User not found" });
    }

    // create login record with provided password
    try {
      const now = new Date().toISOString();
      const hash = await bcrypt.hash(String(password), 10);
      const loginRecordsNew = await readLoginPasswords();
      loginRecordsNew.push({
        id: user.id,
        username: user.username,
        passwordHash: hash,
        securityAnswerHash: null,
        createdAt: now,
        firstLoginCreatedAt: now,
      });
      await writeLoginPasswords(loginRecordsNew);
      return res.json({ ok: true, user });
    } catch (e) {
      console.error("Failed to create login record in verify-login:", e);
      return res.status(500).json({ ok: false, message: "Server error while creating login record" });
    }
  } catch (err) {
    console.error("POST /api/verify-login error:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
});

/**
 * Generic handler to save/update a password on server.
 * body: { username, password }
 * Exposed on several aliases to match frontend attempts.
 */
async function handleSavePassword(req, res) {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ ok: false, message: "username & password required" });

    const normalized = normalizeUsername(username);
    await ensureUsersFile();
    await ensureLoginPasswordsFile();

    const users = await readUsers();
    const user = users.find((u) => normalizeUsername(u.username) === normalized);

    const logins = await readLoginPasswords();
    const idx = logins.findIndex((r) => normalizeUsername(r.username) === normalized);

    const now = new Date().toISOString();
    const hash = await bcrypt.hash(String(password), 10);

    if (idx !== -1) {
      logins[idx] = { ...logins[idx], username: user ? user.username : normalized, passwordHash: hash, updatedAt: now };
    } else {
      logins.push({
        id: user ? user.id : uuidv4(),
        username: user ? user.username : normalized,
        passwordHash: hash,
        securityAnswerHash: null,
        createdAt: now,
      });
    }

    await writeLoginPasswords(logins);
    return res.json({ ok: true, message: "Password saved" });
  } catch (err) {
    console.error("POST /api/save-password error:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
}

app.post("/api/save-password", handleSavePassword);
app.post("/api/save-login", handleSavePassword);
app.post("/api/login/save-password", handleSavePassword);
app.post("/api/login-passwords", handleSavePassword);

/* =============================================================================
   404 HANDLER — must be last
============================================================================= */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

/* =============================================================================
   Startup: ensure files + listen
============================================================================= */
await ensureUsersFile();
await ensureLoginPasswordsFile();

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📄 Users JSON: ${USERS_FILE}`);
  console.log(`🔐 Login passwords JSON: ${LOGIN_PASSWORDS_FILE}`);
});
