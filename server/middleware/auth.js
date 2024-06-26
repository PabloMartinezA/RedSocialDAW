import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Acceso denegado");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, "siu");
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const socketVerifyToken = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    console.log(token);
    if (!token) {
      return next({ type: "auth", error: "Acceso denegado" });
    }

    const { id } = jwt.verify(token, "siu");
    socket.userId = id;
    return next();
  } catch (err) {
    console.error(err);
    return next({ type: "internal", error: "Internal server error" });
  }
};
