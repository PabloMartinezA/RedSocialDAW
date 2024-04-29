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

export const getMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const mensaje = await Message.findById(id);
    res.status(200).json(mensaje);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
}

/* CREACION */
export const postMessage = async (req, res) => {
  try {
    const {
      remitenteId,
      destinatarioId,
      contenido,
    } = req.body;

    const newMensaje = new Message({
      remitenteId,
      destinatarioId,
      contenido,
    });
    const savedMensaje = await newMensaje.save()
    res.status(201).json(savedMensaje);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const postUserMessage = async (req, res) => {
  try {
    const remitenteId = req.user.id;
    const { destinatarioId } = req.params;
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

/* ACTUALIZACIÓN */
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(message);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

/* ELIMINACIÓN */
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Message.findByIdAndDelete(id);
    if (result !== null) {
      res.status(200).json({ msg: "Mensaje eliminado" });
    } else {
      res.status(404).json({ msg: "No encontrado" });
    }
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};