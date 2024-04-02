import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";
import { DocumentInterface } from "@src/database/connection.js";

// https://github.com/mikeerickson/validatorjs
export const validate = (document: DocumentInterface) => {
  try {
    const validation = new Validatorjs(document, {
      name: "required|string",
      number: "required|string",
      type: "required|string",
      category: "required|string",
      increasing_in: "required|string",
    });

    if (validation.fails()) {
      throw new ApiError(422, validation.errors.errors);
    }
  } catch (error) {
    throw error;
  }
};
