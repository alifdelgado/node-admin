import { Response, Request } from "express";
import { getManager } from "typeorm";
import { Role } from "../entity/role.entity";

const roles = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);
  res.send(await repository.find());
};

const getRoleById = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);
  const role = await repository.findOne(req.params.id, {
    relations: ["permissions"],
  });
  res.send(role);
};

const createRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;
  const repository = getManager().getRepository(Role);
  const role = await repository.save({
    name,
    permissions: permissions.map((id) => ({ id })),
  });
  res.send(role);
};

const updateRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;
  const repository = getManager().getRepository(Role);
  const role = await repository.update(req.params.id, {
    name,
    permissions: permissions.map((id) => ({ id })),
  });
  res.send(role);
};

const deleteRole = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role);
  await repository.delete(req.params.id);
  res.send(null);
};

export default {
  roles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole,
};
