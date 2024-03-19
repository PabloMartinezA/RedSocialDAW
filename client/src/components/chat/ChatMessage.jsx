import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import UserImage from "components/UserImage";

const ChatMessage = ({message, error = false}) => {
  const user = useSelector((state) => state.auth.user);
  const chatUser = useSelector((state) => state.chat.chatUser);
  const isSender = message.remitenteId === user._id;

  return (
    <>
      { isSender ? (
        <Box display="flex" margin="0.5rem" justifySelf="end">
          <Button
          sx={{
            textTransform: "none",
            margin: "0 0.5rem",
            bgcolor: error ? "red" : "primary.light",
            "&:hover": {
              bgcolor: error ? "red" : "primary.light",
            }
          }}>
            <Typography color="neutral.dark">{message.contenido}</Typography>
          </Button>
          <UserImage image={user.imgRuta} />
        </Box>
      ) : (
        <Box display="flex" margin="0.5rem" justifySelf="start">
          <UserImage image={chatUser?.imgRuta} />
          <Button
          sx={{
            textTransform: "none",
            margin: "0 0.5rem",
            bgcolor: "neutral.light",
            "&:hover": {
              bgcolor: "neutral.light",
            }
          }}>
            <Typography color="neutral.dark">{message.contenido}</Typography>
          </Button>
        </Box>
      )}
    </>
  );
}
export default ChatMessage;