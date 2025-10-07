import { createContext, useContext } from "react";
import { useChatSocket } from "../Hooks/useChatSocket";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const chat = useChatSocket();
  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

export function useChat() {
  return useContext(ChatContext);
}
