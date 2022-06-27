"use strict";const tmi = require("tmi.js");

const websocket = (socket) => {
  let CHANNEL;

  let client;

  socket.emit("connection-me", { id: socket.id });

  socket.on("channel-name", (data) => {
    CHANNEL = data.channel;

    client = new tmi.Client({
      channels: [CHANNEL],
    });
    client.connect();

    client.on("message", (channel, tags, message, self) => {
      // "Alca: Hello, World!"
      if (CHANNEL)
        socket.emit("new-msg-tw", { name: tags["display-name"], message });
    });
    socket.on("clear-channel", () => {
      CHANNEL = null;
    });
  });

  socket.on("disconnect", () => {
    console.log("user id: " + socket.id + " disconnected");
  });
};

module.exports = websocket;
