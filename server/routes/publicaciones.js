import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  getPost,
  likePost,
  updatePost,
  deletePost,
} from "../controllers/publicaciones.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* LECTURA */
router.get("/", verifyToken, getFeedPosts);
router.get("/:id", verifyToken, getPost);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* ACTUALIZACION */
router.patch("/:id/like", verifyToken, likePost);
router.put("/:id", verifyToken, updatePost);

/* ELIMINACIÓN */
router.delete("/:id", verifyToken, deletePost);

export default router;
