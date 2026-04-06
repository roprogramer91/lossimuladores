import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

// GET /api/episodes/:id — trae un episodio por id
router.get("/:id", async (req, res) => {
  const episode = await prisma.episode.findUnique({
    where: { id: Number(req.params.id) },
    include: { season: true },
  });

  if (!episode) {
    return res.status(404).json({ error: "Episodio no encontrado" });
  }

  res.json(episode);
});

export default router;
