import { useEffect, useState } from 'react'

export function useChatSocket() {

    const [messages, setMessages] = useState([])
     const [socket, setSocket] = useState(null);

   useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("user connected", (user) => {
      setMessages((prev) => [
        ...prev,
        { connectedordisconected: `${user} has connected` },
      ]);
    });

    newSocket.on("previousChat", (msgs) => {
      setMessages(msgs);
    });

    newSocket.on("chat message", (msg) => {
      console.log("message useeffect: ", msg);
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on("message updated", ({ id, content }) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, content: content } : m))
      );
    });

    newSocket.on("message deleted", (id) => {
      setMessages((prev) => prev.filter((m) => m.id != id));
    });

    newSocket.on("user disconnected", (user) => {
      setMessages((prev) => [
        ...prev,
        { connectedordisconected: `${user} has disconnected` },
      ]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return {messages, setMessages, socket}
}
