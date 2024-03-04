import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/usuarios.js";
import postRoutes from "./routes/publicaciones.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/publicaciones.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/Usuarios.js";
import Post from "./models/Publicaciones.js";
import { users, posts } from "./data/index.js";
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

/* WSDL */
const xml = readFileSync('service.wsdl', 'utf8');

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
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* RUTAS */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      soap.listen(app, '/soap', service, xml, () => console.log('Servidor SOAP escuchando en localhost:3001/soap'));
      console.log(`Server Port ${PORT}`);
    });

    /* INICIALIZACION DE DATOS */
    //User.insertMany(users);
    //Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} no se ha conectado`));
