const {
  callMessages,
  deleteMessage,
  insertMessage,
  selectMessagesOfUser,
  updateMessage,
} = require("./chatRepository");

async function createMessage(content, validateduser) {
  const [result] = await insertMessage(content, validateduser.id);
  if (result.affectedRows === 0) return;

  return {
    id: result.insertId,
    username: validateduser.username,
    content: content,
    user_id: validateduser.id,
    icon: validateduser.icon,
  };
}

async function handleUpdateMessage(id, validateduserid, content) {
  const [rows] = await selectMessagesOfUser(id, validateduserid);
  if (rows.length === 0) {
    return null;
  }

  await updateMessage(content, id);
  return { id, content };
}

async function handleDelete(id, validateduserid) {
  const [rows] = await selectMessagesOfUser(id, validateduserid);
  if (rows.length === 0) {
    return null;
  }

  await deleteMessage(id);
  return true;
}

async function getAllMessages() {
  const [rows] = await callMessages();
  return rows;
}

module.exports = {
  createMessage,
  handleDelete,
  handleUpdateMessage,
  getAllMessages,
};
