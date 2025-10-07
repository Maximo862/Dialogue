import { MessageItem } from "./MessageItem";

export function MessagesList({ filteredMessages }) {
  return (
    <div className="chat">
      {filteredMessages ? (
        filteredMessages.map((m) => <MessageItem key={m.id} m={m} />)
      ) : (
        <p className="no-messages">No messages yet...</p>
      )}
    </div>
  );
}
