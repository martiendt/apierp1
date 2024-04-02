import { hash } from "@src/utils/hash.js";

export const coaSeeds = [
  {
    name: "Admin",
    coaname: "admin",
    password: await hash("admn2023"),
    createdAt: new Date(),
  },
];
