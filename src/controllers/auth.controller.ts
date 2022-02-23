import bcryptjs from "bcryptjs";
import { getManager } from "typeorm";
import { sign, verify } from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import authValidation from "../validations/auth.validation";

const register = async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = authValidation.registerValidation.validate(body);
  if (error) {
    return res.status(400).send(error.details);
  }

  if (body.password !== body.password_confirm) {
    return res.status(400).send({ message: "Password do not match" });
  }
  const hashPassword = await bcryptjs.hash(body.password, 10);
  const repository = getManager().getRepository(User);
  const user = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: hashPassword,
  });
  return res.status(200).send(user);
};

const login = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  const user = await repository.findOne({ email: req.body.email });
  if (!user) return res.status(404).send({ message: "User not found" });
  const passwordCompare = await bcryptjs.compare(
    req.body.password,
    user.password
  );
  if (!passwordCompare)
    return res.status(400).send({ message: "Invalid credentials" });
  const payload = { id: user.id };
  const token = sign(payload, process.env.SECRET_KEY!);
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  const { password, ...data } = user;
  return res.status(200).send({ message: "User logged successfully" });
};

const authenticatedUser = async (req: Request, res: Response) => {
  const { password, ...user } = req["user"];
  res.send(user);
};

const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).send({ message: "User logged out successfully" });
};

const updateInfo = async (req: Request, res: Response) => {
  const user = req["user"];
  const repository = getManager().getRepository(User);
  await repository.update(user.id, req.body);
  const { ...data } = await repository.findOne(user.id);
  res.status(200).send(data);
};

const updatePassword = async (req: Request, res: Response) => {
  const user = req["user"];
  if (req.body.password !== req.body.password_confirm) {
    return res.status(400).send({ message: "Password do not match" });
  }
  const repository = getManager().getRepository(User);
  await repository.update(user.id, {
    password: await bcryptjs.hash(req.body.password, 10),
  });
};

export default {
  login,
  logout,
  register,
  updateInfo,
  updatePassword,
  authenticatedUser,
};
