import { Router } from "express";
import passport from "passport";
import {
    githubCallback,
    githubRegister,
    login,
    logout,
    register,
} from "../../controllers/jwtControllers.js";

const router = Router();

// Register con control de errores
router.post(
    "/register",
    (req, res, next) => {
        passport.authenticate("register", { session: false }, (err, user, info) => {
            if (err) {
                console.error("Error en passport:", err);
                return res.status(500).json({ error: "Error interno en el servidor." });
            }
            if (!user) {
                return res.status(400).json({ error: info?.message || "Registro inválido." });
            }
            req.user = user; // Paso el usuario al siguiente middleware
            next();
        })(req, res, next);
    },
    register
);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Github register
router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
    githubRegister
);

// Github callback
router.get(
    "/githubcallback",
    passport.authenticate("github", {
        session: false,
        failureRedirect: "/github/error",
    }),
    githubCallback
);

export default router;