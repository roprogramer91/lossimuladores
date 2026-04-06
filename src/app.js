import "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "./auth/passport.js";
import seasonsRouter from "./routes/seasons.js";
import episodesRouter from "./routes/episodes.js";
import authRouter from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API Los Simuladores funcionando" });
});

// Rutas
app.use("/api/auth", authRouter);
app.use("/api/seasons", seasonsRouter);
app.use("/api/episodes", episodesRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
