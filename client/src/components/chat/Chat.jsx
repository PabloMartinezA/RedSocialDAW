import {
  Stack,
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { socket } from "@/socket";
import { clearChatUser} from "@/state/chat";
import api from "@/api";
import ChatMessage from "@/components/chat/ChatMessage";

const Chat = () => {
  const user = useSelector((state) => state.auth.user);
  const chatUser = useSelector((state) => state.chat.chatUser);
  const token = useSelector((state) => state.auth.token);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onMessage(message) {
      if (chatUser && chatUser._id === message.remitenteId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("message", onMessage);
    socket.on("disconnect", onDisconnect);
    socket.auth = { token };
    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("message", onMessage);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    async function getMessages() {
      setLoading(true);
      setMessages([]);
      if (chatUser) {
        const chatMessages = await api(`/mensajes/${chatUser._id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (chatMessages) {
          setMessages(chatMessages);
        }
      }
      setLoading(false);
    }

    getMessages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatUser]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (messageText) {
      const contenido = messageText;
      const remitenteId = user._id;
      const destinatarioId = chatUser._id;
      const message = {
        remitenteId,
        destinatarioId,
        contenido
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessageText("");
      const response = await api(`/mensajes/${chatUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      });
      if (response) {
        socket.emit("sendMessage", message);
      }
    }
  };

  return (
    <>
      { !isNonMobileScreens && chatUser &&
       <Stack direction="row" spacing={1} padding="0.5rem" sx={{ bgcolor: "neutral.light" }}>
        <IconButton onClick={() => dispatch(clearChatUser())}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h3" padding="0.2rem">{chatUser.nombre} {chatUser.apellido}</Typography>
       </Stack>
      }
      <Stack
        height="100%"
        sx={{
          overflowY:"auto",
          flexDirection:"column-reverse",
        }}
      >
        <Box display="grid">
          { loading ? (
            <CircularProgress sx={{ margin: "auto" }} />
          ) : (
            <>
              { messages?.map((message) => {
                return <ChatMessage message={message} />
              })}
            </>
          )}
        </Box>
      </Stack>
      <Box sx={{padding:"1rem"}}>
      <form onSubmit={sendMessage}>
        <Box display="flex">
          <TextField
            fullWidth
            placeholder="Escribe tu mensaje"
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            sx={{margin:"0 0.5rem", bgcolor:"background.default"}}
          />
          <Button type="submit" disabled={!messageText || !isConnected} endIcon={<SendIcon />} sx={{margin:"0 0.5rem"}}>Send</Button>
        </Box>
      </form>
    </Box>
  </>
  );
}
export default Chat;