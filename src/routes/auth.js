import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../prisma.js";
import passport from "../auth/passport.js";

const router = Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const existe = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existe) {
    return res.status(400).json({ error: "El email o usuario ya está en uso" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, email, passwordHash },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.status(201).json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
});

// GET /api/auth/google — inicia el flujo OAuth con Google (redirige al browser)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }));

// GET /api/auth/google/callback — Google redirige acá con el código
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "lossimuladores://auth?error=true" }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    const params = new URLSearchParams({
      token,
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
    res.redirect(`lossimuladores://auth?${params}`);
  }
);

// POST /api/auth/google/token — recibe el access token de Google y devuelve JWT propio
router.post("/google/token", async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "Token requerido" });
  }

  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    return res.status(401).json({ error: "Token de Google inválido" });
  }

  const googleUser = await response.json();

  const user = await prisma.user.upsert({
    where: { email: googleUser.email },
    update: { avatarUrl: googleUser.picture, googleId: googleUser.sub },
    create: {
      email: googleUser.email,
      username: googleUser.email.split("@")[0],
      googleId: googleUser.sub,
      avatarUrl: googleUser.picture,
    },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role, avatarUrl: user.avatarUrl } });
});

export default router;
