import { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "../Context/Authcontext";
import dayjs from "dayjs";

export function Chatweb() {
  const { user } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [editing, setEditing] = useState(null);
  const [newmessage, setNewmessage] = useState("");
  const [searchedMessage, setSearchedMessage] = useState("");
  const filteredMessages = searchedMessage
    ? messages.filter((m) =>
        (m.content || "").toLowerCase().includes(searchedMessage.toLowerCase())
      )
    : messages;

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

  function Handlesubmit(e) {
    e.preventDefault();

    if (message.trim()) {
      socket.emit("chat message", message);
      console.log("messages object2: ", messages);
      console.log("mesuer: ", user);
    }
  }

  function handleIsEditing(id, content) {
    if (content.trim()) {
      socket.emit("update message", id, content);
      setEditing(null);
    }
  }

  function HandleDelete(id) {
    socket.emit("delete message", id);
  }

  return (
    <div className="d-flex justify-content-center">
      <form className="card" onSubmit={Handlesubmit}>
        <input
          type="text"
          placeholder="search menssages"
          value={searchedMessage}
          onChange={(e) => setSearchedMessage(e.target.value)}
        />
        <div className="chat">
          {filteredMessages ? (
            filteredMessages.map((m) => (
              <div
                key={m.id}
                className={`${
                  m.user_id === user.id ? "message-my" : "message-box"
                }`}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <img
                    style={{ width: "20px" }}
                    src={`/Icons/${m.icon}`}
                    alt={m.username}
                  />

                  {m?.user_id === user?.id &&
                    (editing === m.id ? (
                      <div>
                        <input
                          type="text"
                          value={newmessage}
                          onChange={(e) => setNewmessage(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => handleIsEditing(editing, newmessage)}
                        >
                          SEND
                        </button>
                      </div>
                    ) : (
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-secondary dropdown-toggle"
                          type="button"
                          id={`dropdownMenuButton-${m.id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          ⋮
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`dropdownMenuButton-${m.id}`}
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              onClick={() => {
                                setEditing(m.id);
                                setNewmessage(m.content);
                              }}
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              type="button"
                              onClick={() => HandleDelete(m.id)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    ))}
                </div>

                <li style={{ listStyle: "none" }}>{m.content}</li>
                <p className="Chat-username">{m.username}</p>
                <p className="Chat-username">
                  {dayjs(m.created_at).format("YYYY-MM-DD HH:mm")}
                </p>
              </div>
            ))
          ) : (
            <p className="no-messages">No messages yet...</p>
          )}
        </div>
        <div className="d-flex align-items-end flex-row">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send something"
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
}


