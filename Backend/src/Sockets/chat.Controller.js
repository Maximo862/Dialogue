const cookie = require("cookie");
const { verifyToken } = require("../Utils/verifyToken");
const {
  createMessage,
  getAllMessages,
  handleDelete,
  handleUpdateMessage,
} = require("./chatService");

function handleChat(io) {
  io.on("connection", async (socket) => {
    console.log("🟢 New client connected:", socket.id);
    const cookies = cookie.parse(socket.request.headers.cookie || "");
    const token = cookies.token;
    console.log("🍪 Cookies del socket:", socket.request.headers.cookie);
    const validateduser = await verifyToken(token);
    if (!validateduser) {
      socket.disconnect();
      return;
    }

    io.emit("user connected", validateduser.username);

    const rows = await getAllMessages();
    socket.emit("previousChat", rows);

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
      io.emit("user disconnected", validateduser.username);
    });

    socket.on("chat message", async (msg) => {
      try {
        const newMessage = await createMessage(msg, validateduser);
        if (!newMessage) return;
        console.log("💬 Message received:", msg);

        io.emit("chat message", newMessage);
      } catch (err) {
        console.error(err);
        return;
      }
    });

    socket.on("update message", async (id, content) => {
      const updated = await handleUpdateMessage(id, validateduser.id, content);
      if (!updated) return;
      io.emit("message updated", { id, content });
    });

    socket.on("delete message", async (id) => {
      const deleted = await handleDelete(id, validateduser.id);
      if (!deleted) return;

      io.emit("message deleted", id);
    });
  });
}

module.exports = {
  handleChat,
};