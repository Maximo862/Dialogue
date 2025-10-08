const jwt = require("jsonwebtoken");
const { pool } = require("../Db/Db");

async function verifyToken(token) {
  try {
    if (!token) return null;

    const verifytok = jwt.verify(token, process.env.JWT_SECRET);
 console.log("✅ Token válido:", verifyToken);
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [
      verifytok.id,
    ]);
    if (rows.length === 0) return null;
    return rows[0] || null;
  } catch (error) {
     console.error("❌ Token inválido o expirado:", error);
    return null;
  }
}

module.exports = {
  verifyToken,
};
