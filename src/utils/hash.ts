import * as argon2 from "argon2";

export const hash = async (password: string) => {
  return await argon2.hash(password);
};

export const verify = async (hashPassword: string, password: string) => {
  return await argon2.verify(hashPassword, password);
};
