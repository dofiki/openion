import { Router } from "express";
import passport from "passport";
import { 
    dashboardRoute, 
    loginRoute, 
    logoutRoute, 
    registerRoute 
} from "../controllers/login.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router.post("/register", registerRoute);
router.post("/login", passport.authenticate("local"), loginRoute);
router.get("/logout", logoutRoute);
router.get("/dashboard", isAuthenticated, dashboardRoute);

export default router;
