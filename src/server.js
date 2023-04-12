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

server.register(websocket);
server.register(static, {
  root: folders.public,
});

server.register(async function (sv) {
  sv.get('/livechat', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
    connection.socket.on('message', message => {
      // message.toString() === 'hi from client'
      connection.socket.send('hi from server')
    })
  })
})

server.get("/chat", (req, reply) => {
  reply.sendFile("chat.txt", folders.database);
});

module.exports = server;
