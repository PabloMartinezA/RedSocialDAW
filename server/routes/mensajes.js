import express from "express";
import {
  getMessage,
  getUserMessages,
  postMessage,
  postUserMessage,
  updateMessage,
  deleteMessage,
} from './../controllers/mensajes.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* LECTURA */
router.get("/:id", verifyToken, getMessage);
router.get("/usuario/:id", verifyToken, getUserMessages);

/* CREACIÓN */
router.post("/", verifyToken, postMessage);
router.post("/:destinatarioId", verifyToken, postUserMessage);

/* ACTUALIZACIÓN */
router.put("/:id", verifyToken, updateMessage);

/* ELIMINACIÓN */
router.delete("/:id", verifyToken, deleteMessage);

export default router;