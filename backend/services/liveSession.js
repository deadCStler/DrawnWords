const GameModel = require("../models/gameModel");

class LiveSessions {
  _LIVE_GAMES = {};

  createGame(settings) {
    const gameSession = new GameModel(settings);
    this._LIVE_GAMES[gameSession._sessionID] = gameSession;
  }

  findGame(sessionID) {
    return this._LIVE_GAMES[sessionID];
  }
}

module.exports = LiveSessions;
