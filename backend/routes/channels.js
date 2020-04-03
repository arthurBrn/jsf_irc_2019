var db = require('../database/db')

var Channels = {
  getChannels: (callback) => { 
    return db.query('SELECT * from channels', callback);
  },
  insertChannel: (channel, callback) => {
    return db.query('insert into channels (name, stared) values ( ?, ? )', [channel.name, channel.stared], callback);
  },
  renameChannel: (channel, callback) => {
    return db.query('UPDATE channels SET  name = ? where id = ?', [channel.name, channel.id] , callback);
  }
}

module.exports = Channels;