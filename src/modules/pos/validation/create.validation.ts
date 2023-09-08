import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";
import { DocumentInterface } from "@src/database/connection.js";

// https://github.com/mikeerickson/validatorjs
export const validate = (document: DocumentInterface) => {
  try {
    const validation = new Validatorjs(document, {
      warehouse_id: "required|string",
      customer_id: "string",
      "items.*._id": "required|string",
      "items.*.name": "required|string",
      "items.*.size": "required|string",
      "items.*.price": "required|number",
      "items.*.quantity": "required|number",
      "items.*.total": "required|number",
      totalQuantity: "required|number",
      totalPrice: "required|number",
      paymentType: "required|string",
    });

    if (validation.fails()) {
      throw new ApiError(422, validation.errors.errors);
    }
  } catch (error) {
    throw error;
  }
};
