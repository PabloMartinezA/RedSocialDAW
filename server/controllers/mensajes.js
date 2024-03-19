import Message from "../models/Mensajes.js";

/* LECTURA */
export const getUserMessages = async (req, res) => {
  try {
    const remitenteId = req.user.id;
    const destinatarioId = req.params.id;
    // obtener todos los mensajes entre los dos usuarios desde mas reciente
    const mensajes = await Message.find({
      remitenteId: { $in: [remitenteId, destinatarioId] },
      destinatarioId: { $in: [remitenteId, destinatarioId] },
    }).sort();

    res.status(200).json(mensajes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message});
  }
};

/* CREACION */
export const postMessage = async (req, res) => {
  try {
    const remitenteId = req.user.id;
    const destinatarioId = req.params.id;
    const {
      contenido,
      imgRuta
    } = req.body;

    const newMensaje = new Message({
      remitenteId,
      destinatarioId,
      contenido,
      imgRuta,
    });
    const savedMensaje = await newMensaje.save()
    res.status(201).json(savedMensaje);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};