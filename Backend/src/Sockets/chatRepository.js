const { pool } = require("../Db/Db");

async function callMessages() {
  return pool.execute(
    "SELECT m.*, u.username, u.icon FROM messages m INNER JOIN users u ON m.user_id = u.id"
  );
}

async function insertMessage(content, validateduserid) {
  return pool.execute("INSERT INTO messages (content, user_id) VALUES (?, ?)", [
    content,
    validateduserid,
  ]);
}

async function selectMessagesOfUser(idMessage, idUser) {
  return await pool.execute(
    "SELECT * FROM messages WHERE id = ? AND user_id = ?",
    [idMessage, idUser]
  );
}

async function updateMessage(content, id) {
  return pool.execute(
    "UPDATE messages SET content = COALESCE(?,content) WHERE id = ?",
    [content, id]
  );
}

async function deleteMessage(id) {
  return pool.execute("DELETE FROM messages WHERE id = ?", [id]);
}

module.exports = {
  callMessages,
  deleteMessage,
  insertMessage,
  selectMessagesOfUser,
  updateMessage,
};
