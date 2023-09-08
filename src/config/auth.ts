import { config } from "dotenv";
import { setupEnvironment } from "./environment.js";

setupEnvironment(process.env.NODE_ENV as string);
config();

export const issuer = "pointhub";
export const secretKey = "secret1234";
