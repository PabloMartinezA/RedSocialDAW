import { Box, Button, IconButton, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import api from "api";

import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useTheme } from "@mui/material";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isEditing, setIsEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({});

  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const currentUserId = useSelector((state) => state.auth.user._id);

  const getUser = async () => {
    const data = await api(`/usuarios/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(data);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return null;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setNewUserData(user);
  };

  const handleInputChange = (event) => {
    setNewUserData({
      ...newUserData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async () => {
    const updatedUser = await api(`/usuarios/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await api(`/usuarios/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    // Redirigir al usuario a la página de inicio después de eliminar su cuenta
    navigate("/");
  };

  console.log("currentUserId:", currentUserId); // Añade esta línea
  console.log("userId:", userId); // Añade esta línea
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget usuarioId={userId} imgRuta={user.imgRuta} />

          {currentUserId === userId && (
            <Box p="1rem 0">
              <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                <IconButton>
                  <Delete
                    onClick={handleDelete}
                    fontSize="large"
                    sx={{ color: main }}
                  />
                </IconButton>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem">
                <IconButton>
                  <Edit
                    onClick={handleEdit}
                    fontSize="large"
                    sx={{ color: main }}
                  />
                </IconButton>
                <Box>
                  {isEditing ? (
                    <form onSubmit={handleSave}>
                      <label>
                        Nombre:
                        <input
                          type="text"
                          name="nombre"
                          value={newUserData.nombre}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        Apellido:
                        <input
                          type="text"
                          name="apellido"
                          value={newUserData.apellido}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        Ubicacion:
                        <input
                          type="text"
                          name="ubicacion"
                          value={newUserData.ubicacion}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        Ocupacion:
                        <input
                          type="text"
                          name="ocupacion"
                          value={newUserData.ocupacion}
                          onChange={handleInputChange}
                        />
                      </label>
                      <Button type="submit">Guardar cambios</Button>
                    </form>
                  ) : null}
                </Box>
              </Box>
            </Box>
          )}
          <Box m="2rem 0" />
          {currentUserId === userId && <FriendListWidget usuarioId={userId} />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget imgRuta={user.imgRuta} />
          <Box m="2rem 0" />
          <PostsWidget usuarioId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
