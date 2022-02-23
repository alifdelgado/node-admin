import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies["jwt"];
    const payload: any = verify(jwt, process.env.SECRET_KEY!);
    if (!payload) return res.status(401).send({ message: "unauthenticated" });
    const repository = getManager().getRepository(User);
    req["user"] = await repository.findOne(payload.id);
    next();
  } catch (e) {
    return res.status(401).send({ message: "unauthenticated" });
  }
};

export default authMiddleware;
