const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../Controllers/auth.Controller");
const { modifyUser, verify } = require("../Controllers/user.Controller");
const { validateSchema } = require("../Middlewares/validate.Schema");
const { loginSchema, registerSchema } = require("../Schemas/auth.Schema");

router.post("/login", validateSchema(loginSchema), login);

router.post("/register", validateSchema(registerSchema), register);

router.post("/logout", logout);

router.get("/verify", verify);

router.put("/:id", modifyUser);

module.exports = {
  router,
};
