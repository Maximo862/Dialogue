const { loginService, registerService } = require("../Services/auth.Service");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Fields required" });

    const { user, token } = await loginService(email, password);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({
        message: "Successful login",
        user: { id: user.id, username: user.username, email, icon: user.icon },
      });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "Fields required" });

    const user = await registerService(username, email, password);

    return res
      .cookie("token", user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60,
      })
      .json({ message: "User Created", user });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logged out" });
}

module.exports = { login, register, logout };
