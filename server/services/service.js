import User from "./../models/Usuarios.js";
import Post from "../models/Publicaciones.js";

const service = {
  ZQueryService: {
    ZQuery_Port: {
      // This is how to define an asynchronous function.
      GetUser: async function (args, callback) {
        const user = await User.findOne({ email: args.Email });
        callback({
          UserId: user.id,
          Nombre: user.nombre,
          Apellido: user.apellido,
          Email: user.email,
          ImgRuta: user.imgRuta,
          Ubicacion: user.ubicacion,
          Ocupacion: user.ocupacion,
          VistasPerfil: user.vistasPerfil,
          Impresiones: user.impresiones,
          CreatedAt: user.createdAt.toISOString(),
          UpdatedAt: user.updatedAt.toISOString(),
        });
      },
      GetPost: async function (args, callback) {
        const post = await Post.findById(args.PostId);
        console.log(post);
        callback({
          PostId: post.id,
          PostDescripcion: post.descripcion,
          PostImgRuta: post.imgRuta,
          CreatedAt: post.createdAt.toISOString(),
          UpdatedAt: post.updatedAt.toISOString(),
          UserId: post.usuarioId,
          UserNombre: post.nombre,
          UserApellido: post.apellido,
          UserUbicacion: post.ubicacion,
        });
      }
    }
  }
};

export default service;