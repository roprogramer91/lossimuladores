import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

// GET /api/seasons — trae todas las temporadas
router.get("/", async (req, res) => {
  const seasons = await prisma.season.findMany({
    orderBy: { number: "asc" },
  });
  res.json(seasons);
});

// GET /api/seasons/:id — trae una temporada con sus episodios
router.get("/:id", async (req, res) => {
  const season = await prisma.season.findUnique({
    where: { id: Number(req.params.id) },
    include: {
      episodes: {
        orderBy: { number: "asc" },
      },
    },
  });

  if (!season) {
    return res.status(404).json({ error: "Temporada no encontrada" });
  }

  res.json(season);
});

export default router;
