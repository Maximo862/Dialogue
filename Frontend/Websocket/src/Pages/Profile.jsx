import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

export function Profile() {
  const { user, loading, handleModify } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    if (!loading && user) {
      setUsername(user.username);
      setIcon(user.icon);
    }
  }, [loading, user]);

  async function handleSave() {
    try {
      if (username.trim() || icon.trim()) {
    await handleModify(user.id, username, icon);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  const icons = [
    "avatar (1).png",
    "avatar (2).png",
    "avatar (3).png",
    "avatar (4).png",
    "avatar (5).png",
    "avatar (6).png",
    "avatar (7).png",
    "avatar (8).png",
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Icon</label>
        <div className="d-flex gap-5">
          {icons.map((ic) => (
            <img
              key={ic}
              src={`/Icons/${ic}`}
              alt={ic}
              width="60"
              className={icon === ic ? "profileicon-active" : "profileicon"}
              onClick={() => setIcon(ic)}
            />
          ))}
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}
