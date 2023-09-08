import { Router } from "express";
import multer from "multer";
import * as controller from "./controller/index.js";

const router = Router();
const upload = multer();

router.post("/upload", upload.any(), controller.uploadController);
router.get("/", controller.retrieveAllController);
router.post("/", controller.createController);
router.get("/:id", controller.retrieveController);
router.delete("/:id", controller.deleteController);

export default router;
