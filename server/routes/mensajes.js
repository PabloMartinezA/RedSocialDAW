import express from "express";
import { getUserMessages, postMessage } from './../controllers/mensajes.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserMessages);

router.post("/:id", verifyToken, postMessage);

export default router;