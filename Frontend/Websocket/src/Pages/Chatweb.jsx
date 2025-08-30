import { useState } from "react";
import { io } from "socket.io-client";

export function Chatweb() {
  const socket = io("http://localhost:3000");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function Handlesubmit(e) {
    e.preventDefault();

    if (message.trim()) {
      socket.emit("chat message", message);
      setMessages([...messages, message]);
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <form className="card" onSubmit={Handlesubmit}>
        <div className="chat">
          {messages.map((m, i) => (
            <div className="message-box" key={i}>
              <li style={{listStyle: "none"}}>{m}</li>
            </div>
          ))}
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
