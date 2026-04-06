import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

// GET /api/episodes/random?exclude=5
router.get("/random", async (req, res) => {
  const exclude = req.query.exclude ? Number(req.query.exclude) : null;
  const where = { isPublished: true, ...(exclude ? { id: { not: exclude } } : {}) };

  const count = await prisma.episode.count({ where });
  if (count === 0) return res.status(404).json({ error: "No hay episodios disponibles" });

  const skip = Math.floor(Math.random() * count);
  const episode = await prisma.episode.findFirst({ where, skip, select: { id: true } });
  res.json(episode);
});

// GET /api/episodes/:id — trae un episodio con anterior y siguiente
router.get("/:id", async (req, res) => {
  const episode = await prisma.episode.findUnique({
    where: { id: Number(req.params.id) },
    include: { season: true },
  });

  if (!episode) {
    return res.status(404).json({ error: "Episodio no encontrado" });
  }

  // Buscar episodio anterior (mismo season, número menor)
  const prev = await prisma.episode.findFirst({
    where: { seasonId: episode.seasonId, number: { lt: episode.number } },
    orderBy: { number: "desc" },
    select: { id: true, number: true, title: true },
  });

  // Buscar episodio siguiente (mismo season, número mayor)
  const next = await prisma.episode.findFirst({
    where: { seasonId: episode.seasonId, number: { gt: episode.number } },
    orderBy: { number: "asc" },
    select: { id: true, number: true, title: true },
  });

  res.json({ ...episode, prev, next });
});

export default router;
