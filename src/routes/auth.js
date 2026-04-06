import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../auth/passport.js";

const router = Router();

// Inicia el flujo de login con Google
// La app le pasa su redirectUri para que el backend sepa a dónde volver
router.get("/google", (req, res, next) => {
  const appRedirect = req.query.redirectUri || "lossimuladores://auth";

  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    // Codificamos el redirectUri en base64 para pasarlo como state
    state: Buffer.from(appRedirect).toString("base64"),
  })(req, res, next);
});

// Google redirige acá después de que el usuario acepta
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/error",
  }),
  (req, res) => {
    // Recuperamos el redirectUri del state
    const appRedirect = req.query.state
      ? Buffer.from(req.query.state, "base64").toString("utf8")
      : "lossimuladores://auth";

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

    res.redirect(`${appRedirect}?token=${token}`);
  }
);

router.get("/error", (req, res) => {
  res.status(401).json({ error: "Error al autenticar con Google" });
});

export default router;
