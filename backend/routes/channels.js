var db = require('../database/db')

var Channels = {
  getChannels: (userId, addJoinedcallback) => { 
    return db.query('SELECT * from channels c where id not in (select channelId FROM joinedChannel jc where userId = ?)', [userId], callback);
  },
  insertChannel: (channel, callback) => {
    return db.query('insert into channels (name) values ( ? )', [channel.name], callback);
  },
  renameChannel: (channel, callback) => {
    return db.query('UPDATE channels SET  name = ? where id = ?', [channel.name, channel.id] , callback);
  },
  addJoinedChannel: (datas, callback) => {
    return db.query('Insert into joinedChannel (channelId, userId, stared) values (?, ?, ?)', [datas.channelId, datas.userId, datas.stared] , callback);
  }, 
  getJoinedChannel: (userId, callback) => {
    return db.query('SELECT * from channels c, joinedChannel jc where c.id = jc.channelId and userId = ?', [userId] , callback);
  },
  getName: (channelId, callback) => {
    return db.query('SELECT * from channels where id = ?', [channelId] , callback);
  }
}

module.exports = Channels;