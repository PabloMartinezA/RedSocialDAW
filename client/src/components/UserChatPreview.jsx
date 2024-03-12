import { Box, Typography, useTheme } from "@mui/material";
import UserImage from "./UserImage";
import { useState } from "react";

const UserChatPreview = ({ amigo, active=false }) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const { nombre, apellido, imgRuta } = amigo;
  const [isActive, setIsActive] = useState(active);

  return (
    <Box display="flex" padding="1rem" alignItems="center"
      sx={{
        bgcolor: isActive ? "primary.main" : "neutral.medium",
        "&:hover": {
          color: "primary.main",
          cursor: "pointer",
        },
      }}
      onClick={() => setIsActive(!isActive) }
    >
      <UserImage image={imgRuta} size="80px" />
      <Typography
        variant="h4"
        color={dark}
        fontWeight="500"
        padding="0 1rem"
      >
        {nombre} {apellido}
      </Typography>
    </Box>
  );
}
export default UserChatPreview;