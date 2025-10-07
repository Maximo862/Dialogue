const express = require("express");
const cors = require("cors");
const { router } = require("./Routes/routes");
const logger = require("morgan");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
require("dotenv").config();
const { handleChat } = require("./Sockets/chat.Controller");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://dialogue-chatmk.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(router);
app.use(logger("dev"));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://dialogue-chatmk.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

handleChat(io);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`puert: http://localhost:${PORT}`);
});
