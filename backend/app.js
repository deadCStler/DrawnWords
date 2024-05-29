const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const PlayerModel = require("./models/playerModel");
const {
  createGame,
  startGame,
  join,
  chatAndGuess,
} = require("./controllers/gameHandler");

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  const player = new PlayerModel(socket);
  socket.on("session/create", () => createGame());
  socket.on("session/start", (sessionID) => startGame(sessionID));
  socket.on("session/join", (info, sessionId) => join(player, info, sessionId));
  socket.on("session/chat", (msg) => chatAndGuess(player, msg));
});

server.listen(3000);
