import User from "../models/Usuarios.js";

/* LECTURA */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.amigos.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, nombre, apellido, ocupacion, ubicacion, imgRuta }) => {
        return { _id, nombre, apellido, ocupacion, ubicacion, imgRuta };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

/* ACTUALIZACION */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.amigos.includes(friendId)) {
      user.amigos = user.amigos.filter((id) => id !== friendId);
      friend.amigos = friend.amigos.filter((id) => id !== id);
    } else {
      user.amigos.push(friendId);
      friend.amigos.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.amigos.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, nombre, apellido, ocupacion, ubicacion, imgRuta }) => {
        return { _id, nombre, apellido, ocupacion, ubicacion, imgRuta };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

/* ACTUALIZACION */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

/* ELIMINACION */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "Usuario eliminado" });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
