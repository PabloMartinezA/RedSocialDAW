import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
  deleteUser,
} from "../controllers/usuarios.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* LECTURA */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* ACTUALIZACION */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

/* ACTUALIZACION */
router.put("/:id", verifyToken, updateUser);

/* ELIMINACION */
router.delete("/:id", verifyToken, deleteUser);

export default router;
