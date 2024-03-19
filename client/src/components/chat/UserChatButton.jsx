import { Button, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setChatUser } from "state/chat";
import UserImage from "components/UserImage";

const UserChatButton= ({ user }) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { nombre, apellido, imgRuta } = user;
  const chatUser = useSelector((state) => state.chat.chatUser);
  const active = user._id === chatUser?._id;

  return (
    <Button display="flex" padding="1rem"
      sx={{
        justifyContent: "left",
        borderRadius: 0,
        bgcolor: active ? "primary.main" : "background.default",
        transition: "background-color 200ms ease-in",
        "&:hover": {
          bgcolor: active ? "primary.main" : "primary.light",
          cursor: "pointer",
        },
      }}
      onClick={() => dispatch(setChatUser({ user: user}))}
    >
      <UserImage image={imgRuta} size="80px" />
      <Typography
        variant="h4"
        color={palette.neutral.dark}
        fontWeight="500"
        padding="0 1rem"
        textTransform="none"
        sx={{
          userSelect: "none",
        }}
      >
        {nombre} {apellido}
      </Typography>
    </Button>
  );
}
export default UserChatButton;