const { pool } = require("../Db/Db");

async function findUserByEmail(email) {
  const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  return rows[0];
}

async function createUser(username, email, password, icon) {
  const [result] = await pool.execute(
    `INSERT INTO users (username,email,password,icon) VALUES (?, ?, ?, ?)`,
    [username, email, password, icon]
  );
  return result.insertId;
}

module.exports = { findUserByEmail, createUser };
