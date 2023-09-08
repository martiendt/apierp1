import { Router } from "express";
import * as controller from "./controller/index.js";

const router = Router();

router.get("/", controller.retrieveAllController);
router.post("/", controller.createController);
router.get("/:id", controller.retrieveController);
router.post("/:id/receive", controller.receiveController);

export default router;
