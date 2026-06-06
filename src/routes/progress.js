import { Router } from "express";
import prisma from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/progress — todo el progreso del usuario autenticado
router.get("/", requireAuth, async (req, res) => {
  const progress = await prisma.watchProgress.findMany({
    where: { userId: req.user.id },
    include: {
      episode: {
        select: {
          id: true,
          number: true,
          title: true,
          thumbnailUrl: true,
          durationMin: true,
          seasonId: true,
          season: { select: { number: true } },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
  res.json(progress);
});

// GET /api/progress/:episodeId — progreso de un episodio específico
router.get("/:episodeId", requireAuth, async (req, res) => {
  const progress = await prisma.watchProgress.findUnique({
    where: {
      userId_episodeId: {
        userId: req.user.id,
        episodeId: Number(req.params.episodeId),
      },
    },
  });
  res.json(progress ?? { progressSec: 0, completed: false });
});

// PUT /api/progress/:episodeId — crear o actualizar progreso
router.put("/:episodeId", requireAuth, async (req, res) => {
  const { progressSec, completed } = req.body;
  const episodeId = Number(req.params.episodeId);

  const data = {};
  if (progressSec !== undefined) data.progressSec = progressSec;
  if (completed !== undefined) data.completed = completed;

  const progress = await prisma.watchProgress.upsert({
    where: { userId_episodeId: { userId: req.user.id, episodeId } },
    update: data,
    create: { userId: req.user.id, episodeId, progressSec: progressSec ?? 0, completed: completed ?? false },
  });
  res.json(progress);
});

export default router;
