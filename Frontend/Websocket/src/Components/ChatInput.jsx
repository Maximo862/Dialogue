import { useChatSocket } from "../Hooks/useChatSocket";
import { useState } from "react";

export function ChatInput() {
  const [message, setMessage] = useState("");

  const { sendMessage } = useChatSocket();

  function Handlesubmit(e) {
    e.preventDefault();

    sendMessage(message);
    setMessage("");
  }

  return (
    <form onSubmit={Handlesubmit}>
      <div className="d-flex align-items-end flex-row">
        <input
          className="chat-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send something"
        />
        <button className="button-submit" type="submit">
          Send
        </button>
      </div>
    </form>
  );
}
