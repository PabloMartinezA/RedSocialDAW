import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    apellido: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    contrasena: {
      type: String,
      required: true,
      min: 5,
    },
    imgRuta: {
      type: String,
      default: "",
    },
    amigos: {
      type: Array,
      default: [],
    },
    ubicacion: String,
    ocupacion: String,
    vistasPerfil: Number,
    impresiones: Number,
    esAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("Usuarios", UserSchema);
export default User;
