var user = require('../models/user');

class UserSingleton {
  constructor() {
    this.instance = null;
  }

  createInstance() {
    return new user();
  }

  getInstance() {
    if (!this.instance) {
      this.instance = this.createInstance();
    }
    return this.instance;
  }
}

module.exports = new UserSingleton();
