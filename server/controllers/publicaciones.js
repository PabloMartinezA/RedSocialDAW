import Post from "../models/Publicaciones.js";
import User from "../models/Usuarios.js";

/* CREAR */
export const createPost = async (req, res) => {
  try {
    const { usuarioId, descripcion, imgRuta } = req.body;
    const user = await User.findById(usuarioId);
    const newPost = new Post({
      usuarioId,
      nombre: user.nombre,
      apellido: user.apellido,
      ubicacion: user.ubicacion,
      descripcion,
      usuarioImgRuta: user.usuarioImgRuta,
      imgRuta,
      likes: {},
      comentarios: [],
    });
    await newPost.save();

    const post = await Post.find();

    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* LECTURA */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const post = await Post.find({ usuarioId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* ACTUALIZACION */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(usuarioId);

    if (isLiked) {
      post.likes.delete(usuarioId);
    } else {
      post.likes.set(usuarioId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
