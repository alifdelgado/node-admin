import { UserType } from "./src/entity/user.entity";

declare namespace Express {
  export interface Request {
    user: UserType;
  }
}
