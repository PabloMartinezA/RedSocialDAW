import { Box, Button, IconButton, useMediaQuery, TextField, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import api from "api";
import { setUser, setLogout } from "state/auth";

import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useTheme } from "@mui/material";

const ProfilePage = () => {
  const [profileUser, setProfileUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isEditing, setIsEditing] = useState(false);
  const [newUserData, setNewUserData] = useState({});

  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const { _id: currentUserId, imgRuta: currentUserImgRuta } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    const data = await api(`/usuarios/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfileUser(data);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!profileUser) {
    return null;
  }

  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
      setNewUserData(profileUser);
    }
  };

  const handleInputChange = (event) => {
    setNewUserData({
      ...newUserData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const updatedUser = await api(`/usuarios/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    });
    if (updatedUser) {
      setProfileUser(updatedUser);
      dispatch(setUser({ user: updatedUser }));
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    await api(`/usuarios/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(setLogout());
    // Redirigir al usuario a la página de inicio después de eliminar su cuenta
    navigate("/");
  };

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
          <UserWidget usuarioId={userId} imgRuta={profileUser.imgRuta} />

          {currentUserId === userId && (
            <Box p="1rem 0">
              <Stack direction="row" spacing={1} mb="0.5rem">
                <IconButton>
                  <Delete
                    onClick={handleDelete}
                    fontSize="large"
                    sx={{ color: main }}
                  />
                </IconButton>
                <IconButton>
                  <Edit
                    onClick={handleEdit}
                    fontSize="large"
                    sx={{ color: main }}
                  />
                </IconButton>
              </Stack>
              <Box display="flex" alignItems="center" gap="1rem">
                <Box>
                  {isEditing ? (
                    <form onSubmit={handleSave}>
                      <Stack spacing={1} >
                        <TextField
                          name="nombre"
                          label="Nombre"
                          value={newUserData.nombre}
                          onChange={handleInputChange}
                        />
                        <TextField
                          name="apellido"
                          label="Apellido"
                          value={newUserData.apellido}
                          onChange={handleInputChange}
                        />
                        <TextField
                          name="ubicacion"
                          label="Ubicacion"
                          value={newUserData.ubicacion}
                          onChange={handleInputChange}
                        />
                        <TextField
                          name="ocupacion"
                          label="Ocupacion"
                          value={newUserData.ocupacion}
                          onChange={handleInputChange}
                        />
                        <Button type="submit">Guardar cambios</Button>
                      </Stack>
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
          <MyPostWidget imgRuta={currentUserImgRuta} />
          <Box m="2rem 0" />
          <PostsWidget usuarioId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
