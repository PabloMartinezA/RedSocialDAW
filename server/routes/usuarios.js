import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/usuarios.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* LECTURA */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* ACTUALIZACION */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
