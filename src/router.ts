import express, { Express } from "express";
import allocationRouter from "./modules/allocation/router.js";
import allocationGroupRouter from "./modules/allocation-group/router.js";
import branchRouter from "./modules/branch/router.js";
import brancExpenseRouter from "./modules/branch-expense/router.js";
import coaRouter from "./modules/chart-of-account/router.js";
import customerRouter from "./modules/customer/router.js";
import customerGroupRouter from "./modules/customer-group/router.js";
import expeditionRouter from "./modules/expedition/router.js";
import financeRouter from "./modules/finance/router.js";
import inventoryRouter from "./modules/inventory/router.js";
import itemRouter from "./modules/item/router.js";
import itemCategoryRouter from "./modules/item-category/router.js";
import machineRouter from "./modules/machine/router.js";
import posRouter from "./modules/pos/router.js";
import processRouter from "./modules/process/router.js";
import stockCorrectionRouter from "./modules/stock-correction/router.js";
import stockOpnameRouter from "./modules/stock-opname/router.js";
import supplierRouter from "./modules/supplier/router.js";
import supplierGroupRouter from "./modules/supplier-group/router.js";
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
  app.use("/v1/machines", machineRouter);
  app.use("/v1/processes", processRouter);
  app.use("/v1/allocations", allocationRouter);
  app.use("/v1/allocation-groups", allocationGroupRouter);
  app.use("/v1/branches", branchRouter);
  app.use("/v1/warehouses", warehouseRouter);
  app.use("/v1/suppliers", supplierRouter);
  app.use("/v1/coas", coaRouter);
  app.use("/v1/customer-groups", customerGroupRouter);
  app.use("/v1/supplier-groups", supplierGroupRouter);
  app.use("/v1/customers", customerRouter);
  app.use("/v1/expeditions", expeditionRouter);
  app.use("/v1/item-categories", itemCategoryRouter);
  app.use("/v1/items", itemRouter);
  app.use("/v1/transfer-items", transferItemRouter);
  app.use("/v1/stock-corrections", stockCorrectionRouter);
  app.use("/v1/stock-opnames", stockOpnameRouter);
  app.use("/v1/branch-expenses", brancExpenseRouter);
  app.use("/v1/inventories", inventoryRouter);
  app.use("/v1/finances", financeRouter);
  app.use("/v1/pos", posRouter);
  return app;
}
