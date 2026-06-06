import { Router } from "express";
import prisma from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/favorites — todos los favoritos del usuario
router.get("/", requireAuth, async (req, res) => {
  const favorites = await prisma.favorite.findMany({
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
    orderBy: { createdAt: "desc" },
  });
  res.json(favorites.map((f) => f.episode));
});

// GET /api/favorites/:episodeId — verificar si un episodio está en favoritos
router.get("/:episodeId", requireAuth, async (req, res) => {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_episodeId: {
        userId: req.user.id,
        episodeId: Number(req.params.episodeId),
      },
    },
  });
  res.json({ isFavorite: !!favorite });
});

// POST /api/favorites/:episodeId — agregar a favoritos
router.post("/:episodeId", requireAuth, async (req, res) => {
  const episodeId = Number(req.params.episodeId);
  await prisma.favorite.upsert({
    where: { userId_episodeId: { userId: req.user.id, episodeId } },
    update: {},
    create: { userId: req.user.id, episodeId },
  });
  res.json({ isFavorite: true });
});

// DELETE /api/favorites/:episodeId — quitar de favoritos
router.delete("/:episodeId", requireAuth, async (req, res) => {
  const episodeId = Number(req.params.episodeId);
  await prisma.favorite.deleteMany({
    where: { userId: req.user.id, episodeId },
  });
  res.json({ isFavorite: false });
});

export default router;
