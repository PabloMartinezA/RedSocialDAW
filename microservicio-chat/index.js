import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import ky from "ky";
import { fileURLToPath } from 'url';
import { dirname, join } from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import messageRoutes from "./routes/message.js";

/* CONFIGURACIONES */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next({ type: "auth", error: "Acceso denegado" });
      }

      const json = await ky.post('http://backend:3001/auth/verifyToken', {json: {token: token}}).json();
      if (json) {
        socket.userId = json.id;
        return next();
      }

      return next({ type: "auth", error: "Acceso denegado" });
    } catch (err) {
      console.error(err);
      return next({ type: "internal", error: "Internal server error" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'templates/', 'index.html'));
});

app.get('/chat', (req, res) => {
    res.sendFile(join(__dirname, 'templates/', 'chat.html'));
});

/* RUTAS */
app.use('/mensajes', messageRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server Port ${PORT}`);
    });

    io.on("connect", (socket) => {
      console.log(`Socket ${socket.id} connected`);
      if (socket?.userId) {
        socket.join("chat:" + socket.userId);
        console.log(`User ${socket.userId} joined chatroom`);
      }

      socket.on("sendMessage", (message) => {
        const destinatarioId = message.destinatarioId;
        io.to("chat:" + destinatarioId).emit("message", message);
      })

      socket.on("disconnect", () => {
        console.log(`Socket ${socket.id} disconnected`);
      })
    });
  })
  .catch((error) => console.log(`${error}\nNo se ha conectado.`));
