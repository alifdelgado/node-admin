import { Router } from "express";
import permissionController from "../controllers/permission.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.get("/permissions", authMiddleware, permissionController.permissions);

export default router;
