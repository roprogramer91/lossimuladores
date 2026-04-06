import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../prisma.js";

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

export default router;
