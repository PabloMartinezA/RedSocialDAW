import { Stack, Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "@/scenes/navbar";
import UserChats from "@/components/chat/UserChats";
import Chat from "@/components/chat/Chat";

const ChatPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const chatUser = useSelector((state) => state.chat.chatUser);

  return (
    <Box height="100%">
      <Navbar />
        { isNonMobileScreens ? (
          <Stack direction="row" height="85%">
            <Box
              flex="30%"
            >
              <UserChats />
            </Box>
            <Box
              flex="70%"
              padding="1rem"
            >
              <Chat />
            </Box>
          </Stack>
        ) : (
          <Stack direction="row" height="80%">
            <Box
              width="100%"
              visibility={!!chatUser ? "collapse":"visible"}
              display={!!chatUser && "none"}
            >
              <UserChats />
            </Box>
            <Box
              width="100%"
              visibility={!!chatUser ? "visible":"collapse"}
              display={!chatUser && "none"}
            >
              <Chat />
            </Box>
          </Stack>
        )}
    </Box>
  );
};
export default ChatPage;