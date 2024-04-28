import { LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material";

import { Box, Divider, Typography, useTheme } from "@mui/material";
import api from "@/api";
import FlexBetween from "@/components/FlexBetween";
import UserImage from "@/components/UserImage";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ usuarioId, imgRuta }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const data = await api(`/usuarios/${usuarioId}`, {
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

  const {
    nombre,
    apellido,
    ubicacion,
    ocupacion,
    vistasPerfil,
    impresiones,
    amigos,
  } = user;

  return (
    <WidgetWrapper>
      {/*Primera Columna*/}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${usuarioId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={imgRuta} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {nombre} {apellido}
            </Typography>
            <Typography color={medium}>{amigos.length} amigos</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/*Segunda Columna*/}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{ubicacion}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{ocupacion}</Typography>
        </Box>
      </Box>

      <Divider />

      {/*Tercera Columna*/}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Quien ha visto tu perfil?</Typography>
          <Typography color={main} fontWeight="500">
            {vistasPerfil}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impresiones de tu publicacion</Typography>
          <Typography color={main} fontWeight="500">
            {impresiones}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/*Cuarta Columna*/}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Perfiles Sociales
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="Twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter / X
              </Typography>
              <Typography color={medium}>Plataforma Social</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="LinkedIn" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Red Social</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
