const { generateToken } = require("../Utils/jwt");
const { comparePassword, hashPassword } = require("../Utils/bcrypt");
const { getRandomIcon } = require("../Utils/randomIcon");
const repo = require("../Repositories/auth.Repository");

async function loginService(email, password) {
  const user = await repo.findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Incorrect password");

  const token = await generateToken(user.id);
  return { user, token };
}

async function registerService(username, email, password) {
  const existingUser = await repo.findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashed = await hashPassword(password);
  const icon = getRandomIcon();
  const userId = await repo.createUser(username, email, hashed, icon);

  const token = await generateToken(userId);
  return { id: userId, username, email, icon, token };
}

module.exports = { loginService, registerService };
