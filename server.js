// @ts-check
const express = require("express");
const http = require("node:http");
const { Server } = require("socket.io");
const fsp = require("node:fs/promises");
const fs = require("node:fs");
const path = require("node:path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/chat", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "database/chat.txt"), (error) => {
    if (error) {
      next(error);
    }
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", async (msg) => {
    io.emit("chat message", msg);
    await fsp.appendFile("database/chat.txt", msg + "\n", "utf8");
  });
});

server.listen(3000, () => {
  console.log(`servidor en http://localhost:3000`);
});
