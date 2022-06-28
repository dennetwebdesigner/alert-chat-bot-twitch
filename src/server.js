const express = require("express");
const http = require("http");

const { resolve } = require("path");
const socketio = require("socket.io");
const websocket = require("./websocket");

const app = express();
const server = http.createServer(app);

app.use("/", express.static(resolve(__dirname, "public")));

const io = socketio(server);

io.on("connection", websocket);

server.listen(process.env.PORT || 8080, () =>
  console.log("server run port " + PORT)
);
