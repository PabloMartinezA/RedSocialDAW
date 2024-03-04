import User from "../models/Usuarios.js";

/* IMPLEMENTACION SOAP */
const service = {
  ZSocial_Service: {
    Users_Port: {
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
      }
    }
  }
};

export default service;