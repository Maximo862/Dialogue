import { useState } from "react";
import { useChat } from "../Context/ChatContext";
import { MessagesList } from "../Components/MessagesList";
import { ChatInput } from "../Components/ChatInput";

export function Chatweb() {
  const [searchedMessage, setSearchedMessage] = useState("");

  const { messages } = useChat();
  const filteredMessages = searchedMessage
    ? messages?.filter((m) =>
        (m.content || "").toLowerCase().includes(searchedMessage.toLowerCase())
      )
    : messages;

  return (
    <div className="d-flex justify-content-center">
      <div className="card">
        <input
          type="text"
          placeholder="search messages"
          value={searchedMessage}
          onChange={(e) => setSearchedMessage(e.target.value)}
        />

        <MessagesList filteredMessages={filteredMessages} />
        <ChatInput />
      </div>
    </div>
  );
}
