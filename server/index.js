const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Library CORS for handle cors error in my app
app.use(cors());

//create sever to get and send
const server = http.createServer(app);

//create instance from socket.io to work with server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  //Get message from client to send
  socket.on("send_message", (data) => {
    //Send Message to Other Client
    socket.broadcast.emit("receive_message", data);
  });
});

// Run simulate Server
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
