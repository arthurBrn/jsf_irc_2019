var db = require('../database/db')

var Channels = {
  getChannels: (callback) => { 
    return db.query('SELECT * from channels', callback);
  },
  insertChannel: (name, callback) => {
    return db.query('insert into channels (name) values ( ? )', [name], callback);
  }
}

module.exports = Channels;