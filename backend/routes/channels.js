var db = require('../database/db')

var Channels = {
  getChannels: (userId, callback) => { 
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
  addFavChannel: (datas, callback) => {
    return db.query('UPDATE joinedChannel SET stared = ? WHERE channelId = ? AND userId = ?', [datas.staredValue, datas.channelId, datas.userId], callback);
  },
  getName: (channelId, callback) => {
    return db.query('SELECT * from channels where id = ?', [channelId] , callback);
  },
  countUsers: (channelId, callback) => {
    return db.query('select count(distinct userId) as nb from joinedChannel jc where channelId = ?', [channelId] , callback);
  },
  leaveChannel: (datas, callback) => {
    return db.query('delete FROM  joinedChannel where channelId = ? and userId = ?', [datas.channelId, datas.userId] , callback);
  },
}

module.exports = Channels;