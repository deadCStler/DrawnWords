const GameService = require("../services/gameService");
const LiveSessions = require("../services/liveSession");

const liveSession = new LiveSessions();

const createGame = (settings) => {
  liveSession.createGame(settings);
};

const join = (player, info, sessionID) => {
  player.setInfo(info);
  const gameService = new GameService(liveSession.find(sessionID));
  gameService.joinSession(player);
};

const startGame = (sessionID) => {
  const gameService = new GameService(liveSession.find(sessionID));
  gameService.startSession();
};

const chatAndGuess = (player, msg) => {
  const gameService = new GameService(liveSession.find(player.activeSession));
  gameService.playerGuess(player, msg);
};

module.exports = {
  createGame,
  join,
  startGame,
  chatAndGuess,
};
