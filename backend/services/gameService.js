const { io } = require("socket.io");

class GameService {
  constructor(session) {
    this._session = session;
  }

  joinSession(player) {
    this._session.addPlayer(player);
    this.roomSync();
  }

  startSession() {
    if (this._session.totalRounds >= this._session.maxRounds) {
      this.roomSync();
      io.to(this._session.sessionID).emit("game/end");
    }

    this._session.roundStart();
    this.sendWord();
    this.roomSync();

    //end one round
    setTimeout(() => {
      this.revealWord();
      this._session.roundEnd();
      this.roomSync();
    }, this._session.roundDuration * 1000);

    //start another round
    setTimeout(() => {
      this.startSession();
    }, (this._session.roundBuffer + this._session.roundDuration) * 1000);
  }

  roomSync() {
    io.to(this._session.sessionID).emit("sync/room", {
      //can send something if required
    });
  }

  sendWord() {
    const word = this._session._currWord;
    io.to(this._session.drawer.id).emit("round/word", {
      word,
    });
  }

  revealWord() {
    const word = this._session._currWord;
    io.to(this._session.sessionID).emit("round/word-reveal", {
      word,
    });
  }

  playerGuess(player, word) {
    if (this._session.playerGuess(player, word)) {
      this.roomSync();
    }
  }
}

module.exports = GameService;
