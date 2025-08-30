const express = require("express")
const cors = require("cors")
const {router} = require("./Routes/routes")
const logger = require("morgan")
const {Server} = require("socket.io")
const {createServer} = require("node:http")

const app = express()

app.use(router)
app.use(express.json())
app.use(logger("dev"))

const server = createServer(app)
const io = new Server(server, {
    cors : {
        origin: "http://localhost:5173",
         methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("user has connected")

socket.on("disconnect", () => {
console.log("user disconnect")
})

socket.on("chat message", (msg) => {
    console.log("message : ", msg)
})
})



const PORT = 3000

server.listen( PORT, () => {
    console.log(`puert: http://localhost:${PORT}`)
})


