import "reflect-metadata";
import cors from "cors";
import morgan from "morgan";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import productRoutes from "./routes/product.routes";
import permissionRoutes from "./routes/permission.routes";

const app: Application = express();
createConnection();

app.set("port", process.env.PORT);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3005"],
  })
);
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", roleRoutes);
app.use("/api", productRoutes);
app.use("/api", permissionRoutes);

export default app;
