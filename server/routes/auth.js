import express from "express";
import jwt from "jsonwebtoken";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/verifyToken", async (req, res, next) => {
    try {
      const { token } = req.body;
  
      if (!token) {
        return res.status(403).send("Acceso denegado");
      }
  
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
  
      const { id } = jwt.verify(token, "siu");
      res.status(200).json({ id })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;