import express, { Express } from "express";
import brancExpenseRouter from "./modules/branch-expense/router.js";
import customerRouter from "./modules/customer/router.js";
import financeRouter from "./modules/finance/router.js";
import inventoryRouter from "./modules/inventory/router.js";
import itemRouter from "./modules/item/router.js";
import itemCategoryRouter from "./modules/item-category/router.js";
import posRouter from "./modules/pos/router.js";
import purchaseRouter from "./modules/purchase/router.js";
import stockCorrectionRouter from "./modules/stock-correction/router.js";
import stockOpnameRouter from "./modules/stock-opname/router.js";
import supplierRouter from "./modules/supplier/router.js";
import transferItemRouter from "./modules/transfer-item/router.js";
import userRouter from "./modules/user/router.js";
import warehouseRouter from "./modules/warehouse/router.js";

export default function () {
  const app: Express = express();

  /**
   * Register all available modules
   * <modules>/router.ts
   */
  app.use("/v1/users", userRouter);
  app.use("/v1/warehouses", warehouseRouter);
  app.use("/v1/suppliers", supplierRouter);
  app.use("/v1/customers", customerRouter);
  app.use("/v1/item-categories", itemCategoryRouter);
  app.use("/v1/items", itemRouter);
  app.use("/v1/purchases", purchaseRouter);
  app.use("/v1/transfer-items", transferItemRouter);
  app.use("/v1/stock-corrections", stockCorrectionRouter);
  app.use("/v1/stock-opnames", stockOpnameRouter);
  app.use("/v1/branch-expenses", brancExpenseRouter);
  app.use("/v1/inventories", inventoryRouter);
  app.use("/v1/finances", financeRouter);
  app.use("/v1/pos", posRouter);
  return app;
}
