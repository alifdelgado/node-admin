import { Response, Request } from "express";
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";

const getUsers = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  const data = await repository.find({
    relations: ["role"],
  });
  const users = data.map((item) => {
    const { password, ...data } = item;
    return data;
  });
  res.send(users);
};

const getUserById = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  const { password, ...user } = await repository.findOne(req.params.id, {
    relations: ["role"],
  });
  res.send(user);
};

const createUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const hashedPassword = await bcryptjs.hash("password", 10);
  const repository = getManager().getRepository(User);
  const { password, ...user } = await repository.save({
    ...body,
    password: hashedPassword,
    role: {
      id: role_id,
    },
  });

  res.send(user);
};

const updateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body;
  const repository = getManager().getRepository(User);
  await repository.update(req.params.id, {
    ...body,
    role: {
      id: role_id,
    },
  });
  const { password, ...user } = await repository.findOne(req.params.id);
  res.send(user);
};

const deleteUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User);
  await repository.delete(req.params.id);
  res.send(null);
};

export default {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
