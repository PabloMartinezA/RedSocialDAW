import express from "express";
import {
  getMessage,
  getUserMessages,
  postMessage,
  updateMessage,
  deleteMessage,
} from './../controllers/message.js';

const router = express.Router();

/* LECTURA */
router.get("/:id", getMessage);
router.get("/:remitente/:destinatario", getUserMessages);

/* CREACIÓN */
router.post("/", postMessage);

/* ACTUALIZACIÓN */
router.put("/:id", updateMessage);

/* ELIMINACIÓN */
router.delete("/:id", deleteMessage);

export default router;