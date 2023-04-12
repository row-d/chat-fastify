// @ts-check
const server = require("./server.js");

(async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
})();
