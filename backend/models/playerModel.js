const { v4 } = require("uuid");

class PlayerModel {
  constructor(socket) {
    this.socket = socket;
    this.id = v4();
    this._name = null;
    this._avatar = null;
    this.activeSession = null;
  }

  setInfo({ name, avatar }) {
    this._name = name;
    this._avatar = avatar;
  }

  setActiveSession(session) {
    this.activeSession = session;
  }
}

module.exports = PlayerModel;
