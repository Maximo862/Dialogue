const { pool } = require("../Db/Db");

async function updateUser(id, username, icon) {
  return pool.execute(
    "UPDATE users SET username = COALESCE(?, username), icon = COALESCE(?, icon) WHERE id = ?",
    [username || null, icon || null, id]
  );
}

async function getUserById(id) {
  return pool.execute("SELECT id, username, icon FROM users WHERE id = ?", [
    id,
  ]);
}

module.exports = { updateUser, getUserById };
