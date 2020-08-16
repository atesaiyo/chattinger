const { NODE_ENV, PORT } = require("./server/configs");

const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server);

const { socketEvent } = require("./server/routes/socketEvent");
io.on("connection", socketEvent);

const cors = require("cors");
app.use(cors());

const routers = require("./server/routes/routers");
app.use("/api", routers);

const path = require("path");
if (NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
