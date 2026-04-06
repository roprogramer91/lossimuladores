import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../auth/passport.js";

const router = Router();

// Inicia el flujo de login con Google
// El usuario es redirigido a la pantalla de Google para elegir su cuenta
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

// Google redirige acá después de que el usuario acepta
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/api/auth/error" }),
  (req, res) => {
    // Generamos el JWT con los datos del usuario
    const token = jwt.sign(
      {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    // Redirigimos a la app con el token en la URL
    // La app lo intercepta y lo guarda localmente
    res.redirect(`lossimuladores://auth?token=${token}`);
  }
);

router.get("/error", (req, res) => {
  res.status(401).json({ error: "Error al autenticar con Google" });
});

export default router;
