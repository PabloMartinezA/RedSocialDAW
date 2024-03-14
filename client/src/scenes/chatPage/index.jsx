import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Navbar from "scenes/navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { socket } from "socket";
import api from "api";

const ChatPage = () => {
  const [amigos, setAmigos] = useState([]);
  const [chat, setChat] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    async function getAmigos() {
      const data = await api(
        `/usuarios/${_id}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data) {
        setAmigos(data);
      }
    }

    getAmigos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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