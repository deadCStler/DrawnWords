const { v4 } = require("uuid");
const wordsArray = require("../data.json");

class GameModel {
  constructor(gameSettings) {
    this._sessionID = v4();
    this.players = [];
    this.roomOwner = null;
    this.drawer = null;
    this.maxRounds = gameSettings.maxRounds || 3;
    this.roundDuration = gameSettings.roundDuration || 80;
    this.roundBuffer = gameSettings.roundBuffer || 30;

    this._totalRounds = 0;
    this._scoreboard = {};
    this._currWord = null;
    this._usedWords = new Set();
    this._drawerIndex = 0;
    this._roundID = null;
  }

  get sessionID() {
    return this._sessionID;
  }

  get totalRounds() {
    return this._totalRounds;
  }

  getRandomWord() {
    let word = "";
    do {
      word = wordsArray[Math.floor(Math.random() * 2330)];
    } while (this._usedWords.has(word));
    this._usedWords.add(word);
    return word;
  }

  addPlayer(player) {
    if (this.players.length === 0) {
      this.roomOwner = player;
    }

    this.players.push(player);
    player.setActiveSession(this);
    this._scoreboard[player.id] = {
      totalPoints: 0,
      roundWisePoints: {},
    };

    player.socket.join(this.sessionID);
  }

  roundStart() {
    if (this.players.length > 1) {
      this.drawer = this.players[this._drawerIndex];
      this._totalRounds += 1;
      this._roundID = v4();
      this._currWord = this.getRandomWord();
      this._drawerIndex = (this._drawerIndex + 1) % this.players.length;
    }
  }

  roundEnd() {
    this._roundID = null;
  }

  playerGuess(player, word) {
    if (this._scoreboard[player.id].roundWisePoints[this._roundID]) {
      return true;
    }

    if (this._roundID && word === this._currWord) {
      const plusPoints = 10;
      const playerScoreBoard = this._scoreboard[player.id];
      playerScoreBoard.totalPoints += plusPoints;

      playerScoreBoard.roundWisePoints[this._roundID] = plusPoints;

      return true;
    }

    return false;
  }
}

module.exports = GameModel;
