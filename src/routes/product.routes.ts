import { Router } from "express";
import productController from "../controllers/product.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.get("/products", authMiddleware, productController.getProducts);
router.get("/products/:id", authMiddleware, productController.getProductById);
router.post("/products", authMiddleware, productController.createProduct);
router.put("/products/:id", authMiddleware, productController.updateProduct);
router.delete("/products/:id", authMiddleware, productController.deleteProduct);

export default router;
