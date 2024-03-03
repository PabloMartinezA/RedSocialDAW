import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/publicaciones.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* LECTURA */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* ACTUALIZACION */
router.patch("/:id/like", verifyToken, likePost);

export default router;
