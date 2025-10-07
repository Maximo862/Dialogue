import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../Context/AuthContext";

export function useChatSocket() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const { isautenthicated } = useContext(AuthContext);

  useEffect(() => {
    if (!isautenthicated) return;

    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
      autoConnect: true,
    });
    setSocket(newSocket);

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
