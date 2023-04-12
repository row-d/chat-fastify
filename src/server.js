// @ts-check
const fs = require("node:fs/promises");
const path = require("node:path");
const fastify = require("fastify");
const static = require("@fastify/static");
const websocket = require("@fastify/websocket");

const server = fastify({ logger: true });

const folders = {
  public: path.resolve(__dirname, "../public"),
  database: path.resolve(__dirname, "../database"),
};

server.register(websocket, {
  options: {
    maxPayload: 1048576,
    clientTracking: true,
  },
});
server.register(static, {
  root: folders.public,
});

server.register(async function (sv) {
  sv.get("/livechat", { websocket: true }, (connection, req) => {
    connection.socket.on("message", async (rawdata) => {
      const msg = rawdata.toString();
      sv.websocketServer.clients.forEach(client=> {
          if (client.readyState === 1) {
            client.send(msg)
          }
      })
      await fs.appendFile(folders.database + "/chat.txt", msg + "\n");
    });
  });
});

server.get("/chat", (req, reply) => {
  reply.sendFile("chat.txt", folders.database);
});

module.exports = server;
