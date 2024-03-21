import User from "../models/Usuarios.js";
import Post from "../models/Publicaciones.js";

/* IMPLEMENTACION SOAP */
const service = {
  ZSocial_Service: {
    DAW_Port: {
      getUser: async function (args) {
        const id = args.id;
        const user = await User.findById(id);
        if (user) {
          const result = {
            user: {
              nombre: user.nombre,
              apellido: user.apellido,
              email: user.email,
              imgRuta: user.imgRuta,
              ubicacion: user.ubicacion,
              ocupacion: user.ocupacion,
              vistasPerfil: user.vistasPerfil,
              impresiones: user.impresiones
            }
          }
          return result;
        } else {
          return { message: 'No user found' };
        }

      },
      getFriends: async function (args) {
        const id = args.id;
        const user = await User.findById(id);
        if (user) {
          const friends = await Promise.all(
            user.amigos.map((id) => User.findById(id))
          );
          const formattedFriends = friends.map(
            ({ id, nombre, apellido, ocupacion, ubicacion, imgRuta }) => {
              return { user:{ id, nombre, apellido, ocupacion, ubicacion, imgRuta } };
            }
          );
          return formattedFriends;
        } else {
          return { message: 'No user found'};
        }
      },
      getPost: async function (args) {
        const id = args.id;
        const post = await Post.findById(id);

        if (post) {
          const result = {
            post: {
              id: post.id,
              usuarioId: post.usuarioId,
              ubicacion: post.ubicacion,
              descripcion: post.descripcion,
              imgRuta: post.imgRuta,
              likes: { usuarioId: Array.from(post.likes.keys()) },
              comentarios: { comentario: post.comentarios },
            }
          };
          return result;
        } else {
          return { message: "No post found" };
        }
      },
    },
  }
};

export default service;