import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.get("/users", authMiddleware, userController.getUsers);
router.get("/users/:id", authMiddleware, userController.getUserById);
router.post("/users", authMiddleware, userController.createUser);
router.put("/users/:id", authMiddleware, userController.updateUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

export default router;
