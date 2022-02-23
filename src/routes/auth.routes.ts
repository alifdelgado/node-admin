import { Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.get("/user", authMiddleware, authController.authenticatedUser);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authMiddleware, authController.logout);
router.put("/users/info", authMiddleware, authController.updateInfo);
router.put("/users/password", authMiddleware, authController.updatePassword);

export default router;
