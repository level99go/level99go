// routes/users.js
import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Data file paths (relative to project root)
const usersFile = path.join(__dirname, "../src/data/users.json");
const activeUsersFile = path.join(__dirname, "../src/data/activeUsers.json");
const loginPasswordsFile = path.join(__dirname, "../src/data/login_passwords.json");
const alertsFile = path.join(__dirname, "../src/data/alerts.json");

const SALT_ROUNDS = 10;

/* =========================
   Helpers: ensure / read / write
   - resilient to missing dirs / corrupted JSON
========================= */
const ensureFile = async (file, seed = "[]") => {
  try {
    await fs.access(file);
  } catch {
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, seed, "utf-8");
  }
};

const readJSON = async (file) => {
  await ensureFile(file);
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (e) {
    console.warn(`Warning: JSON parse failed for ${file}, resetting to empty array.`, e.message);
    await fs.writeFile(file, "[]", "utf-8");
    return [];
  }
};

const writeJSON = async (file, data) => {
  await fs.mkdir(path.dirname(file), { recursive: true });
  // write atomically: write to tmp then rename (best-effort)
  const tmp = `${file}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmp, file);
};

/* Convenience wrappers */
const readUsers = async () => readJSON(usersFile);
const writeUsers = async (arr) => writeJSON(usersFile, arr);
const readActiveUsers = async () => readJSON(activeUsersFile);
const writeActiveUsers = async (arr) => writeJSON(activeUsersFile, arr);
const readLoginPasswords = async () => readJSON(loginPasswordsFile);
const writeLoginPasswords = async (arr) => writeJSON(loginPasswordsFile, arr);
const readAlerts = async () => readJSON(alertsFile);
const writeAlerts = async (arr) => writeJSON(alertsFile, arr);

/* =========================
   Active users helper
========================= */
const addToActiveUsers = async (user) => {
  const active = await readActiveUsers();
  const idx = active.findIndex((u) => u.id === user.id);
  if (idx !== -1) {
    active[idx] = { ...active[idx], ...user, updatedAt: new Date().toISOString() };
  } else {
    active.push({ ...user, createdAt: new Date().toISOString() });
  }
  await writeActiveUsers(active);
};

/* =========================
   Validation helpers
========================= */
const normalizeUsername = (u = "") => String(u || "").trim().toLowerCase();

const isValidName = (name) => {
  const n = String(name || "").trim();
  return n.length >= 2 && n.length <= 20 && /^[a-zA-Z\u0400-\u04FF\s]+$/.test(n);
};
const isValidAge = (age) => {
  const n = Number(age);
  return Number.isInteger(n) && n >= 10 && n <= 70;
};
const isValidUsername = (username) => {
  const u = normalizeUsername(username);
  return u.length >= 3 && u.length <= 24 && /^[a-z0-9_]+$/.test(u);
};
const buildAvatar = (seed) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(seed || "guest")}`;

function sanitizeUserForResponse(u) {
  if (!u) return null;
  // Return a shallow copy; avoid leaking server-only fields
  const { /* no secret fields currently stored on user object */ ...rest } = u;
  return rest;
}

/* =========================
   ROUTES
========================= */

/**
 * GET /active-users
 */
router.get("/active-users", async (_req, res) => {
  try {
    const items = await readActiveUsers();
    res.json({ total: items.length, items });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * POST /active-users
 */
router.post("/active-users", async (req, res) => {
  try {
    const user = req.body || {};
    if (!user.id) user.id = uuidv4();
    await addToActiveUsers(user);
    res.status(201).json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * GET /  (list users summary with search, sort, pagination)
 * Query params: search, level, sort, order, page, limit
 */
router.get("/", async (req, res) => {
  try {
    const users = await readUsers();

    const search = String(req.query.search || "").trim().toLowerCase();
    let filtered = users;
    if (search) {
      filtered = filtered.filter((u) =>
        `${u.name || ""} ${u.username || ""} ${u.career || ""}`.toLowerCase().includes(search)
      );
    }

    const levelQ = req.query.level ? Number(req.query.level) : null;
    if (levelQ != null && !Number.isNaN(levelQ)) {
      filtered = filtered.filter((u) => Number(u.level || 0) === levelQ);
    }

    const sort = String(req.query.sort || "").toLowerCase();
    const order = String(req.query.order || "asc").toLowerCase();
    const dir = order === "desc" ? -1 : 1;
    const sortable = new Set(["name", "age", "username", "career", "createdAt", "level"]);

    if (sort && sortable.has(sort)) {
      filtered.sort((a, b) => {
        let va = a?.[sort];
        let vb = b?.[sort];
        if (sort === "age" || sort === "level") {
          va = Number(va || 0);
          vb = Number(vb || 0);
          return (va - vb) * dir;
        }
        va = String(va || "").toLowerCase();
        vb = String(vb || "").toLowerCase();
        if (va < vb) return -1 * dir;
        if (va > vb) return 1 * dir;
        return 0;
      });
    }

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit).map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      avatar: u.avatar,
      level: u.level || 0,
      career: u.career,
      createdAt: u.createdAt,
    }));

    res.json({ total: filtered.length, page, limit, items });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * GET /:id  (single user)
 */
router.get("/:id", async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: true, message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

/* =========================
   AUTH: register, login, verify
========================= */

/**
 * POST /register
 * body: { name, username, age, career, password, securityQuestion?, securityAnswer? }
 */
router.post("/register", async (req, res) => {
  try {
    const { name, username, age, career, password, securityQuestion, securityAnswer } = req.body || {};

    const errors = {};
    if (!isValidName(name)) errors.name = "Ism 2–20 oralig'ida va faqat harflar bo'lishi kerak";
    if (!isValidAge(age)) errors.age = "Yosh 10–70 oralig'ida bo'lishi kerak";
    if (!isValidUsername(username)) errors.username = "Username noto'g'ri formatda (3-24, a-z0-9_)";
    if (!password || typeof password !== "string" || password.length < 6)
      errors.password = "Parol kamida 6 belgidan iborat bo'lishi kerak";

    const users = await readUsers();
    if (users.some((u) => normalizeUsername(u.username) === normalizeUsername(username))) {
      errors.username = "Bu username allaqachon band";
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ error: true, message: "Validation error", fields: errors });
    }

    const now = new Date().toISOString();
    const newUser = {
      id: uuidv4(),
      name: String(name).trim(),
      username: normalizeUsername(username),
      age: Number(age),
      career: String(career || "").trim(),
      level: 0,
      avatar: buildAvatar(username),
      createdAt: now,
      updatedAt: now,
      answers: {
        cyber: {},
        math: {},
        chemistry: {},
        biology: {},
        history: {},
        geography: {},
        uzbek: {},
        english: {},
        informatics: {},
        blogger: {},
        pubg: {},
        // merge extras if provided later
      },
      securityQuestion: securityQuestion || null,
    };

    // Hash password and optional security answer
    const hash = await bcrypt.hash(String(password), SALT_ROUNDS);
    const answerHash = securityAnswer ? await bcrypt.hash(String(securityAnswer), SALT_ROUNDS) : null;

    // persist
    users.push(newUser);
    await writeUsers(users);
    await addToActiveUsers(newUser);

    // persist login record (non-fatal if write fails)
    try {
      const loginRecords = await readLoginPasswords();
      loginRecords.push({
        id: newUser.id,
        username: newUser.username,
        passwordHash: hash,
        securityAnswerHash: answerHash,
        createdAt: now,
      });
      await writeLoginPasswords(loginRecords);
    } catch (e) {
      console.warn("Warning: failed to write login_passwords.json:", e.message);
    }

    res.status(201).json({ ok: true, user: sanitizeUserForResponse(newUser) });
  } catch (err) {
    console.error("POST /register error:", err);
    res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * POST /login
 * body: { username, password }
 *
 * Behavior:
 *  - If login record exists: bcrypt.compare -> success/fail
 *  - If login record doesn't exist but user exists in users.json:
 *      -> create login record (hash provided password) and accept login (first-login registration)
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ ok: false, message: "username & password required" });

    const normalized = normalizeUsername(username);
    const loginRecords = await readLoginPasswords();
    const recIdx = loginRecords.findIndex((r) => normalizeUsername(r.username) === normalized);
    const rec = recIdx !== -1 ? loginRecords[recIdx] : null;

    // handle demo shortcut
    if (!rec && username === "demo" && password === "demo123") {
      return res.json({ ok: true, userId: "demo", requires2ndStep: false });
    }

    if (rec) {
      const match = await bcrypt.compare(String(password), rec.passwordHash);
      if (!match) return res.status(401).json({ ok: false, message: "Parol noto'g'ri" });

      // update lastLogin
      loginRecords[recIdx] = { ...rec, lastLogin: new Date().toISOString() };
      try { await writeLoginPasswords(loginRecords); } catch (e) { console.warn("Failed to write login_passwords on login:", e.message); }

      // find user and check security question presence
      const users = await readUsers();
      const u = users.find((x) => x.id === rec.id);
      const question = u?.securityQuestion || null;
      return res.json({ ok: true, userId: rec.id, requires2ndStep: !!question, question });
    }

    // no login rec -> try to find user and create login record (first login)
    const users = await readUsers();
    const user = users.find((u) => normalizeUsername(u.username) === normalized);
    if (!user) {
      return res.status(401).json({ ok: false, message: "Foydalanuvchi topilmadi yoki parol noto'g'ri" });
    }

    // create login record
    try {
      const now = new Date().toISOString();
      const hash = await bcrypt.hash(String(password), SALT_ROUNDS);
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
      return res.json({ ok: true, userId: user.id, requires2ndStep: false, note: "Login record created on first login" });
    } catch (e) {
      console.error("Failed to create login record on first login:", e);
      return res.status(500).json({ ok: false, message: "Server error while creating login record" });
    }
  } catch (err) {
    console.error("POST /login error:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
});

/**
 * POST /verify
 * body: { userId, answer }
 */
router.post("/verify", async (req, res) => {
  try {
    const { userId, answer } = req.body || {};
    if (!userId || !answer) return res.status(400).json({ ok: false, message: "userId and answer required" });

    const loginRecords = await readLoginPasswords();
    const rec = loginRecords.find((r) => r.id === userId);
    if (!rec || !rec.securityAnswerHash) return res.status(400).json({ ok: false, message: "No 2nd-step configured" });

    const match = await bcrypt.compare(String(answer), rec.securityAnswerHash);
    if (!match) return res.status(401).json({ ok: false, message: "2-chi javob noto'g'ri" });

    return res.json({ ok: true, userId });
  } catch (err) {
    console.error("POST /verify error:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
});

/* =========================
   Compatibility endpoints used by frontend
   - POST /verify-login
   - POST /save-password  (and aliases)
========================= */

/**
 * POST /verify-login
 * body: { username, password }
 * returns: { ok: true, user: {...} } or { ok:false, message }
 */
router.post("/verify-login", async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ ok: false, message: "username & password required" });

    const normalized = normalizeUsername(username);
    const loginRecords = await readLoginPasswords();
    const recIdx = loginRecords.findIndex((r) => normalizeUsername(r.username) === normalized);
    const rec = recIdx !== -1 ? loginRecords[recIdx] : null;

    if (rec) {
      const match = await bcrypt.compare(String(password), rec.passwordHash);
      if (!match) return res.status(401).json({ ok: false, message: "Incorrect password" });

      // update lastLogin
      loginRecords[recIdx] = { ...rec, lastLogin: new Date().toISOString() };
      try { await writeLoginPasswords(loginRecords); } catch (e) { console.warn("Failed to update login_passwords lastLogin:", e.message); }

      const users = await readUsers();
      const user = users.find((u) => u.id === rec.id) || users.find((u) => normalizeUsername(u.username) === normalized);
      return res.json({ ok: true, user: sanitizeUserForResponse(user) || { username } });
    }

    // no login record -> try to create one if user exists
    const users = await readUsers();
    const user = users.find((u) => normalizeUsername(u.username) === normalized);
    if (!user) {
      if (username === "demo" && password === "demo123") {
        return res.json({ ok: true, user: { username: "demo", name: "Demo User" } });
      }
      return res.status(401).json({ ok: false, message: "User not found" });
    }

    try {
      const now = new Date().toISOString();
      const hash = await bcrypt.hash(String(password), SALT_ROUNDS);
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
      return res.json({ ok: true, user: sanitizeUserForResponse(user), note: "Login record created on first verify-login" });
    } catch (e) {
      console.error("Failed to create login record in verify-login:", e);
      return res.status(500).json({ ok: false, message: "Server error while creating login record" });
    }
  } catch (err) {
    console.error("POST /verify-login error:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
});

/**
 * POST /save-password  (also alias routes)
 * body: { username, password }
 *
 * This writes/updates login_passwords.json.
 */
async function handleSavePassword(req, res) {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ ok: false, message: "username & password required" });

    const normalized = normalizeUsername(username);
    const users = await readUsers();
    const user = users.find((u) => normalizeUsername(u.username) === normalized);

    const loginRecords = await readLoginPasswords();
    const idx = loginRecords.findIndex((r) => normalizeUsername(r.username) === normalized);

    const now = new Date().toISOString();
    const hash = await bcrypt.hash(String(password), SALT_ROUNDS);

    if (idx !== -1) {
      loginRecords[idx] = {
        ...loginRecords[idx],
        username: user ? user.username : normalized,
        passwordHash: hash,
        updatedAt: now,
      };
    } else {
      loginRecords.push({
        id: user ? user.id : uuidv4(),
        username: user ? user.username : normalized,
        passwordHash: hash,
        securityAnswerHash: null,
        createdAt: now,
      });
    }

    await writeLoginPasswords(loginRecords);
    return res.json({ ok: true, message: "Password saved" });
  } catch (err) {
    console.error("POST /save-password error:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
}

router.post("/save-password", handleSavePassword);
router.post("/save-login", handleSavePassword);
router.post("/login/save-password", handleSavePassword);
router.post("/login-passwords", handleSavePassword);

/* =========================
   Create / Update / Delete Users (public API)
========================= */

/**
 * POST /  (create user without password)
 */
router.post("/", async (req, res) => {
  try {
    const { name, username, age, career, followersCount = 0, level = 0 } = req.body || {};
    const errors = {};
    if (!isValidName(name)) errors.name = "Ism 2–20 oraliqda bo‘lishi kerak";
    if (!isValidAge(age)) errors.age = "Yosh 10–70 oraliqda bo‘lishi kerak";
    if (!isValidUsername(username)) errors.username = "Username noto‘g‘ri formatda";

    const users = await readUsers();
    if (users.some((u) => normalizeUsername(u.username) === normalizeUsername(username))) {
      errors.username = "Bu username allaqachon band";
    }
    if (Object.keys(errors).length) {
      return res.status(400).json({ error: true, message: "Validation error", fields: errors });
    }

    const now = new Date().toISOString();
    const newUser = {
      id: uuidv4(),
      name: String(name).trim(),
      username: normalizeUsername(username),
      age: Number(age),
      career: String(career || "").trim(),
      followersCount,
      level,
      avatar: buildAvatar(username),
      createdAt: now,
      updatedAt: now,
      answers: {
        cyber: {}, math: {}, chemistry: {}, biology: {}, history: {}, geography: {}, uzbek: {}, english: {}, informatics: {}, blogger: {}, pubg: {}
      }
    };

    users.push(newUser);
    await writeUsers(users);
    await addToActiveUsers(newUser);

    res.status(201).json(newUser);
  } catch (err) {
    console.error("POST / error:", err);
    res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * PUT /:id (update)
 */
router.put("/:id", async (req, res) => {
  try {
    const users = await readUsers();
    const idx = users.findIndex((u) => u.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: true, message: "User not found" });

    const current = users[idx];
    const patch = req.body || {};

    if (patch.username) {
      if (!isValidUsername(patch.username)) {
        return res.status(400).json({ error: true, message: "Invalid username" });
      }
      if (users.some((u, i) => i !== idx && normalizeUsername(u.username) === normalizeUsername(patch.username))) {
        return res.status(400).json({ error: true, message: "Username already taken" });
      }
      patch.username = normalizeUsername(patch.username);
      patch.avatar = buildAvatar(patch.username);

      // update login_passwords entry username if exists
      const loginRecords = await readLoginPasswords();
      const recIdx = loginRecords.findIndex((r) => r.id === current.id);
      if (recIdx !== -1) {
        loginRecords[recIdx].username = patch.username;
        await writeLoginPasswords(loginRecords);
      }
    }

    if (patch.name && !isValidName(patch.name)) {
      return res.status(400).json({ error: true, message: "Invalid name" });
    }
    if (patch.age && !isValidAge(patch.age)) {
      return res.status(400).json({ error: true, message: "Invalid age" });
    }

    const mergedAnswers = { ...current.answers, ...(patch.answers || {}) };

    const updated = {
      ...current,
      ...patch,
      answers: mergedAnswers,
      id: current.id,
      updatedAt: new Date().toISOString(),
    };

    users[idx] = updated;
    await writeUsers(users);
    await addToActiveUsers(updated);

    // if password provided in patch -> update login_passwords
    if (patch.password) {
      try {
        const logins = await readLoginPasswords();
        const li = logins.findIndex((l) => l.id === current.id || normalizeUsername(l.username) === normalizeUsername(current.username));
        const hash = await bcrypt.hash(String(patch.password), SALT_ROUNDS);
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
    console.error("PUT /:id error:", err);
    res.status(500).json({ error: true, message: err.message });
  }
});

/**
 * DELETE /:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const users = await readUsers();
    const filtered = users.filter((u) => u.id !== req.params.id);
    if (filtered.length === users.length) {
      return res.status(404).json({ error: true, message: "User not found" });
    }
    await writeUsers(filtered);

    // remove from active users
    const active = await readActiveUsers();
    const nextActive = active.filter((u) => u.id !== req.params.id);
    await writeActiveUsers(nextActive);

    // remove corresponding login records
    const loginRecords = await readLoginPasswords();
    const nextLogin = loginRecords.filter((l) => l.id !== req.params.id && normalizeUsername(l.username) !== req.params.id);
    await writeLoginPasswords(nextLogin);

    res.json({ ok: true, id: req.params.id });
  } catch (err) {
    console.error("DELETE /:id error:", err);
    res.status(500).json({ error: true, message: err.message });
  }
});

export default router;
