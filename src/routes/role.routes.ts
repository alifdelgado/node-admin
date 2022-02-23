import { Router } from "express";
import roleController from "../controllers/role.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.get("/roles", authMiddleware, roleController.roles);
router.get("/roles/:id", authMiddleware, roleController.getRoleById);
router.post("/roles", authMiddleware, roleController.createRole);
router.put("/roles", authMiddleware, roleController.updateRole);
router.delete("/roles", authMiddleware, roleController.deleteRole);

export default router;
