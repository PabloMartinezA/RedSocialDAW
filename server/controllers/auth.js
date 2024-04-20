import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Usuarios.js";

/* REGISTRAR USUARIO */
export const register = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      contrasena,
      imgRuta,
      amigos,
      ubicacion,
      ocupacion,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(contrasena, salt);

    const newUser = new User({
      nombre,
      apellido,
      email,
      contrasena: passwordHash,
      imgRuta,
      amigos,
      ubicacion,
      ocupacion,
      vistasPerfil: 0,
      impresiones: 0,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGEARSE */
export const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "El usuario no existe. " });

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch)
      return res.status(400).json({ msg: "Credenciales no validas. " });

    const token = jwt.sign({ id: user._id, admin: user.esAdmin, }, process.env.JWT_SECRET);
    delete user.contrasena;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
