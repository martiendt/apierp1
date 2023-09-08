import { ApiError } from "@point-hub/express-error-handler";
import Validatorjs from "validatorjs";
import { DocumentInterface } from "@src/database/connection.js";

// https://github.com/mikeerickson/validatorjs
export const validate = (document: DocumentInterface = {}) => {
  try {
    const validation = new Validatorjs(document, {
      name: "required|string",
      warehouse_id: "required|string",
      supplier_id: "required|string",
      itemCategory_id: "required|string",
      "size.*.label": "required|string",
      "size.*.quantity": "required|number",
      totalQuantity: "required|number",
      price: "required|number",
      totalPrice: "required|number",
      profitMargin: "required|number",
      totalProfit: "required|number",
      totalSelling: "required|number",
      sellingPrice: "required|number",
    });

    if (validation.fails()) {
      throw new ApiError(422, validation.errors.errors);
    }
  } catch (error) {
    throw error;
  }
};
