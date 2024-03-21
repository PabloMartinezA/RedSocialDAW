import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/publicaciones.js";
import { socketVerifyToken, verifyToken } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/mensajes.js";
import postRoutes from "./routes/publicaciones.js";
import userRoutes from "./routes/usuarios.js";
import soap from "soap";
import { readFileSync } from "fs";
import service from "./services/service.js";

/* CONFIGURACIONES */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
io.use(socketVerifyToken);

/* WSDL */
const xml = readFileSync("service.wsdl", "utf-8");

/* ALMACENAMIENTO DE ARCHIVOS */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* RUTAS CON ARCHIVOS */
app.post("/auth/register", upload.single("img"), register);
app.post("/publicaciones", verifyToken, upload.single("img"), createPost);

/* RUTAS */
app.use("/auth", authRoutes);
app.use("/usuarios", userRoutes);
app.use("/publicaciones", postRoutes);
app.use("/mensajes", messageRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server Port ${PORT}`);
      soap.listen(app, "/soap", service, xml, () =>
        console.log(`Server SOAP listening on :${PORT}/soap`));
    });

    io.on("connect", (socket) => {
      console.log(`Socket ${socket.id} connected`);
      if (socket?.userId) {
        socket.join("chat:" + socket.userId);
      }

      socket.on("sendMessage", (message) => {
        const destinatarioId = message.destinatarioId;
        io.to("chat:" + destinatarioId).emit("message", message);
      })

      socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
      })
    });

    /* INICIALIZACION DE DATOS */
    //User.insertMany(users);
    //Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} no se ha conectado`));