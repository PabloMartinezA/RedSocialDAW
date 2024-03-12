import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Navbar from "scenes/navbar";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import UserChatPreview from "components/UserChatPreview";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { socket } from "socket";

const ChatPage = () => {
  const [amigos, setAmigos] = useState([]);
  const [chat, setChat] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const token = useSelector((state) => state.token);
  const { _id, imgRuta } = useSelector((state) => state.user);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onMessage(mensaje) {
      if (chat === mensaje.remitenteId) {
        setMensajes((prevMessages) => [...prevMessages, mensaje]);
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
  }, [token]);

  useEffect(() => {
    async function fetchAmigos() {
      setAmigos([]);
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}/usuarios/${_id}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setAmigos(data);
    }

    fetchAmigos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   async function fetchMensajes() {
  //     setMensajes([]);
  //     if (chat) {
  //       const response = await fetch(
  //         `http://localhost:3001/mensajes/${chat}`,
  //         {
  //           method: "GET",
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       const data = await response.json();
  //       setMensajes(data);
  //     }
  //   }

  //   fetchMensajes();
  // }, [chat]);

  // useEffect(() => {
  //   socket.on('message', (mensaje) => {
  //     setMensajes((mensajes) => [...mensajes, mensaje]);
  //   });
  // }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    const contenido = mensaje;
    const remitenteId = _id;
    const destinatarioId = chat;
    const message = {
      remitenteId,
      destinatarioId,
      contenido
    };
    socket.timeout(5000).emit("sendMessage", message);
    setMensajes((prevMessages) => [...prevMessages, message]);
    console.log(message);
  };

  return (
    <Box>
      <Navbar />
      { isConnected ? <p>Conectado</p> : <p>Sin conexión</p>}
      <Box
        width="100%"
        height="100%"
        display="flex"
      >
        <Box
          flex="30%"
        >
          <Typography textAlign="center">AMIGOS</Typography>
          <FormControl fullWidth>
            <InputLabel id="select-amigo">Amigo</InputLabel>
            <Select
              labelId="select-amigo"
              value={chat}
              label="Amigo"
              onChange={(event) => setChat(event.target.value)}
            >
              {amigos.map(function (amigo) {
                return (
                  <MenuItem value={amigo._id}>{amigo.nombre} {amigo.apellido}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          flex="70%"
          padding="1rem"
        >
          {mensajes.map(function (mensaje) {
            return (
              <Typography textAlign={mensaje.remitenteId===_id ? "right" : "left"}>{mensaje.contenido}</Typography>
            );
          })}
          <form onSubmit={sendMessage}>
            <Box display="flex">
              <TextField id="text-mensaje" value={mensaje} onChange={(event) => setMensaje(event.target.value)}/>
              <Button type="submit">SEND</Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default ChatPage;