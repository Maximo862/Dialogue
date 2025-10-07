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

const allowedOrigins = [
  "http://localhost:5173",
  "https://dialogue-chatmk.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});


app.use(router);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

handleChat(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
