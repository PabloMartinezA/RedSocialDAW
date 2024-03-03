import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    usuarioId: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    ubicacion: String,
    descripcion: String,
    imgRuta: String,
    usuarioImgRuta: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comentarios: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Publicaciones", postSchema);
export default Post;
