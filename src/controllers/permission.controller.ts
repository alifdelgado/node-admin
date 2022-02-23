import { Response, Request } from "express";
import { getManager } from "typeorm";
import { Permission } from "../entity/permission.entity";

const permissions = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Permission);
  res.send(await repository.find());
};

export default {
  permissions,
};
