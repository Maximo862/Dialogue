const { updateUser, getUserById } = require("../Repositories/user.Repository");

async function modifyUserService(id, username, icon) {
  const [result] = await updateUser(id, username, icon);
  if (result.affectedRows === 0) return null;

  const [rows] = await getUserById(id);
  return rows[0] || null;
}

module.exports = { modifyUserService };
