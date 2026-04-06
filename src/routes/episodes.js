import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

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
