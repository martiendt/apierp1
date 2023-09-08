import { UserRolesTypes, UserStatusTypes } from "./user.entity.js";
import { hash } from "@src/utils/hash.js";

export const userSeeds = [
  {
    name: "Admin",
    username: "admin",
    password: await hash("admn2023"),
    role: UserRolesTypes.Administrator,
    status: UserStatusTypes.Active,
    createdAt: new Date(),
  },
];
