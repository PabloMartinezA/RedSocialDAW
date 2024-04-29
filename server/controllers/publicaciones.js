import Post from "../models/Publicaciones.js";
import User from "../models/Usuarios.js";

/* CREAR */
export const createPost = async (req, res) => {
  try {
    const { usuarioId, ubicacion, descripcion, imgRuta } = req.body;
    const user = await User.findById(usuarioId);
    const newPost = new Post({
      usuarioId,
      nombre: user.nombre,
      apellido: user.apellido,
      ubicacion: ubicacion ? ubicacion : user.ubicacion,
      descripcion,
      usuarioImgRuta: user.imgRuta,
      imgRuta,
      likes: {},
      comentarios: [],
    });
    await newPost.save();

    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ msg: err.message });
  }
};

/* LECTURA */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId: usuarioId } = req.params; // Cambia 'userId' a 'usuarioId'
    const posts = await Post.find({ usuarioId }).sort({ createdAt: -1 }); // Cambia 'userId' a 'usuarioId'
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
}

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
    res.status(404).json({ msg: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

/* ELIMINACIÓN */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ msg: "Publicación eliminada"});
    } else {
      res.status(404).json({ msg: "No encontrado"});
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};