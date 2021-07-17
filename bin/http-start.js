#!/usr/bin/env node

const { createServer } = require("http");
const http = require("../index.js");
const PORT = parseInt(process.env.PORT, 10) || 3000;

http().then(app => {
  const server = createServer(app);
  server.listen(PORT, () => {
    console.log("HTTP Server listening on port %s", PORT);
  });
});