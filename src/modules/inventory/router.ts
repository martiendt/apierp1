import { Router } from "express";
import * as controller from "./controller/index.js";

const router = Router();

router.get("/", controller.stockController);
router.get("/:id", controller.mutationController);

export default router;
