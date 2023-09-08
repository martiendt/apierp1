import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";
import { DocumentInterface } from "@src/database/connection.js";

// https://github.com/mikeerickson/validatorjs
export const validate = (document: DocumentInterface) => {
  try {
    const validation = new Validatorjs(document, {
      warehouseOrigin_id: "required|string",
      warehouseDestination_id: "required|string",
      "items.*._id": "required|string",
      "items.*.name": "required|string",
      "items.*.color": "required|string",
      "items.*.size": "required|string",
      "items.*.quantity": "required|number",
    });

    if (validation.fails()) {
      throw new ApiError(422, validation.errors.errors);
    }
  } catch (error) {
    throw error;
  }
};
