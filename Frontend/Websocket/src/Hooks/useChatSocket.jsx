import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../Context/AuthContext";

export function useChatSocket() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { isautenthicated } = useContext(AuthContext);

  useEffect(() => {
    if (!isautenthicated) return;

    const newSocket = io("https://dialogue-production.up.railway.app", {
      withCredentials: true,
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
  console.log("✅ Socket connected:", newSocket.id);
});
    newSocket.on("previousChat", (msgs) => setMessages(msgs));
    newSocket.on("chat message", (msg) =>
      setMessages((prev) => [...prev, msg])
    );
    newSocket.on("message updated", ({ id, content }) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, content } : m))
      );
    });
    newSocket.on("message deleted", (id) => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    });
newSocket.on("connect_error", (err) => {
  console.error("❌ Socket connection error:", err.message);
});
newSocket.on("disconnect", (reason) => {
  console.log("⚠️ Socket disconnected:", reason);
});
    return () => newSocket.disconnect();
  }, [isautenthicated]);

  function sendMessage(content) {
    if (socket && content.trim()) socket.emit("chat message", content);
  }

  function updateMessage(id, content) {
    if (socket && content.trim()) socket.emit("update message", id, content);
  }

  function deleteMessage(id) {
    if (socket) socket.emit("delete message", id);
  }

  return { messages, sendMessage, updateMessage, deleteMessage };
}
