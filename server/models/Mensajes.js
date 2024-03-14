import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    remitenteId: {
      type: String,
      required: true,
    },
    destinatarioId: {
      type: String,
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    imgRuta: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Mensajes", messageSchema);
export default Message;