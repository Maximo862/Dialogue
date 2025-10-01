const { verifyToken } = require("../Utils/verifyToken");
const { modifyUserService } = require("../Services/user.Service");

async function verify(req, res) {
  try {
    const token = req.cookies.token;
    const validateduser = await verifyToken(token);

    if (!validateduser) return res.status(400).json({ error: "Unauthorized" });

    return res.json({ message: "Valid token", validateduser });
  } catch (error) {
    console.log("verify: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function modifyUser(req, res) {
  try {
    const { username, icon } = req.body;
    const { id } = req.params;

    const newUser = await modifyUserService(id, username, icon);

    if (!newUser) return res.status(404).json({ error: "User not found" });

    return res.json({ message: "user modified", newUser });
  } catch (error) {
    console.error("modifyUser: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { verify, modifyUser };
