import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@material-ui/icons";

import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { UseSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ usuarioId, imgRuta }) => {
  const { user, setUser } = useState(null);
  const { pallete } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = pallete.neutral.dark;
  const medium = pallete.neutral.medium;
  const main = pallete.neutral.main;

  const getUser = async () => {
    const response = await fetch(
      `http://localhost:3001/usuarios/${usuarioId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps <= Un aviso, no un error

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
            <Typography color={medium}>{amigos.lenght} amigos</Typography>
          </Box>
          <ManageAccountsOutlined />
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

        {/*Tercera Columna*/}
        <Box p="1rem 0">
          <FlexBetween mb="0.5rem">
            <Typography color={medium}>Quien ha visto tu perfil?</Typography>
            <Typography color={main} fontWeight="500">
              {vistasPerfil}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={medium}>
              Impresiones de tu publicacion
            </Typography>
            <Typography color={main} fontWeight="500">
              {impresiones}
            </Typography>
          </FlexBetween>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};
