import { useChat } from "../Context/ChatContext";
import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import dayjs from "dayjs";

export function MessageItem({ m }) {
  const [editing, setEditing] = useState(null);
  const [newmessage, setNewmessage] = useState("");
  const { deleteMessage, updateMessage } = useChat();
  const { user } = useContext(AuthContext);

  return (
    <div
      key={m.id}
      className={`${m.user_id === user.id ? "message-my" : "message-box"}`}
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
                onClick={() => {
                  updateMessage(editing, newmessage),
                    setEditing(null),
                    showMessage("edit");
                }}
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
                    onClick={() => {
                      deleteMessage(m.id), showMessage("delete");
                    }}
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
  );
}
